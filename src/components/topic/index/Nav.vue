<template>
    <div class="m-topic-nav" :class="`${new_topic}-box`">
        <div class="m-left">
            <img class="m-bg p-animations" :class="animation ? 'fadeInHalf' : ''" :src="boxBG" :alt="new_topic" />
            <!-- <div class="m-bg  p-animations" :class="animation ? 'fadeInHalf' : ''" :style="`background-image:url(${boxBG})`"></div> -->
            <img class="m-logo p-animations" :class="[animation ? 'fadeInLeft' : '', screenWidth < 1600 ? 'small' : '']" :src="logoImg" :alt="new_topic" srcset="" />
        </div>

        <div class="m-tabs">
            <img class="m-people p-animations" :class="[animation ? 'fadeInRight' : '', new_topic]" :src="peopleImg" alt="人物" />
            <div class="u-tab">
                <span :class="[item.key == key ? 'active' : '', screenWidth < 1600 ? 'small' : '']" v-for="(item, index) in tabs" :key="index" @click="changeTabs(index)">{{ item.name }}</span>
            </div>
            <div class="u-tabBox">
                <div class="u-box" :class="item.client == key?'u-show':'u-hide'" v-for="(item, index) in topic" :key="index">
                    <a :href="toTopic(img)" target="_blank" class="u-link" v-for="img in item.server" :key="img" :style="imgStyle(img)" @mouseenter="enter(img)"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { new_topic, std_topic, origin_topic } from "@/assets/data/topic/topic.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "demo",
    data: function () {
        return {
            new_topic,
            std_topic,
            origin_topic,

            key: "all",
            animation: true,
            screenWidth: document.body.clientWidth,
            showing: false,
        };
    },
    computed: {
        tabs() {
            return [
                { key: "all", name: "全部", topic: this.new_topic },
                { key: "std", name: "重制", topic: this.std_topic[0].name },
                { key: "origin", name: "缘起", topic: this.origin_topic[0].name },
            ];
        },
        topic() {
            let std_server = this.std_topic.map((item) => item.name);
            let origin_server = this.origin_topic.map((item) => item.name);
            let all_server = [...this.std_topic, ...this.origin_topic]
                .sort((a, b) => b.id - a.id)
                .map((item) => item.name);
            return [
                { client: "all", server: all_server },
                { client: "std", server: std_server },
                { client: "origin", server: origin_server },
            ];
        },
        boxBG: function () {
            return __imgPath + "topic/nav/" + this.new_topic + "_bg.jpg";
        },
        logoImg: function () {
            return __imgPath + "topic/nav/" + this.new_topic + "_logo.png";
        },
        peopleImg: function () {
            return __imgPath + "topic/nav/" + this.new_topic + "_people.png";
        },
    },

    methods: {
        // 切换tabs
        changeTabs(index) {
            this.new_topic = this.tabs[index].topic;
            this.key = this.tabs[index].key;
            this.showAnimation();
        },
        imgStyle(img) {
            return this.screenWidth < 1600
                ? {
                      backgroundImage: "url(" + __imgPath + "topic/nav/" + img + "_smalltab.jpg)",
                  }
                : {
                      backgroundImage: "url(" + __imgPath + "topic/nav/" + img + "_bigtab.jpg)",
                  };
        },
        // 跳转
        toTopic(key) {
            let prefix = process.env.NODE_ENV == "development" ? "/" : "/topic/";
            return prefix + key;
        },
        // 动画效果
        showAnimation() {
            this.animation = false;
            setTimeout(() => {
                this.animation = true;
            }, 10);
        },
        // 鼠标移入
        enter(img) {
            if (this.new_topic !== img) {
                this.new_topic = img;
                this.showAnimation();
            }
        },
    },
    watch: {
        screenWidth: {
            handler: function (val) {
                this.screenWidth = val;
            },
            immediate: true,
        },
    },
    created: function () {},
    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        };
    },
};
</script>
<style lang="less">
    @import "~@/assets/css/index/nav.less";
</style>
