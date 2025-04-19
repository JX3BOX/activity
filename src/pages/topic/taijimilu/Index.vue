<template>
    <div class="m-index">
        <div>
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
            <div class="bg-content" :style="{backgroundImage: `url(${imgurl}2.5/bg3-${active}@2x.jpg)`}" alt="" ref="bg-content" ></div>
            <div class="bg-boss" :style="{backgroundImage: `url(${imgurl}2.5/content3-${active}@2x.png`}" alt="" ref="bg-boss" ></div>
            <div class="boss-names">
                <div
                    v-for="item in 6"
                    :key="item"
                    :class="`boss-name ${active === item ? 'isActive' : ''}`"
                    @mouseenter="changeBoss(item)"
                    @mouseleave="resetTimer"
                >
                    {{ names[item - 1] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            inserted: function (el, binding) {
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
            unbind: function (el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
        timer: {
            inserted: function (el, binding, vnode) {
                let that = vnode.context;
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
            unbind: function (el, binding, vnode) {
                let that = vnode.context;
                if (binding.addtimer) {
                    window.removeEventListener("scroll", binding.addtimer);
                    clearInterval(that.timer);
                    that.timer = null;
                }
            },
        },
    },
    computed: {},
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
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/topic/taijimilu/index.less";
</style>
