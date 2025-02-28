<template>
    <div class="m-history-content">
        <el-table class="m-table-box" :data="list" align="left" v-loading="loading">
            <el-table-column prop="created_at" label="抽奖时间"></el-table-column>
            <el-table-column prop="chance_count" width="140px" label="抽奖次数"></el-table-column>
            <el-table-column label="状态" width="140px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 2 ? 'success' : 'info'">
                        {{ scope.row.status == 2 ? "中奖" : "未中奖" }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column >
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.status == 2" @click="look(scope.row.id)">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="m-archive-pages"
            background
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :page-size="pageSize"
            :total="total"
            :current-page.sync="index"
            @current-change="change"
        ></el-pagination>
    </div>
</template>

<script>
import { getMyHistory } from "@/service/pay";
export default {
    name: "History",
    inject: ["__imgRoot"],
    props: ["id", "show"],
    data: function () {
        return {
            list: [],
            index: 0,
            pageSize: 7,
            total:0,
            loading: false,
        };
    },
    watch: {
        show: {
            immediate: true,
            handler: function (_id) {
                _id && this.load(this.id);
            },
        },
    },
    methods: {
        load(luckyDrawId) {
            this.loading = true;
            const params = { luckyDrawId, pageSize: this.pageSize, index: this.index };
            getMyHistory(params)
                .then((res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        look(id) {
            this.$emit("update", id);
        },
        change(i) {
            this.index = i;
            this.load(this.id);
        },
    },
};
</script>

<style lang="less">
.m-history-content {
    padding: 0px 40px;
    thead {
        th {
            &:last-child{
                .cell {
                    text-align: right;
                }
            }
            .cell {
                text-align: center;
            }
            &:first-child{
                .cell {
                    text-align: left;
                }
            }
        }
    }
    tbody {
        td {
            &:last-child{
                .cell {
                    text-align: right;
                }
            }
            .cell {
                text-align: center;
            }
            &:first-child{
                .cell {
                    text-align: left;
                }
            }
        }
    }
    .cell,.m-archive-pages {
        .x;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev {
        background: url("@{kv_blindbox}arr.png") center center no-repeat;
        background-size: 24px auto;
        .el-icon {
            .none;
        }
    }
    .el-pagination.is-background .btn-next {
        transform: rotate(180deg);
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #000;
    }
    .el-loading-mask{
        .z(2);
    }
}
</style>
