<template>
    <section class="c-pz-local-adjustment">
        <div class="u-adjustment-head">
            <div>
                <strong>赛场配装调整</strong>
                <span>只修改本场保存的快照，不会改动魔盒中的原配装。</span>
            </div>
            <el-tag effect="plain">正式服</el-tag>
        </div>

        <el-form label-position="top">
            <el-form-item label="卸下指定部位">
                <el-select
                    v-model="selectedSlots"
                    multiple
                    clearable
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="选择本场不穿戴的装备部位"
                    :disabled="busy"
                    @change="handleEquipmentChange"
                >
                    <el-option
                        v-for="slot in equipmentOptions"
                        :key="slot.value"
                        :label="lockedSlots.includes(slot.value) ? `${slot.label}（天命签锁定）` : slot.label"
                        :value="slot.value"
                        :disabled="lockedSlots.includes(slot.value)"
                    />
                </el-select>
                <p v-if="lockedSlotLabels" class="u-help is-locked">
                    天命签已自动卸下并锁定：{{ lockedSlotLabels }}
                </p>
            </el-form-item>
        </el-form>

        <div class="m-talent-editor">
            <strong>本场奇穴</strong>
            <p class="u-help">可直接在模拟器中调整；保存前会用调整后的装备和奇穴重新计算本场快照。</p>
            <div v-if="talentSupported" :id="containerId" class="u-talent-container" />
            <el-alert
                v-else
                title="原配装缺少正式服奇穴代码，当前只能调整装备部位"
                type="info"
                :closable="false"
                show-icon
            />
        </div>

        <el-alert v-if="errorMessage" :title="errorMessage" type="error" :closable="false" show-icon />
        <p v-else-if="busy" class="u-recalculating">正在按本场调整重新计算装备属性与装分…</p>

        <iframe
            ref="calculatorFrame"
            class="u-calculator-frame"
            :src="iframeUrl"
            title="配装快照计算器"
            tabindex="-1"
            aria-hidden="true"
        />
    </section>
</template>

<script>
import JX3_QIXUE from "@jx3box/jx3box-talent";
import "@jx3box/jx3box-talent/talent.css";
import $ from "jquery";
import { __Root } from "@/utils/config";
import {
    applyEquipmentRemoval,
    applyTalentAdjustment,
    availableEquipmentSlots,
    buildPzJbbb,
    lockedEquipmentSlots,
    mergeCalculatedPzSnapshot,
    removedEquipmentSlots,
} from "@/utils/lover-v2-pz";

let adjustmentSequence = 0;

const clone = (value) => JSON.parse(JSON.stringify(value));

export default {
    name: "LoverV2PzLocalAdjustment",
    emits: ["change", "state-change"],
    props: {
        snapshot: { type: Object, required: true },
        restrictions: { type: Array, default: () => [] },
    },
    data() {
        adjustmentSequence += 1;
        return {
            containerId: `lover-pz-talent-${adjustmentSequence}`,
            localSnapshot: clone(this.snapshot),
            selectedSlots: [],
            driver: null,
            frameReady: false,
            pendingRequest: false,
            errorMessage: "",
            recalculateTimer: null,
        };
    },
    computed: {
        iframeUrl() {
            const root = process.env.VUE_APP_PZ_IFRAME_URL || `${String(__Root).replace(/\/?$/, "/")}pz/iframe.html`;
            const url = new URL(root, window.location.origin);
            url.searchParams.set("mode", "horizontal");
            url.searchParams.set("disableClick", "1");
            url.searchParams.set("snapshot", "1");
            url.searchParams.set("fit", "1");
            return url.toString();
        },
        iframeOrigin() {
            return new URL(this.iframeUrl).origin;
        },
        lockedSlots() {
            return lockedEquipmentSlots(this.restrictions);
        },
        equipmentOptions() {
            return availableEquipmentSlots(this.localSnapshot);
        },
        lockedSlotLabels() {
            return this.equipmentOptions
                .filter((slot) => this.lockedSlots.includes(slot.value))
                .map((slot) => slot.label)
                .join("、");
        },
        talentCode() {
            return this.localSnapshot?.schema?.talent_code || {};
        },
        talentSupported() {
            return (
                (!this.localSnapshot?.schema?.client || this.localSnapshot.schema.client === "std") &&
                Boolean(this.talentCode.xf) &&
                Boolean(this.talentCode.sq)
            );
        },
        busy() {
            return this.pendingRequest;
        },
    },
    async mounted() {
        window.addEventListener("message", this.handleMessage);
        this.selectedSlots = [...new Set([...removedEquipmentSlots(this.localSnapshot), ...this.lockedSlots])];
        const forcedMissing = this.lockedSlots.some(
            (slot) => Boolean(this.localSnapshot?.schema?.content?.[slot]?.equip)
        );
        if (forcedMissing) {
            try {
                this.localSnapshot = applyEquipmentRemoval(this.localSnapshot, this.selectedSlots, this.lockedSlots);
                this.scheduleRecalculate();
            } catch (error) {
                this.setError(error?.message || "天命签禁用装备处理失败");
            }
        }
        if (this.talentSupported) await this.initializeTalent();
    },
    beforeUnmount() {
        window.removeEventListener("message", this.handleMessage);
        $(document).off(`JX3_QIXUE_Change.${this.containerId}`, this.handleTalentChange);
        if (this.recalculateTimer) window.clearTimeout(this.recalculateTimer);
    },
    methods: {
        async initializeTalent() {
            $(document).on(`JX3_QIXUE_Change.${this.containerId}`, this.handleTalentChange);
            try {
                const options = {
                    container: `#${this.containerId}`,
                    xf: this.talentCode.xf,
                    sq: this.talentCode.sq,
                    editable: true,
                    client: "std",
                };
                if (this.talentCode.version) options.version = this.talentCode.version;
                this.driver = await new JX3_QIXUE(options);
            } catch (error) {
                console.error("[LoverV2PzLocalAdjustment.initializeTalent]", error);
                this.errorMessage = "奇穴模拟器加载失败，装备仍可调整；请稍后重试奇穴修改";
                this.$emit("state-change", { pending: false, error: "" });
            }
        },
        handleTalentChange(_event, instance) {
            if (!this.driver || instance !== this.driver) return;
            try {
                this.localSnapshot = applyTalentAdjustment(this.localSnapshot, instance.code, instance.overview);
                this.scheduleRecalculate();
            } catch (error) {
                this.setError(error?.message || "奇穴调整失败");
            }
        },
        handleEquipmentChange(value) {
            try {
                this.selectedSlots = [...new Set([...(value || []), ...this.lockedSlots])];
                this.localSnapshot = applyEquipmentRemoval(
                    this.localSnapshot,
                    this.selectedSlots,
                    this.lockedSlots
                );
                this.scheduleRecalculate();
            } catch (error) {
                this.selectedSlots = [...removedEquipmentSlots(this.localSnapshot), ...this.lockedSlots];
                this.setError(error?.message || "装备部位调整失败");
            }
        },
        scheduleRecalculate() {
            this.errorMessage = "";
            this.pendingRequest = true;
            this.$emit("state-change", { pending: true, error: "" });
            if (this.recalculateTimer) window.clearTimeout(this.recalculateTimer);
            this.recalculateTimer = window.setTimeout(this.recalculate, 250);
        },
        recalculate() {
            if (!this.frameReady) return;
            try {
                const jbbb = buildPzJbbb(this.localSnapshot);
                this.$refs.calculatorFrame?.contentWindow?.postMessage(
                    { type: "jx3box:pz-iframe-render", version: 2, jbbb },
                    this.iframeOrigin
                );
            } catch (error) {
                this.setError(error?.message || "本场配装重新计算失败");
            }
        },
        handleMessage(event) {
            const frame = this.$refs.calculatorFrame;
            if (!frame || event.source !== frame.contentWindow || event.origin !== this.iframeOrigin) return;
            const message = event.data || {};
            if (message.type === "jx3box:pz-iframe-ready") {
                this.frameReady = true;
                if (this.pendingRequest) this.recalculate();
                return;
            }
            if (Number(message.version) !== 2) return;
            if (message.type === "jx3box:pz-iframe-loaded") {
                try {
                    this.localSnapshot = mergeCalculatedPzSnapshot(this.localSnapshot, message.schema);
                    this.pendingRequest = false;
                    this.errorMessage = "";
                    this.$emit("change", clone(this.localSnapshot));
                    this.$emit("state-change", { pending: false, error: "" });
                } catch (error) {
                    this.setError(error?.message || "重新计算后的配装数据无效");
                }
            } else if (message.type === "jx3box:pz-iframe-error") {
                this.setError(message.message || "配装计算器没有生成有效快照");
            }
        },
        setError(message) {
            this.pendingRequest = false;
            this.errorMessage = message;
            this.$emit("state-change", { pending: false, error: message });
        },
    },
};
</script>

<style scoped lang="less">
.c-pz-local-adjustment {
    position: relative;
    margin: 14px 0;
    padding: 16px;
    overflow: hidden;
    border: 1px solid #e2c8b8;
    border-radius: 10px;
    background: rgba(255, 250, 241, 0.92);
}
.u-adjustment-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;

    strong,
    span {
        display: block;
    }
    strong {
        color: #693a32;
        font-size: 16px;
    }
    span {
        margin-top: 3px;
        color: #9a8179;
        font-size: 12px;
    }
}
.el-select {
    width: 100%;
}
.u-help {
    margin: 5px 0 0;
    color: #987f78;
    font-size: 12px;
    line-height: 1.6;
}
.u-help.is-locked {
    color: #a4483d;
}
.m-talent-editor {
    margin-top: 4px;

    > strong {
        color: #693a32;
        font-size: 14px;
    }
}
.u-talent-container {
    min-height: 130px;
    margin-top: 10px;
    overflow-x: auto;
}
.u-recalculating {
    margin: 10px 0 0;
    color: #a06442;
    font-size: 13px;
}
.u-calculator-frame {
    position: absolute;
    width: 1px;
    height: 1px;
    border: 0;
    opacity: 0;
    pointer-events: none;
}
</style>

<style lang="less">
// 奇穴库的候选层默认向上展开；本组件同时需要横向滚动，因此改为向下展开并为候选层预留高度。
.c-pz-local-adjustment .u-talent-container .w-qixue-box .w-qixue-obox {
    top: 100%;
    bottom: auto;
}
.c-pz-local-adjustment .u-talent-container .w-qixue-box .w-qixue-obox.on {
    align-items: flex-start;
}
.c-pz-local-adjustment .u-talent-container:has(.w-qixue-obox.on) {
    min-height: 540px;
}
</style>
