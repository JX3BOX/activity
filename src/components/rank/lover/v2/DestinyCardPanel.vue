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
        <div class="m-team-groups">
            <section v-for="group in teamGroups" :key="group.team.id" class="u-team-group">
                <header class="u-team-head">
                    <span>{{ group.side }}队天命签</span>
                    <strong>{{ group.team.name }}</strong>
                </header>
                <div class="m-team-cards">
                    <article
                        v-for="slot in group.slots"
                        :key="`${group.team.id}-${slot.index}`"
                        class="u-card"
                        :class="{ 'is-empty': !slot.draw }"
                    >
                        <el-image
                            class="u-card-img"
                            :src="slot.draw?.card?.img || cardBackImg"
                            fit="contain"
                            :alt="slot.draw?.card?.name || `${group.team.name}待抽取的天命签`"
                        />
                        <div class="u-card-copy">
                            <span class="u-draw-no">第 {{ slot.index + 1 }} 签</span>
                            <h4>{{ slot.draw?.card?.name || "等待揭签" }}</h4>
                            <p>{{ slot.draw?.card?.desc || "本队尚未抽取这一签" }}</p>
                            <template v-if="slot.draw">
                                <el-button
                                    v-if="canUseDraw(slot.draw)"
                                    class="u-use"
                                    type="primary"
                                    size="small"
                                    @click="$emit('use', slot.draw)"
                                >
                                    选择目标并使用
                                </el-button>
                                <el-tag
                                    v-else
                                    class="u-use"
                                    :type="isUsed(slot.draw) ? 'success' : 'warning'"
                                    effect="plain"
                                >
                                    {{ isUsed(slot.draw) ? "已经生效" : "等待本队队长使用" }}
                                </el-tag>
                            </template>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";
import FeatureBadge from "./FeatureBadge.vue";

export default {
    name: "LoverV2DestinyCardPanel",
    components: { FeatureBadge },
    emits: ["draw", "use"],
    props: {
        draws: { type: Array, default: () => [] },
        match: { type: Object, required: true },
        canDraw: { type: Boolean, default: false },
        canUse: { type: Boolean, default: false },
        ownTeamId: { type: Number, default: 0 },
        drawCountPerTeam: { type: Number, default: 0 },
        loading: { type: Boolean, default: false },
    },
    data: function () {
        return {
            cardBackImg: `${jx3boxData.__cdn}design/event/lover/q0.png`,
        };
    },
    computed: {
        teamGroups() {
            return [
                { side: "A", team: this.match.team1 || {} },
                { side: "B", team: this.match.team2 || {} },
            ].map((group) => {
                const teamDraws = this.draws
                    .filter((draw) => Number(draw.team_id) === Number(group.team.id))
                    .sort((left, right) => Number(left.draw_no || left.id) - Number(right.draw_no || right.id))
                    .slice(0, 2);
                return {
                    ...group,
                    slots: Array.from({ length: Math.max(0, this.drawCountPerTeam) }, (_, index) => ({
                        index,
                        draw: teamDraws[index] || null,
                    })),
                };
            });
        },
    },
    methods: {
        isUsed(draw) {
            return Array.isArray(draw?.target_payload?.selections);
        },
        canUseDraw(draw) {
            return this.canUse && Number(draw?.team_id) === Number(this.ownTeamId) && !this.isUsed(draw);
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

.m-team-groups {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
    margin-top: 18px;
}

.u-team-group {
    min-width: 0;
    padding: 18px;
    border: 1px solid #e6d2c4;
    border-radius: 13px;
    background: rgba(255, 250, 243, 0.68);
}

.u-team-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ead8cc;
    color: #8e6258;

    span {
        font-size: 13px;
        letter-spacing: 0.12em;
    }

    strong {
        overflow: hidden;
        color: #57352f;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.m-team-cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
}

.u-card {
    display: flex;
    align-items: center;
    min-width: 0;
    flex-direction: column;
    padding: 16px 12px;
    border: 1px solid #ead8cc;
    border-radius: 11px;
    background: linear-gradient(155deg, #fffdf8, #f8eadb);
    text-align: center;

    .u-card-img {
        width: min(100%, 128px);
        aspect-ratio: 2 / 5;
        border-radius: 8px;
        filter: drop-shadow(0 8px 12px rgba(93, 49, 40, 0.14));
    }

    h4 {
        margin: 7px 0 6px;
        color: #633b33;
        font-size: 18px;
    }

    p {
        margin: 0;
        color: #8f736b;
        font-size: 12px;
        line-height: 1.7;
    }

    &.is-empty {
        .u-card-img {
            opacity: 0.62;
            filter: sepia(0.15) drop-shadow(0 8px 12px rgba(93, 49, 40, 0.1));
        }
    }
}

.u-card-copy {
    width: 100%;
    margin-top: 12px;
}

.u-draw-no {
    display: block;
    color: #aa7a6b;
    font-size: 11px;
    letter-spacing: 0.12em;
}

.u-use {
    margin-top: 12px;
}

@media screen and (max-width: 980px) {
    .m-team-groups {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 720px) {
    .u-head {
        align-items: stretch;
        flex-direction: column;
    }

    .u-team-group {
        padding: 14px;
    }

    .m-team-cards {
        gap: 10px;
    }

    .u-card {
        padding: 12px 8px;

        .u-card-img {
            width: min(100%, 104px);
        }
    }
}
</style>
