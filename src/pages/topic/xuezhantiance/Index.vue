<template>
    <div class="m-index">
        <div class="m-mark" ref="mark"></div>
        <!-- 头部 -->
        <div class="m-top">
            <img class="u-img u-top-author p-animation" v-animate="'fadeInLeft'" :src="`${imgPath}/top-author.png`" />
            <img class="u-img u-top-title p-animation" v-animate="'fadeInDown'" :src="`${imgPath}/top-title.png`" />
            <img
                class="u-img u-top-title-tip p-animation"
                v-animate="'fadeInUp'"
                :src="`${imgPath}/top-title-tip.png`"
            />
            <img class="u-img u-top-jump__icon" :src="`${imgPath}/top-jump-icon.png`" />
        </div>
        <!-- 血战天策 -->
        <div class="m-one m-section">
            <h2 class="u-title u-title-1 p-animation" v-animate="'fadeInUp'">血战天策</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">
                <p>史诗级“血战天策”战役将在战乱后的天策府打响，</p>
                <p>乱世中英勇侠士们与狼牙军的巅峰对决即将上演!</p>
                <p>护城河已被鲜血染红，</p>
                <p>再现乱世大唐众侠与安禄山为首的狼牙军之间的终极对决!</p>
            </div>
            <div class="m-boss-list">
                <div class="m-item" v-for="(item, i) in boss" :key="i">
                    <img
                        class="u-boss p-animations"
                        v-animate="i % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'"
                        :src="`${imgPath}/p1/${item.img}.png`"
                    />
                    <div class="u-box p-animation" v-animate="i % 2 === 0 ? 'fadeInRight' : 'fadeInLeft'">
                        <span class="u-name">{{ item.name }}</span>
                        <span class="u-brief">{{ item.brief }}</span>
                    </div>
                    <div class="u-tips p-animation" v-animate="'fadeInUp'">
                        <span class="u-label">机制要点</span>
                        <span class="u-text">{{ item.tip }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 镇派新结构 -->
        <div class="m-two m-section">
            <h2 class="u-title u-title-2 p-animation" v-animate="'fadeInUp'">镇派新结构</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">新镇派系统全面适配！武学体系灵活构建！</div>
            <div class="m-factions-box p-animation" v-animate="'pulse'">
                <span
                    :key="old ? old + 'o' : old + 'n'"
                    :class="`u-img u-button p-animation flipInY`"
                    @click="old = !old"
                >
                    <img :src="`${imgPath}/p2/c-${old ? 'n' : 'o'}-factions.svg`" />
                </span>
                <span class="u-img p-animation pulse" :key="old ? 'o' : 'n'">
                    <img :src="`${imgPath}/p2/${old ? 'old' : 'new'}-factions.png`" />
                </span>
                <div class="m-kv">
                    <img :src="`${imgPath}/p2/factions-kv.png`" />
                    <div class="u-desc p-animation bounceIn" :key="old ? 'o-img' : 'n-img'">
                        <span class="u-desc__title">{{ old ? "旧" : "新" }}</span>
                        <span class="u-desc__sub">镇派</span>
                        <p v-if="!old">
                            所有输出心法可在第三/第五层镇派中<br />
                            对三种<b>关键武学套路</b>进行<b>选择、取舍</b><br />
                            来构建自身武学体系，灵活搭配探索克敌之道！
                        </p>
                    </div>
                </div>
                <span class="u-text">*以[拥雪]为例</span>
            </div>
        </div>

        <!-- 非酋福音 -->
        <div class="m-three m-section">
            <h2 class="u-title u-title-3 p-animation" v-animate="'fadeInUp'">非酋福音</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">低保装备仍不满意？集碎片来自选！</div>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p3/plate-tip.png`" />
            </div>
            <div class="m-award-box p-animation">
                <div class="m-item" v-for="(item, i) in award" :key="i">
                    <img class="u-img" :src="`${imgPath}/p3/icon-${i + 1}.png`" />
                    <div class="u-detail p-animation" v-animate="'fadeInUpBig'">
                        <span class="u-text"> {{ item }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 萌新成长 -->
        <div class="m-four m-section">
            <h2 class="u-title u-title-4 p-animation" v-animate="'fadeInUp'">萌新成长</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">初入江湖的侠士，你们的福气真来了！</div>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p4/yc-title.png`" />
            </div>
            <div class="m-content">
                <div
                    :class="`m-item m-item-${i + 1}  p-animation`"
                    v-animate="i % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'"
                    v-for="(item, i) in activity.slice(0, 4)"
                    :key="i"
                >
                    <h3>{{ item.title }}</h3>
                    <span class="u-desc" v-html="item.desc"></span>
                    <img class="u-icon" :src="`${imgPath}/p4/${item.icon}`" />
                </div>
            </div>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p4/st-title.png`" />
            </div>
            <div class="m-item m-item-5 p-animation" v-animate="'fadeInUp'">
                <h3>{{ st.title }}</h3>
                <span class="u-desc" v-html="st.desc"></span>
                <img class="u-icon" :src="`${imgPath}/p4/${st.icon}`" />
            </div>
        </div>
        <!-- 养成系奇遇  -->
        <div class="m-five m-section">
            <h2 class="u-title u-title-5 p-animation" v-animate="'fadeInUp'">养成系奇遇</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">
                该绝世奇遇预计于初夏正式上线，实际以游戏上线内容为准
            </div>
            <div class="m-content">
                <div
                    class="m-item p-animation"
                    v-for="(item, i) in adventure"
                    :key="i"
                    v-animate="i % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'"
                >
                    <img class="u-img" :src="`${imgPath}/p5/${item.img}`" />
                    <div class="u-desc" v-html="item.desc"></div>
                </div>
            </div>
        </div>
        <!-- 行侠豪礼 -->
        <div class="m-six m-section">
            <h2 class="u-title u-title-6 p-animation" v-animate="'fadeInUp'">行侠豪礼</h2>
            <div class="u-plate-text p-animation" v-animate="'fadeInUp'">七级五行石、精美成衣、奇趣坐骑、趣味跟宠</div>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p6/zk-icon.png`" />
            </div>
            <div class="u-plate-text u-tips p-animation" v-animate="'fadeInUp'">
                3月21日版本更新后，<br />
                全民（含新创建角色）赠送6.8折优惠券，活动长期有效。
            </div>
            <span class="u-img p-animation" v-animate="'fadeInUp'">
                <img class="u-card" :src="`${imgPath}/p6/discount.png`" />
            </span>
            <span class="u-plate-text" v-animate="'fadeInUp'">
                ※ 折扣券支持商城永久可购买的成衣、发型、武器及外装拓印收集，以及部分挂件、跟宠、坐骑、小玩意儿。
            </span>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p6/jx-icon.png`" />
            </div>
            <div class="m-pic">
                <img class="u-img u-img-bg p-animation" v-animate="'pulse'" :src="`${imgPath}/p6/xx-bg.png`" />
                <img class="u-img p-animation" v-animate="'fadeInLeft'" :src="`${imgPath}/p6/xx-left.png`" />
                <img class="u-img p-animation" v-animate="'fadeInRight'" :src="`${imgPath}/p6/xx-right.png`" />
            </div>
            <div class="u-sub-title u-more">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p6/qd-icon.png`" />
            </div>
            <p class="u-tips p-animation" v-animate="'fadeInUp'">
                团队秘境“血战天策·决战”<br />
                小队秘境“直城门”<br />
                休闲向策略对战玩法<br />
                挂件自定义<br />
                各界面置顶功能<br />
                声望界面改版<br />
                随身商店<br />
                ……<br />
            </p>
            <div class="u-sub-title">
                <img class="p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/top-author.png`" />
            </div>
        </div>
        <img class="u-footer" :src="`${imgPath}/p6/page-bottom.png`" />
    </div>
</template>

<script>
const KEY = "xuezhantiance";
import { getTopic } from "@/service/topic";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Index",
    components: {},
    data: function () {
        return {
            imgPath: __cdn + "design/topic/" + KEY,
            old: false,
            raw: [],
            boss: [
                { img: "b-xsy", name: "席庶云", brief: "在守住城门一段时间后，席庶云就会出现", tip: "合作 时机" },
                {
                    img: "g-gstcf",
                    name: "关卡：固守天策府",
                    brief: "阻止狼牙士兵的进攻，为攻城部队赢取时间",
                    tip: "合作 时机",
                },
                {
                    img: "b-cyl",
                    name: "曹炎烈",
                    brief: "狼牙军中的“山狼”，天策府曹雪阳将军之兄， 是狼牙中为数不多的几个汉人。 安禄山将狼牙与三镇之间所有的联系事务都交给了他。",
                    tip: "操作 移动",
                },
                {
                    img: "g-shqymc",
                    name: "关卡：守护青骓牧场",
                    brief: "天策府、青骓牧场西方的天策属地已尽数被狼牙占领， 战事危机。侠士受委托前往前线击败狼牙军， 以解战事之急。",
                    tip: "操作 移动",
                },
                {
                    img: "b-asncl",
                    name: "阿史那从礼",
                    brief: "四十岁，突厥人，父亲是曾经的突厥王阿史那玉，有一个孪生兄弟阿史那承庆。当年他们兄弟被突厥老将军哥舒恒所救，但是突厥王庭已被唐军攻破，父亲也成了阶下囚，两兄弟无家可归，只好领着残余军队流浪在漠北。为了复国，他们投靠了安禄山，安禄山非常赏识他们，任命为狼牙的“八大金刚”之首。",
                    tip: "转火 机动",
                },
            ],

            award: [
                "侠士可以在兑换商店将归墟秘境获得的绑定精简装备通过指定道具拆解为碎片",
                "碎片可自选兑换特效精简装备及最高品级的不带特效的精简装备",
                "兑换商店会随赛季更新，兑换商店有五行石填充奖励用于处理多余碎片",
            ],
            activity: [
                {
                    title: "粽子免费领！",
                    desc: "1、所有未满级的萌新侠士每天可在花萼楼界面领取3~5个随机数量的升级粽子助力升级，可领取7天；<br/>2、粽子不再有每日使用个数限制，直升丸子的使用等级要求下降为5级。",
                    icon: "cy-icon.png",
                },
                {
                    title: "萌新专属频道！",
                    desc: "初入江湖的萌新会自动进入萌新频道，<br/>频道内有专属导师手把手提供帮助。",
                    icon: "cj-icon.png",
                },
                {
                    title: "新手历程优化！",
                    desc: "1、降低了新手技能的内力消耗；<br/>2、提高了稻香村任务的经验值，出村即为15级，可直接进入门派拜师；<br/>3、全地图经验增益效果提升，助力侠士更快满级。",
                    icon: "tc-icon.png",
                },
                {
                    title: "精炼6折开启！",
                    desc: "1、活动期间新建角色首次精炼消耗为原来的60%；<br/>2、新建角色满级后可获得持续30天的20层增益，携带该增益且激活月卡时完成大战、阵营日常可获得额外五行石奖励，助力初入江湖的侠士轻松精5插5达到团本门槛。",
                    icon: "sl-icon.png",
                },
                {
                    title: "活动期间",
                    desc: "1.当侠士的徒弟达到指定装分，师徒双方都可以获得活动代币。<br/>2.可通过代币商店将活动代币兑换为五行石、挂件等奖励。<br/>3.新秘境更新2个月后，师父可将部分往期门派套装装备直接交易给徒弟。",
                    icon: "act-tip.png",
                },
            ],
            adventure: [
                {
                    img: "main-icon-child.png",
                    title: "童心铲",
                    desc: "闲游江湖，为气任侠。一次偶然的出手相助，竟从觅宝会获赠了一把其貌不扬的铲子，柄上篆刻禅语，暗藏佛法妙理。铲子来源何处？曾为何人所有？随着探究的深入，其背后似乎另有一番奇缘……",
                },
                {
                    img: "main-icon-youth.png",
                    title: "青年悬赏",
                    desc: "江湖传闻，乱枫深处，神秘鬼影趁夜色惊扰村庄；一纸悬赏，闹市之中，何方大侠怀胆气为民揭榜？余丝未了，天一余祸牵扯甚广；是劫是缘，静待诸君一探究竟！",
                },
            ],
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
                // this.video = this.data.index_video[0]["link"];
                // this.pve = this.data.index_pve;
            });
        },
        handleMask(event) {
            let x = -event.clientX / 150;
            let y = -event.clientY / 150;

            if (this.$refs.mark) {
                this.$refs.mark.style.backgroundPositionX = x + "px";
                this.$refs.mark.style.backgroundPositionY = y + "px";
            }
        },
    },
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.handleMask);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/xuezhantiance/index.less";
</style>
