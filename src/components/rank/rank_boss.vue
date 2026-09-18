<template>
    <div v-if="isAppMode" class="m-rank-boss m-rank-boss--app">
        <AppSelectDrawer title="选择首领" :model-value="selectedAid" :options="bossOptions" @select="changeBoss">
            <template #default="{ open }">
                <div
                    class="u-boss-select"
                    role="button"
                    tabindex="0"
                    @keydown.enter="open"
                    @keydown.space.prevent="open"
                >
                    <img
                        class="u-boss-select-icon"
                        :src="bossIcon(selectedAid === 'all' ? 0 : selectedAid)"
                        :alt="selectedBossLabel"
                    />
                    <span class="u-boss-select-name">{{ selectedBossLabel }}</span>
                </div>
            </template>
        </AppSelectDrawer>
    </div>
    <el-row v-else class="m-rank-boss" :gutter="20" type="flex">
        <el-col v-if="showAll" :span="span">
            <div :class="['u-boss u-boss-is_all', { active: aid == 'all' || aid == '' }]" @click="changeBoss('all')">
                <span class="u-boss-name">全部</span>
            </div>
        </el-col>
        <el-col :span="span" v-for="(label, id) of data" :key="'aid-' + id">
            <li :class="['u-boss', { active: id == aid }]" @click="changeBoss(id)">
                <el-image class="u-boss-icon" :src="bossIcon(id)">
                    <template #error>
                        <img :src="bossIcon(0)" />
                    </template>
                </el-image>
                <span class="u-boss-name">{{ label }}</span>
            </li>
        </el-col>
    </el-row>
</template>

<script>
import PICS from "@/assets/js/pics.js";
import AppSelectDrawer from "@/components/common/AppSelectDrawer.vue";
import { isApp } from "@/utils/env";

export default {
    components: {
        AppSelectDrawer,
    },
    props: {
        aid: {
            type: String,
            default: "all",
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        showAll: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["update"],
    computed: {
        span: function () {
            return ~~(24 / Object.keys(this.data).length + 1);
        },
        isAppMode() {
            return isApp();
        },
        selectedAid() {
            return this.aid || "all";
        },
        selectedBossLabel() {
            return this.selectedAid === "all" ? "全部" : this.data[this.selectedAid] || "全部";
        },
        bossOptions() {
            const options = Object.entries(this.data).map(([value, label]) => ({ value, label }));
            return this.showAll ? [{ value: "all", label: "全部" }, ...options] : options;
        },
    },
    methods: {
        bossIcon(val) {
            return PICS.bossIcon(val);
        },
        changeBoss: function (val) {
            // App 抽屉选择“全部”时清除所有页面共用的 aid 查询参数。
            // 父组件仍会收到 all，用于保留各页面原有的全量数据处理逻辑。
            if (this.isAppMode && val === "all" && this.$route.query.aid !== undefined) {
                const query = { ...this.$route.query };
                delete query.aid;
                this.$router.replace({ path: this.$route.path, query });
            }
            this.$emit("update", val);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/app_select.less";

.m-rank-boss {
    .u-boss {
        .db;
        .pointer;
        .bold;
        .mb(20px);
        .fz(16px, 50px);
        .x;
        position: relative;
        background-color: #3e576d;
        padding: 0 10px 0 50px;
        color: #ffedc6;
        height: 50px;
        transition: 0.1s ease-in-out;
        border-bottom-right-radius: 10px;

        &:last-child {
            .mr(0);
        }
        &:hover {
            background-color: #5a7c99;
            color: #ffedc6;
        }
        &.u-boss-is_all {
            padding: 0 10px;
        }
        &.active {
            background-color: #ffedc6;
            color: #703100;
            &:hover {
                background-color: #ffedc6;
                color: #703100;
            }
        }
    }
    .u-boss-icon {
        .size(50px);
        display: block;
        position: absolute;
        left: 0;
        top: 0;
    }
}
.el-image__error,
.el-image__placeholder {
    background-color: #24292d;
}

.v-app .m-rank-boss--app {
    .u-boss-select {
        .rank-app-select();
    }

    .u-boss-select-icon {
        .rank-app-select-icon();
        border-radius: 50%;
    }

    .u-boss-select-name {
        .rank-app-select-name();
    }
}
</style>
