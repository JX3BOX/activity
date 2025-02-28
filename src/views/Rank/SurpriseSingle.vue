<template>
    <div class="m-single">
        <Header></Header>
        <div class="m-kv">
            <img :src="getCdnLink('design/rank/surprise/weal.svg')" alt="" />
            <div class="u-img-bottom"></div>
        </div>
        <div class="m-content" v-loading="loading" :class="{ logs: logs.length }">
            <el-row :gutter="20">
                <el-col :span="logs.length ? 13 : 24">
                    <div class="u-title">
                        <el-tag effect="dark" :type="data.status ? 'success' : 'info'" class="u-tag">{{
                            data.status ? "进行中" : "已结束"
                        }}</el-tag
                        >{{ data.name }}
                    </div>
                    <div class="u-time">
                        申请时间： {{ showTime(data.start_at || data.created_at) }} ~
                        {{ showTime(data.end_at || data.created_at) }}
                    </div>
                    <div class="m-single-info">
                        <div class="u-info-title">申请条件</div>
                        <div v-html="data.desc"></div>
                    </div>

                    <div class="m-single-info m-single-form">
                        <div class="u-info-title">申请步骤</div>
                        <p>
                            ① 一旦提交后不可再次更改信息，请务确认信息准确，由用户填写错误所带来的后果由用户自行承担。
                        </p>
                        <p>
                            ②
                            实物类奖品不会寄送至海外或港澳台地区，请填写国内快递可达地址，由于国家管控造成的物流问题，由用户自行承担。
                        </p>
                        <p>③ 申请提交后，会在7个工作日内进行处理，审核驳回后需重新填写正确的信息并提交进行审核。</p>
                        <p>④ 其它问题或异常请联系认证团长群（Q群：1048059072）管理人员。</p>
                    </div>
                    <div class="u-box" v-if="data.status">
                        <el-alert
                            v-if="team_id && alert_info"
                            :title="alert_info"
                            type="warning"
                            show-icon
                            class="u-tips"
                        >
                        </el-alert>
                        <div class="u-team">
                            <span class="u-label">选择团队</span>
                            <el-select v-model="team_id" placeholder="选择申请的团队">
                                <el-option
                                    v-for="(item, index) in team_list"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.ID"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <component :is="template" @isEmit="applyEmit" ref="template"></component>
                        <div
                            class="u-submit"
                            :class="{ disabled: !canSubmit }"
                            @click="toSubmit"
                            :loading="submitLoading"
                        >
                            <img :src="getCdnLink('design/rank/surprise/submit.svg')" alt="" />
                        </div>
                    </div>

                    <el-alert :title="`活动未开启或已结束`" type="info" :closable="false" show-icon v-else></el-alert>
                </el-col>
                <el-col :span="11" v-if="logs.length">
                    <div class="m-apply-logs">
                        <h4>申请记录</h4>
                        <el-table
                            :data="logs"
                            style="width: 100%"
                            class="u-logs-table"
                            :header-cell-style="{
                                background:
                                    'linear-gradient(180deg, rgba(26, 34, 41, 1) 0%, rgba(61, 81, 98, 1) 100%) ',
                                color: '#fff',
                            }"
                        >
                            <el-table-column label="申请日期" width="160">
                                <template slot-scope="scope">
                                    {{ showTime(scope.row.created_at) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请状态" width="80">
                                <template slot-scope="scope">
                                    <span :class="`u-status${scope.row.status}`">{{
                                        logStatus(scope.row.status)
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="申请团队" width="120">
                                <template slot-scope="scope">
                                    {{ logTeam(scope.row.team_id) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="申请详情">
                                <template slot-scope="scope">
                                    <!-- {{ scope.row.extend }} -->
                                    <extend :data="scope.row.extend" v-if="scope.row.extend" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div> </el-col
            ></el-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import { getMyManageTeams, getApply, getApplyRecord, postApplyRecord, checkApply } from "@/service/rank/surprise.js";
import { showTime } from "@jx3box/jx3box-common/js/moment.js";
import User from "@jx3box/jx3box-common/js/user";
import extend from "@/components/rank/surprise/extend.vue";
import tifu from "@/components/rank/surprise/tifu.vue";
import {getCdnLink} from "@/utils/index.js";

export default {
    name: "eventsApply",
    data: function () {
        return {
            loading: false,
            submitLoading: false,
            data: "",
            teams: {},
            team_list: [],

            team_id: "",
            count: 0,
            logs: [],
            alert_info: "",

            extend: "",
        };
    },
    components: { extend, tifu },
    computed: {
        event_id() {
            return ~~this.$route.params.id;
        },
        canSubmit() {
            return this.data.status && !this.alert_info && this.team_id;
        },
        template() {
            return this.data.template || "express";
        },
    },
    watch: {
        team_id(id) {
            id && this.checkApply();
        },
    },
    methods: {
        showTime,

        // 提交
        toSubmit() {
            // 字段校验
            this.checkExtend();
            if (this.alert_info) return;
            this.submitLoading = true;
            let _params = {
                team_id: this.team_id,
                key: this.data.key,
                event_id: this.event_id,
                extend: this.extend,
            };
            postApplyRecord(_params)
                .then(() => {
                    this.$notify({
                        title: "提交成功",
                        message: "请耐心等待审核",
                        type: "success",
                    });
                    this.loadLogs();
                    this.$refs?.template.reset();
                })
                .finally(() => {
                    this.submitLoading = false;
                });
        },
        // 资格检查
        checkApply() {
            this.loadLogs();
            checkApply({
                team_id: this.team_id,
                event_id: this.event_id,
            })
                .then(() => {
                    this.alert_info = "";
                })
                .catch((e) => {
                    this.alert_info = e?.data?.msg;
                });
        },
        checkExtend() {
            if (this.extend) {
                this.alert_info = "";
            } else {
                this.alert_info = "请填写申请详情";
            }
        },

        // 申请记录返回状态
        logStatus(status) {
            return ["申请驳回", "审核中", "申请通过"][status + 1];
        },
        // 申请记录团队名
        logTeam(team_id) {
            return this.team_list.find((item) => item.ID == team_id).name || team_id;
        },
        // 表单返回值 extend
        applyEmit(data) {
            this.extend = data;
            this.checkExtend();
        },
        // 获取数据
        loadEventData() {
            this.loading = true;
            // 获取活动数据
            getApply(this.event_id)
                .then((res) => {
                    this.data = res.data.data || {};
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 获取团队申请记录
        loadLogs() {
            getApplyRecord({ event_id: this.event_id, team_id: this.team_id }).then((res) => {
                this.logs = res.data.data.list || [];
            });
        },
        getCdnLink,
    },
    mounted() {
        getMyManageTeams().then((res) => {
            let list = res.data.data.list;
            this.team_list = list.filter((item) => item.super == User.getInfo().uid);
        });
        this.loadEventData();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/surprise/single.less";
</style>
