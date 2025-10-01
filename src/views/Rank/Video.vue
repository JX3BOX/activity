<template>
    <!-- 通关视频 -->
    <div
        class="m-rank-video"
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
                                <!-- <div class="u-op" v-if="isEditor">
                                    <el-button class="u-edit" type="primary" plain @click="edit(item)" icon="el-icon-edit-outline" size="mini">编辑</el-button>
                                    <el-button class="u-delete" type="danger" plain @click="del(item.ID)" icon="el-icon-delete" size="mini">删除</el-button>
                                </div> -->
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
            <div class="m-rank-top100-null" v-else>
                <img :src="`${imgPath}image/rank/common/null.png`" class="m-rank-null" />
            </div>
            <!-- <el-alert v-else class="m-archive-null" title="没有找到相22关条目" type="info" center show-icon> </el-alert> -->
        </div>
        <el-dialog
            class="m-rank-video-dialog"
            title="添加/编辑视频"
            :visible.sync="dialogVisible"
            width="30%"
            :append-to-body="true"
        >
            <div class="m-rank-video-form">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="团队ID">
                        <el-input v-model.number="video.team_id" placeholder="请输入正确的团队数字编号"></el-input>
                    </el-form-item>
                    <el-form-item label="成就ID">
                        <el-select v-model.number="video.aid" placeholder="请选择">
                            <el-option
                                v-for="(label, achieve_id) of bossList"
                                :key="achieve_id"
                                :label="label"
                                :value="achieve_id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频链接">
                        <el-input v-model="video.url" placeholder="请输入视频网址"></el-input>
                    </el-form-item>
                    <el-form-item label="视频标题">
                        <el-input v-model="video.title" placeholder="请注明XX视角"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { getVideos, deleteVideo, addVideo, updateVideo } from "@/service/rank/video.js";
import { default_avatar } from "@/utils/config";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
import rank_boss from "@/components/rank/rank_boss.vue";
import { cloneDeep } from "lodash";
export default {
    components: {
        "rank-boss": rank_boss,
    },
    data: function () {
        return {
            video_title_img: __imgPath + "image/rank/common/videos.png",
            data: [],
            per: 24,
            page: 1,
            total: 1,
            loading: false,
            servers,
            server: "",
            current_boss: "",
            isAdmin: User.isAdmin(),
            isEditor: User.isEditor(),
            dialogVisible: false,
            video: {
                ID: "",
                team_id: "",
                event_id: "",
                aid: "",
                title: "",
                url: "",
            },
            imgPath: __imgPath,
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
        demo_video: function () {
            return {
                team_id: "",
                event_id: ~~this.id,
                aid: "",
                title: "",
                url: "",
            };
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
                    this.data = res.data.data.list;
                    this.page = res.data.data.page.index;
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        del: function (id) {
            this.$alert("确认删除吗", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        deleteVideo(id).then((res) => {
                            this.$message({
                                type: "success",
                                message: `删除成功`,
                            });
                            location.reload();
                        });
                    }
                },
            });
        },
        edit: function (item) {
            this.dialogVisible = true;
            this.video = item;
        },
        add: function () {
            this.dialogVisible = true;
            this.video = cloneDeep(this.demo_video);
        },
        submit: function () {
            if (this.video.ID) {
                updateVideo(this.video.ID, this.video).then((res) => {
                    this.$message({
                        type: "success",
                        message: `更新成功`,
                    });
                    this.dialogVisible = false;
                });
            } else {
                addVideo(this.video).then((res) => {
                    this.$message({
                        type: "success",
                        message: `发布成功`,
                    });
                    this.dialogVisible = false;
                });
            }
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
@import "~@/assets/css/rank/race_video.less";
</style>
