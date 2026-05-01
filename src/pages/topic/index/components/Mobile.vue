<template>
    <div class="p-topic-container">
        <div class="m-navigation">
            <div class="m-list show" :class="client">
                <div class="m-content p-animation" :class="client === 'std' ? 'fadeInLeft' : 'fadeInRight'">
                    <div
                        class="m-scroll"
                        ref="scrollRef"
                        @mousedown="onDragStart"
                        @mousemove="onDragMove"
                        @mouseup="onDragEnd"
                        @mouseleave="onDragEnd"
                        @touchstart="onDragStart"
                        @touchmove="onDragMove"
                        @touchend="onDragEnd"
                        @touchcancel="onDragEnd"
                    >
                        <div
                            class="u-item p-animations3"
                            v-for="(item, i) in list"
                            :key="i"
                            :class="client === 'std' ? 'fadeInLeft' : 'fadeInRight'"
                        >
                            <div class="u-list">
                                <a :href="item.link" target="_blank" class="u-link" @click="onLinkClick">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topicData from "@/assets/data/topic/topic.json";
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";

const { std, origin } = topicData;
const { __cdn } = jx3boxData;

function resolveClientFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash || "";
    const hashQuery = hash.includes("?") ? hash.slice(hash.indexOf("?")) : "";
    const hashParams = new URLSearchParams(hashQuery);
    const pick = (key) => searchParams.get(key) || hashParams.get(key);
    const value = [pick("client"), pick("type"), pick("server"), pick("tab"), pick("list")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    if (value.includes("origin")) return "origin";
    if (value.includes("std")) return "std";
    if (searchParams.has("origin") || hashParams.has("origin") || location.href.includes("origin")) return "origin";
    return "std";
}

export default {
    name: "Mobile",
    data() {
        return {
            currentClient: resolveClientFromUrl(),
            isDragging: false,
            hasDragged: false,
            hasInteracted: false,
            dragStartX: 0,
            dragScrollLeft: 0,
        };
    },
    computed: {
        client() {
            return this.currentClient || "std";
        },
        list() {
            const stdList = JSON.parse(JSON.stringify(std)).reverse();
            return this.client === "std" ? stdList : origin;
        },
    },
    created() {
        document.title = this.currentClient === "origin" ? "缘起" : "重制/无界";
    },
    mounted() {
        this.$nextTick(this.resetInitialPosition);
        window.addEventListener("resize", this.onResize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        showImg(key) {
            if (!key) key = "normal";
            return __cdn + "design/topic/index/" + key + ".png";
        },
        scrollToClientStart() {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            const maxScrollLeft = scrollRef.scrollWidth - scrollRef.clientWidth;
            const left = this.client === "std" ? maxScrollLeft : 0;

            scrollRef.scrollTo({
                left,
                top: 0,
                behavior: "auto",
            });
        },
        resetInitialPosition() {
            this.scrollToClientStart();
            requestAnimationFrame(() => {
                this.scrollToClientStart();
            });
            setTimeout(() => {
                if (!this.hasInteracted) this.scrollToClientStart();
            }, 300);
        },
        onResize() {
            if (this.hasInteracted) return;
            this.$nextTick(this.resetInitialPosition);
        },
        getPageX(e) {
            return e.touches?.[0]?.pageX || e.changedTouches?.[0]?.pageX || e.pageX || 0;
        },
        onDragStart(e) {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            this.isDragging = true;
            this.hasDragged = false;
            this.hasInteracted = true;
            this.dragStartX = this.getPageX(e);
            this.dragScrollLeft = scrollRef.scrollLeft;
        },
        onDragMove(e) {
            if (!this.isDragging) return;

            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;

            const dx = this.getPageX(e) - this.dragStartX;
            if (Math.abs(dx) > 3) {
                this.hasDragged = true;
                e.preventDefault();
            }
            scrollRef.scrollLeft = this.dragScrollLeft - dx;
        },
        onDragEnd() {
            this.isDragging = false;
        },
        onLinkClick(e) {
            if (!this.hasDragged) return;

            e.preventDefault();
            this.$nextTick(() => {
                this.hasDragged = false;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/common/animation.less";
@import "~@/assets/css/topic/index/navigation.less";

.p-topic-container_mobile,
.v-miniprogram {
    .p-topic-container {
        margin-top: 0;
        min-height: 100vh;
        overflow: hidden;

        .m-navigation {
            min-height: 100vh;
            height: 100vh;

            .m-list {
                width: 100vw;
                height: 100vh;
                background-position: center center;

                .m-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                    height: 100vh;

                    .u-list-client,
                    .u-client-phone {
                        display: none !important;
                    }

                    .m-scroll {
                        width: 100vw;
                        max-width: 100vw;
                        box-sizing: border-box;
                        padding: 0 2rem!important;
                        overflow-x: auto !important;
                        overflow-y: hidden !important;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        touch-action: pan-x;
                        cursor: grab;
                        user-select: none;
                    }

                    .m-scroll:active {
                        cursor: grabbing;
                    }

                    .m-scroll::-webkit-scrollbar {
                        display: none;
                    }

                    .u-list {
                        padding-bottom: 30px;
                    }
                }
            }
        }
    }
    @media screen and (max-width: @ip5) {
        .p-topic-container {
            .m-navigation {
                .m-list {
                    .m-content {
                        .m-scroll {
                            zoom: 0.9;
                            width: calc(100vw / 0.9);
                            max-width: calc(100vw / 0.9);
                        }
                    }
                }
            }
        }
    }
}

.v-miniprogram{
    .p-topic-container .m-navigation .m-list.std .m-content .m-scroll .u-item:last-child{
        .w(160px);
    }
    .p-topic-container .m-navigation .m-list.origin .m-content .m-scroll .u-item:last-child{
        .w(160px);
    }
}

</style>
