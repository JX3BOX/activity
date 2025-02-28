<template>
    <el-row class="m-rank-boss" :gutter="20" type="flex">
        <el-col :span="span">
            <div :class="['u-boss u-boss-is_all', { active: aid == 'all' || aid == '' }]" @click="changeBoss('all')">
                <span class="u-boss-name">全部</span>
            </div>
        </el-col>
        <el-col :span="span" v-for="(label, id) of data" :key="'aid-' + id">
            <li :class="['u-boss', { active: id == aid }]" @click="changeBoss(id)">
                <el-image class="u-boss-icon" :src="bossIcon(id)">
                    <img slot="error" :src="bossIcon(0)" />
                </el-image>
                <span class="u-boss-name">{{ label }}</span>
            </li>
        </el-col>
    </el-row>
</template>

<script>
import PICS from "@/assets/js/pics.js";
export default {
    props: {
        aid: {
            type: String,
            default: "all",
        },
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ["update"],
    computed: {
        span: function () {
            return ~~(24 / Object.keys(this.data).length + 1);
        },
    },
    methods: {
        bossIcon(val) {
            return PICS.bossIcon(val);
        },
        changeBoss: function (val) {
            this.$emit("update", val);
        },
    },
};
</script>

<style lang="less">
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
            &:hover{
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
</style>
