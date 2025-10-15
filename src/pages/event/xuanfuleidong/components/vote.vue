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
        <div class="m-vote-item" v-for="(item, i) in showList" :key="i">
            <div class="m-item">
                <div class="m-header">
                    <span class="u-label">玩法简介</span>
                    <span :class="`active u-button ${item.tag} `">{{ item.tag }}</span>
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
                        <a class="u-view" :href="`/community/${item.sub_title}`" target="_blank">查看详细</a>
                        <span class="u-vote" @click="handleVote(item)">
                            <span class="u-count" v-if="item.isVoted">(已投票)</span>
                            <span>{{ !item.isVoted ? "投票" : `${item.amount}人 想玩！` }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-code" :class="{ 'is-show': isShow }">
            <div class="u-box">
                <img class="u-code" :src="`${__imgRoot}code.png`" alt="活动代码" />
                <p>微信扫码<br />给喜欢的玩法投票吧！</p>
            </div>
        </div>
    </div>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { vote } from "@/service/event/vote";
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
            isLogin: User.isLogin(),
            h: 1100,
            isFixed: false,
            isShow: false,
            elementOffsetTop: 0,
            actives: ["PVP", "PVE", "PVX"],
            types: ["PVP", "PVE", "PVX"],
            content:
                "<p>投票期用户可在专题页/小程序投票。<br/>单个账号限制三票，且单个账号对单个玩法仅可投票一次。</p>",
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
            this.isShow = scrollTop > this.elementOffsetTop;
        },
        handleVote(item) {
            if (item.voted) return;
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
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
