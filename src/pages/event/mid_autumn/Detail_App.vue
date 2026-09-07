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
                <div class="m-content" v-if="currentTab === 'intro'" v-html="articleHtml"></div>
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
import articleMixin from "./mixins/article.js";
import Poem from "./components_app/Poem.vue";

export default {
    name: "DetailApp",
    mixins: [yearsMixin, articleMixin],
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
        articleId() {
            return this.years.find((item) => item.year == this.year)?.intro_id || 0;
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
        padding: 2vw 1vw;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
    }

    .m-content {
        box-sizing: border-box;
        padding: 4vw 2vw 2vw;
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

        // 收紧 v-html 富文本默认间距，避免 CMS 文章自带大 margin/padding
        p,
        div,
        ul,
        ol,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0 0 0.6em 0;
        }
        p {
            text-indent: 0 !important;
        }
        ul,
        ol {
            padding-left: 1.2em;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }

    // 移动端：收掉 CMS 文章自带的桌面级大 padding / 多列网格
    // 文章用 inline style，必须用 !important 才能覆盖
    @media (max-width: 768px) {
        .m-content {
            section {
                padding: 36px 16px !important;
            }
            // 多列网格 → 单列，并收窄间距
            [style*="grid-template-columns"] {
                grid-template-columns: 1fr !important;
                gap: 18px !important;
            }
            // 单列后去掉竖向分隔线（带 border-left 的网格项）
            [style*="border-left"] {
                border-left: 0 !important;
                padding-left: 0 !important;
            }
            // 横向卡片间距收窄
            [style*="gap: 24px"] {
                gap: 14px !important;
            }
            // 大卡片内边距（桌面 68px 72px / 38px 36px / 34px 36px / 28px 30px）
            [style*="68px 72px"] {
                padding: 30px 20px !important;
            }
            [style*="38px 36px"] {
                padding: 24px 18px !important;
            }
            [style*="34px 36px"] {
                padding: 24px 18px !important;
            }
            [style*="28px 30px"] {
                padding: 22px 18px !important;
            }
        }
    }
}
</style>
