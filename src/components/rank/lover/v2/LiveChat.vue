<template>
    <section class="c-lover-live-chat m-lover-v2-panel">
        <header class="m-chat-head">
            <div>
                <h3>同席江湖</h3>
                <p>登录后可与正在观看比赛的侠士实时交流。</p>
            </div>
            <span class="u-connection" :class="{ connected }">
                <i></i>{{ connected ? "实时连接中" : "正在连接" }}
            </span>
        </header>

        <div v-if="!isLogin" class="m-chat-placeholder">
            <strong>登录后进入赛事聊天室</strong>
            <el-button type="primary" @click="toLogin">登录并加入</el-button>
        </div>
        <div v-else-if="roomUnavailable" class="m-chat-placeholder">
            <strong>聊天室尚未开放</strong>
            <span>{{ roomError || "赛事群尚未创建，请稍后再试。" }}</span>
            <el-button @click="initialize">重新连接</el-button>
        </div>
        <template v-else>
            <div ref="messageList" class="m-chat-messages" v-loading="loading">
                <div v-if="!messages.length && !loading" class="u-empty">还没有人发言，来打个招呼吧。</div>
                <article
                    v-for="item in messages"
                    :key="item.key"
                    class="u-message"
                    :class="{ 'is-self': Number(item.from) === userId }"
                >
                    <a
                        :href="`https://www.jx3box.com/author/${item.from}`"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <el-avatar :size="34" :src="profile(item.from).avatar || defaultAvatar" />
                    </a>
                    <div>
                        <span class="u-author">
                            {{ profile(item.from).name || `侠士 ${item.from}` }}
                            <small>{{ formatTime(item.timestamp) }}</small>
                        </span>
                        <p v-if="item.renderedContent" v-html="item.renderedContent"></p>
                        <p v-else>{{ item.content }}</p>
                    </div>
                </article>
            </div>
            <footer class="m-chat-compose">
                <Emotion
                    class="u-chat-emotion"
                    type="pop"
                    :max="6"
                    @selected="handleEmotionSelected"
                />
                <el-input
                    :id="inputId"
                    v-model="draft"
                    maxlength="500"
                    show-word-limit
                    :disabled="!canSpeak || !connected"
                    :placeholder="composePlaceholder"
                    @keyup.enter.exact="send"
                />
                <el-button type="primary" :disabled="!canSend" @click="send">发送</el-button>
            </footer>
        </template>
    </section>
</template>

<script>
import mqtt from "mqtt";
import dayjs from "dayjs";
import User from "@jx3box/jx3box-common/js/user.js";
import Emotion from "@jx3box/jx3box-emotion/src/Emotion2.vue";
import { formatContent } from "@jx3box/jx3box-ui/utils/emotion";
import { default_avatar as defaultAvatar } from "@/utils/config";
import { getUsers } from "@/service/event/topic";
import {
    getEventChatGroupId,
    getEventChatHistory,
    isAlreadyGroupMemberError,
    joinEventChatGroup,
} from "@/service/realtime-room";

const APP_ID = "lover";
const BROKER_URL = process.env.VUE_APP_REALTIME_MQTT || "wss://mqtt.jx3box.com/mqtt";

export default {
    name: "LoverV2LiveChat",
    components: {
        Emotion,
    },
    props: {
        eventId: { type: Number, required: true },
    },
    data: function () {
        return {
            defaultAvatar,
            client: null,
            topic: "",
            connected: false,
            canSpeak: true,
            messages: [],
            profiles: {},
            draft: "",
            loading: false,
            roomUnavailable: false,
            roomError: "",
        };
    },
    computed: {
        isLogin() {
            return User.isLogin();
        },
        userId() {
            const info = User.getInfo() || User.profile || {};
            return Number(info.uid ?? info.ID ?? info.id);
        },
        inputId() {
            return `lover-live-chat-input-${this.eventId}`;
        },
        canSend() {
            return this.connected && this.canSpeak && Boolean(this.draft.trim());
        },
        composePlaceholder() {
            if (!this.connected) return "正在连接聊天室…";
            return "和大家聊聊这场比赛…";
        },
    },
    watch: {
        eventId() {
            this.initialize();
        },
    },
    mounted() {
        this.initialize();
    },
    beforeUnmount() {
        this.disconnect();
    },
    methods: {
        toLogin() {
            User.toLogin();
        },
        profile(uid) {
            return this.profiles[uid] || {};
        },
        formatTime(timestamp) {
            return dayjs(Number(timestamp) || undefined).format("HH:mm");
        },
        async initialize() {
            this.disconnect();
            this.messages = [];
            this.roomUnavailable = false;
            this.roomError = "";
            if (!this.isLogin || !this.eventId) return;
            this.loading = true;
            try {
                try {
                    await joinEventChatGroup(this.eventId, this.userId);
                } catch (error) {
                    if (!isAlreadyGroupMemberError(error)) throw error;
                }
                const groupId = getEventChatGroupId(this.eventId);
                const historyRes = await getEventChatHistory(this.eventId, { pageIndex: 1, pageSize: 30 });
                this.topic = `${APP_ID}/group/${groupId}`;
                const messages = (historyRes.data.data.list || [])
                    .map(this.normalizeMessage)
                    .filter(Boolean)
                    .reverse();
                await Promise.all(messages.map((message) => this.renderMessageContent(message)));
                this.messages = messages;
                await this.loadProfiles();
                this.connect();
                this.scrollToBottom();
            } catch (error) {
                console.error("[LoverV2LiveChat.initialize]", error);
                const data = error?.data || error?.response?.data;
                this.roomError = data?.msg || "";
                this.roomUnavailable = true;
            } finally {
                this.loading = false;
            }
        },
        connect() {
            const token = User.getToken();
            if (!token || !this.topic) return;
            const clientId = `${APP_ID}_${this.userId}`;
            this.client = mqtt.connect(BROKER_URL, {
                clientId,
                username: clientId,
                password: token,
                clean: true,
                protocolVersion: 4,
                keepalive: 30,
                reconnectPeriod: 3000,
            });
            this.client.on("connect", () => {
                this.connected = true;
                this.client.subscribe(this.topic, { qos: 1 }, (error) => {
                    if (error) console.error("[LoverV2LiveChat.subscribe]", error);
                });
            });
            this.client.on("message", (_topic, payload) => this.receive(payload.toString()));
            this.client.on("error", (error) => console.error("[LoverV2LiveChat.mqtt]", error));
            this.client.on("close", () => {
                this.connected = false;
            });
        },
        disconnect() {
            if (this.client) {
                this.client.options.reconnectPeriod = 0;
                this.client.end(true);
                this.client = null;
            }
            this.connected = false;
        },
        normalizeMessage(row) {
            let payload = row;
            if (typeof row?.payload === "string") {
                try {
                    payload = JSON.parse(row.payload);
                } catch (error) {
                    console.error("[LoverV2LiveChat.normalizeMessage]", error);
                    return null;
                }
            }
            if (!payload || payload.msg_type !== "text" || !payload.content) return null;
            return {
                key: row.msg_id || payload.msg_id || `${payload.from}-${payload.timestamp}-${payload.content}`,
                msg_id: row.msg_id || payload.msg_id || "",
                from: String(payload.from || row.from_user),
                content: String(payload.content),
                renderedContent: "",
                timestamp: Number(payload.timestamp) || new Date(row.created_at).getTime(),
            };
        },
        async receive(raw) {
            let payload;
            try {
                payload = JSON.parse(raw);
            } catch (error) {
                console.error("[LoverV2LiveChat.receive]", error);
                return;
            }
            const message = this.normalizeMessage(payload);
            if (!message || this.messages.some((item) => item.key === message.key)) return;
            await this.renderMessageContent(message);
            this.messages.push(message);
            this.loadProfiles();
            this.scrollToBottom();
        },
        async renderMessageContent(message) {
            try {
                message.renderedContent = await formatContent(message.content);
            } catch (error) {
                console.error("[LoverV2LiveChat.renderMessageContent]", error);
            }
        },
        async handleEmotionSelected(emotion) {
            const input = document.querySelector(`#${this.inputId}`);
            const value = emotion?.key || "";
            if (!input || !value) return;
            const start = input.selectionStart ?? this.draft.length;
            const end = input.selectionEnd ?? start;
            const content = `${this.draft.slice(0, start)}${value}${this.draft.slice(end)}`.slice(0, 500);
            this.draft = content;
            await this.$nextTick();
            const cursor = Math.min(start + value.length, content.length);
            input.focus();
            input.setSelectionRange(cursor, cursor);
        },
        async loadProfiles() {
            const missing = [...new Set(this.messages.map((item) => Number(item.from)))]
                .filter(Boolean)
                .filter((uid) => !this.profiles[uid]);
            if (!missing.length) return;
            try {
                const res = await getUsers({ list: missing.join(",") });
                const patch = {};
                for (const user of res.data.data || []) {
                    patch[Number(user.ID)] = { name: user.display_name, avatar: user.user_avatar };
                }
                this.profiles = { ...this.profiles, ...patch };
            } catch (error) {
                console.error("[LoverV2LiveChat.loadProfiles]", error);
            }
        },
        send() {
            const content = this.draft.trim();
            if (!content || !this.client || !this.canSend) return;
            const payload = JSON.stringify({
                from: String(this.userId),
                to: getEventChatGroupId(this.eventId),
                to_type: "group",
                msg_type: "text",
                content,
                timestamp: Date.now(),
            });
            this.client.publish(this.topic, payload, { qos: 1 }, (error) => {
                if (error) {
                    console.error("[LoverV2LiveChat.send]", error);
                    return;
                }
                this.draft = "";
            });
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messageList;
                if (container) container.scrollTop = container.scrollHeight;
            });
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-live-chat {
    margin-top: 28px;
    padding: 22px;
}

.m-chat-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(150, 93, 72, 0.22);

    h3 {
        margin: 0 0 5px;
        color: #63362f;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 24px;
        letter-spacing: 0.1em;
    }

    p {
        margin: 0;
        color: #9a817a;
        font-size: 13px;
    }
}

.u-connection {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #a18a83;
    font-size: 12px;

    i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #a99790;
    }

    &.connected i {
        background: #71864f;
        box-shadow: 0 0 0 4px rgba(113, 134, 79, 0.12);
    }
}

.m-chat-messages {
    height: 420px;
    overflow-y: auto;
    padding: 16px 6px;
}

.u-empty,
.m-chat-placeholder {
    display: flex;
    min-height: 180px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
    color: #9b827b;
}

.u-message {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 10px;
    margin-bottom: 14px;

    p {
        display: inline-block;
        max-width: min(720px, 90%);
        margin: 5px 0 0;
        padding: 8px 12px;
        border-radius: 2px 12px 12px;
        background: rgba(247, 229, 205, 0.78);
        color: #5f413b;
        line-height: 1.65;
        overflow-wrap: anywhere;
        white-space: pre-wrap;

        :deep(img) {
            display: inline-block;
            margin: 0 2px;
            vertical-align: middle;
        }
    }

    &.is-self p {
        background: rgba(227, 196, 159, 0.66);
    }
}

.u-author {
    color: #7c5048;
    font-size: 13px;
    font-weight: 600;

    small {
        margin-left: 8px;
        color: #b09a94;
        font-weight: normal;
    }
}

.m-chat-compose {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) 90px;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid rgba(150, 93, 72, 0.22);

    .u-chat-emotion {
        margin: 0;
    }
}

@media screen and (max-width: 620px) {
    .m-chat-head {
        align-items: stretch;
        flex-direction: column;
    }

    .m-chat-messages {
        height: 360px;
    }
}
</style>
