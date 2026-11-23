<template>
    <div data-topic="shengdianyunqi" class="topic-mobile-layout m-index">
        <div class="m-top-png"></div>
        <!-- 第一屏 -->
        <div class="m-top">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-mohe p-animation" v-animate="'flipInX'"></div>
        </div>
        <!-- 视频 -->
        <div class="m-video">
            <div class="u-box" v-if="video">
                <div class="u-txtr p-animation" v-animate="'fadeInRight'"></div>
                <div class="u-video" v-html="video"></div>
            </div>
            <div class="u-text p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-intro-copy" hidden>
                <strong>荻花圣殿·前厅</strong>
                <p>红衣教阴谋不轨，江湖乱局初现。</p>
                <p>IF线速探！荻花圣殿·前厅</p>
                <p>红衣教传教受挫，欲勾结天一教、南诏王，进行禁忌之祭祀，陷大唐子民于水深火热。</p>
                <p>而此时在圣殿后山事件后，红衣教的动作引起了一直继续追查荻花圣殿入口所在的拜火教关注，与红衣教同源的他们，意识到红衣教将要做的是什么，为此，他们将这些消息通告给了那些曾经帮助拜火教的中原侠士们……</p>
                <p>新的波澜，将在圣殿之中掀起，南诏的蓄谋与阿萨辛的报复，都将在此展开。</p>
                <p>新赛季开启后，侠士可组团前往「荻花圣殿·前厅」遏止其毒谋。</p>
            </div>
            <!-- 链接 -->
            <div class="u-btn p-animation" v-animate="'fadeInDown'">
                <a :href="item.link" target="_blank" v-for="(item, i) in shengdian" :key="i" :class="`u-btn` + (i + 1)" :aria-label="item.name"></a>
            </div>
        </div>
        <!-- PVE -->
        <div class="m-one m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box p-animation" v-animate="'bounceIn'">
                <!-- 切换tab -->
                <div class="u-tab">
                    <span
                        v-for="item in 2"
                        :key="item"
                        :class="[`u-tab` + item, item === tabIndex ? 'active' : '']"
                        role="button"
                        tabindex="0"
                        :aria-disabled="!pvebanner[item - 1]"
                        :aria-label="tabLabels[item - 1]"
                        :aria-pressed="item === tabIndex"
                        @keydown.enter="changeTab(item)"
                        @keydown.space.prevent="changeTab(item)"
                        @click="changeTab(item)"
                    ></span>
                </div>
                <div class="u-tab-block">
                    <!-- BOSS图片 -->
                    <div class="u-img" v-if="activeBanner && activeBanner.img">
                        <img :src="activeBanner.img" :alt="tabLabels[tabIndex - 1]" />
                        <a
                            v-if="activeBanner.link"
                            :href="activeBanner.link"
                            class="u-more"
                            aria-label="查看全首领数据"
                            target="_blank"
                        ></a>
                    </div>
                    <!-- 新闻 -->
                    <div class="u-news">
                        <a :href="item.link" target="_blank" class="u-line" v-for="(item, i) in pve" :key="i">
                            <span class="u-name">{{ item.title }}</span>
                            <span class="u-author">{{ item.author }}</span>
                        </a>
                    </div>
                    <!-- 按钮 -->
                    <div class="u-btnbox">
                        <a v-for="(item, i) in btn" :key="i" :href="item.link" class="u-btn" :class="`u-btn` + (i + 1)" :aria-label="item.name" target="_blank"></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 秘境 -->
        <div class="m-two m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box">
                <div class="u-slogan p-animation" v-animate="'bounceIn'">
                    <span v-for="item in 6" :key="item" class="u-reward" hidden></span>
                </div>
            </div>
        </div>
        <!-- 阵营 -->
        <div class="m-three m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box">
                <span v-for="item in 4" :key="item" :class="`u-img${item}`" class="u-img p-animation" v-animate="'fadeInDown'"></span>
            </div>
        </div>
        <!-- 其它 -->
        <div class="m-four m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box p-animation" v-animate="'fadeInDown'">
                <div class="u-more" v-if="more.length < 1"></div>
                <div class="u-swiper" v-else>
                    <el-carousel height="440px">
                        <el-carousel-item v-for="(item, i) in more" :key="i">
                            <a :href="item.link" target="_blank">
                                <img :src="item.img" alt />
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="u-logo p-animation" v-animate="'bounceIn'"></div>
        </div>
        <!-- 全屏叶子 -->
        <div class="m-leaf" ref="mark"></div>
    </div>
</template>

<script>
const KEY = "shengdianyunqi";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {},
    data: function () {
        return {
            raw: [],
            shengdian: [
                { name: "秘境背景", link: "#/shengdian" },
                { name: "秘境首领", link: "#/shengdian?tab=2" },
                { name: "秘境掉落", link: "#/shengdian?tab=3" },
                { name: "门派攻略", link: "/bps/#/" },
                { name: "门派宏库", link: "/macro/#/" },
                { name: "门派配装", link: "/pz/#/public" },
            ],
            video: "",
            tabIndex: 1,
            btn: [
                { name: "新配装器", link: "/pz" },
                { name: "副本掉落", link: "/fb/#/drop_v2?fb_name=荻花圣殿&fb_zlp=巴蜀风云" },
                { name: "战斗分析", link: "/battle" },
                { name: "团队工具", link: "/team" },
            ],
            pve: [],
            pvebanner: [],
            more: [],
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
        activeBanner() {
            return this.pvebanner[this.tabIndex - 1];
        },
        tabLabels() {
            return [0, 1].map((index) => {
                const banner = this.pvebanner[index];
                const query = (banner?.link || "").split("?")[1];
                return new URLSearchParams(query).get("fb_name") || banner?.title || `秘境 ${index + 1}`;
            });
        },
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
    },
    watch: {},
    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.video = this.data.index_video?.[0]?.link || "";
                this.pve = this.data.index_pve_posts || [];
                this.pvebanner = this.data.index_pve_banner || [];
                this.more = this.data.index_more || [];
            });
        },
        changeTab(i) {
            if (!this.pvebanner[i - 1]) return;
            this.tabIndex = i;
        },
        hanldMask(event) {
            let x = -event.clientX / 150;
            let y = -event.clientY / 150;
            if (this.$refs.mark) {
                this.$refs.mark.style.backgroundPositionX = x + "px";
                this.$refs.mark.style.backgroundPositionY = y + "px";
            }
        },
    },

    created: function () {},
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
    @import "~@/assets/css/topic/shengdianyunqi/index.less";
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

@media (min-width: 768px) {
    .m-index[data-topic="shengdianyunqi"] .m-video > .u-btn {
        // The 50px top inset is in addition to the 250px button artwork.
        box-sizing: content-box;
    }
}

@media (max-width: 767px) {
    #app .topic-mobile-layout[data-topic="shengdianyunqi"] {
        --sd-gutter: clamp(14px, 4vw, 24px);
        --sd-line: rgba(226, 189, 127, 0.58);
        background: #112731;

        > .m-top-png {
            // 背景与标题共用首屏画幅，避免背景层另占一屏。
            display: none;
        }

        > .m-top {
            position: relative;
            display: block;
            min-height: 0;
            height: 82.4479vw;
            padding: 0;
            background: url("@{kv_shengdianyunqi}top.jpg") center top / 100% 100% no-repeat;

            > .u-logo,
            > .u-title,
            > .u-mohe {
                position: absolute;
                inset: auto;
                margin: 0;
                background-position: center;
                background-size: contain;
            }

            > .u-logo {
                top: 7.6%;
                left: 19.3%;
                width: 14%;
                height: 12.6%;
            }

            > .u-title,
            > .u-mohe {
                right: 0;
                left: 0;
                margin: 0 auto;
            }

            > .u-title {
                top: 43.6%;
                width: 69.4%;
                height: 17.3%;
            }

            > .u-mohe {
                top: 60.9%;
                width: 22.6%;
                height: 6.57%;
            }
        }

        > .m-video,
        > .m-module {
            display: grid;
            justify-items: center;
            gap: 12px;
            width: 100%;
            margin: 0 auto;
            padding: 24px var(--sd-gutter);
            color: #fff1d7;
        }

        > .m-module > .u-title {
            display: block;
            width: min(100%, 420px);
            height: auto;
            margin: 0 auto;
            background-position: center;
            background-size: contain;

            &::before {
                display: block;
                padding-top: 18%;
                content: "";
            }
        }

        > .m-video {
            background: linear-gradient(#32241f, #142b35);

            > .u-box {
                width: min(100%, 560px);
                height: auto;
                margin: 0;
                padding: 4px;
                border: 1px solid var(--sd-line);
                border-radius: 6px;
                background: #603e2b;
            }

            .u-video {
                position: relative;
                width: 100%;
                height: auto;
                padding: 0;
                background: #172932;

                &::before {
                    display: block;
                    padding-top: 56.25%;
                    content: "";
                }

                iframe,
                video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    border: 0;
                }
            }

            > .u-text {
                display: none;
            }

            > .u-intro-copy {
                display: block;
                width: min(100%, 560px);
                padding: 14px;
                border: 1px solid var(--sd-line);
                border-radius: 6px;
                background: rgba(11, 22, 29, 0.55);
                color: #fbe9cc;

                strong {
                    display: block;
                    margin: 0 0 6px;
                    color: #ffe6af;
                    font-size: 19px;
                    line-height: 1.4;
                    text-align: center;
                }

                p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.7;
                }

                p + p {
                    margin-top: 6px;
                }
            }
        }

        > .m-video > .u-btn,
        .m-one .u-tab-block > .u-btnbox {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            width: min(100%, 560px);
            height: auto;
            margin: 0 auto;
            padding: 0;

            > a:empty {
                display: grid;
                place-items: center;
                width: 100%;
                height: auto;
                min-height: 44px;
                margin: 0;
                padding: 4px;
                border: 1px solid var(--sd-line);
                border-radius: 5px;
                background: #273b41;
                box-shadow: none;
                color: #fff1d7;
                font-size: 14px;
                line-height: 1.35;
                text-align: center;
                text-decoration: none;

                &::after {
                    content: attr(aria-label);
                }
            }
        }

        > .m-video > .u-btn {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        > .m-one {
            > .u-box {
                width: min(100%, 560px);
                height: auto;
                padding: 12px;
                border: 1px solid var(--sd-line);
                border-radius: 8px;
                background: #21323a;
            }

            .u-tab {
                padding: 0;
                gap: 8px;

                span {
                    margin: 0;
                    padding: 4px;
                    font-size: 14px;
                    line-height: 1.35;
                    text-align: center;
                }
            }

            .u-tab-block {
                display: grid;
                grid-template-columns: minmax(0, 1fr);
                gap: 12px;
                width: 100%;
                height: auto;
                margin: 0;
                padding: 12px 0 0;
            }

            .u-tab-block > .u-img {
                width: 100%;
                height: auto;
                border: 1px solid var(--sd-line);
                border-radius: 6px;
                background: #14242c;
                box-shadow: none;

                img {
                    display: block;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    border-radius: 5px 5px 0 0;
                }

                .u-more {
                    position: static;
                    display: block;
                    width: min(100%, 175px);
                    height: 45px;
                    margin: 4px auto;
                    padding: 0;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }

            .u-tab-block > .u-news {
                width: 100%;
                height: auto;
                margin: 0;
                padding: 0 10px;
                border-radius: 6px;
                background: #f9edda;
                box-shadow: none;

                .u-line {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(48px, 22%);
                    align-items: center;
                    gap: 8px;
                    padding: 8px 0;
                    line-height: 1.5;
                }

                .u-name,
                .u-author {
                    max-width: none;
                    padding: 0;
                    overflow-wrap: anywhere;
                    white-space: normal;
                    line-height: 1.5;
                }

                .u-name {
                    font-size: 14px;
                }

                .u-author {
                    color: #6e5d4d;
                    font-size: 12px;
                    text-align: right;
                }
            }
        }

        > .m-two {
            background: linear-gradient(#112731, #261f1c 38%, #19252c);

            > .u-box {
                display: grid;
                gap: 12px;
                width: min(100%, 560px);
                padding: 0;

                &::before {
                    display: block;
                    padding-top: 72%;
                    border: 1px solid var(--sd-line);
                    border-radius: 6px;
                    background: url("@{kv_shengdianyunqi}bg.jpg") center 34.5% / 100% auto no-repeat;
                    content: "";
                }
            }

            .u-slogan {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 8px;
                width: 100%;
                height: auto;
                background: none;

                .u-reward {
                    display: block;
                    padding-top: 109.55%;
                    background: url("@{kv_shengdianyunqi}jingjian.png") var(--sd-reward-position, 0%) center / 600% auto no-repeat;

                    &:nth-child(2) { --sd-reward-position: 20%; }
                    &:nth-child(3) { --sd-reward-position: 40%; }
                    &:nth-child(4) { --sd-reward-position: 60%; }
                    &:nth-child(5) { --sd-reward-position: 80%; }
                    &:nth-child(6) { --sd-reward-position: 100%; }
                }
            }
        }

        > .m-three > .u-box {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
            width: min(100%, 330px);
            padding: 0;

            .u-img {
                display: block;
                width: 100%;
                height: auto;
                margin: 0;
                background-size: contain;

                &::before {
                    display: block;
                    padding-top: 98.46%;
                    content: "";
                }
            }
        }

        > .m-four {
            > .u-box {
                width: min(100%, 560px);
                height: auto;
                min-height: 0;
                padding: 8px;
                border: 1px solid var(--sd-line);
                border-radius: 8px;
                background: #20343d;
            }

            .u-swiper {
                width: 100%;
                height: auto;

                .el-carousel__container {
                    height: 0 !important; // Override the carousel's inline desktop height.
                    padding-bottom: 38.128%;
                }

                .el-carousel__item a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 0;
                }

                .el-carousel__indicators {
                    position: static;
                    display: flex;
                    justify-content: center;
                    transform: none;
                }

                .el-carousel__indicator {
                    padding: 0;
                }

                .el-carousel__button {
                    display: grid;
                    place-items: center;
                    width: 44px;
                    height: 44px;
                    background: transparent;
                    opacity: 1;

                    &::after {
                        width: 8px;
                        height: 8px;
                        border: 1px solid var(--sd-line);
                        border-radius: 50%;
                        content: "";
                    }
                }

                .el-carousel__indicator.is-active .el-carousel__button::after {
                    background: #e2bd7f;
                }
            }

            > .u-logo {
                width: 96px;
                height: 72px;
                margin: 0 auto;
                background: url("@{kv_shengdianyunqi}logo.png") center / contain no-repeat;
            }
        }
    }
}
</style>
