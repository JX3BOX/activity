<template>
    <div data-topic="cangxuelongcheng" class="topic-mobile-baseline m-index">
        <!-- logo -->
        <div class="m-logo p-animation" v-animate="'fadeInLeft'">
            <img :src="imgurl + '0top/logo.png'" width="100%" />
        </div>
        <div class="m-top-banner p-animation" v-animate="'fadeInDown'">
            <img :src="imgurl + '0top/Slogan.png'" width="100%" />
        </div>
        <!-- 权益部分 -->
        <div class="m-equities">
            <div class="u-box">
                <img :src="imgurl + '0top/qymd.png'" width="100%" class="p-animation" v-animate="'fadeInDown'" />
                <img :src="imgurl + '0top/fz.png'" class="u-img p-animation" v-animate="'fadeInUp'" />
                <div class="u-text-1 p-animation" v-animate="'fadeInLeft'">一次买断·终身受益</div>
                <div class="u-text-2 p-animation" v-animate="'fadeInRight'">大幅提高日常收益自由交易无忧畅玩</div>
            </div>
        </div>
        <!-- 全新门派 -->
        <div class="m-new-sect">
            <div class="m-classify">
                <img :src="imgurl + '1menpai/1xmp.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
            <img :src="imgurl + '1menpai/cylh.png'" class="u-cylh p-animations" v-animate="'fadeInDown'" />
            <div class="u-content">
                <h3 class="u-sect-name" hidden>玄甲苍云</h3>
                <img :src="imgurl + '1menpai/mpts.png'" class="u-mpts" />
                <div class="u-text">
                    {{ sectDesc }}
                </div>
                <img
                    :src="imgurl + '1menpai/xf-1.png'"
                    class="u-tg p-animations"
                    alt=""
                    role="button"
                    tabindex="0"
                    aria-label="铁骨衣心法"
                    v-animate="'fadeInLeft'"
                    @mouseenter="previewDesc(1)"
                    @click="changeDesc(1)"
                    @keydown.enter.prevent="changeDesc(1)"
                    @keydown.space.prevent="changeDesc(1)"
                    @mouseleave="levelChangeDesc"
                />
                <img
                    :src="imgurl + '1menpai/xf-4.png'"
                    class="u-fs p-animations"
                    alt=""
                    role="button"
                    tabindex="0"
                    aria-label="分山劲心法"
                    v-animate="'fadeInRight'"
                    @mouseenter="previewDesc(2)"
                    @click="changeDesc(2)"
                    @keydown.enter.prevent="changeDesc(2)"
                    @keydown.space.prevent="changeDesc(2)"
                    @mouseleave="levelChangeDesc"
                />
                <span class="u-technique-label" hidden>铁骨衣</span>
                <span class="u-technique-label" hidden>分山劲</span>
            </div>
        </div>
        <!-- 全新秘境 -->
        <div class="m-new-secret">
            <div class="m-classify">
                <img :src="imgurl + '2mijing/qxmj.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
            <div class="u-top">
                <img :src="imgurl + '2mijing/fxdxc.png'" class="u-img p-animations" v-animate="'fadeInUp'" />
                <div class="u-text p-animations" v-animate="'bounce'">
                    史朝义受安庆绪重金及权位待遇拉拢，奉其密令前往风雪稻香村暗会前任无名王毛仲，合谋杀害安禄山之计。<br />
                    唐简、李复等人即追踪而至，此外，为寻觅身世之谜的遗孤陈月也来到此处，穆玄英和莫雨为护其周全，也不约而同赶往此处。<br />多股势力纷至沓来，这白雪皑皑之下的山村已然无法保持往日的宁静……
                </div>
            </div>
            <div class="u-boss-box">
                <div class="u-boss-list" v-show="showBoss">
                    <div class="u-boss-bg">
                        <div class="u-left p-animation" v-animate="'fadeInDown'" :style="last_boss">
                            <!-- <img :src="last_boss" /> -->
                        </div>
                        <div class="u-right p-animation" v-animate="'fadeInDown'" :style="before_boss">
                            <!-- <img :src="before_boss" /> -->
                        </div>
                    </div>
                    <img :src="imgurl + '2mijing/slzs.png'" class="u-boss-kv p-animations" alt="首领展示" v-animate="'fadeIn'" />
                    <div class="u-boss p-animations" v-animate="'fadeIn'">
                        <img :src="imgurl + '2mijing/' + boss[active_boss].img" class="u-boss-img" :alt="boss[active_boss].name" />
                        <img
                            :src="imgurl + '2mijing/jt.png'"
                            class="u-left"
                            alt=""
                            role="button"
                            tabindex="0"
                            aria-label="上一位首领"
                            @click="changeBoss(1)"
                            @keydown.enter.prevent="changeBoss(1)"
                            @keydown.space.prevent="changeBoss(1)"
                        />
                        <img
                            :src="imgurl + '2mijing/jt.png'"
                            class="u-right"
                            alt=""
                            role="button"
                            tabindex="0"
                            aria-label="下一位首领"
                            @click="changeBoss(2)"
                            @keydown.enter.prevent="changeBoss(2)"
                            @keydown.space.prevent="changeBoss(2)"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- 全新奇遇 -->
        <div class="m-new-encounter">
            <div class="m-classify">
                <img :src="imgurl + '3qiyu/qxjy.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
            <img :src="imgurl + '3qiyu/scqy.png'" class="u-scqy p-animations" v-animate="'fadeInUp'" />
            <div class="u-yljs p-animations" v-animate="'fadeInLeft'">
                <div class="u-left">
                    <img :src="imgurl + '3qiyu/yanlong.png'" />
                </div>
                <div class="u-right">
                    <img :src="imgurl + '3qiyu/yljs.png'" />
                    <div class="u-text">玄骨觅巧匠，偃甲试机锋</div>
                </div>
            </div>
            <div class="u-gyfy p-animations" v-animate="'fadeInRight'">
                <div class="u-left">
                    <img :src="imgurl + '3qiyu/guyuan.png'" />
                </div>
                <div class="u-right">
                    <img :src="imgurl + '3qiyu/gyfy.png'" />
                    <div class="u-text">游子归来意，故园满离情</div>
                </div>
            </div>
            <div class="u-xzcg p-animations" v-animate="'fadeInLeft'">
                <div class="u-left">
                    <img :src="imgurl + '3qiyu/xiazhe.png'" />
                </div>
                <div class="u-right">
                    <img :src="imgurl + '3qiyu/xzcg.png'" />
                    <div class="u-text">浩荡江湖远，且念同路谊，且记桃李情</div>
                </div>
            </div>
            <img :src="imgurl + '3qiyu/cwqy.png'" class="u-cwqy p-animations" v-animate="'fadeInUp'" />
            <!-- 宠物奇遇 -->
            <div class="u-pet-list p-animations" v-animate="'fadeInLeft'">
                <div v-for="pet in pets" :key="pet.key" class="u-pet-item">
                    <img :src="`${imgurl}3qiyu/${pet.key}.png`" alt="" />
                    <div class="u-tips-img">
                        <img :src="`${imgurl}3qiyu/${pet.key}-kv.png`" :alt="`${pet.name} · 奇遇 ${pet.encounter}`" />
                    </div>
                    <div class="u-pet-caption" hidden>
                        <strong>{{ pet.name }}</strong>
                        <span>奇遇·{{ pet.encounter }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 全新玩法 -->
        <div class="m-new-play">
            <div class="m-classify">
                <img :src="imgurl + '4wanfa/qxwf.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
            <div class="u-content">
                <div class="u-item p-animations" v-animate="'fadeInLeft'">
                    <img :src="imgurl + '4wanfa/qycz.png'" class="u-top-img" />
                    <img :src="imgurl + '4wanfa/qycz-bg.png'" class="u-bg-img" />
                    <div class="u-text">
                        侠士的一天都在干嘛？那当然是起床先去广场做一下节日任务，再去宠物房摸两把小宠物，接着搂两杆子，最后美滋滋叫上亲友一起搓麻将啦！麻将玩法趣味来袭！亲友凑桌，随时随地热血开玩！
                    </div>
                </div>
                <div class="u-item p-animations" v-animate="'fadeInRight'">
                    <img :src="imgurl + '4wanfa/hhdj.png'" class="u-top-img" />
                    <img :src="imgurl + '4wanfa/hgdj-bg.png'" class="u-bg-img" />
                    <div class="u-text">
                        横戈荡决攻守博弈再度升级，据点归属，军械竞逐，巨大的城主模拟器！诚邀侠士来大唐当一回城主吧！各个据点将新增帮会归属，排兵布局、军械攻守全部都听你的！
                    </div>
                </div>
            </div>
        </div>
        <!-- 更多精彩 -->
        <div class="m-more">
            <div class="m-classify">
                <img :src="imgurl + '5gengduo/gdjc.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
            <div class="u-img-list p-animations" v-animate="'fadeInUp'">
                <img :src="imgurl + '5gengduo/sbty.png'" />
                <img :src="imgurl + '5gengduo/xyztg.png'" />
                <img :src="imgurl + '5gengduo/tbkf.png'" />
                <img :src="imgurl + '5gengduo/qxxdssmj.png'" />
                <img :src="imgurl + '5gengduo/zbsx.png'" />

                <img :src="imgurl + '5gengduo/sl.png'" />
            </div>
            <div class="u-footer">
                <img :src="imgurl + '5gengduo/footer.png'" class="p-animations" v-animate="'fadeInDown'" />
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "cangxuelongcheng";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgurl: "https://img.jx3box.com/topic/cangxuelongcheng/",
            active_boss: 0,
            last_boss: "",
            before_boss: "",
            showBoss: true,
            boss: [
                { img: "mxc.png", bgUrl: "mxc-bg.png", name: "莫寻常" },
                { img: "dzyh.png", bgUrl: "dzyh-bg.png", name: "地字一号" },
                { img: "szy.png", bgUrl: "szy-bg.png", name: "史朝义" },
                { img: "hy.png", bgUrl: "hy-bg.png", name: "黑鹰" },
                { img: "wm.png", bgUrl: "wm-bg.png", name: "无名" },
            ],
            pets: [
                { key: "dd", name: "刀豆", encounter: "沙海谣" },
                { key: "yqxg", name: "弈棋小龟", encounter: "竹马情" },
                { key: "mjk", name: "苗疆客", encounter: "滇南行" },
            ],
            sectDesc:
                "新门派「苍云」具有擎刀、擎盾多体态的输出形式、攻防兼备，有较强输出压制能力的同时，兼具控制与防守能力。使用全新镇派系统，苍云侠士需取舍关键层镇派来构建缘起专属武学体系，灵活搭配以探索克敌之道。",
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
    computed: {},
    watch: {},
    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                console.log(res);
            });
        },
        changeDesc(type) {
            if (type == 1) {
                this.sectDesc = "此功运之有如铁甲在身，攻守兼备，近身者周身如芒在刺，亦难伤其分毫。";
            } else {
                this.sectDesc = "此功运之有如惊雷开山之势，霸道强横，非勇猛无匹者不能习。";
            }
        },
        previewDesc(type) {
            if (!window.matchMedia("(max-width: 767px) and (hover: none)").matches) {
                this.changeDesc(type);
            }
        },
        levelChangeDesc() {
            if (window.matchMedia("(max-width: 767px)").matches) return;

            this.sectDesc =
                "新门派「苍云」具有擎刀、擎盾多体态的输出形式、攻防兼备，有较强输出压制能力的同时，兼具控制与防守能力。使用全新镇派系统，苍云侠士需取舍关键层镇派来构建缘起专属武学体系，灵活搭配以探索克敌之道。";
        },
        getBoss() {
            let bg1 = "",
                bg2 = "";
            if (this.active_boss == 0) {
                bg1 = this.boss[this.active_boss + 1].bgUrl;
                bg2 = this.boss[this.boss.length - 1].bgUrl;
            } else if (this.active_boss == this.boss.length - 1) {
                bg1 = this.boss[0].bgUrl;
                bg2 = this.boss[this.active_boss - 1].bgUrl;
            } else {
                bg1 = this.boss[this.active_boss + 1].bgUrl;
                bg2 = this.boss[this.active_boss - 1].bgUrl;
            }
            this.last_boss = {
                "background-image": `url(${this.imgurl}2mijing/${bg1})`,
            };
            this.before_boss = {
                "background-image": `url(${this.imgurl}2mijing/${bg2})`,
            };
            // return {
            //     "background-image": `url(${this.imgurl}2mijing/${bg1}), url(${this.imgurl}2mijing/${bg2})`,
            // };
        },
        changeBoss(type) {
            this.showBoss = false;
            setTimeout(() => {
                if (type == 1) {
                    if (this.active_boss == 0) {
                        this.active_boss = this.boss.length - 1;
                    } else {
                        this.active_boss = this.active_boss - 1;
                    }
                } else {
                    if (this.active_boss == this.boss.length - 1) {
                        this.active_boss = 0;
                    } else {
                        this.active_boss = this.active_boss + 1;
                    }
                }
                this.getBoss();
                this.showBoss = true;
            }, 200);
        },
    },

    created: function () {
        this.getBoss();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/topic/yuanqicangyun/index.less";
</style>

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";
@import "~@/assets/css/topic/yuanqicangyun/mobile.less";
</style>
