<template>
    <div class="p-superstar-nav">
        <div class="m-logo">
            <img :src="imgurl + 'nav/1.png'" height="183" />
        </div>

        <!-- 入场券列表 -->
        <div class="m-list">
            <div class="u-item" v-for="(item, i) in data" :key="i">
                <a :href="eventLink(item.slug)" target="_blank">
                    <!-- <img :src="imgurl + 'nav/sort-1-bg.png'" height="130" /> -->
                    <div class="u-nav-img"><img :src="item.banner_pc" height="158" /></div>

                    <div class="u-btn">
                        <img :src="imgurl + 'nav/' + (item.status ? 'rc.png' : 'hg.png')" height="50" />
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvents } from "@/service/rank/event.js";
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
            return "/superstar/#/" + val;
        },
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/rank/superstar/nav.less";
</style>
