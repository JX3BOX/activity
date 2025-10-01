<template>
    <div class="m-index">
        <div class="m-bashufengyun" ref="fullPage" :style="height" v-if="!mobile">
            <div
                class="fullPageContainer"
                ref="fullPageContainer"
                @mousewheel="mouseWheelHandle"
                @DOMMouseScroll="mouseWheelHandle"
            >
                <el-carousel
                    class="fullPageContainer"
                    direction="vertical"
                    trigger="click"
                    :autoplay="false"
                    :height="carousel"
                    ref="carousel"
                >
                    <el-carousel-item v-for="(item, i) in moduleList" :key="item" :name="i + ''">
                        <component :is="item" :moduleData="moduleData" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="m-mobile" v-else @touchstart="handleTouchstart" @touchend="handleTouchend">
            <component :is="moduleId" :moduleData="moduleData" />
        </div>
    </div>
</template>
<script>
import oneView from "./modules/oneView.vue";
import twoView from "./modules/twoView.vue";
import threeView from "./modules/threeView.vue";
import fourView from "./modules/fourView.vue";
import fiveView from "./modules/fiveView.vue";
import sixView from "./modules/sixView.vue";
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    data() {
        return {
            current: 0,
            isScrolling: false,
            deltaY: 0,
            mobile: false,
            imgLen: {
                2: 3,
                3: 5,
                4: 4,
                5: 6,
            },
            mobileHeight: "",
            startTime: "",
            startX: "",
            startY: "",
            moduleList: ["oneView", "twoView", "threeView", "fourView", "fiveView", "sixView"],
        };
    },
    components: { oneView, twoView, threeView, fourView, fiveView, sixView },
    computed: {
        moduleId() {
            return this.moduleList[this.current];
        },
        moduleData() {
            const height = this.mobile ? this.mobileHeight : this.current == 1 ? "1066px" : "800px";
            return {
                img: this.img,
                height: height,
                index: this.current,
            };
        },
        height() {
            return this.current == 0 ? { height: "1066px" } : { height: "800px" };
        },
        carousel() {
            return this.current == 0 ? "1066px" : "800px";
        },
        img() {
            return __cdn + "design/topic/bashufengyun/";
        },
    },
    methods: {
        background(i) {
            return { backgroundImage: `url(https://img.jx3box.com/topic/bashufengyun/home_0${i}.png)` };
        },
        childBackground(i, k) {
            return { backgroundImage: `url(https://img.jx3box.com/topic/bashufengyun/home_0${i}_0${k}.png)` };
        },
        setActiveItem(i = this.current) {
            this.isScrolling = true;
            setTimeout(() => {
                this.isScrolling = false;
                this.$refs.carousel.setActiveItem(i);
            }, 1500);
        },
        // 往下切换
        next() {
            let len = 6; // 页面的个数
            if (this.current + 1 <= len) {
                this.current += 1;
                this.setActiveItem();
            }
        },
        // 往上切换
        pre() {
            if (this.current - 1 > 0) {
                this.current -= 1;
                this.setActiveItem();
            }
        },
        // 控制切换间隔1.5秒
        change() {
            this.isScrolling = true;
            setTimeout(() => {
                this.isScrolling = false;
            }, 1500);
        },
        // 判断上下滚动
        mouseWheelHandle(event) {
            let evt = event || window.event;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.returnValue = false;
            }
            if (this.isScrolling) return false;
            let e = event.originalEvent || event;
            this.deltaY = e.deltaY || e.detail;
            if (this.deltaY > 0) {
                this.next();
            } else if (this.deltaY < 0) {
                this.pre();
            }
        },
        //屏幕滑动
        //手指按下屏幕
        handleTouchstart(event) {
            this.startTime = Date.now();
            this.startX = event.changedTouches[0].clientX;
            this.startY = event.changedTouches[0].clientY;
        },
        //手指离开屏幕
        handleTouchend(event) {
            const endTime = Date.now();
            const endX = event.changedTouches[0].clientX;
            const endY = event.changedTouches[0].clientY;
            //判断按下的时长
            if (endTime - this.startTime > 2000) {
                return;
            }
            //滑动的方向
            let direction = "";
            if (Math.abs(endX - this.startX) > 10) {
                //滑动方向
                if (Math.abs(endY - this.startY) > 200) direction = endX - this.startX > 0 ? "right" : "left";
            } else {
                return;
            }
            if (Math.abs(endY - this.startY) > 8) {
                // Math.abs(endX - this.startX) > 10
                //滑动方向
                if (Math.abs(endX - this.startX) > 200) direction = endY - this.startY > 0 ? "top" : "down";
            } else {
                return;
            }
            console.log(direction);
            //用户做了合法的滑动操作
            if (direction === "top") {
                if (this.current === 1) {
                    this.current += 1;
                    return;
                } else if (this.current === 6) {
                    this.current = 1;
                } else {
                    this.current++;
                }
            }
            if (direction === "down") {
                this.current--;
                if (this.current === 0) {
                    this.current = 6;
                    return;
                }
            }
        },
    },

    mounted() {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        if (width < height) {
            this.mobile = true;
            this.mobileHeight = width + "px";
        }
        document.addEventListener(
            "touchmove",
            function (ev) {
                ev.preventDefault();
            },
            { passive: false }
        );
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/bashufengyun/index.less";
</style>
