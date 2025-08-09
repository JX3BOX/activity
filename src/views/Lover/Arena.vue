<template>
    <div class="m-lover-arena" :style="containerStyle">
        <div class="m-page-title">
            <img class="u-img" :src="`${cdnLink}/design/event/lover/arena/title.png`" />
        </div>
        <div class="m-page-sections">
            <div class="m-area-desc">
                <div class="u-title">
                    比武规则
                    <img src="@/assets/img/rank/lover/sword.svg" alt="" />
                </div>
                <img class="u-box-girl" :src="`${cdnLink}/design/event/lover/arena/box_girl.png`" />
                <div class="u-desc">
                    <span class="u-desc-title">参赛资格：</span>全民皆可参与擂台挑战<br />
                    <span class="u-desc-title">比赛规则：</span>魔盒邀请正赛热度较高的选手作为初始擂主<br />
                    <span class="u-desc-title">挑战方式：</span
                    >通过直播间22练习房抢进，比赛地图随机，装备与配置不限<br />
                    <span class="u-desc-title">唯一目标：</span>使用一切手段终结擂主胜利<br />
                    <span class="u-desc-title">挑战时间：</span
                    >每日20:00-22:00。若擂主放弃守擂，赛事方将重新指定守擂选手<br />
                    <span class="u-desc-title">奖励规则：</span
                    >擂主根据守擂成功次数累计奖励，可自主选择档位或继续冲击更高奖励；若守擂失败则易位<br />
                </div>
            </div>
        </div>
        <div class="m-title">
            <img src="@/assets/img/rank/lover/jiangbei.svg" alt="" />
            <span>当前擂主</span>
        </div>
        <div class="m-current-reign">
            <div class="m-reign-header">
                <img src="@/assets/img/rank/lover/1st.svg" alt="" />
                <span>名字最长七个字</span>
                <img src="@/assets/img/rank/lover/meigui.svg" alt="" />
                <span>名字最长七个字</span>
            </div>
            <div class="m-reign-meta__wrapper">
                <div class="m-reign-meta">
                    <span class="u-data">15</span>
                    <span class="u-title">连胜场次</span>
                </div>
                <div class="m-reign-meta">
                    <span class="u-data">5</span>
                    <span class="u-title">守擂天数</span>
                </div>
                <div class="m-reign-meta">
                    <span class="u-data">10/15</span>
                    <span class="u-title">下一成就</span>
                </div>
            </div>
            <div class="m-reign-progress">
                <div class="u-desc">
                    <span>20胜成就：情比金坚</span>
                    <span>10/20场</span>
                </div>
                <el-progress class="u-progress" :percentage="50" :stroke-width="20" :show-text="false"></el-progress>
            </div>
        </div>
        <div class="m-title">
            <img src="@/assets/img/rank/lover/gongjian.svg" alt="" />
            <span>“逐影” 擂主</span>
        </div>
        <div class="m-reign-list">
            <div class="m-reign-item" v-for="item in [1, 2, 3, 4, 7, 8, 9]" :key="item">
                <div class="u-header">
                    <span>名字最长七个字</span>
                    <img src="@/assets/img/rank/lover/meigui.svg" alt="" />
                    <span>名字最长七个字</span>
                </div>
                <div class="u-data">
                    <img svg-inline src="@/assets/img/rank/lover/star.svg" alt="" />
                    当前连胜：15场
                </div>
                <div class="u-data">
                    <img svg-inline src="@/assets/img/rank/lover/star.svg" alt="" />
                    守擂开始：2023-10-10
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { getChallengeList } from "@/service/rank/lover";
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "LoverArena",
    components: {},
    props: {},
    data: () => ({ cdnLink, challengeList: [] }),
    computed: {
        currentEvent() {
            return this.$store.state.currentEvent || {};
        },
        containerStyle() {
            return {
                "--desc-bg": `url(${this.cdnLink}/design/event/lover/arena/desc_bg_1.png)`,
                "--bg-2": `url(${this.cdnLink}/design/event/lover/arena/bg_2.webp)`,
                "--bg-3": `url(${this.cdnLink}/design/event/lover/arena/bg_3.webp)`,
                "--reign": `url(${this.cdnLink}/design/event/lover/arena/reign_bg.webp)`,
                "--reign-hover": `url(${this.cdnLink}/design/event/lover/arena/reign_hover.webp)`,
            };
        },
        currentReign() {
            return this.challengeList.find((item) => item.status === 1);
        },
    },
    methods: {
        loadChallengeList() {
            getChallengeList({ _no_page: 1, pvp_event_id: this.currentEvent.id })
                .then((res) => {
                    this.challengeList = res.data.data.list || [];
                    console.log(cloneDeep(this.challengeList));
                })
                .catch((err) => {
                    console.error("获取擂台挑战列表失败", err);
                });
        },
    },
    mounted() {
        this.loadChallengeList();
    },
};
</script>

<style lang="less">
.m-lover-arena {
    .w(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;

    .m-page-title {
        padding-top: 40px;
        .u-img {
            .size(720px, 96px);
        }
    }

    .m-page-sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 64px;
        .w(1314px);
    }
    .m-title {
        .w(1314px);

        display: flex;
        align-items: center;
        font-size: 28px;
        line-height: 40.54px;
        color: rgba(255, 222, 184, 1);
        gap: 12px;

        .u-icon {
            .size(24px);
        }
    }
    .m-area-desc {
        box-sizing: border-box;
        .w(100%);
        border-radius: 4px;
        background: var(--bg-3);
        background-size: cover;

        display: flex;
        flex-direction: column;
        padding: 36px 36px 36px 36px;
        .pr;
        .u-title {
            display: flex;
            align-items: center;
            gap: 4px;

            font-size: 20px;
            font-weight: 700;
            line-height: 28.96px;
            color: rgba(255, 255, 255, 1);
            .mb(10px);

            img {
                .size(20px);
            }
        }

        .u-box-girl {
            .pa;
            .rt(0);
            .size(340px, 306px);
        }

        .u-desc {
            .fz(16px, 32px);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }

        .u-desc-title {
            font-weight: 500;
            color: rgba(255, 222, 184, 1);
        }
    }

    .m-current-reign {
        .w(1314px);
        box-sizing: border-box;
        border-radius: 4px;
        background: var(--bg-2);
        background-size: 100%;
        padding: 36px;

        display: flex;
        flex-direction: column;

        .m-reign-header {
            .fz(32px, 46.34px);
            display: flex;
            align-items: center;
            gap: 9px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            .mb(12px);
        }

        .m-reign-meta__wrapper {
            box-sizing: border-box;
            .size(265px, 83px);
            border-radius: 4px;
            background: rgba(74, 46, 13, 0.5);
            display: flex;
            padding: 12px;
            gap: 24px;
            .mb(48px);
        }

        .m-reign-meta {
            display: flex;
            flex-direction: column;
            align-items: center;

            .u-data {
                font-size: 24px;
                font-weight: 500;
                line-height: 34.75px;
                color: white;
            }
            .u-title {
                font-size: 16px;
                font-weight: 400;
                line-height: 23.17px;
                color: rgba(255, 222, 184, 1);
            }
        }

        .m-reign-progress {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .u-desc {
                display: flex;
                justify-content: space-between;

                font-size: 20px;
                font-weight: 400;
                line-height: 28.96px;
                color: rgba(255, 255, 255, 1);
            }

            .u-progress {
                .el-progress-bar__outer {
                    background-color: black !important;
                }
                .el-progress-bar__inner {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 236, 191, 1) 0%,
                        rgba(255, 255, 255, 1) 100%
                    ) !important;
                }
            }
        }
    }

    .m-reign-list {
        .w(1314px);
        display: flex;
        flex-wrap: wrap;
        gap: 21px 22px;
    }

    .m-reign-item {
        .w(646px);
        box-sizing: border-box;
        opacity: 1;
        border-radius: 4px;
        background: var(--reign);
        background-size: 100%;
        display: flex;
        flex-direction: column;
        padding: 36px;

        &:hover {
            background: var(--reign-hover);
            background-size: 100%;
        }

        .u-data {
            display: flex;
            align-items: center;
            gap: 3px;

            svg {
                .size(12px);
            }

            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 222, 184, 1);

            .mb(4px);
        }

        .u-header {
            .mb(36px);
            font-size: 20px;
            font-weight: 500;
            line-height: 28.96px;
            color: rgba(255, 255, 255, 1);

            display: flex;
            align-items: center;
            gap: 9px;

            img {
                .size(20px);
            }
        }
    }
}
</style>
