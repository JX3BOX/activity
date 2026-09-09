<template>
    <el-dialog
        :model-value="modelValue"
        class="m-redeem-dialog"
        width="480px"
        align-center
        append-to-body
        :title="title"
        :show-close="!busy"
        :close-on-click-modal="false"
        :close-on-press-escape="!busy"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <div v-if="preview" class="m-dialog-preview">
            <span>本地预览 · 不扣积分</span>
            <button v-for="mode in modes" :key="mode.state" :disabled="busy" @click="$emit('preview', mode.state)">
                {{ mode.label }}
            </button>
        </div>
        <div class="m-dialog-result" :class="`is-${state}`" role="status" aria-live="polite">
            <div class="u-result-icon" aria-hidden="true">{{ icon }}</div>
            <h3>{{ title }}</h3>
            <p>{{ description }}</p>
        </div>
        <div v-if="item" class="m-dialog-product">
            <div><strong>{{ item.description }}</strong><span>{{ item.title }}</span></div>
            <div class="u-cost"><strong>{{ points }}</strong><span>积分</span></div>
        </div>
        <p v-if="state === 'confirm'" class="u-dialog-note">每人限兑 1 次，兑换后请在卡密中心查看激活码。</p>
        <div class="m-dialog-actions">
            <template v-if="state === 'confirm'">
                <button class="u-secondary" @click="$emit('update:modelValue', false)">暂不兑换</button>
                <button class="u-primary" @click="$emit('confirm')">确认兑换</button>
            </template>
            <button v-else-if="busy" class="u-primary" disabled>{{ state === 'checking' ? '正在核对兑换条件…' : '正在兑换，请稍候…' }}</button>
            <template v-else>
                <button class="u-secondary" @click="$emit('update:modelValue', false)">关闭</button>
                <a class="u-primary" href="/dashboard/card?tab=virtual&page=1" target="_blank" rel="noopener noreferrer">前往卡密中心 ↗</a>
            </template>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "RedeemDialog",
    props: {
        modelValue: Boolean,
        state: { type: String, default: "confirm" },
        message: { type: String, default: "" },
        item: { type: Object, default: null },
        preview: Boolean,
    },
    emits: ["update:modelValue", "confirm", "preview"],
    data() {
        return { modes: [{ state: "confirm", label: "确认" }, { state: "success", label: "成功" }, { state: "error", label: "失败" }] };
    },
    computed: {
        busy() { return ["checking", "submitting"].includes(this.state); },
        title() { return { confirm: "确认兑换", checking: "核对兑换条件", submitting: "正在兑换", success: "兑换成功", error: "暂时无法兑换" }[this.state]; },
        icon() { return { confirm: "◇", checking: "…", submitting: "…", success: "✓", error: "!" }[this.state]; },
        points() { return this.item?.product?.price_points ?? this.item?.pointsText ?? "—"; },
        description() {
            if (this.message) return this.message;
            return { confirm: "即将使用积分兑换体服激活码，请确认兑换信息。", checking: "正在确认你的积分余额及兑换资格。", submitting: "正在处理你的兑换，请勿关闭页面或重复操作。", success: "体服激活码已发放至你的卡密中心。\n点击下方按钮，即可查看和使用。", error: "请检查兑换条件后再试。" }[this.state];
        },
    },
};
</script>

<style lang="less">
.el-dialog.m-redeem-dialog {
    box-sizing: border-box;
    max-width: calc(100vw - 32px);
    padding: 28px;
    border: 1px solid #ead3ab;
    border-radius: 20px;
    background: radial-gradient(ellipse at top, #fff0c9, transparent 65%), #fffcf6;
    box-shadow: 0 24px 80px rgba(47, 29, 12, 0.3);
    color: #493b2c;

    .el-dialog__header { padding: 0; margin: 0; }
    .el-dialog__title { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
    .el-dialog__headerbtn { top: 12px; right: 12px; }
    .el-dialog__body { padding: 0; color: inherit; }
    button, a { box-sizing: border-box; font: inherit; }
    .m-dialog-preview {
        display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
        margin: 0 16px 20px 0; font-size: 11px; color: #8c7459;
        button { border: 1px solid #dac5a4; border-radius: 4px; background: transparent; color: inherit; cursor: pointer; }
    }
    .m-dialog-result {
        text-align: center;
        .u-result-icon { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; margin: 4px auto 18px; border-radius: 50%; background: #f5e3bd; color: #9e6b23; font-size: 34px; }
        &.is-success .u-result-icon { background: #e5eedc; color: #557545; }
        &.is-error .u-result-icon { background: #f8e2d9; color: #b36243; }
        h3 { margin: 0 0 12px; font-size: 26px; font-weight: 700; color: #493b2c; }
        p { margin: 0; font-size: 14px; line-height: 1.8; color: #82715d; white-space: pre-line; overflow-wrap: anywhere; }
    }
    .m-dialog-product {
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        margin-top: 24px; padding: 18px; border: 1px solid #eadfcf; border-radius: 10px; background: rgba(255,255,255,0.65);
        strong { display: block; font-size: 14px; line-height: 1.6; }
        span { display: block; margin-top: 4px; font-size: 12px; color: #92816e; }
        .u-cost { flex: none; text-align: right; strong { font-size: 24px; line-height: 1; color: #a2702e; } }
    }
    .u-dialog-note { margin: 14px 0 0; font-size: 12px; line-height: 1.7; text-align: center; color: #92816e; }
    .m-dialog-actions { display: flex; gap: 12px; margin-top: 26px; }
    .u-primary, .u-secondary {
        display: flex; align-items: center; justify-content: center; flex: 1;
        min-height: 44px; padding: 10px 12px; border-radius: 8px; border: 1px solid #ddc9a8;
        font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer;
        &:focus-visible { outline: 2px solid #a2702e; outline-offset: 3px; }
    }
    .u-primary { background: linear-gradient(120deg, #b78a49, #94672f); border-color: #a97e42; color: #fff; &:hover { filter: brightness(1.08); } &:disabled { cursor: wait; opacity: 0.65; } }
    .u-secondary { flex: 0.6; color: #82715d; background: transparent; &:hover { background: #f5ecdd; } }
}
</style>
