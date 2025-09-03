<template>
    <div class="m-index">
        <!-- 叶子 -->
        <div class="m-topic-leaf p-animation" ref="mark"></div>
        <!--        导航-->
        <div class="m-nav p-animation" v-animate="'fadeInDown'" :style="navStyle" @mouseleave="mouseout">
            <!--            <img :src="imgurl+'nav/'+item+'.png'" class="u-img" :class="'u-nav-active'+item" v-for="item in 6" :key="'navimg'+item" v-show="item != navActive && (mouseoverActive!=item || mouseoverActive==null)" @click="goAnchor(item)" @mouseover="mouseover(item)" >-->
            <img
                :src="imgurl + 'nav/' + item + '.png'"
                class="u-img"
                :class="['u-nav-active' + item, item == mouseoverActive ? 'u-img-contrast' : '']"
                v-for="item in 6"
                :key="'navimg' + item"
                v-show="item != navActive"
                @click="goAnchor(item)"
                @mouseover="mouseover(item)"
            />
            <a>
                <div @click="goAnchor(0)" class="u-nav"></div>
            </a>
        </div>
        <!-- 第一屏 -->
        <div class="m-top m-jump">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-logo p-animation" v-animate="'flipInX'"></div>
        </div>
        <!--        pve-->
        <!--        历程推进 P1-->
        <div class="m-one m-jump" ref="m-one">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <!--            副本-->
            <div class="m-fb-mobile" v-if="isMobile">
                <slider :sliderinit="sliderinit" @slide="slide">
                    <slideritem v-for="(item, index) in pve" :key="index">
                        <div class="u-box u-img" :class="item.name" v-animate="'p-animation fadeInDown'">
                            <div class="m-text-mobile">
                                <!--                            <img v-animate="'p-animation fadeInDown'" class="u-textImg" :src="imgurl+'/p1/'+item.imgurl" />-->
                                <div class="u-fb-title">{{ item.title }}</div>
                                <div class="u-text p-animation" v-animate="'fadeInDown'">
                                    <span v-html="item.mobileText">{{ item.mobileText }}</span>
                                </div>
                                <!--                            <div class="m-page">-->
                                <!--                                <div class="u-page-box">-->
                                <!--&lt;!&ndash;                                    <img class="u-page-last" :src="imgurl+'/p1/p1-last.png'"/>&ndash;&gt;-->
                                <!--                                    <img class="u-page-active" :class="'pg-'+pve_present" :src="imgurl+'/p1/p1-present.png'" />-->
                                <!--                                    <img class="u-page-ling" :src="imgurl+'/p1/p1-ling.png'" v-for="index in 4" :key="index"/>-->
                                <!--                                </div>-->
                                <!--                                <img class="u-page-next" :src="imgurl+'/p1/p1-btn-bg.png'"/>-->
                                <!--                            </div>-->
                            </div>
                        </div>
                    </slideritem>

                    <!-- slot  -->
                </slider>
            </div>
            <!--            pc-->
            <div class="m-fb" v-for="(item, index) in pve" :key="item.name" v-show="index == pve_present" v-else>
                <div class="u-img-box u-img p-animation" :class="item.name" v-animate="'fadeInDown'">
                    <!--                    <img v-animate="'p-animation fadeInDown'" class="u-textImg" :src="imgurl+'/p1/'+item.bgurl" />-->
                </div>
                <div class="m-text">
                    <img v-animate="'p-animation fadeInDown'" class="u-textImg" :src="imgurl + 'p1/' + item.imgurl" />
                    <div class="u-text p-animation" v-animate="'fadeInDown'">
                        {{ item.text }}
                    </div>
                    <div class="m-page">
                        <div class="u-shield">
                            <div class="u-page-box">
                                <img class="u-page-last" :src="imgurl + 'p1/p1-last.png'" @click="pageChange" />
                                <img
                                    class="u-page-active"
                                    :class="'pg-' + pve_present"
                                    :src="imgurl + 'p1/p1-present.png'"
                                />
                                <img
                                    class="u-page-ling"
                                    :src="imgurl + 'p1/p1-ling.png'"
                                    v-for="index in 4"
                                    :key="index"
                                    @click="pageChange(index)"
                                />
                            </div>
                        </div>
                        <img class="u-page-next" :src="imgurl + 'p1/p1-btn-bg.png'" @click="pageNext" />
                    </div>
                </div>
            </div>
            <!--            技改-->
            <div class="m-skill" v-animate="'p-animation fadeInDown'">
                <a :href="skillUrl" target="_blank" class="u-btn">
                    <img :src="imgurl + 'p1/p1-2-bt.png'" class="u-btn-animation" />
                </a>
            </div>
        </div>
        <!--        p1-p2分割-->
        <div class="m-division p1-p2">
            <img :src="imgurl + 'p1/p1-p2.png'" v-animate="'p-animation fadeInDown'" />
        </div>
        <!--        p2 刀宗介绍-->
        <div class="m-two m-jump" ref="m-two">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <!--            介绍背景盒子-->
            <div class="u-box">
                <div class="u-text">
                    <span>{{ dztext.text1 }}</span>
                    <span>{{ dztext.text2 }}</span>
                </div>
                <div class="u-btn-box">
                    <a :href="item.href" target="_blank" v-for="item in p2btn" :key="item.name">
                        <img :src="imgurl + 'p2/' + item.imgurl" class="u-btn-animation" />
                    </a>
                </div>
            </div>
            <div class="u-people" v-animate="'p-animation fadeInDown'"></div>
        </div>
        <!--        p2-p3分割-->
        <div class="m-division p2-p3">
            <img :src="imgurl + 'p2/p2-p3.png'" v-animate="'p-animation fadeInDown'" />
        </div>
        <!--        p3 pve 副本-->
        <div class="m-three m-jump" ref="m-three">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-tab">
                <div
                    @click="fbshow = false"
                    :class="[fbshow ? '' : 'u-div-xjd', fbBgShow == 1 && fbshow ? 'u-div-xjd' : '']"
                    @mouseover="fbBgShow = 1"
                    @mouseleave="fbBgShow = 0"
                ></div>
                <div
                    @click="fbshow = true"
                    :class="[fbshow ? 'u-div-five' : '', fbBgShow == 2 && !fbshow ? 'u-div-five' : '']"
                    @mouseover="fbBgShow = 2"
                    @mouseleave="fbBgShow = 0"
                ></div>
            </div>
            <!--            西津渡、五人本切换区-->
            <div class="u-box u-box-xjd" v-show="!fbshow">
                <img :src="imgurl + 'p3/xjd2.png'" />
                <a :href="btnurl[0]" target="_blank">
                    <div class="u-btn u-btn-animation"></div>
                </a>
                <div class="u-five-btn">
                    <a :href="btnurl[1]" target="_blank"> <img :src="imgurl + 'p3/p3-fivebtn.png'" /></a>
                </div>
            </div>
            <div class="u-box u-box-five" v-show="fbshow">
                <div class="u-item">
                    <a :href="item.href" target="_blank" v-for="item in fb" :key="item.imgurl">
                        <img :src="imgurl + 'p3/' + item.imgurl" />
                    </a>
                </div>
                <a :href="btnurl[1]" target="_blank">
                    <div class="u-btn u-btn-animation"></div>
                </a>
            </div>
        </div>
        <!--            p3-p4分割-->
        <div class="m-division p3-p4">
            <img :src="imgurl + 'p3/p3-p4.png'" v-animate="'p-animation fadeInDown'" />
        </div>

        <!--        p4 百战-->
        <div class="m-four m-jump" ref="m-four">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-img">
                <img :src="imgurl + 'p4/p4-img.png'" v-animate="'p-animation fadeInDown'" />
            </div>
            <div class="u-text">
                在挑战秘境时，是否也有一些印象深刻的首领，他们或有炫酷的招式，或有特色的机制。当你学习了他们的技能后，会是怎样的体验？<br />
                在全新协作玩法百战异闻录中，侠士将浸入回忆，面对曾经挑战过的强敌，而在对战中，也有机会习得并强化首领的技能，为之后的挑战提供极大助力……
            </div>
            <div class="u-btn u-btn-animation" @click="toastMsg"></div>
        </div>
        <!--            p4-p5分割-->
        <div class="m-division p4-p5">
            <img :src="imgurl + 'p4/p4-p5.png'" v-animate="'p-animation fadeInDown'" />
        </div>
        <!--        p5-->
        <div class="m-five m-jump" ref="m-five">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box">
                <img :src="imgurl + 'p5/p5-1.png'" v-animate="'p-animation fadeInDown'" />
                <img :src="imgurl + 'p5/p5-2.png'" v-animate="'p-animation fadeInDown'" />
            </div>
        </div>
        <!--            p5-p6分割-->
        <div class="m-division p5-p6">
            <img :src="imgurl + 'p5/p5-p6.png'" v-animate="'p-animation fadeInDown'" />
        </div>

        <!--        p6-->
        <div class="m-six m-jump" ref="m-six">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-top">
                <img class="u-img" :src="imgurl + 'p6/p6-top.png'" v-animate="'p-animation fadeInDown'" />
                <div class="u-btn">
                    <a :href="item.href" target="_blank" v-for="item in p6top" :key="item.imgurl">
                        <img :src="imgurl + 'p6/' + item.imgurl" class="u-btn-animation" />
                    </a>
                </div>
            </div>
            <div class="u-content-box">
                <div class="u-content-1">
                    <img :src="imgurl + 'p6/p6-gl.png'" class="u-img" v-animate="'p-animation fadeInDown'" />
                    <div class="u-text" v-animate="'p-animation fadeInDown'">
                        各路玩家苦心钻研编写，融合技能系数、招式流派、属性分析、配装分享等诸多攻略的全职业最权威的白皮书都在这里。
                    </div>
                    <a href="https://www.jx3box.com/bps/#/" target="_blank">
                        <img :src="imgurl + 'p6/p6-btn1.png'" class="u-btn u-btn-animation" />
                    </a>
                </div>
                <div class="u-content-2">
                    <img :src="imgurl + 'p6/p6-sj.png'" class="u-img" v-animate="'p-animation fadeInDown'" />
                    <div class="u-text" v-animate="'p-animation fadeInDown'">
                        技能、BUFF。<br />持续时间、叠加层数。 释放模式、属性类型。
                        全剑三数据收集中心，解决开荒期间一切问题。
                    </div>
                    <a href="https://www.jx3box.com/app/database/" target="_blank">
                        <img :src="imgurl + 'p6/p6-btn2.png'" class="u-btn u-btn-animation" />
                    </a>
                </div>
            </div>

            <div class="u-mobile">
                <img :src="imgurl + 'p6/p6-gl.png'" class="u-img" v-animate="'p-animation fadeInDown'" />
                <div class="u-text" v-animate="'p-animation fadeInDown'">
                    各路玩家苦心钻研编写，融合技能系数、招式流派、属性分析、配装分享等诸多攻略的全职业最权威的白皮书都在这里。
                </div>
                <a href="https://www.jx3box.com/bps/#/" target="_blank">
                    <img :src="imgurl + 'p6/p6-btn1.png'" class="u-btn" v-animate="'p-animation fadeInDown'" />
                </a>
                <img :src="imgurl + 'p6/p6-sj.png'" class="u-img" v-animate="'p-animation fadeInDown'" />
                <div class="u-text" v-animate="'p-animation fadeInDown'">
                    技能、BUFF。<br />持续时间、叠加层数。 释放模式、属性类型。
                    全剑三数据收集中心，解决开荒期间一切问题。
                </div>
                <a href="https://www.jx3box.com/app/database/" target="_blank">
                    <img :src="imgurl + 'p6/p6-btn2.png'" class="u-btn" v-animate="'p-animation fadeInDown'" />
                </a>
            </div>
        </div>

        <div class="m-other m-jump">
            <img
                class="u-unfinished"
                :src="imgurl + 'p6/p6-bottom-text.png'"
                v-animate="'p-animation fadeInDown'"
            /><br />
            <img :src="imgurl + 'p6/p6-.png'" class="u-img" v-animate="'p-animation fadeInDown'" />
            <div class="u-other" v-animate="'p-animation fadeInDown'">
                <img :src="imgurl + 'furniture.png'" class="u-other-img" v-for="i in 1" :key="'o' + i" />
            </div>
            <img class="u-qrcode" :src="imgurl + 'qrcode.png'" v-animate="'p-animation fadeInDown'" />
        </div>
    </div>
</template>

<script>
import { slider, slideritem } from "vue-concise-slider"; // 引入slider组件
const KEY = "hengdaoduanlang";
import { getTopic } from "@/service/topic";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Index",
    props: [],
    components: {
        slider,
        slideritem,
    },
    data: function () {
        return {
            navStyle: { display: "none" },
            navActive: 1,
            mouseoverActive: null, //导航鼠标经过事件
            isMobile: navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ),
            imgurl: __cdn + "design/topic/" + KEY + "/",
            pve: [
                {
                    title: "百溪",
                    name: "baixi",
                    imgurl: "baixi.png",
                    text: "百溪是泉州治下的一个乡邑，地处东南沿海，北面依山，南面临海，本是海商航运的中转良港。百溪此地却因长期被帮派联盟镇海阁把控以致发展滞缓。",
                    bgurl: "baixi-bg.png",
                    mobileText:
                        "百溪是泉州治下的一个乡邑，地处东南沿海，北面依山，南面临海，本是海商航运的中转良港。百溪此地却因长期被帮派联盟镇海阁把控以致发展滞缓。<br />谢采尚在海龙会时，便已与镇海阁交易频繁。藏剑一役后，谢采藏匿在镇海阁养伤至今，期间徐徐展开自己在百溪的布局和谋划……",
                },
                {
                    title: "晟江",
                    name: "shengjiang",
                    imgurl: "shengjiang.png",
                    text: "晟江，东临润州，西连昇州，北去扬州，乃三州交汇之处的一个小城邑，临近交通要道，商贸繁华，鱼米丰富。此地近半商铺归属南北商会所管。",
                    bgurl: "shengjiang-bg.png",
                    mobileText:
                        "晟江，东临润州，西连昇州，北去扬州，乃三州交汇之处的一个小城邑，临近交通要道，商贸繁华，鱼米丰富。此地近半商铺归属南北商会所管。<br />刘展兵乱江南，晟江虽未遭兵祸侵毁，但物价却是连连上涨，几近爆发饥荒。此地的百姓皆以为商会趁乱囤积居奇，商会不得不请来大掌柜周墨出面处理。周墨却在晟江的调查中发现了隐藏在这场战祸背后那只看不见的手……",
                },
                {
                    title: "楚州",
                    name: "chuzhou",
                    imgurl: "chuzhou.png",
                    text: "楚州属淮南道，地处江、淮两界。春秋战国之时，吴王夫差下令于此地开凿邗沟，以便贯通江、淮；后经隋炀帝再度疏浚，河道得以拓宽。因其北通洛阳，南抵扬州，最终成为了唐时重要的漕运枢纽、盐运要冲。",
                    bgurl: "chuzhou-bg.png",
                    mobileText:
                        "楚州属淮南道，地处江、淮两界。春秋战国之时，吴王夫差下令于此地开凿邗沟，以便贯通江、淮；后经隋炀帝再度疏浚，河道得以拓宽。因其北通洛阳，南抵扬州，最终成为了唐时重要的漕运枢纽、盐运要冲。<br />乾元二年，河阳之战前夕，长歌道子杨青月自洛阳意外追查到一批由南北运的私盐。为探明私盐由来，杨青月特率门中弟子赶往楚州调查。谁料私盐一事尚未解决，原淮西节度副使刘展突然反叛作乱，楚州沦陷……",
                },
                {
                    title: "烂柯山",
                    name: "lankeshan",
                    imgurl: "lankeshan.png",
                    text: "晋代虞喜《志林》曰：“信安山有石室。”石室山即烂柯山，西临乌溪，黛峰翠屏，景色幽邃，亦是传说王质观棋起源之处。武林众人忽然自五湖四海而来齐聚烂柯山下，究其原因，还是传闻中的神秘鬼市即将开市。鬼市，无所不卖，只要有足够的钱财，便可在这里买到任何东西。而除却珍玩异宝，鬼市此次还准备了一把不知又将掀起多少波澜的“神剑”……",
                    bgurl: "lankeshan-bg.png",
                    mobileText:
                        "晋代虞喜《志林》曰：“信安山有石室。”石室山即烂柯山，西临乌溪，黛峰翠屏，景色幽邃，亦是传说王质观棋起源之处。<br />武林众人忽然自五湖四海而来齐聚烂柯山下，究其原因，还是传闻中的神秘鬼市即将开市。鬼市，江湖中最为神秘的集市，三年一开，开则无所不卖，只要有足够的钱财，便可在这里买到任何东西。而除却珍玩异宝，鬼市此次还准备了一把不知又将掀起多少波澜的“神剑”……",
                },
            ],
            sliderinit: {
                currentPage: 0, //当前页码
                effect: "nest",
                thresholdDistance: 100, //滑动判定距离
                thresholdTime: 100, //滑动判定时间
                loop: true, //循环滚动
                infinite: 1, //无限滚动前后遍历数
                slidesToScroll: 1, //每次滑动项数
                pagination: false,
            },
            pve_present: 0,
            skillUrl: "https://www.jx3box.com/bps/45238",
            dztext: {
                text1: "刀宗创立于唐开元二十八年，创派者谢云流原为纯阳宫祖师吕洞宾首徒，却因卷入皇权争斗而被迫离开中原逃亡东瀛。寄居异邦期间，谢云流弃剑拾刀，练就一套“一击必杀”的实战刀法，自成一派。藤原家便请其出任武馆大师范。",
                text2: "二十多年后，谢云流重返中原，于第四次名剑大会力压群雄夺得宝剑“残雪”，名震中原武林。但一年后，谢云流却发现，藤原广嗣指使一刀流打着自己的名号在中原为非作歹，谢云流遂与一刀流彻底决裂。而后，谢云流于翁洲一带自立宗门——刀宗。",
            },
            p2btn: [
                {
                    name: "白皮书",
                    imgurl: "p2-btn1.png",
                    href: "https://www.jx3box.com/bps/#/?subtype=%E5%AD%A4%E9%94%8B%E8%AF%80",
                },
                {
                    name: "宏",
                    imgurl: "p2-btn2.png",
                    href: "https://www.jx3box.com/macro/#/?subtype=%E5%AD%A4%E9%94%8B%E8%AF%80",
                },
                {
                    name: "技能系数",
                    imgurl: "p2-btn3.png",
                    href: "https://www.jx3box.com/bps/#/skill?subtype=%E5%AD%A4%E9%94%8B%E8%AF%80",
                },
                { name: "配装大厅", imgurl: "p2-btn4.png", href: "https://www.jx3box.com/pz/public?mount=10698" },
            ],
            btnurl: [
                "https://www.jx3box.com/fb/#/?fb_zlp=%E6%A8%AA%E5%88%80%E6%96%AD%E6%B5%AA&fb_name=%E8%A5%BF%E6%B4%A5%E6%B8%A1",
                "https://www.jx3box.com/fb/#/",
            ],
            fbshow: false, //西津渡、五人本切换
            fbBgShow: 0,
            fb: [
                {
                    imgurl: "wsy.png",
                    href: "https://www.jx3box.com/fb/#/?fb_zlp=%E6%A8%AA%E5%88%80%E6%96%AD%E6%B5%AA&fb_name=%E6%B2%83%E7%9F%B3%E9%99%A2",
                },
                {
                    imgurl: "zhg.png",
                    href: "https://www.jx3box.com/fb/#/?fb_zlp=%E6%A8%AA%E5%88%80%E6%96%AD%E6%B5%AA&fb_name=%E9%95%87%E6%B5%B7%E9%98%81%E5%9C%B0%E4%BA%95",
                },
                {
                    imgurl: "ytg.png",
                    href: "https://www.jx3box.com/fb/#/?fb_zlp=%E6%A8%AA%E5%88%80%E6%96%AD%E6%B5%AA&fb_name=%E5%B9%BD%E8%97%A4%E9%A6%86",
                },
                {
                    imgurl: "jty.png",
                    href: "https://www.jx3box.com/fb/#/?fb_zlp=%E6%A8%AA%E5%88%80%E6%96%AD%E6%B5%AA&fb_name=%E6%B1%9F%E5%A4%A9%E5%A4%9C%E5%AE%B4",
                },
            ],
            p6top: [
                { imgurl: "web.png", href: "https://www.jx3box.com/team/" },
                { imgurl: "wx.png", href: "https://www.jx3box.com/tool/38392" },
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
    },
    watch: {},
    methods: {
        mouseover(val) { 
            // this.navActive=this.navActive+','+val
            this.mouseoverActive = val;
        },
        mouseout() { 
            this.mouseoverActive = null;
        },
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
        changeTab(i) {
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
        goAnchor(index) { 
            // 用 class="d_jump" 添加锚点
            let jump = document.querySelectorAll(".m-jump");
            let total = jump[index].offsetTop;
            if (index == 0) {
                total = 0;
            }
            let distance = document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 50;
            if (total > distance) {
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                smoothUp();
            }
            function smoothDown() {
                if (distance < total) {
                    distance += step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }
            function smoothUp() {
                if (distance > total) {
                    distance -= step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothUp, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }
        },
        pageNext() {
            if (this.pve_present == 3) {
                this.pve_present = 0;
                return;
            }
            this.pve_present++;
        },
        pageChange(val) { 
            if (val && val > 0) {
                this.pve_present = val - 1;
                return;
            }
            if (this.pve_present == 0) {
                this.pve_present = 3;
                return;
            }
            this.pve_present--;
        },
        setNav() {
            let scrolled = document.body.scrollTop || document.documentElement.scrollTop;
            let w = document.body.clientWidth || document.documentElement.clientWidth;
            if (scrolled < 1320) {
                if (!this.navStyle.display) {
                    let navStyle = { "-webkit-animation-name": "fadeOut", "animation-name": "fadeOut" };
                    if (w > 1920) {
                        navStyle.right = (w - 1920) / 2 - 1 + "px";
                    }
                    this.navStyle = navStyle;
                }
                return;
            }
            this.navStyle = {};
            this.$nextTick(() => {
                if (w > 1920) {
                    this.navStyle = { right: (w - 1920) / 2 - 1 + "px" };
                }
            });
            // 锚点高度顺序 1620，4728，8008，10333，12963，15137 
            if (scrolled >= 15037) {
                this.navActive = 6;
            } else if (scrolled >= 12933) {
                this.navActive = 5;
            } else if (scrolled >= 10283) {
                this.navActive = 4;
            } else if (scrolled >= 7958) {
                this.navActive = 3;
            } else if (scrolled >= 4678) {
                this.navActive = 2;
            } else if (scrolled >= 1320) {
                this.navActive = 1;
            }
        },
        slide(v) { 
            this.pve_present = v.currentPage;
        },
        toastMsg() {
            alert("敬请期待");
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        // this.init();
        window.addEventListener("mousemove", this.hanldMask);
        window.addEventListener("scroll", this.setNav);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/hengdaoduanlang/index.less";
</style>
