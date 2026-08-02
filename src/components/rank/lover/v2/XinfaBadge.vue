<template>
    <el-tooltip :content="xinfa?.name || '心法未填'" placement="top">
        <span class="c-xinfa-badge" :class="{ 'is-compact': compact, 'is-empty': !xinfa }">
            <img v-if="xinfa" :src="showMountIcon(xinfa.id)" :alt="xinfa.name" />
            <span v-if="!compact">{{ xinfa?.name || "心法未填" }}</span>
        </span>
    </el-tooltip>
</template>

<script>
import { showMountIcon } from "@jx3box/jx3box-common/js/utils";
import { getXinfa } from "@/utils/lover-v2-xf";

export default {
    name: "LoverV2XinfaBadge",
    props: {
        mountId: { type: [Number, String], default: null },
        compact: { type: Boolean, default: false },
    },
    computed: {
        xinfa() {
            return getXinfa(this.mountId);
        },
    },
    methods: { showMountIcon },
};
</script>

<style scoped lang="less">
.c-xinfa-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #765c55;
    white-space: nowrap;

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    &.is-compact img {
        width: 22px;
        height: 22px;
    }

    &.is-empty {
        color: #aa9690;
        font-size: 12px;
    }
}
</style>
