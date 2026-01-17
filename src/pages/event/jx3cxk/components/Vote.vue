<template>
    <div class="m-content m-vote wp">
        <template v-if="list.length">
            <vote-item v-for="item in list" :key="item.id" :data="item"></vote-item>
        </template>
    </div>
</template>
<script>
import voteItem from "./Item.vue";
import User from "@jx3box/jx3box-common/js/user.js";
import { shuffle } from "lodash";
import { getProgramDetail, getMyVote } from "@/service/event/vote";
export default {
    components: {
        voteItem,
    },
    data() {
        return {
            id: 28, // 投票ID
            list: [],
            play: "",
        };
    },
    methods: {
        loadData() {
            this.loading = true;
            getProgramDetail(this.id)
                .then(async (res) => {
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.map((item) => {
                        if (!item?.user_info?.avatar) item.user_info.avatar = `${__cdn}image/common/avatar.png`;
                        item.slider = 0;
                        return item;
                    });
                    if (User.isLogin()) await this.loadMyVote();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadMyVote() {
            const myVote = await getMyVote(this.id);
            this.myVote = myVote.data?.data?.list || [];
            this.list = this.list.map((item) => {
                item.isVoted = this.myVote.some((e) => e.vote_item_id == item.id);
                return item;
            });
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
<style lang="less" scoped>
.m-content.m-vote {
    .r(48px);
    box-sizing: border-box;
    padding: 48px;
    background: rgba(59, 46, 70, 0.5);
    .flex;
    flex-wrap: wrap;
    gap: 28px;
}
</style>
