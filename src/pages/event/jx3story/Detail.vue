<template>
    <div class="jx3story-event-content p-event-main">
        <!-- 灯笼 -->
        <LanternGroup />
        <!-- logo -->
        <router-link class="mini-slogan" to="/" @click.native="handleClick">
            <img class="event__sign" :src="getImgUrl('/eventcontent/eventc__sign.png')" alt="活动标志" />
        </router-link>

        <div class="m-main" v-loading="loading">
            <!-- 活动介绍 -->
            <template v-if="key === 'event'"> <div class="m-content" v-html="content"></div></template>
            <!-- 投票 -->
            <template v-if="key === 'vote'">
                <div class="m-content m-content-vote">
                    <h2>2024年茶馆风月录投票榜</h2>
                    <table class="m-vote-table">
                        <thead>
                            <tr>
                                <th width="120px">序号</th>
                                <th>作品</th>
                                <th width="120px">作者</th>
                                <th width="120px">人气</th>
                                <th width="120px">投票</th>
                            </tr>
                        </thead>
                        <tbody v-if="voteItems && voteItems.length">
                            <tr v-for="(item, i) in voteItems" :key="i">
                                <td>
                                    <span class="u-id">{{ i + 1 }}</span>
                                </td>
                                <td>
                                    <a :href="`${root}community/${item.content}`" target="_blank" class="u-title">
                                        <span>{{ item.title }}</span>
                                    </a>
                                </td>
                                <td>
                                    <a :href="`${root}author/${item.user_info.id}`" target="_blank" class="u-author">
                                        <span>{{ item.user_info.display_name }}</span>
                                    </a>
                                </td>
                                <td>
                                    <span class="u-count">{{ item.amount }}</span>
                                </td>
                                <td @click="handleVote(item)">
                                    <div class="u-vote">
                                        <img :src="getImgUrl(`vote/btn-vote.svg`)" alt="投票" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import LanternGroup from "./components/LanternGroup.vue";
import { getEventAc } from "@/service/event/jx3story";
import { getProgramDetail, userPoll } from "@/service/event/vote";
import { __cdn, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "jx3storyEvent",
    inject: ["__imgRoot"],
    components: {
        LanternGroup,
    },
    data() {
        return {
            loading: false,
            // 活动介绍
            content: "",
            ac_id: 92980,

            // 投票
            voteItems: [],
            id: 23,
            root: __Root,
        };
    },
    computed: {
        key() {
            return this.$route.meta.key;
        },
    },
    watch: {
        key() {
            this.loadData();
        },
    },
    methods: {
        getImgUrl(name) {
            return this.__imgRoot + name;
        },
        handleClick() {
            this.$router.push("/").catch((err) => {
                if (err.name !== "NavigationDuplicated") {
                    throw err;
                }
            });
        },
        loadInfo() {
            getEventAc(this.ac_id)
                .then((post) => {
                    this.content = post;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadVote() {
            getProgramDetail(this.id)
                .then((res) => {
                    this.voteItems = res.data?.data?.vote_items || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        loadData() {
            this.loading = true;
            if (this.key == "event") this.loadInfo();
            if (this.key == "vote") this.loadVote();
        },
        handleVote({ id }) {
            userPoll(this.id, { vote_id_list: [id] }).then(() => {
                this.$message.success("投票成功");
                this.voteItems = this.voteItems.map((v) => {
                    if (v.id == id) {
                        v.amount++;
                    }
                    return v;
                });
            });
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/event/jx3story/event.less";
</style>
