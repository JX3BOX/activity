<template>
    <div class="m-battle-detail-team">
        <img class="u-team-icon" :src="team.images[0]" />
        <div class="u-team-name">
            {{ team.team_name }}
        </div>
        <div class="u-teammate" v-for="(user, index) in team.teammates_info" :key="index">
            <img class="u-user-avatar" :src="showAvatar(user.avatar)" alt="" />
            <span class="u-user-name">{{ user.display_name }}</span>
        </div>
        <div class="u-slogan-title">参赛宣言</div>
        <div class="u-slogan">{{ team.slogan || "暂无宣言" }}</div>
        <div class="u-card-title">本场同心天命签：[{{ card.name || "未抽取" }}]</div>
        <div class="u-card-desc">{{card.desc || '-'}}</div>
        <div class="u-live-btn" :class="{ 'is-disable': !team.live_url }" @click="onGoLive" target="_blank">
            {{ team.live_url ? "进入直播间" : "未开播" }}
        </div>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "LoverBattleDetailTeam",
    components: {},
    props: {
        team: {
            type: Object,
            default: () => ({}),
        },
        card: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({}),
    computed: {},
    methods: {
        showAvatar,
        onGoLive() {
            if (this.team.live_url) {
                window.open(this.team.live_url, "_blank");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.m-battle-detail-team {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.is-left {
        align-items: flex-end;
    }

    .u-team-icon {
        .size(100px);
        border: 2px solid rgba(243, 199, 104, 1);
        box-sizing: border-box;
        .mb(12px);
    }

    .u-team-name {
        .fz(28px, 40.54px);
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
    }

    .u-teammate {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .u-user-avatar {
        .size(20px);
        border-radius: 99px;
    }

    .u-user-name {
        .fz(18px, 26.06px);
        color: rgba(255, 233, 199, 1);
    }

    .u-slogan-title,
    .u-card-title {
        .fz(12px, 17.38px);
        font-weight: 700;
        color: rgba(255, 255, 255, 1);
        .mt(24px);
    }

    .u-slogan,
    .u-card-desc {
        .fz(12px, 17.38px);
        color: rgba(255, 232, 204, 1);
    }

    .u-live-btn {
        .mt(24px);
        .size(100px, 28px);
        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid rgba(243, 199, 104, 1);
        color: rgba(243, 199, 104, 1);
        .pointer;

        &.is-disable {
            border: 1px solid rgba(194, 194, 194, 1);
            color: rgba(194, 194, 194, 1);
            cursor: not-allowed;
        }

        &:not(.is-disable):hover {
            background: rgba(243, 199, 104, 1);
            color: rgba(82, 50, 41, 1);
        }

        border-radius: 99px;
        .fz(12px);
        font-weight: 700;
    }
}
</style>
