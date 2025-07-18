<template>
    <div class="m-lover-vote wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}vote-title.png?11`" />
        </div>
        <div class="m-line-box">
            <div class="m-box">
                <h2>投票规则</h2>
                <div class="u-rule" v-html="vote_note"></div>
            </div>
        </div>
        <div class="m-vote-list">
            <div class="m-line-box" v-for="(item, i) in list" :key="i">
                <div class="m-box">
                    <div class="u-hot">人气值：{{ item.votes }}</div>
                    <el-image class="u-img" :src="item.images[0]">
                        <i slot="error"></i>
                    </el-image>
                    <div class="u-team">{{ item.team_name }}</div>
                    <div class="u-name">
                        <span v-for="(user, index) in uniqBy(item.teammeta_user_list, 'id')" :key="index">
                            {{ user.display_name }}
                        </span>
                    </div>
                    <div class="u-slogan">{{ item.slogan }}</div>
                    <div class="u-button" @click="onVote(item)" :class="{ 'is-loading': vote_loading }"></div>
                </div>
            </div>
        </div>
        <el-pagination
            class="m-pagination"
            background
            :total="total"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="index"
            :page-size="pageSize"
            @current-change="changePage"
        ></el-pagination>
    </div>
</template>

<script>
import { uniqBy } from "lodash";
import { getJoinList, vote, getVoteStatus } from "@/service/rank/lover";
export default {
    name: "LoverVote",
    inject: ["__imgRoot"],
    data: function () {
        return {
            pageSize: 30,
            index: 1,
            list: [],
            total: 0,

            vote_loading: false,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        event() {
            return this.$store.state.event;
        },
        vote_note() {
            return this.$store.state.event.vote_note;
        },
        params() {
            return {
                pageSize: this.pageSize,
                index: this.index,
            };
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.load();
            },
        },
    },
    methods: {
        uniqBy,
        load() {
            getJoinList(this.eventId).then((res) => {
                this.list = res.data.data.list || [];
                this.total = res.data.data.page.total;
            });
        },
        changePage(i) {
            this.index = i;
        },
        async onVote(item) {
            if (this.vote_loading) return;
            this.vote_loading = true;
            try {
                const promise = this.event.is_point_vote
                    ? vote(this.eventId, item.id, { votes_count: 10 })
                    : vote(this.eventId, item.id, { votes_count: 10 });
                const vote_resp = await promise;
                const vote_record_id = vote_resp.data?.data?.id;
                if (this.event.is_point_vote) {
                    if (!vote_record_id) {
                        this.$message.error("投票失败，请稍后再试");
                        return;
                    }
                    // 是积分投票，需要轮询一段时间的接口
                    for (let i = 0; i < 10; i++) {
                        // 每500ms检查一次
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        const resp = await getVoteStatus(this.eventId, item.id, vote_record_id);
                        const res = resp.data?.data?.status;
                        if (res) {
                            this.$message.success("投票成功");
                            item.votes += 1;
                            break;
                        }
                    }
                } else {
                    // 非积分投票
                    this.$message.success("投票成功");
                    item.votes += 1;
                }
            } finally {
                this.vote_loading = false;
            }
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/vote.less";
</style>
