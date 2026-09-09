<template>
    <div class="p-midautumn-detail_app" :style="{ ...buttonThemeStyle, backgroundImage: imgPrefix ? `url('${imgPrefix}bg2.jpg')` : '' }">
        <div class="m-app-header">
            <button class="u-year-switch" type="button" aria-label="切换活动年份" @click="showYears = true">
                <img v-if="imgPrefix" :src="`${imgPrefix}flower1.png`" alt="" />
                <span>{{ year }}</span>
                <span class="u-year-chevron" aria-hidden="true"></span>
            </button>
            <div class="m-tabs">
                <div
                    class="u-tab-item"
                    v-for="item in tabs"
                    :key="item.key"
                    :class="{ active: currentTab === item.key }"
                    @click="onClickTab(item)"
                >
                    <span class="u-tab-label">{{ item.name }}</span>
                </div>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="m-main" :class="{ 'is-intro': currentTab === 'intro' || poemDetailVisible }">
            <transition name="tab-content-fade" mode="out-in">
                <div class="m-content" v-if="currentTab === 'intro'" v-html="articleHtml"></div>
                <Poem v-else-if="currentTab === 'poem'" :years="years" :year="year" @detail-change="poemDetailVisible = $event"></Poem>
            </transition>
        </div>

        <!-- 往届活动：年份切换弹窗 -->
        <YearPopup v-model:visible="showYears" :years="years" :year="year" @select="selectYear" />
    </div>
</template>

<script>
import YearPopup from "./components_app/YearPopup.vue";
import yearsMixin from "./mixins/years.js";
import buttonThemeMixin from "./mixins/buttonTheme.js";
import articleMixin from "./mixins/article.js";
import Poem from "./components_app/Poem.vue";

export default {
    name: "DetailApp",
    mixins: [yearsMixin, articleMixin, buttonThemeMixin],
    inject: ["__imgRoot"],
    components: { YearPopup, Poem },
    data() {
        return {
            showYears: false,
            poemDetailVisible: false,
            tabs: [
                {
                    key: "intro",
                    name: "活动介绍",
                },
                {
                    key: "poem",
                    name: "诗词赏鉴",
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
    watch: {
        currentTab() {
            this.poemDetailVisible = false;
        },
    },
    methods: {
        onClickTab(item) {
            if (item.key === this.currentTab) return;
            this.$router.replace({ name: "list", query: { ...this.$route.query, tab: item.key } });
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
.tab-content-fade-enter-from,
.tab-content-fade-leave-to {
    opacity: 0;
}

.tab-content-fade-enter-active,
.tab-content-fade-leave-active {
    transition: opacity 0.18s ease;
}

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
        position: relative;
        flex-shrink: 0;
        padding-top: 6.5rem;

        .u-year-switch {
            position: absolute;
            top: 0.75rem;
            left: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.25rem 0.625rem;
            border: 0.0625rem solid rgba(239, 211, 146, 0.5);
            border-radius: 2rem;
            background: linear-gradient(110deg, rgba(239, 211, 146, 0.2), rgba(15, 31, 40, 0.65));
            box-shadow: inset 0 0.0625rem 0 rgba(255, 243, 207, 0.12), 0 0.125rem 0.5rem rgba(0, 0, 0, 0.16);
            backdrop-filter: blur(0.375rem);
            color: #fdf0cd;
            font-family: inherit;
            font-size: 0.875rem;
            line-height: 1.5;
            letter-spacing: 0.125rem;
            text-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: background-color 0.18s ease, border-color 0.18s ease;

            &:active {
                background-color: rgba(239, 211, 146, 0.2);
                border-color: #efd392;
            }

            &:focus-visible {
                outline: 0.125rem solid #efd392;
                outline-offset: 0.1875rem;
            }

            img {
                width: 0.875rem;
                height: 0.875rem;
                animation: mid-autumn-year-flower-spin 12s linear infinite;
            }

            .u-year-chevron {
                width: 0.3125rem;
                height: 0.3125rem;
                margin-left: 0.125rem;
                margin-top: -0.1875rem;
                border-right: 0.0625rem solid currentColor;
                border-bottom: 0.0625rem solid currentColor;
                transform: rotate(45deg);
                opacity: 0.8;
            }
        }

        .m-tabs {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            margin-top: 4.5rem;

            .u-tab-item {
                position: relative;
                flex: 1;
                min-width: 0;
                text-align: center;
                padding: 0.375rem 0;
                box-sizing: border-box;
                overflow: hidden;
                font-size: 1rem;
                line-height: 1.5;
                white-space: nowrap;
                cursor: pointer;
                color: #fff8e6;
                transition: color 0.18s ease;

                &::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background-image: var(--tab-inactive-background);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    filter: var(--tab-inactive-filter);
                    pointer-events: none;
                }

                .u-tab-label {
                    position: relative;
                    z-index: 1;
                    text-shadow: 0 0.0625rem 0.25rem rgba(4, 22, 29, 0.5);
                }

                &.active {
                    color: #6d411a;
                    font-weight: 600;

                    &::before {
                        background-image: var(--tab-active-background);
                        filter: none;
                    }

                    .u-tab-label {
                        text-shadow: none;
                    }
                }
            }
        }
    }
    .m-main {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 0.5rem 0.25rem;

        &.is-intro {
            margin: 0.5rem 0.25rem 0;
            padding: 0;
            border-radius: 50rem 50rem 0 0 / 3.5rem 3.5rem 0 0;
            background: linear-gradient(180deg, #fdfbf7 0%, #f2eadc 100%);
        }
    }

    .m-content {
        box-sizing: border-box;
        padding: 4rem 0.75rem 0.75rem;
        min-height: 50vh;
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
@keyframes mid-autumn-year-flower-spin {
    to {
        transform: rotate(360deg);
    }
}

@media (prefers-reduced-motion: reduce) {

    .p-midautumn-detail_app .m-app-header .u-year-switch img {
        animation: none;
    }
}
</style>
