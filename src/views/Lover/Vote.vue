<template>
    <div class="m-lover-vote wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}vote-title.png`" />
        </div>
        <div class="m-rule-box">
            <h2 class="u-rule-title">投票规则</h2>
            <div class="u-rule-icon">♡</div>
            <div class="u-rule" v-html="vote_note"></div>
        </div>
        <div class="m-vote-list">
            <div class="m-vote-box" v-for="item in list" :key="item.id" :class="{
                'is-voted': item.voted
            }" @mouseenter="onMouseEnter(item.id)" @mouseleave="onMouseLeave(item.id)">
                <!-- 粒子特效容器 -->
                <!-- <ParticleEffect :ref="`particle-${item.id}`" /> -->

                <div class="m-team-box">
                    <el-image class="u-team-img" :src="item.images[0]">
                        <i slot="error"></i>
                    </el-image>
                    <div class="m-team-info">
                        <div class="u-team">{{ item.team_name }}</div>
                        <div class="u-teammates">
                            <div class="u-teammate" v-for="(user, index) in uniqBy(item.teammeta_user_list, 'id')" :key="index">
                               <el-image class="u-avatar" :src="showAvatar(user.avatar)"></el-image>{{ user.display_name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-slogan-box">
                    参赛宣言：
                    <div class="u-slogan">{{ item.slogan }}</div>
                </div>
                <div class="m-action-box">
                    <div class="u-hot">
                        <i class="u-hot-icon">{{ item.voted ? '♥' : '♡' }}</i>
                        人气值：{{ item.votes }}
                    </div>
                    <div class="u-button" @click="onVote(item)" :class="{
                        'voted': item.voted,
                        'disabled': vote_loading || item.voted
                    }">
                        <span class="u-text">{{ item.voted ? '已投票' : '投票' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { uniqBy } from "lodash";
import { getSelectedList, vote, getVoteStatus, getMyVoteRecords } from "@/service/rank/lover";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import ParticleEffect from "@/components/rank/ParticleEffect.vue";

export default {
    name: "LoverVote",
    inject: ["__imgRoot"],
    components: {
        // ParticleEffect
    },
    data: function () {
        return {
            pageSize: 30,
            index: 1,
            list: [],
            total: 0,

            vote_loading: false,
            loading: false,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        event() {
            return this.$store.state.event;
        },
        vote_note() {
            return this.$store.state.event.vote_note;
        },
        params() {
            return {
                pageSize: this.pageSize,
                index: this.index,
            };
        },
        uid() {
            return User.getInfo().uid;
        },
        isLogin() {
            return User.isLogin();
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.load();
            },
        },
    },
    methods: {
        uniqBy,
        showAvatar,
        load() {
            this.loading = true;
            getSelectedList(this.eventId).then((res) => {
                this.list = res.data.data.list || [];
                this.loading = false;

                this.isLogin && getMyVoteRecords({ user_id: this.uid, event_id: this.eventId }).then((voteRes) => {
                    const myVotes = voteRes.data.data.list || [];
                    this.list.forEach((item) => {
                        const voted = myVotes.some((vote) => vote.record_id === item.id);
                        this.$set(item, "voted", voted);
                    });
                });
            });
        },
        async onVote(item) {
            if (this.vote_loading) return;
            this.vote_loading = true;
            try {
                const promise = this.event.is_point_vote
                    ? vote(this.eventId, item.id, { votes_count: 10 })
                    : vote(this.eventId, item.id, { votes_count: 0 });
                const vote_resp = await promise;
                const vote_record_id = vote_resp.data?.data?.id;
                if (this.event.is_point_vote) {
                    if (!vote_record_id) {
                        this.$message.error("投票失败，请稍后再试");
                        return;
                    }
                    // 是积分投票，需要轮询一段时间的接口
                    for (let i = 0; i < 10; i++) {
                        // 每500ms检查一次
                        await new Promise((resolve) => setTimeout(resolve, 500));
                        const resp = await getVoteStatus(this.eventId, item.id, vote_record_id);
                        const res = resp.data?.data?.status;
                        if (res) {
                            this.$message.success("投票成功");
                            item.votes += 1;
                            item.voted = true;
                            break;
                        }
                    }
                } else {
                    // 非积分投票
                    this.$message.success("投票成功");
                    item.votes += 1;
                    item.voted = true;
                }
            } finally {
                this.vote_loading = false;
            }
        },
        onMouseEnter(itemId) {
            const particleRef = this.$refs[`particle-${itemId}`];
            if (particleRef && particleRef[0]) {
                particleRef[0].playAnimation();
            }
        },
        onMouseLeave(itemId) {
            const particleRef = this.$refs[`particle-${itemId}`];
            if (particleRef && particleRef[0]) {
                particleRef[0].stopAnimation();
            }
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/vote.less";
</style>
