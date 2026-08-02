<template>
    <article class="c-lover-mate-card m-lover-v2-panel">
        <div class="u-card-head">
            <UserIdentity :user="member" :show-captain="false" :show-meta="false" />
            <div class="u-player-meta">
                <div class="u-mmr">
                    <span>MMR</span>
                    <strong>{{ peakScore }}</strong>
                </div>
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
        <div class="u-profile-copy" :class="{ 'has-judgment': mateCard.judgment }">
            <blockquote v-if="mateCard.judgment" class="u-judgment">{{ mateCard.judgment }}</blockquote>
            <IntroductionText :text="registration.introduction" plain />
        </div>
        <p v-if="hasIncomingInvitation" class="u-incoming-tip">对方已经向你发出邀请，可在页面上方的邀请箱处理。</p>
        <div class="u-card-actions">
            <div v-if="!preview" class="u-match-score" :aria-label="`契合度 ${matchScore} 分`">
                <span>契合度</span>
                <strong>{{ matchScore }}</strong>
                <small>分</small>
            </div>
            <el-button plain @click="$emit('view', registration)">查看名片</el-button>
            <el-button
                v-if="!preview"
                class="u-invite-button"
                type="primary"
                :loading="loading"
                :disabled="invitationDisabled"
                @click="$emit('invite', registration)"
            >
                {{ invitationButtonText }}
            </el-button>
        </div>
    </article>
</template>

<script>
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";

export default {
    name: "LoverV2MateRegistrationCard",
    components: { IntroductionText, UserIdentity },
    emits: ["invite", "view"],
    props: {
        registration: { type: Object, required: true },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        cooldown: { type: Number, default: 0 },
        preview: { type: Boolean, default: false },
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
        peakScore() {
            if (this.member?.arena_peak_score == null) return "--";
            const score = Number(this.member?.arena_peak_score);
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
            return this.disabled || this.effectiveCooldown > 0 || this.hasOutgoingInvitation || !this.viewerCanInvite;
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

    .u-invite-button.el-button {
        width: 100%;
        border-color: #8d4036;
        background: linear-gradient(180deg, #a24d41, #7d342d);
        box-shadow: inset 0 0 0 1px rgba(255, 226, 190, 0.2);
        color: #fff8ea;

        &:not(.is-disabled):hover,
        &:not(.is-disabled):focus {
            border-color: #b86b58;
            background: linear-gradient(180deg, #b65b4d, #8b3c34);
            color: #fffdf6;
        }

        &.is-disabled {
            border-color: rgba(151, 112, 99, 0.32);
            background: rgba(239, 225, 204, 0.78);
            box-shadow: none;
            color: #826a63;
            opacity: 1;
        }
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
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    :deep(.c-lover-user) {
        min-width: 0;
        flex: 1;
    }
}

.u-player-meta {
    display: grid;
    flex: 0 0 auto;
    justify-items: end;
    gap: 7px;

    .u-mmr {
        display: flex;
        align-items: baseline;
        gap: 6px;

        span {
            color: #a18479;
            font-size: 10px;
            letter-spacing: 0.08em;
        }

        strong {
            color: #765049;
            font-size: 14px;
            font-weight: 600;
            line-height: 1;
        }
    }
}

.u-profile-copy {
    padding: 12px 14px;
    border-left: 3px solid rgba(166, 77, 61, 0.58);
    background: linear-gradient(90deg, rgba(244, 218, 191, 0.34), transparent 72%), rgba(255, 249, 238, 0.78);
    box-shadow: inset 0 0 0 1px rgba(180, 122, 98, 0.08);

    :deep(.c-lover-introduction.is-plain) {
        display: block;

        .u-label {
            margin-bottom: 4px;
            color: #9a6659;
            font-weight: 600;
        }
    }

    &.has-judgment :deep(.c-lover-introduction.is-plain) {
        margin-top: 10px;
        padding-top: 9px;
        border-top: 1px dashed rgba(163, 99, 80, 0.24);
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
    padding: 0;
    color: #9b4438;
    font-family: "ZCOOL XiaoWei", "STSong", serif;
    font-size: 14px;
    line-height: 1.75;
}

.u-card-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: auto;

    > .u-match-score {
        grid-column: 1 / -1;
    }

    > .el-button {
        width: 100%;
        margin: 0 !important;
    }

    > .el-button:only-child {
        grid-column: 1 / -1;
    }
}

.u-match-score {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    background: linear-gradient(90deg, transparent, rgba(174, 102, 75, 0.12), transparent);

    &::before,
    &::after {
        width: 42px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(151, 83, 65, 0.42));
        content: "";
    }

    &::after {
        background: linear-gradient(90deg, rgba(151, 83, 65, 0.42), transparent);
    }

    span,
    small {
        color: #9a7469;
        font-size: 11px;
        letter-spacing: 0.08em;
    }

    strong {
        color: #8b3c34;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 28px;
        font-weight: 400;
        line-height: 1;
    }
}

.u-incoming-tip {
    margin: 0;
    color: #a16d54;
    font-size: 12px;
    line-height: 1.6;
}
</style>
