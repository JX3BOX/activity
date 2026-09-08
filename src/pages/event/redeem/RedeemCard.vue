<template>
    <article
        class="m-redeem-card"
        :class="{
            'is-redeemed': item.redeemed,
            'is-loading': item.loading || item.submitting,
            'is-unavailable': item.unavailable,
        }"
    >
        <span v-if="item.discount" class="u-discount">{{ item.discountText }}</span>
        <span class="u-card-background" :style="imageStyle(resolvedAssets.cardBackground)" aria-hidden="true"></span>
        <span class="u-product-image" :style="imageStyle(resolvedAssets.productImage)" aria-hidden="true"></span>
        <div class="m-card-copy">
            <div class="m-card-heading">
                <h2 class="u-title">{{ item.title }}</h2>
                <div class="m-points">
                    <span class="m-points-values" :class="{ 'has-original': item.originalPointsText }">
                        <span v-if="item.originalPointsText" class="u-points-original">{{ item.originalPointsText }}</span>
                        <span class="u-points-value">{{ item.pointsText }}</span>
                    </span>
                    <span
                        class="u-points-icon"
                        :style="imageStyle(resolvedAssets.pointsIcon)"
                        aria-hidden="true"
                    ></span>
                </div>
            </div>
            <div class="u-divider" aria-hidden="true"></div>
            <p class="u-description">{{ item.description }}</p>
            <div class="m-tags" aria-label="兑换条件">
                <span class="u-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
        </div>
        <button
            class="u-redeem-button"
            type="button"
            :style="buttonStyle"
            :aria-label="item.redeemed ? `${item.title}已兑换` : item.title"
            :aria-busy="item.loading || item.submitting"
            :disabled="item.redeemed || item.loading || item.submitting || item.unavailable"
            @click="$emit('redeem', item)"
        >
            <span>{{ buttonLabel }}</span>
        </button>
    </article>
</template>

<script>
export default {
    name: "RedeemCard",
    props: {
        item: {
            type: Object,
            required: true,
        },
        assetRoot: {
            type: String,
            required: true,
        },
        assets: {
            type: Object,
            required: true,
        },
    },
    emits: ["redeem"],
    computed: {
        resolvedAssets() {
            return {
                ...this.assets,
                ...(this.item.assets || {}),
            };
        },
        buttonStyle() {
            return {
                "--button-default": this.imageUrl(this.resolvedAssets.buttonDefault),
                "--button-active": this.imageUrl(this.resolvedAssets.buttonActive),
                "--button-disabled": this.imageUrl(this.resolvedAssets.buttonDisabled),
            };
        },
        buttonLabel() {
            return this.item.buttonText || "兑换";
        },
    },
    methods: {
        resolveAsset(source) {
            if (!source) return "";
            if (/^(?:https?:)?\/\//i.test(source) || /^(?:data|blob):/i.test(source) || source.startsWith("/")) {
                return source;
            }
            return `${this.assetRoot}${source}`;
        },
        imageStyle(source) {
            return { backgroundImage: this.imageUrl(source) };
        },
        imageUrl(source) {
            const url = this.resolveAsset(source);
            return url ? `url("${url}")` : "none";
        },
    },
};
</script>

<style lang="less">
.m-redeem-card {
    position: relative;
    width: 100%;
    aspect-ratio: 1271 / 407;
    flex: none;
    box-sizing: border-box;
    transform: translateZ(0);
    transform-origin: center;
    transition: transform 220ms ease, filter 220ms ease;
    will-change: transform;

    .u-card-background,
    .u-product-image,
    .u-points-icon {
        display: block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        pointer-events: none;
        user-select: none;
    }

    .u-card-background {
        position: absolute;
        z-index: 0;
        inset: 0;
        background-size: 100% 100%;
    }

    .u-product-image {
        position: absolute;
        z-index: 1;
        top: 15%;
        bottom: 18%;
        left: 7.4%;
        width: 18.5%;
        transform: rotate(-8deg);
        transform-origin: center;
    }

    .u-discount {
        position: absolute;
        z-index: 2;
        top: -4.91%;
        left: 0;
        display: flex;
        width: 18.96%;
        height: 17%;
        align-items: center;
        box-sizing: border-box;
        padding: 0 2.2%;
        clip-path: polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%);
        color: #fff;
        background: #d90800;
        font-size: clamp(11px, 1.15vw, 30px);
        font-style: italic;
        font-weight: 800;
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 1px 2px rgba(92, 0, 0, 0.36);
        user-select: none;
    }

    .m-card-copy {
        position: absolute;
        z-index: 1;
        top: 12%;
        right: 5.8%;
        bottom: 12%;
        left: 31.7%;
        color: #44333b;
    }

    .m-card-heading {
        display: flex;
        height: 36%;
        align-items: center;
        justify-content: space-between;
        gap: 5%;
    }

    .u-title {
        min-width: 0;
        margin: 0;
        overflow: hidden;
        font-size: clamp(17px, 1.62vw, 42px);
        font-weight: 600;
        line-height: 1.15;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .m-points {
        display: flex;
        flex: none;
        align-items: center;
        gap: clamp(4px, 0.45vw, 12px);
    }

    .m-points-values {
        display: flex;
        align-items: center;

        &.has-original {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .u-points-original {
        color: rgba(68, 51, 59, 0.38);
        font-size: clamp(10px, 0.82vw, 21px);
        line-height: 0.9;
        text-decoration: line-through;
    }

    .u-points-value {
        display: block;
        font-size: clamp(17px, 1.7vw, 44px);
        font-weight: 700;
        line-height: 0.95;
    }

    .u-points-icon {
        width: clamp(20px, 2.4vw, 62px);
        aspect-ratio: 1;
    }

    .u-divider {
        height: 1px;
        margin-top: 1.5%;
        background: rgba(68, 51, 59, 0.32);
    }

    .u-description {
        margin: 2.6% 0 0;
        overflow: hidden;
        color: #69565e;
        font-size: clamp(11px, 0.88vw, 23px);
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .m-tags {
        position: absolute;
        bottom: 18px;
        left: 1%;
        display: flex;
        max-width: 66%;
        gap: clamp(4px, 0.48vw, 24px);
    }

    .u-tag {
        padding: 0.2em 0.48em 0.24em;
        border: 1px solid rgba(119, 91, 67, 0.45);
        border-radius: 0.42em;
        color: #705640;
        background-color: rgba(255, 242, 216, 0.28);
        font-size: clamp(10px, 0.75vw, 29px);
        line-height: 1.25;
        white-space: nowrap;
    }

    .u-redeem-button {
        position: absolute;
        z-index: 2;
        right: 6.61%;
        bottom: 16.7%;
        width: 20.06%;
        aspect-ratio: 255 / 122;
        padding: 0;
        border: 0;
        color: #fff;
        background-color: transparent;
        background-image: var(--button-default);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: clamp(15px, 1.4vw, 36px);
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
        text-shadow: 0 2px 3px rgba(59, 77, 93, 0.36);
        transition: transform 160ms ease, filter 160ms ease;

        &:not(:disabled) {
            cursor: pointer;
        }

        &:hover,
        &:focus-visible {
            background-image: var(--button-active);
            transform: scale(1.04);
            outline: none;
        }

        &:active {
            background-image: var(--button-active);
            transform: scale(0.98);
        }

        &:disabled {
            cursor: wait;
            opacity: 1;
            background-image: var(--button-disabled);
            transform: none;
        }
    }

    &.is-redeemed .u-redeem-button {
        cursor: default;
        opacity: 1;
    }

    &.is-unavailable .u-redeem-button {
        cursor: not-allowed;
        opacity: 1;
    }

    &.is-redeemed {
        .u-redeem-button,
        .u-redeem-button:hover,
        .u-redeem-button:focus-visible {
            transform: none;
        }
    }
}

@media (hover: hover) and (pointer: fine) {
    .m-redeem-card:hover,
    .m-redeem-card:focus-within {
        z-index: 3;
        transform: scale(1.04);
        filter: drop-shadow(0 12px 18px rgba(71, 39, 19, 0.24));
    }
}

@media screen and (max-width: 767px), screen and (max-aspect-ratio: 4 / 5) {
    .m-redeem-card {
        filter: drop-shadow(0 5px 12px rgba(71, 39, 19, 0.2));

        .u-title {
            font-size: clamp(14px, 4.1vw, 21px);
        }

        .u-points-value {
            font-size: clamp(15px, 5.2vw, 28px);
        }

        .u-points-original {
            font-size: clamp(9px, 2.75vw, 14px);
        }

        .u-points-icon {
            width: clamp(18px, 6.8vw, 34px);
        }

        .u-description {
            font-size: clamp(10px, 2.85vw, 15px);
        }

        .u-tag {
            font-size: clamp(8px, 2.4vw, 13px);
        }

        .m-tags {
            bottom: 5px;
        }

        .u-discount {
            font-size: clamp(11px, 3.2vw, 16px);
        }

        .u-redeem-button {
            font-size: clamp(12px, 3.5vw, 18px);
        }
    }
}

@media (prefers-reduced-motion: reduce) {
    .m-redeem-card {
        transition: none;

        .u-redeem-button {
            transition: none;
        }
    }
}
</style>
