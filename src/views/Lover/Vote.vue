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
                        <el-avatar
                            class="u-avatar-pic"
                            shape="circle"
                            :size="24"
                            :src="item.user_info.avatar"
                        ></el-avatar>
                        <span>{{ item.user_info.display_name }}</span>
                    </div>
                    <div class="u-slogan">{{ item.slogan }}</div>
                    <div class="u-button"></div>
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
import { getJoinList } from "@/service/rank/lover";
export default {
    name: "LoverVote",
    inject: ["__imgRoot"],
    data: function () {
        return {
            pageSize: 30,
            index: 1,
            list: [],
            total: 0,
        };
    },
    computed: {
        loverId() {
            return this.$store.state.loverId;
        },
        vote_note() {
            return this.$store.state.info.vote_note;
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
        load() {
            getJoinList(this.loverId).then((res) => {
                this.list = res.data.data.list || [];
                this.total = res.data.data.page.total;
            });
        },
        changePage(i) {
            this.index = i;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/vote.less";
</style>
