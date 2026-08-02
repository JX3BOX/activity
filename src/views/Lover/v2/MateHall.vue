<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>组队大厅</h2>
                <p>{{ pageSubtitle }}</p>
            </div>
            <el-button v-if="showHistoryEntry" @click="historyVisible = true">查看邀请记录</el-button>
        </section>

        <InvitationInbox
            v-if="showInvitationInbox"
            :invitations="context?.invitations || []"
            :loading-id="invitationLoadingId"
            :loading-action="invitationLoadingAction"
            @accept="handleInvitation($event, 'accept')"
            @reject="handleInvitation($event, 'reject')"
            @view-mate-card="openInvitationMateCard"
        />

        <section v-if="contextError" class="m-role-guide m-lover-v2-panel">
            <FeatureBadge name="team" />
            <div class="u-role-copy">
                <span class="u-eyebrow">个人状态 · 暂未读取</span>
                <h3>暂时无法判断你该进入哪一种组队方式</h3>
                <p>请先重新加载个人参赛状态；在状态恢复前，这里不会把你误当作未报名或展示错误的邀请入口。</p>
                <el-button type="primary" :loading="$store.state.v2_context_loading" @click="refreshContext">
                    重新加载个人状态
                </el-button>
            </div>
        </section>

        <section v-else-if="hallKind" class="m-hall-panel m-lover-v2-panel">
            <div class="u-hall-explain">
                <div class="u-hall-heading">
                    <FeatureBadge :name="hallKind === 'mate' ? 'mate' : 'team'" small />
                    <div>
                        <span>{{ hallKind === "mate" ? "搭子侠士" : "情缘队伍" }}</span>
                        <h3>{{ hallKind === "mate" ? "寻找另一位搭子" : "邀请完整搭子队" }}</h3>
                        <p v-if="hallKind === 'mate'">
                            这里按双方问卷契合度展示审核通过且尚未配对的搭子；排序与分数均由赛事服务统一计算。
                        </p>
                        <p v-else>这里展示已结成两人队、尚未加入战队的搭子。由情缘队长向心仪的搭子队发出邀约。</p>
                    </div>
                </div>
                <el-tag :type="hallCanInvite ? 'success' : 'info'">
                    {{ hallPermissionText }}
                </el-tag>
            </div>
            <el-alert
                v-if="hallUnavailable"
                type="warning"
                :closable="false"
                show-icon
                :title="hallKind === 'mate' ? '搭子列表暂时无法加载' : '搭子队列表暂时无法加载'"
                description="这不是空大厅，请稍后刷新重试；你的报名和邀请状态不会受到影响。"
            />
            <div v-if="hallLoading || hall.list.length" v-loading="hallLoading" class="m-card-grid">
                <template v-if="hallKind === 'mate'">
                    <MateRegistrationCard
                        v-for="item in hall.list"
                        :key="item.id"
                        :registration="item"
                        :loading="sendingId === item.id"
                        :cooldown="cooldown"
                        :disabled="sendingId !== null"
                        @invite="inviteMate"
                        @view="openMateCard"
                    />
                </template>
                <template v-else>
                    <MateUnitCard v-for="item in hall.list" :key="item.id" :unit="item" @view="openUnitDetail" />
                </template>
            </div>
            <EmptyState
                v-else-if="!hallUnavailable"
                :icon="hallKind === 'mate' ? 'mate' : 'team'"
                :title="hallKind === 'mate' ? '暂时没有等待相逢的搭子' : '暂时没有可邀请的搭子队'"
                :description="
                    hallKind === 'mate'
                        ? '有新的搭子通过审核后，会自动出现在这里。'
                        : '新的搭子队结成后，会自动出现在这里。'
                "
            />

            <div v-if="hall.count > hall.pageSize" class="m-lover-v2-pagination">
                <el-pagination
                    v-model:current-page="hall.page"
                    :page-size="hall.pageSize"
                    :total="hall.count"
                    layout="prev, pager, next"
                    @current-change="loadCurrentHall"
                />
            </div>
        </section>

        <section v-else-if="context?.team" class="m-role-guide m-lover-v2-panel">
            <FeatureBadge name="team" />
            <div class="u-role-copy">
                <span class="u-eyebrow">五人战队 · 已有归处</span>
                <h3>{{ joinedTeamTitle }}</h3>
                <p>{{ joinedTeamDescription }}</p>
                <el-button
                    type="primary"
                    @click="$router.push({ name: 'v2-team', params: { slug: $route.params.slug } })"
                >
                    查看战队与竞赛控制台
                </el-button>
            </div>
        </section>

        <section
            v-else-if="registrationType === 'solo' && registrationApproved"
            class="m-role-guide is-solo m-lover-v2-panel"
        >
            <FeatureBadge name="solo" />
            <div class="u-role-copy">
                <span class="u-eyebrow">独狼侠士 · 静候天命</span>
                <h3>你会成为队伍的最后一块拼图</h3>
                <p>
                    独狼无需在这里主动寻找队伍。开赛前，尚缺第五位队员的战队会抽取独狼盲盒；缘分揭晓后，你将自动加入阵容，与四位新队友并肩赴赛。
                </p>
                <small>现在只需安心备战，留意活动页面的组队结果即可。</small>
            </div>
        </section>

        <section
            v-else-if="registrationType === 'mate' && registrationApproved && context?.unit"
            class="m-role-guide m-lover-v2-panel"
        >
            <FeatureBadge name="mate" />
            <div class="u-role-copy">
                <span class="u-eyebrow">搭子侠士 · 已结伴</span>
                <h3>你们已经结成两人搭子队</h3>
                <p>接下来无需继续寻找搭子。情缘队伍发来的邀请会出现在上方，由固定队长确认后即可加入四人阵容。</p>
                <el-button
                    v-if="actions.includes('unit.dissolve')"
                    type="danger"
                    plain
                    :loading="unitActionLoading"
                    @click="confirmDissolve"
                >
                    解散当前搭子队
                </el-button>
            </div>
        </section>

        <section v-else-if="context?.registration && !registrationApproved" class="m-role-guide m-lover-v2-panel">
            <FeatureBadge :name="registrationType || 'team'" />
            <div class="u-role-copy">
                <span class="u-eyebrow">报名进度 · {{ registrationStatusLabel }}</span>
                <h3>{{ registrationStatusTitle }}</h3>
                <p>{{ registrationStatusDescription }}</p>
                <el-button
                    type="primary"
                    @click="$router.push({ name: 'v2-register', params: { slug: $route.params.slug } })"
                >
                    查看报名进度
                </el-button>
            </div>
        </section>

        <section v-else class="m-role-guide m-lover-v2-panel">
            <FeatureBadge name="team" />
            <div class="u-role-copy">
                <span class="u-eyebrow">{{ isLogin ? "尚未报名 · 先行登记" : "尚未登录 · 先识身份" }}</span>
                <h3>{{ isLogin ? "完成报名后，这里会显示你的组队入口" : "登录并报名后，再来这里寻找队友" }}</h3>
                <p>不同身份有不同的组队方式，这里只会展示与你当前报名身份有关的内容。</p>
                <el-button
                    type="primary"
                    @click="$router.push({ name: 'v2-register', params: { slug: $route.params.slug } })"
                >
                    前往报名参赛
                </el-button>
            </div>
        </section>

        <section v-if="canPreviewIndividuals" class="m-hall-panel m-lover-v2-panel">
            <div class="u-hall-explain">
                <div>
                    <h3>随缘看看个人搭子</h3>
                    <p>这里随机展示尚未配对、已经通过审核的搭子，仅供预览名片，不提供邀请操作。</p>
                </div>
                <el-button :loading="previewLoading" @click="refreshPreview">换一批</el-button>
            </div>
            <div v-loading="previewLoading" class="m-card-grid">
                <MateRegistrationCard
                    v-for="item in previewHall.list"
                    :key="item.id"
                    :registration="item"
                    preview
                    @view="openMateCard"
                />
            </div>
            <EmptyState
                v-if="!previewLoading && !previewHall.list.length"
                icon="mate"
                title="暂时没有可预览的个人搭子"
                description="新的个人搭子通过审核后会出现在这里。"
            />
        </section>

        <el-dialog
            v-model="historyVisible"
            class="m-lover-v2-history-dialog"
            modal-class="m-lover-v2-history-modal"
            width="min(880px, calc(100vw - 32px))"
            align-center
            destroy-on-close
            @open="loadHistory"
        >
            <template #header>
                <div class="u-history-head">
                    <span>我的邀请记录</span>
                    <small>往来的每一次邀约，都留在这卷江湖笺中</small>
                </div>
            </template>
            <el-tabs v-model="historyDirection" @tab-change="loadHistory">
                <el-tab-pane label="收到的邀请" name="incoming" />
                <el-tab-pane label="发出的邀请" name="outgoing" />
            </el-tabs>
            <div class="m-history-table">
                <el-table v-loading="historyLoading" :data="history.list" stripe max-height="480">
                    <el-table-column label="类型" width="140">
                        <template #default="scope">
                            {{ scope.row.type === "mate_pair" ? "搭子配对" : "加入四人阵容" }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="historyDirection === 'incoming' ? '邀请方' : '受邀对象'" min-width="280">
                        <template #default="scope">
                            <div
                                v-if="historyDirection === 'outgoing' && scope.row.type === 'team_join'"
                                class="m-history-members"
                            >
                                <div
                                    v-for="member in historyUnitMembers(scope.row)"
                                    :key="member.user_id"
                                    class="u-history-member-card"
                                >
                                    <UserIdentity :user="member" compact :show-meta="false" :show-captain="false" />
                                    <IntroductionText :text="member.introduction" compact plain />
                                </div>
                                <span v-if="!historyUnitMembers(scope.row).length" class="u-history-muted">
                                    搭子队资料暂不可用
                                </span>
                            </div>
                            <TeamIdentity
                                v-else-if="scope.row.type === 'team_join' && historySummary(scope.row)"
                                :team="historySummary(scope.row)"
                                compact
                            />
                            <div v-else class="m-history-member">
                                <UserIdentity
                                    :user="historyMember(scope.row)"
                                    compact
                                    :show-meta="false"
                                    :show-captain="scope.row.type !== 'mate_pair'"
                                />
                                <IntroductionText :text="historyMember(scope.row).introduction" compact plain />
                                <el-button
                                    v-if="scope.row.type === 'mate_pair'"
                                    text
                                    type="primary"
                                    @click="openHistoryMateCard(scope.row)"
                                >查看名片</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="110">
                        <template #default="scope">{{
                            invitationStatusMap[scope.row.status] || scope.row.status
                        }}</template>
                    </el-table-column>
                    <el-table-column label="时间" width="150">
                        <template #default="scope">{{ formatDateTime(scope.row.created_at) }}</template>
                    </el-table-column>
                    <template #empty>
                        <div class="u-history-empty">
                            <FeatureBadge name="invitation" small />
                            <span>还没有邀请记录</span>
                        </div>
                    </template>
                </el-table>
            </div>
            <div v-if="history.count > history.pageSize" class="m-lover-v2-pagination">
                <el-pagination
                    v-model:current-page="history.page"
                    :page-size="history.pageSize"
                    :total="history.count"
                    layout="prev, pager, next"
                    @current-change="loadHistory"
                />
            </div>
        </el-dialog>

        <MateUnitDetailDialog
            v-if="selectedUnit"
            v-model="unitDetailVisible"
            :unit="selectedUnit"
            :loading="sendingId === selectedUnit.id"
            :disabled="!canTeamInvite"
            @invite="inviteUnit"
            @closed="clearUnitDetail"
        />
        <MateCardDetailDialog v-model="mateCardVisible" :registration="selectedMateRegistration" />
    </LoverV2Layout>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import {
    acceptInvitation,
    getInvitations,
    getMateHall,
    getMateUnitHall,
    rejectInvitation,
    sendMateInvitation,
    sendTeamInvitation,
    dissolveUnit,
} from "@/service/rank/lover-v2";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";
import EmptyState from "@/components/rank/lover/v2/EmptyState.vue";
import FeatureBadge from "@/components/rank/lover/v2/FeatureBadge.vue";
import InvitationInbox from "@/components/rank/lover/v2/InvitationInbox.vue";
import IntroductionText from "@/components/rank/lover/v2/IntroductionText.vue";
import MateRegistrationCard from "@/components/rank/lover/v2/MateRegistrationCard.vue";
import MateCardDetailDialog from "@/components/rank/lover/v2/MateCardDetailDialog.vue";
import MateUnitCard from "@/components/rank/lover/v2/MateUnitCard.vue";
import MateUnitDetailDialog from "@/components/rank/lover/v2/MateUnitDetailDialog.vue";
import TeamIdentity from "@/components/rank/lover/v2/TeamIdentity.vue";
import UserIdentity from "@/components/rank/lover/v2/UserIdentity.vue";
import { formatDateTime } from "@/utils/lover-v2";

export default {
    name: "LoverV2MateHall",
    components: {
        LoverV2Layout,
        EmptyState,
        FeatureBadge,
        InvitationInbox,
        IntroductionText,
        MateRegistrationCard,
        MateCardDetailDialog,
        MateUnitCard,
        MateUnitDetailDialog,
        TeamIdentity,
        UserIdentity,
    },
    data: function () {
        return {
            hallLoading: false,
            hall: { list: [], count: 0, page: 1, pageSize: 12 },
            hallUnavailable: false,
            sendingId: null,
            cooldown: 0,
            cooldownTimer: null,
            pollingTimer: null,
            invitationLoadingId: null,
            invitationLoadingAction: "",
            historyVisible: false,
            historyDirection: "incoming",
            historyLoading: false,
            unitActionLoading: false,
            history: { list: [], count: 0, page: 1, pageSize: 20 },
            unitDetailVisible: false,
            selectedUnit: null,
            previewLoading: false,
            previewSeed: "default",
            previewHall: { list: [], count: 0 },
            mateCardVisible: false,
            selectedMateRegistration: null,
            invitationStatusMap: {
                pending: "等待处理",
                accepted: "已接受",
                rejected: "已拒绝",
                cancelled: "已取消",
                invalidated: "已失效",
            },
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        context() {
            return this.$store.state.v2_context;
        },
        contextError() {
            return this.$store.state.v2_context_error;
        },
        actions() {
            return this.$store.state.v2_context_error ? [] : this.context?.actions || [];
        },
        isLogin() {
            return User.isLogin();
        },
        canTeamInvite() {
            return this.actions.includes("team.invite") && Boolean(this.context?.team?.id);
        },
        registrationType() {
            return this.context?.registration?.type || "";
        },
        registrationApproved() {
            return this.context?.registration?.status === "approved";
        },
        hasMateCard() {
            return Boolean(this.context?.registration?.mate_card_data);
        },
        hallKind() {
            if (this.registrationType === "mate" && this.hasMateCard && !this.context?.unit && !this.context?.team) {
                return "mate";
            }
            if (!this.registrationApproved) return "";
            if (this.registrationType === "lover" && this.context?.team?.formation_status === "building") return "team";
            return "";
        },
        hallRequestKey() {
            return `${this.eventId}:${this.hallKind}`;
        },
        canPreviewIndividuals() {
            if (!this.registrationApproved || this.contextError) return false;
            if (this.registrationType === "lover") return this.context?.team?.formation_status === "building";
            return this.registrationType === "mate" && Boolean(this.context?.unit) && !this.context?.team;
        },
        hallCanInvite() {
            return this.hallKind === "mate" ? this.registrationApproved && this.cooldown === 0 : this.canTeamInvite;
        },
        hallPermissionText() {
            if (this.hallKind === "mate") {
                if (!this.registrationApproved) return "可先查看契合度，审核通过后即可邀请";
                if (this.cooldown > 0) return `${this.cooldown} 秒后可再次邀请`;
                return "按候选卡片的可用操作发出邀请";
            }
            return this.canTeamInvite ? "由你为战队发出邀请" : "由情缘队长发出邀请";
        },
        pageSubtitle() {
            if (this.contextError) return "个人参赛状态暂时没有读取成功，请重新加载后再进入对应的组队方式。";
            if (this.context?.team) return "你已经有了并肩赴赛的队友，可前往战队页面查看阵容与后续战斗。";
            if (this.registrationType === "solo") return "独狼不必主动寻找队伍，在这里静候成为某支战队的最后一块拼图。";
            if (this.registrationType === "mate" && this.context?.unit) {
                return "两人搭子队已经结成，接下来等待情缘队伍向你们发出邀约。";
            }
            if (this.registrationType === "mate" && this.hasMateCard) {
                return this.registrationApproved
                    ? "按双方问卷匹配出的契合度，寻一位合拍的搭子结伴。"
                    : "报名审核期间也可以先查看问卷匹配结果；审核通过后才能发出邀请。";
            }
            if (this.context?.registration && !this.registrationApproved)
                return "报名通过审核后，这里会出现与你身份对应的组队方式。";
            if (this.registrationType === "mate") return "请先返回报名页完成搭子问卷，再来查看契合度匹配结果。";
            if (this.registrationType === "lover") return "为你们的情缘队伍寻一支合拍的两人搭子队，共赴四人阵容。";
            return this.isLogin
                ? "你还没有报名本届情缘杯，先完成报名后，这里才会出现与你身份对应的组队方式。"
                : "登录并完成报名后，这里会按照你的参赛身份显示相应的组队方式。";
        },
        showInvitationInbox() {
            return (
                !this.contextError &&
                this.isLogin &&
                this.registrationApproved &&
                !this.context?.team &&
                (this.registrationType === "mate" || Boolean(this.context?.invitations?.length))
            );
        },
        showHistoryEntry() {
            return (
                !this.contextError &&
                this.isLogin &&
                this.registrationApproved &&
                ["mate", "lover"].includes(this.registrationType)
            );
        },
        joinedTeamTitle() {
            if (this.registrationType === "solo") return "缘分已经揭晓，你已加入五人战队";
            if (this.registrationType === "mate") {
                return this.context?.team?.formation_status === "building"
                    ? "你们已经携手加入四人阵容"
                    : "你们已经携手加入五人战队";
            }
            return this.context?.team?.formation_status === "locked" ? "五人阵容已经锁定" : "你们的战队已经集结成形";
        },
        joinedTeamDescription() {
            if (this.context?.team?.formation_status === "locked") {
                return "组队已经完成，后续请在竞赛控制台查看战斗安排，并按时完成就绪与配装上报。";
            }
            if (this.registrationType === "mate" && this.context?.team?.formation_status === "building") {
                return "情缘双人组与你们的搭子队已组成四人阵容，等待独狼补齐第五位队友；前往战队页面可查看当前阵容或让搭子队整体退出。";
            }
            return "无需继续在大厅寻找队友；前往战队页面即可查看当前阵容与接下来的集结进度。";
        },
        registrationStatusLabel() {
            return (
                {
                    pending_review: "等待审核",
                    rejected: "需要修改",
                    draft: "尚未提交",
                }[this.context?.registration?.status] || "尚未通过"
            );
        },
        registrationStatusTitle() {
            if (this.context?.registration?.status === "draft") return "报名资料还没有提交";
            return this.context?.registration?.status === "rejected"
                ? "报名资料需要修改后重新提交"
                : "报名正在等待审核";
        },
        registrationStatusDescription() {
            if (this.context?.registration?.status === "draft") {
                return "填写并提交报名资料后，审核通过时会自动出现与你身份对应的组队入口。";
            }
            return this.context?.registration?.status === "rejected"
                ? "请先根据审核提示完善资料；重新通过后，你的组队入口会自动出现在这里。"
                : "审核通过后，你会按报名身份进入搭子大厅、情缘组队或独狼候选池。";
        },
    },
    watch: {
        hallRequestKey: {
            handler: function () {
                this.hall.page = 1;
                this.loadCurrentHall();
            },
            immediate: true,
        },
        canPreviewIndividuals: {
            immediate: true,
            handler(value) {
                if (value) this.loadPreview();
                else this.previewHall = { list: [], count: 0 };
            },
        },
    },
    mounted() {
        this.pollingTimer = window.setInterval(() => this.refreshContext(), 15000);
    },
    beforeUnmount() {
        window.clearInterval(this.pollingTimer);
        window.clearInterval(this.cooldownTimer);
    },
    methods: {
        formatDateTime,
        async refreshContext() {
            if (!this.isLogin) return;
            await this.$store.dispatch("loadV2Context", { force: true }).catch((error) => {
                console.error("[LoverV2MateHall.refreshContext]", error);
            });
        },
        async loadCurrentHall() {
            if (!this.eventId || !this.hallKind) {
                this.hall = { ...this.hall, list: [], count: 0, page: 1 };
                this.hallUnavailable = false;
                return;
            }
            this.hallLoading = true;
            this.hallUnavailable = false;
            try {
                const getter = this.hallKind === "mate" ? getMateHall : getMateUnitHall;
                const res = await getter(this.eventId, { page: this.hall.page, page_size: this.hall.pageSize });
                this.hall = { ...this.hall, ...res.data.data, pageSize: res.data.data.page_size };
                if (this.hallKind === "mate") this.syncCooldownFromHall(this.hall.list);
            } catch (error) {
                console.error("[LoverV2MateHall.loadCurrentHall]", error);
                this.hall.list = [];
                this.hall.count = 0;
                this.hallUnavailable = true;
                // 请求错误由统一拦截器展示，页面只维护失败状态，避免重复提示。
            } finally {
                this.hallLoading = false;
            }
        },
        refreshPreview() {
            this.previewSeed = `${Date.now()}-${Math.random()}`;
            this.loadPreview();
        },
        async loadPreview() {
            if (!this.eventId || !this.canPreviewIndividuals) return;
            this.previewLoading = true;
            try {
                const res = await getMateHall(this.eventId, {
                    mode: "preview",
                    seed: this.previewSeed,
                    page: 1,
                    page_size: 6,
                });
                this.previewHall = res.data.data;
            } catch (error) {
                console.error("[LoverV2MateHall.loadPreview]", error);
                this.previewHall = { list: [], count: 0 };
            } finally {
                this.previewLoading = false;
            }
        },
        openMateCard(registration) {
            this.selectedMateRegistration = registration;
            this.mateCardVisible = true;
        },
        openInvitationMateCard(invitation) {
            const summary = invitation.sender_summary;
            this.openMateCard({ members: summary?.member ? [summary.member] : [], mate_card: summary?.mate_card || null });
        },
        openHistoryMateCard(invitation) {
            const summary = this.historySummary(invitation);
            this.openMateCard({ members: summary?.member ? [summary.member] : [], mate_card: summary?.mate_card || null });
        },
        syncCooldownFromHall(list) {
            const retryAfter = Math.max(0, ...list.map((item) => Number(item.viewer?.retry_after) || 0));
            if (retryAfter > this.cooldown) this.startCooldown(retryAfter);
        },
        startCooldown(seconds = 30) {
            this.cooldown = Math.max(0, Math.ceil(Number(seconds) || 0));
            window.clearInterval(this.cooldownTimer);
            if (!this.cooldown) return;
            this.cooldownTimer = window.setInterval(() => {
                this.cooldown -= 1;
                if (this.cooldown <= 0) {
                    window.clearInterval(this.cooldownTimer);
                    this.cooldownTimer = null;
                    this.loadCurrentHall();
                }
            }, 1000);
        },
        async inviteMate(registration) {
            if (this.sendingId !== null || !registration.viewer?.actions?.includes("mate.invite")) return;
            this.sendingId = registration.id;
            try {
                await sendMateInvitation(this.eventId, registration.id);
                this.startCooldown();
                await Promise.all([this.refreshContext(), this.loadCurrentHall()]);
                this.$message.success("搭子邀请已发出，对方接受后会自动组成两人队");
            } catch (error) {
                console.error("[LoverV2MateHall.inviteMate]", error);
                // 请求错误由统一拦截器展示。
            } finally {
                this.sendingId = null;
            }
        },
        async inviteUnit(unit) {
            if (this.sendingId !== null || !this.canTeamInvite) return;
            this.sendingId = unit.id;
            try {
                await sendTeamInvitation(this.eventId, this.context.team.id, unit.id);
                await Promise.all([this.refreshContext(), this.loadCurrentHall()]);
                this.unitDetailVisible = false;
                this.$message.success("组队邀请已发出，等待搭子队长确认");
            } catch (error) {
                console.error("[LoverV2MateHall.inviteUnit]", error);
                // 请求错误由统一拦截器展示。
            } finally {
                this.sendingId = null;
            }
        },
        openUnitDetail(unit) {
            this.selectedUnit = unit;
            this.unitDetailVisible = true;
        },
        clearUnitDetail() {
            this.selectedUnit = null;
        },
        async confirmDissolve() {
            if (this.unitActionLoading || !this.actions.includes("unit.dissolve")) return;
            try {
                await this.$confirm(
                    "解散后，你和当前搭子会重新回到可配对状态，旧邀请不会恢复。确定继续吗？",
                    "解散搭子队",
                    { type: "warning", confirmButtonText: "确认解散", cancelButtonText: "保留搭子队" }
                );
                this.unitActionLoading = true;
                await dissolveUnit(this.eventId, this.context.unit.id);
                await this.refreshContext();
                this.$message.success("搭子队已解散，可以重新寻找合拍的搭子");
            } catch (error) {
                if (error !== "cancel" && error !== "close")
                    console.error("[LoverV2MateHall.confirmDissolve]", error);
                // 取消确认无需提示，请求错误由统一拦截器展示。
            } finally {
                this.unitActionLoading = false;
            }
        },
        async handleInvitation(invitation, action) {
            this.invitationLoadingId = invitation.id;
            this.invitationLoadingAction = action;
            try {
                if (action === "accept") {
                    await this.$confirm("接受后系统会立即建立组队关系，其他冲突邀请会自动失效。", "接受邀请", {
                        type: "warning",
                        confirmButtonText: "确认接受",
                    });
                    await acceptInvitation(this.eventId, invitation.id);
                } else {
                    await rejectInvitation(this.eventId, invitation.id);
                }
                await Promise.all([this.refreshContext(), this.loadCurrentHall()]);
                this.$message.success(action === "accept" ? "邀请已接受，组队状态已刷新" : "已拒绝邀请");
            } catch (error) {
                if (error !== "cancel" && error !== "close")
                    console.error("[LoverV2MateHall.handleInvitation]", error);
                // 取消确认无需提示，请求错误由统一拦截器展示。
            } finally {
                this.invitationLoadingId = null;
                this.invitationLoadingAction = "";
            }
        },
        async loadHistory() {
            if (!this.eventId || !this.historyVisible) return;
            this.historyLoading = true;
            try {
                const res = await getInvitations(this.eventId, {
                    direction: this.historyDirection,
                    page: this.history.page,
                    page_size: this.history.pageSize,
                });
                this.history = { ...this.history, ...res.data.data, pageSize: res.data.data.page_size };
            } catch (error) {
                console.error("[LoverV2MateHall.loadHistory]", error);
                // 请求错误由统一拦截器展示。
            } finally {
                this.historyLoading = false;
            }
        },
        historySummary(invitation) {
            return this.historyDirection === "incoming" ? invitation.sender_summary : invitation.target_summary;
        },
        historyMember(invitation) {
            const summary = this.historySummary(invitation);
            return (
                summary?.member || {
                    user_id:
                        this.historyDirection === "incoming"
                            ? invitation.sender_uid
                            : invitation.target_summary?.member?.user_id,
                    display_name: this.historyDirection === "incoming" ? "邀请方侠士" : "受邀侠士",
                }
            );
        },
        historyUnitMembers(invitation) {
            return invitation.target_summary?.members || [];
        },
    },
};
</script>

<style scoped lang="less">
.m-hall-panel {
    margin-top: 22px;
    padding: 24px;
}

.u-hall-explain {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin: 10px 0 20px;

    h3 {
        margin: 0 0 6px;
        color: #57352f;
        font-size: 20px;
    }

    p {
        margin: 0;
        color: #917871;
        font-size: 13px;
        line-height: 1.7;
    }
}

.u-hall-heading {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 18px;

    .c-lover-feature-badge {
        flex: 0 0 auto;
    }

    span {
        display: block;
        margin-bottom: 4px;
        color: #a27963;
        font-size: 12px;
        letter-spacing: 0.12em;
    }
}

.m-role-guide {
    display: flex;
    min-height: 250px;
    align-items: center;
    justify-content: center;
    gap: 34px;
    padding: 42px 48px;

    &.is-solo {
        background: radial-gradient(circle at 18% 50%, rgba(152, 92, 66, 0.13), transparent 28%),
            linear-gradient(135deg, rgba(255, 252, 241, 0.96), rgba(241, 221, 191, 0.9));
    }
}

.u-role-copy {
    max-width: 650px;

    .u-eyebrow {
        color: #a27059;
        font-size: 12px;
        letter-spacing: 0.14em;
    }

    h3 {
        margin: 8px 0 12px;
        color: #57332e;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 25px;
        font-weight: 400;
        letter-spacing: 0.06em;
    }

    p {
        margin: 0;
        color: #80665f;
        line-height: 1.9;
    }

    small {
        display: block;
        margin-top: 12px;
        color: #aa8d82;
        font-size: 12px;
    }

    .el-button {
        margin-top: 20px;
    }
}

.m-card-grid {
    display: grid;
    min-height: 180px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.m-history-member {
    display: grid;
    gap: 9px;
}

.m-history-members {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
}

.u-history-member-card {
    display: grid;
    min-width: 0;
    gap: 7px;
    padding: 10px;
    border-left: 2px solid rgba(150, 78, 61, 0.35);
    background: rgba(250, 238, 215, 0.62);
}

.u-history-muted {
    color: #a28b84;
    font-size: 12px;
}

.u-history-head {
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

.m-history-table {
    overflow: hidden;
    border: 1px solid rgba(132, 80, 62, 0.22);
}

.u-history-empty {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 26px 0;
    color: #9a8178;
    font-size: 13px;
}

@media screen and (max-width: 980px) {
    .m-card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media screen and (max-width: 680px) {
    .m-card-grid {
        grid-template-columns: 1fr;
    }

    .u-hall-explain {
        flex-direction: column;
    }

    .u-hall-heading,
    .m-role-guide {
        align-items: flex-start;
        flex-direction: column;
    }

    .m-role-guide {
        gap: 16px;
        padding: 30px 24px;
    }

    .u-history-head {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
    }

    .m-history-members {
        grid-template-columns: 1fr;
    }
}
</style>
