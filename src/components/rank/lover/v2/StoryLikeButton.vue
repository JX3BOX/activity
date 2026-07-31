<template>
    <button
        type="button"
        class="u-story-like"
        :class="{ 'is-liked': liked, 'is-loading': loading, 'is-disabled': disabled }"
        :aria-pressed="String(liked)"
        :disabled="loading || disabled"
        @click="$emit('click')"
    >
        <svg class="u-heart" viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 20.4 4.24 13A5.05 5.05 0 0 1 11.4 5.9L12 6.5l.6-.6A5.05 5.05 0 0 1 19.76 13Z"
            />
        </svg>
        <span>{{ disabled ? disabledText : loading ? "落笺中" : liked ? "已喜欢" : "喜欢" }}</span>
        <strong>{{ count }}</strong>
    </button>
</template>

<script>
export default {
    name: "StoryLikeButton",
    props: {
        liked: {
            type: Boolean,
            default: false,
        },
        count: {
            type: Number,
            default: 0,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disabledText: {
            type: String,
            default: "点赞暂未开放",
        },
    },
    emits: ["click"],
};
</script>

<style scoped lang="less">
.u-story-like {
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: 142px;
    height: 42px;
    padding: 0 22px;
    overflow: hidden;
    border: 1px solid rgba(141, 62, 48, 0.5);
    border-radius: 21px;
    background:
        linear-gradient(rgba(115, 38, 30, 0.18), rgba(87, 25, 22, 0.28)),
        url("~@/assets/img/lover/v2/story-like-pattern.webp") center / cover no-repeat;
    box-shadow:
        inset 0 0 0 1px rgba(255, 231, 190, 0.28),
        0 5px 14px rgba(105, 48, 38, 0.16);
    color: #fff5df;
    cursor: pointer;
    font: 600 14px/1 "Microsoft YaHei", sans-serif;
    letter-spacing: 1px;
    transition:
        transform 0.18s ease,
        box-shadow 0.18s ease,
        filter 0.18s ease;

    &::before {
        position: absolute;
        inset: 2px;
        border: 1px solid rgba(255, 222, 166, 0.22);
        border-radius: inherit;
        content: "";
        pointer-events: none;
    }

    &:hover:not(:disabled) {
        box-shadow:
            inset 0 0 0 1px rgba(255, 235, 198, 0.36),
            0 7px 18px rgba(105, 48, 38, 0.24);
        filter: brightness(1.08);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 2px solid #c38162;
        outline-offset: 3px;
    }

    &:disabled {
        cursor: wait;
        opacity: 0.72;
    }

    &.is-disabled {
        cursor: not-allowed;
        filter: saturate(0.55);
    }

    &.is-liked .u-heart {
        animation: heart-beat 0.3s ease;
        fill: #ffd3bd;
    }
}

.u-heart {
    z-index: 1;
    width: 19px;
    height: 19px;
    margin-right: 7px;
    fill: #fff1d4;
    filter: drop-shadow(0 1px 2px rgba(87, 22, 20, 0.5));
}

span,
strong {
    z-index: 1;
}

strong {
    min-width: 18px;
    margin-left: 7px;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
}

@keyframes heart-beat {
    50% {
        transform: scale(1.22);
    }
}
</style>
