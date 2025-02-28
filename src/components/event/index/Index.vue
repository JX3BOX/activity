<template>
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
                    <div class="u-month" v-if="item.month">{{ item.month }}月</div>
                    <div class="u-month" v-else>特殊活动</div>
                    <div class="m-month-list" :class="{
                        isSingle: item.single,
                        isSpecial : !item.month
                    }">
                        <a
                            class="u-item"
                            target="_blank"
                            :href="listItem.link"
                            v-for="(listItem, index) in item.list"
                            :key="index"
                        >
                            <el-image class="u-img" :src="listItem.img" fit="cover"></el-image>
                            <div class="m-name">{{ listItem.name }}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="m-name" v-if="show">{{ name }}</div>
        </div>
        <!-- <div class="m-events-btn" @click="change">
            {{ isNewEvent ? "列表模式" : "卷轴模式" }}
        </div> -->
    </div>
</template>

<script>
import { __imgPath, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import data from "@/assets/data/event/index.json";
export default {
    name: "Index",
    data: function() {
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
        imgLink() {
            return __imgPath + "topic/event/img/";
        },
        newImgLink() {
            return __imgPath + "topic/event/newimg/";
        },
        topImg() {
            return __imgPath + "topic/event/top.png";
        },
        isShort() {
            return this.list.length <= 4;
        },
    },
    mounted() {
        this.load();
        // const isNewEvent = localStorage.getItem("isNewEvent");
        // if (!isNewEvent) {
        //     this.isNewEvent = true;
        // } else {
        //     this.isNewEvent = isNewEvent == "false" ? false : true;
        // }
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
        load() {
            const { list, vertical } = data;
            this.list = list;
            this.monthList = vertical.reduce((acc, item) => {
                const month = acc.find((m) => m.month === item.month);
                if (month) {
                    month.list.push(item);
                    if (item.single) {
                        month.single = true;
                    }
                } else {
                    acc.push({ month: item.month, list: [item], single: item.single });
                }
                return acc;
            }, []);
        },
        change() {
            this.isNewEvent = !this.isNewEvent;
            localStorage.setItem("isNewEvent", this.isNewEvent);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/index.less";
</style>
