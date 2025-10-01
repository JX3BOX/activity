<template>
    <!-- 视频直播 -->
    <div class="m-rank-video" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
        <div class="m-rank-video-title">
            <img :src="video_title_img" class="u-title-img" />
            <div class="u-extend">
                <el-select class="u-server" v-model="server" placeholder="请选择服务器" size="mini">
                    <el-option key="all" label="全部" value=""></el-option>
                    <el-option v-for="item in servers" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-pagination class="u-pages" layout="prev, pager, next" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page"> </el-pagination>
            </div>
        </div>
        <div class="m-rank-video-live" v-if="event_status && list && list.length">
            <div class="u-live">
                <iframe :src="live_url || default_live_url" frameborder="0"></iframe>
            </div>
            <div class="u-list">
                <li v-for="(item, i) in list" :key="i" @click="play(item)" :class="{ on: !!item.isActive }">
                    <img class="u-live-logo" :src="teamLogo(item.team.logo)" />
                    <span class="u-live-name"
                        >{{ item.team.name }} <em>@{{ item.team.server }}</em>
                    </span>
                </li>
            </div>
        </div>
        <div class="m-rank-video-content">
            <template v-if="data && data.length">
                <el-row class="m-rank-video-list" :gutter="20">
                    <el-col :span="8" v-for="(item, i) in data" :key="i">
                        <div class="m-rank-video-item">
                            <a class="u-video" :href="getTVlink(item.team.tv_type, item.team.tv)" target="_blank">
                                <template v-if="item.team.tv_type == 'douyu'">
                                    <img v-if="item.douyu.room_src" :src="item.douyu.room_src" class="u-live-cover" loading="lazy" />
                                    <img v-else :src="teamLogo(item.team.logo)" class="u-live-null" loading="lazy" />
                                    <i
                                        class="u-status"
                                        :class="{
                                            on: ~~item.douyu.show_status == 1,
                                        }"
                                        ><i class="el-icon-video-camera"></i> {{ liveStatusMap[~~item.douyu.show_status] }}</i
                                    >
                                    <i class="u-player" v-if="~~item.douyu.show_status == 1">
                                        <img svg-inline src="@/assets/img/rank/play.svg" />
                                    </i>
                                </template>
                                <template v-else>
                                    <img :src="teamLogo(item.team.logo)" class="u-live-null" loading="lazy" />
                                    <i class="u-status"><i class="el-icon-warning-outline"></i> 未知</i>
                                </template>
                            </a>
                            <div class="u-info">
                                <img :src="liveAvatar(item.team.logo)" class="u-team-logo" loading="lazy" />
                                <div class="u-team">
                                    <span class="u-label">团队 : </span>
                                    <a class="u-team-name" :href="teamLink(item.team.ID)" target="_blank">{{ item.team.name }}</a>
                                </div>
                                <div class="u-room">
                                    <a class="u-room-name" :href="getTVlink(item.team.tv_type, item.team.tv)" target="_blank">
                                        {{ (item.team.tv_type == "douyu" && item.douyu.room_name) || item.team.name + "的直播间" }}
                                    </a>
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
            <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon> </el-alert>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { getLives } from "@/service/rank/video.js";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@/utils/config";
import getTVlink from "@/assets/js/tv.js";
const liveStatusMap = ["等待开播", "直播中", "直播结束"];
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
export default {
    props: [],
    data: function() {
        return {
            video_title_img: __imgPath + "image/rank/common/lives.png?123",
            data: [],
            per: 24,
            page: 1,
            total: 1,
            liveStatusMap,
            loading: false,
            servers,
            server: "",
            live_url: "",
        };
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        params: function() {
            return {
                pageSize: this.per,
                pageIndex: this.page,
                server: this.server,
            };
        },
        list: function() {
            let list = [];
            this.data?.forEach((item, i) => {
                if (item.team.tv_type == "douyu" && item.douyu.show_status == 1) {
                    list.push(item);
                }
                if (i == 0) {
                    item.isActive = true;
                }
            });
            return list;
        },
        default_live_url: function() {
            if (this.list && this.list.length) {
                return "https://open.douyu.com/tpl/h5/chain2/jdxoubyoux/" + this.list[0]["team"]["tv"];
            } else {
                return "";
            }
        },
        event_status: function() {
            return !!this.$store.state.race.status || false;
        },
    },
    methods: {
        getTVlink,
        loadData: function() {
            this.loading = true;
            getLives(this.id, this.params)
                .then((res) => {
                    this.data = res.data.data.list;
                    // this.page = res.data.data.page.index;
                    // this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        play: function(item) {
            this.live_url = "https://open.douyu.com/tpl/h5/chain2/jdxoubyoux/" + item.team.tv;
            this.clean();
            item.isActive = true;
        },
        clean: function() {
            this.list?.forEach((item) => {
                item.isActive = false;
            });
        },
        teamLogo: function(val) {
            return val ? getThumbnail(val, 240, true) : default_avatar;
        },
        liveAvatar: function(val) {
            return val ? getThumbnail(val, 136, true) : default_avatar;
        },
        teamLink: function(val) {
            // return "/team/#/org/view/" + val;
            return getLink("org", val);
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function() {
                this.loadData();
            },
        },
    },
    created: function() {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_video.less";
</style>
