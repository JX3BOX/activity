<template>
    <div class="m-lover-battle">
        <div :class="['m-team', isWin(item)]" v-for="(item, i) in list" :key="i">
            <el-image class="u-img" :src="showAvatar(item)"></el-image>
            <span class="u-name">{{ showName(item) }}</span>
            <span class="u-status">{{ status(item) }}</span>
        </div>
        <span class="u-detail">详情</span>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "battle",
    props: ["data"],
    data: function () {
        return {
            list: [],
        };
    },
    watch: {
        data: {
            handler: function (data) {
                this.list = data?.length ? data : [{}, {}];
            },
            immediate: true,
        },
    },
    computed: {},
    methods: {
        showAvatar({ user }) {
            const avatar = user ? user.avatar : "";
            return showAvatar(avatar);
        },
        showName({ user }) {
            return user ? user.display_name : "";
        },
        isWin({ record }) {
            const is_winner = record ? record.is_winner : false;
            return is_winner ? "win" : "";
        },
        status({ is_advance }) {
            const status = {
                0: "",
                1: "胜",
                2: "负",
            };
            return status[is_advance];
        },
    },
};
</script>
<style lang="less">
.m-lover-battle {
    .flex;
    position: relative;
    flex-direction: column;
    gap: 6px;
    .u-detail {
        .pointer;
        .bold;
        .x;
        .size(40px,20px);
        .fz(12px,20px);
        align-self: flex-end;
        color: #f3c768;
        letter-spacing: 3px;
        background: #f3c76814;
        border: 1px solid #f3c768;
        &:hover {
            background-color: #522c29;
        }
    }
    .m-team {
        @h: 40px;
        .flex;
        .size(220px,@h);
        .fz(14px,@h);
        .pl(10px);
        color: #fff;
        box-sizing: border-box;
        align-items: center;
        border-left: 4px solid #f3c768;
        background: linear-gradient(0, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
        .u-img {
            .size(24px);
            flex-shrink: 0;
        }
        .u-name {
            .w(100%);
            .nobreak;
            margin: 0 10px 0 15px;
        }
        .u-status {
            .size(@h);
            .x;
            flex-shrink: 0;
            background-color: rgba(0, 0, 0, 0.1);
        }
        &.win {
            background: linear-gradient(270deg, #f3c768 12.05%, rgba(243, 199, 104, 0) 76.59%),
                linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
            .u-status {
                background-color: #f3c768;
            }
        }
    }
    &::before {
        content: "";
        .pa;
        .lt(0,40px);
        .size(100px,4px);
        .ml(-120px);
        background-color: #fff;
        transform: translateX(-1px);
    }
}
</style>
