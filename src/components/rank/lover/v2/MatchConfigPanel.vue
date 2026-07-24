<template>
    <section class="c-lover-match-config m-lover-v2-panel">
        <div class="u-head">
            <div>
                <h3>本队赛前配装</h3>
                <p>每位队员分别确认自己的本场配装；队长检查五人均已提交后，再统一锁定。</p>
            </div>
            <div class="u-head-status">
                <el-progress type="circle" :width="58" :percentage="progress" :stroke-width="5" />
                <div class="u-head-actions">
                    <el-tag :type="record?.status === 'locked' ? 'success' : 'warning'">
                        {{ record?.status === "locked" ? "本队已锁定" : `${submittedCount}/${memberForms.length} 人已提交` }}
                    </el-tag>
                    <el-button link type="primary" :loading="refreshing" @click="$emit('refresh')">刷新状态</el-button>
                </div>
            </div>
        </div>

        <el-alert
            v-if="record?.status === 'locked'"
            type="success"
            :closable="false"
            show-icon
            title="本队本场配装已经锁定"
            description="原配装之后即使继续修改，也不会改变本场已经保存的内容。双方都锁定后可查看对手配装。"
        />
        <el-alert
            v-else
            type="info"
            :closable="false"
            show-icon
            title="请由每位队员登录后提交自己的配装"
            description="队长可以检查全队完成情况，但不能代替其他队员读取或修改私人配装。"
        />

        <div class="m-config-body">
            <aside class="m-members" aria-label="本队队员配装状态">
                <button
                    v-for="member in memberForms"
                    :key="member.user_id"
                    type="button"
                    class="u-member"
                    :class="{ 'is-active': Number(member.user_id) === Number(selectedUid) }"
                    @click="selectedUid = Number(member.user_id)"
                >
                    <UserIdentity :user="member" compact :show-meta="false" :uid-copyable="false" />
                    <div class="u-member-status">
                        <el-tag :type="isSubmitted(member) ? 'success' : 'info'" size="small" effect="plain">
                            {{ isSubmitted(member) ? "已提交" : hasLegacyConfig(member) ? "需重新提交" : "尚未提交" }}
                        </el-tag>
                        <small v-if="isSubmitted(member)">配装 #{{ member.pz_snapshot.source.id }}</small>
                    </div>
                </button>
            </aside>

            <div v-if="selectedMember" class="m-editor">
                <div class="u-selected-head">
                    <UserIdentity :user="selectedMember" :show-meta="false" />
                    <el-tag v-if="isOwnMember(selectedMember)" effect="plain">我的配装</el-tag>
                </div>
                <PzSnapshotEditor
                    :key="selectedMember.user_id"
                    :snapshot="selectedMember.pz_snapshot"
                    :member-name="memberName(selectedMember)"
                    :can-edit="canEditMember(selectedMember)"
                    :loading="loading"
                    @submit="saveMemberSnapshot(selectedMember, $event)"
                />
            </div>
        </div>

        <el-alert
            v-if="isCaptain && record?.status !== 'locked' && missingMembers.length"
            class="u-missing"
            type="warning"
            :closable="false"
            :title="`还需等待：${missingNames}`"
            description="所有队员都提交后才能锁定本队本场配装。"
        />
        <div v-if="isCaptain && canLock" class="u-actions">
            <el-button
                type="danger"
                :loading="loading"
                :disabled="record?.status !== 'draft' || !allSubmitted"
                @click="$emit('lock')"
            >
                确认并锁定本队配装
            </el-button>
        </div>
    </section>
</template>

<script>
import { isValidPzSnapshot } from "@/utils/lover-v2-pz";
import PzSnapshotEditor from "./PzSnapshotEditor.vue";
import UserIdentity from "./UserIdentity.vue";

export default {
    name: "LoverV2MatchConfigPanel",
    components: { PzSnapshotEditor, UserIdentity },
    emits: ["save-member", "lock", "refresh"],
    props: {
        team: { type: Object, required: true },
        record: { type: Object, default: null },
        currentUid: { type: Number, required: true },
        isCaptain: { type: Boolean, default: false },
        canUpdate: { type: Boolean, default: false },
        canLock: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        refreshing: { type: Boolean, default: false },
    },
    data: function () {
        return {
            memberForms: [],
            selectedUid: 0,
        };
    },
    computed: {
        selectedMember() {
            return this.memberForms.find((member) => Number(member.user_id) === Number(this.selectedUid)) || null;
        },
        submittedCount() {
            return Number(this.record?.progress?.submitted_count ?? this.memberForms.filter(this.isSubmitted).length);
        },
        progress() {
            if (!this.memberForms.length) return 0;
            return Math.round((this.submittedCount / this.memberForms.length) * 100);
        },
        missingMembers() {
            return this.memberForms.filter((member) => !this.isSubmitted(member));
        },
        missingNames() {
            return this.missingMembers.map(this.memberName).join("、");
        },
        allSubmitted() {
            if (this.record?.progress?.complete != null) return Boolean(this.record.progress.complete);
            return Boolean(this.memberForms.length) && this.missingMembers.length === 0;
        },
    },
    watch: {
        team: {
            handler: function () {
                this.initialize();
            },
            immediate: true,
        },
        record: {
            handler: function () {
                this.initialize();
            },
            immediate: true,
        },
    },
    methods: {
        initialize() {
            const configByUid = new Map(
                (this.record?.config?.members || []).map((member) => [Number(member.user_id), member])
            );
            const stateByUid = new Map(
                (this.record?.member_states || []).map((member) => [Number(member.user_id), member])
            );
            this.memberForms = (this.team?.members || []).map((member) => ({
                ...member,
                ...(configByUid.get(Number(member.user_id)) || {}),
                snapshot_state: stateByUid.get(Number(member.user_id)) || null,
            }));

            const selectedExists = this.memberForms.some(
                (member) => Number(member.user_id) === Number(this.selectedUid)
            );
            if (!selectedExists) {
                const ownMember = this.memberForms.find(
                    (member) => Number(member.user_id) === Number(this.currentUid)
                );
                this.selectedUid = Number(ownMember?.user_id || this.memberForms[0]?.user_id || 0);
            }
        },
        memberName(member) {
            return member?.display_name || member?.name || `UID ${member?.user_id}`;
        },
        isSubmitted(member) {
            const validSnapshot = isValidPzSnapshot(member?.pz_snapshot);
            if (member?.snapshot_state) return Boolean(member.snapshot_state.submitted) && validSnapshot;
            return validSnapshot;
        },
        hasLegacyConfig(member) {
            return Boolean(
                member?.snapshot_state?.legacy || member?.kungfu || member?.equip_id || member?.talents?.length
            );
        },
        isOwnMember(member) {
            return Number(member?.user_id) === Number(this.currentUid);
        },
        canEditMember(member) {
            return this.canUpdate && this.record?.status !== "locked" && this.isOwnMember(member);
        },
        saveMemberSnapshot(member, pzSnapshot) {
            this.$emit("save-member", {
                user_id: Number(member.user_id),
                pz_snapshot: pzSnapshot,
            });
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-match-config {
    padding: 24px;
}

.u-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;

    h3 {
        margin: 0 0 6px;
        color: #57352f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.u-head-status {
    display: flex;
    align-items: center;
    gap: 10px;
}

.u-head-actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px;
}

.m-config-body {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
    gap: 20px;
    margin-top: 18px;
}

.m-members {
    display: flex;
    flex-direction: column;
    gap: 9px;
}

.u-member {
    width: 100%;
    padding: 12px;
    border: 1px solid #ead9cf;
    border-radius: 10px;
    background: #fffaf5;
    cursor: pointer;
    text-align: left;
    transition: 0.2s ease;

    &:hover,
    &.is-active {
        border-color: #bd7164;
        box-shadow: 0 5px 14px rgba(119, 66, 56, 0.1);
    }

    &.is-active {
        background: #fff5eb;
    }
}

.u-member-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 9px;

    small {
        overflow: hidden;
        color: #a08881;
        font-size: 11px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.m-editor {
    min-width: 0;
    padding: 18px;
    border: 1px solid #ead9cf;
    border-radius: 11px;
    background: #fffaf5;
}

.u-selected-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f0dfd5;
}

.u-missing {
    margin-top: 18px;
}

.u-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 18px;
}

@media screen and (max-width: 900px) {
    .m-config-body {
        grid-template-columns: 1fr;
    }

    .m-members {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 620px) {
    .u-head,
    .u-head-status {
        align-items: flex-start;
        flex-direction: column;
    }

    .m-members {
        grid-template-columns: 1fr;
    }

    .m-editor {
        padding: 12px;
    }
}
</style>
