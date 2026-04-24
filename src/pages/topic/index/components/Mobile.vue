<template>
    <div class="p-topic-container">
        <div class="m-navigation">
            <div class="m-list show" :class="client">
                <div class="m-content p-animation" :class="client === 'std' ? 'fadeInLeft' : 'fadeInRight'">
                    <div class="u-list-client" v-if="client === 'origin'">
                        <span class="u-button u-std" @click="goStd"></span>
                    </div>
                    <div class="m-scroll" ref="scrollRef">
                        <div
                            class="u-item p-animations3"
                            v-for="(item, i) in list"
                            :key="i"
                            :class="client === 'std' ? 'fadeInLeft' : 'fadeInRight'"
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
                    <div class="u-list-client" v-if="client === 'std'">
                        <span class="u-button u-origin" @click="goOrigin"></span>
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

export default {
    name: "Mobile",
    data() {
        return {
            currentClient: "",
        };
    },
    computed: {
        client() {
            return this.currentClient || (location.href.includes("origin") ? "origin" : "std");
        },
        list() {
            const stdList = JSON.parse(JSON.stringify(std)).reverse();
            return this.client === "std" ? stdList : origin;
        },
    },
    created() {
        this.currentClient = location.href.includes("origin") ? "origin" : "std";
        document.title = this.currentClient === "origin" ? "缘起" : "重制/无界";
    },
    mounted() {
        if (this.client === "std") {
            this.$nextTick(() => {
                this.scrollToSecondCard();
            });
        }
    },
    methods: {
        showImg(key) {
            if (!key) key = "normal";
            return __cdn + "design/topic/index/" + key + ".png";
        },
        goStd() {
            this.currentClient = "std";
            this.$nextTick(() => {
                this.scrollToSecondCard();
            });
        },
        goOrigin() {
            this.currentClient = "origin";
            this.$nextTick(() => {
                const scrollRef = this.$refs.scrollRef;
                if (scrollRef) scrollRef.scrollTo({ left: 0, behavior: "smooth" });
            });
        },
        scrollToSecondCard() {
            const scrollRef = this.$refs.scrollRef;
            if (!scrollRef) return;
            scrollRef.scrollTo(scrollRef.clientWidth, 0);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/common/animation.less";
@import "~@/assets/css/topic/index/navigation.less";

.v-miniprogram {
    .p-topic-container {
        .m-navigation {
            .m-list {
                .m-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    height: 100vh;
                    .m-scroll {
                        overflow-x: auto !important;
                        overflow-y: hidden !important;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                    }

                    .m-scroll::-webkit-scrollbar {
                        display: none;
                    }

                    .u-list{
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
                        }
                    }
                }
            }
        }
    }
}
</style>
