<template>
    <div class="p-lover-draw" :style="containerStyle">
        <div class="m-container">
            <img class="m-title" :src="`${cdnLink}design/event/lover/draw_title.png`" alt="title" />
            <div class="m-subtitle">
                <span class="u-title">说明</span>
                <span>共32支参赛队伍将被随机分为16组进行对决，首轮32进16采用BO1的单败赛制。</span>
            </div>
            <div class="m-draw-wrapper">
                <div class="m-team-list">
                    <div
                        class="m-team-item"
                        :class="{ 'is-shuffle': team._is_shuffle }"
                        v-for="(team, index) in selectedTeams"
                        ref="team"
                        :key="index"
                        :style="teamStyle(index)"
                    >
                        <img class="u-icon" :src="team.images[0]" alt="" />
                        <span class="u-name">{{ team.team_name }}</span>
                        <div class="u-detail-btn">详 情</div>
                    </div>
                    <div class="u-anchor"></div>
                </div>
                <div class="m-group-list" v-if="groups.length">
                    <div
                        class="m-group-item"
                        :class="{
                            'is-show-wrap': group.show,
                            'is-selected': group.is_selected,
                        }"
                        ref="group"
                        v-for="(group, index) in groups"
                        :key="index"
                    >
                        <!-- 邪恶的光 -->
                        <img class="u-evil" :src="`${cdnLink}design/event/lover/vs_flame.png`" alt="" />
                        <!-- 星星点点 -->
                        <img class="u-star" :src="`${cdnLink}design/event/lover/star1.png`" alt="" />
                        <!-- vs -->
                        <img class="u-vs" :src="`${cdnLink}design/event/lover/vs.png`" alt="" />
                        <div class="m-group-teams">
                            <div class="m-group-team" v-for="team in group.teams" :key="team.id" :data-id="team.id">
                                <img class="u-icon" :src="team.images[0]" alt="" />
                                <span class="u-name">{{ team.team_name }}</span>
                                <div class="u-detail-btn">详 情</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-actions">
                <div class="u-draw-button" :class="{ 'is-disabled': disableButton }" @click="onDraw"></div>
                <div class="u-reset-button" @click="onReset"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
import { getSelectedList, batchCreateProcess } from "@/service/rank/lover";
import { shuffle, chunk, sortBy } from "lodash";
import { wait } from "@/utils/animation";

// const cdnLink = "https://oss.jx3box.com/";

export default {
    name: "",
    components: {},
    props: {},
    data: () => ({
        cdnLink,

        selectedTeams: [],
        groups: [],
        /**
         * 0. 页面刚进入的时候，展示队伍列表
         * 1. 第一次点击抽取后，把队伍都收到中间偏下，播放一下洗牌的效果
         * 2. 第2-5次点击抽取，每次从groups里抽出4组，放到groups容器里（移动效果
         */
        step: 0,
        currentGroupColumn: 0,
        disableButton: false,
    }),
    computed: {
        events() {
            return this.$store.state.events;
        },
        currentEvent() {
            return this.$store.state.event;
        },
        containerStyle() {
            const result = {
                "--background-image": `url(${cdnLink}design/event/lover/bg.webp)`,
                "--draw-image": `url(${cdnLink}design/event/lover/open0.png)`,
                "--draw-image-hover": `url(${cdnLink}design/event/lover/open1.png)`,
                "--reset-image": `url(${cdnLink}design/event/lover/reset.png)`,
                "--reset-image-hover": `url(${cdnLink}design/event/lover/reset_hover.png)`,
            };

            return result;
        },
    },
    watch: {
        "$route.params.slug": {
            immediate: true,
            handler(newVal) {
                this.slug = newVal;
            },
        },
        "currentEvent.id": {
            immediate: true,
            deep: true,
            handler() {
                this.loadTeams();
            },
        },
    },
    methods: {
        onClickDraw() {
            if (this.disableButton) return;
            this.onDraw();
        },
        async onDraw() {
            if (this.step === 0) {
                this.disableButton = true;
                // 先分好组
                const shuffled = shuffle(this.selectedTeams);
                this.groups = chunk(shuffled, 2).map((pair) => ({
                    is_selected: false,
                    show: false,
                    teams: pair,
                }));
                // 排序teams
                this.selectedTeams = sortBy(this.selectedTeams, (team) => {
                    const groupIndex = this.groups.findIndex((g) => g.teams.includes(team));
                    const index = this.groups[groupIndex].teams.indexOf(team);
                    return groupIndex * 2 + index;
                });
                this.step = 1;
                // 播放动画
                await this.playStep1();
                await wait(500); // 等待动画结束
                this.onDraw(); // 触发下一步
            } else if (this.step === 1) {
                // 播放第二步动画
                await this.playStep2().finally(() => {
                    this.currentGroupColumn++;
                });
                if (this.currentGroupColumn === 4) {
                    this.step = 2; // 如果所有组都展示了，进入下一步
                    this.disableButton = false;
                } else {
                    await wait(500); // 等待动画结束
                    this.onDraw(); // 继续抽取下一组
                }
            } else if (this.step === 2) {
                this.$confirm("确定保存并应用当前的抽签结果吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.saveResult();
                });
            }
        },
        teamStyle(index) {
            const result = {};
            if (!this.$refs.team?.length) return;
            const el = this.$refs.team[index];
            const team = this.selectedTeams[index];
            const { offsetLeft, offsetTop } = el;
            if (team._left || team._top) {
                const { _top, _left } = team;
                result["transform"] = `translate(${_left - offsetLeft}px, ${_top - offsetTop}px)`;
            }
            if (team._z) {
                result["z-index"] = team._z;
            }
            if (team._show === false) {
                result["opacity"] = 0;
                result["pointer-events"] = "none";
            }
            return result;
        },
        async playStep1() {
            // 1. 将所有的队伍收到1号点
            this.selectedTeams.forEach((team, index) => {
                this.$set(team, "_top", 504);
                this.$set(team, "_left", 500);
                this.$set(team, "_is_shuffle", true);
            });
            await wait(500);
            // 2. 原地播放两次上下的洗牌动画
            this.selectedTeams.forEach((team, index) => {
                setTimeout(async () => {
                    this.$set(team, "_top", 324);
                    await wait(100);
                    this.$set(team, "_top", 504);
                }, index * 25);
            });
            await wait(1000);
            this.selectedTeams.forEach((team, index) => {
                setTimeout(async () => {
                    this.$set(team, "_top", 324);
                    await wait(100);
                    this.$set(team, "_top", 504);
                }, index * 25);
            });
            await wait(900);

            // 根据groups中的顺序修改z-index
            this.selectedTeams.forEach((team) => {
                const groupIndex = this.groups.findIndex((group) => group.teams.some((t) => t.id === team.id));
                const indexInGroup = this.groups[groupIndex].teams.indexOf(team);
                const z = 32 - groupIndex * 2 - indexInGroup;
                this.$set(team, "_z", z);
                this.$set(team, "_is_shuffle", false);
            });
            // 3. 所有队伍再往下移动40px，发牌就绪，等待点击
            this.selectedTeams.forEach((team) => {
                this.$set(team, "_top", 564);
            });
        },
        async playStep2() {
            // 从groups抽出4组，每组50s
            const groupsToShow = this.groups.slice(this.currentGroupColumn * 4, this.currentGroupColumn * 4 + 4);

            groupsToShow.forEach((group, index) => {
                setTimeout(async () => {
                    // 计算该group的两个teams的位置，将team元素移动过去
                    const groupEl = this.$refs.group[this.currentGroupColumn * 4 + index];
                    // 逐个队伍移动到group里的team的位置
                    group.teams.forEach((team) => {
                        const groupTeamEl = groupEl.querySelector(`.m-group-team[data-id="${team.id}"]`);
                        const targetLeft = groupEl.offsetLeft + groupTeamEl.offsetLeft + 1;
                        const targetTop = groupEl.offsetTop + groupTeamEl.offsetTop + 1;
                        this.$set(team, "_top", targetTop);
                        this.$set(team, "_left", targetLeft);
                    });
                    await wait(500);
                    // 展示group的背景
                    group.is_selected = true;
                    group.show = true;
                    // 展示vs
                    // 不再显示team
                    group.teams.forEach((team) => {
                        this.$set(team, "_show", false);
                    });
                }, index * 200);
            });
            await wait(700);
        },
        onReset() {
            if (this.disableButton) return;
            this.selectedTeams = sortBy(this.selectedTeams, "_index");
            this.selectedTeams.forEach((team) => {
                this.$set(team, "_show", undefined);
                this.$set(team, "_top", undefined);
                this.$set(team, "_left", undefined);
                this.$set(team, "_z", undefined);
                this.$set(team, "_is_shuffle", undefined);
            });
            this.currentGroupColumn = 0;
            this.groups = [];
            this.step = 0;
        },
        loadTeams() {
            getSelectedList(this.currentEvent.id).then((res) => {
                this.selectedTeams = (res.data.data.list || []).map((team, index) => ({
                    _index: index,
                    ...team,
                }));
                console.log("Selected teams loaded:", this.selectedTeams);
            });
        },
        saveResult() {
            let round = 1;
            let position = 1;
            const result = this.groups.map((group) => {
                return {
                    event_id: this.currentEvent.id,
                    round,
                    position: position++,
                    team1_id: group.teams[0]?.id,
                    team2_id: group.teams[1]?.id,
                };
            }).filter((item) => item.team1_id && item.team2_id);
            batchCreateProcess(result)
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: "赛程已保存！",
                    });
                    this.disableButton = true;
                })
                .catch((error) => {
                    this.$message.error("保存赛程失败，请稍后再试。");
                    console.error("Error saving process:", error);
                });
        },
    },
};
</script>

<style lang="less">
.p-lover-draw {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1200px;
    min-height: 696px;
    overflow-y: auto;
    height: 100vh;
    width: 100vw;

    background-size: cover;
    background-image: var(--background-image);

    .m-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .m-title {
        .size(480px, 120px);
        .mb(17px);
    }

    .m-subtitle {
        .r(8px);
        background: linear-gradient(90deg, rgba(44, 24, 24, 1) 0%, rgba(44, 24, 24, 0) 100%);
        display: flex;
        gap: 4px;
        padding: 17px 8px;

        .fz(12px, 17.38px);
        color: #f0dac2ff;
        text-align: left;
        vertical-align: top;
        .mb(10px);

        .u-title {
            .r(2px);
            background: linear-gradient(90deg, rgba(217, 188, 154, 1) 0%, rgba(250, 229, 187, 1) 100%);
            padding: 0px 8px 0px 8px;

            .fz(12px, 17.38px);
            font-weight: 700;
            color: rgba(73, 41, 37, 1);
        }
    }

    .m-draw-wrapper {
        .pr;
        box-sizing: border-box;
        .size(1232px, 570px);
        border-radius: 10.05px;
        background: linear-gradient(227.33deg, #632323cc 0%, #3b1e11cc 100%);

        border: 1px solid #d1ac91ff;
        .mb(30px);
    }

    .team {
        display: flex;
        gap: 6px;
        align-items: center;
        .size(220px, 40px);
        box-sizing: border-box;
        border-left: 4px solid #f3c768ff;
        padding: 5px 11px 5px 6px;

        background: linear-gradient(90deg, #f3c76800 6.24%, #f3c768ff 100%),
            linear-gradient(90deg, #f3c76800 37.5%, #f3c768ff 100%);

        .u-icon {
            .size(30px);
        }

        .u-name {
            .fz(16px, 23.17px);
            color: white;
            flex-grow: 1;
            min-width: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .u-detail-btn {
            .fz(12px, 17.38px);
            background: #ffe8c4ff;
            border: 1px solid #c7b26fff;
            color: rgba(128, 100, 77, 1);
            padding: 0px 2px;
            flex-shrink: 0;
            .pointer;
        }
    }

    .m-group-list {
        .pa;
        .lt(0px);
        .size(100%, 100%);
        padding: 34px 20px;
        gap: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .m-group-item {
        .pr;
        .size(283px, 110px);
        box-sizing: border-box;
        padding: 12px 14px 12px 50px;
        border: 1px solid rgba(117, 81, 57, 1);
        border-radius: 5px;
        background: rgba(94, 50, 49, 1);
        transition: all 0.5s ease;

        &:not(.is-selected) {
            opacity: 0;
            pointer-events: none;
        }

        &:not(.is-show-wrap) {
            background: transparent;
            border: none;

            &.u-vs {
                display: none;
            }
        }

        .u-vs {
            .pa;
            .size(25px, 21px);
            .lt(14px, 45px);
            pointer-events: none;
            transition: all 0.5s ease;
        }

        .u-star {
            .pa;
            .lt(0);
            .size(100%);
            pointer-events: none;
            opacity: 0;
            transition: all 0.3s ease;
        }

        .u-evil {
            .pa;
            .lt(0);
            .size(89px, 109px);
            pointer-events: none;
            opacity: 0;
            transition: all 0.3s ease;
        }

        &.is-show-wrap:hover,
        &.is-highlight {
            .u-star,
            .u-evil {
                opacity: 1;
            }
        }
    }

    .m-group-teams {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .m-group-team {
        .team;
    }

    .m-team-list {
        .pr;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 28px 90px;
        padding: 26px 40px;
        box-sizing: border-box;
        .size(100%);
    }

    .m-team-item {
        .team;

        &.is-shuffle {
            .u-icon,
            .u-name {
                filter: blur(3px);
            }
            .u-detail-btn {
                display: none;
            }
        }

        transition: all 0.5s ease;
    }

    .m-actions {
        .pr;
        .u-draw-button {
            .pointer;
            .size(285px, 80px);
            box-sizing: border-box;
            background-image: var(--draw-image);
            background-size: cover;
            filter: drop-shadow(0px -30px 40px rgba(38, 27, 25, 0.5));

            &:hover,
            &.is-disabled {
                background-image: var(--draw-image-hover);
            }
        }

        .u-reset-button {
            .pa;
            .pointer;
            .size(140px, 50px);
            top: 16px;
            left: 360px;
            box-sizing: border-box;
            background-image: var(--reset-image);
            background-size: cover;
            filter: drop-shadow(0px -30px 40px rgba(38, 27, 25, 0.5));

            &:hover,
            &.is-disabled {
                background-image: var(--reset-image-hover);
            }
        }
    }
}
</style>
