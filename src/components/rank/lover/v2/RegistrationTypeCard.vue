<template>
    <button
        class="c-lover-type-card"
        :class="{ 'is-selected': selected, 'is-disabled': disabled }"
        type="button"
        :disabled="disabled"
        @click="$emit('select', type)"
    >
        <FeatureBadge :name="type" />
        <span class="u-title">{{ title }}</span>
        <span class="u-desc">{{ description }}</span>
        <span class="u-check">
            <el-icon v-if="selected"><Select /></el-icon>
            {{ selected ? "已选择" : "选择身份" }}
        </span>
    </button>
</template>

<script>
import FeatureBadge from "./FeatureBadge.vue";

export default {
    name: "LoverV2RegistrationTypeCard",
    components: { FeatureBadge },
    emits: ["select"],
    props: {
        type: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        selected: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
};
</script>

<style scoped lang="less">
.c-lover-type-card {
    display: flex;
    min-height: 320px;
    align-items: center;
    flex-direction: column;
    padding: 26px 22px 22px;
    border: 1px solid rgba(139, 81, 68, 0.18);
    border-radius: 14px;
    background: linear-gradient(180deg, #fffdf9, #fbf3eb);
    box-shadow: 0 10px 28px rgba(80, 42, 35, 0.06);
    color: #5a3933;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover:not(:disabled),
    &.is-selected {
        border-color: #c66a59;
        box-shadow: 0 16px 34px rgba(134, 57, 47, 0.15);
        transform: translateY(-4px);
    }

    &.is-selected {
        background: linear-gradient(180deg, #fffaf1, #f8e6d7);
    }

    &.is-disabled {
        cursor: not-allowed;
        filter: grayscale(0.7);
        opacity: 0.64;
    }

    .u-title {
        margin-top: 6px;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.08em;
    }

    .u-desc {
        flex: 1;
        margin-top: 10px;
        color: #8c736c;
        font-size: 14px;
        line-height: 1.75;
        text-align: center;
    }

    .u-check {
        display: inline-flex;
        height: 32px;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin-top: 16px;
        padding: 0 18px;
        border: 1px solid #d5bca3;
        border-radius: 2px;
        background: #ead7bd;
        color: #8b493e;
        font-size: 13px;
        font-weight: 600;
    }

    &.is-selected .u-check {
        border-color: #93473c;
        background: linear-gradient(180deg, #a55045, #81372f);
        color: #fff;
    }
}
</style>
