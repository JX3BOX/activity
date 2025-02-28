<template>
    <!-- 投票竞猜页 -->
    <div class="m-rank-vote" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
        <!-- <div class="m-rank-vote-title">
            <img :src="vote_title_img" />
        </div> -->
        <div class="m-rank-vote-header" v-html="vote_note" v-if="vote_note"></div>
        <table class="m-rank-vote-table">
            <thead>
                <tr>
                    <th width="120px">排名</th>
                    <th width="120px"><!--logo--></th>
                    <th width="120px">
                        团队
                        <el-popover placement="top" width="220" trigger="click">
                            <el-input v-model="team_name" placeholder="输入团队名关键字" clearable></el-input>
                            <el-button slot="reference" type="text"><i class="el-icon-search u-search-team"></i></el-button>
                        </el-popover>
                    </th>
                    <th>
                        <el-select class="u-server u-select" v-model="server" placeholder="选择服务器" size="mini">
                            <el-option key="all" label="全部服务器" value=""> </el-option>
                            <el-option v-for="item in servers" :key="item" :label="item" :value="item"> </el-option>
                        </el-select>
                    </th>
                    <th v-if="id != 1">团长&amp;宣言</th>
                    <!-- <th v-if="id != 1">团队提供奖品</th> -->
                    <th>人气</th>
                    <th>参与投票</th>
                </tr>
            </thead>
            <vote-item-v1 :team_name="team_name" :server="server" :data="data" v-if="id == 1" />
            <vote-item-v2 :team_name="team_name" :server="server" :data="data" :vote-team="voteTeam" v-else />
        </table>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
import { getAllJoinedTeams, getVoteStatus } from "@/service/rank/vote.js";
import vote_item_v1 from "@/components/rank/vote_item_v1.vue";
import vote_item_v2 from "@/components/rank/vote_item_v2.vue";
export default {
    name: "Vote",
    props: [],
    data: function() {
        return {
            servers,
            vote_title_img: __imgPath + "image/rank/common/vote.png",

            loading: false,
            data: [],
            team_name: "",
            server: "",
            voteTeam: []
        };
    },
    computed: {
        id: function() {
            return ~~this.$store.state.id;
        },
        vote_note: function() {
            return this.$store.state.race.vote_note || "";
        },
    },
    methods: {
        loadData: function() {
            this.loading = true;
            getAllJoinedTeams(this.id)
                .then((data) => {
                    this.data = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        getStatus: function() {
            getVoteStatus(this.id)
                .then((res) => {
                    this.voteTeam = Object.keys(res.data.data || {});
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        init: function() {
            this.loadData();
            this.getStatus();
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function() {
                this.init();
            },
        },
    },
    components: {
        "vote-item-v1": vote_item_v1,
        "vote-item-v2": vote_item_v2,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_vote.less";
</style>
