<template>
    <article class="c-lover-registration-status m-lover-v2-panel">
        <FeatureBadge :name="registration.type" />
        <div class="u-content">
            <div class="u-title-row">
                <div>
                    <p>我的报名 · {{ registrationTypeMap[registration.type] }}</p>
                    <h3>{{ statusTitle }}</h3>
                </div>
                <el-tag size="large" :type="statusType">{{ registrationStatusMap[registration.status] }}</el-tag>
            </div>
            <el-alert
                v-if="registration.status === 'rejected'"
                type="warning"
                :closable="false"
                show-icon
                :title="registration.review_comment || '请按审核意见修改资料后重新提交'"
            />
            <div v-if="registration.team_name" class="u-team-copy">
                <strong>{{ registration.team_name }}</strong>
                <span>{{ registration.slogan || "暂未填写参赛宣言" }}</span>
            </div>
            <IntroductionText
                v-if="registration.type !== 'lover'"
                class="u-introduction"
                :text="registration.introduction"
                empty-text="你暂未填写自我介绍，可以修改报名资料后补充"
            />
            <div class="m-members">
                <UserIdentity v-for="member in registration.members" :key="member.user_id" :user="member" />
            </div>
            <div class="u-actions">
                <el-button v-if="canUpdate" type="primary" :disabled="loading" @click="$emit('edit')">
                    {{ registration.status === "rejected" ? "修改并重新提交" : "修改报名资料" }}
                </el-button>
                <el-button v-if="canCancel" type="danger" plain :loading="loading" @click="$emit('cancel')">
                    取消本次报名
                </el-button>
            </div>
        </div>
    </article>
</template>

<script>
import FeatureBadge from "./FeatureBadge.vue";
import IntroductionText from "./IntroductionText.vue";
import UserIdentity from "./UserIdentity.vue";
import { registrationStatusMap, registrationTypeMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2RegistrationStatusCard",
    components: { FeatureBadge, IntroductionText, UserIdentity },
    emits: ["edit", "cancel"],
    props: {
        registration: { type: Object, required: true },
        actions: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false },
    },
    data: function () {
        return { registrationStatusMap, registrationTypeMap };
    },
    computed: {
        canUpdate() {
            return this.actions.includes("registration.update");
        },
        canCancel() {
            return this.actions.includes("registration.cancel");
        },
        statusTitle() {
            return {
                pending_review: "资料已提交，正在等待运营审核",
                approved: "报名已通过，可以继续完成组队",
                rejected: "审核发现需要补充或修改的资料",
                cancelled: "本次报名已取消",
            }[this.registration.status];
        },
        statusType() {
            return {
                pending_review: "warning",
                approved: "success",
                rejected: "danger",
                cancelled: "info",
            }[this.registration.status];
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-registration-status {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    padding: 28px;
}

.u-content {
    min-width: 0;
    flex: 1;
}

.u-title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;

    p {
        margin: 0 0 6px;
        color: #a07f75;
        font-size: 13px;
    }

    h3 {
        margin: 0;
        color: #56342f;
        font-size: 22px;
    }
}

.u-team-copy {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin: 18px 0;
    padding: 14px 16px;
    border-radius: 10px;
    background: #f8eee6;

    strong {
        color: #623a34;
        font-size: 18px;
    }

    span {
        color: #9a7e76;
        font-size: 13px;
    }
}

.m-members {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 18px;
}

.u-introduction {
    margin-top: 18px;
}

.u-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
}

@media screen and (max-width: 720px) {
    .c-lover-registration-status {
        align-items: center;
        flex-direction: column;
        padding: 20px;
    }

    .m-members {
        grid-template-columns: 1fr;
    }
}
</style>
