<template>
    <article class="c-lover-unit-card m-lover-v2-panel">
        <div class="u-card-head">
            <div class="u-team-copy">
                <span>搭子队伍</span>
                <strong>{{ memberNames }}</strong>
                <small>{{ captainName }} 发起</small>
            </div>
            <el-tag class="u-status" :class="{ 'is-invited': isInvited }" effect="plain">
                {{ isInvited ? "已发出邀请" : "两人已集结" }}
            </el-tag>
        </div>
        <div class="m-member-summary">
            <div v-for="member in unit.members" :key="member.user_id" class="u-member">
                <UserIdentity :user="member" compact :show-meta="false" :show-captain="false" />
                <div class="u-member-meta">
                    <span>
                        MMR
                        <strong>{{ peakScore(member) }}</strong>
                    </span>
                    <el-tag size="small" :type="member.combat_role === 'healer' ? 'success' : 'danger'" effect="light">
                        {{ combatRoleMap[member.combat_role] || "职责未填" }}
                    </el-tag>
                </div>
            </div>
        </div>
        <div class="u-card-actions">
            <span>{{
                isInvited ? "当前队伍已经邀请过，正在等待搭子队长处理" : "查看两位成员的完整资料后发出邀请"
            }}</span>
            <el-button class="u-view-button" type="primary" @click="$emit('view', unit)">
                {{ isInvited ? "已邀请 · 查看成员" : "查看成员并邀请" }}
            </el-button>
        </div>
    </article>
</template>

<script>
import UserIdentity from "./UserIdentity.vue";
import { combatRoleMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2MateUnitCard",
    components: { UserIdentity },
    emits: ["view"],
    props: {
        unit: { type: Object, required: true },
    },
    data: function () {
        return { combatRoleMap };
    },
    computed: {
        captainName() {
            return this.unit.members?.find((member) => member.is_captain)?.display_name || "搭子队长";
        },
        memberNames() {
            const names = (this.unit.members || []).map((member) => member.display_name).filter(Boolean);
            return names.length ? names.join(" · ") : "已集结搭子队";
        },
        isInvited() {
            return Boolean(this.unit.viewer?.pending_invitations?.length);
        },
    },
    methods: {
        peakScore(member) {
            if (member?.arena_peak_score == null) return "--";
            const score = Number(member.arena_peak_score);
            return Number.isFinite(score) ? Math.round(score) : "--";
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-unit-card {
    display: flex;
    min-height: 280px;
    flex-direction: column;
    gap: 18px;
    padding: 20px;
    color: #654842;

    .u-view-button.el-button {
        width: 100%;
        border-color: #8d4036;
        background: linear-gradient(180deg, #a24d41, #7d342d);
        box-shadow: inset 0 0 0 1px rgba(255, 226, 190, 0.2);
        color: #fff8ea;

        &:hover,
        &:focus {
            border-color: #b86b58;
            background: linear-gradient(180deg, #b65b4d, #8b3c34);
            color: #fffdf6;
        }
    }
}

.u-card-head {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
}

.u-team-copy {
    min-width: 0;

    span,
    strong,
    small {
        display: block;
    }

    span {
        margin-bottom: 5px;
        color: #a27963;
        font-size: 11px;
        letter-spacing: 0.12em;
    }

    strong {
        overflow: hidden;
        color: #57352f;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0.04em;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    small {
        margin-top: 6px;
        color: #9b8179;
        font-size: 12px;
    }
}

.u-status {
    flex: 0 0 auto;
    border-color: rgba(150, 93, 68, 0.34);
    background: rgba(244, 226, 198, 0.7);
    color: #7b4b3e;

    &.is-invited {
        border-color: rgba(140, 65, 53, 0.42);
        background: rgba(162, 77, 65, 0.12);
        color: #8c4138;
    }
}

.m-member-summary {
    display: grid;
    gap: 10px;
}

.u-member {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 13px;
    border-left: 3px solid rgba(166, 77, 61, 0.42);
    background: linear-gradient(90deg, rgba(244, 218, 191, 0.32), transparent 78%), rgba(255, 249, 238, 0.7);
    box-shadow: inset 0 0 0 1px rgba(180, 122, 98, 0.08);

    :deep(.c-lover-user) {
        min-width: 0;
        flex: 1;
    }
}

.u-member-meta {
    display: grid;
    flex: 0 0 auto;
    justify-items: end;
    gap: 6px;

    > span {
        color: #a18479;
        font-size: 10px;
        letter-spacing: 0.06em;

        strong {
            margin-left: 4px;
            color: #765049;
            font-size: 13px;
            letter-spacing: 0;
        }
    }
}

.u-card-actions {
    display: grid;
    gap: 9px;
    margin-top: auto;

    > span {
        color: #9a7d74;
        font-size: 11px;
        line-height: 1.5;
        text-align: center;
    }
}
</style>
