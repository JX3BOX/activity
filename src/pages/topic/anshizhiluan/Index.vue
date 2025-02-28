<template>
    <div class="m-index">
        <div class="m-top">
            <video class="m-mp4" playsinline="" autoplay="" muted="" loop="" :poster="pic.top">
                <source src="./top.mp4" type="video/mp4" />
            </video>
            <img class="logo p-animation" v-animate="'bounceIn'" :src="pic.logo" />
            <span class="m-mark"></span>
        </div>

        <div class="m-content">
            <div class="m-introduction p-animations" v-animate="'slideInDown'">
                <img class="img" :src="pic.introduction" />
            </div>
            <!-- 全新副本 -->
            <div class="m-one">
                <h2 class="p-animation" v-animate="'fadeInDown'"><img :src="title[1]" /></h2>
                <div class="m-box p-animations" v-animate="'fadeInUp'">
                    <a
                        :class="['u-item', `u-item-${item.id}`]"
                        :href="item.link"
                        target="_blank"
                        v-for="item in fb"
                        :key="item.id"
                    >
                        <img :src="item.img" class="u-img1" />
                        <img :src="item.desc" class="u-img2" />
                    </a>
                    <span class="u-mark"></span>
                </div>
                <div class="m-txt p-animation" v-animate="'bounceIn'">
                    <img :src="pic.txt" />
                </div>
            </div>
            <!-- 五大场景 -->
            <div class="m-two">
                <h2 class="p-animation" v-animate="'fadeInDown'"><img :src="title[2]" /></h2>
                <div class="m-box p-animation" v-animate="'fadeInUp'">
                    <img :src="pic.left" class="u-img u-left" />
                    <img :src="pic.right" class="u-img u-right" />
                    <el-carousel class="u-carousel" type="card" trigger="click" height="400px" :autoplay="false">
                        <el-carousel-item v-for="item in slider" :key="item.id" class="u-item">
                            <img :src="item.img" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!-- 全新门派 -->
            <div class="m-three">
                <h2 class="p-animation" v-animate="'fadeInDown'"><img :src="title[3]" /></h2>
                <div class="m-box p-animation" v-animate="'fadeInUp'">
                    <div class="m-sect">
                        <a
                            :class="['u-item', `u-item-${index}`]"
                            :href="item.link"
                            target="_blank"
                            v-for="(item, index) in data.sect"
                            :key="item.id"
                        >
                            <img :src="item.img" />
                        </a>
                    </div>
                </div>
            </div>
            <!-- 两大玩法 -->
            <div class="m-four">
                <h2 class="p-animation" v-animate="'fadeInDown'"><img :src="title[4]" /></h2>
                <div class="m-box p-animation" v-animate="'fadeInUp'">
                    <a
                        :href="item.link"
                        target="_blank"
                        :class="['u-item', `u-item-${index}`]"
                        v-for="(item, index) in play"
                        :key="item.id"
                    ></a>
                </div>
            </div>
            <!-- 更多资讯 -->
            <div class="m-five">
                <h2 class="p-animation" v-animate="'fadeInDown'"><img :src="title[5]" /></h2>
                <div class="m-box p-animation" v-animate="'fadeInUp'">
                    <a
                        :class="['u-item', `u-item-${index}`]"
                        :href="item.link"
                        target="_blank"
                        v-for="(item, index) in info"
                        :key="item.id"
                    >
                        <img :src="item.img" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "anshizhiluan";
import { getTopic } from "@/service/topic";
import { keyBy, sortBy } from "lodash";

export default {
    name: "Index",
    data: function () {
        return {
            raw: [],
            pic: {},
            title: {},
            play: {},
            fb: [],
            slider: [],
            info: [],
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
    computed: {
        data: function (val) {
            let _data = {};
            this.raw.forEach((item) => {
                if (!_data[item.subtype]) {
                    _data[item.subtype] = [];
                }
                _data[item.subtype].push(item);
            });
            return _data;
        },
    },
    methods: {
        init() {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.pic = this.changePic(this.data.pic, "desc");
                this.title = this.changePic(this.data.title, "desc");
                this.play =sortBy(this.data.play, (o) => o.id);
                this.slider = this.data.slider;
                this.fb = sortBy(this.data.fb, (o) => o.id);
                this.info = sortBy(this.data.info, (o) => o.id);

                console.log(this.info);
            });
        },
        changePic(arr, key) {
            const obj = keyBy(arr, key);
            for (const key in obj) {
                obj[key] = obj[key].img;
            }
            return obj;
        },
        change(a) {
            console.log(a);
        },
    },
    mounted: function () {
        this.init();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/anshizhiluan/index.less";
</style>
