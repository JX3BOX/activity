<template>
    <div class="m-navigation">
        <!-- 第一屏 -->
        <div class="m-first p-animation">
            <div class="u-bg-line p-animation" :class="logoAnimation"></div>
            <div class="u-navigation">
                <span class="u-button u-std p-animation" :class="stdAnimation" @click="goList('std')"></span>
                <span class="u-logo p-animation" :class="logoAnimation"></span>
                <span class="u-button u-origin p-animation" :class="originAnimation" @click="goList('origin')"></span>
            </div>
        </div>
        <!-- 点击后显示第二屏 -->
        <div class="m-list p-animation" :class="[listShow, client]">
            <div class="m-content p-animation" :class="client == 'std' ? 'fadeInLeft' : 'fadeInRight'">
                <div class="u-client-phone" @click="goFirst"></div>
                <div class="u-list-client" v-if="client == 'origin'">
                    <span class="u-button u-std" @click="goStd"></span>
                </div>
                <div class="m-scroll" v-dragscroll ref="scrollRef">
                    <div
                        class="u-item p-animations3"
                        v-for="(item, i) in list"
                        :key="i"
                        :class="client == 'std' ? 'fadeInLeft' : 'fadeInRight'"
                    >
                        <div class="u-list">
                            <a :href="item.link" target="_blank" class="u-link">
                                <img class="u-img" :src="showImg(item.key)" :class="item.link ? 'u-hover' : ''" />
                            </a>
                            <img src="@/assets/img/topic/home/circle.png" style="margin-top: 30px" />
                            <span class="u-title">{{ item.name || "未知" }}</span>
                            <div class="u-time">
                                {{ item.time }}
                            </div>
                        </div>
                        <div class="u-line"></div>
                    </div>
                </div>
                <div class="u-list-client" v-if="client == 'std'">
                    <span class="u-button u-origin" @click="goOrign"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { std, origin } from "@/assets/data/topic/topic.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Index",
    data: function () {
        return {
            loading: false,
            stdAnimation: "",
            logoAnimation: "",
            originAnimation: "",
            firstAnimation: "",
            listShow: "",
            client: "",
        };
    },
    computed: {
        list() {
            let stdarr = JSON.parse(JSON.stringify(std)).reverse();
            let _list = this.client == "std" ? stdarr : origin;
            return _list;
        },
    },
    watch: {},
    methods: {
        goStd() {
            this.client = "std";
            setTimeout(() => {
                this.listShow = "show fadeIn";
                this.$nextTick(() => {
                    this.$refs.scrollRef.scrollTo(this.$refs.scrollRef.clientWidth, 0);
                });
            }, 500);
        },
        goOrign() {
            this.client = "origin";
            setTimeout(() => {
                this.listShow = "show fadeIn";
            }, 500);
        },
        goList(type) {
            if (type == "std") {
                this.stdAnimation = "fadeOutLeft";
                this.logoAnimation = "fadeOut";
                this.originAnimation = "fadeOut";
                this.client = "std";
            } else {
                this.stdAnimation = "fadeOut";
                this.logoAnimation = "fadeOut";
                this.originAnimation = "fadeOutRight";
                this.client = "origin";
            }
            setTimeout(() => {
                this.listShow = "show fadeIn";
                if (this.client == "std") {
                    this.$nextTick(() => {
                        this.$refs.scrollRef.scrollTo(this.$refs.scrollRef.clientWidth, 0);
                    });
                }
            }, 500);
        },
        goFirst() {
            this.listShow = "fadeOut";
            setTimeout(() => {
                if (this.client == "std") {
                    this.stdAnimation = "fadeIn";
                    this.logoAnimation = "fadeIn";
                    this.originAnimation = "fadeIn";
                } else {
                    this.stdAnimation = "fadeIn";
                    this.logoAnimation = "fadeIn";
                    this.originAnimation = "fadeIn";
                }
            }, 200);
        },
        showImg(key) {
            if (!key) key = "normal";
            return __imgPath + "topic/index/" + key + ".png";
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/topic/common/animation.less";
@import "~@/assets/css/topic/index/navigation.less";
</style>
