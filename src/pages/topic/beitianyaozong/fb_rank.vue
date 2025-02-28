<template>
    <div class="m-fb-rank">
        <div
            class="m-fb-rank-item"
            :class="'rank'+index"
            v-for="(item, index) in fbRank"
            :key="index"
        >
            <div class="m-fb-rank-index">{{ index }}</div>
            <div class="m-fb-rank-logo">
                <img :class="'logo' + index" :src="item.team_logo" alt />
            </div>
            <div class="m-fb-rank-server">{{ item.server }}</div>
            <div class="m-fb-rank-name">{{ item.team_name }}</div>
            <div class="m-fb-rank-duration">{{ item.date_str }}</div>
        </div>
    </div>
</template>

<script>
import { getFbRank } from "@/service/topic";
import Bus from "@/utils/bus.js";
export default {
    data() {
        return {
            fbRank: [],
            bossId: 0,
        };
    },
    methods: {
        init() {
            getFbRank(this.bossId).then((res) => {
                this.fbRank = res.data.data.slice(0, 3);
            });
        },
    },
    watch: {
        bossId() {
            this.init();
        },
    },
    mounted() {
        Bus.$on("updateBossId", (id) => {
            this.bossId = id;
        });

        this.init();
    },
    beforeDestroy() {
        Bus.$off("updateBossId");
    },
};
</script>

<style lang="less" scoped>
.m-fb-rank {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "rank1 rank0 rank2";
    column-gap: 8px;

    &-item {
        text-align: center;
        width: 160px;

        .m-fb-rank-logo {
            height: 120px;
        }
    }

    .rank1 {
        grid-area: rank1;
    }
    .rank0 {
        grid-area: rank0;
    }
    .rank2 {
        grid-area: rank2;
    }

    .logo0 {
        .size(100px);
    }
    .logo1 {
        .size(90px);
    }
    .logo2 {
        .size(80px);
    }
}
</style>
