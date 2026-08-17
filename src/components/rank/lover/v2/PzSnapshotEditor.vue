<template>
    <section class="c-pz-snapshot-editor">
        <div v-if="canEdit" class="m-source-form">
            <el-form label-position="top" @submit.prevent>
                <el-form-item label="魔盒配装方案编号或链接">
                    <el-input
                        v-model.trim="sourceInput"
                        maxlength="300"
                        placeholder="例如：1749747，或粘贴配装详情页链接"
                        :disabled="loading || reading"
                        @input="candidate = null"
                        @keyup.enter="loadSource"
                    >
                        <template #append>
                            <el-button :loading="reading" :disabled="loading" @click="loadSource">读取配装</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <p class="u-help">读取后请核对装备、属性与奇穴；确认提交时会保存为本场独立记录，之后修改原配装不会影响这里。</p>
            <el-alert v-if="errorMessage" :title="errorMessage" type="error" :closable="false" show-icon />
        </div>

        <template v-if="previewSnapshot">
            <div class="u-preview-head">
                <div>
                    <strong>{{ previewSnapshot.schema?.title || `配装 #${previewSnapshot.source?.id}` }}</strong>
                    <span>
                        来源 #{{ previewSnapshot.source?.id }} · 原配装更新于
                        {{ formatDateTime(previewSnapshot.source?.updated_at) }}
                    </span>
                    <span v-if="previewSnapshot.captured_at">本场保存于 {{ formatDateTime(previewSnapshot.captured_at) }}</span>
                </div>
                <div class="u-preview-actions">
                    <el-link :href="sourceUrl" target="_blank" type="primary">打开原配装</el-link>
                    <el-tag :type="candidate ? 'warning' : 'success'">{{ candidate ? "待确认" : "已提交" }}</el-tag>
                </div>
            </div>
            <div v-if="restrictions.length" class="m-card-restrictions">
                <strong>本场天命签限制</strong>
                <ul>
                    <li v-for="restriction in restrictions" :key="`${restriction.draw_id}-${restriction.kind}`">
                        {{ restrictionLabel(restriction) }}
                    </li>
                </ul>
            </div>
            <PzLocalAdjustment
                v-if="canEdit"
                :key="adjustmentKey"
                :snapshot="previewSnapshot"
                :restrictions="restrictions"
                @change="handleAdjustmentChange"
                @state-change="handleAdjustmentState"
            />
            <PzSnapshotFrame
                :schema="previewSnapshot.schema"
                :restrictions="frameRestrictions"
                :title="`${memberName}的本场配装`"
            />
            <div v-if="candidate" class="u-submit">
                <el-alert
                    :title="submitNotice"
                    :type="submitBlockedReason ? 'error' : 'warning'"
                    :closable="false"
                    show-icon
                />
                <el-button
                    type="primary"
                    :loading="loading || adjustmentPending"
                    :disabled="Boolean(submitBlockedReason)"
                    @click="$emit('submit', candidate)"
                >
                    确认并提交本场配装
                </el-button>
            </div>
        </template>
        <EmptyState v-else icon="match-config" :description="emptyDescription" compact />
    </section>
</template>

<script>
import { getPz } from "@/service/rank/pz";
import { __Root } from "@/utils/config";
import { buildPzSnapshot, parsePzId } from "@/utils/lover-v2-pz";
import { formatDateTime } from "@/utils/lover-v2";
import EmptyState from "./EmptyState.vue";
import PzLocalAdjustment from "./PzLocalAdjustment.vue";
import PzSnapshotFrame from "./PzSnapshotFrame.vue";

export default {
    name: "LoverV2PzSnapshotEditor",
    components: { EmptyState, PzLocalAdjustment, PzSnapshotFrame },
    emits: ["submit"],
    props: {
        snapshot: { type: Object, default: null },
        memberName: { type: String, default: "队员" },
        canEdit: { type: Boolean, default: false },
        disabledDescription: { type: String, default: "" },
        loading: { type: Boolean, default: false },
        restrictions: { type: Array, default: () => [] },
    },
    data: function () {
        return {
            sourceInput: "",
            candidate: null,
            reading: false,
            errorMessage: "",
            adjustmentPending: false,
            adjustmentError: "",
        };
    },
    computed: {
        previewSnapshot() {
            return this.candidate || this.snapshot;
        },
        emptyDescription() {
            if (this.canEdit) return "请先读取你的魔盒配装方案";
            return this.disabledDescription || "这位队员还没有提交本场配装";
        },
        sourceUrl() {
            const id = this.previewSnapshot?.source?.id;
            return id ? `${String(__Root).replace(/\/?$/, "/")}pz/view/${id}` : "";
        },
        frameRestrictions() {
            return this.restrictions.filter((restriction) => restriction.kind !== "disable_talent_exact");
        },
        adjustmentKey() {
            const source = this.previewSnapshot?.source || {};
            return `${source.id || 0}:${source.updated_at || ""}:${this.candidate ? "draft" : "saved"}`;
        },
        exactConflicts() {
            return this.exactTalentConflicts(this.previewSnapshot);
        },
        submitBlockedReason() {
            if (this.adjustmentPending) return "正在重新计算调整后的配装，请稍候";
            if (this.adjustmentError) return this.adjustmentError;
            if (this.exactConflicts.length) {
                return `当前仍使用被封奇穴「${this.exactConflicts.map((talent) => talent.name).join("、")}」，请先调整奇穴`;
            }
            return "";
        },
        submitNotice() {
            return this.submitBlockedReason || "当前只是预览，点击确认后才会替换你在本场战斗中的配装记录。";
        },
    },
    watch: {
        snapshot: {
            immediate: true,
            deep: true,
            handler(value) {
                this.candidate = null;
                this.errorMessage = "";
                this.adjustmentPending = false;
                this.adjustmentError = "";
                this.sourceInput = value?.source?.id ? String(value.source.id) : "";
            },
        },
    },
    methods: {
        formatDateTime,
        restrictionLabel(restriction) {
            const labels = {
                disable_talent: "禁用某层奇穴",
                disable_talent_exact: "禁用具体奇穴",
                disable_equip_slot: "禁用装备部位",
                disable_skill: "禁用技能",
                remove_restriction: "解除限制",
                none: "指定目标",
            };
            const values = (restriction.values || [])
                .map((value) => (value && typeof value === "object" ? value.name : value))
                .join("、");
            return `${restriction.card_name}：${labels[restriction.kind] || "签面效果"}${values ? `（${values}）` : ""}`;
        },
        exactTalentConflicts(snapshot) {
            const selectedIds = new Set(
                (snapshot?.schema?.talent_pzcode || []).map((talent) => Number(talent?.id)).filter(Boolean)
            );
            return this.restrictions
                .filter((restriction) => restriction.kind === "disable_talent_exact")
                .flatMap((restriction) => restriction.values || [])
                .filter((talent) => selectedIds.has(Number(talent?.id)));
        },
        handleAdjustmentChange(snapshot) {
            this.candidate = snapshot;
            this.adjustmentPending = false;
            this.adjustmentError = "";
        },
        handleAdjustmentState(state) {
            this.adjustmentPending = Boolean(state?.pending);
            this.adjustmentError = state?.error || "";
        },
        async loadSource() {
            if (this.reading || this.loading) return;
            this.errorMessage = "";
            let id;
            try {
                id = parsePzId(this.sourceInput);
            } catch (error) {
                this.errorMessage = error.message;
                return;
            }

            this.reading = true;
            try {
                const res = await getPz(id);
                const schema = res?.data?.data;
                if (!schema) {
                    this.errorMessage = "没有读取到该配装，请确认它存在且你有查看权限";
                    return;
                }
                try {
                    const candidate = buildPzSnapshot(schema, id);
                    this.candidate = candidate;
                } catch (error) {
                    console.error("[LoverV2PzSnapshotEditor.buildSnapshot]", error);
                    this.errorMessage = error?.message || "配装数据格式无效，请更换一份配装";
                }
            } catch (error) {
                console.error("[LoverV2PzSnapshotEditor.loadSource]", error);
                this.candidate = null;
            } finally {
                this.reading = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-source-form {
    margin-bottom: 18px;

    :deep(.el-form-item) {
        margin-bottom: 8px;
    }
}

.u-help {
    margin: 0;
    color: #987f78;
    font-size: 13px;
    line-height: 1.7;
}

.m-source-form .el-alert {
    margin-top: 10px;
}

.m-card-restrictions {
    margin-bottom: 12px;
    padding: 12px 14px;
    border: 1px solid #d59a7c;
    border-radius: 9px;
    background: #fff0e5;
    color: #7d4035;

    ul {
        margin: 7px 0 0;
        padding-left: 20px;
    }
}

.u-preview-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;

    strong,
    span {
        display: block;
    }

    strong {
        color: #57352f;
        font-size: 17px;
    }

    span {
        margin-top: 4px;
        color: #9b827b;
        font-size: 12px;
    }
}

.u-preview-actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: 10px;
}

.u-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 14px;

    .el-alert {
        flex: 1;
    }

    .el-button {
        flex: none;
    }
}

@media screen and (max-width: 720px) {
    .u-preview-head {
        align-items: stretch;
        flex-direction: column;
    }

    .u-preview-actions {
        justify-content: space-between;
    }

    .u-submit {
        align-items: stretch;
        flex-direction: column;
    }
}
</style>
