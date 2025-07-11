<template>
    <div class="m-lover-join m-lover-page wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}join-title.png`" />
        </div>
        <!-- 报名成功提示 -->
        <template v-if="joined">
            <div class="m-success">
                <img class="u-img" :src="`${__imgRoot}success.svg`" />
                <span>报名成功，你的报名信息如下</span>
            </div>
        </template>
        <!-- 登录后 -->
        <template v-if="isLogin">
            <!-- 情缘证 -->
            <div class="m-lover-box m-lover-certificate">
                <certificate v-if="loverHasBind" :data="loverNet" />
                <div class="no-certificate" v-else>
                    ღ 请先前往 <a href="/dashboard/privacy?tab=lover"></a> 绑定情缘哦~ ღ
                </div>
            </div>
            <!-- 报名 -->
            <div class="m-lover-box m-lover-enroll" v-if="loverHasBind" v-loading="loading">
                <h3>情缘杯报名</h3>
                <el-form
                    :class="['m-lover-form', { disabled: joined }]"
                    :disabled="joined"
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-width="80px"
                >
                    <el-form-item label="队伍名" prop="team_name">
                        <el-input v-model="form.team_name" />
                    </el-form-item>
                    <el-form-item label="战队图标">
                        <div v-if="joined" class="u-image-list">
                            <img class="u-image-item" v-for="(src, index) in form.images" :src="src" :key="index" />
                        </div>
                        <uploadImage v-else ref="upload-image" @onFinish="onImageUploaded"></uploadImage>
                    </el-form-item>
                    <el-form-item label="参赛宣言" prop="slogan">
                        <el-input v-model="form.slogan" type="textarea" :rows="3" />
                    </el-form-item>
                    <el-form-item label="服务器" prop="server">
                        <el-select v-model="form.server" placeholder="请选择服务器">
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
                    <el-form-item label="联系QQ" prop="qq">
                        <el-input v-model="form.qq" />
                    </el-form-item>
                    <el-form-item label="联系电话" prop="qq">
                        <el-input v-model="form.phone" />
                    </el-form-item>
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
                </el-form>
                <div :class="['u-submit', { disabled: joined }]" @click="startUploadImage">
                    <img class="u-img" :src="`${__imgRoot}join.png`" />
                </div>
            </div>
        </template>
        <!-- 未登录 -->
        <div class="m-lover-box no-login" v-else>
            <h3>请登录后进行报名</h3>
            <div class="u-button" @click="toLogin">点击登录</div>
        </div>
    </div>
</template>

<script>
import server_std from "@jx3box/jx3box-data/data/server/server_std.json";
import User from "@jx3box/jx3box-common/js/user.js";
import { joinLover, getMyProfile } from "@/service/rank/lover";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import uploadImage from "@jx3box/jx3box-comment-ui/src/components/upload.vue";
import certificate from "@/components/rank/lover/certificate.vue";
export default {
    name: "LoverJoin",
    inject: ["__imgRoot"],
    components: { certificate, uploadImage },
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
        authorLink,
        toLogin() {
            User.toLogin();
        },
        startUploadImage() {
            if (this.joined) return;
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
            // 先上传图片

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
    },
    mounted() {
        this.initJoinForm();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/join.less";
</style>
