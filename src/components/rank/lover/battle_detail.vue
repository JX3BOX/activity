<template>
    <el-dialog :visible="visible" custom-class="m-lover-battle-detail__dialog" :show-close="false" append-to-body>
        <template #title>
            <div class="m-detail-header" v-if="renderProcess">
                <div
                    class="m-team-info"
                    v-for="(team, index) in [renderProcess.team1_record, renderProcess.team2_record]"
                    :class="{ 'is-reverse': index === 0 }"
                    :key="index"
                >
                    <img class="u-team-icon" :src="team.images[0]" alt="" />
                    <div class="m-team-section">
                        <div class="m-team-name">
                            <span class="u-name">{{ team.team_name }}</span>
                            <span class="u-live">进入直播间</span>
                        </div>
                        <div class="m-team-mates">
                            <span v-for="(user, index) in team.teammates_info" :key="index">{{
                                user.display_name
                            }}</span>
                        </div>
                    </div>
                    <img
                        class="u-card"
                        v-if="process[`team${index + 1}_card`]"
                        :src="cardLink(process[`team${index + 1}_card`])"
                    />
                </div>
                <div class="u-center-vs">
                    <img class="u-vs" :src="`${cdnLink}design/event/lover/vs.png`" alt="" />
                    <img class="u-round" v-if="process" :src="headImage[process.round - 1]" alt="" />
                </div>
            </div>
            <el-button class="el-dialog__headerbtn" type="text" @click="visible = false">
                <img src="@/assets/img/rank/lover/close.svg" svg-inline alt="" />
            </el-button>
            <div class="u-bottom-border"></div>
        </template>
        <div class="m-detail-pz">
            <div class="m-detail-team"></div>
        </div>
    </el-dialog>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
    name: "LoverBattleDetail",
    components: {},
    props: {},
    inject: ["cdnLink", "headImage"],
    data: () => ({
        visible: false,
        process: null,
    }),
    computed: {
        renderProcess() {
            if (!this.process) return null;
            const result = cloneDeep(this.process);
            result.team1_record = {
                ...(result.team1_record || {}),
                teammates_info: result.team1_teammates || [],
            };
            result.team2_record = {
                ...(result.team2_record || {}),
                teammates_info: result.team2_teammates || [],
            };
            return result;
        },
    },
    methods: {
        cardLink(id) {
            return `${this.cdnLink}design/event/lover/q${id}_small.png`;
        },
        open(process) {
            this.visible = true;
            this.process = process;
            console.log("open process", this.process);
        },
    },
};
</script>

<style lang="less">
.m-lover-battle-detail__dialog {
    .w(1314px);
    box-sizing: border-box;
    border: 2px solid #f3c768ff;
    border-top: 10px solid #f3c768ff;
    background: rgba(105, 63, 51, 1);

    .el-dialog__header {
        .pr;
        padding: 10px 62px 0 62px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .u-bottom-border {
            .size(800px, 2px);
            background: linear-gradient(
                90deg,
                rgba(242, 199, 104, 0) 0%,
                rgba(243, 199, 104, 1) 25.88%,
                rgba(243, 199, 104, 0.96) 74.33%,
                rgba(243, 199, 104, 0) 100%
            );
        }
    }
    .el-dialog__headerbtn {
        .pa;
        .rt(12px);
        .size(40px);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        color: rgba(243, 199, 104, 1);

        span {
            line-height: 0;
        }
    }
    .m-detail-header {
        box-sizing: border-box;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(74, 40, 30, 1) 50%, rgba(0, 0, 0, 0) 100%);
        .size(100%, 92px);
        justify-content: center;
        align-items: center;
        gap: 20px;
        .pr;
        display: flex;
        justify-content: space-between;

        .u-center-vs {
            .pa;
            top: 14px;
            left: 553px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .size(80px, 64px);
        }

        .u-vs {
            .size(48px, 40px);
        }

        .u-round {
            max-height: 36px;
        }
    }
    .m-team-info {
        display: flex;
        align-items: center;
        width: 534px;
        height: 68px;
        gap: 12px;

        .u-team-icon {
            .size(64px);
        }

        .u-card {
            .size(40px, 64px);
        }

        &.is-reverse {
            &,
            .m-team-name,
            .m-team-mates {
                flex-direction: row-reverse;
            }
        }
    }
    .m-team-section {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .m-team-name {
        display: flex;
        align-items: center;
        gap: 12px;

        .u-name {
            .fz(28px, 40.54px);
            font-weight: 700;
            color: white;
        }
        .u-live {
            height: 22px;
            box-sizing: border-box;
            .r(4px);
            border: 1px solid rgba(243, 199, 104, 1);
            color: rgba(243, 199, 104, 1);
            padding: 2px 4px;

            .fz(12px, 17.38px);
            font-weight: 700;

            &.is-no-start {
                color: rgba(166, 166, 166, 1);
            }

            &:not(.is-no-start) {
                cursor: pointer;
                &:hover {
                    background: white;
                }
            }
        }
    }
    .m-team-mates {
        display: flex;
        align-items: center;
        gap: 12px;

        .fz(18px, 26.06px);
        font-weight: 400;
        color: rgba(255, 232, 204, 1);
    }
}
</style>
