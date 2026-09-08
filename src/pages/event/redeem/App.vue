<template>
    <div class="p-redeem-page">
        <CommonHeader :overlayEnable="true"></CommonHeader>
        <main class="p-redeem" :style="backgroundAssets">
            <div class="m-redeem-stage">
                <section class="m-redeem-list" aria-label="体服激活码兑换列表">
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
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import User from "@jx3box/jx3box-common/js/user";
import { __cdn } from "@/utils/config";
import { createRedeemOrder, getRedeemItem, payRedeemOrder } from "@/service/event/redeem";
import RedeemCard from "./RedeemCard.vue";

const OWNED_MALL_ITEM_CODE = 42105;

// 卡片素材配置。可填写 assetRoot 下的文件名，也可填写完整 URL。
const REDEEM_CARD_ASSETS = {
    cardBackground: "card_bg.png", // 整张卡片背景（不含任何文字）
    productImage: "card.png", // 左侧兑换物品
    pointsIcon: "bell.png", // 积分数字后的货币单位图
    buttonDefault: "btn_default.png", // 按钮常态
    buttonActive: "btn_active.png", // 按钮悬停、聚焦和按下状态
    buttonDisabled: "btn_disabled.png", // 按钮不可用、加载中和已兑换状态
};

export default {
    name: "RedeemApp",
    components: {
        RedeemCard,
    },
    data() {
        const isLogin = User.isLogin();
        return {
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
        postStat("event", "redeem");
    },
    mounted() {
        this.loadProducts();
        if (this.isLogin) this.assetPromise = this.loadAsset();
    },
    computed: {
        backgroundAssets() {
            const background = (filename) => `url(${this.assetRoot}${filename})`;
            return {
                "--redeem-bg-720": background("bg-1280x720.jpg"),
                "--redeem-bg-small": background("bg-1366x768.jpg"),
                "--redeem-bg-1080": background("bg-1920x1080.jpg"),
                "--redeem-bg-2k": background("bg-2560x1440.jpg"),
                "--redeem-bg-4k": background("bg-3840x2160.jpg"),
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
                this.$message.error(this.assetLoadError);
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
            return messages.join("<br />") || "当前暂不满足兑换条件";
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
        async handleRedeem(item) {
            if (!this.isLogin) return User.toLogin();
            if (item.submitting) return;

            if (this.assetLoading && this.assetPromise) await this.assetPromise;
            if (this.assetLoadError) {
                return this.$alert(this.assetLoadError, "暂时无法兑换", {
                    type: "warning",
                    confirmButtonText: "知道了",
                });
            }

            if (!item.product.id) {
                try {
                    await this.loadProduct(item);
                } catch (error) {
                    return this.$alert(this.getErrorMessage(error, "商品信息暂不可用，请稍后重试"), "暂时无法兑换", {
                        type: "warning",
                        confirmButtonText: "知道了",
                    });
                }
            }

            if (item.redeemed || this.hasBought(item.product)) {
                item.redeemed = true;
                return this.$message.warning("该商品每人限兑1次，你已经兑换过了");
            }

            const canBuyInfo = this.getCanBuyInfo(item);
            if (!canBuyInfo.canBuy) {
                return this.$alert(this.getRequirementMessage(item, canBuyInfo), "暂时无法兑换", {
                    type: "warning",
                    confirmButtonText: "知道了",
                    dangerouslyUseHTMLString: true,
                });
            }

            const points = Number(item.product.price_points) || 0;
            try {
                await this.$confirm(`确认使用 ${points} 积分兑换${item.title}吗？`, "确认兑换", {
                    type: "warning",
                    confirmButtonText: "确认兑换",
                    cancelButtonText: "取消",
                });
                item.submitting = true;
                const orderResponse = await createRedeemOrder(item.productId, item.remark);
                const orderId = orderResponse.data?.data?.id;
                if (!orderId) throw new Error("订单创建失败，请稍后重试");

                await payRedeemOrder(orderId);
                item.redeemed = true;
                await Promise.allSettled([this.loadAsset(), this.loadProduct(item)]);
                item.redeemed = true;
                this.$notify.success({
                    title: "兑换成功",
                    message: "体服激活码已发放，请前往个人中心的订单记录查看",
                });
            } catch (error) {
                if (error === "cancel" || error === "close") return;
                const info = this.getErrorInfo(error);
                if (info.code === OWNED_MALL_ITEM_CODE) {
                    item.redeemed = true;
                    return this.$alert(info.message || "该商品每人限兑1次，你已经兑换过了", "兑换失败", {
                        type: "warning",
                        confirmButtonText: "知道了",
                    });
                }
                this.$message.error(info.message || "兑换失败，请稍后重试");
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

body {
    overflow-x: hidden;
}

.p-redeem {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
    background-color: #7b4f2f;
    background-image: var(--redeem-bg-720);
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.m-redeem-stage {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
}

.m-redeem-list {
    position: absolute;
    top: 24.26%;
    left: 54.95%;
    display: flex;
    width: 33.1%;
    flex-direction: column;
    gap: clamp(7px, 0.7292vw, 28px);
    transform: scale(0.94);
    transform-origin: top center;
}

@media screen and (min-width: 768px) and (min-aspect-ratio: 4 / 5) {
    .p-redeem {
        padding-top: 24px;
        box-sizing: border-box;
        background-position: center 24px;
        background-size: 100% calc(100% - 24px);
    }

    .m-redeem-stage {
        min-height: calc(100vh - 24px);
        min-height: calc(100dvh - 24px);
    }
}

@media screen and (min-width: 1281px) {
    .p-redeem {
        background-image: var(--redeem-bg-small);
    }
}

@media screen and (min-width: 1367px) {
    .p-redeem {
        background-image: var(--redeem-bg-1080);
    }
}

@media screen and (min-width: 1921px) {
    .p-redeem {
        background-image: var(--redeem-bg-2k);
    }
}

@media screen and (min-width: 2561px) {
    .p-redeem {
        background-image: var(--redeem-bg-4k);
    }
}

// 高 DPI 桌面按实际像素密度提升素材档位，避免 Retina 屏幕发虚。
@media screen and (min-width: 768px) and (max-width: 1280px) and (min-resolution: 1.5dppx) {
    .p-redeem {
        background-image: var(--redeem-bg-2k);
    }
}

@media screen and (min-width: 1281px) and (min-resolution: 1.5dppx) {
    .p-redeem {
        background-image: var(--redeem-bg-4k);
    }
}

@media screen and (max-width: 767px), screen and (max-aspect-ratio: 4 / 5) {
    .p-redeem {
        --redeem-mobile-header-height: 60px;

        display: block;
        min-height: 100vh;
        min-height: 100dvh;
        padding: 0;
        overflow: hidden;
        background-color: #e8c783;
        background-image: var(--redeem-bg-720);
        background-position: center var(--redeem-mobile-header-height);
        background-size: 100% auto;
    }

    .m-redeem-stage {
        width: 100%;
        min-height: 100vh;
        min-height: 100dvh;
        padding: calc(max(220px, 58vw) + var(--redeem-mobile-header-height)) 16px 36px;
        box-sizing: border-box;

        &::before {
            position: absolute;
            top: calc(44vw + var(--redeem-mobile-header-height));
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(to bottom, transparent, rgba(238, 210, 158, 0.84) 14vw, #e8c783 36vw);
            content: "";
            pointer-events: none;
        }
    }

    .m-redeem-list {
        position: relative;
        top: auto;
        left: auto;
        right: auto;
        width: min(100%, 635.5px);
        margin: 0 auto;
        gap: clamp(10px, 2.5vw, 18px);
        // 卡片 PNG 右侧透明留白比左侧多 18px，补偿可见内容的视觉中心。
        transform: translateX(0.71%);
    }
}

@media screen and (max-width: 480px) {
    .m-redeem-stage {
        padding: calc(max(210px, 58vw) + var(--redeem-mobile-header-height)) 10px 24px;
    }
}
</style>
