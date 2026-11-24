<template>
    <div data-topic="taijimilu" class="topic-mobile-layout m-index">
        <div class="m-hero">
            <img class="first-screen" :src="imgurl + 'KV/KV4@2x.jpg'" alt="" />
        </div>
        <div class="optimization_reform">
            <img loading="lazy" class="bg" :src="imgurl + '1/bg2@2x.jpg'" alt="" />
            <div class="content">
                <img loading="lazy" class="title" :src="imgurl + '1/tittle1@3x.png'" alt="" v-animate="'flowUp'" />
                <div class="imgs">
                    <img
                        v-for="item in 4"
                        :key="item"
                        :src="`${imgurl}1/content${item}@2x.jpg`"
                        loading="lazy"
                        class="img"
                        v-animate="'flowUp'"
                    />
                </div>
                <div class="text">
                    吸取过往版本经验与教训， 基于现有玩法优化与雕琢。 重点放在提升玩家体验， 全力聚焦重塑版本核心！
                </div>
            </div>
        </div>
        <div class="secret_land">
            <img loading="lazy" class="bg" :src="imgurl + '2/bg2@2x.jpg'" alt="" />
            <div class="content">
                <img loading="lazy" class="title" :src="imgurl + '2/tittle2@3x.png'" alt="" v-animate="'flowUp'" />
                <div class="introduce">
                    <img loading="lazy" class="img" :src="imgurl + '2/content1@2x.jpg'" alt="" />
                    <div class="text">
                        <div class="text-title">秘境背景</div>
                        <div class="text-content">
                            太极宫位于长安城中轴线的北部。<br />
                            南接皇城，北倚禁苑，东西两侧分别是太子居住的东宫和宫女宦官居住的掖庭宫。<br />
                            唐高宗龙朔三年，大明宫落于城东北，后逐渐成为皇帝听政的主要宫殿，太极宫对应，作帝国中枢，威仪犹存。<br /><br />
                            唐至德二载，广平王李俶、郭子仪率联军克复两京。<br />
                            十二月，太上皇归长安，居兴庆宫，常于长庆楼宴见旧臣、受百姓拜谒。<br />
                            因忌惮太上皇的威望影响新君，李辅国与张皇后勾结，以“防变”之名将太上皇迁居太极宫甘露殿，<br />
                            并流放其亲信左右。 自此李辅国与张皇后暗中联结，权倾朝野。<br /><br />
                            不久，圣人李亨沉疴缠身，欲令太子监国，张皇后屡设毒计构陷太子李豫，东宫周旋应对，每每化险为夷。<br />
                            然则，两强并存，必生嫌隙，东宫暗中施计离间李辅国与张皇后，李辅国转向东宫示好，由此太子终得禁军支持。<br />
                            时逢楚州献异宝，圣人以其为太子祥瑞，张皇后见势孤危，竟铤而走险，密结越王李系，以「共赏祥瑞」为名，奏请于太极宫设宴，实则暗伏甲兵欲行弑储、逼宫之举。<br /><br />
                            正是，宴无好宴，霜刃隐笙歌，这场决定大唐命运的压轴大戏，终在太极宫中启幕。
                        </div>
                    </div>
                </div>
                <img
                    loading="lazy"
                    class="button"
                    :src="imgurl + '2/buttom@2x.png'"
                    alt=""
                    @click="open('https://www.jx3box.com/rank/#/21/info')"
                />
            </div>
        </div>
        <div class="boss" v-timer v-animate="'fadeIn'">
            <img loading="lazy" class="bg-head" :src="imgurl + '2.5/bg-mask@2x.png'" alt="" />
            <img loading="lazy" class="bg-foot" :src="imgurl + '2.5/bg-mask2@2x.png'" alt="" />
            <div class="boss-art">
                <div class="bg-content" :style="{ backgroundImage: `url(${imgurl}2.5/bg3-${active}@2x.jpg)` }" ref="bg-content"></div>
                <div class="bg-boss" :style="{ backgroundImage: `url(${imgurl}2.5/content3-${active}@2x.png)` }" ref="bg-boss"></div>
            </div>
            <div class="boss-names">
                <div
                    v-for="item in 6"
                    :key="item"
                    :class="`boss-name ${active === item ? 'isActive' : ''}`"
                    role="button"
                    tabindex="0"
                    :aria-pressed="active === item"
                    @keydown.enter="changeBoss(item)"
                    @keydown.space.prevent="changeBoss(item)"
                    @mouseenter="changeBoss(item)"
                    @click="changeBoss(item)"
                    @mouseleave="resetTimer"
                >
                    {{ names[item - 1] }}
                </div>
            </div>
            <div class="boss-profile">
                <h2>{{ bossProfile.name || names[active - 1] }}</h2>
                <p v-for="paragraph in bossProfile.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </div>
        </div>
    </div>
</template>

<script>
// The desktop backgrounds contain these profiles as part of the artwork.
const BOSS_PROFILES = [
    {
        paragraphs: [
            "邢廷恩生于闽越山村，自幼不知父母，只记得某一日村里来了一个衣着华丽之人将他带走，从此他便过上了吃饱饭的日子，至于别的东西，都不如宽敞的房子，干净的衣服和一天两餐饱饭来得实在。",
            "到了宫中后，这些从蛮夷之地带来的孩子就分配给了不同的宦官，领走邢廷恩的宦官姓邢，邢廷恩从此有了姓名。",
        ],
    },
    {
        paragraphs: [
            "许灵素出身楚地巫觋门派九歌祭，自幼学习与神明沟通的巫术。她年幼时直接按所卜之卦象解读大人们却并不满意。比起神明，也许他们更想听到别的声音——许灵素从此悟道",
            "观察信者的心思，只需一双慧眼；掩藏自己的神色，只需一方面具。挑选合适的龟甲、移动灼烧的方位，就能改变裂痕。蓍草的数目、铜钱之正反，皆可随巫师的手法更易，至于扶乩、占星，更是只需要一点故弄玄虚的演技与口才。",
        ],
    },
    {
        paragraphs: [
            "侯青乃平卢淄青节度使侯希逸之侄女，其父侯希湛为侯希逸胞弟。起初，兄弟二人皆为安禄山部将，侯青自幼随父长于军营。及至安禄山叛乱，侯希逸拒受伪职，侯青父女却追随叛将崔乾佑镇守河东。至德二载，郭子仪大破叛军，侯青和侯希湛兵败被俘，拒降，遂判斩刑。",
            "彼时，二皇子李系正随郭子仪出征。侯希逸料定崔乾佑必败，提前修书予李系，恳请其劝降胞弟侯希湛及侄女侯青。李系应允，携侯希逸亲笔信赶赴刑场。",
        ],
    },
    {
        paragraphs: [
            "李系本名李儋，天宝九载受封南阳郡王，授特进。至德二载随郭子仪收复河东，因功晋赵王，次年改封越王。",
            "身为肃宗次子，李系素有夺嫡之心——早年与广平王李俶、建宁王李倓争储失利后，他便深谙韬晦之道。待李俶收复两京威震朝野，被立为皇太子后，李系指使党羽上表盛赞太子功绩，更在御前屡表恭顺：“兄长为国浴血，臣弟唯愿执鞭相随。”",
        ],
    },
    {
        paragraphs: [
            "年勒出身九疑门，在其长姐被当地势力残魂渡以“落洞”之名囚禁含恨而死后，怀揣长姐遗愿的年勒遭到了残魂渡的追杀。",
            "年勒在逃亡的过程中，听闻太平公主正广纳人才，便前往长安，投入了太平公主麾下。凭借高超的武技和狠辣的行事风格，年勒很快成为太平公主手下秘密组织云鬓轩的首领。年勒许诺为太平公主卖命，条件是太平公主若登大宝，便要用皇权助她荡平残魂渡。",
        ],
    },
    {
        name: "薛琢玉",
        paragraphs: [
            "薛琢玉本无名姓，幼时仅以“小薛娘子”相称。其祖父薛瑶因兵败被贬为白身，父亲薛嵩不善经营，宗族愈发衰微。",
            "薛琢玉六岁那一年，杨玉环晋贵妃位，姊妹皆封诰命，致“不重生男重生女”之风盛。薛家以利益衡量，便将薛琢玉送入宫中为女官。未几，薛琢玉便以一手妙音琵琶拔擢为梨园弟子，入小部音声。",
        ],
    },
];

export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgurl: "https://cdn.jx3box.com/design/topic/taijimilu/",
            active: 1,
            cancle: null,
            timer: null,
            names: ["邢廷恩", "许灵素", "侯青", "李系", "年勒", "神秘贵妇"],
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
                    window.removeEventListener("scroll", binding.addClass, true);
                }
            },
        },
        timer: {
            mounted: function (el, binding) {
                const that = binding.instance;
                if (!that) return;

                binding.addtimer = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (!that.timer) {
                            that.timer = setInterval(() => {
                                that.active === 6 ? (that.active = 1) : that.active++;
                                that.resetAnimation();
                            }, 5000);
                        }
                    } else {
                        if (that.timer) {
                            clearInterval(that.timer);
                            that.timer = null;
                            that.active = 1;
                        }
                    }
                };
                window.addEventListener("scroll", binding.addtimer, true);
                binding.addtimer();
            },
            unmounted: function (el, binding) {
                const that = binding.instance;
                if (binding.addtimer) {
                    window.removeEventListener("scroll", binding.addtimer, true);
                }
                if (that && that.timer) {
                    clearInterval(that.timer);
                    that.timer = null;
                }
            },
        },
    },
    computed: {
        bossProfile() {
            return BOSS_PROFILES[this.active - 1];
        },
    },
    watch: {},
    methods: {
        open(url) {
            window.open(url, "_blank");
        },
        resetAnimation() {
            if (this.$refs["bg-content"] && this.$refs["bg-boss"]) {
                this.$refs["bg-content"].style.animation = "none";
                this.$refs["bg-boss"].style.animation = "none";
                setTimeout(() => {
                    this.$refs["bg-content"].style.animation = "fadeIn 0.3s linear 1 forwards";
                    this.$refs["bg-boss"].style.animation = "fadeIn 0.3s linear .015s 1 forwards";
                }, 1);
            }
        },
        changeBoss(item) {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            if (this.active === item) return;
            this.active = item;
            this.resetAnimation();
        },
        resetTimer() {
            this.timer = setInterval(() => {
                this.active === 6 ? (this.active = 1) : this.active++;
                this.resetAnimation();
            }, 5000);
        },
    },
    mounted() {
        this.active = 1;
        this.$nextTick(() => {
            this.resetAnimation();
        });
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/topic/taijimilu/index.less";

.boss-art {
    display: contents;
}

.boss-profile {
    display: none;
}
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

@media (max-width: 767px) {
    #app .topic-mobile-layout[data-topic="taijimilu"] {
        > .m-hero {
            padding: 0;

            > .first-screen {
                width: 100%;
                height: auto;
                margin: 0;
            }
        }

        > .boss {
            display: flex;
            flex-flow: column nowrap;
            gap: 0;
            height: auto;
            padding: 0 16px 32px;
            background: #252b2b;

            > .boss-names {
                order: -1;
                width: min(100%, 520px);
                margin: 0 auto 12px;

                > .boss-name {
                    display: grid;
                    place-items: center;
                    padding: 6px 4px;
                    font-size: 14px;
                    line-height: 1.35;
                }
            }

            > .boss-art,
            > .boss-profile {
                display: block;
                width: min(100%, 520px);
                margin: 0 auto;
            }

            > .boss-art {
                position: relative;
                overflow: hidden;
                border-radius: 6px 6px 0 0;
                background: #171b1c;

                &::before {
                    display: block;
                    padding-top: 85.5%;
                    content: "";
                }

                > .bg-content,
                > .bg-boss {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    min-height: 0;
                    // Exclude the copy printed on the right of the 2880 × 1601 scene.
                    background-size: 153.85% auto;
                    background-position: left center;
                    background-repeat: no-repeat;
                }

                > .bg-boss {
                    // The widest portrait extends to 72% of the source canvas.
                    background-size: 138.88% auto;
                    background-position: left bottom;
                }
            }

            > .boss-profile {
                padding: 16px;
                color: #efebe2;
                background: #171b1c;
                border-top: 1px solid #544b39;
                border-radius: 0 0 6px 6px;

                > h2 {
                    margin: 0 0 8px;
                    color: #f0d49a;
                    font-size: 20px;
                    line-height: 1.4;
                }

                > p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.75;
                }

                > p + p {
                    margin-top: 8px;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .m-index[data-topic="taijimilu"] .secret_land .content .introduce {
        // The inner 12:7 image height excludes the vertical padding.
        box-sizing: content-box;
    }
}
</style>
