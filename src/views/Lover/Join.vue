<template>
    <div class="m-lover-join wp">
        <div class="m-page-title">
            <img class="u-join-img" :src="`${__imgRoot}join-title.png`" />
        </div>
        <template v-if="isLogin">
            <!-- 报名成功提示 -->
            <template v-if="joined">
                <div class="m-success">
                    <img class="u-success-img" :src="`${__imgRoot}join-success.png`" />
                    <div class="u-join-notice" v-html="notice"></div>

                    <!-- 审核被拒 -->
                    <div class="m-reject" v-if="joinRecord.status == -1">
                        <span class="u-text">报名审核未通过</span>
                        <span class="u-reason">原因：{{ joinRecord.comment || "暂无" }}</span>
                    </div>
                </div>
                <div class="m-team-box" v-if="joinRecord.status != -1">
                    <div class="m-team-info">
                        <div class="m-team-info__left">
                            <img class="u-team-logo" :src="joinRecord.images[0]" alt="" />
                            <div class="u-team-slogan">{{ joinRecord.slogan }}</div>
                        </div>
                        <div class="m-team-info__right">
                            <div class="m-info-item u-team-name">
                                <span class="u-label">队伍名</span>
                                <span class="u-value">{{ joinRecord.team_name }}</span>
                            </div>
                            <template v-for="item in uniqBy(joinRecord.teammeta_user_list, 'id')">
                                <div class="m-info-item u-team-member" :key="item.id">
                                    <span class="u-label">角色名</span>
                                    <span class="u-value">
                                        <el-image class="u-avatar" :src="showAvatar(item.avatar)"></el-image>
                                        {{ item.display_name }}
                                    </span>
                                </div>
                            </template>
                            <div class="m-info-item u-server">
                                <span class="u-label">服务器</span>
                                <span class="u-value">{{ joinRecord.server }}</span>
                            </div>
                            <div class="m-info-item u-live">
                                <span class="u-label">直播信息</span>
                                <span class="u-value" v-if="joinRecord.live_platform && joinRecord.live_url">
                                    {{ joinRecord.live_platform }}: {{ joinRecord.live_url }}
                                </span>
                                <span class="u-value" v-else> - </span>
                            </div>
                            <div class="m-info-item u-qq">
                                <span class="u-label">联系QQ</span>
                                <span class="u-value">{{ joinRecord.qq }}</span>
                            </div>
                            <div class="m-info-item u-phone">
                                <span class="u-label">联系电话</span>
                                <span class="u-value">{{ joinRecord.phone }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <!-- 情缘证 -->
                <!-- <div class="m-lover-box m-lover-certificate" v-if="loverHasBind">
                    <certificate :data="loverNet" />
                </div> -->
                <div class="m-join-bind" v-if="!loverHasBind">
                    <a class="u-bind-btn" target="_blank" href="/dashboard/privacy?tab=lover"></a>
                </div>
                <!-- 报名 -->
            </template>
            <div
                class="m-join-form"
                v-if="(loverHasBind && !joined) || (joined && joinRecord.status == -1)"
                v-loading="loading"
            >
                <el-form :class="['m-lover-form']" ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-row :gutter="10">
                        <el-col :span="12" v-for="(item,i) in uniqBy(loverNet.members, 'id')" :key="item.id">
                            <el-form-item :label="`队员${i + 1}`">
                                <div class="m-role">
                                    <el-image class="u-avatar" :src="showAvatar(item.user_info.avatar)"></el-image>
                                    {{ item.user_info.display_name }}
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="队伍名称" prop="team_name">
                                <el-input v-model="form.team_name" placeholder="请输入队伍名" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="服务器" prop="server">
                                <el-select v-model="form.server" placeholder="请选择服务器" style="width: 100%">
                                    <el-option
                                        v-for="(item, index) in serverOptions"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                        {{ item.label }}
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="联系QQ" prop="qq">
                                <el-input v-model="form.qq" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model="form.phone" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="直播信息" prop="live_id">
                        <div class="u-live-form">
                            <el-select
                                v-model="form.live_platform"
                                allow-create
                                default-first-option
                                filterable
                                placeholder="直播平台"
                            >
                                <el-option label="斗鱼" value="douyu"></el-option>
                                <el-option label="虎牙" value="huya"></el-option>
                                <el-option label="B站" value="bilibili"></el-option>
                                <el-option label="抖音" value="douyin"></el-option>
                            </el-select>
                            <el-input v-model="form.live_url" placeholder="直播间地址"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="参赛宣言" prop="slogan">
                        <el-input
                            v-model="form.slogan"
                            type="textarea"
                            :rows="3"
                            placeholder="请输入参赛宣言(最多30字)"
                        />
                    </el-form-item>
                    <el-form-item label="合照">
                        <div v-if="joined && joinRecord.images.length" class="u-image-list">
                            <img class="u-image-item" v-for="(src, index) in form.images" :src="src" :key="index" />
                        </div>
                        <uploadImage v-else ref="upload-image" @onFinish="onImageUploaded"></uploadImage>
                    </el-form-item>
                </el-form>
                <div :class="['u-submit']" @click="startUploadImage">
                    <img class="u-submit-img" :src="`${__imgRoot}join-btn.png`" />
                </div>
            </div>
        </template>
        <!-- 未登录 -->
        <div class="m-join-bind" v-else>
            <a class="u-bind-btn" target="_blank" href="/dashboard/privacy?tab=lover"></a>
        </div>
    </div>
</template>

<script>
import server_std from "@jx3box/jx3box-data/data/server/server_std.json";
import User from "@jx3box/jx3box-common/js/user.js";
import { joinLover, getMyProfile } from "@/service/rank/lover";
import { authorLink, showAvatar } from "@jx3box/jx3box-common/js/utils";
import uploadImage from "@jx3box/jx3box-comment-ui/src/components/upload.vue";
import certificate from "@/components/rank/lover/certificate.vue";
import { uniqBy } from "lodash";
import { joinRecord, updateJoinRecord } from "@/service/rank/join";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc";
export default {
    name: "LoverJoin",
    inject: ["__imgRoot"],
    components: {
        // certificate,
        uploadImage,
    },
    data: function () {
        return {
            loading: false,
            list: [],

            form: {
                team_name: "",
                slogan: "",
                images: [],
                server: "",
                qq: "",
                phone: "",

                live_platform: "", // 直播平台
                live_url: "", // 直播间
            },
            rules: {
                team_name: [{ required: true, message: "请输入队伍名", trigger: "blur" }],
            },

            join_loading: false,
            notice: "",
        };
    },
    computed: {
        // 服务器选项
        serverOptions() {
            return server_std.map((item) => {
                return {
                    value: item,
                    label: item,
                };
            });
        },
        eventId() {
            return this.$store.getters.currentEventId;
        },
        isLogin() {
            return User.isLogin();
        },
        loverNet() {
            return this.$store.state.lover_net;
        },
        loverHasBind() {
            return this.loverNet && this.loverNet?.members?.filter((m) => m.status === 1)?.length > 1;
        },
        joinRecord() {
            return this.$store.state.join_record;
        },
        joined() {
            return Boolean(this.joinRecord);
        },
        systemJoinParams() {
            return {
                event_id: this.eventId,
                user_id: User.profile.ID,
                status: 0,
                team_mates: this.loverNet.members.map((m) => m.user_id),
                relation_net_id: this.loverNet.net.id,
                remark: null,
            };
        },
    },
    watch: {},
    methods: {
        uniqBy,
        authorLink,
        showAvatar,
        toLogin() {
            User.toLogin();
        },
        startUploadImage() {
            if (this.joined && this.joinRecord.status != -1) return;
            // 点击报名按钮后，先上传图片，通过图片上传结束的回调获取图片列表进行实际报名~
            const uploadImageRef = this.$refs["upload-image"];
            this.join_loading = true;
            uploadImageRef.upload();
        },
        onImageUploaded(data) {
            this.form.images = data;
            this.toJoin();
        },
        toJoin() {
            // 报名
            const params = {
                ...this.systemJoinParams,
                ...this.form,
            };
            // 是否已经参与
            if (this.joined) {
                // 已经报名，更新报名信息
                updateJoinRecord(this.eventId, this.joinRecord.id, params)
                    .then(() => {
                        this.$notify({
                            title: "更新成功",
                            type: "success",
                        });
                        this.$store.dispatch("loadJoinRecord", { force: true });
                    })
                    .finally(() => {
                        this.join_loading = false;
                    });
                return;
            } else {
                joinLover(this.eventId, params)
                    .then(() => {
                        this.$notify({
                            title: "报名成功",
                            type: "success",
                        });
                        this.$store.dispatch("loadJoinRecord", { force: true });
                    })
                    .finally(() => {
                        this.join_loading = false;
                    });
            }
        },
        initJoinForm() {
            if (!this.isLogin) return;
            // 初始化报名表单
            if (this.joined) {
                // 已报名：
                this.form.team_name = this.joinRecord.team_name;
                this.form.slogan = this.joinRecord.slogan;
                this.form.images = this.joinRecord.images || [];
                this.form.server = this.joinRecord.server;
                this.form.qq = this.joinRecord.qq;
                this.form.phone = this.joinRecord.phone;
                this.form.live_platform = this.joinRecord.live_platform;
                this.form.live_url = this.joinRecord.live_url;
            } else {
                getMyProfile().then((res) => {
                    const data = res.data.data;
                    this.form.server = data.jx3_server;
                    this.form.phone = data.user_phone || "";
                    this.form.qq = data.qq_number;
                });
            }
        },
        loadNotice() {
            // 获取情缘杯报名公告
            getBreadcrumb("lover-join").then((res) => {
                this.notice = res;
            });
        },
    },
    mounted() {
        this.initJoinForm();
        this.loadNotice();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/join.less";
</style>
