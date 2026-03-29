<template>
    <div class="m-index" :class="`m-${key}`">
        <!-- kv -->
        <div class="m-section m-section-1">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
            <img :src="`${imgPath}yxsy.png`" class="u-yxsy" />
        </div>
        <!-- 黑市寻影 -->
        <div class="m-section m-section-2">
            <img :src="`${imgPath}title/title1.png`" class="u-title" />
            <div class="m-container">
                <el-carousel ref="carousel" :interval="3000" indicator-position="none" arrow="always" height="546px">
                    <el-carousel-item v-for="item in carouselList1" :key="item">
                        <div class="u-item-content">
                            <img :src="`${imgPath}${item}`" class="u-img" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 厄境余息 -->
        <div class="m-section m-section-3">
            <img :src="`${imgPath}title/title2.png`" class="u-title" />
            <div class="m-container">
                <el-carousel ref="carousel" :interval="3000" indicator-position="none" arrow="always" height="900px">
                    <el-carousel-item v-for="(item, i) in carouselList2" :key="item">
                        <div :class="`u-item-content u-item-content-${i + 1}`">
                            <h2>{{ item.title }}</h2>
                            <img :src="`${imgPath}${item.img}`" class="u-img" />
                            <img :src="`${imgPath}${item.img2}`" class="u-img2" v-if="item.img2" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="m-section m-section-4">
            <img :src="`${imgPath}title/title3.png`" class="u-title" />
        </div>
        <div class="m-section m-section-5">
            <img :src="`${imgPath}title/title4.png`" class="u-title" />
        </div>
        <div class="m-section m-section-6">
            <img :src="`${imgPath}title/title5.png`" class="u-title" />
            <div class="m-box">
                <div class="u-card" v-for="i in 3" :key="i" @mouseenter="activeIndex = i" @mouseleave="activeIndex = 0">
                    <img
                        :src="`${imgPath}0${i}-hover.png`"
                        :class="`u-img-hover ${activeIndex === i ? 'active' : ''}`"
                    />
                    <img :src="`${imgPath}0${i}.png`" :class="`u-img ${activeIndex === i ? 'active' : ''}`" />
                </div>
            </div>
        </div>
        <div class="m-section m-section-7">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
        </div>
    </div>
</template>

<script>
const KEY = "yixueshangyang";
import { getTopic } from "@/service/topic";
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    components: {},
    data: function () {
        return {
            imgPath: __cdn + "design/topic/" + KEY + "/",
            key: KEY,
            activeIndex: 0,
            carouselList1: ["h-1.png", "h-3.png"],
            carouselList2: [
                { img: "e-1.png", img2: "shangui.png", title: "剧情篇" },
                { img: "e-2.png", title: "玩法篇" },
                { img: "e-3.png", img2: "xuanjing.png", title: "奖励篇" },
            ],
            shakeTimer: null,
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
        st() {
            return this.activity[4];
        },
    },

    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                // this.video = this.data.index_video[0]["link"];
                // this.pve = this.data.index_pve;
            });
        },
        startArrowShake() {
            let count = 0;
            this.shakeTimer = setInterval(() => {
                const left = document.querySelector(".el-carousel__arrow--left");
                const right = document.querySelector(".el-carousel__arrow--right");
                if (!left || !right) return;

                const pos = count % 2 === 0 ? "8px" : "0px";
                left.style.cssText = `
      left: 20px !important;
      transform: translateY(-50%) rotate(180deg) translateX(-${pos}) !important;
    `;
                right.style.cssText = `
      right: 20px !important;
      transform: translateY(-50%) translateX(-${pos}) !important;
    `;
                count++;
            }, 300);
        },
    },
    mounted() {
        this.init();
        setTimeout(() => {
            this.startArrowShake();
        }, 500);
    },
    beforeUnmount() {
        clearInterval(this.shakeTimer);
    },
};
</script>
<style lang="less" scoped>
/deep/ .el-carousel__arrow {
    background: transparent !important;
    background-color: transparent !important;
    font-size: 0 !important;
    border: none !important;
    outline: none !important;
    border-radius: 0 !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
    opacity: 1 !important;
    z-index: 999 !important;
    top: 50% !important;
}
/deep/ .el-carousel__arrow--left {
    transform: translateY(-50%) rotate(180deg) !important;
    background-image: url("@{kv_yixueshangyang}arrow.png") !important;
}

/deep/ .el-carousel__arrow--right {
    transform: translateY(-50%) !important;
    background-image: url("@{kv_yixueshangyang}arrow.png") !important;
}

.m-section {
    /deep/ .el-carousel__arrow {
        width: 79px !important;
        height: 58px !important;
    }
    /deep/ .el-carousel__arrow--left {
        left: 20px !important;
    }

    /deep/ .el-carousel__arrow--right {
        right: 20px !important;
    }
    &-3 {
        /deep/ .el-carousel__arrow {
            width: 40px !important;
            height: 29px !important;
        }
        /deep/ .el-carousel__arrow--left {
            left: 50% !important;
            top: 90px !important;
            margin: 0 0 0 -200px !important;
        }

        /deep/ .el-carousel__arrow--right {
            right: 50% !important;
            top: 90px !important;
            margin: 0 -200px 0 0 !important;
        }
    }
}
</style>
<style lang="less">
@import "~@/assets/css/topic/yixueshangyang/index.less";
</style>
