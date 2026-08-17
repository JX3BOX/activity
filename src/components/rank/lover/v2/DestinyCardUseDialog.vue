<template>
    <el-dialog
        :model-value="modelValue"
        class="lover-v2-card-use-dialog"
        width="760px"
        append-to-body
        :close-on-click-modal="false"
        @open="initialize"
        @closed="reset"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <template #header>
            <div class="u-dialog-title">
                <strong>使用「{{ draw?.card?.name || "天命签" }}」</strong>
                <span>由建队队长选择本签的生效目标</span>
            </div>
        </template>

        <el-alert
            :title="draw?.card?.desc || '请按签面规则完成目标选择'"
            type="warning"
            :closable="false"
            show-icon
        />
        <div v-if="formsReady" class="m-requirements">
            <section v-for="(requirement, index) in requirements" :key="index" class="u-requirement">
                <header>
                    <strong>{{ requirementTitle(requirement) }}</strong>
                    <el-tag :type="requirement.required ? 'danger' : 'info'" effect="plain">
                        {{ requirement.required ? "必须选择" : "可选" }}
                    </el-tag>
                </header>
                <div class="m-candidates" role="group" :aria-label="requirementTitle(requirement)">
                    <button
                        v-for="member in candidates(requirement)"
                        :key="member.user_id"
                        class="u-candidate"
                        :class="{ 'is-selected': isSubjectSelected(index, member.user_id) }"
                        type="button"
                        :aria-pressed="isSubjectSelected(index, member.user_id)"
                        :disabled="candidateDisabled(index, member.user_id, requirement.count)"
                        @click="toggleSubject(index, member.user_id, requirement.count)"
                    >
                        <el-avatar :size="42" :src="memberAvatar(member)" />
                        <span class="u-candidate-main">
                            <strong>{{ memberName(member) }}</strong>
                            <small>UID {{ member.user_id }}</small>
                        </span>
                        <span class="u-candidate-state">
                            {{ isSubjectSelected(index, member.user_id) ? "已选择" : "选择" }}
                        </span>
                    </button>
                </div>
                <p class="u-selection-count">
                    已选择 {{ forms[index].user_ids.length }} / {{ requirement.count }} 名玩家
                </p>
                <div v-if="requirement.effect.value_count" class="m-subject-values">
                    <div v-for="userId in forms[index].user_ids" :key="userId" class="u-subject-value">
                        <span>{{ memberName(memberById(userId)) }}</span>
                        <TalentValueSelector
                            v-if="requirement.effect.kind === 'disable_talent_exact'"
                            :model-value="forms[index].values[userId]"
                            :member="memberById(userId)"
                            :client="client"
                            :limit="requirement.effect.value_count"
                            @update:model-value="forms[index].values[userId] = $event"
                        />
                        <el-select
                            v-else
                            v-model="forms[index].values[userId]"
                            multiple
                            collapse-tags
                            :multiple-limit="requirement.effect.value_count"
                            :placeholder="effectPlaceholder(requirement)"
                        >
                            <el-option
                                v-for="option in requirement.effect.options"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                            />
                        </el-select>
                    </div>
                </div>
            </section>
        </div>

        <template #footer>
            <el-button @click="$emit('update:modelValue', false)">暂不使用</el-button>
            <el-button type="primary" :loading="loading" :disabled="!formsReady" @click="submit">确认使用</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { useCard } from "@/service/rank/lover-v2";
import TalentValueSelector from "./TalentValueSelector.vue";

export default {
    name: "LoverV2DestinyCardUseDialog",
    components: { TalentValueSelector },
    emits: ["update:modelValue", "used"],
    props: {
        modelValue: { type: Boolean, default: false },
        eventId: { type: Number, required: true },
        matchId: { type: Number, required: true },
        draw: { type: Object, default: null },
        match: { type: Object, required: true },
        client: { type: String, default: "std" },
    },
    data: function () {
        return {
            forms: [],
            loading: false,
        };
    },
    computed: {
        requirements() {
            return this.draw?.target_payload?.requirements || [];
        },
        allMembers() {
            return [...(this.match?.team1?.members || []), ...(this.match?.team2?.members || [])];
        },
        formsReady() {
            return (
                this.forms.length === this.requirements.length &&
                this.forms.every((form) => Array.isArray(form?.user_ids) && form.values)
            );
        },
    },
    methods: {
        initialize() {
            this.forms = this.requirements.map(() => ({ user_ids: [], values: {} }));
        },
        reset() {
            this.forms = [];
        },
        requirementTitle(requirement) {
            const side = requirement.target === "self" ? "我方" : "敌方";
            const effects = {
                none: "作为签面目标",
                disable_talent: "禁用某层奇穴",
                disable_talent_exact: "禁用具体奇穴",
                disable_equip_slot: "禁用装备部位",
                disable_skill: "禁用技能",
                remove_restriction: "解除限制",
            };
            return `选择 ${requirement.count} 名${side}玩家，${effects[requirement.effect.kind] || "应用效果"}`;
        },
        effectPlaceholder(requirement) {
            return `选择 ${requirement.effect.value_count} 项效果`;
        },
        memberName(member) {
            return member?.display_name || member?.name || `UID ${member?.user_id || "—"}`;
        },
        memberAvatar(member) {
            return showAvatar(
                member?.avatar || member?.user_avatar || member?.avatar_url || "https://cdn.jx3box.com/image/common/avatar.png"
            );
        },
        memberById(userId) {
            return this.allMembers.find((member) => Number(member.user_id) === Number(userId)) || { user_id: userId };
        },
        candidates(requirement) {
            const ownTeamId = Number(this.draw?.team_id);
            const targetTeamId =
                requirement.target === "self"
                    ? ownTeamId
                    : Number(this.match.team1?.id) === ownTeamId
                      ? Number(this.match.team2?.id)
                      : Number(this.match.team1?.id);
            const team = Number(this.match.team1?.id) === targetTeamId ? this.match.team1 : this.match.team2;
            return team?.members || [];
        },
        isSubjectSelected(index, userId) {
            return this.forms[index].user_ids.some((selectedId) => Number(selectedId) === Number(userId));
        },
        candidateDisabled(index, userId, limit) {
            return !this.isSubjectSelected(index, userId) && this.forms[index].user_ids.length >= Number(limit);
        },
        toggleSubject(index, userId, limit) {
            const selected = this.forms[index].user_ids;
            const normalizedUserId = Number(userId);
            const selectedIndex = selected.findIndex((selectedId) => Number(selectedId) === normalizedUserId);
            if (selectedIndex >= 0) {
                selected.splice(selectedIndex, 1);
            } else if (selected.length < Number(limit)) {
                selected.push(normalizedUserId);
            }
            this.syncSubjects(index);
        },
        syncSubjects(index) {
            const selected = new Set(this.forms[index].user_ids.map(Number));
            const values = {};
            for (const [userId, selectedValues] of Object.entries(this.forms[index].values)) {
                if (selected.has(Number(userId))) values[userId] = selectedValues;
            }
            for (const userId of selected) values[userId] ||= [];
            this.forms[index].values = values;
        },
        validate() {
            for (let index = 0; index < this.requirements.length; index++) {
                const requirement = this.requirements[index];
                const form = this.forms[index];
                if (requirement.required && form.user_ids.length !== requirement.count) {
                    return `第 ${index + 1} 项需要选择 ${requirement.count} 名玩家`;
                }
                if (!requirement.required && form.user_ids.length > requirement.count) {
                    return `第 ${index + 1} 项最多选择 ${requirement.count} 名玩家`;
                }
                for (const userId of form.user_ids) {
                    if ((form.values[userId] || []).length !== requirement.effect.value_count) {
                        return `${this.memberName(this.memberById(userId))} 还需要选择 ${requirement.effect.value_count} 项效果`;
                    }
                }
            }
            return "";
        },
        async submit() {
            if (this.loading || !this.draw) return;
            const error = this.validate();
            if (error) {
                this.$message.warning(error);
                return;
            }
            const selections = this.forms
                .map((form, requirementIndex) => ({
                    requirement_index: requirementIndex,
                    subjects: form.user_ids.map((userId) => ({
                        user_id: Number(userId),
                        values: [...(form.values[userId] || [])],
                    })),
                }))
                .filter((selection) => selection.subjects.length);
            this.loading = true;
            try {
                const res = await useCard(this.eventId, this.matchId, this.draw.id, selections);
                this.$emit("used", res.data.data);
                this.$emit("update:modelValue", false);
                this.$message.success("天命签已生效");
            } catch (error) {
                console.error("[LoverV2DestinyCardUseDialog.submit]", error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="less">
.lover-v2-card-use-dialog {
    .u-dialog-title {
        display: flex;
        align-items: baseline;
        gap: 12px;

        strong {
            color: #58332d;
            font-size: 23px;
        }

        span {
            color: #9b7c73;
            font-size: 13px;
        }
    }

    .m-requirements {
        display: grid;
        gap: 14px;
        margin-top: 18px;
    }

    .u-requirement {
        padding: 16px;
        border: 1px solid #ead5c7;
        border-radius: 10px;
        background: rgba(255, 250, 244, 0.82);

        > header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 12px;
            color: #69443d;
        }
    }

    .m-candidates {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .u-candidate {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid #ead7ca;
        border-radius: 9px;
        background: #fffaf5;
        color: #6d4b44;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;

        &:hover:not(:disabled) {
            border-color: #c98c78;
            box-shadow: 0 4px 12px rgba(112, 55, 45, 0.1);
        }

        &.is-selected {
            border-color: #a94b40;
            background: #f9e8df;
            box-shadow: inset 0 0 0 1px rgba(169, 75, 64, 0.12);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.48;
        }

        .el-avatar {
            flex: 0 0 auto;
            border: 1px solid rgba(143, 86, 72, 0.2);
            background: #f1e4da;
        }
    }

    .u-candidate-main {
        min-width: 0;
        flex: 1;

        strong,
        small {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        strong {
            color: #57362f;
            font-size: 14px;
        }

        small {
            margin-top: 3px;
            color: #a18b84;
            font-size: 12px;
        }
    }

    .u-candidate-state {
        flex: 0 0 auto;
        color: #a8786d;
        font-size: 12px;

        .is-selected & {
            color: #9f4138;
            font-weight: 600;
        }
    }

    .u-selection-count {
        margin: 9px 0 0;
        color: #9c8179;
        font-size: 12px;
    }

    .m-subject-values {
        display: grid;
        gap: 10px;
        margin-top: 12px;
    }

    .u-subject-value {
        display: grid;
        grid-template-columns: 140px minmax(0, 1fr);
        align-items: center;
        gap: 12px;

        > span {
            overflow: hidden;
            color: #785950;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    @media (max-width: 640px) {
        .m-candidates {
            grid-template-columns: 1fr;
        }
    }
}
</style>
