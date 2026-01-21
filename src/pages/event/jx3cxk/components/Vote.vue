<template>
    <div class="m-content wp" v-loading="loading" @click="checkLogin">
        <div class="u-info">
            <img class="u-title" :src="`${imgRoot}web/title2.png`" />
            <div v-html="voteInfo"></div>
        </div>
        <div class="m-vote" v-if="list.length">
            <vote-item v-for="item in list" :key="item.id" :data="item"></vote-item>
        </div>
    </div>
</template>
<script>
import voteItem from "./Item.vue";
import User from "@jx3box/jx3box-common/js/user.js";
import jx3cxkData from "@/assets/data/event/jx3cxk.json";
export default {
    inject: ["__imgRoot"],
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["update:vote"],
    components: {
        voteItem,
    },
    data() {
        return {
            currentPlayingId: null,
            loading: false,
            imgRoot: this.__imgRoot,
        };
    },
    computed: {
        voteInfo() {
            return jx3cxkData.vote;
        },
    },
    methods: {
        checkLogin() {
            if (!User.isLogin()) {
                return User.toLogin();
            }
        }, 
        handlePlay(id) {
            if (this.currentPlayingId === id) {
                this.currentPlayingId = null;
            } else {
                this.currentPlayingId = id;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.m-content {
    .pt(80px) !important;
    .u-info {
        .pr;
        .bold;
        .fz(18px);
        .lh(48px);
        .x;
        .auto(x);
        .r(8px);
        padding: 64px 20px;
        color: #fff4db;
        border-top: 8px solid #9899f2;
        border-bottom: 8px solid #9899f2;
        background: rgba(0, 0, 0, 0.2);
        /deep/ b {
            .fz(22px);
        }
        .u-title {
            .pa;
            .lt(50%,-42px);
            .size(480px,84px);
            .ml(-240px);
        }
    }
    .m-vote {
        .flex;
        .r(48px);
        margin: 84px auto;
        box-sizing: border-box;
        padding: 48px;
        background: rgba(59, 46, 70, 0.5);
        flex-wrap: wrap;
        gap: 28px;
        .m-item-box {
            .mb(20px);
        }
    }
}
</style>
