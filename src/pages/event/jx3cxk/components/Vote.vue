<template>
    <div class="m-content m-vote wp" v-loading="loading" @click="checkLogin">
        <template v-if="list.length">
            <vote-item
                v-for="item in list"
                :key="item.id"
                :data="item"
                :is-play="currentPlayingId === item.id"
                @update:vote="$emit('update:vote', $event)"
                @play="handlePlay"
            ></vote-item>
        </template>
    </div>
</template>
<script>
import voteItem from "./Item.vue";
import User from "@jx3box/jx3box-common/js/user.js";
export default {
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
        };
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
.m-content.m-vote {
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
</style>
