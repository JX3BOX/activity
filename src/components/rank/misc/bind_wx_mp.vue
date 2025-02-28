<template>
    <el-dialog
        title="绑定微信公众号"
        :visible="visible"
        width="30%"
        custom-class="m-notice-wechat__dialog"
        :before-close="handleClose"
        append-to-body
    >
        <div class="m-wechat-content" v-loading="loading">
            <el-image class="u-qr" v-if="ticket" :src="qrcodeValue" lazy>
                <div slot="error" class="u-error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
            <i class="u-tip">打开微信扫一扫，关注剑三魔盒公众号</i>

            <el-button class="u-btn" type="success" size="small" @click="confirm">我已绑定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getWechatQrcode } from "@/service/rank/profile";
const base = `https://mp.weixin.qq.com/cgi-bin/showqrcode`;
export default {
    name: "BindWxMp",
    data() {
        return {
            ticket: "",
            loading: false,
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    model: {
        prop: "visible",
        event: "update:visible",
    },
    computed: {
        qrcodeValue() {
            return `${base}?ticket=${encodeURIComponent(this.ticket)}`;
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.loadQrcode();
            }
        },
    },
    methods: {
        loadQrcode() {
            this.loading = true;
            getWechatQrcode()
                .then((res) => {
                    this.ticket = res.data.data?.ticket;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleClose() {
            this.$emit("update:visible", false);
        },
        confirm() {
            this.$emit("update")
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style lang="less">
.m-notice-wechat__dialog {
    max-width: 500px;
    .m-wechat-content {
        .flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        .u-qr {
            .flex;
            align-items: center;
            justify-content: center;
            .size(180px);
            .el-image__inner {
                .full;
            }
        }
        .u-error {
            .fz(120px);
        }
    }

    .u-btn {
        .mt(10px);
    }
}
</style>
