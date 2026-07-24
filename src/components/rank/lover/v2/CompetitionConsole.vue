<template>
    <section class="c-lover-console m-lover-v2-panel">
        <div class="u-head">
            <div>
                <h3>我的竞赛控制台</h3>
                <p>队长可以完成就绪、整队配置与天命签；队员也可进入对应战斗上报自己的配装。</p>
            </div>
            <FeatureBadge name="match-config" small />
        </div>
        <div v-if="matches.length" class="m-matches">
            <article v-for="match in matches" :key="match.id" class="u-match">
                <div class="u-time">
                    <el-tag :type="statusType(match.status)" effect="plain">
                        {{ matchStatusMap[match.status] || match.status }}
                    </el-tag>
                    <strong>{{ match.stage?.name || "待定赛程" }}</strong>
                    <span>{{ formatDateTime(match.scheduled_at) }}</span>
                </div>
                <div class="u-versus">
                    <TeamIdentity :team="team" compact />
                    <strong>{{ match.team1_game_wins }} : {{ match.team2_game_wins }}</strong>
                    <TeamIdentity :team="opponent(match)" compact />
                </div>
                <div class="u-room">
                    <span>房间 {{ match.room_no || "待公布" }}</span>
                    <span>{{ readyLabel(match) }}</span>
                </div>
                <el-button type="primary" @click="$emit('open-match', match)">
                    {{ match.status === "finished" ? "查看战斗详情" : "进入战斗控制台" }}
                </el-button>
            </article>
        </div>
        <EmptyState v-else icon="match-config" description="暂时没有需要你处理的战斗" compact />
    </section>
</template>

<script>
import EmptyState from "./EmptyState.vue";
import FeatureBadge from "./FeatureBadge.vue";
import TeamIdentity from "./TeamIdentity.vue";
import { formatDateTime, matchStatusMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2CompetitionConsole",
    components: { EmptyState, FeatureBadge, TeamIdentity },
    emits: ["open-match"],
    props: {
        team: { type: Object, required: true },
        matches: { type: Array, default: () => [] },
    },
    data: function () {
        return { matchStatusMap };
    },
    methods: {
        formatDateTime,
        opponent(match) {
            return Number(match.team1?.id) === Number(this.team.id) ? match.team2 : match.team1;
        },
        readyLabel(match) {
            const mineReady =
                Number(match.team1?.id) === Number(this.team.id) ? match.team1_ready_at : match.team2_ready_at;
            return mineReady ? "本队已就绪" : "本队尚未就绪";
        },
        statusType(status) {
            return { draft: "info", scheduled: "warning", ready: "success", running: "danger", finished: "info" }[
                status
            ];
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-console {
    margin-top: 22px;
    padding: 24px;
}

.u-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;

    h3 {
        margin: 0 0 6px;
        color: #56342f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.m-matches {
    display: grid;
    gap: 12px;
    margin-top: 18px;
}

.u-match {
    display: grid;
    grid-template-columns: 150px minmax(320px, 1fr) 150px auto;
    align-items: center;
    gap: 18px;
    padding: 15px;
    border: 1px solid #ead9cf;
    border-radius: 11px;
    background: #fffaf5;
}

.u-time,
.u-room {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #927972;
    font-size: 12px;
}

.u-versus {
    display: grid;
    min-width: 0;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 14px;

    strong {
        color: #a44237;
        font-size: 20px;
    }
}

@media screen and (max-width: 980px) {
    .u-match {
        grid-template-columns: 1fr auto;
    }

    .u-versus {
        grid-column: 1 / -1;
        grid-row: 1;
    }
}

@media screen and (max-width: 620px) {
    .u-match {
        display: flex;
        align-items: stretch;
        flex-direction: column;
    }

    .u-versus {
        grid-template-columns: 1fr;
    }
}
</style>
