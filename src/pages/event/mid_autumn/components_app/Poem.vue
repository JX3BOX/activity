<template>
    <div class="c-midautumn-poem_app" v-loading="loading">
        <div class="u-empty" v-if="!list.length && !loading">
            <img class="u-null" :src="`${__imgRoot}null.png`" />
            <div class="u-empty-title">广采珠玉，以待成章</div>
            <div class="u-empty-desc">
                <p>作品收集中，侠士可按照活动介绍中参赛方式</p>
                <p>前往 <a href="https://www.jx3box.com/community" target="_blank" rel="noopener noreferrer">魔盒网站 - 茶馆论坛</a> 处提交作品~</p>
            </div>
        </div>
        <div class="u-list" v-else v-show="!showDetail">
            <div class="u-item" v-for="item in list" :key="item.id" role="button" tabindex="0" @click="openPoem(item)" @keydown.enter="openPoem(item)" @keydown.space.prevent="openPoem(item)">
                <div class="u-header">
                    <img class="u-avatar" :src="item.user_info?.avatar" alt="" @error="onAvatarError" />
                    <div class="u-info">
                        <div class="u-title" :title="item.title">{{ item.title }}</div>
                        <div class="u-author">@{{ item.user_info?.display_name || "侠士" }}</div>
                    </div>
                </div>
                <div class="u-body">
                    <p class="u-content">{{ getContentPreview(item.content) }}</p>
                    <div class="u-btn">
                        <img :src="`${imgPrefix}flower2.png`" /><span>翻阅</span>
                    </div>
                </div>
            </div>
        </div>
        <PoemDetail v-model:visible="showDetail" :list="list" :index="detailIndex" :program-id="voteId" :year="year" />
    </div>
</template>

<script>
import PoemDetail from "./PoemDetail.vue";
import poemsMixin from "../mixins/poems";
import { getPoemTextLines, onAvatarError } from "./poemCommon";

export default {
    name: "PoemApp",
    mixins: [poemsMixin],
    inject: ["__imgRoot"],
    components: { PoemDetail },
    emits: ["detail-change"],
    props: {
        years: {
            type: Array,
            default: () => [],
        },
        year: {
            type: [String, Number],
            default: "",
        },
    },
    data() {
        return {
            showDetail: false,
            detailIndex: 0,
            listScrollTop: 0,
        };
    },
    computed: {
        imgPrefix() {
            return this.year ? `${this.__imgRoot}${this.year}/phone/` : "";
        },
        voteId() {
            const year = this.year || new Date().getFullYear();
            return this.years.find((item) => item.year == year)?.vote_id || 0;
        },
    },
    watch: {
        showDetail(visible) {
            this.$emit("detail-change", visible);
            this.$nextTick(() => {
                const container = this.$el.closest(".m-main");
                if (container) container.scrollTop = visible ? 0 : this.listScrollTop;
            });
        },
        year() {
            this.listScrollTop = 0;
            this.showDetail = false;
        },
    },
    methods: {
        onAvatarError,
        // 翻阅：在内容区域展示当前作品
        openPoem(item) {
            this.listScrollTop = this.$el.closest(".m-main")?.scrollTop || 0;
            const i = this.list.findIndex((e) => e.id == item.id);
            this.detailIndex = i > -1 ? i : 0;
            this.showDetail = true;
        },
        getContentPreview(val) {
            const first = getPoemTextLines(val)[0] || "";
            return first.length > 16 ? first.substring(0, 16) + "…" : first;
        },
    },
};
</script>

<style lang="less">
.c-midautumn-poem_app {
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
    .u-list {
        display: flex;
        flex-direction: column;
        gap: 3vw;
        padding-inline: 0.75rem;
    }
    .u-item {
        cursor: pointer;
        background: linear-gradient(180deg, #fdfbf7 0%, #f2eadc 100%);
        border-radius: 4px;
        padding: 4vw 4vw 3vw;

        .u-header {
            display: flex;
            align-items: center;
            gap: 3vw;

            .u-avatar {
                width: 12vw;
                height: 12vw;
                border-radius: 50%;
                object-fit: cover;
                background: #eee;
                flex-shrink: 0;
            }
            .u-info {
                min-width: 0;

                .u-title {
                    font-size: 4.3vw;
                    font-weight: 500;
                    color: #af4859;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .u-author {
                    margin-top: 1vw;
                    font-size: 3.5vw;
                    color: #999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

        .u-body {
            display: flex;
            align-items: center;
            gap: 3vw;
            margin-top: 3vw;

            .u-content {
                flex: 1;
                min-width: 0;
                font-size: 3.9vw;
                line-height: 1.6;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .u-btn {
                display: flex;
                align-items: center;
                gap: 1vw;
                flex-shrink: 0;
                padding: 2vw 5vw;
                border-radius: 6vw;
                background: linear-gradient(270deg, #b08236 0%, #d6af6f 100%);
                color: #fff;
                font-size: 3.7vw;
                cursor: pointer;
                img {
                    width: 4vw;
                    height: 4vw;
                }
            }
        }
    }

    .u-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10vw 6vw 16vw 6vw;
        text-align: center;

        .u-null {
            width: 80vw;
            height: auto;
            margin-bottom: 6vw;
        }
        .u-empty-title {
            font-size: 5vw;
            font-weight: 600;
            letter-spacing: 0.5vw;
            color: #b08236;
        }
        .u-empty-desc {
            margin-top: 3vw;
            font-size: 3.5vw;
            line-height: 1.9;
            color: #999;

            p {
                margin: 0;
            }
            a {
                color: #b08236;
                text-decoration: underline;
            }
        }
    }
}
</style>
