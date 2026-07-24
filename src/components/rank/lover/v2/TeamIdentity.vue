<template>
    <div class="c-lover-team" :class="{ 'is-compact': compact }">
        <el-avatar class="u-logo" shape="square" :size="compact ? 40 : 54" :src="logo">
            {{ team?.name?.slice(0, 1) || "队" }}
        </el-avatar>
        <div class="u-main">
            <strong>{{ team?.name || "待定战队" }}</strong>
            <button v-if="team?.id" type="button" title="点击复制战队编号" @click.stop="copyId">
                战队 #{{ team.id }}
                <el-icon><CopyDocument /></el-icon>
            </button>
            <p v-if="showSlogan && team?.slogan">{{ team.slogan }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoverV2TeamIdentity",
    props: {
        team: {
            type: Object,
            default: () => ({}),
        },
        compact: {
            type: Boolean,
            default: false,
        },
        showSlogan: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        logo() {
            return this.team?.logo || "https://cdn.jx3box.com/image/common/avatar.png";
        },
    },
    methods: {
        async copyId() {
            await navigator.clipboard.writeText(String(this.team.id));
            this.$message.success("战队编号已复制");
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-team {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 13px;

    .u-logo {
        flex: 0 0 auto;
        border: 1px solid rgba(143, 86, 72, 0.2);
        border-radius: 10px;
        background: #7d3934;
        color: #f9e4c1;
    }

    .u-main {
        min-width: 0;
    }

    strong {
        display: block;
        overflow: hidden;
        color: #4f302c;
        font-size: 17px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        margin-top: 4px;
        padding: 0;
        border: 0;
        background: transparent;
        color: #a18d87;
        cursor: copy;
        font-size: 12px;

        &:hover {
            color: #a44338;
        }
    }

    p {
        overflow: hidden;
        max-width: 460px;
        margin: 6px 0 0;
        color: #8e736c;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &.is-compact strong {
        font-size: 15px;
    }
}
</style>
