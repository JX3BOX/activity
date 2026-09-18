<template>
    <div class="m-rank-team-detail" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.3)">
        <template v-if="team">
            <section class="m-team-section m-team-summary">
                <h2>通关信息</h2>
                <div class="u-summary-content">
                    <img class="u-logo" :src="teamLogo(team.team_logo)" :alt="team.team_name" />
                    <div class="u-summary-info">
                        <div class="u-name">{{ team.team_name }} <span>@{{ team.team_server }}</span></div>
                        <time>{{ showTime(team.created) }}</time>
                        <p><b>首领</b>{{ bossName }}</p>
                        <p><b>用时</b>{{ showTC(team.fight_time) }}</p>
                    </div>
                </div>
            </section>
            <section class="m-team-section m-team-members">
                <h2>团队列表</h2>
                <h3>【团长】</h3>
                <div class="u-leader" v-if="leader">
                    <img :src="mountIcon(leader[1])" /><span>{{ leader[0] }}<em>@{{ team.team_server }}</em></span>
                </div>
                <h3>【团员】</h3>
                <div class="u-members">
                    <div class="u-member" v-for="(member, index) in members" :key="index">
                        <img :src="mountIcon(member[1])" /><span>{{ member[0] }}<em>@{{ team.team_server }}</em></span>
                    </div>
                </div>
            </section>
        </template>
        <div v-else-if="!loading" class="m-rank-top100-null"><img :src="nullImage" /></div>
    </div>
</template>

<script>
import { __imgPath } from "@/utils/config";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getTop100 as getRankTop100 } from "@/service/rank/race";
import { getTop100 as getSuperstarTop100 } from "@/service/rank/superstar";

export default {
    name: "TeamDetail",
    data: () => ({ loading: false, team: null, nullImage: `${__imgPath}image/rank/common/null.png` }),
    computed: {
        id() { return this.$store.state.id; },
        aid() { return this.$route.query.aid; },
        isSuperstar() { return this.$route.query.source === "superstar"; },
        bossName() {
            return this.$store.state.achieves?.find((item) => String(item.achievement_id) === String(this.aid))?.name || "天团挑战";
        },
        parsedMembers() {
            const rows = String(this.team?.teammate || "").split(";").filter(Boolean).map((item) => item.split(","));
            const leaderName = this.team?.leader;
            return { leader: rows.find((item) => item[0] === leaderName) || rows[0], members: rows.filter((item) => item[0] !== leaderName) };
        },
        leader() { return this.parsedMembers.leader; },
        members() { return this.parsedMembers.members; },
    },
    watch: {
        "$route.fullPath": { immediate: true, handler() { this.loadTeam(); } },
    },
    methods: {
        async loadTeam() {
            if (!this.id || !this.aid) return;
            this.loading = true;
            try {
                const response = this.isSuperstar
                    ? await getSuperstarTop100(this.aid, this.id)
                    : await getRankTop100({ achieve_id: this.aid, server: "" }, this.id);
                const rows = response.data?.data || [];
                this.team = rows.find((item) => String(item.team_id) === String(this.$route.params.teamId)) || null;
            } finally {
                this.loading = false;
            }
        },
        teamLogo(value) {
            return value ? getThumbnail(value, 240, true) : require("@/assets/img/rank/misc/null.png");
        },
        mountIcon(mount) { return `${__imgPath}image/xf/${mount || 0}.png`; },
        showTime(value) { return showTime(new Date(value * 1000)); },
        showTC(value) {
            const seconds = Number(value || 0) / 1000;
            return `${Math.floor(seconds / 60)}分${Math.floor(seconds % 60)}秒`;
        },
    },
};
</script>
