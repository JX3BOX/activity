<template>
    <el-dialog
        v-model="dialogVisible"
        class="m-lover-v2-mate-card-dialog"
        modal-class="m-lover-v2-mate-card-modal"
        width="min(1180px, calc(100vw - 32px))"
        align-center
        destroy-on-close
        :fullscreen="questionnaireFullscreen"
        :close-on-click-modal="false"
        @open="onOpen"
        @closed="$emit('closed')"
    >
        <template #header>
            <div class="u-dialog-head">
                <span>搭子问卷</span>
                <small>完成名片后点击“开始匹配”，答题结果会随本次报名一并保存</small>
            </div>
        </template>

        <el-alert
            v-if="configurationError"
            type="error"
            :closable="false"
            show-icon
            title="搭子问卷地址配置无效"
            :description="configurationError"
        />
        <template v-else>
            <el-alert
                v-if="messageError"
                class="u-message-error"
                type="error"
                :closable="false"
                show-icon
                title="问卷数据未能接收"
                :description="messageError"
            />
            <div v-loading="loading" class="m-iframe-wrap">
                <iframe
                    ref="questionnaireFrame"
                    class="u-questionnaire-frame"
                    :src="iframeUrl"
                    title="剑三搭子名片问卷"
                    allow="clipboard-write"
                    @load="onFrameLoad"
                />
            </div>
        </template>
    </el-dialog>
</template>

<script>
const DEFAULT_MATE_CARD_URL = "https://matecard.gyork.fun/";

function isPlainObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

export default {
    name: "LoverV2MateCardQuestionnaire",
    emits: ["update:modelValue", "completed", "closed"],
    props: {
        modelValue: { type: Boolean, default: false },
        tuilanId: { type: [String, Number], default: "" },
    },
    data: function () {
        return {
            loading: true,
            messageHandled: false,
            messageError: "",
            questionnaireFullscreen: false,
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
        configuredUrl() {
            return process.env.VUE_APP_MATE_CARD_URL || DEFAULT_MATE_CARD_URL;
        },
        iframeUrl() {
            if (typeof window === "undefined") return "";
            try {
                const url = new URL(this.configuredUrl);
                url.searchParams.set("parent_origin", window.location.origin);
                return url.toString();
            } catch (_error) {
                return "";
            }
        },
        targetOrigin() {
            if (!this.iframeUrl) return "";
            return new URL(this.iframeUrl).origin;
        },
        configurationError() {
            return this.iframeUrl ? "" : "请检查 VUE_APP_MATE_CARD_URL，地址必须是完整的 HTTPS URL。";
        },
    },
    mounted() {
        this.onViewportChange();
        window.addEventListener("resize", this.onViewportChange);
        window.addEventListener("message", this.onMessage);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.onViewportChange);
        window.removeEventListener("message", this.onMessage);
    },
    methods: {
        onViewportChange() {
            this.questionnaireFullscreen = window.innerWidth <= 760;
        },
        onOpen() {
            this.loading = true;
            this.messageHandled = false;
            this.messageError = "";
        },
        onFrameLoad() {
            this.loading = false;
            const tuilanId = String(this.tuilanId || "").trim();
            if (!/^\d+$/.test(tuilanId) || !this.targetOrigin) return;
            this.$refs.questionnaireFrame?.contentWindow?.postMessage(
                { type: "init", tuilan_id: tuilanId },
                this.targetOrigin
            );
        },
        onMessage(event) {
            const frameWindow = this.$refs.questionnaireFrame?.contentWindow;
            if (!frameWindow || event.source !== frameWindow || event.origin !== this.targetOrigin) return;

            const message = event.data;
            if (!isPlainObject(message) || message.type !== "match-start" || message.status !== "success") return;
            if (this.messageHandled) return;

            try {
                const mateCardData = this.toMateCardData(message.data);
                this.messageHandled = true;
                this.messageError = "";
                this.$emit("completed", mateCardData);
                this.dialogVisible = false;
            } catch (error) {
                this.messageError = error.message || "返回数据格式不正确，请在问卷中重新确认开始匹配。";
            }
        },
        toMateCardData(data) {
            if (!isPlainObject(data) || !isPlainObject(data.variables)) {
                throw new Error("问卷返回的数据结构不完整，请重新确认开始匹配。");
            }
            const variables = data.variables;
            if (typeof data.tuilanId !== "string" || !/^\d+$/.test(data.tuilanId)) {
                throw new Error("问卷返回的推栏号无效，请返回问卷重新填写。");
            }
            if (String(variables.tuilan_id) !== data.tuilanId) {
                throw new Error("问卷身份信息不一致，请返回问卷重新填写。");
            }

            const tuilanId = data.tuilanId;
            return {
                tuilanId,
                profile: {
                    tuilanId,
                    nickName: String(variables.nick_name || data.roleName || ""),
                    gameName: String(variables.game_name || data.roleName || ""),
                    avatarUrl: String(variables.avatar_url || ""),
                },
                variables,
                judgment: typeof data.judgmentText === "string" ? data.judgmentText : null,
            };
        },
    },
};
</script>

<style scoped lang="less">
.u-dialog-head {
    display: flex;
    align-items: baseline;
    gap: 14px;

    span {
        color: #532f2a;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 23px;
        letter-spacing: 0.08em;
    }

    small {
        color: #a3887f;
        font-size: 12px;
    }
}

.u-message-error {
    margin-bottom: 12px;
}

.m-iframe-wrap {
    min-height: min(720px, calc(100vh - 170px));
    overflow: hidden;
    border: 1px solid rgba(132, 80, 62, 0.22);
    border-radius: 10px;
    background: #f7efe7;
}

.u-questionnaire-frame {
    display: block;
    width: 100%;
    height: min(720px, calc(100vh - 170px));
    border: 0;
}

@media screen and (max-width: 760px) {
    .m-lover-v2-mate-card-dialog.is-fullscreen {
        display: flex;
        flex-direction: column;

        :deep(.el-dialog__header) {
            flex: none;
        }

        :deep(.el-dialog__body) {
            flex: 1;
            min-height: 0;
            padding: 12px;
        }
    }

    .u-dialog-head {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
    }

    .m-iframe-wrap {
        min-height: calc(100dvh - 112px);
        border-radius: 0;
    }

    .u-questionnaire-frame {
        height: calc(100dvh - 112px);
    }
}
</style>
