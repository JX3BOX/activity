<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>匿名江湖笺</h2>
                <p>名字被轻轻隐去，故事仍会留在这场相逢里。</p>
            </div>
        </section>

        <section class="m-story-section" v-loading="loading">
            <div v-if="!storyLikeEnabled" class="u-story-like-closed" role="status">
                匿名故事点赞暂未开放，仍可继续阅读所有江湖笺。
            </div>
            <div v-if="stories.length" class="m-story-wall">
                <article v-for="item in stories" :key="item.id" class="u-story m-lover-v2-panel">
                    <div
                        class="u-story-open"
                        role="button"
                        tabindex="0"
                        aria-label="查看匿名江湖笺全文"
                        @click="openStory(item)"
                        @keydown.enter="openStory(item)"
                        @keydown.space.prevent="openStory(item)"
                    >
                        <img v-if="item.cover" class="u-story-cover" :src="item.cover" alt="" loading="lazy" />
                        <div class="u-story-preview">
                            <Article
                                v-if="item.preview_content"
                                class="u-content"
                                :content="item.preview_content"
                                :pageable="false"
                            />
                            <span class="u-read-more">展开全文</span>
                        </div>
                    </div>
                    <footer>
                        <StoryLikeButton
                            :liked="Boolean(item.liked_by_me)"
                            :count="Number(item.like_count || 0)"
                            :loading="likingId === item.id"
                            :disabled="!storyLikeEnabled"
                            @click="toggleLike(item)"
                        />
                    </footer>
                </article>
            </div>
            <EmptyState
                v-else-if="!loading"
                title="还没有公开的江湖笺"
                description="情缘报名审核通过后，匿名内容会出现在这里。"
            />
        </section>

        <el-pagination
            v-if="count > pageSize"
            v-model:current-page="page"
            class="m-pagination"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="count"
            @current-change="load"
        />

        <StoryDetailDialog
            v-model="detailVisible"
            :story="selectedStory"
            :loading="likingId === selectedStory?.id"
            :like-enabled="storyLikeEnabled"
            @toggle-like="toggleLike"
        />
    </LoverV2Layout>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import StoryDetailDialog from "@/components/rank/lover/v2/StoryDetailDialog.vue";
import StoryLikeButton from "@/components/rank/lover/v2/StoryLikeButton.vue";
import { getStories, likeStory, unlikeStory } from "@/service/rank/lover-v2";

const STORY_PREVIEW_TEXT_LIMIT = 260;
const STORY_PREVIEW_EMOTION_LIMIT = 8;

function buildStoryPreview(container) {
    const preview = document.createElement("div");
    let remainingText = STORY_PREVIEW_TEXT_LIMIT;
    let remainingEmotions = STORY_PREVIEW_EMOTION_LIMIT;
    let truncated = false;

    const cloneNode = (node) => {
        if (node.nodeType === 3) {
            if (remainingText <= 0) {
                truncated = Boolean(node.textContent?.trim()) || truncated;
                return null;
            }
            const text = node.textContent || "";
            const clipped = text.slice(0, remainingText);
            remainingText -= clipped.length;
            if (clipped.length < text.length) truncated = true;
            return document.createTextNode(clipped);
        }
        if (node.nodeType !== 1) return null;

        const element = node;
        const isEmotion =
            element.classList?.contains("t-emotion") || element.classList?.contains("e-jx3-emotion-img");
        if (isEmotion) {
            if (remainingEmotions <= 0) {
                truncated = true;
                return null;
            }
            remainingEmotions -= 1;
            return element.cloneNode(false);
        }
        if (remainingText <= 0) {
            truncated = Boolean(element.textContent?.trim()) || truncated;
            return null;
        }

        const copy = element.cloneNode(false);
        Array.from(element.childNodes).some((child) => {
            const clonedChild = cloneNode(child);
            if (clonedChild) copy.appendChild(clonedChild);
            return remainingText <= 0;
        });
        return copy.childNodes.length ? copy : null;
    };

    Array.from(container.childNodes).some((node) => {
        const clonedNode = cloneNode(node);
        if (clonedNode) preview.appendChild(clonedNode);
        return remainingText <= 0;
    });
    if (truncated || remainingText <= 0) preview.appendChild(document.createTextNode("…"));
    return preview.innerHTML;
}

export default {
    name: "LoverV2Stories",
    components: { Article, LoverV2Layout, EmptyState, StoryDetailDialog, StoryLikeButton },
    data: function () {
        return {
            stories: [],
            page: 1,
            pageSize: 12,
            count: 0,
            loading: false,
            likingId: null,
            selectedStory: null,
            detailVisible: false,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        storyLikeEnabled() {
            return Boolean(this.$store.state.v2_event?.story_like_enabled);
        },
    },
    watch: {
        eventId: {
            immediate: true,
            handler() {
                this.reload();
            },
        },
    },
    methods: {
        normalizeStory(item) {
            const container = document.createElement("div");
            container.innerHTML = String(item.content || "");
            const images = Array.from(container.querySelectorAll("img"));
            const cover = images.find(
                (image) => !image.classList.contains("t-emotion") && !image.classList.contains("e-jx3-emotion-img")
            );
            const coverUrl = cover?.getAttribute("src") || cover?.getAttribute("data-src") || "";

            images.forEach((image) => {
                const isEmotion =
                    image.classList.contains("t-emotion") || image.classList.contains("e-jx3-emotion-img");
                if (!isEmotion) image.remove();
            });
            container
                .querySelectorAll("video, audio, iframe, table, [data-jx3-element], jx3box-talent, jx3box-macro")
                .forEach((node) => node.remove());
            container.querySelectorAll("p, figure").forEach((node) => {
                if (!node.textContent?.trim() && !node.querySelector(".t-emotion, .e-jx3-emotion-img")) node.remove();
            });

            return {
                ...item,
                cover: coverUrl,
                preview_content: buildStoryPreview(container),
            };
        },
        openStory(item) {
            this.selectedStory = item;
            this.detailVisible = true;
        },
        reload() {
            this.page = 1;
            this.load();
        },
        async load() {
            if (!this.eventId) return;
            this.loading = true;
            try {
                const res = await getStories(this.eventId, {
                    page: this.page,
                    page_size: this.pageSize,
                });
                this.stories = (res.data.data.list || []).map(this.normalizeStory);
                this.count = Number(res.data.data.count || 0);
            } catch (error) {
                console.error("[LoverV2Stories.load]", error);
                this.stories = [];
                this.count = 0;
            } finally {
                this.loading = false;
            }
        },
        async toggleLike(item) {
            if (!this.storyLikeEnabled) return;
            if (!User.isLogin()) {
                User.toLogin();
                return;
            }
            this.likingId = item.id;
            try {
                const res = item.liked_by_me
                    ? await unlikeStory(this.eventId, item.id)
                    : await likeStory(this.eventId, item.id);
                item.liked_by_me = Boolean(res.data.data.liked_by_me);
                item.like_count = Number(res.data.data.like_count || 0);
            } catch (error) {
                console.error("[LoverV2Stories.toggleLike]", error);
            } finally {
                this.likingId = null;
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-story-section {
    min-height: 360px;
}

.u-story-like-closed {
    margin-bottom: 18px;
    padding: 12px 16px;
    border: 1px solid rgba(156, 100, 79, 0.28);
    border-radius: 6px;
    background: rgba(255, 247, 231, 0.72);
    color: #805a50;
    text-align: center;
}

.m-story-wall {
    column-count: 4;
    column-gap: 18px;
}

.u-story {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    margin: 0 0 18px;
    overflow: hidden;
    padding: 0;
    break-inside: avoid;

    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 16px 16px;
        border-top: 1px dashed rgba(156, 100, 79, 0.24);
    }
}

.u-story-open {
    display: block;
    cursor: pointer;

    &:focus-visible {
        outline: 2px solid #ad6b56;
        outline-offset: -3px;
    }
}

.u-story-cover {
    display: block;
    width: 100%;
    height: 166px;
    border-bottom: 1px solid rgba(156, 100, 79, 0.18);
    object-fit: cover;
}

.u-story-preview {
    position: relative;
    box-sizing: border-box;
    max-height: 320px;
    min-height: 130px;
    padding: 18px 18px 42px;
    overflow: hidden;

    &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 74px;
        background: linear-gradient(transparent, rgba(255, 250, 240, 0.98) 58%);
        content: "";
        pointer-events: none;
    }
}

.u-read-more {
    position: absolute;
    z-index: 1;
    right: 18px;
    bottom: 13px;
    color: #a15d4d;
    font-size: 12px;
    letter-spacing: 1px;
}

.u-content {
    margin: 0;
    color: #61443f;
    font-family: "STKaiti", "KaiTi", serif;
    font-size: 16px;
    line-height: 1.85;
    pointer-events: none;

    :deep(.t-emotion),
    :deep(.e-jx3-emotion-img) {
        display: inline-block !important;
        width: 26px !important;
        min-width: 26px !important;
        max-width: 26px !important;
        height: 26px !important;
        min-height: 26px !important;
        max-height: 26px !important;
        margin: 0 2px !important;
        vertical-align: -6px !important;
        object-fit: contain !important;
    }

    :deep(.w-jx3-element-pop) {
        z-index: 10000 !important;
    }
}

.m-pagination {
    justify-content: center;
    margin-top: 24px;
}

@media screen and (max-width: 980px) {
    .m-story-wall {
        column-count: 3;
    }
}

@media screen and (max-width: 760px) {
    .m-story-wall {
        column-count: 2;
    }
}

@media screen and (max-width: 620px) {
    .m-story-wall {
        column-count: 1;
    }
}
</style>
