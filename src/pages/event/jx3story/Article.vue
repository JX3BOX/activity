<template>
    <div class="jx3story-article-content p-article-main">
        <!-- 灯笼 -->
        <LanternGroup />
        <!-- logo -->
        <router-link class="mini-slogan" to="/" @click.native="handleClick">
            <img class="event__sign" :src="getImgUrl('/eventcontent/eventc__sign.png')" alt="活动标志" />
        </router-link>

        <div class="m-main" v-loading="loading">
            <div class="m-stamp">
                <!-- <img :src="code" class="u-code" /> -->
                <span>—— 二零二肆年·冬</span>
            </div>
            <div class="m-post-content">
                <div class="m-post-list">
                    <a
                        :href="`${root}community/${item.content}`"
                        target="_blank"
                        class="u-item"
                        v-for="item in list"
                        :key="item.id"
                    >
                        <span class="u-name">—— {{ item.user_info.display_name }}</span>
                        <span class="u-title">{{ item.title }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getProgramDetail } from "@/service/event/vote";
import LanternGroup from "./components/LanternGroup.vue";
import { __cdn, __Root } from "@/utils/config";
export default {
    name: "jx3storyEvent",
    inject: ["__imgRoot"],
    components: {
        LanternGroup,
    },
    data() {
        return {
            id: 23,
            list: [],
            loading: false,
            root: __Root,
        };
    },
    computed: {
        code() {
            return `${__cdn}design/event/jx3story/2024/code.png`;
        },
    },
    methods: {
        getImgUrl(name) {
            return this.__imgRoot + name;
        },
        loadData() {
            this.loading = true;
            getProgramDetail(this.id)
                .then((res) => {
                    this.list = res.data?.data?.vote_items || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3story/article.less";
</style>
<style lang="less" scope>
body {
    background-image: url("@{kv_jx3story}/article/bg.jpg");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
}
</style>
