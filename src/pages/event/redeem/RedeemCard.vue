<template>
    <article
        class="m-redeem-card"
        :class="{
            'is-redeemed': item.redeemed,
            'is-loading': item.loading || item.submitting,
            'is-unavailable': item.unavailable,
        }"
    >
        <img
            v-if="item.discount"
            class="u-discount"
            :src="`${assetRoot}50%25.png`"
            alt="5折"
            draggable="false"
        />
        <img class="u-card" :src="`${assetRoot}${item.card}`" :alt="item.title" draggable="false" />
        <button
            class="u-redeem-button"
            type="button"
            :style="buttonStyle"
            :aria-label="item.redeemed ? `${item.title}已兑换` : item.title"
            :aria-busy="item.loading || item.submitting"
            :disabled="item.redeemed || item.loading || item.submitting || item.unavailable"
            @click="$emit('redeem', item)"
        ></button>
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
    },
    emits: ["redeem"],
    computed: {
        buttonStyle() {
            return {
                "--button-default": `url(${this.assetRoot}anniu01.png)`,
                "--button-hover": `url(${this.assetRoot}anniu02.png)`,
                "--button-redeemed": `url(${this.assetRoot}anniu03.png)`,
            };
        },
    },
};
</script>

<style lang="less" scoped>
.m-redeem-card {
    position: relative;
    width: 100%;
    aspect-ratio: 1271 / 407;
    flex: none;
    transform: translateZ(0);
    transform-origin: center;
    transition: transform 220ms ease, filter 220ms ease;
    will-change: transform;

    .u-card {
        display: block;
        width: 100%;
        height: 100%;
        user-select: none;
    }

    .u-discount {
        position: absolute;
        z-index: 2;
        top: -0.8%;
        left: 0;
        width: 18.96%;
        height: auto;
        transform: translateY(-4%);
        user-select: none;
    }

    .u-redeem-button {
        position: absolute;
        right: 3.07%;
        bottom: 16.7%;
        width: 20.06%;
        aspect-ratio: 255 / 122;
        padding: 0;
        border: 0;
        background: var(--button-default) center / contain no-repeat;
        transition: transform 160ms ease, filter 160ms ease;

        &:not(:disabled) {
            cursor: pointer;
        }

        &:hover,
        &:focus-visible {
            background-image: var(--button-hover);
            transform: scale(1.04);
            outline: none;
        }

        &:active {
            transform: scale(0.98);
        }

        &:disabled {
            cursor: wait;
            opacity: 0.78;
            transform: none;
        }
    }

    &.is-redeemed .u-redeem-button {
        cursor: default;
        opacity: 1;
        background-image: var(--button-redeemed);
    }

    &.is-unavailable .u-redeem-button {
        cursor: not-allowed;
        opacity: 0.62;
    }

    &.is-redeemed {
        .u-redeem-button,
        .u-redeem-button:hover,
        .u-redeem-button:focus-visible {
            background-image: var(--button-redeemed);
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
    }
}

@media (prefers-reduced-motion: reduce) {
    .m-redeem-card,
    .u-redeem-button {
        transition: none;
    }
}
</style>
