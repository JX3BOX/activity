<template>
    <div class="m-rank-top100-item" :class="showIndex ? 'is-No' + (i + 1) : ''">
        <!-- 排名 -->
        <div v-if="showIndex" class="u-ranking" :class="'is-Top' + (i + 1)" @click="copy(item.team_name)">
            <i class="u-pic">
                <img loading="lazy" :src="getRankImg(i + 1)" v-if="i < 3" />
            </i>
            <span>{{ i + 1 }}</span>
        </div>
        <!-- 队徽 -->
        <a class="u-logo" :href="teamLink(item.team_id)" target="_blank">
            <el-image
                v-if="item.team_logo"
                :src="i < 3 ? teamLogo(item.team_logo, true) : teamLogo(item.team_logo, false)"
                fit="fill"
            ></el-image>
            <div class="el-image" v-else>
                <img loading="lazy" src="@/assets/img/rank/misc/null.png" />
            </div>
        </a>
        <!-- 名称 -->
        <div class="u-title">
            <a class="u-teamname" :href="teamLink(item.team_id)" target="_blank" v-if="item.team_id">
                <i class="el-icon-link"></i>
                {{ item.team_name && item.team_name.slice(0, 6) }}
            </a>
            <span class="u-teamname u-teamname-null" v-else>未知</span>
            <span class="u-server">{{ item.team_server }}</span>
            <span class="u-youngster" v-if="i > 2 && isLastBoss">
                <img v-if="isNewbie" class="u-chanlian" :src="chanlian" alt="">
                <img v-if="isYoungster" class="u-heima" :src="heima" alt="">
                <img v-if="isKingBack" class="u-wangzhe" :src="wangzhe" alt="">
            </span>
        </div>
        <!-- 时间 -->
        <div class="u-time" @click="copy(showTime(item.created))" :class="{ 'u-youngster-time': ((isNewbie || isYoungster || isKingBack) && isLastBoss) || !isLastBoss }">
            <span class="u-time-fight">
                用时 :
                <b>{{ showTC(item.fight_time) }}</b>
            </span>
            <span class="u-time-finish">{{ showTime(item.created) }}</span>
        </div>
        <div class="u-youngster" v-if="i < 3 && isLastBoss">
            <img v-if="isNewbie" class="u-chanlian" :src="chanlian" alt="">
            <img v-if="isYoungster" class="u-heima" :src="heima" alt="">
            <img v-if="isKingBack" class="u-wangzhe" :src="wangzhe" alt="">
        </div>
        <!-- 队长 -->
        <div class="u-leader" v-if="item.leaders">
            <span class="u-leader-label">团长 :</span>
            <img loading="lazy" class="u-mount" :src="showLeaderMount(item.leaders[1])" />
            <span class="u-username">
                {{ showLeaderName(item.leaders[0]) }}
            </span>
        </div>
        <!-- 队员 -->
        <el-row class="u-teammates" :gutter="10">
            <el-col class="u-member" :span="i < 3 ? 8 : span" v-for="(member, j) in item.members" :key="j">
                <div class="u-member-content">
                    <img loading="lazy" class="u-mount" :src="showMemberMount(member)" />
                    <span class="u-username" :title="showMemberName(member)">{{ showMemberName(member) }}</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { __imgPath, __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "rank-item",
    props: {
        i: {
            type: [String, Number],
            default: 0,
        },
        item: {
            type: Object,
            default: () => {},
        },
        showIndex: {
            type: Boolean,
            default: true,
        },
        span: {
            type: Number,
            default: 4,
        },
        isLastBoss: {
            type: Boolean,
            default: false,
        },
        newbie: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            chanlian: __cdn + "design/event/rank/chanlian.webp",
            heima: __cdn + "design/event/rank/heima.webp",
            wangzhe: __cdn + "design/event/rank/wangzhe.webp",
        };
    },
    computed: {
        isNewbie() {
            const keep_10 = this.newbie?.keep_10?.map(item => item.ID) || [];
            return keep_10?.includes(this.item.team_id);
        },
        isYoungster() {
            const youngster_list = this.newbie?.youngster_list?.map(item => item.ID) || [];
            return youngster_list?.includes(this.item.team_id);
        },
        isKingBack() {
            const king_back = this.newbie?.king_back?.map(item => item.ID) || [];
            return king_back?.includes(this.item.team_id);
        },
    },
    methods: {
        getRankImg: function (num) {
            return __imgPath + "image/rank/common/rank_" + num + ".png";
        },
        teamLogo: function (val, mode) {
            if (!val) return "";
            return mode ? getThumbnail(val, 240, true) : getThumbnail(val, 176, true);
        },
        teamLink: function (val) {
            return getLink("org", val);
        },
        showTime: function (val) {
            return showTime(new Date(val * 1000));
        },
        showTC: function (val) {
            let s = val / 1000;
            return ~~(s / 60) + "分" + ~~(s % 60) + "秒";
        },
        showMemberMount: function (member) {
            let mount = (member && member[1]) || 0;
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showMemberName: function (member) {
            return (member && member[0].slice(0, 12)) || "未知";
        },
        showLeaderMount: function (mount) {
            let mountIcon = __imgPath + "image/xf/" + mount + ".png";
            return mountIcon;
        },
        showLeaderName: function (name) {
            return (name && name.slice(0, 12)) || "未知";
        },
        copy(text) {
            navigator.clipboard.writeText(text);
        },
    },
};
</script>
