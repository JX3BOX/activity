<template>
    <div class="m-battle-item">
        <div class="m-battle-meta">
            <template v-if="process">
                <div class="u-status" :class="statusLabel[0].class">{{ statusLabel[0].label }}</div>
                <div class="u-detail-btn" @click="onViewDetail">详 情</div>
                <div class="u-time">{{ process.updated_at }}</div>
            </template>
        </div>
        <div
            class="m-battle-team"
            :class="{ 'is-winner': isWinner(item), 'is-empty': !item }"
            v-for="(item, index) in teams"
            :key="index"
        >
            <template v-if="item">
                <img class="u-icon" draggable="false" :src="item.images[0]" alt="" />
                <span class="u-name">{{ item.team_name }}</span>
                <span class="u-win-icon">胜</span>
            </template>
            <span v-else class="u-empty">虚位以待</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoverBattleItem",
    props: {
        process: {
            type: [Object, null],
            default: () => ({}),
        },
    },
    data: () => ({
        statusLabel: {
            0: {
                label: "未开始",
                class: "is-no-start",
            },
            1: {
                label: "进行中",
                class: "is-in-progress",
            },
            2: {
                label: "已结束",
                class: "is-ended",
            },
        },
    }),
    computed: {
        teams() {
            return [this.process?.team1_record || null, this.process?.team2_record || null];
        },
    },
    methods: {
        onViewDetail() {
            this.$emit("view-detail");
        },
        isWinner(team) {
            if (!team) return false;
            return this.process.winner_id === team.id;
        },
    },
};
</script>

<style lang="less">
.m-battle-item {
    display: flex;
    flex-direction: column;
    .size(220px, 106px);
    gap: 4px;
    color: white;

    .m-battle-meta {
        .size(220px, 18px);
        .fz(12px, 17.38px);
        display: flex;
        gap: 4px;

        .u-status {
            padding: 0 4px;
            &.is-no-start {
                background: rgba(255, 232, 196, 1);
                border: 1px solid rgba(199, 178, 111, 1);
                color: rgba(128, 100, 77, 1);
            }
            &.is-in-progress {
                background: rgba(212, 0, 0, 1);
                border: 1px solid rgba(135, 0, 0, 1);
                color: white;
            }
            &.is-ended {
                background: rgba(217, 217, 217, 1);
                border: 1px solid rgba(128, 128, 128, 1);
                color: rgba(128, 128, 128, 1);
            }
        }

        .u-detail-btn {
            background: rgba(255, 232, 196, 1);
            border: 1px solid rgba(199, 178, 111, 1);
            color: rgba(128, 100, 77, 1);
            .pointer;
            padding: 0 2px;
        }

        .u-time {
            flex-grow: 1;
            text-align: right;
        }
    }

    .m-battle-team {
        .size(220px, 40px);
        padding: 5px 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        box-sizing: border-box;
        background: #00000033;
        border-left: 4px solid #f3c768ff;
        &.is-empty {
            border-left: 4px solid rgba(255, 255, 255, 1);
        }
        .pr;
        &.is-winner {
            background: linear-gradient(90deg, rgba(243, 199, 104, 0) 0%, rgba(243, 199, 104, 1) 100%),
                rgba(0, 0, 0, 0.1);
        }

        .u-icon {
            .size(30px);
            flex-shrink: 0;
        }

        .u-name {
            flex-grow: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .u-win-icon {
            .pa;
            color: #783600ff;
            .bold;
            user-select: none;
            pointer-events: none;
            .rb(12px, 8px);
            .fz(16px, 23.17px);
            display: none;
        }

        &.is-winner .u-win-icon {
            display: block;
        }

        .u-empty {
            .fz(16px, 23.17px);
            color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>
