<template>
    <div class="m-namespace-box">
        <div class="m-header">
            <div class="u-tip">
                铭牌是一个可以通过关键词快速访问的功能，例如定义铭牌 "某某气纯宏"，则可以在浏览器地址栏中通过快速输入
                <a href="https://剑网3.com/某某气纯宏" target="_blank">
                    <b>剑网3.com/某某气纯宏</b>
                </a>
                访问你输入的链接
            </div>
            <div class="u-count">
                <span class="u-count-txt">
                    当前可建铭牌数：
                    <b>{{ count }}</b> 个
                </span>
                <a
                    href="/vip/namespace?from=dashboard_namespace_create"
                    target="_blank"
                    class="el-button el-button--primary el-button--mini"
                >
                    <i class="el-icon-shopping-cart-2"></i>
                    购买铭牌
                </a>
                <!-- <a
                        href="/vip/namespace/?from=dashboard_namespace_create"
                        class="u-skip"
                        target="_blank"
                    >
                        <span class="el-icon-connection"></span>限时0.99元抢注10个铭牌
                    </a> -->
            </div>
        </div>
        <el-form class="m-publish-namespace-form" :rules="rules" :model="form">
            <el-form-item label="关键词" prop="key" class="m-input">
                <el-input
                    v-model.lazy="form.key"
                    @blur="checkAvailable(form.key)"
                    clearable
                    placeholder="全局唯一关键词"
                ></el-input>
                <el-alert
                    class="u-available"
                    v-if="form.key && !available"
                    title="已有关键词，请重新输入"
                    type="error"
                    show-icon
                />
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input v-model.lazy="form.link" @blur="checkLink(form.key)" clearable placeholder="请输入跳转地址">
                    <template slot="prepend">https://</template>
                </el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input
                    v-model="form.desc"
                    placeholder="请输入关于铭牌的描述"
                    maxlength="30"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item align="center">
                <el-button @click="close">关闭</el-button>
                <el-button class="u-submit" type="primary" :disabled="!ready || processing" @click="onSubmit">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { createNamespace, updateNamespace, getNamespaceByKey } from "@/service/event/namespace";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "namespace",
    props: ["data"],
    data: function () {
        return {
            count: 0,
            available: true,
            processing: false,
            form: {},
            key: "",
            rules: {
                key: [
                    {
                        required: true,
                        message: "请输入铭牌名称",
                        trigger: "blur",
                    },
                ],
                link: [
                    {
                        required: true,
                        message: "请输入链接网址",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        isEditMode() {
            return this.data.mode == "edit";
        },
        params: function () {
            return {
                key: this.form.key,
                desc: this.form.desc,
                link: "https://" + this.form.link,
                source_type: "custom",
            };
        },

        ready: function () {
            if (this.isEditMode) return this.available && this.form.link;
            return this.available && this.form.link && this.count;
        },
    },
    watch: {
        "data.form": {
            immediate: true,
            handler: function (form) {
                if (form.link.includes("http://") || form.link.includes("https://")) {
                    form.link = form.link.replace(/https?\:\/\//, "");
                }
                this.form = form;
                this.key = form.key;
            },
        },
    },
    methods: {
        close(key) {
            this.$emit("close", key);
        },
        checkLink: function (val) {
            if (!val) return;
            const link = this.form.link;
            if (link.includes("http://") || link.includes("https://")) {
                this.form.link = link.replace(/https?\:\/\//, "");
            }
        },

        checkAvailable: function (val) {
            if (!val) return;
            getNamespaceByKey(val).then((res) => {
                if (!res.data.data) {
                    this.available = true;
                } else {
                    this.available = this.isEditMode && this.key == res.data.data.key ? true : false;
                }
            });
        },
        onSubmit: function () {
            if (this.form.desc == "") {
                let profile = User.getInfo();
                this.params.desc = profile.name + "创建";
            }
            this.processing = true;
            if (this.isEditMode) {
                updateNamespace(this.form.ID, this.params)
                    .then(() => {
                        this.form.__index = this.data.index;
                        this.onSuccess();
                    })
                    .finally(() => {
                        this.processing = false;
                    });
            } else {
                createNamespace(this.params)
                    .then((res) => {
                        this.form.user = {
                            display_name: "",
                        };
                        this.onSuccess();
                        this.count -= 1;
                    })
                    .finally(() => {
                        this.processing = false;
                    });
            }
        },
        onSuccess() {
            this.$notify.success({ title: "成功", message: "提交成功", showClose: false });
            this.close("success");
            this.$emit("update", this.form);
        },
    },

    created() {
        User.getAsset().then((data) => {
            this.count = data.namespace_card_count;
        });
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/namespace/form.less";
.el-form-item.m-input .el-form-item__content .u-available {
    .mt(10px);
    padding: 0 14px;
}
</style>
