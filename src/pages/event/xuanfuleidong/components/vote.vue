<template>
    <div class="m-vote">
        <div class="m-section">
            <img :src="`${__imgRoot}vote-title.png`" class="u-title" />
            <div class="u-content" v-html="content"></div>
        </div>
        <div class="u-line"></div>
        <div class="m-search">
            <span>赛道筛选：</span>
            <span
                v-for="item in types"
                :key="item"
                @click="change(item)"
                :class="[{ active: actives.includes(item) }, item, 'u-button']"
                >{{ item }}</span
            >
        </div>

        <div class="m-vote-item" v-for="(item, i) in showList" :key="i">
            <div class="m-item">
                <div class="m-header">
                    <span class="u-label">玩法简介</span>
                    <span :class="`active u-button ${item.sub_title} `">{{ item.sub_title }}</span>
                </div>
                <div class="u-content">{{ item.content }}</div>
                <div class="m-footer">
                    <div class="u-info">
                        <span>{{ item.title }}</span>
                        <a class="u-name" :href="`/author/${item.user_info.id}`" target="_blank"
                            >@{{ item.user_info.display_name }}</a
                        >
                    </div>
                    <div class="u-item-button">
                        <a class="u-view" :href="`/event/vote/detail/${item.id}`" target="_blank">查看详细</a>
                        <span class="u-vote">
                            <span class="u-count">(已投票)</span>
                            <span>投票</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getProgramDetail } from "@/service/event/vote";
import { shuffle } from "lodash";
export default {
    inject: ["__imgRoot"],
    data: function () {
        return {
            loading: false,
            list: [],
            judges: {},
            id: 25,
            actives: ["PVP", "PVE", "PVX"],
            types: ["PVP", "PVE", "PVX"],
            content:
                "<p>投票期用户可在专题页/小程序投票。<br/>单个账号限制三票，且单个账号对单个玩法仅可投票一次。</p>",
        };
    },

    computed: {
        showList() {
            return this.list.filter((item) => this.actives.includes(item.sub_title));
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            getProgramDetail(this.id)
                .then((res) => {
                    this.list = shuffle(res.data.data.vote_items || []);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        change(item) {
            if (this.actives.includes(item)) {
                if (this.actives.length == 1) return;
                this.actives = this.actives.filter((i) => i !== item);
            } else {
                this.actives.push(item);
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/xuanfuleidong/components.less";
</style>
