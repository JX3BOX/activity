<template>
    <section class="c-lover-destiny m-lover-v2-panel">
        <div class="u-head">
            <div class="u-title">
                <FeatureBadge name="destiny-card" small />
                <div>
                    <h3>本场天命签</h3>
                    <p>每一签都按本段赛程规则随机揭晓，参赛队伍不能自行指定结果。</p>
                </div>
            </div>
            <el-button v-if="canDraw" type="warning" :loading="loading" @click="$emit('draw')">
                抽取天命签
            </el-button>
        </div>
        <div v-if="draws.length" class="m-cards">
            <article v-for="draw in draws" :key="draw.id" class="u-card">
                <el-image v-if="draw.card?.img" class="u-card-img" :src="draw.card.img" fit="cover" />
                <FeatureBadge v-else name="destiny-card" small />
                <div>
                    <el-tag size="small" effect="plain">{{ teamName(draw.team_id) }}</el-tag>
                    <h4>{{ draw.card?.name || "天命签" }}</h4>
                    <p>{{ draw.card?.desc || "签面效果等待公布" }}</p>
                </div>
            </article>
        </div>
        <EmptyState v-else icon="destiny-card" description="本场还没有公开的天命签结果" compact />
    </section>
</template>

<script>
import EmptyState from "./EmptyState.vue";
import FeatureBadge from "./FeatureBadge.vue";

export default {
    name: "LoverV2DestinyCardPanel",
    components: { EmptyState, FeatureBadge },
    emits: ["draw"],
    props: {
        draws: { type: Array, default: () => [] },
        match: { type: Object, required: true },
        canDraw: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    methods: {
        teamName(teamId) {
            return Number(teamId) === Number(this.match.team1?.id) ? this.match.team1?.name : this.match.team2?.name;
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-destiny {
    padding: 24px;
}

.u-head,
.u-title {
    display: flex;
    align-items: center;
    gap: 14px;
}

.u-head {
    justify-content: space-between;

    h3 {
        margin: 0 0 5px;
        color: #57352f;
        font-size: 21px;
    }

    p {
        margin: 0;
        color: #987f78;
        font-size: 13px;
    }
}

.m-cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-top: 18px;
}

.u-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    border: 1px solid #e6d2c4;
    border-radius: 11px;
    background: linear-gradient(135deg, #fffaf3, #f7e8d9);

    .u-card-img {
        width: 72px;
        height: 72px;
        flex: 0 0 auto;
        border-radius: 9px;
    }

    h4 {
        margin: 7px 0 5px;
        color: #633b33;
        font-size: 17px;
    }

    p {
        margin: 0;
        color: #8f736b;
        font-size: 13px;
        line-height: 1.6;
    }
}

@media screen and (max-width: 720px) {
    .u-head {
        align-items: stretch;
        flex-direction: column;
    }

    .m-cards {
        grid-template-columns: 1fr;
    }
}
</style>
