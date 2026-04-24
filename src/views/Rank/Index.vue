<template>
    <default-layout>
        <div class="p-rank-index">
            <div class="m-rank-index__content">
                <ul v-if="data && data.length" class="m-rank-index__list">
                    <li class="m-rank-index__item" v-for="(item, i) in data" :key="i">
                        <a class="m-rank-index__link" :href="eventLink(item.slug)" target="_blank">
                            <img class="m-rank-index__cover" :src="eventCover(item)" :alt="item.name" />
                            <b class="m-rank-index__name">{{ item.name }}</b>
                            <div class="m-rank-index__status">
                                <span v-if="item.client" class="m-rank-index__tag" :class="item.client">{{
                                    item.client == "std" ? "重制" : "缘起"
                                }}</span>
                                <i class="m-rank-index__state" :class="{ on: item.status }">{{
                                    item.status ? "进行中" : "已结束"
                                }}</i>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/rank/DefaultLayout.vue";
import PICS from "@/assets/js/pics.js";
import { getEvents } from "@/service/rank/event.js";
export default {
    name: "RankIndex",
    components: {
        DefaultLayout,
    },
    props: [],
    data: function () {
        return {
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
    methods: {
        loadData: function () {
            getEvents(this.params).then((res) => {
                this.data = res.data.data.list;
            });
        },
        eventLink: function (val) {
            return "/rank/#" + val;
        },
        eventCover: function (item) {
            return item.banner_pc || PICS.cover(item.ID);
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
};
</script>

<style lang="less">
@import "~@/assets/css/rank/index.less";
</style>
