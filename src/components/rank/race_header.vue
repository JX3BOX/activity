<template>
    <div class="m-race-header">
        <!-- 视觉图 -->
        <div class="u-vision">
            <img class="u-boss" :src="boss_img_url" v-if="id" />
            <img class="u-logo" :src="LOGO" />
            <img class="u-version" :src="version_img_url" v-if="id" />
            <div v-if="isAppMode" class="u-version-switch">
                <AppSelectDrawer
                    title="切换版本"
                    :model-value="String(id)"
                    :options="versionOptions"
                    @select="changeVersion"
                >
                    <template #default="{ open }">
                        <div
                            class="u-version-select"
                            role="button"
                            tabindex="0"
                            @keydown.enter="open"
                            @keydown.space.prevent="open"
                        >
                            <span class="u-version-name">{{ currentVersionName }}</span>
                            <img class="u-version-change-icon" :src="changeIcon" alt="切换版本" />
                        </div>
                    </template>
                </AppSelectDrawer>
            </div>
        </div>

        <!-- 举办单位 -->
        <div class="u-logos u-media">
            <span>主办单位：</span>
            <ul>
                <li>
                    <a class="logo" href="https://www.jx3box.com" target="_blank">
                        <img class="u-media-jx3box" :src="logos('jx3box')" />
                    </a>
                </li>
                <!-- <li>
                    <a
                        class="logo"
                        href="https://www.weibo.com/u/6754472163"
                        target="_blank"
                    >
                        <img class="u-media-tuilan" :src="logos('tuilan')" />
                    </a>
                </li> -->
            </ul>
            <!-- <span>独家直播合作：</span>
            <ul>
                <li>
                    <a
                        class="logo"
                        href="https://www.douyu.com/"
                        target="_blank"
                    >
                        <img class="u-media-douyu" :src="logos('douyu')" />
                    </a>
                </li>
            </ul> -->
        </div>

        <!-- 赞助商 -->
        <div class="u-logos u-sponsors" v-if="hasSponsors">
            <span class="u-sponsors-label">活动赞助商：</span>
            <ul class="u-sponsors-list">
                <li v-for="(sponsor, i) in sponsors" :key="i">
                    <a class="logo" :href="sponsor.link" target="_blank">
                        <img :src="sponsor.logo" />
                    </a>
                </li>
            </ul>
        </div>

        <!-- 启用的模块 -->
        <race-tab v-if="$route.name !== 'team-detail'" :data="data" />

        <!-- 公众号二维码 -->
        <!-- <img  :src="qrcode_img_url" /> -->
        <div class="u-wechat-qrcode">
            <QrcodeVue class="u-qrcode" :value="value" :size="84" level="H"></QrcodeVue>
        </div>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import tabs from "./race_tab.vue";
import { __imgPath, __ossMirror } from "@/utils/config";
import QrcodeVue from "qrcode.vue";
import AppSelectDrawer from "@/components/common/AppSelectDrawer.vue";
import { getEvents } from "@/service/rank/event.js";
import { isApp } from "@/utils/env";

export default {
    props: ["data"],
    data: function () {
        return {
            LOGO: PICS.LOGO,
            qrcode_img_url: __imgPath + "image/rank/common/boxqrcode.png",
            changeIcon: "https://cdn.jx3box.com/design/rank/common/change.svg",
            versions: [],
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        boss_img_url: function () {
            return PICS.boss(this.id);
        },
        version_img_url: function () {
            return PICS.version(this.id);
        },
        sponsors: function () {
            return (this.data && this.data.sponsors) || [];
        },
        hasSponsors: function () {
            if (this.sponsors && this.sponsors.length && this.sponsors[0].link) {
                return true;
            }
            return false;
        },
        value() {
            return "https://www.jx3box.com/rank/race/#/" + this.id + "/rank";
        },
        isAppMode() {
            return isApp();
        },
        versionOptions() {
            const eventMap = new Map();
            [...this.versions, this.data].forEach((item) => {
                const value = this.eventId(item);
                if (value) eventMap.set(String(value), this.eventName(item));
            });
            return Array.from(eventMap, ([value, label]) => ({ value, label }));
        },
        currentVersionName() {
            return this.eventName(this.data) || this.versionOptions.find((item) => item.value === String(this.id))?.label || "选择版本";
        },
    },
    methods: {
        logos: function (val) {
            return PICS.logos(val);
        },
        eventId(item) {
            return item && (item.ID || item.id);
        },
        eventName(item) {
            return item && (item.name || item.title || item.version || item.slug);
        },
        loadVersions() {
            getEvents({ pageIndex: 1, pageSize: 100 }).then((res) => {
                this.versions = res.data.data.list || [];
            });
        },
        changeVersion(id) {
            if (String(id) === String(this.id)) return;
            this.$router.push({
                name: this.$route.name,
                params: { ...this.$route.params, id },
                // Boss、服务器等筛选参数不跨版本继承。
                query: {},
            });
        },
    },
    mounted: function () {
        if (this.isAppMode) this.loadVersions();
    },
    components: {
        "race-tab": tabs,
        QrcodeVue,
        AppSelectDrawer,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_header.less";
</style>
