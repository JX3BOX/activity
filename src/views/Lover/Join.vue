<template>
    <div class="m-lover-join m-lover-page wp">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}join-title.png`" />
        </div>
        <!-- 报名成功提示 -->
        <template v-if="success">
            <div class="m-success">
                <img class="u-img" :src="`${__imgRoot}success.svg`" />
                <span>报名成功，你的报名信息如下</span>
            </div>
        </template>
        <!-- 登录后 -->
        <template v-if="isLogin">
            <!-- 情缘证 -->
            <div class="m-lover-box m-lover-certificate" v-loading="loading">
                <template v-if="list.length">
                    <div class="no-certificate" v-if="!certificate">ღ 暂无绑定的主情缘 ღ</div>
                    <template v-else>
                        <certificate :data="certificate" />
                        <div class="u-button" @click="setLover" v-if="!join">设定为主情缘</div>
                    </template>
                </template>
                <div class="no-certificate" v-else-if="!loading">ღ 请按教程在游戏内绑定情缘 ღ</div>
            </div>

            <!-- 情缘列表 -->
            <div class="m-lover-list" v-if="!join" v-loading="loading">
                <div class="m-lover-box" v-for="(item, i) in list" :key="item.id" @click="changeLover(i)">
                    <div class="u-user">
                        <div class="u-avatar">
                            <el-avatar
                                class="u-avatar-pic"
                                shape="circle"
                                :size="30"
                                :src="item.user_info_1.avatar"
                            ></el-avatar>
                        </div>
                        <span class="u-name">{{ item.user_info_1.display_name }}</span>
                    </div>
                    <div class="u-user">
                        <div class="u-avatar">
                            <el-avatar
                                class="u-avatar-pic"
                                shape="circle"
                                :size="30"
                                :src="item.user_info_2.avatar"
                            ></el-avatar>
                        </div>
                        <span class="u-name">{{ item.user_info_2.display_name }}</span>
                    </div>
                </div>
            </div>
            <!-- 报名 -->
            <div class="m-lover-box m-lover-enroll" v-if="entry" v-loading="loading">
                <h3>情缘杯报名</h3>
                <el-form
                    :class="['m-lover-form', { disabled: join }]"
                    :disabled="join"
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-width="80px"
                >
                    <el-form-item label="队伍名" prop="team_name">
                        <el-input v-model.number="form.team_name" />
                    </el-form-item>
                    <el-form-item label="参赛宣言" prop="slogan">
                        <el-input v-model="form.slogan" type="textarea" :rows="2" />
                    </el-form-item>
                    <el-form-item label="合照上传">
                        <uploadImage v-model="form.image" :max-size="30"></uploadImage>
                    </el-form-item>
                </el-form>
                <div :class="['u-submit', { disabled: join }]" @click="toJoin">
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
import User from "@jx3box/jx3box-common/js/user.js";
import { getMyLover, joinLover, setMyLover } from "@/service/rank/lover";
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
            lover: false,
            isLogin: User.isLogin(),
            list: [],

            form: {
                team_name: "",
                images: [],
                lover_jx3id: "",
                phone: "",
                qq: "",
                remark: "",
                server: "",
                slogan: "",
                team_name: "",
                user_jx3id: "",
            },
            rules: {
                team_name: [{ required: true, message: "请输入队伍名", trigger: "blur" }],
            },

            certificate: null,
            join: false,
            entry: false,
            success: false,
        };
    },
    computed: {
        loverId() {
            return this.$store.state.loverId;
        },
        myJoin() {
            return this.$store.state.my_join || null;
        },
    },
    watch: {
        isLogin: {
            immediate: true,
            handler: function (val) {
                if (val) {
                    this.loadMyLover();
                    this.$store.dispatch("getMyEventStatus");
                }
            },
        },
        join(val) {
            if (val) this.entry = true;
        },
        myJoin: {
            immediate: true,
            handler: function (obj) {
                if (obj?.id) {
                    this.form = val;
                    this.join = true;
                    this.entry = true;
                }
            },
        },
    },
    methods: {
        authorLink,
        toLogin() {
            User.toLogin();
        },
        loadMyLover() {
            // 获取我的情缘 && 判断是否有主情缘
            this.loading = true;
            getMyLover()
                .then((res) => {
                    const list = res.data.data.list || [];
                    this.list = list;
                    this.certificate = list.filter((item) => item.star === 1)[0] || null;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeLover(index) {
            this.certificate = this.list[index];
        },
        setLover() {
            // 设置主情缘 && 显示报名模块
            setMyLover(this.certificate.id).then(() => {
                this.entry = true;
                this.$notify({
                    title: "主情缘设置成功",
                    type: "success",
                });
            });
        },

        toJoin() {
            // 报名
            if (this.join) return;
            joinLover(this.form).then(() => {
                this.join = true;
                this.success = true;
                this.$notify({
                    title: "报名成功",
                    type: "success",
                });
            });
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/join.less";
</style>
