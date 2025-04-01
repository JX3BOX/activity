<template>
    <div class="m-index">
        <!-- logo -->
        <div class="m-logo p-animation" v-animate="'fadeInLeft'">
            <img :src="imgurl + '0/logo1.png'" width="100%" />
        </div>
        <div class="m-top-banner p-animation" v-animate="'fadeInDown'">
            <img :src="imgurl + '0/FHLY.png'" width="100%" />
        </div>
        <!-- 新地图 -->
        <div class="m-map">
            <div class="u-title">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '1/no1.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text text1 p-animation" :src="imgurl + '1/bt1.png'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <div class="m-two">
                <div class="m-box p-animation">
                    <div class="u-img u-left" @click="handleclick(true)"></div>
                    <div class="u-img u-right" @click="handleclick(false)"></div>
                    <el-carousel
                        class="u-carousel"
                        type="card"
                        trigger="click"
                        height="477px"
                        :autoplay="false"
                        arrow="never"
                        ref="carousel"
                    >
                        <el-carousel-item v-for="item in 3" :key="item" class="u-item">
                            <img :src="`${imgurl}1/ty${item}.png`" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
        <!-- 全新首领 -->
        <div class="m-new-boss">
            <div class="u-title" style="margin-top: 250px">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '2/no2.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text p-animation" :src="imgurl + '2/bt2.png'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <div class="card">
                <img class="man" :src="imgurl + '2/jm-2.png'" alt="" />
                <img class="boss-name" :src="imgurl + '2/jm-3.png'" alt="" />
                <div class="content">GUIXUZHILI</div>
                <img class="content-image" :src="imgurl + '2/jm-4.png'" alt="" />
                <img class="link-image" :src="imgurl + '2/anniu2.png'" alt="" @click="goto('https://origin.jx3box.com/fb/')"/>
            </div>
        </div>
        <!-- 全新秘境 -->
        <div class="m-new-secret">
            <div class="u-title" style="margin-top: 360px; margin-bottom: 38px">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '3/no3.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text p-animation" :src="imgurl + '3/bt3.png?1'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <img
                class="yeshougucheng p-animation"
                :src="imgurl + '3/yeshougucheng.png'"
                alt=""
                v-animate="'fadeInUp'"
            />
            <div class="wenzi" v-animate="'text-visible'">
                <div>
                    <img :src="imgurl + '3/wenzi.png'" alt="" />
                </div>
            </div>
            <img class="jiantou" :src="imgurl + '3/jiantou.png?1'" alt="" />
            <div class="boss">
                <img class="boss-image p-animation" :src="imgurl + '3/mj-2.png'" alt="" v-animate="'fadeInUp'" />
                <div class="detail-contianer">
                    <div v-animate="'active'">
                        <div
                            :class="{ detail: true, isActive: active_boss === index, isCancle: cancle_boss === index }"
                            v-for="index in 5"
                            :key="index"
                            :style="`display:${
                                active_boss === index || (index === 1 && active_boss === null) ? 'block' : 'none'
                            }`"
                        >
                            <img class="boss-name" :src="imgurl + `3/bs${index}-1.png`" alt="" />
                            <img class="boss-image" :src="imgurl + `3/bs${index}.png`" alt="" />
                        </div>
                    </div>
                    <div
                        :class="`boss-avatar item-${index}`"
                        v-for="index in 5"
                        :key="index + 'boss'"
                        @click="bossclick(index)"
                    >
                        <img class="boss-avatar-circle" :src="imgurl + `3/boss0.png`" alt="" />
                        <img class="boss-avatar-image" :src="imgurl + `3/boss${index}.png`" alt="" />
                    </div>
                </div>
            </div>
            <img :src="imgurl + '3/fenge.svg'" alt="" />
        </div>
        <!-- 全新功能 -->
        <div class="m-new-function">
            <div class="u-title" style="margin-top: 260px; margin-bottom: 180px">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '4/no4.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text p-animation" :src="imgurl + '4/bt4.png'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <div class="content-divide p-animation" v-animate="'fadeInRight'">
                <img class="family" :src="imgurl + '4/tixing-2.png'" />
                <img class="divide" :src="imgurl + '4/fenge2.svg'" />
            </div>
            <img class="body-image" :src="imgurl + '4/tixing1.png'" alt="" v-animate="'body-image-active'" />
            <img class="link-image" :src="imgurl + '4/anniu3.png'" alt="" @click="goto('https://weibo.com/7572025559/5145877669218702')"/>
        </div>
        <!-- 全新系统 -->
        <div class="m-new-systeam">
            <div class="u-title" style="margin-top: 65px">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '5/no5.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text p-animation" :src="imgurl + '5/bt5.png'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <div class="assisdent">
                <div class="p-animation" v-animate="'fadeInLeft'">
                    <img class="hongchenxiaying p-animation" :src="imgurl + '5/hongchenxiaying.png'" alt="" />
                    <img class="wenzi1" :src="imgurl + '5/wenzi1.png?1'" alt="" />
                </div>
                <div class="detail-contianer">
                    <div class="p-animation" v-animate="'fadeInRight'">
                        <div
                            :class="{
                                detail: true,
                                isActive: active_assistant === index,
                                isCancle: cancle_assistant === index,
                            }"
                            v-for="index in 6"
                            :key="index + 'assisdent'"
                            :style="`display:${active_assistant === index ? 'block' : 'none'}`"
                        >
                            <img class="assistant-image" :src="imgurl + `5/xk${index}.png`" alt="" />
                        </div>
                    </div>

                    <div
                        :class="`assistant-avatar item-${index}`"
                        v-for="index in 6"
                        :key="index"
                        @click="assistantClick(index)"
                        v-animate="'active'"
                    >
                        <img class="assistant-avatar-circle" :src="imgurl + `5/xk00.png`" alt="" />
                        <img class="assistant-avatar-image" :src="imgurl + `5/xk${index}-1.png`" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 更多精彩 -->
        <div class="m-more">
            <div class="u-title" style="margin-top: 360px; margin-bottom: 60px">
                <div class="icon" v-animate="'flow'">
                    <img :src="imgurl + '6/no6.png'" />
                </div>
                <div class="content">
                    <img class="bg p-animation" :src="imgurl + '0/biaotilan.png'" v-animate="'fadeInLeft'" />
                    <img class="text p-animation" :src="imgurl + '6/bt6.png'" v-animate="'fadeInRight'" />
                </div>
            </div>
            <div class="u-footer">
                <div class="waitu" v-animate="'active'">等你探索</div>
                <img :src="imgurl + '6/logo2.png'" class="logo" />
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "fenghuoliaoyuan";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgurl: "https://cdn.jx3box.com/design/topic/fenghuoliaoyuan/",
            active_boss: null,
            cancle_boss: null,
            active_assistant: 1,
            cancle_assistant: null,
        };
    },
    directives: {
        animate: {
            inserted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (el.className.indexOf(binding.value) == -1) {
                            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
                            el.className = binding.value + " " + el.className;
                        }
                        if (binding.addClass) {
                            window.removeEventListener("scroll", binding.addClass);
                        }
                    }
                };
                window.addEventListener("scroll", binding.addClass, true);
                binding.addClass();
            },
            unbind: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {},
    watch: {},
    methods: {
        handleclick(boolen) {
            if (boolen) {
                this.$refs.carousel.prev();
            } else {
                this.$refs.carousel.next();
            }
        },
        bossclick(index) {
            if (this.active_boss === index || (this.active_boss === null && index === 1)) return;
            this.cancle_boss = this.active_boss || 1;
            setTimeout(() => {
                this.active_boss = index;
                this.cancle_boss = null;
            }, 500);
        },
        assistantClick(index) {
            if (this.active_assistant === index) return;
            this.cancle_assistant = this.active_assistant;
            setTimeout(() => {
                this.active_assistant = index;
                this.cancle_assistant = null;
            }, 500);
        },
        goto(url) {
            window.open(url);
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/topic/fenghuoliaoyuan/index.less";
</style>
