<template>
    <div class="m-index" :class="{'is-mobile': isMobile}">
        <div class="m-nav p-animation" v-animate="'fadeIn'" :style="navStyle" @mouseleave="mouseout" v-if="!isMobile">
            <img :src="item.bg" class="u-img"
                 :class="['u-nav-active' + index, index == mouseoverActive ? 'u-img-contrast' : '', index != navActive ? 'u-not-active' : '']" v-for="(item, index) in navs"
                 :key="'navimg' + index" @click="goAnchor(index)" @mouseover="mouseover(index)">
            <a>
                <div @click="goAnchor(0)" class="u-nav"></div>
            </a>
        </div>
        <!--首屏-->
        <div class="m-top m-jump">
            <video class="u-video-background" autoplay muted loop>
                <source :src="top.video" type="video/mp4">
            </video>
            <img class="u-title" :src="top.title"/>
            <div class="u-transition">
                <div class="m-down" v-if="isMobile">
                    <img class="u-down-icon" :src="topDownIcon" />
                    <span class="u-down-text">向下滑动查看内容</span>
                </div>
            </div>
            <a href="" class="u-button" @click.prevent="playVideo('top')"></a>
            <img class="u-title-bottom" :src="top.titleBottom"/>
            <a href="https://www.jx3box.com/index/">
                <img class="u-box-logo" :src="top.logo"/>
            </a>
        </div>
        <!--1全新门派-->
        <div class="m-one m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" v-animate="'fadeInUpBig'">
                <div class="m-content-box">
                    <div class="u-sect-logo"></div>
                    <div class="u-sect-desc" v-html="sectDesc"></div>
                </div>
                <a href="" class="u-video-button" @click.prevent="playVideo('top')"></a>
                <a :href="sectUrl.bps" target="_blank" class="u-button u-introduction">门派攻略</a>
                <a :href="sectUrl.marco" target="_blank" class="u-button u-macro">门派宏库</a>
            </div>
            <div class="m-content m-content-mobile p-animation" v-animate="'fadeInUpBig'" v-if="isMobile">
                <a href="" class="u-video-button" @click.prevent="playVideo('top')"></a>
                <a :href="sectUrl.bps" target="_blank" class="u-button u-introduction">门派攻略</a>
                <a :href="sectUrl.marco" target="_blank" class="u-button u-macro">门派宏库</a>
            </div>
        </div>
        <!--2副本-->
        <div class="m-two m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" id="two-content" v-animate="'fadeInUpBig'">
                <transition v-for="(item, index) in ['qldt','jld']"
                            :key="'fb'+index" name="fade-jq">
                    <div class="m-content-box"
                         v-show="currentFb === item || isMobile">
                            <img class="u-bg-img" :src="fb[item].bg" alt="">
                            <div v-show="currentFb === item" class="u-title-fb p-animation">{{fb[item].title}}</div>
                            <div class="u-desc">{{fb[item].desc}}</div>
                            <a :href="fb[item].introductionUrl"  target="_blank">
                                <img
                                   class="u-button-introduction "
                                   :src="fb[item].button"
                                    />
                            </a>
                            <a href="" class="u-change-fb" v-if="!isMobile"
                               @click.prevent="currentFb === 'qldt' ? currentFb = 'jld' :  currentFb = 'qldt'">
                                切换到{{currentFb === 'qldt' ? '九老洞' : '栖灵洞天·旧事'}}
                            </a>
                    </div>
                </transition>
            </div>
        </div>
        <!--3剧情-->
        <div class="m-three m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" v-animate="'fadeInUpBig'">
                <transition v-for="(item, index) in ['qxzx','wlsh']" :key="'jq'+index" name="fade-jq">
                    <div class="m-content-box"
                         v-show="currentJq === item">
                        <img class="u-bg-img" :src="jq[item].bg" alt="">
                        <div class="m-text-box">
                            <img class="u-logo" :src="jq[item].logo">
                            <div class="u-desc" v-html="jq[item].desc"></div>
                            <a href="" class="u-change u-pre" :class="{disabled: currentJq === 'qxzx'}"
                               @click.prevent="changeJq('qxzx')">
                                <img :src="jq.preBtn" alt="">
                            </a>
                            <a href="" class="u-change u-next" :class="{disabled: currentJq === 'wlsh'}"
                               @click.prevent="changeJq('wlsh')" >
                                <img :src="jq.nextBtn" alt="">
                            </a>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <!--4旗舰画质-->
        <div class="m-four m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" v-animate="'fadeInUpBig'">
                <div class="m-content-box">
                    <a href=""
                       class="u-refresh-button"
                       @click.prevent="currentContrast >= 4 ? currentContrast = 0 : currentContrast++">
                        <i class="el-icon-refresh"></i>
                        <img class="u-img" :src="refreshText" alt="">
                    </a>
                    <div class="m-contrast m-left">
                        <img v-show="currentContrast === index"
                             v-for="(item, index) in contrast"
                             class="u-img p-animation"
                             :src="item"
                             :key="`left${index}`"
                             v-animate="'fadeIn'"
                             alt="" />
                        <img class="u-border" :src="contrastBorder.qjhz" alt="" />
                    </div>
                    <div class="m-contrast m-right">
                        <img v-show="currentContrast === index"
                             v-for="(item, index) in contrast"
                             class="u-img p-animation"
                             :src="item"
                             :key="`right${index}`"
                             v-animate="'fadeIn'"
                             alt="" />
                        <img class="u-border" :src="contrastBorder.czhz" alt="" />
                    </div>
                    <div class="u-desc">
                        {{contentDesc}}
                    </div>
                    <div class="m-content-bottom">
                        <a :href="subscribe.url" target="_blank">
                            <img
                                class="u-button u-subscribe"
                                :src="subscribe.img"
                            />
                        </a>
                        <div class="u-text">{{subscribe.desc}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!--5捏脸-->
        <div class="m-five m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" v-animate="'fadeInUpBig'">
                <div class="m-content-box">
                    <div class="m-box-left">
                        <div class="m-scroll">
                            <div class="m-scroll-box">
                                <img class="u-top" :src="downTitle" />
                                    <div class="m-scroll-down">
                                        <img class="u-down-icon" :src="downIcon" />
                                        <div class="u-down-text">鼠标移动到此处，往下滑动查看内容</div>
                                        <div class="m-down-content">
                                            <template v-for="(item, index) in downContent">
                                                <img v-if="item.img" :src="item.img" alt="" :key="`downImg${index}`"/>
                                                <div v-if="item.text" class="u-down-text" v-html="item.text" :key="`downText${index}`"></div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            <div class="u-down-icon">
                            </div>
                        </div>
                    </div>
                    <div class="m-box-right">
                        <div class="m-face-box" v-for="(item, index) in faceContent.face" :key="index">
                            <div class="m-face-rotate-box">
                            <div class="u-face">
                                <a :href="item.link">
                                    <img :src="item.img" alt="">
                                </a>
                            </div>
                            </div>
                        </div>
                        <a :href="faceContent.url" target="_blank">
                            <img
                                class="u-button u-subscribe"
                                :src="faceContent.img"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!--p6more-->
        <div class="m-more m-jump">
            <div class="u-title p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="u-line p-animation" v-animate="'fadeInUpBig'"></div>
            <div class="m-content p-animation" v-animate="'fadeInUpBig'">
                <div class="m-content-box">
                    <div class="m-item" v-for="(item, index) in more" :key="`more${index}`">
                        <a :href="item.link" >
                            <img :src="item.img" alt="">
                            <div class="m-mask"></div>
                            <div class="u-text">
                               {{ item.title }}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!--cg盒子-->
        <div class="m-cg-box" :class="{show: dialogPlay}">
            <video
                :src= "videoUrl"
                class="u-cg"
                controls
                autoplay
                width="40%"
            ><source type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></video>
            <a href="" class="u-close-button" @click.prevent="closeDialog">
                <i class="el-icon-close"></i>
            </a>
        </div>
    </div>
</template>

<script>
const KEY = "wanlingdangge";
const IMG_PATH = 'https://img.jx3box.com/topic/wanlingdangge/'
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    props: [],
    components: {
    },
    data: function () {
        return {
            isMobile: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
            imgPath: 'https://img.jx3box.com/topic/wanlingdangge/',
            // nav
            navs: [{
                name: '首页',
                bg: IMG_PATH+'nav/top.png'
            },{
                name: '全新门派',
                bg: IMG_PATH+'nav/1.png'
            },{
                name: '全新副本',
                bg: IMG_PATH+'nav/2.png'
            },{
                name: '史诗剧情',
                bg: IMG_PATH+'nav/3.png'
            },{
                name: '期间画质',
                bg: IMG_PATH+'nav/4.png'
            },{
                name: '捏脸升级',
                bg: IMG_PATH+'nav/5.png'
            },{
                name: '更多内容',
                bg: IMG_PATH+'nav/more.png'
            },],
            navStyle: { 'display': 'none' },
            navActive: 1,
            mouseoverActive: null, //导航鼠标经过事件
            // top
            topDownIcon: IMG_PATH + 'top/down-icon.png',
            top: {
                video: IMG_PATH + 'top/wanlingshanzhuang.mp4',
                title: IMG_PATH +  'top/title.png',
                mobileTitle: IMG_PATH +  'top/mobile-title.png',
                titleBottom: IMG_PATH +  'top/title-bottom.png',
                mobileTitleBottom: IMG_PATH +  'top/mobile-title-bottom.png',
                logo: IMG_PATH +  'top/box.png',
            },
            zoom: 1,
            currentFb: 'qldt',
            currentJq: 'qxzx',
            // p1 门派
            sectUrl: {
                marco: '/macro/?subtype=山海心诀',
                bps: '/bps/?subtype=山海心诀'
            },
            sectDesc: `<p>从 地理上来说，万灵山庄隶于岭南道苍梧郡，连绵不绝的岭南山峦如同绿色的屏障，将尘世的喧嚣隔绝在外。这里森林密布，茂盛的古树与清澈的溪流环绕着山庄，阳光透过稠密的树冠洒下斑斓的光影，万灵就在这里栖息。</p>
                        <p>明 风野、缀星泽、建木海……这一个个区域栖息着多种多样的鸟兽。栖灵洞天则是万灵山庄与乘黄共同的圣地，这里承载两族先辈风云激荡的过往，也是人与兽相互依存的象征。而门派主殿“万灵殿”，更像是生灵们的乐园，动物们凭借自身的意愿随意出入，一些动物甚至在主殿内还有担任不同的职责，一切尽待侠士们的探索。</p>`,
            // p2 副本
            fb: {
                qldt: {
                    name: '栖灵洞天·旧事',
                    title: '栖灵洞天·旧事',
                    introductionUrl: '/fb/?fb_name=栖灵洞天',
                    bg: IMG_PATH+'two/qldt.png',
                    button: IMG_PATH+'/two/qldt-button.png',
                    desc: '密林往事，亟待探索，全新五人秘境“栖灵洞天·旧事”已在测试服开放挑战！它位于万灵山庄中的建木海深处，只有隐秘的小路与外界相通，少有人知。栖灵洞天是乘黄一族与颂家共同的圣地，这次颂家归来，引来了三十年前舜英城血案的受害者遗留家属的聚集，而在这一切背后，似乎还隐藏了更多秘密'
                },
                jld: {
                    name: '九老洞',
                    introductionUrl: '/fb/?fb_name=九老洞',
                    bg: IMG_PATH+'two/jld.png',
                    button: IMG_PATH+'two/jld-button.png',
                    desc: '九老洞是华山龙脉所在，洞中生有龙木，异象丛生，且有神兽麒麟守护。吕洞宾探寻华山龙脉时发现了这一处宝地，见龙脉运转的自然之理后得悟天道，离去时以阴阳太极之理布下阵法以守护龙脉。多年来许多人误入洞中，无一人能破解阵法，前往洞底龙脉所在，只见到阵中卦象所推演的幻境。久而久之，此洞被传为仙人聚会之所，故称九老洞。月泉淮为了挑战纯阳至高武学，与神秘方士联手闯入九老洞，华山龙脉危在旦夕，中原武林众多高手驰援华山，携手诛恶。'
                }
            },
            // p3剧情
            jq: {
                qxzx: {
                    title: '群侠诛邪',
                    bg: IMG_PATH+'three/qxzx-bg.jpg',
                    logo: IMG_PATH+'three/qxzx.png',
                    desc: `<p>月泉淮在武狱黑牢中神功大成，击败了洪笑尘，这无疑助长了渤海武人的嚣张气焰，渤海武林与中原武林的终极对决一触即发，各路江湖势力争斗不断。</p>

<p>这期间，竟然流传出来自武狱黑牢石碑上中原各派“武功破绽”的印本，同时渤海武林排行第一的月泉淮也迟迟没有现身……</p>

<p>一场场巅峰比武，胜负结局将会如何？月泉淮与他的月泉宗在这里面扮演了什么样的角色？一切答案都将在新资料中一步步揭晓！</p>`
                },
                wlsh: {
                    title: '武林盛会',
                    bg: IMG_PATH+'three/wlsh-bg.jpg',
                    logo: IMG_PATH+'three/wlsh.png',
                    desc: `<p>镜头跟随剧情逐步深入，我们来到全新地图场景“银霜口”。</p>

<p>银霜口隶属于华山东麓，是东上纯阳宫的必经之路。</p>

<p>上元二年十月，华山就已被厚厚的大雪覆盖，这使得登山之道更加险峻。然而，因为这场中原武林和渤海武林的约战，原本寂静无人的银霜口变得热闹了起来。才到华山东侧的银霜口，双方就已直接互下战书，比武从山脚延续到山巅。终年积雪的银霜口，就这样被一群热血武人打破了宁静。他们将会在这白雪皑皑之中，迎来一轮轮对局胜负。</p>`
                },
                preBtn: IMG_PATH+'three/pre.png',
                nextBtn: IMG_PATH+'three/next.png'
            },
            // p4画质
            refreshText: IMG_PATH + 'four/refresh.png',
            currentContrast: 0,
            contrastBorder: {
                qjhz: IMG_PATH+'four/qjhz.png',
                czhz: IMG_PATH+'four/czhz.png'
            },
            contrast: [
                'https://jx3.xoyo.com/uploadfile/2023/0915/20230915104451617.jpg',
                'https://jx3.xoyo.com/uploadfile/2023/0915/20230915104454916.jpg',
                'https://jx3.xoyo.com/uploadfile/2023/0915/20230915104503408.jpg',
                'https://jx3.xoyo.com/uploadfile/2023/0915/20230915104502807.jpg',
                'https://jx3.xoyo.com/uploadfile/2023/0915/20230915104508889.jpg'
            ],
            contentDesc: '远山飞鹤，落叶金秋，旗舰画质beta即将上线！一方面，充分提升场景代入感，风格化诠释与呈现，更加注重色彩运用，使不同场景光照颜色之间有细微差别，以水墨国风展现东方韵味。另一方面，角色光照系统更新，拉近自动打光，拉远融入环境，明暗写实渲染细节，背景添加景深效果，更多细节清晰可见！此外，人物与服饰的质感同步提升，让金属和布料的材质更细腻真实，打造独一无二的视觉体验。\n',
            subscribe: {
                img: IMG_PATH+'four/button.png',
                url: 'https://jx3.xoyo.com/p/zt/2023/08/28/appointment/#/',
                desc: '*当前资料片仅上线「旗舰画质」，完整旗舰版将于未来正式上线，详情请点击预约按钮查询',
            },
            // p5 捏脸
            downTitle: IMG_PATH + 'five/left-title.png',
            downIcon: IMG_PATH + 'five/down.svg',
            downContent: [
                {
                    img: IMG_PATH+'five/down/pic1.png',
                    text: `
                    <span>【易容】处的【脸型】,更新为【写意脸型】与【写实脸型】。</span>
 <span>【我的外观】处的【脸型】,也划分为【写意脸型】与【写实脸型】。</span>
 <span>【写实脸型】与【写意脸型】代表着不同的审美风格,同时存在,相互独立。</span>
`
                }, {
                    img: IMG_PATH+'five/down/pic2.png',
                    text: `<span>现有的【写意脸型】中采用了部分手绘笔触以及偏卡通的面部结构,在旗舰画质beta下的材质精度和光照表现会得到进一步提升。</span>
                        <span>皮肤&五官细节在旗舰画质beta下对比重制版画质将更为细腻，在不同光源下会有更为明晰的阴影表现，呈现出更具立体感的面容。</span>`
                }, {
                    img: IMG_PATH+'five/down/pic3.png',
                    text: '<span>相比当前的【写意脸型】,【写实脸型】系统的骨骼和细微结构更加接近真人,将有更多参数可供调整，精细入微。\n</span>'
                }, {
                    img: IMG_PATH+'five/down/pic4.png',
                }, {
                    img: IMG_PATH+'five/down/pic5.png',
                }

            ],
            faceContent: {
                url: '/face',
                img: IMG_PATH+'five/button.png',
                face: new Array(10).fill(IMG_PATH+'five/face.png'),
            },
            // p6more
            more: [],
            // cg用
            dialogPlay: false,
            videoUrl: "",
        };
    },
    directives: {
        animate: {
            inserted: function (el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    const w = document.documentElement.clientWidth || document.body.clientWidth;
                    let zoom = 1;
                    if (w >= 3840) {
                        zoom = 1;
                    } else if ( w <= 2560 && w >= 1920) {
                        zoom = 2/3;
                    } else if (w <= 1920) {
                        zoom = 0.5;
                    }
                    if (top * zoom < h) {
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
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    const w = document.documentElement.clientWidth;
                    let zoom = 1;
                    if (w >= 3840) {
                        zoom = 1;
                    } else if ( w <= 2560 && w >= 1920) {
                        zoom = 2/3;
                    } else if (w <= 1920) {
                        zoom = 0.5;
                    }
                    if (top * zoom < h) {
                        if (el.className.indexOf(binding.value) == -1) {
                            // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
                            el.className = binding.value + " " + el.className;
                        }
                        if (binding.addClass) {
                            window.removeEventListener("scroll", binding.addClass);
                        }
                    }
                };
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    watch: {},
    methods: {
        init: function () {
            getTopic(KEY).then((res) => {
                this.more = res.data.data.filter(i => i.subtype === 'more').map(i => {return {img: i.img, link: i.link,title: i.title}});
                const face = res.data.data.filter(i => i.subtype === 'face').map(i =>  {return {img: i.img, link: i.link}});
                this.faceContent.face = Array.from(Array(10), (item, index) => {
                    const i =  index % face.length;
                    return face[i];
                })
            });
        },
        playVideo() {
            this.dialogPlay = true;
            this.videoUrl = 'https://static.jx3.xoyo.com/video/20221027/fl_daozong_cg.mp4';
        },
        closeDialog() {
            this.dialogPlay = false;
            this.videoUrl = ""; //清空数据 关闭视频播放
        },
        mouseover(val) {
            this.mouseoverActive = val
        },
        mouseout() {
            this.mouseoverActive = null
        },
        goAnchor(index) {
            // 用 class="d_jump" 添加锚点
            let jump = document.querySelectorAll('.m-jump');
            let total = jump[index].offsetTop
            let w = document.body.clientWidth || document.documentElement.clientWidth
            let zoom = 1;
            if (w >= 3840) {
                zoom = 1;
            } else if ( w <= 2560 && w >= 1920) {
                zoom = 2/3;
            } else if (w <= 1920) {
                zoom = 0.5;
            }
            total = total * w / 3840 - 64;
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
        setNav() {
            let scrolled = document.body.scrollTop || document.documentElement.scrollTop
            let w = document.body.clientWidth || document.documentElement.clientWidth
            let zoom = 1;
            if (w >= 3840) {
                zoom = 1;
            } else if ( w <= 2560 && w >= 1920) {
                zoom = 2/3;
            } else if (w <= 1920) {
                zoom = 0.5;
            }
            if (scrolled / zoom < 1330) {
                if (!this.navStyle.display) {
                    let navStyle = { '-webkit-animation-name': 'fadeOut', 'animation-name': 'fadeOut' }
                    this.navStyle = navStyle;
                }
                return;
            }
            this.navStyle = {}
            // 锚点高度顺序 1620，4728，8008，10333，12963，15137
            // console.log(this.$refs["m-one"].offsetTop)
            if (scrolled >= 11090 * zoom) {
                this.navActive = 6
            } else if (scrolled >= 9304 * zoom) {
                this.navActive = 5
            } else if (scrolled >= 7518 * zoom) {
                this.navActive = 4
            } else if (scrolled >= 5732 * zoom) {
                this.navActive = 3
            } else if (scrolled >= 3946 * zoom) {
                this.navActive = 2
            } else if (scrolled >= 2160 * zoom) {
                this.navActive = 1
            }
        },
        resize() {
            let w = document.body.clientWidth || document.documentElement.clientWidth
            const el = document.getElementsByClassName('m-index');
            let zoom =  w / 3840
            if (zoom < 0.5) {
                zoom = 0.5
            }
            el[0].style = `zoom: ${zoom}; margin-top:${64/zoom}px`
            const pt = document.getElementsByClassName('p-topic');
            pt[0].style = 'min-width: 1920px'
        },
        changeJq(jq) {
            this.currentJq = jq;
        }
    },
    filters: {},
    created: function () {
        this.init();
    },
    mounted: function () {
        if(!this.isMobile) {
            window.addEventListener('scroll', this.setNav);
            this.resize();
            window.addEventListener('resize', this.resize);
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/wanlingdangge/index.less";
.p-topic-footer {
    position: relative;
    z-index: 9999 !important;
}
.fade-jq-leave-active {
    animation: dissolve 1000ms ease-out forwards;
    //z-index: 3;
    //.u-bg-img{
    //    animation: dissolve 1000ms ease-out forwards;
    //}
    //.m-text-box {
    //    * {
    //        animation: dissolve 1000ms ease-out forwards;
    //    }
    //}
}
.fade-jq-enter-active {
    animation: dissolve 1000ms ease-out forwards reverse;
    //z-index: 2;
    //.u-bg-img{
    //    animation: dissolve 1000ms ease-out forwards reverse;
    //}
    //.m-text-box {
    //    * {
    //        animation: dissolve 1000ms ease-out forwards reverse;
    //    }
    //}
}

@keyframes dissolve {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>

