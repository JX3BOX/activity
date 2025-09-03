<template>
    <div class="m-lover-process">
        <div class="m-page-title">
            <img class="u-img" :src="`${cdnLink}/design/event/lover/process/process_title.png`" />
        </div>
        <div class="m-process-wrapper">
            <div class="m-step" :class="`m-step-${round}`" v-for="round in [1, 2, 3, 4, 5]" :key="round">
                <img class="u-head" :src="headImage[round - 1]" alt="" />
                <div class="m-step-battles">
                    <LoverBattleItem
                        class="m-step-battle"
                        v-for="(process, index) in steps[round] || []"
                        :key="index"
                        :process="process"
                        @view-detail="viewDetail(process)"
                    />
                </div>
            </div>
            <div class="m-step m-step-6">
                <div class="u-head-empty"></div>
                <div class="m-step-winner" v-if="winner">
                    <img class="u-icon" :src="winner.images[0]" alt="" />
                    <span class="u-team-name">{{ winner.team_name }}</span>
                    <div class="u-user-names">
                        <span class="u-user-name" v-for="(user, index) in winner.teammates_info" :key="index">
                            {{ user.display_name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <LoverBattleDetail ref="battle-detail"></LoverBattleDetail>
    </div>
</template>

<script>
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
import { getSelectedList, getProcessListPublic } from "@/service/rank/lover";
import LoverBattleItem from "@/components/rank/lover/battle.vue";
import LoverBattleDetail from "@/components/rank/lover/battle_detail.vue";
import { groupBy, keyBy } from "lodash";

export default {
    name: "LoverProcess",
    components: { LoverBattleItem, LoverBattleDetail },
    data: () => ({
        cdnLink,
        process: [],
        records: [],
        headImage: [
            `${cdnLink}/design/event/lover/process/32_16.png`,
            `${cdnLink}/design/event/lover/process/16_8.png`,
            `${cdnLink}/design/event/lover/process/8_4.png`,
            `${cdnLink}/design/event/lover/process/4_2.png`,
            `${cdnLink}/design/event/lover/process/2_1.png`,
        ],
    }),
    provide() {
        // 使用函数的形式，可以访问到 `this`
        return {
            cdnLink: this.cdnLink,
            headImage: this.headImage,
        };
    },
    computed: {
        events() {
            return this.$store.state.events;
        },
        currentEvent() {
            return this.$store.state.event;
        },
        steps() {
            const result = groupBy(this.process, "round");
            for (let i = 1; i <= 5; i++) {
                const col = keyBy(result[i], "position");
                result[i] = [];
                const shouldProcesses = Math.pow(2, 5 - i);
                for(let j = 1; j <= shouldProcesses; j++) {
                    result[i][j - 1] = col[j] || null;
                }
            }
            return result;
        },
        winner() {
            const process = this.steps[5]?.[0];
            if (!process?.winner_id) return null;
            if (process.team1_id === process.winner_id) {
                return {
                    ...process.team1_record,
                    teammates_info: process.team1_teammates,
                };
            } else {
                return {
                    ...process.team2_record,
                    teammates_info: process.team2_teammates,
                };
            }
        },
    },
    methods: {
        loadProcess() {
            getProcessListPublic({
                event_id: this.currentEvent.id,
                round: -1,
            }).then((res) => {
                this.process = res.data.data || []; 
            });
        },
        loadRecords() {
            getSelectedList(this.currentEvent.id).then((res) => {
                this.records = keyBy(res.data.data.list || [], "id");
            });
        },
        viewDetail(process) {
            const p = structuredClone(process);
            p.team1_record.slogan = this.records[p.team1_id]?.slogan || "";
            p.team2_record.slogan = this.records[p.team2_id]?.slogan || "";
            this.$refs["battle-detail"].open(p);
        },

        load() {
            this.loadRecords();
            this.loadProcess();
        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
.m-lover-process {
    .w(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;

    --step-1-padding-top: 45px;
    --step-1-group-odd: 130px;
    --step-1-group-even: 48px;
    --step-1-curve-height: 234px;
    --step-1-line-top: 181px;

    --step-2-padding-top: 163px;
    --step-2-group-odd: 284px;
    --step-2-group-even: 284px;
    --step-2-curve-height: 388px;
    --step-2-line-top: 258px;

    --step-3-padding-top: 357px;
    --step-3-group-odd: 676px;
    --step-3-group-even: 672px;
    --step-3-curve-height: 780px;
    --step-3-line-top: 453px;

    --step-4-padding-top: 747px;
    --step-4-group-odd: 1456px;
    --step-4-curve-height: 1560px;
    --step-4-line-top: 844px;

    --step-5-padding-top: 1528px;
    --step-6-padding-top: 1520px;

    .m-page-title {
        padding-top: 40px;
        .u-img {
            .size(320px, 96px);
        }
    }

    .m-process-wrapper {
        box-sizing: border-box;
        .w(1627px);
        background: rgba(38, 8, 8, 0.25);
        display: flex;
        padding: 36px 48px 120px;
        gap: 52px;

        .m-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            .w(272px);

            .u-head {
                height: 39px;
            }

            .u-head-empty {
                height: 39px;
                width: 100%;
            }
        }

        .loop-step(@i) when (@i <= 4) {
            .m-step-@{i} {
                .m-step-battles {
                    padding-top: ~"var(--step-@{i}-padding-top)";
                }
                .m-step-battle:nth-of-type(2n + 1) {
                    margin-bottom: ~"var(--step-@{i}-group-odd)";
                    .pr;
                    &::after {
                        content: "";
                        .pa;
                        border-radius: 0 16px 16px 0;
                        border-width: 1px 1px 1px 0;
                        border-style: solid;

                        .rt(-24px, 64px);
                        .size(24px, ~"var(--step-@{i}-curve-height)");
                    }
                    &::before {
                        content: "";
                        .pa;
                        .size(24px, 1px);
                        .rt(-48px, ~"var(--step-@{i}-line-top)");
                        background-color: white;
                    }
                }
                // 仅第1~3步有even分组
                .m-step-battle:nth-of-type(2n):not(:last-of-type) when (@i <= 3) {
                    margin-bottom: ~"var(--step-@{i}-group-even)";
                }
            }
            .loop-step(@i + 1);
        }
        .loop-step(1);

        .m-step-5 {
            .m-step-battles {
                padding-top: var(--step-5-padding-top);
            }
        }

        .m-step-6 {
            padding-top: var(--step-6-padding-top);
        }

        .m-step-winner {
            display: flex;
            flex-direction: column;
            .size(175px, 140px);
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0.2);
            border-left: 4px solid #f3c768ff;
            gap: 4px;
            padding: 5px 0 0 6px;
            .pr;
            &::before {
                content: "";
                .pa;
                background-color: white;

                .lt(-54px, 70px);
                .size(48px, 1px);
            }

            .u-icon {
                .size(60px);
            }

            .u-team-name {
                .fz(16px, 23.17px);
                font-weight: 700;
            }

            .u-user-name {
                .fz(13px, 18.82px);
                font-weight: 400;
                color: rgba(255, 233, 199, 1);
            }

            .u-user-names {
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>
