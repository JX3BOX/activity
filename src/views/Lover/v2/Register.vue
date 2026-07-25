<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>报名参赛</h2>
                <p>选择最符合你当前情况的身份；报名期内可以取消后改报，审核通过后再进入组队流程。</p>
            </div>
            <el-tag size="large" effect="plain">{{ phaseMap[event?.phase] || "赛事筹备中" }}</el-tag>
        </section>

        <div v-if="!isLogin" class="m-lover-v2-panel m-lover-v2-empty">
            <FeatureBadge name="lover" />
            <h3>登录后才能报名与查看个人进度</h3>
            <p>登录状态只用于确认你的魔盒 UID 与赛事身份。</p>
            <el-button type="primary" size="large" @click="toLogin">登录魔盒账号</el-button>
        </div>

        <template v-else-if="!contextError">
            <RegistrationStatusCard
                v-if="registration && !editing"
                :registration="registration"
                :actions="actions"
                :loading="submitting"
                @edit="editing = true"
                @cancel="confirmCancel"
            />

            <template v-if="!registration || editing">
                <div v-if="!registration" class="m-register-types">
                    <RegistrationTypeCard
                        v-for="item in types"
                        :key="item.type"
                        v-bind="item"
                        :selected="selectedType === item.type"
                        :disabled="!canCreate"
                        @select="selectedType = $event"
                    />
                </div>

                <el-alert
                    v-if="selectedType === 'lover' && loverNetError"
                    class="u-lover-net-error"
                    type="warning"
                    :closable="false"
                    show-icon
                    title="情缘关系暂时没有读取成功"
                    description="请先重新加载关系资料；恢复前不会提交不完整的情缘报名。"
                >
                    <template #default>
                        <el-button text type="primary" @click="reloadLoverNet">重新加载情缘关系</el-button>
                    </template>
                </el-alert>

                <RegistrationForm
                    v-if="selectedType && (registration || canCreate)"
                    :key="`${selectedType}-${registration?.id || 'new'}`"
                    :selected-type="selectedType"
                    :registration="registration"
                    :lover-net="$store.state.lover_net"
                    :current-user="currentUser"
                    :profile="profile"
                    :submitting="submitting"
                    :mate-card-reset-key="mateCardResetKey"
                    @submit="submitRegistration"
                    @cancel-edit="editing = false"
                />
            </template>

            <div v-if="!registration && !canCreate" class="m-lover-v2-panel m-register-closed">
                <el-result icon="info" title="当前不能新报名" sub-title="报名窗口尚未开放或已经结束，你仍可查看公开战队与赛程。">
                    <template #extra>
                        <el-button @click="$router.push({ name: 'v2-team', params: { slug } })">查看参赛战队</el-button>
                    </template>
                </el-result>
            </div>
        </template>

        <div v-else class="m-lover-v2-panel m-lover-v2-empty">
            <FeatureBadge name="lover" />
            <h3>个人报名状态暂时无法读取</h3>
            <p>重新加载成功前，不会把网络问题误显示成“尚未报名”。</p>
            <el-button type="primary" :loading="$store.state.v2_context_loading" @click="refreshContext">
                重新加载报名状态
            </el-button>
        </div>
    </LoverV2Layout>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { getMyProfile } from "@/service/rank/lover";
import { cancelRegistration, createRegistration, updateRegistration } from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import RegistrationForm from "@/components/rank/lover/v2/RegistrationForm.vue";
import RegistrationStatusCard from "@/components/rank/lover/v2/RegistrationStatusCard.vue";
import RegistrationTypeCard from "@/components/rank/lover/v2/RegistrationTypeCard.vue";
import { phaseMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2Register",
    components: {
        LoverV2Layout,
        FeatureBadge,
        RegistrationForm,
        RegistrationStatusCard,
        RegistrationTypeCard,
    },
    data: function () {
        return {
            phaseMap,
            selectedType: "lover",
            editing: false,
            submitting: false,
            mateCardResetKey: 0,
            profile: {},
            types: [
                {
                    type: "lover",
                    title: "情缘报名",
                    description: "与你已绑定的情缘共同报名，负责战队名称与队徽，并成为最终五人战队的核心。",
                },
                {
                    type: "mate",
                    title: "搭子报名",
                    description: "先以个人身份报名，审核通过后在大厅寻找另一位搭子，再等待情缘队长邀请。",
                },
                {
                    type: "solo",
                    title: "独狼报名",
                    description: "以个人身份进入独狼候选池，由情缘队长通过盲盒随机抽取加入战队。",
                },
            ],
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        event() {
            return this.$store.state.v2_event;
        },
        context() {
            return this.$store.state.v2_context;
        },
        contextError() {
            return this.$store.state.v2_context_error;
        },
        loverNetError() {
            return this.$store.state.lover_net_error;
        },
        registration() {
            return this.context?.registration || null;
        },
        actions() {
            return this.context?.actions || [];
        },
        canCreate() {
            return this.actions.includes("registration.create");
        },
        slug() {
            return this.$store.state.slug;
        },
        isLogin() {
            return User.isLogin();
        },
        currentUser() {
            const info = User.getInfo() || User.profile || {};
            return {
                user_id: Number(info.uid ?? info.ID ?? info.id),
                display_name: info.display_name || info.name || null,
                avatar: info.avatar_origin || info.user_avatar || info.avatar || null,
            };
        },
    },
    watch: {
        registration: {
            handler: function (value) {
                if (value?.type) this.selectedType = value.type;
            },
            immediate: true,
        },
    },
    mounted() {
        if (this.isLogin) {
            getMyProfile()
                .then((res) => {
                    this.profile = res.data?.data || {};
                })
                .catch((error) => {
                    console.error("[LoverV2Register.loadProfile]", error);
                });
        }
    },
    methods: {
        toLogin() {
            User.toLogin();
        },
        async refreshContext() {
            await this.$store.dispatch("loadV2Context", { force: true });
        },
        async reloadLoverNet() {
            await this.$store.dispatch("loadLoverRelationNet", { force: true }).catch((error) => {
                console.error("[LoverV2Register.reloadLoverNet]", error);
            });
        },
        async submitRegistration(payload) {
            if (!this.registration && !this.canCreate) {
                this.$message.warning("当前报名窗口未开放，请刷新活动状态后再试");
                return;
            }
            this.submitting = true;
            const wasEditing = Boolean(this.registration);
            try {
                if (this.registration) await updateRegistration(this.eventId, this.registration.id, payload);
                else await createRegistration(this.eventId, payload);
                await this.refreshContext();
                this.editing = false;
                this.$message.success(wasEditing ? "报名资料已更新" : "报名已提交，请等待审核");
            } catch (error) {
                console.error("[LoverV2Register.submitRegistration]", error);
                const code = Number(error?.data?.code ?? error?.response?.data?.code);
                // 4505 除了由请求层统一提示，还要求清除失效问卷并允许用户重新填写。
                if (code === 4505) this.mateCardResetKey += 1;
            } finally {
                this.submitting = false;
            }
        },
        async confirmCancel() {
            if (this.submitting) return;
            const confirmed = await this.$confirm(
                "取消后会释放当前参赛占用，并作废与本次报名相关的邀请或组队关系。确定继续吗？",
                "取消本次报名",
                { type: "warning", confirmButtonText: "确认取消", cancelButtonText: "保留报名" }
            )
                .then(() => true)
                .catch(() => false);
            if (!confirmed) return;
            this.submitting = true;
            try {
                await cancelRegistration(this.eventId, this.registration.id);
                await this.refreshContext();
                this.editing = false;
                this.$message.success("报名已取消，你可以重新选择身份");
            } catch (error) {
                console.error("[LoverV2Register.confirmCancel]", error);
            } finally {
                this.submitting = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
.m-register-types {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 24px;
}

.m-register-closed {
    margin-top: 22px;
}

.u-lover-net-error {
    margin-bottom: 20px;
}

@media screen and (max-width: 880px) {
    .m-register-types {
        grid-template-columns: 1fr;
    }
}
</style>
