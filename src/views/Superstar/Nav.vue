<template>
    <div class="p-superstar-nav">
        <div class="m-logo">
            <img :src="getCdnLink('design/event/superstar/title.png')" />
        </div>
        <img class="u-fire" :src="getCdnLink('design/event/superstar/fire.png')" />
        <img class="u-figure-left" :src="getCdnLink('design/event/superstar/l.png')" />
        <img class="u-figure-right" :src="getCdnLink('design/event/superstar/r.png')" />

        <!-- 入场券列表 -->
        <div class="m-list">
            <div class="u-item" v-for="(item, i) in data" :key="i">
                <a :href="eventLink(item.slug)" target="_blank">
                    <div
                        class="u-nav-img"
                        :style="{
                            backgroundImage: `url(${item.banner_pc})`,
                        }"
                    >
                        <div
                            class="u-nav-status"
                            :class="{
                                'u-nav-status-active': item.status,
                            }"
                        >
                            {{ item.status ? "进行中" : "已结束" }}
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvents } from "@/service/rank/event.js";
import { getCdnLink } from "@/utils";
export default {
    components: {},
    data() {
        return {
            imgurl: "https://img.jx3box.com/topic/menpaitiantuan/",
            active: 0,
            page: 1,
            per: 20,
            data: [],
        };
    },
    computed: {
        params: function () {
            return {
                pageIndex: this.page,
                pageSize: this.per,
            };
        },
    },
    watch: {
        params: function () {
            this.loadData();
        },
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        getCdnLink,
        loadData: function () {
            getEvents(this.params).then((res) => {
                let arr = [],
                    data = res.data.data.list;
                data.forEach((item) => {
                    if (item.superstar != 0) arr.push(item);
                });
                this.data = arr;
                this.active = arr.length - 1 || 0;
            });
        },
        eventLink: function (val) {
            return "/superstar/" + val;
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/rank/superstar/nav.less";
</style>
