<template>
    <section class="c-lover-inbox m-lover-v2-panel">
        <div class="u-head">
            <div>
                <h3>待处理邀请</h3>
                <p>接受邀请时，系统会再次确认队伍名额与职责是否合适。</p>
            </div>
            <el-badge :value="invitations.length" :hidden="!invitations.length">
                <FeatureBadge name="invitation" small />
            </el-badge>
        </div>
        <div v-if="invitations.length" class="m-list">
            <article v-for="invitation in invitations" :key="invitation.id" class="u-invitation">
                <div class="u-summary">
                    <TeamIdentity
                        v-if="invitation.type === 'team_join' && invitation.sender_summary"
                        :team="invitation.sender_summary"
                        show-slogan
                    />
                    <UserIdentity
                        v-else
                        :user="senderMember(invitation)"
                        :show-meta="invitation.type === 'mate_pair'"
                        :show-captain="invitation.type !== 'mate_pair'"
                    />
                    <IntroductionText
                        v-if="invitation.type === 'mate_pair'"
                        class="u-introduction"
                        :text="senderMember(invitation).introduction"
                        compact
                    />
                    <p>
                        {{ invitation.type === "mate_pair" ? "邀请你组成两人搭子队" : "邀请你的搭子队加入四人阵容" }}
                        <span>· {{ formatDateTime(invitation.created_at) }}</span>
                    </p>
                </div>
                <div class="u-actions">
                    <el-button
                        v-if="invitation.type === 'team_join' && invitation.sender_summary"
                        plain
                        @click="openTeam(invitation.sender_summary)"
                    >
                        查看情缘队资料
                    </el-button>
                    <el-button
                        v-if="invitation.type === 'mate_pair' && invitation.sender_summary?.mate_card"
                        plain
                        @click="$emit('view-mate-card', invitation)"
                    >
                        查看名片
                    </el-button>
                    <el-button
                        :loading="loadingId === invitation.id && loadingAction === 'reject'"
                        :disabled="loadingId !== null || !invitation.can_reject"
                        @click="$emit('reject', invitation)"
                    >
                        婉拒
                    </el-button>
                    <el-button
                        type="primary"
                        :loading="loadingId === invitation.id && loadingAction === 'accept'"
                        :disabled="loadingId !== null || !invitation.can_accept"
                        @click="$emit('accept', invitation)"
                    >
                        接受邀请
                    </el-button>
                </div>
            </article>
        </div>
        <div v-else class="u-empty">
            <img :src="invitationEmptyImage" alt="" />
            <h4>暂时没有新的邀约</h4>
            <p>有新的组队邀请时，这里会自动更新。慢慢等一封江湖来信吧。</p>
        </div>
        <el-dialog
            v-model="teamVisible"
            class="m-lover-v2-team-invitation-dialog"
            width="min(760px, calc(100vw - 32px))"
            align-center
        >
            <template #header><strong>情缘队资料</strong></template>
            <TeamIdentity :team="selectedTeam" show-slogan />
            <div class="m-team-members">
                <UserIdentity v-for="member in selectedTeam?.members || []" :key="member.user_id" :user="member" />
            </div>
        </el-dialog>
    </section>
</template>

<script>
import FeatureBadge from "./FeatureBadge.vue";
import IntroductionText from "./IntroductionText.vue";
import TeamIdentity from "./TeamIdentity.vue";
import UserIdentity from "./UserIdentity.vue";
import { formatDateTime } from "@/utils/lover-v2";
import invitationEmptyImage from "@/assets/img/lover/v2/invitation-empty.webp";

export default {
    name: "LoverV2InvitationInbox",
    components: { FeatureBadge, IntroductionText, TeamIdentity, UserIdentity },
    emits: ["accept", "reject", "view-mate-card"],
    data: function () {
        return { invitationEmptyImage, teamVisible: false, selectedTeam: null };
    },
    props: {
        invitations: { type: Array, default: () => [] },
        loadingId: { type: [Number, String], default: null },
        loadingAction: { type: String, default: "" },
    },
    methods: {
        formatDateTime,
        senderMember(invitation) {
            return (
                invitation.sender_summary?.member ||
                invitation.sender_summary?.members?.[0] || {
                    user_id: invitation.sender_uid,
                    display_name: "邀请方侠士",
                }
            );
        },
        openTeam(team) {
            this.selectedTeam = team;
            this.teamVisible = true;
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-inbox {
    padding: 24px;
}

.u-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;

    h3 {
        margin: 0 0 6px;
        color: #57352f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #9a817a;
        font-size: 13px;
    }
}

.m-list {
    display: grid;
    gap: 12px;
    margin-top: 20px;
}

.u-empty {
    padding: 18px 20px 12px;
    text-align: center;

    img {
        display: block;
        width: min(320px, 78%);
        height: 174px;
        margin: 0 auto 4px;
        object-fit: cover;
        mix-blend-mode: multiply;
    }

    h4 {
        margin: 0 0 7px;
        color: #5d3832;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.08em;
    }

    p {
        margin: 0;
        color: #9a817a;
        font-size: 13px;
        line-height: 1.7;
    }
}

.u-invitation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 16px;
    border: 1px solid #ead9cf;
    border-radius: 11px;
    background: #fffaf5;
}

.u-summary {
    min-width: 0;

    .u-introduction {
        max-width: 560px;
        margin: 10px 0 0 58px;
    }

    > p {
        margin: 9px 0 0 58px;
        color: #755952;
        font-size: 13px;

        span {
            color: #a38b84;
        }
    }
}

.u-actions {
    display: flex;
    flex: 0 0 auto;
}

.m-team-members {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 20px;
    padding: 16px;
    border-radius: 12px;
    background: #fffaf5;
}

@media screen and (max-width: 720px) {
    .u-invitation {
        align-items: stretch;
        flex-direction: column;
    }

    .u-actions {
        justify-content: flex-end;
    }

    .u-summary .u-introduction {
        margin-left: 0;
    }
}
</style>
