<template>
    <article class="c-lover-public-team m-lover-v2-panel">
        <div class="u-head">
            <TeamIdentity :team="team" show-slogan />
            <div class="u-status">
                <el-tag effect="plain">{{ formationStatusMap[team.formation_status] }}</el-tag>
                <el-tag :type="team.competition_status === 'active' ? 'danger' : 'info'" effect="plain">
                    {{ competitionStatusMap[team.competition_status] }}
                </el-tag>
            </div>
        </div>
        <div class="m-members">
            <div v-for="member in team.members" :key="member.user_id" class="u-member">
                <UserIdentity :user="member" compact :show-meta="false" />
                <span>
                    {{ combatRoleMap[member.combat_role] || "职责未填" }}
                    <template v-if="member.arena_peak_score != null"> · 最高 {{ member.arena_peak_score }} 分</template>
                </span>
            </div>
        </div>
        <div class="u-footer">
            <span>{{ team.member_count }} 名成员 · {{ team.healer_count }} 名治疗</span>
            <el-button text type="primary" @click="$emit('timeline', team)">查看赛事足迹</el-button>
        </div>
    </article>
</template>

<script>
import TeamIdentity from "./TeamIdentity.vue";
import UserIdentity from "./UserIdentity.vue";
import { combatRoleMap, competitionStatusMap, formationStatusMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2PublicTeamCard",
    components: { TeamIdentity, UserIdentity },
    emits: ["timeline"],
    props: { team: { type: Object, required: true } },
    data: function () {
        return { combatRoleMap, competitionStatusMap, formationStatusMap };
    },
};
</script>

<style scoped lang="less">
.c-lover-public-team {
    padding: 20px;
}

.u-head,
.u-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
}

.u-status {
    display: flex;
    flex: 0 0 auto;
    gap: 6px;
}

.m-members {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin: 18px 0;
    padding: 16px;
    border-radius: 10px;
    background: #fffaf5;
}

.u-member {
    min-width: 0;
    padding: 12px;
    border: 1px solid rgba(146, 89, 72, 0.12);
    background: rgba(255, 255, 255, 0.38);

    > span {
        display: block;
        overflow: hidden;
        margin-top: 7px;
        padding-left: 45px;
        color: #967b73;
        font-size: 11px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.u-footer {
    color: #9a817a;
    font-size: 12px;
}

@media screen and (max-width: 980px) {
    .m-members {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 620px) {
    .u-head {
        align-items: flex-start;
        flex-direction: column;
    }

    .m-members {
        grid-template-columns: 1fr;
    }
}
</style>
