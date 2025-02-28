<template>
    <tbody v-if="list && list.length">
        <tr v-for="(item, i) in list" :key="i" v-show="!hasCondition || isMatched(item)">
            <td>
                <i class="u-ranking">{{ i + 1 }}</i>
            </td>
            <td>
                <a :href="teamLink(item.team_id)" target="_blank">
                    <img loading="lazy" class="u-logo" :src="teamLogo(item.logo)" :alt="item.name" />
                </a>
            </td>
            <td>
                <a class="u-name" :href="teamLink(item.team_id)" target="_blank">{{ item.name }}</a>
            </td>
            <td>
                <span class="u-server">{{ item.server }}</span>
            </td>
            <td>
                <div>
                    <a class="u-leader" :href="authorLink(item.uid)">{{ item.leader }}</a>
                    <span class="u-slogan">{{ item.slogan }}</span>
                </div>
            </td>
            <!-- <td>
                <span class="u-prize" v-html="item.prize"></span>
            </td> -->
            <td>
                <span class="u-count">{{ item.count }}</span>
            </td>
            <td class="u-vote-wapper">
                <button
                    v-if="!hasVoted(item)"
                    class="u-vote"
                    :class="{ disabled: item.clicked || !event_status || !canVote || voteTeam.length > voteLimit }"
                    @click="vote(item)"
                    :disabled="item.clicked || !event_status || !canVote"
                    ></button>
                <div v-else>已投票</div>
            </td>
        </tr>
        <bindWxMp v-model="showBindWxMp" @update="onBindWxMpUpdate"></bindWxMp>
    </tbody>
</template>

<script>
import { __imgPath, default_avatar, __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import { moment } from "@jx3box/jx3box-common/js/moment";
import { getThumbnail, getLink, authorLink } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { doVote } from "@/service/rank/vote.js";
import { getUserInfo } from "@/service/rank/awards";
import BindWxMp from "@/components/rank/misc/bind_wx_mp.vue";
import { getConfig } from "@jx3box/jx3box-common/js/api_misc"
export default {
    name: "voteItemV2",
    props: ["data", "team_name", "server", "voteTeam"],
    components: {
        BindWxMp,
    },
    data: function () {
        return {
            isLogin: User.isLogin(),

            profile: null,
            showBindWxMp: false,

            voteLimit: 0,
        };
    },
    computed: {
        id: function () {
            return ~~this.$store.state.id;
        },
        list: function () {
            return this.data;
        },
        event_status: function () {
            return this.$store.state.race.status || false;
        },
        search_team: function () {
            return this.team_name;
        },
        search_server: function () {
            return this.server;
        },
        hasCondition: function () {
            return this.search_team || this.search_server;
        },
        vote_end: function () {
            return this.$store.state.race.vote_end;
        },
        canVote: function () {
            return moment().isBefore(moment(this.vote_end));
        },
        isWechatVerified() {
            return !!this.profile?.wechat_mp_openid;
        },
    },
    mounted() {
        this.getVoteLimit();
        this.loadUser();
    },
    methods: {
        isMatched: function (item) {
            if (this.search_team && this.search_server) {
                return item.name.includes(this.search_team) && item.server == this.search_server;
            }
            let matchName = this.search_team && item.name.includes(this.search_team);
            let matchServer = this.search_server && item.server == this.search_server;
            return matchName || matchServer;
        },
        vote: function (item) {
            // 检查登录
            if (!this.isLogin) {
                User.toLogin();
                return;
            }

            // 如果未绑定微信公众号，提示绑定
            if (!this.isWechatVerified) {
                this.$alert("请先绑定微信公众号，再进行投票", "消息", {
                    confirmButtonText: "去绑定",
                    callback: (action) => {
                        if (action == "confirm") {
                            this.showBindWxMp = true;
                        }
                    },
                });
                return;
            }

            doVote(this.id, ~~item.team_id).then((res) => {
                this.$message({
                    message: "感谢您的参与，投票成功！",
                    type: "success",
                    duration: 1000,
                });

                item.clicked = true;
                item.count = ~~item.count + 1;
                this.$forceUpdate();
            });
            // if (this.voteTeam.length) return;
            // const src = `${__imgPath}image/rank/vote/${this.id}.png`;
            // this.$alert(`<img src="${src}" alt="" />`, "打开微信扫码投票", {
            //     showConfirmButton: false,
            //     dangerouslyUseHTMLString: true,
            //     center: true,
            // });
        },
        hasVoted: function (item) {
            return this.voteTeam.includes(String(item.team_id));
        },
        teamLogo: function (val) {
            return val ? getThumbnail(val, 96, true) : getThumbnail(default_avatar, 96, true);
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
        authorLink,
        loadUser() {
            if (!this.isLogin) {
                return;
            }
            getUserInfo().then((res) => {
                this.profile = res.data.data;
            });
        },
        onBindWxMpUpdate() {
            this.loadUser();
        },
        // 获取投票上限
        getVoteLimit() {
            getConfig({key: "rank_vote_limit"}).then((res) => {
                this.voteLimit = ~~res.data.data.val;
            });
        }
    },
};
</script>
