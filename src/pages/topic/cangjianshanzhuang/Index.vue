<template>
	<div data-topic="cangjianshanzhuang" class="topic-mobile-baseline m-index">
		<!-- 第一屏 -->
		<div class="m-top">
			<div class="u-title p-animation" v-animate="'fadeInDown'"></div>
			<div class="u-mohe p-animation" v-animate="'flipInX'"></div>
		</div>
		<!-- 视频 -->
		<div class="m-video">
			<div class="u-box">
				<div class="u-txtr p-animation" v-animate="'fadeInRight'"></div>
				<div class="u-video" v-html="video"></div>
			</div>
			<div class="u-text p-animation" v-animate="'fadeInDown'"></div>
			<div class="u-mobile-summary" hidden>
				<p class="u-mobile-title">藏剑</p>
				<p>藏剑山庄以铸剑闻名，更因十年一次的名剑大会而名扬江湖。庄中名侠辈出，弟子多数配轻重二剑，运使如意。</p>
				<p>定位：外功近战：输出<br />武器：重兵，短兵</p>
			</div>
			<!-- 链接 -->
			<div class="u-btn p-animation" v-animate="'fadeInDown'">
				<a :href="item.link" :target="item.target" v-for="(item, i) in cangjian" :key="i" :class="`u-btn` + (i + 1)" :aria-label="item.name"></a>
			</div>
		</div>
		<!-- PVE -->
		<div class="m-pve">
			<div class="u-title p-animation" v-animate="'fadeInDown'"></div>
			<div class="u-box p-animation" v-animate="'bounceIn'">
				<!-- 切换tab -->
				<div class="u-tab">
					<span v-for="item in 2" :key="item" :class="[`u-tab` + item, item == tabIndex ? 'active' : '']" role="button" tabindex="0" :aria-disabled="!pvebanner[item - 1]" :aria-label="pvebanner[item - 1]?.title || `查看第 ${item} 个秘境`" :aria-pressed="item === tabIndex" @keydown.enter="changeTab(item)" @keydown.space.prevent="changeTab(item)" @click="changeTab(item)"></span>
				</div>
				<div class="u-tab-block">
					<!-- BOSS图片 -->
					<div class="u-img">
						<img :src="tabImg" :alt="pvebanner[tabIndex - 1]?.title || ''" />
						<a :href="tabImgLink" class="u-more" target="_blank" :aria-label="pvebanner[tabIndex - 1]?.title ? `查看${pvebanner[tabIndex - 1].title}首领数据` : undefined"></a>
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
		<!-- PVP -->
		<div class="m-pvp">
			<div class="u-title p-animation" v-animate="'fadeInDown'"></div>
			<div class="u-box">
				<div class="u-slogan p-animation" v-animate="'bounceIn'"></div>
				<div class="u-pvp p-animation" v-animate="'flipInY'"></div>
			</div>
		</div>
		<!-- 其它 -->
		<div class="m-other">
			<div class="u-title p-animation" v-animate="'fadeInDown'"></div>
			<div class="u-box p-animation" v-animate="'fadeInDown'">
				<div class="u-more" v-if="more.length < 1"></div>
				<div class="u-swiper" v-else>
					<el-carousel height="var(--cangjian-carousel-height, 440px)">
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
const KEY = "cangjianshanzhuang";
import { getTopic } from "@/service/topic";
export default {
	name: "Index",
	props: [],
	components: {},
	data: function () {
		return {
			cangjian: [
				{ name: "藏剑武学", link: "#/cangjian", target: "_self" },
				{
					name: "藏剑宏库",
					link: "/macro/#/?subtype=问水诀",
					target: "_blank",
				},
				{
					name: "藏剑配装",
					link: "/pz/#/public?mount=10144",
					target: "_blank",
				},
				{
					name: "藏剑攻略",
					link: "/bps/#/?subtype=问水诀",
					target: "_blank",
				},
			],
			video: "",
			tabIndex: 1,
			btn: [
				{ name: "新配装器", link: "/pz" },
				{
					name: "副本掉落",
					link: "/fb/#/drop_v2?fb_name=荻花宫后山&fb_zlp=风起稻香",
				},
				{ name: "战斗分析", link: "/battle" },
				{ name: "团队工具", link: "/team" },
			],
			pve: [],
			pvebanner: [],
			more: [],
			tabImg: "",
			tabImgLink: "/fb/#/npc?fb_zlp=风起稻香&fb_name=荻花宫后山",
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
	},
	watch: {},
	methods: {
		init: function () {
			getTopic(KEY).then((res) => {
				this.raw = res.data.data;
				this.video = this.data.index_video[0]["link"];
				this.pve = this.data.index_pve;
				this.pvebanner = this.data.index_pve_banner.reverse();
				this.more = this.data.index_more || [];

				this.tabImg = this.pvebanner[0].img;
				this.tabImgLink = this.pvebanner[0].link;
			});
		},
		changeTab(i) {
			if (!this.pvebanner[i - 1]) return;
			this.tabIndex = i;
			i = i - 1;
			this.tabImg = this.pvebanner[i].img;
			this.tabImgLink = this.pvebanner[i].link;
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
@import "~@/assets/css/topic/cangjianshanzhuang/index.less";
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

@media (max-width: 767px) {
    #app [data-topic="cangjianshanzhuang"] {
        --cangjian-width: 580px;
        --cangjian-gutter: clamp(16px, 4vw, 24px);
        width: 100%;
        min-width: 0;
        color: #f8edce;

        .p-animation {
            opacity: 1;
            animation: none;
        }

        > .m-top {
            position: relative;
            min-height: 0;
            height: 62.5vw;
            padding: 0;
            background-position: center top;
            background-size: 100% 100%;

            > .u-title,
            > .u-mohe {
                position: absolute;
                inset: auto 0;
                margin: 0 auto;
                background-position: center;
                background-size: contain;
            }

            > .u-title {
                top: 56.67%;
                width: 71.56%;
                height: 23.5%;
            }

            > .u-mohe {
                top: 80.17%;
                width: 22.6%;
                height: 8.67%;
            }
        }

        > .m-video,
        > .m-pve,
        > .m-pvp,
        > .m-other {
            height: auto;
            padding: 24px var(--cangjian-gutter);
            background-size: cover;
            background-position: center;

            > .u-title {
                width: min(100%, 520px);
                height: clamp(50px, 15vw, 92px);
                margin: 0 auto 12px;
                padding: 0;
                background-size: contain;
                background-position: center;
            }

            > .u-box {
                width: min(100%, var(--cangjian-width));
                height: auto;
            }
        }

        .m-video {
            > .u-box {
                display: grid;
                grid-template-columns: minmax(0, 1fr) clamp(20px, 7vw, 36px);
                gap: 6px;
                padding: 6px;
                border: 1px solid #c89b50;
                background: #4a3827;
            }

            .u-txtr {
                position: static;
                grid-area: 1 / 2;
                width: 100%;
                height: auto;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }

            .u-video {
                position: relative;
                grid-area: 1 / 1;
                width: 100%;
                height: auto;
                padding: 0;

                &::before {
                    content: "";
                    display: block;
                    padding-top: 56.25%;
                }

                iframe,
                video {
                    position: absolute;
                    inset: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            > .u-text {
                display: none;
            }

            .u-mobile-summary {
                display: block;
                width: min(100%, var(--cangjian-width));
                margin: 16px auto 12px;
                padding: 12px;
                border-block: 1px solid #ae9054;
                background: rgba(17, 34, 41, 0.76);
                font-size: 14px;
                line-height: 1.65;

                p {
                    margin: 0;
                }

                p + p {
                    margin-top: 6px;
                }

                .u-mobile-title {
                    color: #ffe3a5;
                    font-size: 18px;
                    font-weight: 700;
                    text-align: center;
                }
            }

            .u-btn {
                width: min(100%, 380px);
                height: auto;
                margin: 0 auto;
                padding: 0;
            }
        }

        .m-video .u-btn,
        .m-pve .u-btnbox {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 6px;

            > a {
                width: 100%;
                min-height: 44px;
                height: clamp(118px, 35vw, 172px);
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: center;
                box-shadow: none;
                touch-action: manipulation;
            }
        }

        .m-pve {
            .u-box {
                padding: 16px 12px;
                background-color: rgba(253, 240, 207, 0.16);
                background-size: 100% 100%;
            }

            .u-tab {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 12px;
                width: 100%;
                height: auto;

                > span {
                    display: grid;
                    place-items: center;
                    width: 100%;
                    min-height: 44px;
                    border: 1px solid #a68a55;
                    border-radius: 4px;
                    background-color: #e5d9b9;
                    background-image: none;
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    touch-action: manipulation;

                    &.active {
                        border-color: #81531e;
                        background-color: #f7e6ba;
                        box-shadow: inset 0 0 0 1px #81531e;
                    }

                    &[aria-disabled="true"] {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }

                    &:not([aria-label="剑冢"]):not([aria-label="荻花后山"])::after {
                        content: attr(aria-label);
                        color: #302721;
                        font-size: 14px;
                    }

                    &[aria-label="剑冢"] {
                        background-image: url("@{kv_cangjianshanzhuang}tab2.png");
                    }

                    &[aria-label="荻花后山"] {
                        background-image: url("@{kv_cangjianshanzhuang}tab1.png");
                    }
                }
            }

            .u-tab-block {
                display: grid;
                gap: 12px;
                height: auto;
                padding-top: 12px;
            }

            .u-tab-block .u-img,
            .u-news,
            .u-btnbox {
                width: 100%;
                height: auto;
                margin: 0;
            }

            .u-img img {
                display: block;
                width: 100%;
                height: auto;
            }

            .u-tab-block .u-img .u-more {
                position: static;
                display: block;
                width: 175px;
                min-height: 44px;
                margin: 8px auto;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                touch-action: manipulation;
            }

            .u-news {
                padding: 0 12px;

                .u-line {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(0, 26%);
                    align-items: center;
                    gap: 8px;
                    min-height: 44px;
                    padding: 6px 0;
                    color: #342617;
                    font-size: 14px;
                    line-height: 1.45;
                    text-decoration: underline;
                    text-decoration-color: #8b6d39;
                    text-underline-offset: 2px;

                    span {
                        max-width: none;
                        padding: 0;
                        white-space: normal;
                        overflow-wrap: anywhere;
                    }

                    .u-author {
                        color: #65553f;
                        text-align: right;
                    }
                }
            }
        }

        .m-pvp {
            background-color: #302721;
            background-size: 100% auto;
            background-position: center top;

            .u-box {
                padding-top: clamp(96px, 40vw, 290px);
            }

            .u-slogan,
            .u-pvp {
                width: 100%;
                margin: 0 auto;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }

            .u-slogan {
                height: clamp(120px, 36vw, 240px);
            }

            .u-pvp {
                height: clamp(54px, 13vw, 100px);
            }
        }

        .m-other {
            .u-box {
                padding: 14px 12px;
                background-size: 100% 100%;
            }

            .u-more {
                max-width: 100%;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }

            .u-swiper {
                --cangjian-carousel-height: 0px;
                height: auto;

                .el-carousel__container {
                    padding-top: 38.13%; // The CMS poster canvas is 1154 × 440.
                }

                a,
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                img {
                    object-fit: contain;
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
                    background: none;
                    transition: opacity 0.2s;

                    &::after {
                        content: "";
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #503615;
                    }
                }

                .el-carousel__indicator.is-active .el-carousel__button::after {
                    box-shadow: 0 0 0 2px #f7e6b6, 0 0 0 3px #503615;
                }

                .el-carousel__arrow {
                    top: calc((100% - 44px) / 2);
                    width: 44px;
                    height: 44px;
                }
            }

            .u-logo {
                width: min(44%, 172px);
                height: clamp(64px, 26vw, 104px);
                margin: 12px auto 0;
                background-size: contain;
                background-position: center;
            }
        }

        > .m-leaf {
            display: none;
        }

        a:focus-visible,
        button:focus-visible,
        [role="button"]:focus-visible {
            outline: 2px solid #ecca89;
            outline-offset: 2px;
        }
    }
}
</style>
