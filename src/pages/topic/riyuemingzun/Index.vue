<template>
    <div class="m-index">
        <!--KV头部背景-->
        <div class="m-top m-jump"></div>
        <!--P1全新内容导航-->
        <div class="m-one " ref="m-one">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-nav">
                <div class="u-nav p-animation" v-animate="'fadeInDown'" v-for="(item, key) in p1nav" :key="key">
                    <img :src="imgurl + 'p1/' + item.imgurl" v-animate="'p-animation fadeInDown'"
                        @click="goAnchor(item.index)">
                </div>
            </div>
        </div>
        <!--P2技改-->
        <div class="m-two" ref="m-two">
            <div class="m-skill p-animation" v-animate="'fadeInDown'">
                <a href="https://origin.jx3box.com/bps/56494" class="u-button" target="_blank">
                    <span class="u-text">立即查看</span>
                </a>
            </div>
        </div>
        <!--p3明教及大战本-->
        <div class="m-three m-jump" ref="m-three">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-mj p-animation " v-animate="'fadeInDown'">
                <div class="m-content">
                    <div class="u-text">{{ mj.desc }}</div>
                    <div class="m-mountGroup">
                        <div class="m-xf" v-for="(item, key) in mj.xf" :key="key">
                            <img class="u-pic" :src="showMountIcon(item.id)" :alt="item.name" />
                            <span class="u-name">{{ item.name }}</span>
                            <div class="m-buttonGroup">
                                <a :href="item.macroUrl" class="u-button" target="_blank">{{ item.desc }}宏库</a>
                                <a :href="item.bpsUrl" class="u-button" target="_blank">{{ item.desc }}攻略</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-four m-jump" ref="m-four">
            <div class="m-fb p-animation " v-animate="'fadeInDown'">
                <div class="m-content">
                    <div class="u-text">{{ fb.gmdmd.desc }}</div>
                    <div class="m-buttonGroup">
                        <a :href="fb.gmdmd.fbUrl" class="u-button" target="_blank">副本攻略</a>
                        <a :href="fb.gmdmd.achieveUrl" class="u-button" target="_blank">副本成就</a>
                    </div>
                </div>
            </div>
        </div>
        <!--p5苍山洱海抓马-->
        <div class="m-five m-jump" ref="m-five">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-content p-animation" v-animate="'fadeInDown'">
                <!--切换按钮-->
                <div class="m-tabGroup">
                    <div class="u-tab u-tab-sys" :class="p5Tab == 1 ? 'u-tab-act' : ''" @click="p5Tab = 1"></div>
                    <div class="u-tab u-tab-map" :class="p5Tab == 2 ? 'u-tab-act' : ''" @click="p5Tab = 2"></div>
                    <div class="u-tab u-tab-sw" :class="p5Tab == 3 ? 'u-tab-act' : ''" @click="p5Tab = 3"></div>
                </div>
                <!-- 系统 -->
                <div class="m-detail p-animation" v-show="p5Tab == 1" v-animate="'fadeInDown'">
                    <div class="u-subTitle u-sysTitle"></div>
                    <div class="m-xy"></div>
                </div>
                <!-- 地图 -->
                <div class="m-detail p-animation" v-show="p5Tab == 2" v-animate="'fadeInDown'">
                    <div class="u-subTitle u-mapTitle"></div>
                    <div class="u-text" v-for="(line, key) in csrh" :key="key">{{ line }}</div>
                    <div class="u-pic"></div>
                </div>
                <!-- 声望 -->
                <div class="m-detail p-animation" v-show="p5Tab == 3" v-animate="'fadeInDown'">
                    <div class="u-subTitle u-swTitle"></div>
                    <div class="m-sw"></div>
                    <a href="https://origin.jx3box.com/cj/" class="u-button">
                        <img :src="imgurl + 'p4/p4-right.png'" class="u-arrow">
                    </a>
                </div>
            </div>
        </div>
        <!--p6烛龙殿-->
        <div class="m-six-gap"></div>
        <div class="m-six m-jump" ref="m-six">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-boss p-animation" v-animate="'fadeInDown'">
                <div class="u-profile u-profile-moon" @click="zldBoss = 'index'"></div>
                <div class="u-profile u-profile-sun" v-for="(boss, key) in fb.zld.boss" :key="key"
                    @click="zldBoss = boss.name">
                    <img v-if="boss.icon" class="u-icon" :src="imgurl + 'p5/p5-icon-' + boss.icon + '.png'">
                </div>
            </div>
            <div class="m-fb p-animation u-bg-all" v-animate="'fadeInDown'" v-show="zldBoss == 'index'">
                <div class="u-name"></div>
                <div class="u-text">{{ fb.zld.desc1 }}</div>
                <div class="u-text">{{ fb.zld.desc2 }}</div>
                <div class="m-buttonGroup">
                    <a :href="fb.zld.storyUrl" class="u-button" target="_blank">秘境传说</a>
                    <a :href="fb.zld.bossUrl" class="u-button" target="_blank">首领数据</a>
                </div>
            </div>
            <div :class="'u-bg-' + boss.icon" class="m-fb p-animation" v-animate="'fadeInDown'"
                v-for="(boss, key) in fb.zld.boss" :key="key" v-show="zldShow(boss.name)">
                <div class="u-name"></div>
                <div class="u-text">{{ boss.desc }}</div>
                <div class="m-buttonGroup">
                    <a :href="fb.zld.storyUrl" class="u-button" target="_blank">秘境传说</a>
                    <a :href="fb.zld.bossUrl" class="u-button" target="_blank">首领数据</a>
                </div>
            </div>
        </div>
        <!--p7南诏皇宫-->
        <div class="m-seven m-jump" ref="m-seven">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-content p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--p8竞技-->
        <div class="m-eight m-jump" ref="m-eight">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-content p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--p9红尘-->
        <div class="m-nine m-jump" ref="m-nine">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="m-content p-animation" v-animate="'fadeInDown'"></div>
        </div>
        <!--二维码-->
        <!-- <div class="m-qrcode p-animation">
            <img src="https://img.jx3box.com/topic/jianhushengong/qrcode.png" class="u-code" v-animate="'fadeInDown'">
        </div> -->
    </div>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider'// 引入slider组件
import { showMountIcon } from "@jx3box/jx3box-common/js/utils";//引入心法图标
const KEY = "riyuemingzun";
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
            imgurl: "https://cdn.jx3box.com/design/topic/riyuemingzun/",
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
            p1nav: [
                { imgurl: "p1-nav1.png", name: "", index: 1 },
                { imgurl: "p1-nav3.png", name: "", index: 2 },
                { imgurl: "p1-nav2.png", name: "", index: 3 },
                { imgurl: "p1-nav4.png", name: "", index: 4 },
                { imgurl: "p1-nav5.png", name: "", index: 5 },
                { imgurl: "p1-nav6.png", name: "", index: 6 },
                { imgurl: "p1-nav7.png", name: "", index: 6 },
                { imgurl: "p1-nav8.png", name: "", index: 7 }
            ],
            mj: {
                desc: "明教武学由教主陆危楼所创，出招之时如有日月之威，往往能从敌人意想不到的地方发动摧枯拉朽般之攻击，防不胜防。坚定的信仰则可令信徒受到明尊护佑，身化琉璃妙相，常常令敌人难以捉摸，攻击落空。即便遭受攻击，也能从敌人身上获取新生的活力。",
                xf: [
                    {
                        name: "焚影圣诀",
                        desc: "焚影",
                        id: 10242,
                        bpsUrl: "https://origin.jx3box.com/bps/?subtype=%E7%84%9A%E5%BD%B1%E5%9C%A3%E8%AF%80",
                        macroUrl: "https://origin.jx3box.com/macro/?subtype=%E7%84%9A%E5%BD%B1%E5%9C%A3%E8%AF%80"
                    },
                    {
                        name: "明尊琉璃体",
                        desc: "明尊",
                        id: 10243,
                        bpsUrl: "https://origin.jx3box.com/bps/?subtype=%E6%98%8E%E5%B0%8A%E7%90%89%E7%92%83%E4%BD%93",
                        macroUrl: "https://origin.jx3box.com/macro/?subtype=%E6%98%8E%E5%B0%8A%E7%90%89%E7%92%83%E4%BD%93"
                    }
                ],
            },
            fb: {
                gmdmd: {
                    name: "光明顶密道",
                    desc: "\"大光明寺事件\"已逾数载，明教与中原各大门派关系稍见缓和，为促进明教与各大门派之间的交流，维护目前相对良好的关系，也为日后明教重回中原做些准备，明教教主陆危楼决定派遣一些有资质的弟子下山前往中原。中原之行实属不易，需才能出众之人方可胜任，于是陆危楼下令，只有通过乾坤大挪移五行阵法考验的弟子，才有资格下山。此乾坤大挪移五行阵法，即光明顶秘道，由明教五行旗各大掌旗使镇守，分别为琉金旗，星木旗，洪水旗，妙火旗以及方土旗，此间机关重重，变化莫测，欲通过此考验，还得颇花心思才行！",
                    fbUrl: "https://origin.jx3box.com/fb/?fb_name=%E5%85%89%E6%98%8E%E9%A1%B6%E7%A7%98%E9%81%93",
                    achieveUrl: "https://origin.jx3box.com/fb/cj?fb_name=%E5%85%89%E6%98%8E%E9%A1%B6%E7%A7%98%E9%81%93"
                },
                zld: {
                    name: "烛龙殿",
                    desc1: "在毒虫密布的南疆黑龙沼之中，隐藏着一座巨大雄伟的宫殿一一烛龙殿。这里是散落各地的天一教教徒心中的无上圣所，这里是他们信仰的最终寄托，这里是教众们前仆后继投入黑暗行动中的唯一一点烛光",
                    desc2: "为了天一教“万世长存”的痴梦，教主乌蒙贵依托着烛龙殿，四处收集高手壮士的遗体，大量制造凶悍的非人傀儡迅速壮大了天一教，并试图称霸中原武林。还请侠士待新赛季[日月明尊]开启后，与豪侠们组团攻打[烛龙殿]，摧毁其阴谋，并解救中原各派掌门!",
                    storyUrl: "https://origin.jx3box.com/fb/story?fb_name=%E7%83%9B%E9%BE%99%E6%AE%BF",
                    bossUrl: "https://origin.jx3box.com/fb/npc?fb_name=%E7%83%9B%E9%BE%99%E6%AE%BF",
                    boss: [
                        {
                            name: '胡靼',
                            icon: 'hd',
                            desc: '白眉鼠王胡鞑自创配合白眉老鼠打洞遁形的偏门武学，纵横披靡；青翼蝠王武逸青则创出独门蝙蝠武学，屡立奇功。他们听命血眼龙王萧沙，两人联手形成了烛龙殿的第一道防线。'
                        },
                        {
                            name: '索迪尔',
                            icon: 'sde',
                            desc: '乌蒙贵不惜用五毒秘制灵药和奇功为索笛尔炼体，令他迅速成长为一个擅长各家武学的高手，更被天一教立为“圣童”。烛龙殿中索迪尔负责看守七秀坊主叶芷青，却在无意间对她产生了不可抑止的爱慕。'
                        },
                        {
                            name: '醉蛛老人',
                            icon: 'zzlr',
                            desc: '醉蛛老人是天一教中辈分最高的人，手段残忍，服侍之人若稍令其不满，便会被他用特制药酒灌醉后喂食蜘蛛。此次因纯阳掌门李忘生内力深厚，轻功超群，乌蒙贵便将他交给醉蛛老人看守。'
                        },
                        {
                            name: '南之雷神',
                            icon: 'nzls',
                            desc: '南之雷神乃司徒一一呕心沥血地打造出的巨型机甲。为了让这个具有强大火力的机甲正名，司徒一一提出指定这个机甲负责关押万花谷主，以此证明他是拥有超越了万花技艺的机关大宗师。'
                        },
                        {
                            name: '千秋子',
                            icon: 'qqz',
                            desc: '星宿老仙千秋子在烛龙殿尝试将山河社稷图制成沙盘，以供攻唐之用，后来获悉万花谷主东方宇轩被带到此处，不忘旧日恩怨的他主动向乌蒙贵要求看守东方宇轩，还引来万古寒泉对其高深功力进行抑制。'
                        },
                        {
                            name: '陆寻',
                            icon: 'lx',
                            desc: '陆寻本为大唐宫廷内卫，因得罪皇族而被刺文双颊，充入边军。南诏王对陆寻进行招揽，赐予南诏龙威大军将之职。陆寻听闻少林方丈玄正被南诏王拿下，主动请命担负看守，其本意却是折辱大唐皇室。'
                        },
                        {
                            name: '乌蒙贵',
                            icon: 'wmg',
                            desc: '乌蒙贵以烛龙殿为依仗，并在各地开始收集高手壮士的尸身，大量制造着战斗傀儡，迅速壮大了天一教，激烈对抗取得中原武林支持的五仙教。他心中渴望着击败曲云，夺回魂牵梦绕的五仙教圣地！'
                        },
                    ]
                }
            },
            p5Tab: 2,
            csrh: {
                //苍山洱海地图描述
                text1: "风花雪月古城开，洱海苍山次第排。",
                text2: "水光万顷开天镜，山色四时环翠屏。",
                text3: "新增苍山洱海地图场景和剧情任务，全新内容静待各位侠士探索!"
            },
            zldBoss: 'index',
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
        zldShow: function (name) {
            if (this.zldBoss == name) {
                return true;
            } else {
                return false;
            }
        }
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
@import "~@/assets/css/topic/riyuemingzun/index.less";
</style>
