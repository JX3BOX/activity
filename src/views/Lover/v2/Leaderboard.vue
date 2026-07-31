<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>江湖榜单</h2>
                <p>赛后数据经运营复核后集中更新，见证每一份锋芒与坚守。</p>
            </div>
        </section>

        <section class="m-leaderboard m-lover-v2-panel" v-loading="loading">
            <el-tabs v-if="definitions.length" v-model="activeKey" @tab-change="loadEntries">
                <el-tab-pane
                    v-for="item in definitions"
                    :key="item.key"
                    :name="item.key"
                    :label="item.name"
                />
            </el-tabs>

            <template v-if="activeDefinition">
                <header class="m-board-heading">
                    <div>
                        <h3>{{ activeDefinition.name }}</h3>
                        <p>{{ activeDefinition.description || "每场战斗的数据都会汇入这份江湖名录。" }}</p>
                    </div>
                    <el-tag effect="plain">{{ scoreLabel }}</el-tag>
                </header>

                <div v-if="entries.length" class="m-ranking-list">
                    <article
                        v-for="item in entries"
                        :key="item.user_id"
                        class="u-ranking"
                        :class="`is-rank-${item.rank}`"
                    >
                        <strong class="u-rank">{{ rankText(item.rank) }}</strong>
                        <a
                            class="u-player"
                            :href="`https://www.jx3box.com/author/${item.user_id}`"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <el-avatar :size="54" :src="item.avatar || defaultAvatar" />
                            <span>
                                <b>{{ item.display_name || `侠士 ${item.user_id}` }}</b>
                                <small>UID {{ item.user_id }}</small>
                            </span>
                        </a>
                        <div class="u-metrics">
                            <span
                                v-for="metric in visibleMetrics(item)"
                                :key="metric.key"
                            >{{ metric.label }} {{ metric.value }}</span>
                        </div>
                        <strong class="u-score">{{ formatScore(item.score) }}</strong>
                    </article>
                </div>
                <EmptyState
                    v-else-if="!loading"
                    title="榜单等待更新"
                    description="比赛数据复核后，名次会在这里统一公布。"
                />

                <el-pagination
                    v-if="count > pageSize"
                    v-model:current-page="page"
                    class="m-pagination"
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="count"
                    @current-change="loadEntries"
                />
            </template>
            <EmptyState
                v-else-if="!loading"
                title="榜单尚未公布"
                description="运营发布榜单后即可在这里查看。"
            />
        </section>
    </LoverV2Layout>
</template>

<script>
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import { default_avatar as defaultAvatar } from "@/utils/config";
import { getLeaderboardEntries, getLeaderboards } from "@/service/rank/lover-v2";

export default {
    name: "LoverV2Leaderboard",
    components: { LoverV2Layout, EmptyState },
    data: function () {
        return {
            defaultAvatar,
            definitions: [],
            entries: [],
            activeKey: "",
            loading: false,
            page: 1,
            pageSize: 20,
            count: 0,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        activeDefinition() {
            return this.definitions.find((item) => item.key === this.activeKey) || null;
        },
        scoreLabel() {
            return this.activeDefinition?.config?.display?.score_label || "累计积分";
        },
        metricDefinitions() {
            return this.activeDefinition?.config?.display?.metrics || [];
        },
    },
    watch: {
        eventId: {
            immediate: true,
            handler() {
                this.loadDefinitions();
            },
        },
    },
    methods: {
        rankText(rank) {
            return rank <= 3 ? ["壹", "贰", "叁"][rank - 1] : String(rank).padStart(2, "0");
        },
        formatScore(score) {
            return Number(score).toLocaleString("zh-CN", { maximumFractionDigits: 4 });
        },
        visibleMetrics(item) {
            return this.metricDefinitions
                .filter((metric) => Object.prototype.hasOwnProperty.call(item.metrics || {}, metric.key))
                .map((metric) => ({
                    key: metric.key,
                    label: metric.label,
                    value: Number(item.metrics[metric.key]).toLocaleString("zh-CN"),
                }));
        },
        async loadDefinitions() {
            if (!this.eventId) return;
            this.loading = true;
            try {
                const res = await getLeaderboards(this.eventId, { page: 1, page_size: 100 });
                this.definitions = res.data.data.list || [];
                if (!this.definitions.some((item) => item.key === this.activeKey)) {
                    this.activeKey = this.definitions[0]?.key || "";
                }
                await this.loadEntries();
            } catch (error) {
                console.error("[LoverV2Leaderboard.loadDefinitions]", error);
                this.definitions = [];
                this.entries = [];
            } finally {
                this.loading = false;
            }
        },
        async loadEntries() {
            if (!this.eventId || !this.activeKey) {
                this.entries = [];
                this.count = 0;
                return;
            }
            this.loading = true;
            try {
                const res = await getLeaderboardEntries(this.eventId, this.activeKey, {
                    page: this.page,
                    page_size: this.pageSize,
                });
                this.entries = res.data.data.list || [];
                this.count = Number(res.data.data.count || 0);
            } catch (error) {
                console.error("[LoverV2Leaderboard.loadEntries]", error);
                this.entries = [];
                this.count = 0;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-leaderboard {
    padding: 28px;
}

.m-board-heading {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 12px 4px 24px;

    h3 {
        margin: 0 0 8px;
        color: #56342f;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 28px;
        letter-spacing: 0.12em;
    }

    p {
        margin: 0;
        color: #967d76;
        line-height: 1.7;
    }
}

.m-ranking-list {
    display: grid;
    gap: 12px;
}

.u-ranking {
    display: grid;
    grid-template-columns: 64px minmax(240px, 1fr) minmax(120px, auto) 130px;
    align-items: center;
    gap: 18px;
    min-height: 82px;
    padding: 12px 20px;
    border: 1px solid rgba(174, 118, 91, 0.28);
    border-radius: 10px;
    background: rgba(255, 250, 241, 0.72);

    &.is-rank-1 {
        border-color: rgba(189, 121, 43, 0.52);
        background: linear-gradient(90deg, rgba(246, 224, 171, 0.62), rgba(255, 250, 241, 0.78));
    }
}

.u-rank {
    color: #9b4a3e;
    font-family: "STKaiti", serif;
    font-size: 28px;
    text-align: center;
}

.u-player {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 14px;
    color: #50332f;
    text-decoration: none;

    b,
    small {
        display: block;
    }

    b {
        overflow: hidden;
        font-size: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    small {
        margin-top: 5px;
        color: #a18a84;
    }
}

.u-metrics {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px 12px;
    color: #8c716a;
    font-size: 12px;
}

.u-score {
    color: #963b31;
    font-size: 25px;
    text-align: right;
}

.m-pagination {
    justify-content: center;
    margin-top: 24px;
}

@media screen and (max-width: 760px) {
    .m-leaderboard {
        padding: 18px 12px;
    }

    .u-ranking {
        grid-template-columns: 44px minmax(0, 1fr) auto;
        gap: 10px;
        padding: 12px;
    }

    .u-metrics {
        display: none;
    }

    .u-score {
        font-size: 19px;
    }
}
</style>
