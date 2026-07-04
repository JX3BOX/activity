<template>
    <div class="m-sign-up">
        <div class="m-superstar-join">
            <span class="u-title-btn">填写信息</span>
            <div class="m-content">
                <div class="m-join" v-if="isLogin" v-loading="loading">
                    <div class="m-join-notice" v-html="notice"></div>
                    <el-form
                        class="m-join-form"
                        ref="form"
                        :model="form"
                        label-width="100px"
                        v-if="!loading && !status"
                    >
                        <el-form-item label="报名活动">
                            <el-select v-model="form.event_id" placeholder="请选择活动">
                                <el-option
                                    v-for="event in events"
                                    :key="event.ID"
                                    :label="event.name"
                                    :value="event.ID"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择团队">
                            <el-select v-model="form.team_id" placeholder="请选择团队" @change="updateTeam">
                                <el-option v-for="team in teams" :key="team.ID" :label="team.name" :value="team.ID"
                                    ><span class="m-join-team-item"
                                        ><b class="u-team-name">{{ team.name }}</b
                                        ><span class="u-team-id">(ID:{{ team.ID }})</span
                                        ><span class="u-team-server">{{ team.server }}</span></span
                                    >
                                </el-option>
                            </el-select>
                            <div class="u-tip" v-if="!teams || !teams.length">
                                还没有团队？<a href="/team" target="_blank">创建团队</a>
                            </div>
                        </el-form-item>
                        <el-form-item label="参赛宣言">
                            <el-input
                                v-model="form.slogan"
                                placeholder="为您的团队打CALL,将显示在游戏内"
                                :maxlength="20"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        <div class="u-btns">
                            <span class="u-btn" :class="{ disabled: !ready }" @click="submit">立即报名</span>
                            <!-- <el-button class="u-btn" type="primary" @click="submit" :disabled="!ready">报名</el-button> -->
                            <div class="u-footer">
                                <a href="/notice/32280" target="_blank"
                                    ><i class="el-icon-info"></i> <b>点击查看百强活动细则</b></a
                                >
                            </div>
                        </div>
                    </el-form>
                    <div class="m-join-done" v-if="status">
                        <h1 class="u-status-title" :class="statusText[audit_status].class">
                            {{ statusText[audit_status].name }}
                        </h1>
                        <span>
                            活动：<strong>{{ result.event.name }}</strong>
                        </span>
                        <span>
                            团队：<strong>{{ result.eventRecord.name }}</strong>
                        </span>
                    </div>
                </div>
                <div class="u-no-login" v-else>
                    <p>你尚未登录</p>
                    <div class="u-btns"><span class="u-btn" @click="goLogin">立即登录</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEvents } from "@/service/rank/event.js";
import { joinEvent, hasJoined } from "@/service/rank/join.js";
import { getMyTeams } from "@/service/rank/team.js";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/system";
import User from "@jx3box/jx3box-common/js/user.js";
export default {
    data() {
        return {
            form: {
                event_id: "",
                team_id: "",
                slogan: "",
            },
            events: [],
            teams: [],
            loading: true, //loading加载中先隐藏表单
            status: false, //是否已经报名
            audit_status: 0, //审核状态
            statusText: [
                { name: "待审核", class: "u-orange" },
                { name: "已报名", class: "" },
            ],
            joined_team_name: "",

            isLogin: User.isLogin(),
            result: {
                event: {
                    name: "活动名称",
                },
                eventRecord: {
                    name: "团队名称",
                },
            },
            processing: false, //按钮提交锁定
            notice: "",
        };
    },
    computed: {
        ready() {
            return this.form.event_id && this.form.team_id && this.form.slogan && !this.status && !this.processing;
        },
        event_id() {
            return this.form.event_id;
        },
        team_name() {
            let team_id = this.form.team_id;
            let team_name = "";
            for (let team of this.teams) {
                if (team.ID == team_id) {
                    team_name = team.name;
                    break;
                }
            }
            return team_name;
        },
    },
    methods: {
        submit() {
            this.$alert("报名后资料将不可再更改，更多咨询请联系认证团长Q群【915477780】", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        this.processing = true;
                        joinEvent(this.form)
                            .then((res) => {
                                this.$message({
                                    message: "报名成功,请等待审核",
                                    type: "success",
                                });
                                this.status = true;
                                this.audit_status = res.data.data.status || 0;
                                this.joined_team_name = this.team_name;
                                this.$forceUpdate();
                            })
                            .finally(() => {
                                this.processing = false;
                            });
                    }
                },
            });
        },
        updateTeam() {
            this.teams.forEach((item) => {
                if (item.ID == this.form.team_id) {
                    this.result.eventRecord.name = item.name;
                }
            });
        },
        async loadEvents() {
            // 获取开放的活动事件
            const res = await getEvents({
                status: 1,
            });
            this.events = res.data.data.list || [];
            this.form.event_id = this.events[0].ID || this.event_id;
            this.$forceUpdate();
        },
        async loadTeams() {
            // 获取当前用户拥有的团队
            const res = await getMyTeams();
            this.teams = res.data.data.list || [];
            this.form.team_id = this.team_id;
            this.$forceUpdate();
        },
        checkJoin() {
            this.form.event_id &&
                hasJoined(this.form.event_id).then((res) => {
                    this.result = res.data.data;
                    if (res.data.data.hasJoined) {
                        this.audit_status = res.data.data.eventRecord.status;
                        if (this.audit_status != 2) {
                            this.status = true;
                            this.joined_team_name = res.data.data.eventRecord.name;
                            this.$forceUpdate();
                        }
                    }
                    this.loading = false;
                });
        },
        goLogin() {
            User.toLogin();
        },
        loadNotice() {
            getBreadcrumb("rank-join").then((data) => {
                this.notice = data;
            });
        },
        init() {
            this.loadEvents();
            this.loadTeams();
            this.loadNotice();
        },
    },
    watch: {
        event_id: function (val) {
            this.checkJoin();
        },
    },
    created() {
        this.isLogin && this.init();
    },
};
</script>
