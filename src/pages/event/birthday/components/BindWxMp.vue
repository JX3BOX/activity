<template>
    <div class="m-wechat-content" v-loading="loading">
        <el-image class="u-qr" v-if="ticket" :src="qrcodeValue" lazy>
            <div slot="error" class="u-error">
                <i class="el-icon-picture-outline"></i>
            </div>
        </el-image>
    </div>
</template>

<script>
import { getWechatQrcode } from "@/service/event/birthday";
import { SSE } from "@jx3box/jx3box-common/js/https";
import User from "@jx3box/jx3box-common/js/user";
import { __cms } from "@jx3box/jx3box-common/data/jx3box.json";
const base = `https://mp.weixin.qq.com/cgi-bin/showqrcode`;
export default {
    name: 'BindWxMp',
    data() {
        return {
            ticket: "",
            sse: null,
            loading: false,

        }
    },
    computed: {
        token() {
            return User.getToken();
        },
        url() {
            return __cms + "api/cms/wechat/mp/bind/result?token=" + this.token;
        },
        qrcodeValue() {
            return `${base}?ticket=${encodeURIComponent(this.ticket)}`;
        },
    },
    mounted() {
        this.loadQrcode();
    },
    beforeDestroy() {
        if (this.sse) {
            this.sse.disconnect();
        }
    },
    methods: {
        loadQrcode() {
            this.loading = true;
            getWechatQrcode()
                .then((res) => {
                    this.ticket = res.data.data?.ticket;
                    if (!this.isWechatVerified && this.ticket) {
                        if (this.sse) {
                            this.sse.disconnect();
                        }
                        this.initSSE();
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        initSSE() {
            this.sse = new SSE(this.url);
            this.sse.connect();
            this.sse.on("open", (e) => {
                console.log("SSE Initialization");
            });
            this.sse.on("bind_wx_mp", this.onMessage);
            this.sse.on("error", (e) => {
                console.log("SSE Error", e);
            });
        },
        onMessage() {
            this.$message.success("关注成功")
            setTimeout(() => {
                this.$emit('update:visible', false);
                this.$emit('bind-success');
            }, 1000);
        },
    }
}
</script>

<style lang="less">
</style>
