<template>
    <div class="p-redeem-page">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <main class="p-redeem" :style="backgroundAssets">
            <div class="m-redeem-stage">
                <h1 class="m-redeem-title">
                    <span class="u-redeem-title-text">体服激活码兑换</span>
                </h1>
                <div class="u-redeem-title-line" aria-hidden="true"></div>
                <div class="m-redeem-box-layer" aria-hidden="true">
                    <div class="u-redeem-box"></div>
                </div>
                <section class="m-redeem-list" aria-label="体服激活码兑换列表">
                    <nav class="m-redeem-toolbar" aria-label="卡密工具栏">
                        <span>兑换后可前往卡密中心查看</span>
                        <a href="/dashboard/card?tab=virtual&page=1" target="_blank" rel="noopener noreferrer">
                            我的卡密中心 <span aria-hidden="true">↗</span>
                        </a>
                    </nav>
                    <RedeemCard
                        v-for="item in exchangeList"
                        :key="item.id"
                        :item="item"
                        :asset-root="assetRoot"
                        :assets="cardAssets"
                        @redeem="handleRedeem"
                    />
                </section>
            </div>
        </main>
        <RedeemDialog
            v-model="redeemDialog.visible"
            :state="redeemDialog.state"
            :message="redeemDialog.message"
            :item="redeemDialog.item"
            :preview="!!previewMode"
            @confirm="confirmRedeem"
            @preview="previewDialog"
        />
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import User from "@jx3box/jx3box-common/js/user";
import { __cdn } from "@/utils/config";
import { createRedeemOrder, getRedeemItem, payRedeemOrder } from "@/service/event/redeem";
import RedeemCard from "./RedeemCard.vue";
import RedeemDialog from "./RedeemDialog.vue";

const OWNED_MALL_ITEM_CODE = 42105;
const REDEEM_CDN_ROOT = `${__cdn}design/event/redeem/`;
// 缩放和格式转换依赖 CDN 透传处理参数，并按参数区分缓存。
const cdnImage = (filename, width, quality = 82) =>
    `url("${REDEEM_CDN_ROOT}${filename}?x-oss-process=image/resize,w_${width}/quality,Q_${quality}/format,webp")`;
const responsiveBackground = (filename, width, retinaWidth) =>
    `image-set(${cdnImage(filename, width)} 1x, ${cdnImage(filename, retinaWidth)} 2x)`;

// 卡片素材配置。可填写 assetRoot 下的文件名，也可填写完整 URL。
const REDEEM_CARD_ASSETS = {
    cardBackground: "card_bg.png", // 整张卡片背景（不含任何文字）
    productImage: `${REDEEM_CDN_ROOT}card.png?x-oss-process=image/resize,w_640/quality,Q_88/format,webp`, // 左侧兑换物品
    pointsIcon: "bell.png", // 积分数字后的货币单位图
    buttonDefault: "btn_default.png", // 按钮常态
    buttonActive: "btn_active.png", // 按钮悬停、聚焦和按下状态
    buttonDisabled: "btn_disabled.png", // 按钮不可用、加载中和已兑换状态
};

export default {
    name: "RedeemApp",
    components: {
        RedeemCard,
        RedeemDialog,
    },
    data() {
        const isLogin = User.isLogin();
        return {
            previewMode: process.env.NODE_ENV === "development"
                ? ({ success: "success", failure: "error", confirm: "confirm" }[new URLSearchParams(window.location.search).get("mock")] || "")
                : "",
            redeemDialog: { visible: false, state: "confirm", message: "", item: null },
            assetRoot: `${__cdn}design/event/redeem/`,
            cardAssets: REDEEM_CARD_ASSETS,
            isLogin,
            asset: {},
            assetLoading: isLogin,
            assetLoadError: "",
            assetPromise: null,
            exchangeList: [
                {
                    id: "general",
                    productId: 384,
                    title: "通用积分兑换",
                    description: "苍生铸世·体服激活码×1",
                    pointsText: "1000",
                    tags: ["魔盒注册用户", "每人限兑1次"],
                    buttonText: "兑换",
                    remark: "体服激活码通用兑换",
                    product: {},
                    loading: true,
                    submitting: false,
                    unavailable: false,
                    redeemed: false,
                },
                {
                    id: "level",
                    productId: 385,
                    title: "骨灰玩家兑换",
                    description: "苍生铸世·体服激活码×1",
                    originalPointsText: "1000",
                    pointsText: "500",
                    tags: ["魔盒Lv4+级用户", "每人限兑1次"],
                    buttonText: "兑换",
                    remark: "体服激活码等级专属兑换",
                    discount: true,
                    discountText: "5.0折",
                    product: {},
                    loading: true,
                    submitting: false,
                    unavailable: false,
                    redeemed: false,
                },
                {
                    id: "member",
                    productId: 386,
                    title: "会员专属兑换",
                    description: "苍生铸世·体服激活码×1",
                    originalPointsText: "1000",
                    pointsText: "500",
                    tags: ["魔盒PRO会员", "每人限兑1次"],
                    buttonText: "兑换",
                    remark: "体服激活码会员专属兑换",
                    discount: true,
                    discountText: "5.0折",
                    product: {},
                    loading: true,
                    submitting: false,
                    unavailable: false,
                    redeemed: false,
                },
            ],
        };
    },
    created() {
        if (!this.previewMode) postStat("event", "redeem");
    },
    mounted() {
        if (this.previewMode) {
            this.exchangeList.forEach((item) => {
                item.loading = false;
                item.product = { id: item.productId, stock: 30, price_points: Number(item.pointsText) };
            });
            this.assetLoading = false;
            this.previewDialog(this.previewMode);
            return;
        }
        this.loadProducts();
        if (this.isLogin) this.assetPromise = this.loadAsset();
    },
    computed: {
        backgroundAssets() {
            return {
                "--redeem-bg-mobile": responsiveBackground("bg.jpg", 640, 1280),
                "--redeem-bg-desktop": responsiveBackground("bg.jpg", 1280, 2560),
                "--redeem-bg-large": responsiveBackground("bg.jpg", 1920, 3840),
                "--redeem-box-mobile": responsiveBackground("box.png", 640, 1280),
                "--redeem-box-desktop": responsiveBackground("box.png", 1600, 3200),
                "--redeem-title": `url("${this.assetRoot}dbt.png")`,
                "--redeem-title-line": `url("${this.assetRoot}xian.png")`,
            };
        },
    },
    methods: {
        async loadAsset() {
            this.assetLoading = true;
            this.assetLoadError = "";
            try {
                this.asset = (await User.getAsset()) || {};
            } catch (error) {
                this.asset = {};
                this.assetLoadError = this.getErrorMessage(error, "用户资产加载失败，请稍后重试");
                // 错误在兑换弹窗中展示，避免与兑换结果叠加提示。
            } finally {
                this.assetLoading = false;
            }
        },
        loadProducts() {
            return Promise.allSettled(this.exchangeList.map((item) => this.loadProduct(item)));
        },
        async loadProduct(item) {
            item.loading = true;
            item.unavailable = false;
            try {
                const response = await getRedeemItem(item.productId);
                item.product = response.data?.data || {};
                item.redeemed = this.hasBought(item.product);
                item.unavailable = !item.product.id;
            } catch (error) {
                item.product = {};
                item.unavailable = true;
                throw error;
            } finally {
                item.loading = false;
            }
        },
        hasBought(product = {}) {
            const value = product.ext_info?.has_buy;
            return value === true || value === 1 || value === "1" || value === "true";
        },
        isInSellTime(product = {}) {
            if (product.on_selling === 0) return false;
            const now = Date.now();
            const start = product.start_sell_time ? new Date(product.start_sell_time).getTime() : 0;
            const end = product.end_sell_time ? new Date(product.end_sell_time).getTime() : 0;
            if (start && now < start) return false;
            if (end && now > end) return false;
            return true;
        },
        getCanBuyInfo(item) {
            const product = item.product || {};
            const info = {
                canBuy: true,
                config: true,
                vip: true,
                points: true,
                level: true,
                time: true,
                stock: true,
                requiredLevel: User.getLevel(Number(product.exp_limit) || 0),
            };

            if (!product.id || Number(product.price_cny) || Number(product.price_boxcoin)) {
                info.canBuy = false;
                info.config = false;
            }
            if (product.vip_limit === 1 && !User._isPRO(this.asset)) {
                info.canBuy = false;
                info.vip = false;
            }
            if ((Number(this.asset.points) || 0) < (Number(product.price_points) || 0)) {
                info.canBuy = false;
                info.points = false;
            }
            if ((Number(this.asset.experience) || 0) < (Number(product.exp_limit) || 0)) {
                info.canBuy = false;
                info.level = false;
            }
            if (!this.isInSellTime(product)) {
                info.canBuy = false;
                info.time = false;
            }
            if ((Number(product.stock) || 0) <= 0) {
                info.canBuy = false;
                info.stock = false;
            }
            return info;
        },
        getRequirementMessage(item, info) {
            const messages = [];
            if (!info.config) messages.push("商品兑换配置异常");
            if (!info.level) messages.push(`需要达到 Lv.${info.requiredLevel || "-"}`);
            if (!info.vip) messages.push("仅限魔盒PRO会员兑换");
            if (!info.points) messages.push(`积分不足，需要 ${Number(item.product.price_points) || 0} 积分`);
            if (!info.time) messages.push("当前不在活动兑换时间内");
            if (!info.stock) messages.push("商品库存不足");
            return messages.join("\n") || "当前暂不满足兑换条件";
        },
        getErrorInfo(error) {
            const data = error?.response?.data || error?.data || {};
            return {
                code: Number(data.code ?? error?.code),
                message: data.msg || error?.message || "",
            };
        },
        getErrorMessage(error, fallback) {
            return this.getErrorInfo(error).message || fallback;
        },
        setRedeemState(state, message = "") {
            this.redeemDialog.state = state;
            this.redeemDialog.message = message;
        },
        previewDialog(state) {
            if (!this.previewMode) return;
            const item = this.redeemDialog.item || this.exchangeList[0];
            this.redeemDialog.item = item;
            this.redeemDialog.visible = true;
            item.redeemed = state === "success";
            this.setRedeemState(state, state === "error" ? "当前积分不足，暂时无法兑换。请确认积分余额后再试。" : "");
        },
        async handleRedeem(item) {
            if (["checking", "submitting"].includes(this.redeemDialog.state) || item.submitting) return;
            if (!this.previewMode && !this.isLogin) return User.toLogin();
            this.redeemDialog = { visible: true, state: "checking", message: "", item };
            if (this.previewMode) return this.previewDialog("confirm");

            if (this.assetLoading && this.assetPromise) await this.assetPromise;
            if (this.assetLoadError) return this.setRedeemState("error", this.assetLoadError);
            if (!item.product.id) {
                try {
                    await this.loadProduct(item);
                } catch (error) {
                    return this.setRedeemState("error", this.getErrorMessage(error, "商品信息暂不可用，请稍后重试"));
                }
            }
            if (item.redeemed || this.hasBought(item.product)) {
                item.redeemed = true;
                return this.setRedeemState("error", "该商品每人限兑1次，你已经兑换过了。可前往卡密中心查看。");
            }
            const info = this.getCanBuyInfo(item);
            if (!info.canBuy) return this.setRedeemState("error", this.getRequirementMessage(item, info));
            this.setRedeemState("confirm");
        },
        async confirmRedeem() {
            if (this.redeemDialog.state !== "confirm") return;
            const item = this.redeemDialog.item;
            this.setRedeemState("submitting");
            item.submitting = true;
            try {
                if (this.previewMode) {
                    await new Promise((resolve) => setTimeout(resolve, 700));
                    return this.previewDialog("success");
                }
                const orderResponse = await createRedeemOrder(item.productId, item.remark);
                const orderId = orderResponse.data?.data?.id;
                if (!orderId) throw new Error("订单创建失败，请稍后重试");
                await payRedeemOrder(orderId);
                item.redeemed = true;
                this.setRedeemState("success");
                await Promise.allSettled([this.loadAsset(), this.loadProduct(item)]);
                item.redeemed = true;
            } catch (error) {
                const info = this.getErrorInfo(error);
                if (info.code === OWNED_MALL_ITEM_CODE) item.redeemed = true;
                this.setRedeemState("error", info.message || "兑换结果暂时无法确认，请先到卡密中心查看是否到账，再稍后重试。");
            } finally {
                item.submitting = false;
            }
        },
    },
};
</script>

<style lang="less">
html,
body,
#app {
    width: 100%;
    min-width: 320px;
    min-height: 100%;
    margin: 0;
}

.p-redeem-page .c-header .u-pop {
    box-sizing: border-box;
}

.p-redeem {
    width: 100%;
    padding-top: 24px;
    box-sizing: border-box;
    overflow-x: auto;
    background-color: #7b4f2f;
}

// 背景和兑换卡片共用 16:9 画布。填满视口高度时保持比例，宽度不足则横向滚动。
.m-redeem-stage {
    // 列表中心 71.5%，扣除缩放后卡片右侧留白的一半：33.1% × .94 × 1.575% / 2。
    --redeem-content-center: 71.255%;
    position: relative;
    width: max(1280px, 100%, calc((100vh - 24px) * 16 / 9));
    width: max(1280px, 100%, calc((100dvh - 24px) * 16 / 9));
    aspect-ratio: 16 / 9;
    container-type: inline-size;
    background-color: #7b4f2f;
    background-image: var(--redeem-bg-desktop);
    background-position: center;
    background-size: 100% auto;
    background-repeat: no-repeat;
}

.m-redeem-title {
    position: absolute;
    z-index: 2;
    top: 8.8%;
    left: var(--redeem-content-center);
    width: 33.1%;
    transform: translateX(-50%);
    aspect-ratio: 1441 / 274;
    margin: 0;
    background-image: var(--redeem-title);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

.u-redeem-title-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

.u-redeem-title-line {
    position: absolute;
    z-index: 2;
    top: 18.5%;
    left: var(--redeem-content-center);
    width: 27%;
    transform: translateX(-50%);
    aspect-ratio: 1006 / 80;
    background-image: var(--redeem-title-line);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

// 仅限制装饰素材的溢出，不裁切卡片悬浮效果和焦点轮廓。
.m-redeem-box-layer {
    position: absolute;
    z-index: 1;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.u-redeem-box {
    position: absolute;
    z-index: 1;
    // PNG 左侧包含大块透明留白，按可见礼盒而非图片边框对齐线上构图。
    top: 12%;
    left: -21%;
    width: 84%;
    aspect-ratio: 3202 / 2191;
    background-image: var(--redeem-box-desktop);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
}

.m-redeem-list {
    position: absolute;
    z-index: 2;
    top: 24.26%;
    left: 54.95%;
    display: flex;
    width: 33.1%;
    flex-direction: column;
    gap: 0.7292cqw;
    transform: scale(0.94);
    transform-origin: top center;
}

.m-redeem-toolbar {
    display: flex;
    flex: none;
    // card_bg.png 右侧约 20 / 1270 为留白，对齐卡片可见边缘。
    margin-right: 1.575%;
    align-items: center;
    justify-content: space-between;
    gap: 0.8cqw;
    padding: 0.25cqw 0.65cqw;
    border: 1px solid rgba(255, 231, 181, 0.45);
    border-radius: 0.25cqw;
    color: #fff2d4;
    background: rgba(91, 56, 30, 0.6);
    font-size: 0.75cqw;
    line-height: 1.5;
    white-space: nowrap;
    margin-bottom:0.5rem;

    a {
        flex: none;
        color: #fff2d4;
        font-weight: 700;
        text-decoration: none;

        &:hover {
            color: #fff;
            text-decoration: underline;
        }

        &:focus-visible {
            outline: 2px solid #ffe39a;
            outline-offset: 3px;
        }
    }
}

@media screen and (min-width: 1600px) {
    .m-redeem-stage {
        background-image: var(--redeem-bg-large);
    }
}

@media screen and (max-width: 1279px) {
    .p-redeem {
        padding-top: 60px;
        overflow-x: hidden;
    }

    .m-redeem-stage {
        width: 100%;
        min-height: calc(100vh - 60px);
        min-height: calc(100dvh - 60px);
        aspect-ratio: auto;
        box-sizing: border-box;
        padding: 28px 12px 48px;
        background-image: var(--redeem-bg-mobile);
        background-position: center top;
        background-size: cover;
    }

    .m-redeem-title {
        position: relative;
        top: auto;
        left: auto;
        width: min(92%, 680px);
        margin: 0 auto;
        transform: none;
    }

    .u-redeem-title-line {
        position: relative;
        top: auto;
        left: auto;
        width: min(88%, 620px);
        margin: 4px auto 18px;
        transform: none;
    }

    .m-redeem-box-layer {
        display: contents;
    }

    .u-redeem-box {
        position: relative;
        top: auto;
        left: auto;
        width: min(82%, 520px);
        margin: -16px auto -42px;
        // 礼盒主体中心约在原图宽度的 62.5%，补偿左侧透明留白。
        transform: translateX(-12.5%);
        background-image: var(--redeem-box-mobile);
    }

    .m-redeem-list {
        position: relative;
        top: auto;
        left: auto;
        width: min(100%, 680px);
        margin: 0 auto;
        gap: 12px;
        transform: none;
    }

    .m-redeem-toolbar {
        gap: 8px;
        padding: 8px 10px;
        border-radius: 4px;
        margin-bottom: 4px;
        font-size: 12px;
        white-space: nowrap;
    }
}

@media screen and (max-width: 480px) {
    .m-redeem-stage {
        padding-right: 8px;
        padding-left: 8px;
    }
}

</style>
