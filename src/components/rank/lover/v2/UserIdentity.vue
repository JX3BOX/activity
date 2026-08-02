<template>
    <div class="c-lover-user" :class="{ 'is-compact': compact }">
        <a
            v-if="profileUrl"
            class="u-avatar-link"
            :href="profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`在新标签页查看 ${displayName} 的个人主页`"
            @click.stop
        >
            <el-avatar class="u-avatar" :size="compact ? 36 : 46" :src="avatar" />
        </a>
        <el-avatar v-else class="u-avatar" :size="compact ? 36 : 46" :src="avatar" />
        <div class="u-main">
            <div class="u-name-row">
                <span class="u-name">{{ displayName }}</span>
                <el-tag v-if="showCaptain && user?.is_captain" size="small" effect="plain">队长</el-tag>
            </div>
            <button
                v-if="showUid && userId && uidCopyable"
                class="u-id"
                type="button"
                title="点击复制 UID"
                @click.stop="copyUid"
            >
                UID {{ userId }}
                <el-icon><CopyDocument /></el-icon>
            </button>
            <span v-else-if="showUid && userId" class="u-id is-static">UID {{ userId }}</span>
        </div>
        <div v-if="showMeta || user?.mount_id || showMountName" class="u-meta">
            <XinfaBadge
                v-if="user?.mount_id || showMountName"
                :mount-id="user.mount_id"
                :compact="compact && !showMountName"
            />
            <template v-if="showMeta">
                <span v-if="showScore && user?.arena_peak_score != null">最高 {{ user.arena_peak_score }} 分</span>
            </template>
        </div>
    </div>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import XinfaBadge from "./XinfaBadge.vue";

export default {
    name: "LoverV2UserIdentity",
    components: { XinfaBadge },
    props: {
        user: {
            type: Object,
            default: () => ({}),
        },
        compact: {
            type: Boolean,
            default: false,
        },
        showMeta: {
            type: Boolean,
            default: true,
        },
        showCaptain: {
            type: Boolean,
            default: true,
        },
        showUid: {
            type: Boolean,
            default: true,
        },
        showScore: {
            type: Boolean,
            default: true,
        },
        showMountName: {
            type: Boolean,
            default: false,
        },
        uidCopyable: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        userId() {
            return this.user?.user_id ?? this.user?.id ?? null;
        },
        displayName() {
            return this.user?.display_name || this.user?.name || "神秘侠士";
        },
        avatar() {
            return showAvatar(this.user?.avatar || "https://cdn.jx3box.com/image/common/avatar.png");
        },
        profileUrl() {
            return this.userId ? `https://www.jx3box.com/author/${encodeURIComponent(this.userId)}` : "";
        },
    },
    methods: {
        async copyUid() {
            if (!this.userId) return;
            await navigator.clipboard.writeText(String(this.userId));
            this.$message.success("UID 已复制");
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-user {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 12px;

    .u-avatar-link {
        display: inline-flex;
        flex: 0 0 auto;
        border-radius: 50%;
        outline: none;

        &:focus-visible {
            box-shadow: 0 0 0 2px rgba(135, 58, 51, 0.44);
        }

        &:hover .u-avatar {
            border-color: rgba(135, 58, 51, 0.62);
            box-shadow: 0 3px 10px rgba(91, 43, 36, 0.18);
            transform: translateY(-1px);
        }
    }

    .u-avatar {
        flex: 0 0 auto;
        border: 1px solid rgba(143, 86, 72, 0.2);
        background: #f1e4da;
        transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
    }

    .u-main {
        min-width: 0;
    }

    .u-name-row {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 6px;
    }

    .u-name {
        overflow: hidden;
        color: #4f302c;
        font-size: 15px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .u-id {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        margin: 3px 0 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: #a18d87;
        cursor: copy;
        font-size: 12px;

        &:hover {
            color: #a44338;
        }

        &.is-static {
            cursor: default;

            &:hover {
                color: #a18d87;
            }
        }
    }

    .u-meta {
        display: flex;
        flex: 1 0 auto;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        color: #8f7872;
        font-size: 12px;
    }

    &.is-compact {
        gap: 9px;

        .u-name {
            font-size: 14px;
        }
    }
}

@media screen and (max-width: 640px) {
    .c-lover-user {
        flex-wrap: wrap;

        .u-meta {
            flex-basis: 100%;
            justify-content: flex-start;
            padding-left: 58px;
        }
    }
}
</style>
