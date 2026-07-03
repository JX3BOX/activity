<template>
    <!-- 通关视频 -->
    <div
        class="m-superstar-video"
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)"
    >
        <div class="m-video-boss">
            <div class="u-boss" :class="current_boss == '' ? 'active' : ''" @click="current_boss = ''">
                <span>全部视频</span>
            </div>
            <div
                class="u-boss"
                :class="current_boss == aid ? 'active' : ''"
                v-for="(label, aid) of bossList"
                :key="aid"
                @click="changeBoss(aid)"
            >
                <img class="u-img" :src="bossIcon(aid)" :alt="label" @error="handleImgError" />
                <span>{{ label }}</span>
            </div>
        </div>

        <div class="m-video-content">
            <template v-if="data && data.length">
                <div class="m-video-list">
                    <div class="m-video-item" v-for="(item, index) of data" :key="index">
                        <a class="u-video" :href="item.url" target="_blank">
                            <img :src="videoCover(item.aid)" class="u-cover" />
                            <img class="u-player" svg-inline src="@/assets/img/rank/play.svg" />
                        </a>
                        <a class="u-info" :href="teamLink(item.team_id)" target="_blank">
                            <img :src="liveAvatar(item.logo)" class="u-team-logo" loading="lazy" />
                            <div class="u-team-right">
                                <div class="u-team">团队 : {{ item.name }}</div>
                                <div class="u-room">{{ item.title }}</div>
                            </div>
                        </a>
                    </div>
                    <el-pagination
                        class="m-rank-video-pages m-archive-pages"
                        background
                        layout="total, prev, pager, next,jumper"
                        :hide-on-single-page="true"
                        :page-size="per"
                        :total="total"
                        v-model:current-page="page"
                    >
                    </el-pagination>
                </div>
            </template>
            <div class="m-video-null" v-else><i class="el-icon-warning-outline"></i> 没有找到相关条目</div>
        </div>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import { __imgPath } from "@/utils/config";
import { getVideos } from "@/service/rank/video.js";
import { default_avatar } from "@/utils/config";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { filter } from "lodash";
export default {
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
            console.log(this.achieves);
            this.achieves.forEach((item) => {
                dict[item.achievement_id] = item?.name;
            });
            return dict;
        },
    },
    methods: {
        bossIcon(val) {
            return PICS.bossIcon(val);
        },
        changeBoss(val) {
            console.log(val);
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
