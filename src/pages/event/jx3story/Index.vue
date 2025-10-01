<template>
    <div class="p-event-jx3story p-event-main">
        <div class="m-video">
            <video class="mp4" playsinline="" autoplay="" muted="" loop="" :poster="poster">
                <source :src="videoLink" type="video/mp4" />
            </video>
        </div>
        <div class="m-content">
            <!-- 灯笼容器 -->
            <Lantern
                to="/event"
                :top="68"
                :left="44"
                lanternPath="/main/main__lantern1.png"
                textPath="/main/main__texttrans_event.png"
                alt="灯笼1"
                textAlt="内容活动"
                class="lantern lantern-1"
            />
            <Lantern
                to="/article"
                :top="274"
                :left="136"
                lanternPath="/main/main__lantern2.png"
                textPath="/main/main__texttrans_article.png"
                alt="灯笼2"
                textAlt="文字赏析"
                class="lantern lantern-2"
            />
            <Lantern
                to="/vote"
                :top="440"
                :left="66"
                lanternPath="/main/main__lantern3.png"
                textPath="/main/main__texttrans_vote.png"
                alt="灯笼3"
                textAlt="投票参与"
                class="lantern lantern-3"
            />

            <!-- 标题图片 -->
            <div class="content__title">
                <img class="content__title-image" :src="getImgUrl('/main/main__title.png')" alt="标题" />
            </div>

            <img class="content__scroll-image" :src="getImgUrl('/main/scroll.webp')" alt="卷轴" />
        </div>
    </div>
</template>

<script>
import Lantern from "./components/Lantern.vue";
import { __cdn } from "@/utils/config";
export default {
    name: "jx3storyMain",
    inject: ["__imgRoot"],
    components: {
        Lantern,
    },
    data() {
        return {};
    },
    computed: {
        videoLink() {
            return __cdn + "design/video/20231128-fengyue-bg.mp4";
        },
        poster() {
            return `${this.__imgRoot}main/main__bg.png`;
        },
    },
    methods: {
        getImgUrl(name) {
            return this.__imgRoot + name;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/index.less";
</style>
