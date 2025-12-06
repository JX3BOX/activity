<template>
    <div class="m-vote-content" v-loading="loading">
        <template v-if="list.length">
            <!-- pc端 -->
            <transition-group name="fall" tag="div" class="m-vote-list">
                <div
                    class="m-vote-item"
                    :class="{ falling: item.isFalling }"
                    v-for="(item, i) in list"
                    :key="item.id"
                    :style="{
                        animationDelay: `${item.fallDelay}s`,
                        swingDuration: `${item.swingDuration}s`,
                    }"
                    @animationend="onFallEnd(i)"
                >
                    <div class="u-top" :style="{ paddingTop: item.padding }"></div>
                    <div class="u-vote">
                        <a :href="`${root}community/${item.content}`" target="_blank" class="u-title">
                            {{ item.title }}
                        </a>
                    </div>
                    <div class="u-bottom"></div>
                </div>
            </transition-group>

            <!-- 小程序端 -->
            <div class="m-mini-box">
                <div class="m-mini-list">
                    <div class="m-item" v-for="(item, i) in list" :key="i">
                        <a :href="`${root}community/${item.content}`" target="_blank" class="m-info">
                            <span class="u-title">
                                {{ item.title }}
                            </span>
                            <span class="u-author"> —— {{ item.user_info.display_name }} </span>
                        </a>
                        <div class="u-vote" :class="{ active: item.active }" @click.stop="handleVote(item)">
                            {{ item.active ? "已投票" : "投TA一票" }}
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="u-null" v-else-if="!loading">
            <img :src="data.nullImg" />
        </div>
    </div>
</template>
<script>
import { getProgramDetail } from "@/service/event/vote";
import { shuffle } from "lodash";
import { __cdn, __Root } from "@/utils/config";

export default {
    name: "jx3storyVote",
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
            cdn: __cdn,
            root: __Root,
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
                this.list = [];
                this.$emit("update", { hasVote: false });
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
                    const list = shuffle(res.data?.data?.vote_items || []);
                    this.list = list.map((item, i) => {
                        const randomNum = Math.floor(Math.random() * 220);
                        item.fallDelay = i * 0.2;
                        item.isFalling = false;
                        return {
                            ...item,
                            padding: `${randomNum}px`,
                        };
                    });
                    this.$emit("update", { hasVote: list.length });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onFallEnd(index) {
            this.list[index].isFalling = true;
        },
    },
};
</script>
