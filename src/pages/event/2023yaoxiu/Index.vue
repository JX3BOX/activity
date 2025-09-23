<template>
    <div class="m-index">
        <a class="m-logo" target="_blank" href="/">
            <img src="@/assets/img/event/jb2.png" alt="魔盒" />
        </a>
        <div class="m-slogan">
            <div class="u-box">
                <div class="u-video">
                    <iframe
                        src="//player.bilibili.com/player.html?aid=865435138&bvid=BV1n54y1u7bu&cid=1037931815&page=1"
                        scrolling="no"
                        border="0"
                        frameborder="no"
                        framespacing="0"
                        allowfullscreen="true"
                    >
                    </iframe>
                </div>
                <div class="u-info">
                    <div class="u-avatar-box">
                        <Avatar :uid="userInfo.uid" :url="userInfo.avatar_origin" class="u-avatar" />
                        <div class="u-name">{{ userInfo.name || "未知" }}</div>
                    </div>
                    <div class="u-btn" @click="getHonorShow" v-if="isLogin">绑定角色领取称号</div>
                </div>
            </div>
        </div>

        <!-- 弹出层界面 -->
        <el-dialog :visible.sync="showDialog" custom-class="m-dialog">
            <div class="m-dialog-box" v-loading="loading">
                <div class="m-dialog-close" @click="showDialog = false" title="取消"><i class="el-icon-close"></i></div>
                <div class="m-dialog-content">
                    <div class="u-common u-step1" v-if="step == 1">
                        <Avatar :uid="userInfo.uid" :url="userInfo.avatar_origin" class="u-avatar" />
                        <!-- <div class="u-name">{{ userInfo.name || "未知" }}，你当前还没有领取过称号哦</div> -->
                        <div class="u-desc">绑定任意一个服务器的【正太七秀】角色即可领取限定称号。</div>
                        <div class="u-btn-box">
                            <div class="u-btn" @click="bindRole">绑定角色</div>
                            <div class="u-btn" @click="getHonor">领取称号</div>
                        </div>
                    </div>
                    <div class="u-common u-step2" v-if="step == 2">
                        <div class="u-title">绑定令牌</div>
                        <div
                            class="u-frame"
                            title="点击复制"
                            v-clipboard:copy="token"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            <i class="el-icon-document-copy"></i>
                            {{ token }}
                        </div>
                        <div class="u-tips">
                            ( 令牌10分钟内有效，超时请
                            <el-button type="text" class="u-refresh" title="刷新" @click="getToken">点击此处</el-button>
                            刷新 )
                        </div>
                        <div class="u-plug">
                            打开【茗伊插件集】-【团队】-【团队平台】<br />
                            在【角色认证】行，点击按钮【点击绑定】并【填入上方密钥】
                        </div>
                        <div class="u-btn-box">
                            <div class="u-btn" @click="step--">上一步</div>
                            <div class="u-btn" @click="getHonor">我已绑定，领取称号</div>
                        </div>
                    </div>
                    <div class="u-common u-step3" v-if="step == 3">
                        <div class="u-title">领取称号</div>
                        <div class="u-role">
                            <el-select v-model="role" placeholder="请选择" popper-class="u-role-select">
                                <el-option v-for="item in roles" :key="item.ID" :label="item.name" :value="item.server">
                                    <span style="float: left">{{ item.name }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.server }}</span>
                                </el-option>
                            </el-select>
                        </div>
                        <!-- <div class="u-tips">
                            <span>你的称号为：</span>
                            <div class="u-honor">服务器名字+第+顺位+位秀爷</div>
                        </div> -->
                        <div class="u-btn-box">
                            <div class="u-btn" @click="honorSubmit">领取称号</div>
                        </div>
                    </div>
                    <!-- <div class="u-common u-step4" v-if="step == 4">
                        <Avatar :uid="userInfo.uid" :url="userInfo.avatar_origin" class="u-avatar" />
                        <div class="u-tips">
                            <span>飞龙在天服第五千四百六十位秀爷</span><br />
                            <span>你已经领取过称号啦！</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </el-dialog>
        <!-- 全屏叶子 -->
        <!-- <div class="m-leaf" ref="mark"></div> -->
    </div>
</template>

<script>
const KEY = "yaoxiujie";
import { getToken, getHonorApi, getAllMyRoles } from "@/service/event/event";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            // video: `<iframe src="//www.bilibili.com/video/BV1n54y1u7bu/?vd_source=01c3106a06b3cb3f34cfd07de3204752" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`,
            userInfo: User.getInfo(),
            showDialog: false,
            step: 1,
            loading: false,
            token: "",
            roles: [],
            role: "",
            isLogin: User.isLogin(),
        };
    },
    directives: {
        animate: {
            inserted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (el.className.indexOf(binding.value) == -1) {
                            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
                            el.className = binding.value + " " + el.className;
                        }
                        if (binding.addClass) {
                            window.removeEventListener("scroll", binding.addClass);
                        }
                    }
                };
                window.addEventListener("scroll", binding.addClass, true);
                binding.addClass();
            },
            unbind: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {},
    watch: {},
    methods: {
        init: function () {
            getAllMyRoles().then((res) => {
                this.roles =
                    res.data.data.list?.filter((item) => {
                        return item.body_type == 5 && item.mount == 4 && item.custom == 0;
                    }) || [];
            });
        },
        getToken() {
            this.loading = true;
            getToken()
                .then((res) => {
                    this.token = res.data.data.token;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onCopy: function (val) {
            this.$notify({
                title: "复制成功",
                message: val.text,
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
        hanldMask(event) {
            let x = -event.clientX / 150;
            let y = -event.clientY / 150;
            if (this.$refs.mark) {
                this.$refs.mark.style.backgroundPositionX = x + "px";
                this.$refs.mark.style.backgroundPositionY = y + "px";
            }
        },
        //绑定角色领取
        getHonorShow() {
            this.step = 1;
            this.showDialog = true;
        },
        //绑定角色
        bindRole() {
            this.step = 2;
            this.getToken();
        },
        //领取称号
        getHonor() {
            this.step = 3;
        },
        //选择角色后确认
        honorSubmit() {
            getHonorApi("2023yaoxiu", { server: this.role }).then((res) => {
                this.$confirm("领取成功，是否前往装扮?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.showDialog = false;
                        window.open("/dashboard/honor", "_blank");
                    })
                    .catch(() => {
                        this.showDialog = false;
                    });
            });
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/yaoxiujie/index.less";
</style>
