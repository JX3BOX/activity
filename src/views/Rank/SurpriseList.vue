<template>
    <default-layout>
        <div class="m-rank-surprise">
            <div class="m-rank-surprise__main">
                <div class="m-rank-surprise__header">
                    <img :src="getCdnLink('design/rank/surprise/weal.svg')" alt="" />
                    <div class="u-img-bottom"></div>
                </div>
                <div class="m-rank-surprise__list">
                    <div class="u-item" v-for="(item, index) in list" :key="index" @click="gotoApply(item)">
                        <img :src="resolveImagePath(item.banner) || img" :alt="item.name" />
                        <div class="u-info">
                            <div class="u-txt">
                                <div class="u-title" :title="item.name">
                                    <el-tag effect="dark" size="mini" :type="item.status ? 'success' : 'info'">{{
                                        item.status ? "进行中" : "已结束"
                                    }}</el-tag>
                                    {{ item.name }}
                                </div>
                                <div class="u-time">
                                    {{ showTime(item.start_at || item.created_at) }} ~
                                    {{ showTime(item.end_at || item.created_at) }}
                                </div>
                                <div class="u-desc" v-html="getDesc(item.desc)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/rank/DefaultLayout.vue";
import { getEvents } from "@/service/rank/surprise.js";
import { showDate } from "@jx3box/jx3box-common/js/moment.js";
import { __imgPath } from "@/utils/config";
import { getCdnLink } from "@/utils/index.js";
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
export default {
    components: {
        DefaultLayout,
    },
    data: function () {
        return {
            list: [],
            key: "",
            title: "",
        };
    },
    computed: {
        img() {
            return __imgPath + "image/other/apply.png";
        },
    },
    methods: {
        getCdnLink,
        showTime: showDate,
        gotoApply({ id }) {
            let routeUrl = this.$router.resolve({
                name: "surprise-single",
                params: { id },
            });
            window.open(routeUrl.href, "_blank");
            // this.$router.push({
            //     name: "single",
            //     params: { id },
            // });
        },
        resolveImagePath,
        getDesc(html) {
            return html.replace(/<[^>]+>/g, "");
        },
    },
    created() {
        getEvents().then((res) => {
            this.list = res.data.data.list;
        });
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/surprise/app.less";
@import "~@/assets/css/rank/surprise/list.less";
</style>
