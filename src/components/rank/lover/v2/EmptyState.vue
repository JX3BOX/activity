<template>
    <div class="c-lover-empty" :class="{ 'is-compact': compact }">
        <FeatureBadge class="u-icon" :name="icon" :small="compact" />
        <h3 v-if="title">{{ title }}</h3>
        <p v-if="description">{{ description }}</p>
    </div>
</template>

<script>
import FeatureBadge from "./FeatureBadge.vue";

export default {
    name: "LoverV2EmptyState",
    components: { FeatureBadge },
    props: {
        icon: { type: String, default: "schedule" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        compact: { type: Boolean, default: false },
    },
};
</script>

<style scoped lang="less">
.c-lover-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 44px 24px;
    text-align: center;

    .u-icon {
        flex: none;
        margin-bottom: 12px;
    }

    h3 {
        margin: 0 0 8px;
        color: #5d3832;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 20px;
        font-weight: 400;
    }

    p {
        margin: 0;
        color: #90766e;
        line-height: 1.7;
    }

    &.is-compact {
        padding: 26px 16px;

        .u-icon {
            margin-bottom: 8px;
        }

        p {
            font-size: 13px;
        }
    }
}
</style>
