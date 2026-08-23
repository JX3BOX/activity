<template>
    <div class="p-event" :class="{ 'v-miniprogram': isMobileContainer }">
        <CommonHeader></CommonHeader>
        <div class="p-event-container">
            <div class="m-navigation">
                <div class="m-dot"></div>
                <div class="m-mark"></div>
                <div class="m-footer">
                    <div class="u-left"></div>
                    <div class="u-right"></div>
                </div>
                <div class="wp">
                    <div class="m-wp-title">
                        <div class="u-wp-bg"></div>
                        <img class="u-wp-img" :src="topImg" />
                    </div>
                    <div class="m-list-scroll" :class="{ isShort }" v-show="!isNewEvent">
                        <a
                            class="u-item"
                            target="_blank"
                            :href="item.link"
                            v-for="(item, i) in list"
                            :key="i"
                            @mouseover="showName(item.name)"
                            @mouseout="hideName"
                        >
                            <span class="u-title">{{ item.name }}</span>
                            <el-image class="u-img" :src="item.img" fit="cover"></el-image>
                            <div class="u-mark"></div>
                        </a>
                    </div>
                    <div class="m-new-list" v-show="isNewEvent">
                        <div class="m-new-list-item" v-for="(item, i) in monthList" :key="i">
                            <div class="u-month">{{ item.title }}</div>
                            <div class="m-month-list" :class="{ 'is-special': item.isSpecial }">
                                <a
                                    class="u-item"
                                    target="_blank"
                                    :href="listItem.link"
                                    v-for="(listItem, index) in item.list"
                                    :key="index"
                                    @click.stop.prevent="onclick(listItem)"
                                >
                                    <el-image class="u-img" :src="listItem.img" fit="cover"></el-image>
                                    <div class="m-name">{{ listItem.name }}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="m-name" v-if="show">{{ name }}</div>
                </div>
            </div>
        </div>
        <CommonFooter class="p-event-footer" darkMode></CommonFooter>
    </div>
</template>

<script>
import { __cdn, __imgPath, __Root } from "@/utils/config";
import { isApp, isMiniProgram } from "@jx3box/jx3box-common/js/utils";
import wx from "weixin-js-sdk";
import dayjs from "dayjs";
import { getPvxEvents } from "@/service/event/event";
export default {
    name: "App",
    data: function () {
        return {
            list: [],
            eventLink: __Root + "event",
            show: false,
            name: "",
            isNewEvent: true,
            monthList: [],
        };
    },
    computed: {
        imgPath() {
            return __cdn + "/design/cover/cover_event";
        },
        topImg() {
            return __imgPath + "topic/event/top.png";
        },
        isShort() {
            return this.list.length <= 4;
        },
        isMobileContainer() {
            return isMiniProgram() || isApp();
        },
    },
    created() {
        isApp() && localStorage.setItem("__env", "app");
    },
    mounted() {
        this.load();
    },
    methods: {
        showName(name) {
            this.show = true;
            this.name = name;
        },
        hideName() {
            this.show = false;
            this.name = "";
        },
        async load() {
            try {
                const res = await getPvxEvents();
                const raw = res && res.data && res.data.data;
                const list = Array.isArray(raw) ? raw : raw && Array.isArray(raw.list) ? raw.list : [];
                const activities = list
                    .filter((item) => item && item.start_time)
                    .map((item) => ({
                        ...item,
                        month: String(dayjs(item.start_time).month() + 1),
                        img: this.resolveCover(item.poster),
                    }))
                    .sort((a, b) => {
                        const sortDiff = this.getSortValue(a.sort) - this.getSortValue(b.sort);
                        if (sortDiff !== 0) return sortDiff;
                        return dayjs(a.start_time).valueOf() - dayjs(b.start_time).valueOf();
                    });

                this.list = activities;
                this.monthList = this.groupActivities(activities);
            } catch (e) {
                this.list = [];
                this.monthList = [];
            }
        },
        getSortValue(value) {
            const num = Number(value);
            return Number.isFinite(num) ? num : 9999;
        },
        groupActivities(activities) {
            const special = [];
            const groups = new Map();

            activities.forEach((item) => {
                if (["special", "sepcial"].includes(String(item.type).toLowerCase())) {
                    special.push(item);
                    return;
                }

                const title = item.group || "其他活动";
                if (!groups.has(title)) groups.set(title, []);
                groups.get(title).push(item);
            });

            const result = special.length ? [{ title: "特殊活动", list: special, isSpecial: true }] : [];
            groups.forEach((list, title) => result.push({ title, list }));
            return result;
        },
        resolveCover(cover) {
            if (!cover) return "";
            if (/^https?:\/\//i.test(cover)) return cover.replace(/^http:/i, "https:");
            return `${__cdn}${String(cover).replace(/^\//, "")}`;
        },
        change() {
            this.isNewEvent = !this.isNewEvent;
            localStorage.setItem("isNewEvent", this.isNewEvent);
        },
        onclick(item) {
            if (item.mini_path) {
                if (isMiniProgram()) {
                    wx.miniProgram.navigateTo({
                        url: item.mini_path,
                    });
                } else {
                    window.open(item.link, "_blank");
                }
                return;
            }
            window.open(item.link, "_blank");
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/app.less";
@import "~@/assets/css/event/index.less";
</style>
