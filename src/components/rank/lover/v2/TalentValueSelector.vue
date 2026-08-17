<template>
    <div v-loading="loading" class="c-talent-value-selector">
        <el-alert v-if="errorMessage" :title="errorMessage" type="error" :closable="false" show-icon />
        <div v-else class="m-talent-layers">
            <section v-for="(layer, layerIndex) in layers" :key="layerIndex" class="u-talent-layer">
                <strong>第 {{ layerIndex + 1 }} 层</strong>
                <div class="m-talent-options">
                    <button
                        v-for="talent in layer"
                        :key="talent.id"
                        type="button"
                        class="u-talent-option"
                        :class="{ 'is-selected': isSelected(talent.id) }"
                        :disabled="optionDisabled(talent.id)"
                        @click="toggle(talent)"
                    >
                        <img :src="talentIconUrl(talent.icon)" :alt="talent.name" />
                        <span>{{ talent.name }}</span>
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { loadMountTalents, talentIconUrl } from "@/utils/lover-v2-talent";

export default {
    name: "LoverV2TalentValueSelector",
    emits: ["update:modelValue"],
    props: {
        modelValue: { type: Array, default: () => [] },
        member: { type: Object, required: true },
        client: { type: String, default: "std" },
        limit: { type: Number, required: true },
    },
    data: function () {
        return { layers: [], loading: false, errorMessage: "", loadVersion: 0 };
    },
    computed: {
        selectedIds() {
            return new Set(this.modelValue.map((talent) => Number(talent.id)));
        },
    },
    watch: {
        "member.mount_id": {
            immediate: true,
            handler() {
                this.load();
            },
        },
        client() {
            this.load();
        },
    },
    methods: {
        talentIconUrl,
        async load() {
            const version = ++this.loadVersion;
            this.layers = [];
            this.errorMessage = "";
            if (!Number(this.member?.mount_id)) {
                this.loading = false;
                this.errorMessage = "该玩家没有可用的参赛心法，暂时不能选择具体奇穴";
                return;
            }
            this.loading = true;
            try {
                const layers = await loadMountTalents(this.member.mount_id, this.client);
                if (version === this.loadVersion) this.layers = layers;
            } catch (error) {
                console.error("[LoverV2TalentValueSelector.load]", error);
                if (version === this.loadVersion) {
                    this.errorMessage = error?.message || "奇穴资料读取失败，请稍后重试";
                }
            } finally {
                if (version === this.loadVersion) this.loading = false;
            }
        },
        isSelected(id) {
            return this.selectedIds.has(Number(id));
        },
        optionDisabled(id) {
            return !this.isSelected(id) && this.modelValue.length >= Number(this.limit);
        },
        toggle(talent) {
            const values = this.modelValue.map((item) => ({ ...item }));
            const index = values.findIndex((item) => Number(item.id) === Number(talent.id));
            if (index >= 0) values.splice(index, 1);
            else if (values.length < Number(this.limit)) values.push({ ...talent });
            this.$emit("update:modelValue", values);
        },
    },
};
</script>

<style scoped lang="less">
.c-talent-value-selector {
    min-height: 72px;
}
.m-talent-layers {
    display: grid;
    max-height: 360px;
    overflow-y: auto;
    gap: 10px;
}
.u-talent-layer {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    align-items: start;
    gap: 8px;
    > strong {
        padding-top: 9px;
        color: #8c6258;
        font-size: 13px;
    }
}
.m-talent-options {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
}
.u-talent-option {
    display: flex;
    align-items: center;
    min-width: 0;
    padding: 6px 8px;
    border: 1px solid #ddc5b4;
    border-radius: 7px;
    background: #fffaf3;
    color: #68453e;
    cursor: pointer;
    gap: 6px;
    text-align: left;
    img {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: 5px;
    }
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &.is-selected {
        border-color: #a6473b;
        background: #f8e4d7;
        color: #8f332b;
        box-shadow: inset 0 0 0 1px #a6473b;
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.45;
    }
}
@media screen and (max-width: 720px) {
    .u-talent-layer {
        grid-template-columns: 1fr;
    }
    .m-talent-options {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
