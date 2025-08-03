<template>
    <div class="m-lover-live wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}jubanfang.png`" />
        </div>
        <div
            class="m-live-box"
            @mouseenter="handleMainBoxMouseEnter"
            @mouseleave="handleMainBoxMouseLeave"
            @click="handleMainBoxClick"
        >
            <div class="m-live-container">
                <iframe
                    class="m-live-iframe"
                    width="100%"
                    height="100%"
                    :src="live_url"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <img class="u-frame-img" :src="`${__imgRoot}jubanfangbox.png`" />
        </div>

        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}xuanshou.png`" />
        </div>
        <div class="m-player-list" v-if="list && list.length">
            <div
                class="m-player-item"
                v-for="(item, itemIndex) in list"
                :key="item.id"
                @mouseenter="handlePlayerItemMouseEnter(itemIndex)"
                @mouseleave="handlePlayerItemMouseLeave(itemIndex)"
            >
                <a class="u-video" :href="item.live_url" target="_blank">
                    <img :src="teamLogo(item.images[0])" class="u-live-null" loading="lazy" />
                    <i class="u-status"><i class="el-icon-warning-outline"></i> 未知</i>
                </a>
                <div class="m-player-info">
                    <img class="u-team-logo" :src="teamLogo(item.images[0])" alt="" />
                    <div class="u-team-name">{{ item.team_name }}</div>
                    <div class="u-teammates">
                        <div
                            class="u-teammate"
                            v-for="(user, index) in uniqBy(item.teammeta_user_list, 'id')"
                            :key="index"
                        >
                            <el-image
                                class="u-avatar"
                                :src="showAvatar(user.avatar || `${__imgRoot}default.png`)"
                            ></el-image
                            >{{ user.display_name }}
                        </div>
                    </div>
                    <div class="u-slogan">{{ item.slogan }}</div>
                </div>
                <ParticleEffect :ref="`playerParticleEffect_${itemIndex}`" />
            </div>
        </div>
        <div class="m-no-data" v-else>暂无选手直播</div>
    </div>
</template>

<script>
import { getSelectedList } from "@/service/rank/lover";
import { uniqBy } from "lodash";
import { showAvatar, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import ParticleEffect from "@/components/rank/ParticleEffect.vue";
import { default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "LoverLive",
    components: {
        ParticleEffect,
    },
    inject: ["__imgRoot"],
    data: function () {
        return {
            list: [],
        };
    },
    computed: {
        id: function () {
            return this.$store.state.loverId || 1;
        },
        event() {
            return this.$store.state.event;
        },
        live_url: function () {
            if (this.event && this.event.live_url) {
                return this.event.live_url;
            }
            return `https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=31109814&danmaku=1`;
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        showAvatar,
        uniqBy,
        teamLogo: function(val) {
            return val ? getThumbnail(val, 240, true) : default_avatar;
        },
        loadData() {
            getSelectedList(this.id).then((res) => {
                this.list = res.data.data.list;
            });
        },
        // 主直播框鼠标事件处理
        handleMainBoxMouseEnter() {
            const frameImg = document.querySelector(".u-frame-img");
            if (frameImg) {
                frameImg.src = `${this.__imgRoot}jubanfangbox-hover.png`;
            }
        },
        handleMainBoxMouseLeave() {
            const frameImg = document.querySelector(".u-frame-img");
            if (frameImg) {
                frameImg.src = `${this.__imgRoot}jubanfangbox.png`;
            }
        },
        handleMainBoxClick() {
            // 处理主直播框点击事件
            window.open(this.live_url, "_blank");
        },
        // 选手直播项鼠标事件处理
        handlePlayerItemMouseEnter(index) {
            // 播放粒子特效
            const refName = `playerParticleEffect_${index}`;
            if (this.$refs[refName] && this.$refs[refName][0]) {
                this.$refs[refName][0].playAnimation();
            }
        },
        handlePlayerItemMouseLeave(index) {
            // 停止粒子特效
            const refName = `playerParticleEffect_${index}`;
            if (this.$refs[refName] && this.$refs[refName][0]) {
                this.$refs[refName][0].stopAnimation();
            }
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/live.less";
</style>
