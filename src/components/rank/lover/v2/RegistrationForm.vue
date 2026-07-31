<template>
    <div class="c-lover-registration-form m-lover-v2-panel">
        <div class="u-form-title">
            <div>
                <h3>{{ isEditing ? "修改报名资料" : "填写报名资料" }}</h3>
                <p>审核与组队都以这里的信息为准，请确保联系方式和参赛职责准确。</p>
            </div>
            <el-tag effect="plain">{{ registrationTypeMap[selectedType] }}</el-tag>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-position="top" @submit.prevent>
            <template v-if="selectedType === 'lover'">
                <el-alert
                    v-if="!hasValidLoverPair"
                    type="warning"
                    :closable="false"
                    show-icon
                    title="情缘关系成员尚未完整"
                    :description="loverPairHint"
                />
                <div v-else class="m-member-grid">
                    <article v-for="(member, index) in form.members" :key="member.user_id" class="u-member-card">
                        <UserIdentity :user="member" :show-meta="false" />
                        <div class="u-member-fields">
                            <el-form-item
                                label="参赛职责"
                                :prop="`members.${index}.combat_role`"
                                :rules="[{ required: true, message: '请选择参赛职责', trigger: 'change' }]"
                            >
                                <el-segmented v-model="member.combat_role" :options="roleOptions" />
                            </el-form-item>
                            <el-form-item label="历史最高竞技场分">
                                <el-input-number
                                    v-model="member.arena_peak_score"
                                    :min="0"
                                    :max="10000"
                                    :step="50"
                                    controls-position="right"
                                />
                            </el-form-item>
                        </div>
                    </article>
                </div>
                <el-row :gutter="18">
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="战队名称" prop="team_name">
                            <el-input
                                v-model.trim="form.team_name"
                                maxlength="100"
                                show-word-limit
                                placeholder="给五人战队起个名字"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="参赛宣言">
                            <el-input
                                v-model.trim="form.slogan"
                                maxlength="500"
                                show-word-limit
                                placeholder="一句话介绍你们的战队"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="战队队徽">
                    <div class="m-logo-upload">
                        <el-image v-if="form.logo" class="u-logo-preview" :src="form.logo" fit="cover" />
                        <UploadImage ref="logoUpload" @on-finish="onLogoUploaded" @on-error="onUploadError" />
                        <p>可选。建议上传正方形图片；新图片上传后会替换当前队徽。</p>
                    </div>
                </el-form-item>

                <el-divider>匿名江湖笺（必填）</el-divider>
                <el-alert
                    class="u-story-alert"
                    type="info"
                    :closable="false"
                    show-icon
                    title="审核通过后将匿名公开展示"
                    description="页面不会展示你们的 UID、昵称、关系网或战队信息。可直接在编辑器内插入图片、音频或视频。"
                />
                <el-form-item class="u-story-alert-form-item">
                    <Tinymce
                        v-model="form.story.content"
                        :height="420"
                        :attachment-enable="true"
                        :resource-enable="false"
                    />
                    <p class="u-story-tip">请至少填写一段文字或插入一项媒体内容。</p>
                </el-form-item>
            </template>

            <template v-else>
                <article v-if="form.members[0]" class="u-member-card is-single">
                    <UserIdentity :user="form.members[0]" :show-meta="false" />
                    <div class="u-member-fields">
                        <el-form-item
                            label="参赛职责"
                            prop="members.0.combat_role"
                            :rules="[{ required: true, message: '请选择参赛职责', trigger: 'change' }]"
                        >
                            <el-segmented v-model="form.members[0].combat_role" :options="roleOptions" />
                        </el-form-item>
                        <el-form-item label="历史最高竞技场分">
                            <el-input-number
                                v-model="form.members[0].arena_peak_score"
                                :min="0"
                                :max="10000"
                                :step="50"
                                controls-position="right"
                            />
                        </el-form-item>
                    </div>
                </article>
                <el-row v-if="selectedType === 'solo'" :gutter="18">
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="MBTI">
                            <el-select
                                v-model="form.mbti"
                                clearable
                                filterable
                                allow-create
                                placeholder="选填，例如 ENFP"
                            >
                                <el-option v-for="item in mbtiOptions" :key="item" :label="item" :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="星座">
                            <el-select v-model="form.constellation" clearable placeholder="选填">
                                <el-option
                                    v-for="item in constellationOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="个人简介">
                    <el-input
                        v-model="form.introduction"
                        type="textarea"
                        :rows="4"
                        maxlength="1000"
                        show-word-limit
                        placeholder="可以介绍常玩心法、竞技场经历、上线时段，以及希望遇到怎样的队友……"
                    />
                    <p class="u-introduction-tip">审核通过后会展示在组队大厅，方便其他侠士在邀请前了解你。</p>
                </el-form-item>
            </template>

            <el-divider>仅运营审核可见的联系方式</el-divider>
            <el-row :gutter="18">
                <el-col :xs="24" :sm="12">
                    <el-form-item label="联系 QQ" prop="qq">
                        <el-input v-model.trim="form.qq" maxlength="32" placeholder="用于赛事通知，不会公开展示" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item label="联系电话">
                        <el-input v-model.trim="form.phone" maxlength="32" placeholder="选填，不会公开展示" />
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="u-actions">
                <el-button v-if="isEditing" size="large" @click="$emit('cancel-edit')">暂不修改</el-button>
                <el-button
                    type="primary"
                    size="large"
                    :loading="submitting || uploadLoading"
                    :disabled="selectedType === 'lover' && !hasValidLoverPair"
                    @click="submit"
                >
                    {{ submitButtonText }}
                </el-button>
            </div>
        </el-form>

        <MateCardQuestionnaire
            v-model="questionnaireVisible"
            :tuilan-id="form.mate_card_data?.tuilanId || ''"
            @completed="onQuestionnaireCompleted"
            @closed="onQuestionnaireClosed"
        />
    </div>
</template>

<script>
import UploadImage from "@jx3box/jx3box-ui/src/comment/Upload.vue";
import Tinymce from "@jx3box/jx3box-editor/src/Tinymce";
import MateCardQuestionnaire from "./MateCardQuestionnaire.vue";
import UserIdentity from "./UserIdentity.vue";
import { registrationTypeMap } from "@/utils/lover-v2";

export default {
    name: "LoverV2RegistrationForm",
    components: { MateCardQuestionnaire, Tinymce, UploadImage, UserIdentity },
    emits: ["submit", "cancel-edit"],
    props: {
        selectedType: { type: String, required: true },
        registration: { type: Object, default: null },
        loverNet: { type: [Object, String], default: null },
        currentUser: { type: Object, required: true },
        profile: { type: Object, default: () => ({}) },
        submitting: { type: Boolean, default: false },
        mateCardResetKey: { type: Number, default: 0 },
    },
    data: function () {
        return {
            registrationTypeMap,
            uploadLoading: false,
            pendingPayload: null,
            questionnaireVisible: false,
            form: {
                team_name: "",
                logo: "",
                slogan: "",
                qq: "",
                phone: "",
                mbti: "",
                constellation: "",
                introduction: "",
                mate_card_data: null,
                story: { content: "" },
                members: [],
            },
            rules: {
                team_name: [{ required: true, message: "请输入战队名称", trigger: "blur" }],
                qq: [{ required: true, message: "请填写联系 QQ", trigger: "blur" }],
            },
            roleOptions: [
                { label: "输出", value: "dps" },
                { label: "治疗", value: "healer" },
            ],
            mbtiOptions: [
                "INTJ",
                "INTP",
                "ENTJ",
                "ENTP",
                "INFJ",
                "INFP",
                "ENFJ",
                "ENFP",
                "ISTJ",
                "ISFJ",
                "ESTJ",
                "ESFJ",
                "ISTP",
                "ISFP",
                "ESTP",
                "ESFP",
            ],
            constellationOptions: [
                "白羊座",
                "金牛座",
                "双子座",
                "巨蟹座",
                "狮子座",
                "处女座",
                "天秤座",
                "天蝎座",
                "射手座",
                "摩羯座",
                "水瓶座",
                "双鱼座",
            ],
        };
    },
    computed: {
        isEditing() {
            return Boolean(this.registration);
        },
        relationMembers() {
            const members = Array.isArray(this.loverNet?.members) ? this.loverNet.members : [];
            return members
                .filter((member) => Number(member.status) === 1)
                .filter(
                    (member, index, list) =>
                        list.findIndex((item) => Number(item.user_id) === Number(member.user_id)) === index
                )
                .map((member) => ({
                    user_id: Number(member.user_id ?? member.user_info?.id),
                    display_name: member.user_info?.display_name || member.display_name || null,
                    avatar: member.user_info?.avatar || member.avatar || null,
                    combat_role: "dps",
                    arena_peak_score: null,
                    is_captain: Number(member.user_id) === Number(this.currentUser.user_id),
                }))
                .filter((member) => member.user_id);
        },
        hasValidLoverPair() {
            return this.relationMembers.length === 2;
        },
        loverPairHint() {
            if (!this.relationMembers.length) {
                return "请先在魔盒个人中心绑定情缘，关系网中两名成员状态正常后才能报名。";
            }
            return `当前读取到 ${this.relationMembers.length} 名有效成员，情缘报名必须恰好由两名成员组成，请先修正关系网。`;
        },
        submitButtonText() {
            return this.isEditing ? "保存并重新提交审核" : "提交报名";
        },
    },
    watch: {
        registration: {
            handler: function () {
                this.initializeForm();
            },
            immediate: true,
        },
        selectedType: function () {
            if (!this.registration) this.initializeMembers();
        },
        loverNet: {
            handler: function () {
                if (!this.registration && this.selectedType === "lover") this.initializeMembers();
            },
            deep: true,
        },
        profile: {
            handler: function () {
                if (!this.registration) {
                    this.form.qq = this.form.qq || this.profile?.qq_number || "";
                    this.form.phone = this.form.phone || this.profile?.user_phone || "";
                }
            },
            deep: true,
        },
        mateCardResetKey: function () {
            this.form.mate_card_data = null;
            this.pendingPayload = null;
            this.questionnaireVisible = true;
        },
    },
    methods: {
        initializeForm() {
            const source = this.registration || {};
            this.form = {
                team_name: source.team_name || "",
                logo: source.logo || "",
                slogan: source.slogan || "",
                qq: source.qq || this.profile?.qq_number || "",
                phone: source.phone || this.profile?.user_phone || "",
                mbti: source.mbti || "",
                constellation: source.constellation || "",
                introduction: source.introduction || "",
                mate_card_data: source.mate_card_data || null,
                story: {
                    content: source.story?.content || "",
                },
                members: [],
            };
            this.initializeMembers();
        },
        initializeMembers() {
            if (this.registration?.members?.length) {
                this.form.members = this.registration.members.map((member) => ({ ...member }));
                return;
            }
            if (this.selectedType === "lover") {
                this.form.members = this.relationMembers.map((member) => ({ ...member }));
                return;
            }
            this.form.members = [
                {
                    ...this.currentUser,
                    combat_role: "dps",
                    arena_peak_score: null,
                    is_captain: true,
                },
            ];
        },
        buildPayload() {
            const isLover = this.selectedType === "lover";
            const isMate = this.selectedType === "mate";
            return {
                type: this.selectedType,
                relation_net_id: isLover ? Number(this.registration?.relation_net_id || this.loverNet?.net?.id) : null,
                team_name: isLover ? this.form.team_name : null,
                logo: isLover ? this.form.logo || null : null,
                slogan: isLover ? this.form.slogan || null : null,
                qq: this.form.qq || null,
                phone: this.form.phone || null,
                ...(isMate
                    ? { mate_card_data: this.form.mate_card_data }
                    : {
                          mbti: this.form.mbti || null,
                          constellation: this.form.constellation || null,
                      }),
                ...(isLover ? {} : { introduction: this.form.introduction.trim() || null }),
                ...(isLover
                    ? {
                          story: {
                              content: this.form.story.content.trim() || null,
                          },
                      }
                    : {}),
                members: this.form.members.map((member) => ({
                    user_id: Number(member.user_id),
                    combat_role: member.combat_role,
                    arena_peak_score: member.arena_peak_score == null ? null : Number(member.arena_peak_score),
                })),
            };
        },
        async submit() {
            if (this.selectedType === "lover" && !this.hasValidLoverPair) return;
            const valid = await this.$refs.form.validate().catch(() => false);
            if (!valid) return;
            const payload = this.buildPayload();
            if (this.selectedType === "lover" && !this.hasMeaningfulStoryContent(payload.story.content)) {
                this.$message.warning("请填写匿名内容，或在编辑器中插入图片、音频、视频");
                return;
            }
            if (this.selectedType === "mate" && !payload.mate_card_data) {
                this.pendingPayload = payload;
                this.questionnaireVisible = true;
                return;
            }
            this.uploadLogoOrSubmit(payload);
        },
        onQuestionnaireCompleted(mateCardData) {
            this.form.mate_card_data = mateCardData;
            if (!this.pendingPayload) return;
            this.pendingPayload.mate_card_data = mateCardData;
            this.$emit("submit", this.pendingPayload);
            this.pendingPayload = null;
        },
        onQuestionnaireClosed() {
            this.pendingPayload = null;
        },
        onLogoUploaded(urls) {
            this.uploadLoading = false;
            if (urls?.[0]) {
                this.form.logo = urls[0];
                this.pendingPayload.logo = urls[0];
            }
            this.$emit("submit", this.pendingPayload || this.buildPayload());
            this.pendingPayload = null;
        },
        uploadLogoOrSubmit(payload) {
            const uploader = this.$refs.logoUpload;
            if (this.selectedType === "lover" && uploader?.fileList?.length) {
                this.pendingPayload = payload;
                this.uploadLoading = true;
                uploader.upload();
                return;
            }
            this.uploadLoading = false;
            this.$emit("submit", payload);
        },
        hasMeaningfulStoryContent(content) {
            if (typeof content !== "string") return false;
            const text = content
                .replace(/<[^>]*>/g, "")
                .replace(/&nbsp;|&#160;/gi, "")
                .trim();
            return Boolean(text || /<(img|audio|video|iframe)\b/i.test(content));
        },
        onUploadError() {
            this.uploadLoading = false;
            this.pendingPayload = null;
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-registration-form {
    padding: 28px;
}

.u-form-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 24px;

    h3 {
        margin: 0 0 6px;
        color: #56342f;
        font-size: 22px;
    }

    p {
        margin: 0;
        color: #947c75;
        font-size: 13px;
    }
}

.m-member-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin: 18px 0 22px;
}

.u-member-card {
    padding: 18px;
    border: 1px solid #ead9cd;
    border-radius: 12px;
    background: #fffaf5;

    &.is-single {
        margin-bottom: 20px;
    }
}

.u-member-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 18px;

    :deep(.el-form-item) {
        margin-bottom: 0;
    }

    :deep(.el-segmented),
    :deep(.el-input-number) {
        width: 100%;
    }
}

.m-logo-upload {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 14px;

    .u-logo-preview {
        width: 148px;
        height: 148px;
        border: 1px solid #e4d1c4;
        border-radius: 8px;
    }

    p {
        flex-basis: 100%;
        margin: 0;
        color: #a18a83;
        font-size: 12px;
    }

    :deep(.el-upload-list--picture-card .el-upload-list__item),
    :deep(.el-upload--picture-card) {
        width: 148px;
        height: 148px;
    }
}

.u-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
}

.u-introduction-tip {
    margin: 7px 0 0;
    color: #a18a83;
    font-size: 12px;
    line-height: 1.6;
}

.u-story-alert {
    margin-bottom: 18px;
}

.u-story-tip {
    width: 100%;
    margin: 8px 0 0;
    color: #a18a83;
    font-size: 12px;
}

.u-story-alert-form-item  {
    :deep(.c-jx3box-emotion-item) {
        width: unset;
    }
}

@media screen and (max-width: 760px) {
    .c-lover-registration-form {
        padding: 20px;
    }

    .m-member-grid,
    .u-member-fields {
        grid-template-columns: 1fr;
    }
}
</style>
