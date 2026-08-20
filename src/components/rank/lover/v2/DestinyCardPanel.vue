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
                                <div v-if="slot.usage.length" class="m-use-details">
                                    <strong class="u-use-title">生效明细</strong>
                                    <div v-for="detail in slot.usage" :key="detail.key" class="u-use-detail">
                                        <span class="u-use-target">{{ detail.target }}</span>
                                        <span v-if="detail.mountId !== undefined" class="u-use-xinfa">
                                            <span>心法</span>
                                            <XinfaBadge :mount-id="detail.mountId" />
                                        </span>
                                        <span class="u-use-effect">{{ detail.effect }}</span>
                                    </div>
                                </div>
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
import { PZ_EQUIPMENT_SLOTS } from "@/utils/lover-v2-pz";
import FeatureBadge from "./FeatureBadge.vue";
import XinfaBadge from "./XinfaBadge.vue";

const EQUIPMENT_SLOT_LABELS = new Map(PZ_EQUIPMENT_SLOTS.map((slot) => [slot.value, slot.label]));
const EFFECT_LABELS = Object.freeze({
    none: "作为签面目标",
    disable_talent: "禁用奇穴",
    disable_talent_exact: "禁用具体奇穴",
    disable_equip_slot: "禁用装备部位",
    disable_skill: "禁用技能",
    remove_restriction: "解除限制",
});

export default {
    name: "LoverV2DestinyCardPanel",
    components: { FeatureBadge, XinfaBadge },
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
                    slots: Array.from({ length: Math.max(0, this.drawCountPerTeam) }, (_, index) => {
                        const draw = teamDraws[index] || null;
                        return { index, draw, usage: draw ? this.useDetails(draw) : [] };
                    }),
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
        member(userId) {
            return [...(this.match.team1?.members || []), ...(this.match.team2?.members || [])].find(
                (item) => Number(item.user_id) === Number(userId)
            );
        },
        memberLabel(userId) {
            const member = this.member(userId);
            const name = member?.display_name || member?.name || member?.nickname;
            return name ? `${name}（UID ${userId}）` : `UID ${userId}`;
        },
        effectValueLabel(requirement, value) {
            if (value && typeof value === "object") {
                const name = value.name || `奇穴 #${value.id}`;
                const tier = Number(value.tier);
                return Number.isInteger(tier) && tier > 0 ? `${name}（第 ${tier} 层）` : name;
            }
            const option = (requirement.effect?.options || []).find((item) => item.value === value);
            if (option?.label) return option.label;
            if (requirement.effect?.kind === "disable_equip_slot") {
                return EQUIPMENT_SLOT_LABELS.get(String(value)) || String(value);
            }
            return String(value);
        },
        effectLabel(requirement, subject) {
            const effect = requirement.effect || {};
            const label = EFFECT_LABELS[effect.kind] || effect.kind || "应用签面效果";
            const values = (subject?.values || []).map((value) => this.effectValueLabel(requirement, value));
            return values.length ? `${label}：${values.join("、")}` : label;
        },
        useDetails(draw) {
            if (!this.isUsed(draw)) return [];
            const requirements = draw.target_payload?.requirements || [];
            if (!requirements.length) {
                return [{ key: `${draw.id}-automatic`, target: "无需选择目标", effect: "抽取后自动生效" }];
            }
            return requirements.flatMap((requirement, requirementIndex) => {
                const side = requirement.target === "self" ? "本方" : "对方";
                const selection = draw.target_payload.selections.find(
                    (item) => Number(item.requirement_index) === requirementIndex
                );
                if (!selection?.subjects?.length) {
                    return [
                        {
                            key: `${draw.id}-${requirementIndex}-skipped`,
                            target: `${side}未选择目标`,
                            effect: "可选效果已跳过",
                        },
                    ];
                }
                return selection.subjects.map((subject, subjectIndex) => ({
                    key: `${draw.id}-${requirementIndex}-${subject.user_id}-${subjectIndex}`,
                    target: `${side} · ${this.memberLabel(subject.user_id)}`,
                    mountId: this.member(subject.user_id)?.mount_id ?? null,
                    effect: this.effectLabel(requirement, subject),
                }));
            });
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

.m-use-details {
    margin-top: 12px;
    padding: 10px;
    border: 1px solid #e2c8b8;
    border-radius: 8px;
    background: rgba(255, 250, 242, 0.9);
    text-align: left;
}

.u-use-title,
.u-use-target,
.u-use-effect {
    display: block;
}

.u-use-title {
    margin-bottom: 7px;
    color: #6f443b;
    font-size: 12px;
}

.u-use-detail + .u-use-detail {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed #e4d1c5;
}

.u-use-target {
    color: #8b6259;
    font-size: 12px;
    line-height: 1.5;
}

.u-use-xinfa {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    color: #8b6259;
    font-size: 12px;
}

.u-use-effect {
    margin-top: 2px;
    color: #a14439;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.5;
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
