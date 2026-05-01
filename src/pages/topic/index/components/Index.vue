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
                <div
                    class="m-scroll"
                    ref="scrollRef"
                    @mousedown="onDragStart"
                    @mousemove="onDragMove"
                    @mouseup="onDragEnd"
                    @mouseleave="onDragEnd"
                    @wheel.prevent="onWheelScroll"
                >
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
import topicData from "@/assets/data/topic/topic.json";
const { std, origin } = topicData;
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";
const { __cdn } = jx3boxData;
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
            isDragging: false,
            dragStartX: 0,
            dragScrollLeft: 0,
            snapTimer: null,
        };
    },
    computed: {
        list() {
            let stdarr = JSON.parse(JSON.stringify(std)).reverse();
            let _list = this.client == "std" ? stdarr : origin;
            return _list;
        },
    },
    beforeUnmount() {
        clearTimeout(this.snapTimer);
    },
    watch: {},
    methods: {
        goStd() {
            this.client = "std";
            setTimeout(() => {
                this.listShow = "show fadeIn";
                this.$nextTick(() => {
                    this.scrollToClientStart();
                });
            }, 500);
        },
        goOrign() {
            this.client = "origin";
            setTimeout(() => {
                this.listShow = "show fadeIn";
                this.$nextTick(() => {
                    this.scrollToClientStart();
                });
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
                this.$nextTick(() => {
                    this.scrollToClientStart();
                });
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
            return __cdn + "design/topic/index/" + key + ".png";
        },
        scrollToClientStart(behavior = "auto") {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            const maxScrollLeft = scrollRef.scrollWidth - scrollRef.clientWidth;
            const left = this.client == "std" ? maxScrollLeft : 0;

            scrollRef.scrollTo({
                left,
                top: 0,
                behavior,
            });
        },
        onDragStart(e) {
            this.isDragging = true;
            this.dragStartX = e.pageX;
            this.dragScrollLeft = this.$refs.scrollRef.scrollLeft;
        },
        onDragMove(e) {
            if (!this.isDragging) return;
            e.preventDefault();
            const dx = e.pageX - this.dragStartX;
            this.$refs.scrollRef.scrollLeft = this.dragScrollLeft - dx;
            this.scheduleSnap();
        },
        onDragEnd() {
            this.isDragging = false;
            this.scheduleSnap(0);
        },
        onWheelScroll(e) {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            const delta =
                Math.abs(e.deltaX) > Math.abs(e.deltaY)
                    ? e.deltaX
                    : e.shiftKey
                      ? e.deltaY
                      : 0;

            if (!delta) return;

            scrollRef.scrollLeft += delta;
            this.scheduleSnap();
        },
        scheduleSnap(delay = 120) {
            clearTimeout(this.snapTimer);
            this.snapTimer = setTimeout(() => {
                this.snapToNearestItem();
            }, delay);
        },
        snapToNearestItem() {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            const items = Array.from(scrollRef.querySelectorAll(".u-item"));
            if (!items.length) return;

            const currentLeft = scrollRef.scrollLeft;
            const firstItemLeft = items[0].offsetLeft;
            const maxScrollLeft = scrollRef.scrollWidth - scrollRef.clientWidth;

            if (currentLeft <= firstItemLeft / 2) {
                scrollRef.scrollTo({
                    left: 0,
                    behavior: "smooth",
                });
                return;
            }

            if (currentLeft >= maxScrollLeft - firstItemLeft / 2) {
                scrollRef.scrollTo({
                    left: maxScrollLeft,
                    behavior: "smooth",
                });
                return;
            }

            const target = items.reduce((nearest, item) => {
                const distance = Math.abs(item.offsetLeft - currentLeft);
                if (!nearest || distance < nearest.distance) {
                    return {
                        distance,
                        left: item.offsetLeft,
                    };
                }
                return nearest;
            }, null);

            if (!target) return;

            scrollRef.scrollTo({
                left: target.left,
                behavior: "smooth",
            });
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/topic/common/animation.less";
@import "~@/assets/css/topic/index/navigation.less";
</style>
