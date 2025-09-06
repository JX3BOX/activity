<template>
    <lover-layout>
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
                        <span class="u-desc-title">参赛资格：</span
                        >全民皆可参与擂台挑战，仅报名过的队伍挑战成功可成为擂主。<br />
                        <span class="u-desc-title">比赛规则：</span
                        >魔盒邀请正赛热度较高的选手作为初始擂主，比赛地图随机，装备与配置不限，客户端不限，唯一目标就是使用一切手段终结擂主胜利。比赛时间最长10分钟，时间结束未能有有效击杀但是靠赛点取胜的队伍按照胜利2场计算，其余情况按照1场计算。擂主连胜仅可被报名过的队伍终结，未报名队伍获胜仅可获得攻擂成功奖励。擂主每次易位后将重新计算连胜场次。消极对战、掉线、自绝经脉等情况均不计算连胜。<br />
                        <span class="u-desc-title">挑战方式：</span
                        >通过直播间或魔盒QQ机器人（指令：擂台赛）提供的22练习房房号抢进<br />
                        <span class="u-desc-title">唯一目标：</span>使用一切手段终结擂主胜利<br />
                        <span class="u-desc-title">挑战时间：</span
                        >每日20:00-22:00。若擂主放弃守擂，赛事方将重新指定守擂选手<br />
                        <span class="u-desc-title">奖励规则：</span
                        >擂主根据守擂成功次数累计奖励，可自主选择档位或继续冲击更高奖励。<br />
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
                    <span>{{ currentReign.event_record?.teammates_info?.[0]?.display_name || "-" }}</span>
                    <img src="@/assets/img/rank/lover/meigui.svg" alt="" />
                    <span>{{ currentReign.event_record?.teammates_info?.[1]?.display_name || "-" }}</span>
                </div>
                <div class="m-reign-meta__wrapper">
                    <div class="m-reign-meta">
                        <span class="u-data">{{ progressData.wins || 0 }}</span>
                        <span class="u-title">连胜场次</span>
                    </div>
                    <div class="m-reign-meta">
                        <span class="u-data">{{ currentReign.days || 0 }}</span>
                        <span class="u-title">守擂天数</span>
                    </div>
                    <div class="m-reign-meta">
                        <span class="u-data">{{ progressData.cur }}/{{ progressData.max }}</span>
                        <span class="u-title">下一成就</span>
                    </div>
                </div>
                <div class="m-reign-progress">
                    <div class="u-desc">
                        <span>{{ progressData.max }}胜奖励：{{ progressData.label }}</span>
                        <span>{{ progressData.cur }}/{{ progressData.max }}场</span>
                    </div>
                    <el-progress
                        class="u-progress"
                        :percentage="(progressData.cur / progressData.max) * 100"
                        :stroke-width="20"
                        :show-text="false"
                    ></el-progress>
                </div>
            </div>
            <div class="m-title">
                <img src="@/assets/img/rank/lover/gongjian.svg" alt="" />
                <span>“逐影” 擂主</span>
            </div>
            <div class="m-reign-list">
                <div class="m-reign-item" v-for="(item, index) in noCurrentReign" :key="index">
                    <div class="u-header">
                        <span>{{ item.event_record?.teammates_info?.[0]?.display_name || "-" }}</span>
                        <img src="@/assets/img/rank/lover/meigui.svg" alt="" />
                        <span>{{ item.event_record?.teammates_info?.[1]?.display_name || "-" }}</span>
                    </div>
                    <div class="u-data">
                        <img svg-inline src="@/assets/img/rank/lover/star.svg" alt="" />
                        连胜次数：{{ item.wins || 0 }}场
                    </div>
                    <div class="u-data">
                        <img svg-inline src="@/assets/img/rank/lover/star.svg" alt="" />
                        守擂开始：{{ dayjs(item?.reign_start_at).format("YYYY-MM-DD") }}
                    </div>
                </div>
            </div>
        </div>
    </lover-layout>
</template>

<script>
import { cloneDeep, keyBy, uniq, uniqBy } from "lodash";
import { getChallengeList, getJoinList, getSelectedList } from "@/service/rank/lover";
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
import dayjs from "dayjs";

export default {
    name: "LoverArena",
    components: {},
    props: {},
    data: () => ({
        cdnLink,
        challengeList: [],
        records: [],
        awards: [
            { count: 5, label: "双人各 5000 盒币" },
            { count: 10, label: "双人各 10000 盒币" },
            { count: 20, label: "双人各 20000 盒币 + 魔盒卓越称号“一生一世”" },
            { count: 30, label: "双人各 30000 盒币 + 魔盒卓越称号“情比金坚”" },
            { count: 50, label: "双人各 50000 盒币 + 魔盒稀世称号“神仙眷侣”" },
        ],
    }),
    computed: {
        progressData() {
            let currentProgress = this.currentReign.id
                ? this.awards.find((item) => this.currentReign.wins < item.count)
                : this.awards[0];
            if (!currentProgress) {
                currentProgress = { ...this.awards[this.awards.length - 1] };
                currentProgress.count = this.currentReign.wins;
            }
            return {
                cur: this.currentReign?.wins || 0,
                max: currentProgress.count,
                label: currentProgress.label,
            };
        },
        currentEvent() {
            return this.$store.getters.currentEvent || {};
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
            return this.renderChallengeList.find((item) => item.status === 1) || {};
        },
        noCurrentReign() {
            return this.renderChallengeList.filter((item) => item.status != 1);
        },
        renderChallengeList() {
            const result = [];
            const userMap = keyBy(uniqBy(this.records.map((r) => r.teammeta_user_list).flat(), "id"), "id");

            this.challengeList.forEach((_item) => {
                const item = {
                    ..._item,
                    event_record: {
                        ..._item.event_record,
                    },
                };
                if (item.event_record) {
                    item.event_record.teammates_info = uniq(item.event_record.teammates)
                        .map((id) => userMap[id] || null)
                        .filter(Boolean);
                }
                item.days = dayjs(item.reign_end_at || new Date()).diff(dayjs(item.reign_start_at), "day");
                result.push(item);
            });
            return result;
        },
    },
    methods: {
        dayjs,
        loadChallengeList() {
            getChallengeList({ _no_page: 1, pvp_event_id: this.currentEvent.id })
                .then((res) => {
                    this.challengeList = res.data.data.list || [];
                })
                .catch((err) => {
                    console.error("获取擂台挑战列表失败", err);
                });
        },
        async loadJoinList() {
            const [join, selected] = await Promise.all([
                getSelectedList(this.currentEvent.id),
                getJoinList(this.currentEvent.id, { _no_page: 1 }),
            ]);
            this.records = [...(join.data.data.list || []), ...(selected.data.data.list || [])];
        },
    },
    mounted() {
        this.loadChallengeList();
        this.loadJoinList();
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
            .rb(0);
            .size(340px, 306px);
        }

        .u-desc {
            .fz(16px, 32px);
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            width: calc(100% - 300px);
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
            .size(fit-content, 83px);
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
