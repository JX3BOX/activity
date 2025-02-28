<template>
    <div class="p-event-content">
        <div class="m-box">
            <el-carousel class="m-carousel" :interval="interval" :autoplay="false" @change="change" :height="height">
                <el-carousel-item v-for="(video, i) in videos" :key="i">
                    <div class="u-video" v-html="video.link" v-if="active == i"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
const KEY = "poems";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    data: function () {
        return {
            raw: [],
            videos: [],
            active: 0,
            height: "",
        };
    },
    computed: {
        data: function () {
            let _data = {};
            this.raw.forEach((item) => {
                if (!_data[item.subtype]) _data[item.subtype] = [];
                _data[item.subtype].push(item);
            });
            return _data;
        },
        interval() {
            return ~~this.videos[this.active]?.desc || 3000;
        },

        width() {
            return window.innerWidth;
        },
    },
    watch: {
        width: {
            immediate: true,
            handler: function (w) {
                this.height = w < 720 ? "220px" : w < 1133 ? "420px" : "520px";
                this.$forceUpdate();
            },
        },
    },
    methods: {
        init() {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.videos = this.data.video.map((item) => {
                    item.play = false;
                    return item;
                });
                this.videos[0].play = true;
            });
        },
        change(i) {
            this.active = i;
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/poems/index.less";
</style>
