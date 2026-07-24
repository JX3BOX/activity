<template>
    <div class="c-pz-snapshot-frame" v-loading="!ready && !errorMessage">
        <iframe
            ref="frame"
            :src="iframeUrl"
            :title="title"
            scrolling="no"
            frameborder="0"
            @load="handleLoad"
        />
        <el-alert v-if="errorMessage" :title="errorMessage" type="error" :closable="false" show-icon />
    </div>
</template>

<script>
import { __Root } from "@/utils/config";

const MESSAGE_VERSION = 1;

export default {
    name: "LoverV2PzSnapshotFrame",
    props: {
        schema: { type: Object, required: true },
        title: { type: String, default: "本场配装预览" },
    },
    data: function () {
        return {
            ready: false,
            errorMessage: "",
        };
    },
    computed: {
        iframeUrl() {
            const root = process.env.VUE_APP_PZ_IFRAME_URL || `${String(__Root).replace(/\/?$/, "/")}pz/iframe.html`;
            const url = new URL(root, window.location.origin);
            url.searchParams.set("mode", "horizontal");
            url.searchParams.set("disableClick", "1");
            url.searchParams.set("snapshot", "1");
            url.searchParams.set("fit", "1");
            return url.toString();
        },
        iframeOrigin() {
            return new URL(this.iframeUrl).origin;
        },
    },
    watch: {
        schema: {
            deep: true,
            handler() {
                this.sendSchema();
            },
        },
    },
    mounted() {
        window.addEventListener("message", this.handleMessage);
    },
    beforeUnmount() {
        window.removeEventListener("message", this.handleMessage);
    },
    methods: {
        handleLoad() {
            this.ready = true;
            this.sendSchema();
        },
        handleMessage(event) {
            if (event.source !== this.$refs.frame?.contentWindow || event.origin !== this.iframeOrigin) return;
            if (Number(event.data?.version) !== MESSAGE_VERSION) return;
            if (event.data?.type === "jx3box:pz-iframe-ready") {
                this.ready = true;
                this.errorMessage = "";
                this.sendSchema();
            } else if (event.data?.type === "jx3box:pz-iframe-error") {
                this.errorMessage = event.data.message || "配装预览加载失败";
            }
        },
        sendSchema() {
            const target = this.$refs.frame?.contentWindow;
            if (!target || !this.schema) return;
            target.postMessage(
                {
                    type: "jx3box:pz-iframe-render",
                    version: MESSAGE_VERSION,
                    schema: JSON.parse(JSON.stringify(this.schema)),
                },
                this.iframeOrigin
            );
        },
    },
};
</script>

<style scoped lang="less">
.c-pz-snapshot-frame {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid #ead9cf;
    border-radius: 10px;
    aspect-ratio: 16 / 9;
    background: #171a20;

    iframe {
        display: block;
        width: 100%;
        height: 100%;
    }

    .el-alert {
        position: absolute;
        right: 12px;
        bottom: 12px;
        left: 12px;
    }
}
</style>
