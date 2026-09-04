<template>
    <div class="p-midautumn-detail_app" :style="{ backgroundImage: imgPrefix ? `url('${imgPrefix}bg2.jpg')` : '' }">
        <div class="m-app-header">
            <div class="m-back" @click="onBack">
                <span class="u-back-arrow"></span>
            </div>
            <div class="m-tabs">
                <div
                    class="u-tab-item"
                    v-for="item in tabs"
                    :key="item.key"
                    :class="{ active: currentTab === item.key }"
                    @click="onClickTab(item)"
                    :style="{
                        backgroundImage: imgPrefix
                            ? `url('${imgPrefix}button2.${currentTab === item.key ? 1 : 2}.jpg')`
                            : '',
                    }"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="m-main">
            <transition name="fade" mode="out-in">
                <div class="m-content" v-if="currentTab === 'intro'" v-html="data"></div>
                <Poem v-else-if="currentTab === 'poem'" :years="years" :year="year"></Poem>
            </transition>
        </div>

        <!-- 往届活动：年份切换弹窗 -->
        <YearPopup v-model:visible="showYears" :years="years" :year="year" @select="selectYear" />
    </div>
</template>

<script>
import YearPopup from "./components_app/YearPopup.vue";
import yearsMixin from "./mixins/years.js";
import Poem from "./components_app/Poem.vue";
import { getArticle } from "@jx3box/jx3box-common/js/system";

const FORBIDDEN_TAGS = [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "link",
    "meta",
    "base",
    "form",
    "input",
    "button",
    "textarea",
];
const UNSAFE_PROTOCOL = /^(javascript|vbscript|data:text\/html):/i;

export default {
    name: "DetailApp",
    mixins: [yearsMixin],
    inject: ["__imgRoot"],
    components: { YearPopup, Poem },
    data() {
        return {
            showYears: false,
            tabs: [
                {
                    key: "intro",
                    name: "活动介绍",
                },
                {
                    key: "poem",
                    name: "诗词赏鉴",
                },
                {
                    key: "years",
                    name: "往届活动",
                },
            ],
            data: "",
            // 记录最后一次请求的文章 id，用于丢弃过期响应
            latestId: 0,
        };
    },
    computed: {
        year() {
            return this.$route.query.year || this.currentYear;
        }, 
        imgPrefix() {
            return this.year ? `${this.__imgRoot}${this.year}/phone/` : "";
        },
        currentTab() {
            const tab = this.$route.query.tab;
            return this.tabs.some((item) => item.key === tab) ? tab : this.tabs[0].key;
        },
        introId() {
            return this.years.find((item) => item.year == this.year)?.intro_id || 0;
        },
    },
    watch: {
        introId: {
            handler: function (id) {
                // 先清空，避免切换到一个没有介绍文章的年份时残留上一年内容
                this.data = "";
                if (!id) {
                    return;
                }
                this.loadArticle(id);
            },
            immediate: true,
        },
    },
    methods: {
        onBack() {
            this.$router.push({ name: "index", query: { __env: "app" } });
        },
        onClickTab(item) {
            if (item.key === "years") {
                return (this.showYears = true);
            } else {
                if (item.key === this.currentTab) return;
                this.$router.push({ name: "list", query: { ...this.$route.query, tab: item.key } });
            }
        },
        loadArticle(id) {
            this.latestId = id;
            getArticle(id)
                .then((data) => {
                    if (this.latestId !== id) {
                        return;
                    }
                    this.data = this.sanitize(data);
                })
                .catch(() => {
                    if (this.latestId === id) {
                        this.data = "";
                    }
                });
        },
        sanitize(html) {
            if (!html) {
                return "";
            }
            const doc = new DOMParser().parseFromString(String(html), "text/html");
            const walk = (parent) => {
                Array.from(parent.children).forEach((el) => {
                    if (FORBIDDEN_TAGS.includes(el.tagName.toLowerCase())) {
                        el.remove();
                        return;
                    }
                    Array.from(el.attributes).forEach(({ name, value }) => {
                        if (
                            name.toLowerCase().startsWith("on") ||
                            UNSAFE_PROTOCOL.test((value || "").replace(/\s+/g, ""))
                        ) {
                            el.removeAttribute(name);
                        }
                    });
                    walk(el);
                });
            };
            walk(doc.body);
            return doc.body.innerHTML;
        },
        selectYear(year) {
            this.pickedYear = year;
            this.$router.replace({
                name: "list",
                query: { ...this.$route.query, year },
            });
        },
    },
};
</script>

<style lang="less">
.p-midautumn-detail_app {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #050a20;
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
    .m-app-header {
        flex-shrink: 0;

        .m-back {
            display: flex;
            align-items: center;
            padding: 18vw 4vw 3vw 6vw;
            cursor: pointer;
            color: #fff;

            .u-back-arrow {
                width: 4vw;
                height: 4vw;
                border-left: 1vw solid currentColor;
                border-bottom: 1vw solid currentColor;
                transform: rotate(45deg);
            }
        }

        .m-tabs {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 3vw;
            padding: 2vw;
            margin-top: 18vw;

            .u-tab-item {
                flex: 1;
                text-align: center;
                padding: 1.5vw 0;
                cursor: pointer;
                background-size: 100% 100%;
                color: #6d411a;

                &.active {
                    color: #fff;
                }
            }
        }
    }
    .m-main {
        flex: 1;
        padding: 3vw 2vw;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
    }

    .m-content {
        box-sizing: border-box;
        padding: 10vw 2vw 0 2vw;
        border-radius: 2vw;
        border: 1px solid #6d411a;
        min-height: 50vh;
        background: linear-gradient(180deg, #fdfbf7 0%, #f2eadc 100%);
        font-size: 3.6vw;
        line-height: 1.8;
        color: #333;
        word-break: break-word;

        * {
            max-width: 100%;
        }
        p,
        span,
        div,
        li,
        font {
            font-size: inherit !important;
            line-height: inherit !important;
        }
        h1,
        h2,
        h3 {
            font-size: 4.2vw !important;
        }
        h4,
        h5,
        h6 {
            font-size: 3.8vw !important;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    }
}
</style>
