<template>
    <el-select
        :model-value="modelValue"
        filterable
        clearable
        placeholder="请选择参赛心法"
        class="c-xinfa-selector"
        @update:model-value="change"
    >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            <span class="u-option">
                <img :src="showMountIcon(item.id)" :alt="item.name" />
                {{ item.name }}
            </span>
        </el-option>
    </el-select>
</template>

<script>
import { showMountIcon } from "@jx3box/jx3box-common/js/utils";
import { getCombatRole, getXinfaOptions } from "@/utils/lover-v2-xf";

export default {
    name: "LoverV2XinfaSelector",
    emits: ["update:modelValue", "change-role"],
    props: {
        modelValue: { type: [Number, String], default: null },
        client: { type: String, default: "std" },
    },
    computed: {
        options() {
            return getXinfaOptions(this.client);
        },
    },
    methods: {
        showMountIcon,
        change(value) {
            const mountId = value == null ? null : Number(value);
            this.$emit("update:modelValue", mountId);
            this.$emit("change-role", mountId ? getCombatRole(mountId) : null);
        },
    },
};
</script>

<style scoped lang="less">
.c-xinfa-selector {
    width: 100%;
}

.u-option {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
}
</style>
