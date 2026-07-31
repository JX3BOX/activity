<template>
    <el-dialog
        v-model="visible"
        class="m-story-detail-dialog"
        title="一封匿名江湖笺"
        width="min(780px, calc(100vw - 32px))"
        append-to-body
        destroy-on-close
    >
        <div v-if="story" class="m-story-detail">
            <Article v-if="story.content" class="u-story-content" :content="story.content" :pageable="false" />
            <div class="u-story-action">
                <StoryLikeButton
                    :liked="Boolean(story.liked_by_me)"
                    :count="Number(story.like_count || 0)"
                    :loading="loading"
                    :disabled="!likeEnabled"
                    @click="$emit('toggle-like', story)"
                />
            </div>
        </div>
    </el-dialog>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import StoryLikeButton from "./StoryLikeButton.vue";

export default {
    name: "StoryDetailDialog",
    components: { Article, StoryLikeButton },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        story: {
            type: Object,
            default: null,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        likeEnabled: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["update:modelValue", "toggle-like"],
    computed: {
        visible: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
};
</script>

<style scoped lang="less">
.m-story-detail {
    padding: 2px 6px 8px;
}

.u-story-content {
    color: #61443f;
    font-family: "STKaiti", "KaiTi", serif;
    font-size: 17px;
    line-height: 1.95;

    :deep(img:not(.t-emotion):not(.e-jx3-emotion-img)),
    :deep(video) {
        display: block;
        width: auto;
        max-width: 100%;
        max-height: 68vh;
        margin: 14px auto;
        border-radius: 8px;
        object-fit: contain;
    }

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

    :deep(audio) {
        width: 100%;
    }

    :deep(.w-jx3-element-pop) {
        z-index: 10000 !important;
    }
}

.u-story-action {
    display: flex;
    position: sticky;
    z-index: 2;
    bottom: -8px;
    justify-content: center;
    margin-top: 24px;
    padding-top: 20px;
    padding-bottom: 8px;
    border-top: 1px dashed rgba(156, 100, 79, 0.3);
}

:global(.m-story-detail-dialog) {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 48px);
    margin-top: 24px !important;
    margin-bottom: 24px !important;
}

:global(.m-story-detail-dialog .el-dialog__header) {
    flex: none;
}

:global(.m-story-detail-dialog .el-dialog__body) {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
}
</style>
