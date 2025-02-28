<template>
    <div class="m-index">
        <div class="m-top"><img class="u-kv p-animations fadeInDown" :src="`${imgPath}/kv.jpg`" /></div>
        <div class="m-excessive">
            <img class="u-img" :src="`${imgPath}/excessive1-l.png`" />
            <img class="u-img" :src="`${imgPath}/excessive1-r.png`" />
            <div class="u-img-line"><img :src="`${imgPath}/excessive-line.png`" /></div>
        </div>
        <!-- 多图切换区 -->
        <div class="m-two">
            <div class="u-switch">
                <div
                    class="u-round"
                    v-for="item in 4"
                    :key="item"
                    :class="{ solid: active === item - 1 }"
                    @click="setActiveImg(item - 1)"
                ></div>
            </div>

            <el-carousel ref="imgCarousel" height="1073px" autoplay direction="vertical" @change="imgChange">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img :src="`${imgPath}/${item}.jpg`" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 分割2 -->
        <div class="m-excessive2">
            <img class="u-img" :src="`${imgPath}/excessive2.png`" />
        </div>
        <!-- 5分区框图 -->
        <div class="m-three">
            <div class="u-main-box">
                <div class="u-video" v-html="video"></div>
            </div>
            <div class="u-five-box">
                <div
                    v-for="(item, index) in videoList"
                    :key="index"
                    @click="chooseImage(index)"
                    class="u-item-box"
                    :class="boxActive === index ? 'u-item-box-active' : ''"
                >
                    <img class="u-img" :src="item.img" />
                </div>
                <div class="u-item-box" @click="getMoreVideos">
                    <img class="u-img" :src="`${imgPath}/five-6.png`" />
                </div>
            </div>
        </div>
        <!-- 分割3 -->
        <div class="m-excessive3">
            <img class="u-img" :src="`${imgPath}/excessive3.png`" />
        </div>
        <!-- 攻略 -->
        <div class="m-four">
            <img :src="`${imgPath}/qrcode_index_box.png`" alt />
        </div>
    </div>
</template>

<script>
const KEY = "wujie";
import { getTopic } from "@/service/topic";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "Index",
    components: {},
    data: function () {
        return {
            imgPath: __imgPath + "topic/" + KEY,
            active: 0,
            timer: null,
            videoList: [],
            video: "",
            boxActive: 0,
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
        data: function () {
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
    watch: {},
    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.videoList = this.data.video;
                this.chooseImage(0);
            });
        },
        hanldMask(event) {
            let x = -event.clientX / 150;
            let y = -event.clientY / 150;
            if (this.$refs.mark) {
                this.$refs.mark.style.backgroundPositionX = x + "px";
                this.$refs.mark.style.backgroundPositionY = y + "px";
            }
        },
        imgChange(index) {
            this.active = index;
        },
        setActiveImg(index) {
            this.$refs.imgCarousel.setActiveItem(index);
        },

        chooseImage(index) {
            this.boxActive = index;
            this.video = this.videoList[index].link;
        },
        getMoreVideos() {
            window.open("https://space.bilibili.com/2066064028");
        },
    },
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/wujie/index.less";
</style>
