<template>
    <section class="c-lover-roster">
        <div class="u-summary">
            <div>
                <strong>{{ team.member_count || team.members?.length || 0 }} / {{ expectedMemberCount }} 人</strong>
                <span>当前治疗 {{ team.healer_count || 0 }} 人</span>
            </div>
            <el-tag :type="formationTagType" size="large">
                {{ formationStatusMap[team.formation_status] || team.formation_status }}
            </el-tag>
        </div>
        <div class="m-slots">
            <article v-for="slot in team.slots" :key="slot.type" class="u-slot">
                <div class="u-slot-head">
                    <FeatureBadge :name="slot.type" small />
                    <div>
                        <strong>{{ registrationTypeMap[slot.type] }}</strong>
                        <span>{{ slot.current }} / {{ slot.required }} 组</span>
                    </div>
                </div>
                <div v-if="slot.units?.length" class="m-units">
                    <div v-for="unit in slot.units" :key="unit.id" class="u-unit">
                        <div class="u-unit-head">
                            <div>
                                <strong>{{ unitLabel(unit.type) }}</strong>
                                <span>{{ unitMembersLabel(unit) }}</span>
                            </div>
                            <el-button
                                v-if="removableUnitIds.includes(Number(unit.id))"
                                text
                                type="danger"
                                size="small"
                                :loading="Number(removingUnitId) === Number(unit.id)"
                                :disabled="removingUnitId !== null"
                                @click="$emit('remove-unit', unit)"
                            >
                                解除归属
                            </el-button>
                        </div>
                        <div v-for="member in unit.members" :key="member.user_id" class="u-unit-member">
                            <UserIdentity :user="member" compact />
                            <IntroductionText v-if="member.introduction" :text="member.introduction" compact />
                        </div>
                    </div>
                </div>
                <div v-else class="u-empty-slot">
                    <span>等待补齐</span>
                    <small>{{ emptyHint(slot.type) }}</small>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
import FeatureBadge from "./FeatureBadge.vue";
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";
import {
    formationStatusMap,
    registrationTypeMap,
} from "@/utils/lover-v2";

export default {
    name: "LoverV2TeamRoster",
    components: { FeatureBadge, IntroductionText, UserIdentity },
    emits: ["remove-unit"],
    props: {
        team: { type: Object, required: true },
        removableUnitIds: { type: Array, default: () => [] },
        removingUnitId: { type: [Number, String], default: null },
    },
    data: function () {
        return { formationStatusMap, registrationTypeMap };
    },
    computed: {
        expectedMemberCount() {
            return (this.team.slots || []).reduce((total, slot) => {
                const size = slot.type === "solo" ? 1 : 2;
                return total + Number(slot.required || 0) * size;
            }, 0);
        },
        formationTagType() {
            return {
                building: "warning",
                complete: "success",
                locked: "danger",
                withdrawn: "info",
            }[this.team.formation_status];
        },
    },
    methods: {
        unitLabel(type) {
            return {
                lover: "情缘组合",
                mate: "搭子队",
                solo: "独狼席位",
            }[type];
        },
        unitMembersLabel(unit) {
            const names = (unit.members || []).map((member) => member.display_name).filter(Boolean);
            return names.length ? names.join(" · ") : "成员资料待同步";
        },
        emptyHint(type) {
            return {
                lover: "情缘核心尚未建立",
                mate: "去组队大厅邀请完整搭子队",
                solo: "由情缘队长开启独狼盲盒",
            }[type];
        },
    },
};
</script>

<style scoped lang="less">
.u-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 18px;
    border-bottom: 1px solid #eadbd1;

    strong,
    span {
        display: block;
    }

    strong {
        color: #56342f;
        font-size: 22px;
    }

    span {
        margin-top: 4px;
        color: #9a817a;
        font-size: 13px;
    }
}

.m-slots {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-top: 20px;
}

.u-slot {
    min-width: 0;
    padding: 16px;
    border: 1px solid #ead9cf;
    border-radius: 12px;
    background: #fffaf5;
}

.u-slot-head {
    display: flex;
    align-items: center;
    gap: 8px;

    strong,
    span {
        display: block;
    }

    strong {
        color: #57352f;
        font-size: 16px;
    }

    span {
        margin-top: 4px;
        color: #9d847d;
        font-size: 12px;
    }
}

.m-units {
    display: grid;
    gap: 10px;
    margin-top: 14px;
}

.u-unit {
    display: grid;
    gap: 10px;
    padding: 12px;
    border-radius: 9px;
    background: #fff;
}

.u-unit-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #9b8179;
    font-size: 12px;

    strong,
    span {
        display: block;
    }

    strong {
        color: #76564e;
        font-size: 13px;
    }

    span {
        margin-top: 3px;
    }
}

.u-unit-member {
    display: grid;
    gap: 7px;
}

.u-empty-slot {
    display: flex;
    min-height: 112px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 14px;
    border: 1px dashed #d9bfb1;
    border-radius: 9px;
    color: #986c60;

    small {
        margin-top: 5px;
        color: #b39b94;
        text-align: center;
    }
}

@media screen and (max-width: 920px) {
    .m-slots {
        grid-template-columns: 1fr;
    }
}
</style>
