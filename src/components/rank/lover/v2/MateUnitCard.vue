<template>
    <article class="c-lover-unit-card m-lover-v2-panel">
        <div class="u-head">
            <div>
                <strong>{{ memberNames }}</strong>
                <span>{{ captainName }} 发起的搭子队</span>
            </div>
            <el-tag type="success" effect="plain">两人已集结</el-tag>
        </div>
        <div class="m-members">
            <div v-for="member in unit.members" :key="member.user_id" class="u-member">
                <UserIdentity :user="member" />
                <IntroductionText :text="member.introduction" compact />
            </div>
        </div>
        <el-button type="primary" plain :loading="loading" :disabled="disabled" @click="$emit('invite', unit)">
            邀请加入四人阵容
        </el-button>
    </article>
</template>

<script>
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";

export default {
    name: "LoverV2MateUnitCard",
    components: { IntroductionText, UserIdentity },
    emits: ["invite"],
    props: {
        unit: { type: Object, required: true },
        disabled: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    computed: {
        captainName() {
            return this.unit.members?.find((member) => member.is_captain)?.display_name || "搭子队长";
        },
        memberNames() {
            const names = (this.unit.members || []).map((member) => member.display_name).filter(Boolean);
            return names.length ? names.join(" · ") : "已集结搭子队";
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-unit-card {
    display: flex;
    min-height: 220px;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
}

.u-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    strong,
    span {
        display: block;
    }

    strong {
        color: #57352f;
        font-size: 16px;
    }

    span {
        margin-top: 4px;
        color: #a08881;
        font-size: 12px;
    }
}

.m-members {
    display: grid;
    flex: 1;
    gap: 12px;
}

.u-member {
    display: grid;
    gap: 9px;
    padding-bottom: 12px;
    border-bottom: 1px dashed #ead9cf;

    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
}
</style>
