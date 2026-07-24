<template>
    <div
        class="c-lover-introduction"
        :class="{ 'is-empty': !content, 'is-compact': compact, 'is-plain': plain }"
    >
        <span class="u-label">自我介绍</span>
        <p ref="content" :class="{ 'is-collapsed': !expanded }">{{ content || emptyText }}</p>
        <button v-if="overflowing" type="button" @click="toggle">
            {{ expanded ? "收起" : "展开" }}
        </button>
    </div>
</template>

<script>
export default {
    name: "LoverV2IntroductionText",
    props: {
        text: { type: String, default: "" },
        compact: { type: Boolean, default: false },
        plain: { type: Boolean, default: false },
        emptyText: { type: String, default: "这位侠士暂未填写自我介绍" },
    },
    data: function () {
        return {
            expanded: false,
            overflowing: false,
        };
    },
    computed: {
        content() {
            return this.text?.trim() || "";
        },
    },
    watch: {
        text() {
            this.expanded = false;
            this.$nextTick(this.measureOverflow);
        },
        compact() {
            this.expanded = false;
            this.$nextTick(this.measureOverflow);
        },
    },
    mounted() {
        this.measureOverflow();
        window.addEventListener("resize", this.measureOverflow);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.measureOverflow);
    },
    methods: {
        measureOverflow() {
            const content = this.$refs.content;
            if (!content || !this.content) {
                this.overflowing = false;
                return;
            }
            if (!this.expanded) this.overflowing = content.scrollHeight > content.clientHeight + 1;
        },
        toggle() {
            this.expanded = !this.expanded;
            if (!this.expanded) this.$nextTick(this.measureOverflow);
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-introduction {
    position: relative;
    padding: 11px 13px;
    border: 1px solid #edddd2;
    border-radius: 9px;
    background: #fffaf5;

    .u-label {
        display: block;
        margin-bottom: 5px;
        color: #a76758;
        font-size: 12px;
        font-weight: 600;
    }

    p {
        margin: 0;
        color: #765d56;
        font-size: 13px;
        line-height: 1.75;
        overflow-wrap: anywhere;
        white-space: pre-line;

        &.is-collapsed {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
    }

    button {
        margin-top: 5px;
        padding: 0;
        border: 0;
        background: transparent;
        color: #a44338;
        cursor: pointer;
        font-size: 12px;
    }

    &.is-empty p {
        color: #ae9b95;
    }

    &.is-compact {
        padding: 8px 10px;

        p {
            font-size: 12px;

            &.is-collapsed {
                -webkit-line-clamp: 2;
            }
        }
    }

    &.is-plain {
        display: flex;
        align-items: baseline;
        gap: 6px;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;

        .u-label {
            flex: 0 0 auto;
            margin: 0;
            color: #a18a83;
            font-size: 11px;
            font-weight: 400;
        }

        p {
            min-width: 0;
            flex: 1;
            color: #8b746e;
            line-height: 1.6;
        }

        button {
            flex: 0 0 auto;
            margin: 0;
        }
    }
}
</style>
