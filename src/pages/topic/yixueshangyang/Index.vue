<template>
    <div data-topic="yixueshangyang" class="topic-mobile-layout m-index" :class="`m-${key}`">
        <!-- kv -->
        <div class="m-section m-section-1">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
            <img :src="`${imgPath}yxsy.png`" class="u-yxsy p-animation" v-animate="'fadeInUp'" />
        </div>
        <!-- 黑市寻影 -->
        <div class="m-section m-section-2">
            <img :src="`${imgPath}title/title1.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <el-carousel ref="carousel1" :interval="3000" indicator-position="none" arrow="always" height="546px">
                    <el-carousel-item v-for="item in carouselList1" :key="item">
                        <div class="u-item-content">
                            <img :src="`${imgPath}${item}`" class="u-img" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 厄境余息 -->
        <div class="m-section m-section-3">
            <img :src="`${imgPath}title/title2.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <el-carousel ref="carousel2" :interval="3000" indicator-position="none" arrow="always" height="900px">
                    <el-carousel-item v-for="(item, i) in carouselList2" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`">
                            <h2>{{ item.title }}</h2>
                            <img :src="`${imgPath}${item.img}`" class="u-img" />
                            <img :src="`${imgPath}${item.img2}`" class="u-img2" v-if="item.img2" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 双曜亭 -->
        <div class="m-section m-section-4">
            <img :src="`${imgPath}title/title3.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <div class="m-carousel-indicators">
                    <div
                        v-for="(item, index) in carouselList3"
                        :key="index"
                        class="u-item"
                        :class="{ active: activeIndex3 === index }"
                        role="button"
                        tabindex="0"
                        :aria-label="item.title"
                        :aria-pressed="activeIndex3 === index"
                        @click="handleClick(index, '3')"
                        @keydown.enter="handleClick(index, '3')"
                        @keydown.space.prevent="handleClick(index, '3')"
                    >
                        <img :src="`${imgPath}dot.png`" />
                        <img class="u-active" :src="`${imgPath}dot-active.png`" />
                    </div>
                </div>
                <el-carousel
                    v-model="activeIndex3"
                    ref="carousel3"
                    :interval="3000"
                    arrow="always"
                    indicator-position="none"
                    height="650px"
                    @change="handleCarouselChange($event, '3')"
                >
                    <el-carousel-item v-for="(item, i) in carouselList3" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`" v-if="activeIndex3 === i">
                            <h2 class="p-animation" v-animate="'fadeIn'">{{ item.title }}</h2>
                            <img
                                :src="`${imgPath}${item.img}`"
                                :class="`u-img p-animation`"
                                v-animate="'fadeInRight'"
                            />
                            <img :src="`${imgPath}${item.txt}`" class="u-img2 p-animation" v-animate="'fadeInLeft'" />
                            <div class="u-boss-profile">
                                <h3>{{ item.name }}</h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 观风殿 -->
        <div class="m-section m-section-5">
            <img :src="`${imgPath}title/title4.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-container">
                <div class="m-carousel-indicators">
                    <div
                        v-for="(item, index) in carouselList4"
                        :key="index"
                        class="u-item"
                        :class="{ active: activeIndex4 === index }"
                        role="button"
                        tabindex="0"
                        :aria-label="item.title"
                        :aria-pressed="activeIndex4 === index"
                        @click="handleClick(index, '4')"
                        @keydown.enter="handleClick(index, '4')"
                        @keydown.space.prevent="handleClick(index, '4')"
                    >
                        <img :src="`${imgPath}dot.png`" />
                        <img class="u-active" :src="`${imgPath}dot-active.png`" />
                    </div>
                </div>
                <el-carousel
                    v-model="activeIndex4"
                    ref="carousel4"
                    :interval="3000"
                    arrow="always"
                    indicator-position="none"
                    height="650px"
                    @change="handleCarouselChange($event, '4')"
                >
                    <el-carousel-item v-for="(item, i) in carouselList4" :key="i">
                        <div :class="`u-item-content u-item-content-${i + 1}`" v-if="activeIndex4 === i">
                            <h2 class="p-animation" v-animate="'fadeIn'">{{ item.title }}</h2>
                            <img :src="`${imgPath}${item.img}`" class="u-img p-animation" v-animate="'fadeInLeft'" />
                            <img :src="`${imgPath}${item.txt}`" class="u-img2 p-animation" v-animate="'fadeInRight'" />
                            <div class="u-boss-profile">
                                <h3>{{ item.name }}</h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="m-section m-section-6">
            <img :src="`${imgPath}title/title5.png`" class="u-title p-animation" v-animate="'fadeInUp'" />
            <div class="m-box">
                <div class="u-card" v-for="i in 3" :key="i" @mouseenter="activeIndex = i" @mouseleave="activeIndex = 0">
                    <img
                        :src="`${imgPath}0${i}-hover.png`"
                        :class="`u-img-hover ${activeIndex === i ? 'active' : ''}`"
                        :alt="adventureNames[i - 1]"
                    />
                    <img :src="`${imgPath}0${i}.png`" :class="`u-img ${activeIndex === i ? 'active' : ''}`" />
                </div>
            </div>
        </div>
        <div class="m-section m-section-7">
            <img :src="`${imgPath}logo.png`" class="u-logo" />
        </div>
    </div>
</template>

<script>
const KEY = "yixueshangyang";
import { getTopic } from "@/service/topic";
import { __cdn } from "@/utils/config";
export default {
    name: "Index",
    components: {},
    data: function () {
        return {
            imgPath: __cdn + "design/topic/" + KEY + "/",
            key: KEY,
            activeIndex: 0,
            activeIndex3: 0,
            activeIndex4: 0,
            carouselList1: ["h-1.png", "h-3.png"],
            carouselList2: [
                { img: "e-1.png", img2: "shangui.png", title: "剧情篇" },
                { img: "e-2.png", title: "玩法篇" },
                { img: "e-3.png", img2: "xuanjing.png", title: "奖励篇" },
            ],
            carouselList3: [
                {
                    img: "boss/boss1.png",
                    txt: "boss/boss1_wz.png",
                    title: "壹号首领",
                    name: "黑齿元佑",
                    description: "黑齿元佑来自百济丛山中一个古老的氏族，长年饮用黑水从而导致了牙齿变得乌黑并且身体变形，同时黑水也给了他神秘的力量——黑齿族人天生有一种对自然的控制能力。",
                },
                {
                    img: "boss/boss2.png",
                    txt: "boss/boss2_wz.png",
                    title: "贰号首领",
                    name: "哥舒翰",
                    description: "安禄山死后，哥舒翰一直被囚禁在洛阳城中。严庄见他一代名将沦落至此，便将他放出，让他在上阳宫中保护安庆绪的安全。哥舒翰虽志气消沉，但毕竟是位纵横沙场的老将，非一般人可比……",
                },
                {
                    img: "boss/boss3.png",
                    txt: "boss/boss3_wz.png",
                    title: "叁号首领",
                    name: "安庆绪",
                    description: "安禄山长子，生性暴躁易怒、满怀恶意、独断暴力而且无法预料，会因为贪婪、憎恨或欲望而做出任何事。由于有胡人血统，安庆绪长的虎背熊腰，豹头环眼，天生怪力，能力分斗牛，活撕猛虎。",
                },
            ],
            carouselList4: [
                {
                    img: "boss/boss4.png",
                    txt: "boss/boss4_wz.png",
                    title: "壹号首领",
                    name: "沈眠风",
                    description: "丐帮帮主尹天赐义子沈眠风为报义父当年失手错杀亲父之仇，暗通消息予明教，致使丐帮与唐门损失惨重，元气大伤。他更是将尹天赐带入恶人谷中每日折磨，却又不令其死去。沈眠风背叛义父师门之事最终泄露，顿成武林公敌。",
                },
                {
                    img: "boss/boss5.png",
                    txt: "boss/boss5_wz.png",
                    title: "贰号首领",
                    name: "柳绯君",
                    description: "柳绯君是霸刀山庄风雷刀谷柳愚座下大弟子。自少时便展露出同他人截然不同的习武天赋，也被柳愚寄予厚望，常被要求做大家的表率。不过由于柳愚是个极为严苛之人，越来越不堪重负的柳绯君因平日过于压抑而犯下了柳愚最忌讳的错误……",
                },
                {
                    img: "boss/boss6.png",
                    txt: "boss/boss6_wz.png",
                    title: "叁号首领",
                    name: "月华",
                    description: "昔年丐帮帮主郭岩曾与红衣教六圣女之一唤晴有一段露水情缘。唤晴回到红衣教之后，偷偷生下了一对双胞女婴，并在机缘巧合之下派亲信沙娜兰将女婴中的一人送至来到栖霞宫寻人的郭岩身旁。郭岩虽想将唤晴和另一个孩子都救出红衣教……",
                },
                {
                    img: "boss/boss7.png",
                    txt: "boss/boss7_wz.png",
                    title: "肆号首领",
                    name: "曹炎烈",
                    description: "山狼曹炎烈，是三国时期的曹魏后人。他自少时便认为自己天生与众不同，将来定会光复曹魏，让曹家重回家族的鼎盛时期。然而大唐的统治十分稳定，百姓久不知战，更不会有谁会莫名随他叛乱。曹炎烈空有满腔壮志却实现无门……",
                },
            ],
            adventureNames: ["炼石成金", "炼狱厨神", "旧宴承欢"],
            shakeTimer: null,
        };
    },
    directives: {
        animate: {
            mounted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (el.className.indexOf(binding.value) == -1) {
                            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
                            el.className = binding.value + " " + el.className;
                        }
                        if (binding.addClass) {
                            window.removeEventListener("scroll", binding.addClass);
                        }
                    }
                };
                window.addEventListener("scroll", binding.addClass, true);
                binding.addClass();
            },
            unmounted: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {
        data: function () {
            let _data = {};
            this.raw.forEach((item) => {
                if (!_data[item.subtype]) {
                    _data[item.subtype] = [];
                }
                _data[item.subtype].push(item);
            });
            return _data;
        },
        st() {
            return this.activity[4];
        },
    },

    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
            });
        },
        startArrowShake() {
            let count = 0;
            this.shakeTimer = setInterval(() => {
                const leftArrows = this.$el.querySelectorAll(".el-carousel__arrow--left");
                const rightArrows = this.$el.querySelectorAll(".el-carousel__arrow--right");

                const isMobile = window.matchMedia("(max-width: 767px)").matches;
                const pos = count % 2 === 0 ? "8px" : "0px";

                leftArrows.forEach((left) => {
                    if (isMobile) return left.style.removeProperty("transform");
                    left.style.setProperty("transform", `translateY(-50%) rotate(180deg) translateX(-${pos})`, "important");
                });

                rightArrows.forEach((right) => {
                    if (isMobile) return right.style.removeProperty("transform");
                    right.style.setProperty("transform", `translateY(-50%) translateX(-${pos})`, "important");
                });

                count++;
            }, 300);
        },
        handleClick(index, num) {
            this[`activeIndex${num}`] = index;
            this.$refs[`carousel${num}`].setActiveItem(index);
        },
        handleCarouselChange(index, num) {
            this[`activeIndex${num}`] = index;
        },
    },
    mounted() {
        this.init();
        this.arrowShakeDelay = setTimeout(() => {
            this.startArrowShake();
        }, 500);
    },
    beforeUnmount() {
        clearTimeout(this.arrowShakeDelay);
        clearInterval(this.shakeTimer);
    },
};
</script>
<style lang="less" scoped>
:deep(.el-carousel__arrow) {
    background: transparent !important;
    background-color: transparent !important;
    font-size: 0 !important;
    border: none !important;
    outline: none !important;
    border-radius: 0 !important;
    background-image: url("@{kv_yixueshangyang}arrow.png") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: var(--yixueshangyang-arrow-size, contain) !important;
    opacity: 1 !important;
    z-index: 9 !important;
}

@media (min-width: 768px) {
    :deep(.el-carousel__arrow) {
        top: 50% !important;
    }
    :deep(.el-carousel__arrow--left) {
        transform: translateY(-50%) rotate(180deg) !important;
    }

    :deep(.el-carousel__arrow--right) {
        transform: translateY(-50%) !important;
    }

    .m-section {
        :deep(.el-carousel__arrow) {
            width: 79px !important;
            height: 58px !important;
        }
        :deep(.el-carousel__arrow--left) {
            left: 20px !important;
        }

        :deep(.el-carousel__arrow--right) {
            right: 20px !important;
        }
        &-3 {
            :deep(.el-carousel__arrow) {
                width: 40px !important;
                height: 29px !important;
            }
            :deep(.el-carousel__arrow--left) {
                left: 50% !important;
                top: 90px !important;
                margin: 0 0 0 -200px !important;
            }

            :deep(.el-carousel__arrow--right) {
                right: 50% !important;
                top: 90px !important;
                margin: 0 -200px 0 0 !important;
            }
        }
        &-4,
        &-5 {
            :deep(.el-carousel__arrow) {
                width: 40px !important;
                height: 29px !important;
            }
            :deep(.el-carousel__arrow--left) {
                left: 50% !important;
                margin: 0 0 0 -650px !important;
                top: -185px !important;
            }

            :deep(.el-carousel__arrow--right) {
                right: 50% !important;
                margin: 0 -650px 0 0 !important;
                top: -185px !important;
            }
            :deep(.el-carousel__item) {
                animation: none !important;
                transition: none !important;
            }
            :deep(.el-carousel__container) {
                transition: none !important;
                transform: none !important;
            }
            :deep(.el-carousel__item.is-active) {
                animation: none !important;
                transition: none !important;
            }
            :deep(.el-carousel__track) {
                transition: none !important;
                transform: none !important;
            }
        }
    }
}
</style>
<style lang="less">
@import "~@/assets/css/topic/yixueshangyang/index.less";
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

.m-yixueshangyang .u-boss-profile {
    display: none;
}

@media (max-width: 767px) {
    #app .topic-mobile-layout[data-topic="yixueshangyang"] {
        > .m-section-1 {
            min-height: 0;
            height: auto;
            aspect-ratio: 3840 / 2181;
            padding: 0;
            background-size: 100% 100%;
            background-position: center top;

            > .u-logo {
                position: absolute;
                inset: 6% auto auto 4%;
                width: min(25%, 135px);
                height: auto;
                margin: 0;
            }

            > .u-yxsy {
                position: absolute;
                inset: auto 0 7%;
                width: min(62%, 370px);
                height: auto;
                margin: 0 auto;
            }
        }

        > .m-section:not(.m-section-1) {
            padding: 24px 16px;
            background-size: cover;
            background-position: center top;

            > .u-title {
                width: min(76%, 270px);
                height: auto;
                margin: 0 auto 16px;
            }
        }

        .m-section {
            .el-carousel {
                padding-bottom: 52px;
            }

            // 只用当前画面撑开轮播容器，每张素材保留自身宽高比。
            .el-carousel__item.is-active {
                position: relative;
                height: auto;
            }

            .el-carousel__item:not(.is-active) {
                visibility: hidden;
            }

            .el-carousel__arrow--left {
                left: calc(50% - 60px);
                transform: rotate(180deg);
            }

            .el-carousel__arrow--right {
                right: calc(50% - 60px);
                transform: none;
            }

            .el-carousel__arrow {
                margin: 0;
                --yixueshangyang-arrow-size: 32px auto;
            }

            .u-item-content {
                display: flex;
                align-items: center;
                flex-direction: column;
                flex-wrap: nowrap;
                gap: 8px;
                width: 100%;
                margin: 0;

                h2 {
                    inset: auto;
                    width: auto;
                    margin: 0;
                    font-size: 18px;
                    line-height: 1.5;
                    letter-spacing: 0;
                    text-align: center;
                }

                > .u-img,
                > .u-img2 {
                    position: static;
                    inset: auto;
                    width: 100%;
                    height: auto;
                    margin: 0 auto;
                }
            }

            .m-carousel-indicators {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: row nowrap;
                gap: 8px;
                margin: 0 auto 12px;

                &::before,
                &::after {
                    flex: 1 1 0;
                    min-width: 0;
                    max-width: 64px;
                    height: 44px;
                    margin: 0;
                }

                .u-item {
                    display: grid;
                    place-items: center;
                    flex: 0 0 44px;
                    width: 44px;
                    height: 44px;
                    margin: 0;
                    cursor: pointer;

                    &::after {
                        display: none;
                    }

                    > img {
                        position: static;
                        width: 24px;
                        height: auto;
                        margin: 0;
                    }

                    > .u-active,
                    &.active > img {
                        display: none;
                    }

                    &.active > .u-active {
                        display: block;
                        width: 28px;
                    }
                }
            }
        }

        .m-section-3 .u-item-content {
            > .u-img {
                max-width: 420px;
            }

            > .u-img2 {
                width: min(65%, 260px);
            }
        }

        > .m-section-4,
        > .m-section-5 {
            .m-container {
                max-width: 500px;
                margin: 0 auto;
                background: none;
            }

            .el-carousel {
                padding: 12px 12px 52px;
                border: 1px solid rgba(255, 224, 153, 0.4);
                border-radius: 8px;
                background: linear-gradient(180deg, rgba(10, 28, 65, 0.48), rgba(6, 15, 35, 0.9));
            }

            .el-carousel__arrow {
                bottom: 4px;
            }

            .u-item-content > h2 {
                padding: 4px 12px;
                border: 1px solid rgba(255, 224, 153, 0.4);
                border-radius: 20px;
                color: #ffdf99;
                background: rgba(6, 15, 35, 0.65);
                font-size: 14px;
            }

            .u-item-content > .u-img {
                width: 100%;
                height: clamp(145px, 48vw, 230px);
                object-position: center bottom;
            }

            .u-item-content > .u-img2 {
                display: none;
            }

            .u-boss-profile {
                display: block;
                align-self: stretch;
                padding: 12px 4px 0;
                border-top: 1px solid rgba(255, 224, 153, 0.25);
                color: #ffeabf;

                > h3 {
                    margin: 0 0 6px;
                    color: #ffdf99;
                    font-size: 22px;
                    line-height: 1.4;
                }

                > p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.7;
                }
            }
        }

        > .m-section-6 {
            > .m-box {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 8px;
                max-width: 480px;
                margin: 0 auto;
            }

            .u-card {
                width: 100%;
                height: auto;
                margin: 0;
                cursor: auto;

                > .u-img-hover {
                    position: static;
                    display: block;
                    width: 100%;
                    height: auto;
                    aspect-ratio: 749 / 1385;
                    margin: 0;
                    transform: none;
                }

                > .u-img {
                    display: none;
                }
            }
        }

        > .m-section.m-section-7 {
            padding: 16px;
            border-top: 1px solid rgba(255, 224, 153, 0.25);
            background-image: linear-gradient(0deg, rgba(5, 12, 26, 0.92), rgba(5, 12, 26, 0.76)),
                url("@{kv_yixueshangyang}bg/bg_07.jpg");
            background-position: center;

            > .u-logo {
                width: min(40%, 150px);
                height: auto;
                margin: 0 auto;
            }
        }
    }
}
</style>
