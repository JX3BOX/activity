<template>
    <el-dialog
        :model-value="modelValue"
        class="m-lover-v2-mate-card-dialog"
        width="min(980px, calc(100vw - 32px))"
        align-center
        destroy-on-close
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #header><strong>搭子名片</strong></template>
        <div class="m-content">
            <MateSocialCard :registration="registration" />
        </div>
    </el-dialog>
</template>

<script>
import MateSocialCard from "./MateSocialCard.vue";

export default {
    name: "LoverV2MateCardDetailDialog",
    components: { MateSocialCard },
    emits: ["update:modelValue"],
    props: {
        modelValue: { type: Boolean, default: false },
        registration: { type: Object, default: null },
    },
};
</script>

<style scoped lang="less">
.m-content {
    max-height: min(76vh, 880px);
    overflow: auto;
}
</style>
