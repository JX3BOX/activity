<template>
    <article class="c-lover-mate-card m-lover-v2-panel">
        <div class="u-card-head">
            <UserIdentity :user="member" :show-captain="false" />
            <div class="u-match-score">
                <strong>{{ matchScore }}</strong>
                <span>契合度</span>
            </div>
        </div>
        <div class="u-tags">
            <el-tag v-if="mateCard.server" effect="plain">{{ mateCard.server }}</el-tag>
            <el-tag v-if="mateCard.mindset" effect="plain">{{ mateCard.mindset }}</el-tag>
            <el-tag v-if="mateCard.mbti" effect="plain">{{ mateCard.mbti }}</el-tag>
            <el-tag v-if="mateCard.zodiac" effect="plain">{{ mateCard.zodiac }}</el-tag>
            <el-tag v-if="mateCard.online_time" effect="plain">{{ mateCard.online_time }}在线</el-tag>
        </div>
        <div v-if="mateCard.interests?.length" class="u-interests">
            <span>江湖兴趣</span>
            <em v-for="item in mateCard.interests" :key="item">{{ item }}</em>
        </div>
        <blockquote v-if="mateCard.judgment" class="u-judgment">{{ mateCard.judgment }}</blockquote>
        <IntroductionText :text="registration.introduction" />
        <p v-if="hasIncomingInvitation" class="u-incoming-tip">对方已经向你发出邀请，可在页面上方的邀请箱处理。</p>
        <el-button
            type="primary"
            plain
            :loading="loading"
            :disabled="invitationDisabled"
            @click="$emit('invite', registration)"
        >
            {{ invitationButtonText }}
        </el-button>
    </article>
</template>

<script>
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";

export default {
    name: "LoverV2MateRegistrationCard",
    components: { IntroductionText, UserIdentity },
    emits: ["invite"],
    props: {
        registration: { type: Object, required: true },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        cooldown: { type: Number, default: 0 },
    },
    computed: {
        member() {
            return this.registration.members?.[0] || { user_id: this.registration.applicant_uid };
        },
        mateCard() {
            return this.registration.mate_card || {};
        },
        matchScore() {
            const score = Number(this.registration.match_score);
            return Number.isFinite(score) ? Math.round(score) : "--";
        },
        viewer() {
            return this.registration.viewer || null;
        },
        pendingInvitations() {
            return Array.isArray(this.viewer?.pending_invitations) ? this.viewer.pending_invitations : [];
        },
        hasOutgoingInvitation() {
            return this.pendingInvitations.some((item) => item.direction === "outgoing");
        },
        hasIncomingInvitation() {
            return this.pendingInvitations.some((item) => item.direction === "incoming");
        },
        effectiveCooldown() {
            return Math.max(0, Number(this.cooldown) || 0);
        },
        viewerCanInvite() {
            return Boolean(this.viewer?.actions?.includes("mate.invite"));
        },
        invitationDisabled() {
            return (
                this.disabled ||
                this.effectiveCooldown > 0 ||
                this.hasOutgoingInvitation ||
                !this.viewerCanInvite
            );
        },
        invitationButtonText() {
            if (this.hasOutgoingInvitation) return "已发出邀请";
            if (this.effectiveCooldown > 0) return `${this.effectiveCooldown} 秒后可再邀请`;
            if (!this.viewerCanInvite) return "暂时无法邀请";
            if (this.hasIncomingInvitation) return "也邀请对方";
            return "邀请成为搭子";
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-mate-card {
    display: flex;
    min-height: 150px;
    flex-direction: column;
    gap: 18px;
    padding: 20px;
    color: #654842;

    > .el-button {
        margin-top: auto;
        --el-button-text-color: #7d352f;
        --el-button-bg-color: rgba(255, 249, 237, 0.92);
        --el-button-border-color: #a75a4e;
        --el-button-hover-text-color: #fff4df;
        --el-button-hover-bg-color: #8b3c34;
        --el-button-hover-border-color: #8b3c34;
        --el-button-disabled-text-color: #a68d86;
        --el-button-disabled-bg-color: rgba(239, 225, 204, 0.72);
        --el-button-disabled-border-color: rgba(151, 112, 99, 0.28);
    }

    .u-tags {
        display: flex;
        min-height: 26px;
        flex-wrap: wrap;
        gap: 7px;

        span {
            color: #a48c85;
            font-size: 12px;
        }

        :deep(.el-tag) {
            border-color: rgba(145, 77, 64, 0.38);
            background: rgba(255, 249, 236, 0.82);
            color: #75443c;
        }
    }
}

.u-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
}

.u-match-score {
    display: grid;
    min-width: 58px;
    place-items: center;
    padding: 8px 10px;
    border: 1px solid rgba(155, 81, 67, 0.32);
    border-radius: 10px;
    background: linear-gradient(145deg, rgba(255, 249, 235, 0.96), rgba(243, 220, 199, 0.8));

    strong {
        color: #8b3c34;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 25px;
        font-weight: 400;
        line-height: 1;
    }

    span {
        margin-top: 4px;
        color: #a27e72;
        font-size: 11px;
    }
}

.u-interests {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 7px;
    color: #917871;
    font-size: 12px;

    span {
        margin-right: 3px;
    }

    em {
        padding: 3px 8px;
        border-radius: 999px;
        background: rgba(154, 88, 72, 0.09);
        color: #7a4c43;
        font-style: normal;
    }
}

.u-judgment {
    margin: 0;
    padding: 10px 13px;
    border-left: 3px solid rgba(148, 75, 64, 0.45);
    background: rgba(255, 249, 238, 0.76);
    color: #80635b;
    font-family: "ZCOOL XiaoWei", "STSong", serif;
    font-size: 14px;
    line-height: 1.75;
}

.u-incoming-tip {
    margin: 0;
    color: #a16d54;
    font-size: 12px;
    line-height: 1.6;
}
</style>
