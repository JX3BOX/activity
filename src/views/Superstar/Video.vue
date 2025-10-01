<template>
    <!-- 通关视频 -->
    <div
        class="m-superstar-video"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <!-- Boss导航 -->
        <rank-boss :data="bossList" :aid="current_boss" @update="changeBoss" />

        <div class="m-rank-video-content">
            <template v-if="data && data.length">
                <el-row class="m-rank-video-list" :gutter="20">
                    <el-col
                        :span="8"
                        v-for="(item, i) in data"
                        :key="i"
                        v-show="!current_boss || item.aid == current_boss"
                    >
                        <div class="m-rank-video-item">
                            <a class="u-video" :href="item.url" target="_blank">
                                <img :src="videoCover(item.aid)" class="u-live-cover" loading="lazy" />
                                <i class="u-player">
                                    <img svg-inline src="@/assets/img/rank/play.svg" />
                                </i>
                            </a>
                            <div class="u-info">
                                <a :href="teamLink(item.team_id)" target="_blank"
                                    ><img :src="liveAvatar(item.logo)" class="u-team-logo" loading="lazy"
                                /></a>
                                <div class="u-team-right">
                                    <div class="u-team">
                                        <span class="u-label">团队 : </span>
                                        <a class="u-team-name" :href="teamLink(item.team_id)" target="_blank">{{
                                            item.name
                                        }}</a>
                                    </div>
                                    <div class="u-room">
                                        <a class="u-room-name" :href="item.url" target="_blank">
                                            {{ item.title }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-pagination
                    class="m-rank-video-pages m-archive-pages"
                    background
                    layout="total, prev, pager, next,jumper"
                    :hide-on-single-page="true"
                    :page-size="per"
                    :total="total"
                    :current-page.sync="page"
                >
                </el-pagination>
            </template>
            <div class="m-video-null" v-else><i class="el-icon-warning-outline"></i> 没有找到相关条目</div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { getVideos } from "@/service/rank/video.js";
import { default_avatar } from "@/utils/config";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import rank_boss from "@/components/rank/rank_boss.vue";
import { cloneDeep, filter } from "lodash";
export default {
    components: {
        "rank-boss": rank_boss,
    },
    data: function () {
        return {
            video_title_img: __imgPath + "image/rank/common/videos.png",
            data: [],
            per: 36,
            page: 1,
            total: 1,
            loading: false,
            current_boss: "",
            dialogVisible: false,
            video: {
                ID: "",
                team_id: "",
                event_id: "",
                aid: "",
                title: "",
                url: "",
            },
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        params: function () {
            return {
                pageSize: this.per,
                pageIndex: this.page,
                aid: this.current_boss,
            };
        },
        achieves: function () {
            return this.$store.state.achieves || [];
        },
        bossList: function () {
            let dict = {};
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item.name;
            });
            return dict;
        },
    },
    methods: {
        changeBoss(val) {
            this.current_boss = val == "all" ? "" : val;
            this.page = 1;
            this.loadData();
        },
        loadData: function () {
            this.loading = true;
            getVideos(this.id, this.params)
                .then((res) => {
                    this.data = filter(res.data.data.list, function (o) {
                        return o.is_superstar == 1;
                    });
                    this.page = res.data.data.page.index;
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        liveAvatar: function (val) {
            return val ? getThumbnail(val, 136, true) : default_avatar;
        },
        teamLink: function (val) {
            // return "/team/#/org/view/" + val;
            return getLink("org", val);
        },
        videoCover: function (aid) {
            return __imgPath + `image/rank/videos/${aid}.png`;
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function () {
                this.loadData();
            },
        },
    },

    created: function () {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/superstar/video.less";
</style>
