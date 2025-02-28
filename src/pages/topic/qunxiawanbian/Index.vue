<template>
    <div class="m-index">
        <!--KV头部背景-->
        <div class="m-top m-jump">
            <div class="u-logo"></div>
        </div>
        <!--p1技改-->
        <div class="m-one m-jump">
            <a class="m-link  p-animation" target="_blank" v-animate="'fadeInRight'"
                href="https://www.jx3box.com/bps/56720">
                <i class="u-play"></i>
            </a>
        </div>
        <!--p2副本-->
        <div class="m-two m-jump">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-group p-animation" v-animate="'fadeInDown'">
                <div class="u-boss u-sf-on"></div>
                <div v-for="(boss, key) in fb.wyhl.boss" :key="key" :class="'u-boss u-' + boss.index + '-off'"></div>
                <div class="u-profile u-profile-sf"></div>
            </div>
            <div class="u-text u-text-sf p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-subtitle p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-links p-animation" v-animate="'fadeInDown'">
                <div class="m-btnGroup">
                    <a v-for="(btn, key) in fb.links" :key="key" :class="'u-button u-' + btn.icon" :href="btn.url"
                        target="_blank"></a>
                </div>
            </div>
        </div>
        <!--p3百强-->
        <div class="m-three m-jump p-animation" v-animate="'fadeInDown'">
            <div class="u-logo"></div>
            <a href="https://www.jx3box.com/jdt/7th/rank" class="u-button" target="_blank"></a>
        </div>
        <!--p4体型-->
        <div class="m-four m-jump">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-panel p-animation" v-animate="'fadeInDown'">
                <a href="https://www.jx3box.com/face/" class="u-button" target="_blank"></a>
            </div>
            <div class="m-detail p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--p5单人吃鸡-->
        <div class="m-five m-jump">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-btnGroup">
                <div v-for="index in 4" :key="index" :class="'u-button ' + 'u-act'" @click="changeCJ(index)">
                    <i class="u-act" v-show="index == jjsc_present"></i>
                </div>
            </div>
            <div class="m-panel " v-for="item in jjsc" :key="item" v-show="item.index == jjsc_present">
                <div :class="'p-animation u-pic u-bg' + item.index" v-animate="'fadeInRight'"></div>
                <div class="m-textBox">
                    <div class="u-text p-animation" v-for="desc in item.desc" :key="desc" v-animate="'fadeInRight'">{{ desc
                    }}</div>
                </div>
            </div>
        </div>
        <!-- p6新侠客 -->
        <div class="m-six m-jump">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-panel p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!-- p7帮会宣战 -->
        <div class="m-seven m-jump">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-panel p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-text p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--p8世界首领 -->
        <div class="m-eight m-jump">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-panel p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--p9黑底-->
        <div class="m-nine"></div>
    </div>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider'// 引入slider组件
import { showMountIcon } from "@jx3box/jx3box-common/js/utils";//引入心法图标
const KEY = "qunxiawanbian";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    props: [],
    components: {
        // slider,
        // slideritem
    },
    data: function () {
        return {
            navStyle: { 'display': 'none' },
            navActive: 1,
            mouseoverActive: null, //导航鼠标经过事件
            isMobile: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
            imgurl: "https://img.jx3box.com/topic/qunxiawanbian/",
            sliderinit: {
                currentPage: 0,//当前页码
                effect: 'nest',
                thresholdDistance: 100,//滑动判定距离
                thresholdTime: 100,//滑动判定时间
                loop: true,//循环滚动
                infinite: 1,//无限滚动前后遍历数
                slidesToScroll: 1,//每次滑动项数
                pagination: false
            },
            fb: {
                wyhl: {
                    name: "武狱黑牢",
                    boss: [
                        {
                            name: "时风",
                            index: "sf"
                        },
                        {
                            name: "乐临川",
                            index: "ylc"
                        },
                        {
                            name: "牛波",
                            index: "nb"
                        },
                        {
                            name: "和正",
                            index: "hz"
                        },
                        {
                            name: "武云阙",
                            index: "wyq"
                        },
                        {
                            name: "解兰舟",
                            index: "xlz"
                        },
                        {
                            name: "翁幼之",
                            index: "wyz"
                        },
                    ]

                },
                links: [
                    {
                        name: "武狱黑牢攻略",
                        url: "https://www.jx3box.com/fb/?fb_name=%E6%AD%A6%E7%8B%B1%E9%BB%91%E7%89%A2",
                        icon: "btn4"
                    },
                    {
                        name: "门派宏库",
                        url: "https://www.jx3box.com/macro/",
                        icon: "btn2"
                    }, {
                        name: "团队平台",
                        url: "https://www.jx3box.com/team/",
                        icon: "btn1"
                    }, {
                        name: "鹿桥驿攻略",
                        url: "https://www.jx3box.com/fb/?fb_name=%E9%B9%BF%E6%A1%A5%E9%A9%BF",
                        icon: "btn3"
                    }

                ]
            },
            //单人吃鸡绝境沙场
            jjsc_present: 1,
            jjsc: [
                {
                    index: 1,
                    desc: [
                        "“群侠万变”资料片公测后至6月26日维护前，侠士们将可进入新绝境场景【洱海绝境】参与单人模式战斗!【劫掠的货物】随机刷新，【南诏王的召唤】与全新道具带来更多变数!更多精彩待君探索，一人成队独行千里，利刃出鞘谁与争锋!",
                        "",
                        "众人皆敌，群狼环伺，这是一场对武力与智力的综合考验!为保证与提升侠士们的体验，单人模式基于原有的绝境战场玩法上有所调整。",
                        "◇每局至多有80位侠士参与。",
                        "◇为防止恶意组队，除地图频道外，所有侠士名字都将以“未知侠士”标识，且禁止使用近聊频道。",
                        "◇本模式结算时，若名次排行在前50%，即可计为完成了1次绝境战场周常任务条件。"
                    ]
                }, {
                    index: 2,
                    desc: [
                        "无需击溃马匪，刷新倒计时结束后即可拾取【劫掠的货物】!内含橙色品质装备与神秘道具，可助侠士一臂之力。",
                        "战斗越临近终章，则【劫掠的货物】价值越高!是逆风翻盘还是如虎添翼?或许你最需要的东西就在这里!"
                    ]
                }, {
                    index: 3,
                    desc: [
                        "每场战斗将会有三次【南诏王的召唤】，开始前均会发布全图公告召集侠士参与。",
                        "处于脱战状态的侠士届时可直接点击使用背包中自动获得的【南诏王的信物】，进入决斗场地准备作战。",
                        "从【南诏王的召唤】中存活胜出的侠士们不仅可以将其中拾获的稀有装备直接带到【洱海绝境】继续使用，而且将会获得持续一段时间的隐身与毒圈免疫效果,期间攻击他人将立即失效。"
                    ]
                }, {
                    index: 4,
                    desc: [
                        "此去危险重重，宜早作多手准备!侠士们进入时，将自动获得【步步为营】【洱海飞爪】，带你体验不一样的战斗!",
                        "",
                        "【步步为营】",
                        "侠士可提前在某处放置一个5分钟内隐形的【步步为营】，自身身受重伤时可立即在这处复活并获得一套基础绿色品质装备。",
                        "【步步为营】为一次性道具，且无法于【南诏王的召唤】中使用。",
                        "",
                        "【洱海飞爪】",
                        "【洱海绝境】地势复杂，既有崇山峻岭悬崖陡立，也有深潭幽幽岩谷赤红。【洱海飞爪】可充能3层使用，助你千里追击,飞掠迎敌!",
                    ]
                }

            ]
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
    },
    watch: {},
    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.video = this.data.index_video[0]["link"];
                this.pve = this.data.index_pve;
                this.pvebanner = this.data.index_pve_banner;
                this.more = this.data.index_more || [];

                this.tabImg = this.pvebanner[0].img;
                this.tabImgLink = this.pvebanner[0].link;
            });
        },
        slide(v) {
            // console.log(v)
            this.pve_present = v.currentPage
        },
        toastMsg() {
            alert('敬请期待')
        },
        showMountIcon,
        goAnchor(index) {
            // 用 class="m-jump" 添加锚点
            let jump = document.querySelectorAll('.m-jump');
            let total = jump[index].offsetTop
            console.log(total)
            if (index == 0) {
                total = 0
            }
            let distance = document.documentElement.scrollTop || document.body.scrollTop
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 50
            if (total > distance) {
                smoothDown()
            } else {
                let newTotal = distance - total
                step = newTotal / 50
                smoothUp()
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step
                    document.body.scrollTop = distance
                    document.documentElement.scrollTop = distance
                    setTimeout(smoothDown, 10)
                } else {
                    document.body.scrollTop = total
                    document.documentElement.scrollTop = total
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step
                    document.body.scrollTop = distance
                    document.documentElement.scrollTop = distance
                    setTimeout(smoothUp, 10)
                } else {
                    document.body.scrollTop = total
                    document.documentElement.scrollTop = total
                }
            }

        },
        //吃鸡页面切换
        changeCJ(val) {
            this.jjsc_present = val;
        },
    },
    filters: {},
    created: function () { },
    mounted: function () {
        // this.init();
        window.addEventListener("mousemove", this.hanldMask);
        window.addEventListener('scroll', this.setNav);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/qunxiawanbian/index.less";
</style>
