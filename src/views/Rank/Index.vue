<template>
    <div id="app" class="m-rank-container">
        <Header></Header>
        <div class="m-rank-index">
            <div class="m-rank-header">
                <img class="u-logo" :src="LOGO" />
            </div>
            <div class="m-rank-content">
                <ul v-if="data && data.length">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <a :href="eventLink(item.slug)" target="_blank">
                            <img :src="eventCover(item)" :alt="item.name" />
                            <b>{{ item.name }}</b>
                            <div class="u-status">
                                <span v-if="item.client" :class="item.client">{{
                                    item.client == "std" ? "重制" : "缘起"
                                }}</span>
                                <i :class="{ on: item.status }">{{ item.status ? "进行中" : "已结束" }}</i>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import { getEvents } from "@/service/rank/event.js";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            LOGO: PICS.LOGO,
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
            return "/rank/#/" + val;
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
    components: {},
    // beforeCreate: function () {
    //     if (process.env.NODE_ENV == "production") {
    //         location.href = location.origin + "/jdt";
    //     }
    // },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/index.less";
</style>
