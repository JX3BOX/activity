<template>
    <div class="m-vote-content" v-loading="loading">
        <div class="m-vote-list" v-if="list.length">
            <div class="m-vote-item" :class="{ active: item.active }" v-for="(item, i) in list" :key="i">
                <div class="u-top" :style="{ paddingTop: item.padding }"></div>
                <div class="u-vote">
                    <span class="u-title">{{ item.title }}</span>
                    <img
                        class="u-icon"
                        @click.stop="handleVote(item)"
                        :src="`${cdn}design/event/jx3story/2025/web/${item.active ? 'active' : 'vote'}.png`"
                    />
                </div>
            </div>
            <div class="u-txt">
                <span>* 点击文章下方的按钮即可参与投票哦</span>
                <img class="u-icon" :src="`${cdn}design/event/jx3story/2025/web/vote.png`" />
            </div>
        </div>
        <div class="u-null" v-else-if="!loading">
            <img :src="data.nullImg" />
        </div>
    </div>
</template>
<script>
import { getProgramDetail, getMyVote, vote } from "@/service/event/vote";
import { shuffle } from "lodash";
import User from "@jx3box/jx3box-common/js/user.js";
import { __cdn } from "@/utils/config";
export default {
    name: "jx3storyVote",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isLogin: User.isLogin(),
            loading: false,
            list: [],
            cdn: __cdn,
            lastVoteTime: 0,
        };
    },
    computed: {
        vote_id() {
            return this.data.vote_id || "";
        },
    },
    watch: {
        vote_id: {
            handler(id) {
                id && this.loadVote(id);
            },
            immediate: true,
        },
    },
    methods: {
        loadVote(id) {
            this.loading = true;
            getProgramDetail(id)
                .then(async (res) => {
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.map((item) => {
                        const randomNum = Math.floor(Math.random() * 220);
                        return {
                            ...item,
                            padding: `${randomNum}px`,
                        };
                    });
                    this.isLogin && (await this.loadMyVote(id));
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadMyVote(id) {
            const myVote = await getMyVote(id);
            const ids = myVote.data?.data?.list || [];
            const list = ids.map((item) => item.vote_item_id);
            this.list = this.list.map((item) => ({
                ...item,
                active: list.includes(item.id),
            }));
        },
        handleVote(item) {
            if (item.active) return;
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            const time = 1000;
            const now = Date.now();
            if (now - this.lastVoteTime < time) {
                return this.$message({
                    message: "投票速度太快啦！",
                    type: "warning",
                });
            }
            this.lastVoteTime = now;
            vote(item.program_id, { vote_id_list: [item.id] }).then(() => {
                this.$message({
                    message: "投票成功",
                    type: "success",
                });
                item.active = true;
            });
        },
    },
};
</script>
