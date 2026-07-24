<template>
    <article class="c-lover-match-card" @click="$emit('open', match)">
        <div class="u-meta">
            <el-tag size="small" :type="statusType" effect="plain">{{ matchStatusMap[match.status] }}</el-tag>
            <span>第 {{ match.round_no }} 轮 · {{ formatDateTime(match.scheduled_at) }}</span>
        </div>
        <div class="u-versus">
            <div class="u-team-side is-left"><TeamIdentity :team="match.team1" compact /></div>
            <div class="u-score" :class="{ 'is-finished': match.status === 'finished' }">
                <small>小局比分</small>
                <strong>{{ match.team1_game_wins }} : {{ match.team2_game_wins }}</strong>
                <span>{{ scoreHint }}</span>
            </div>
            <div class="u-team-side is-right"><TeamIdentity :team="match.team2" compact /></div>
        </div>
        <div class="u-footer">
            <span>房间 {{ match.room_no || "待公布" }}</span>
            <span v-if="match.status === 'finished'">{{ resultLabel }}</span>
            <span v-else>{{ readyLabel }}</span>
        </div>
    </article>
</template>

<script>
import TeamIdentity from "./TeamIdentity.vue";
import { formatDateTime, matchStatusMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2PublicMatchCard",
    components: { TeamIdentity },
    emits: ["open"],
    props: {
        match: { type: Object, required: true },
        showPoints: { type: Boolean, default: false },
    },
    data: function () {
        return { matchStatusMap };
    },
    computed: {
        winCount() {
            return Math.floor(Number(this.match.best_of || 1) / 2) + 1;
        },
        hasMatchPoints() {
            return this.match.team1_points != null || this.match.team2_points != null;
        },
        scoreHint() {
            if (!this.showPoints || !this.hasMatchPoints) return `${this.winCount} 胜制`;
            const team1Points = this.match.team1_points == null ? "—" : this.match.team1_points;
            const team2Points = this.match.team2_points == null ? "—" : this.match.team2_points;
            return `本场积分 ${team1Points} : ${team2Points} · ${this.winCount} 胜制`;
        },
        statusType() {
            return { scheduled: "warning", ready: "success", running: "danger", finished: "info" }[
                this.match.status
            ];
        },
        resultLabel() {
            if (Number(this.match.winner_team_id) === Number(this.match.team1?.id)) {
                return `${this.match.team1?.name || "一方战队"} 获胜`;
            }
            if (Number(this.match.winner_team_id) === Number(this.match.team2?.id)) {
                return `${this.match.team2?.name || "一方战队"} 获胜`;
            }
            return this.match.result_type === "no_contest" ? "本场无胜者" : "赛果待确认";
        },
        readyLabel() {
            const count = Number(Boolean(this.match.team1_ready_at)) + Number(Boolean(this.match.team2_ready_at));
            return count === 2 ? "双方已就绪" : count === 1 ? "一方已就绪" : "等待双方就绪";
        },
    },
    methods: { formatDateTime },
};
</script>

<style scoped lang="less">
.c-lover-match-card {
    padding: 16px;
    border: 1px solid #ead9cf;
    border-radius: 11px;
    background: #fffaf5;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
        border-color: #c96d5b;
        box-shadow: 0 10px 24px rgba(113, 52, 42, 0.11);
        transform: translateY(-2px);
    }
}

.u-meta,
.u-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #987f78;
    font-size: 12px;
}

.u-versus {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 14px;
    margin: 18px 0;
}

.u-team-side {
    display: flex;
    min-width: 0;
    width: 100%;

    &.is-right {
        justify-content: flex-end;
    }
}

.u-score {
    min-width: 150px;
    text-align: center;

    strong,
    small,
    span {
        display: block;
    }

    small {
        margin-bottom: 2px;
        color: #b39a92;
        font-size: 10px;
    }

    strong {
        color: #703c34;
        font-size: 22px;
    }

    span {
        margin-top: 3px;
        color: #a38a83;
        font-size: 11px;
    }

    &.is-finished strong {
        color: #a54035;
    }
}

@media screen and (max-width: 560px) {
    .u-versus {
        grid-template-columns: 1fr;
    }

    .u-team-side.is-right {
        justify-content: flex-start;
    }

    .u-score {
        min-width: 0;
    }
}
</style>
