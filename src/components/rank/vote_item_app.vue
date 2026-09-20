<template>
    <div class="m-rank-vote-app" v-if="list && list.length">
        <div class="m-rank-vote-app-head">
            <span>排名 / 团队</span>
            <span>人气 / 投票</span>
        </div>
        <div class="m-rank-vote-app-item" v-for="(item, i) in list" :key="item.team_id || i" v-show="isMatched(item)">
            <i class="u-ranking" :class="{ 'is-top': i < 3 }">{{ i + 1 }}</i>
            <div class="u-info">
                <img class="u-logo" :src="teamLogo(item.logo)" :alt="item.name" loading="lazy" />
                <div class="u-main">
                    <a class="u-name" :href="teamLink(item.team_id)" :target="linkTarget">{{ item.name }}</a>
                    <span class="u-server">{{ item.server }}</span>
                </div>
            </div>
            <div class="u-vote-wapper">
                <span class="u-count"><b>{{ item.count ?? item.guess ?? 0 }}</b><span>人气</span></span>
                <button
                    v-if="!hasVoted(item)"
                    class="u-vote"
                    :class="{ disabled: item.clicked || !eventStatus || !canVote || voteTeam.length >= voteLimit }"
                    :disabled="item.clicked || !eventStatus || !canVote || voteTeam.length >= voteLimit"
                    @click="vote(item)"
                >
                    支持
                </button>
                <div v-else class="u-voted">已支持</div>
            </div>
            <p v-if="item.slogan" class="u-slogan">{{ item.slogan }}</p>
        </div>
        <bind-wx-mp v-model="showBindWxMp" @update="loadUser" />
    </div>
</template>

<script>
import { isApp } from "@/utils/env";
import { moment } from "@jx3box/jx3box-common/js/moment";
import { getLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@/utils/config";
import User from "@jx3box/jx3box-common/js/user.js";
import { doVote } from "@/service/rank/vote.js";
import { getUserInfo } from "@/service/rank/awards";
import { getConfig } from "@jx3box/jx3box-common/js/system";
import BindWxMp from "@/components/rank/misc/bind_wx_mp.vue";

export default {
    name: "VoteItemApp",
    components: { BindWxMp },
    props: {
        data: { type: Array, default: () => [] },
        teamName: { type: String, default: "" },
        server: { type: String, default: "" },
        voteTeam: { type: Array, default: () => [] },
    },
    data() {
        return {
            isLogin: User.isLogin(),
            profile: null,
            showBindWxMp: false,
            voteLimit: 0,
        };
    },
    computed: {
        linkTarget() {
            return isApp() ? "_self" : "_blank";
        },
        id() {
            return Number(this.$store.state.id);
        },
        list() {
            return this.data;
        },
        eventStatus() {
            return this.$store.state.race.status || false;
        },
        canVote() {
            return moment().isBefore(moment(this.$store.state.race.vote_end));
        },
        isWechatVerified() {
            return !!this.profile?.wechat_mp_openid;
        },
    },
    mounted() {
        this.loadUser();
        getConfig({ key: "rank_vote_limit" }).then((res) => {
            this.voteLimit = Number(res.data?.data?.val) || 5;
        });
    },
    methods: {
        teamLogo(logo) {
            return getThumbnail(logo || default_avatar, 96, true);
        },
        isMatched(item) {
            return (!this.teamName || item.name?.includes(this.teamName)) && (!this.server || item.server === this.server);
        },
        hasVoted(item) {
            return !!item.clicked || this.voteTeam.includes(String(item.team_id));
        },
        teamLink(id) {
            return getLink("org", id);
        },
        loadUser() {
            if (!this.isLogin) return;
            getUserInfo().then((res) => {
                this.profile = res.data.data;
            });
        },
        vote(item) {
            if (!this.isLogin) return User.toLogin();
            if (!this.isWechatVerified) {
                this.$alert("请先绑定微信公众号，再进行投票", "消息", {
                    confirmButtonText: "去绑定",
                    callback: (action) => {
                        if (action === "confirm") this.showBindWxMp = true;
                    },
                });
                return;
            }
            doVote(this.id, Number(item.team_id)).then(() => {
                this.$message({ message: "感谢您的参与，投票成功！", type: "success", duration: 1000 });
                item.clicked = true;
                if (item.count !== undefined) item.count = Number(item.count) + 1;
                else item.guess = Number(item.guess) + 1;
                this.$forceUpdate();
            });
        },
    },
};
</script>
