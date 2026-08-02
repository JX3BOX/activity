<template>
    <el-dialog
        v-model="visible"
        class="m-lover-v2-unit-dialog"
        modal-class="m-lover-v2-unit-modal"
        width="min(860px, calc(100vw - 32px))"
        align-center
        destroy-on-close
        @closed="$emit('closed')"
    >
        <template #header>
            <div class="u-dialog-head">
                <span>{{ memberNames }}</span>
                <small>两位侠士已经结成搭子队，查看完整资料后可邀请加入四人阵容</small>
            </div>
        </template>

        <div class="m-member-grid">
            <article v-for="member in members" :key="member.user_id" class="u-member-card">
                <div class="u-card-head">
                    <UserIdentity :user="member" :show-meta="false" :show-captain="false" show-mount-name />
                    <div class="u-player-meta">
                        <div class="u-mmr">
                            <span>MMR</span>
                            <strong>{{ peakScore(member) }}</strong>
                        </div>
                    </div>
                </div>
                <div class="u-member-status">
                    <span>搭子队成员</span>
                    <em>两人平等结伴</em>
                </div>
                <div class="u-profile-copy">
                    <IntroductionText :text="member.introduction" plain />
                </div>
            </article>
        </div>

        <template #footer>
            <div class="u-dialog-actions">
                <span>{{ actionHint }}</span>
                <el-button
                    class="u-invite-button"
                    type="primary"
                    :loading="loading"
                    :disabled="disabled || isInvited"
                    @click="invite"
                >
                    {{ actionText }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";

export default {
    name: "LoverV2MateUnitDetailDialog",
    components: { IntroductionText, UserIdentity },
    emits: ["update:modelValue", "invite", "closed"],
    props: {
        modelValue: { type: Boolean, default: false },
        unit: { type: Object, default: null },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    computed: {
        visible: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
        members() {
            return Array.isArray(this.unit?.members) ? this.unit.members : [];
        },
        memberNames() {
            const names = this.members.map((member) => member.display_name).filter(Boolean);
            return names.length ? names.join(" · ") : "搭子队成员详情";
        },
        isInvited() {
            return Boolean(this.unit?.viewer?.pending_invitations?.length);
        },
        actionHint() {
            if (this.isInvited) return "当前队伍已经邀请过，正在等待搭子队长处理";
            if (this.disabled) return "当前账号没有向这支搭子队发出邀请的权限";
            return "邀请发出后，由搭子队长确认加入";
        },
        actionText() {
            if (this.isInvited) return "当前队伍已邀请";
            return this.disabled ? "暂时无法邀请" : "邀请加入四人阵容";
        },
    },
    methods: {
        peakScore(member) {
            if (member?.arena_peak_score == null) return "--";
            const score = Number(member.arena_peak_score);
            return Number.isFinite(score) ? Math.round(score) : "--";
        },
        invite() {
            if (this.disabled || this.loading || this.isInvited || !this.unit) return;
            this.$emit("invite", this.unit);
        },
    },
};
</script>

<style scoped lang="less">
.u-dialog-head {
    display: grid;
    gap: 5px;
    padding-right: 34px;

    span {
        color: #532f2a;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 23px;
        letter-spacing: 0.08em;
    }

    small {
        color: #a3887f;
        font-size: 12px;
        line-height: 1.6;
    }
}

.m-member-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.u-member-card {
    display: flex;
    min-width: 0;
    min-height: 230px;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid rgba(130, 75, 59, 0.34);
    border-radius: 2px;
    background: linear-gradient(135deg, rgba(255, 252, 241, 0.94), rgba(244, 226, 198, 0.76)), #fff8eb;
    box-shadow: inset 0 0 0 4px rgba(255, 252, 242, 0.38), 0 7px 20px rgba(79, 40, 31, 0.08);
}

.u-card-head {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 14px;

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
}

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

.u-member-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 7px 10px;
    background: linear-gradient(90deg, transparent, rgba(174, 102, 75, 0.11), transparent);
    color: #805249;
    font-size: 12px;

    em {
        color: #a17d70;
        font-style: normal;
    }
}

.u-profile-copy {
    flex: 1;
    padding: 12px 14px;
    border-left: 3px solid rgba(166, 77, 61, 0.58);
    background: linear-gradient(90deg, rgba(244, 218, 191, 0.34), transparent 72%), rgba(255, 249, 238, 0.78);
    box-shadow: inset 0 0 0 1px rgba(180, 122, 98, 0.08);

    :deep(.c-lover-introduction.is-plain) {
        display: block;

        .u-label {
            margin-bottom: 5px;
            color: #9a6659;
            font-weight: 600;
        }
    }
}

.u-dialog-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    > span {
        color: #96786f;
        font-size: 12px;
        line-height: 1.6;
        text-align: left;
    }

    .u-invite-button.el-button {
        min-width: 190px;
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
}

@media screen and (max-width: 680px) {
    .m-member-grid {
        grid-template-columns: 1fr;
    }

    .u-dialog-actions {
        align-items: stretch;
        flex-direction: column;

        .u-invite-button.el-button {
            width: 100%;
        }
    }
}
</style>
