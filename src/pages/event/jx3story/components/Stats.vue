<template>
    <div class="m-stats-content" v-loading="loading">
        <div class="m-list-box" v-if="list.length">
            <div class="m-list">
                <div class="m-list-item m-list-item-header">
                    <span>序号</span>
                    <span>入选作品</span>
                    <span>作者</span>
                    <span>票数</span>
                </div>
                <div class="m-list-item" v-for="(item, i) in list" :key="i">
                    <span>{{ i + 1 }}</span>
                    <span>{{ item.title }}</span>
                    <span>{{ item.user_info.display_name }}</span>
                    <span>{{ item.amount }}</span>
                </div>
            </div>
        </div>
        <div class="u-null" v-else-if="!loading">
            <img :src="data.nullImg" />
        </div>
    </div>
</template>
<script>
import { getProgramDetail } from "@/service/event/vote";
import { shuffle } from "lodash";
export default {
    name: "jx3storyStats",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            list: [],
        };
    },
    computed: {
        vote_id() {
            return this.data.vote_id || "";
        },
    },
    watch: {
        vote_id: {
            handler(id) {
                id && this.loadVote(id);
            },
            immediate: true,
        },
    },
    methods: {
        loadVote(id) {
            this.loading = true;
            getProgramDetail(id)
                .then(async (res) => {
                    this.list = shuffle(res.data?.data?.vote_items || []);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
