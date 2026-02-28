<template>
    <div class="m-stats-content" :class="list.length ? '' : 'noPadding'" v-loading="loading">
        <div class="m-list-box" v-if="list.length">
            <div class="m-list-header">
                <span class="u-title">{{ data.year }}年茶馆风月录作品投票</span>
            </div>
            <div class="m-list">
                <div class="m-list-item m-list-item-header">
                    <span class="u-number endVote">序号</span>
                    <span class="u-post"> 入选作品</span>
                    <span class="u-author">作者</span>
                    <span class="u-number">票数</span>
                </div>
                <div class="m-mini-scroll" v-if="isMiniProgram">
                    <div class="m-list-item" v-for="(item, i) in list" :key="i">
                        <div class="u-info">
                            <span class="u-post">
                                <a :href="`${root}community/${item.content}`" target="_blank">{{ item.title }}</a>
                            </span>
                            <span class="u-author">
                                <a :href="`${root}author/${item.user_info.id}`" target="_blank">
                                    —— {{ item.user_info.display_name }}
                                </a>
                            </span>
                        </div>
                        <span class="u-number">{{ item.amount }}</span>
                    </div>
                </div>
                <template v-else>
                    <div class="m-list-item" v-for="(item, i) in list" :key="i">
                        <span class="u-number">
                            <span class="u-amount">{{ i + 1 }}</span>
                        </span>
                        <span class="u-post">
                            <a :href="`${root}community/${item.content}`" target="_blank">{{ item.title }}</a>
                        </span>
                        <span class="u-author">
                            <a :href="`${root}author/${item.user_info.id}`" target="_blank">
                                {{ item.user_info.display_name }}
                            </a>
                        </span>
                        <span class="u-number" @click.stop="handleVote(item)">
                            <span class="u-amount">{{ item.amount }}</span>
                            <img
                                v-if="!endVote"
                                class="u-vote"
                                :src="`${cdn}2025/web/${item.active ? 'active' : 'vote'}.png`"
                            />
                        </span>
                    </div>
                </template>
            </div>
        </div>
        <div class="u-null" v-else-if="!loading">
            <img :src="data.nullImg" />
        </div>
    </div>
</template>
<script>
import { isMiniProgram, isApp } from "@jx3box/jx3box-common/js/utils";
import { getProgramDetail, getMyVote, vote } from "@/service/event/vote";
import { shuffle } from "lodash";
import User from "@jx3box/jx3box-common/js/user.js";
import { __cdn, __Root } from "@/utils/config";
export default {
    name: "jx3storyStats",
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
            root: __Root,
            isMiniProgram: isMiniProgram() || isApp(),
            cdn: __cdn + "design/event/jx3story/",
            lastVoteTime: 0,
            end_at: 0,
        };
    },
    computed: {
        vote_id() {
            return this.data.vote_id || "";
        },
        endVote() {
            const now = new Date().getTime();
            return new Date(this.end_at).getTime() < now;
        },
    },
    watch: {
        vote_id: {
            handler(id) {
                this.list = [];
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
                    this.end_at = res.data?.data?.end_at || 0;
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.sort((a, b) => b.amount - a.amount);
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
