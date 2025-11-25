<template>
    <div class="m-vote">
        <div class="m-section">
            <img :src="`${__imgRoot}vote-title.png`" class="u-title" />
            <div class="u-content" v-html="content"></div>
        </div>
        <div class="u-line"></div>
        <div class="m-search" ref="stickyElement" :class="{ 'is-fixed': isFixed }">
            <span>赛道筛选：</span>
            <span
                v-for="item in types"
                :key="item"
                @click="change(item)"
                :class="[{ active: actives.includes(item) }, item, 'u-button']"
                >{{ item }}</span
            >
        </div>
        <div :class="{ 'u-padding': isFixed }"></div>
        <template v-if="showList.length">
            <div class="m-vote-item" v-for="(item, i) in showList" :key="i">
                <div class="m-item">
                    <div class="m-header">
                        <a :href="`/community/${item.sub_title}`" target="_blank" class="u-label">
                            {{ item.title }}
                        </a>
                        <span :class="`active u-button ${item.tag} `">{{ item.tag }}</span>
                    </div>
                    <template v-if="isMiniProgram">
                        <div class="u-content-mini">
                            <a class="u-user" :href="`/author/${item.user_info.id}`" target="_blank">
                                <img class="u-avatar" :src="item.user_info.avatar" />
                                {{ item.user_info.display_name }}
                            </a>
                            <a :href="`/community/${item.sub_title}`" target="_blank" class="u-desc">{{
                                item.content
                            }}</a>
                        </div>
                        <div class="u-vote" @click="handleVote(item)">
                            <span>{{ !item.isVoted ? "投票" : `${item.amount}人 想玩！` }}</span>
                            <span class="u-count" v-if="item.isVoted">(已投票)</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="u-content">{{ item.content }}</div>
                        <div class="m-footer">
                            <a :href="`/author/${item.user_info.id}`" target="_blank" class="u-info">
                                <img class="u-avatar" :src="item.user_info.avatar" />
                                <span> @{{ item.user_info.display_name }} </span>
                            </a>
                            <div class="u-item-button">
                                <a class="u-view" :href="`/community/${item.sub_title}`" target="_blank">查看详细</a>
                                <span class="u-vote" @click="handleVote(item)">
                                    <span class="u-count" v-if="item.isVoted">(已投票)</span>
                                    <span>{{ !item.isVoted ? "投票" : `${item.amount}人 想玩！` }}</span>
                                </span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <img v-else :src="`${imgUrl}image/rank/common/null.png`" />


    </div>
</template>
<script>
import { isMiniProgram } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { vote } from "@/service/event/vote";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    inject: ["__imgRoot"],
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data: function () {
        return {
            isMiniProgram: isMiniProgram(),
            isLogin: User.isLogin(),
            h: 1100,
            isFixed: false, 
            elementOffsetTop: 0,
            actives: ["PVP", "PVE", "PVX"],
            types: ["PVP", "PVE", "PVX"],
            content:
                "<p>投票期用户可在专题页/小程序投票。<br/>单个账号限制三票，且单个账号对单个玩法仅可投票一次。<br/>投票时间：11月28日 00:00 - 12月04日 00:00</p>",
            imgUrl: __imgPath,
            lastVoteTime: 0,
            avatar: `https://img.jx3box.com/img/avatar/shota.jpg`,
        };
    },

    mounted() {
        this.$nextTick(() => {
            const element = this.$refs.stickyElement;
            if (element) {
                this.elementOffsetTop = element.offsetTop;
            }
        });

        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    computed: {
        showList() {
            return this.list.filter((item) => this.actives.includes(item.tag));
        },
    },
    methods: {
        change(item) {
            if (this.actives.includes(item)) {
                if (this.actives.length == 1) return;
                this.actives = this.actives.filter((i) => i !== item);
            } else {
                this.actives.push(item);
            }
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTop > this.elementOffsetTop + this.h; 
        },
        handleVote(item) {
            if (item.isVoted) return;
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            const time = 1000;
            const now = Date.now();
            if (now - this.lastVoteTime < time) {
                return this.$message({
                    message: "投票速度太快啦！",
                    type: "warning",
                });
            }
            this.lastVoteTime = now;
            vote(item.program_id, { vote_id_list: [item.id] }).then(() => {
                this.$message({
                    message: "投票成功",
                    type: "success",
                });
                item.isVoted = true;
                item.amount++;
            });
        },
    },
};
</script>
