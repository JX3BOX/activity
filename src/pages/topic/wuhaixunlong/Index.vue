<template>
    <div class="m-index">
        <!-- 首屏 -->
        <div class="m-top">
            <video class="u-video" autoplay muted loop>
                <source :src="`${imgPath}/top/top-kv.mp4`" type="video/mp4" />
            </video>
            <div class="m-top__ent p-animation fadeInDown">
                <img class="u-text" :src="`${imgPath}/top/text.png`" />
                <img class="u-person" :src="`${imgPath}/top/human.png`" />
                <img class="u-video__play" @click="kvVideoVisible = true" :src="`${imgPath}/top/play.svg`" />
                <img class="u-cloud" :src="`${imgPath}/top/cloud.png`" />
                <img class="u-bg" :src="`${imgPath}/top/bg.png`" />
            </div>
        </div>
        <div class="m-main">
            <img class="u-main__title p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/top/title.png`" />
            <div class="m-one p-animation" v-animate="'fadeInUp'">
                <img class="u-title" :src="`${imgPath}/p1/title.png`" />
                <img class="u-text" :src="`${imgPath}/p1/text.png`" />
                <div class="m-video">
                    <img class="u-video" :src="`${imgPath}/p1/video_border.png`" />
                    <iframe
                        class="u-iframe"
                        src="//player.bilibili.com/player.html?aid=1902832755&bvid=BV1Km41167jZ&cid=1501355857&p=1"
                        scrolling="no"
                        border="0"
                        frameborder="no"
                        framespacing="0"
                        allowfullscreen="true"
                    >
                    </iframe>
                </div>
            </div>
            <div class="m-two">
                <img class="u-title p-animation" v-animate="'fadeInUp'" :src="`${imgPath}/p2/title.png`" />
                <div class="m-level p-animation" v-animate="'fadeInUp'">
                    <img
                        class="u-level"
                        v-for="(item, index) in instancingArr"
                        :src="`${imgPath}/p2/fb/${index}.jpg`"
                        :key="index"
                        @click="
                            instancingCurrent = index;
                            secretVisible = true;
                        "
                    />
                </div>

                <a href="/rank/race/#/8" class="u-kv p-animation" v-animate="'fadeInUp'" target="_blank">
                    <img :src="`${imgPath}/p2/kv.png`" alt="" />
                </a>
            </div>
            <div class="m-three p-animation" v-animate="'fadeInUp'">
                <img class="u-title" :src="`${imgPath}/p3/title.png`" />
                <div class="m-tool">
                    <a
                        class="m-tool__item"
                        v-for="(item, index) in boxTool"
                        :key="index"
                        :href="item.href"
                        target="_blank"
                    >
                        <img class="u-icon" :src="item.img" />
                        <p class="u-label">{{ item.text }}</p>
                    </a>
                </div>
            </div>
            <div class="m-four p-animation" v-animate="'fadeInUp'">
                <img class="u-title" :src="`${imgPath}/p4/title.png`" />
                <a
                    href="https://jx3.xoyo.com/ultimate/appointment/index.html?utm_source=gw#/"
                    target="_blank"
                    class="u-kv"
                >
                    <img :src="`${imgPath}/p4/wj_kv.jpg`" />
                </a>
            </div>
        </div>

        <el-dialog :visible.sync="kvVideoVisible" custom-class="m-diaLog-kv">
            <iframe
                v-if="kvVideoVisible"
                src="//player.bilibili.com/player.html?aid=1603696569&bvid=BV14m421s7m5&cid=1519689219&p=1"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
                class="u-diaLog__video"
            >
            </iframe>
        </el-dialog>
        <el-dialog :visible.sync="secretVisible" :show-close="false" custom-class="m-secret-mask">
            <div class="m-secret-mask__left">
                <img class="u-bg" :src="`${imgPath}/p2/mask/${instancingCurrent}.jpg`" />
                <div class="m-secret-main">
                    <p class="u-sub__title" v-if="instancingArr[instancingCurrent].subTitle">
                        {{ instancingArr[instancingCurrent].subTitle }}
                    </p>
                    <p class="u-title">{{ instancingArr[instancingCurrent].title }}</p>
                    <div class="m-content__list">
                        <p
                            class="u-content__item"
                            v-for="(item, index) in instancingArr[instancingCurrent].content"
                            :key="index"
                        >
                            {{ item }}
                        </p>
                    </div>
                </div>
            </div>
            <img class="u-close" @click="secretVisible = false" :src="`${imgPath}/p2/mask/close.svg`" />
        </el-dialog>
    </div>
</template>

<script>
const KEY = "wuhaixunlong";
import { __imgPath, __cdn } from "@/utils/config";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgPath: __cdn + "design/topic/" + KEY,
            kvVideoVisible: false,
            boxTool: [
                {
                    img: __imgPath + "image/box/macro.svg",
                    text: "门派宏库",
                    href: "/macro",
                },
                {
                    img: __imgPath + "image/box/bps.svg",
                    text: "职业攻略",
                    href: "/bps",
                },
                {
                    img: __imgPath + "image/box/fb.svg",
                    text: "副本攻略",
                    href: "/fb",
                },
                {
                    img: __imgPath + "image/box/team.svg",
                    text: "团队平台",
                    href: "/team",
                },
            ],
            instancingArr: [
                {
                    title: "冷龙峰",
                    subTitle: "",
                    content: [
                        "河西走廊南向的重岭之中，迷瘴环抱之处，有一座高耸入云的山峰，似有狂龙盘踞其上，名为冷龙峰。山下有林，笼罩于终年不散的迷雾之中，名为哈瓦伊之森。",
                        "在当地传说之中，哈瓦伊之森是世间万种森林的始源，其中的活树将吞噬所有误入的旅人，唯有居于林中的神鸟可以进入。",
                        "传说固然有所夸张，此处却着实只有鸟雀才能穿越。此地便成为伊玛目关押卢延鹤的绝佳之地，他将这天然险峻的地势用祆教特殊阵法加以改造，更使得这监牢连蛇虫都难以进入。",
                        "上元二年，在获悉卢延鹤下落之后，柳风骨与剑圣相约共同前往冷龙峰解救。然而与此同时，本该绝密的消息却在江湖中不胫而走，吐蕃、回纥、清燕楼等多方逐渐介入其中。至此，各方势力云集此处，诸多高手各怀心思，这重重迷雾笼罩之下的寂静山峰，一时风起云涌。",
                    ],
                },
                {
                    title: "葛木寒",
                    subTitle: "海上魂",
                    content: [
                        "葛木寒曾以“海上魂”之称扬名，擅使弯刀，率领一支胡商船队往来四海。多年前，葛木寒于楚州附近救了一位似乎被仇家追杀的落魄少女。然而自这名少女登船起，船员们逐渐发现船上似乎弥漫着一丝异香，许多人行止异常，更是时常有人莫名失踪或是死去。然而很快，这些察觉异常的船员亦沉沦美梦，一醉不醒。",
                        "很快，整艘商船皆落入馥郁芬芳的陷阱，船长葛木寒更是深陷其中——早在最初便为迷香所惑，却不再醒来。后来，少女将他唤醒，并告诉他，自己名叫雨轻红，葛木寒竟从此听命于她。",
                        "此后多年，葛木寒甘受雨轻红操控，哪怕他几乎已经忘记自己是谁。 至于来冷龙峰究竞为何，葛术寒并不在意，听命于雨轻红不过是为了长久的安宁。",
                        "他害怕自己不再受到雨轻红重视，以致操控的香料失效，每当那短暂的清明降临，葛木寒都只会急于求索新的香料——因为那香中有他称霸海上的身姿、肝胆相照的故友，甚至是死于仇家手中的妻儿⋯⋯明知道这不过是香料所制的幻觉，他也情愿沉沦其中。",
                    ],
                },
                {
                    title: "雨轻红",
                    subTitle: "荆香侍",
                    content: [
                        "雨轻红出身低微，五岁时被母亲卖给楚州胡商乾捺多为奴。乾捺多手下有一擅长调制香料的西域人，名为德罕。",
                        "沦为试香人后，雨轻红饱受折磨，时而皮肤溃烂，肝肠寸断。然而无论经历怎样的摧残，雨轻红始终不曾死去，甚至随着试香日久，她的鲜血开始散发奇特的香气，以此调香，可以操控他人意志。 由此，雨轻红成为了德罕最珍贵的作品。",
                        "他开始教授雨轻红各种调制香料的知识与家传的训蝶手法《炼红脂》，将雨轻红血液制成的香料命名为“轻魂香”，使得第一次受到重视的雨轻红深深迷恋上了德罕。当乾捺多得知雨轻红血液的效用，从她身上无节制地取血，雨轻红意识到自己留在此处必定会很快死去，而掌握了德罕几乎全部学识的她早已不会被这小小的胡商府邸所困。",
                        "雨轻红不愿离开德罕，于是当她逃离乾捺多府中时，身无长物，只怀抱一颗洁净的颅骨。其后不久，雨轻红被韦柔丝招揽，如今，她已贵为戮夜游六异侍中的“荆香侍”，那些狼狈的年少时光，如同香膏清苦的前调，早已随风而去。",
                    ],
                },
                {
                    title: "喜雅",
                    subTitle: "七宝·天珠",
                    content: [
                        "喜雅年仅十三岁，所在家族曾是旧象雄贵族，而后依附吐蕃，成为诺布众的重要力量。自出生以来，喜雅始终过着优渥的生活。",
                        "也许是因为家中闲适的氛围，也许是天性所致，当同龄的总角小童已经开始有自己的烦忧时，喜雅的心性依旧格外单纯，除了对宝石之类闪闪发光之物喜爱不已，这世间几乎没有什么外物能打扰到她。",
                        "因此，喜雅修习诺布众代代相传的心法《诺布心决》时如有神助，远比常人更快地将心法武功融会贯通，小小年纪便具有了极强的实力，早早超越了她一众师兄师姐，成为诺布众“七宝”高手中最年轻的一位。天赋异禀又单纯可爱的喜雅在诺布众中深受宠爱，更加养成了娇憨的性格。",
                        "上元二年，吐蕃赞普忽得卢延鹤的讯息，便让诺布众派人前往大唐探查。其中领队格雅是喜雅的师姐，为确保行动无虞，格雅以宝石引诱，轻易便将喜雅带往冷龙峰，为诺布众增添战力。",
                    ],
                },
                {
                    title: "鹰眼客",
                    subTitle: "魔罗四相",
                    content: [
                        "鹰眼客与骨面天君曾被评为江湖上行踪最飘忽的人。二人在南疆出道，并在杀人之后易装为该门派之形象，四处作恶，各大门派对其无不望除之而后快。",
                        "不过，奇怪的是，每次出手，鹰眼客大都作壁上观，世人所见多是骨面天君独战，或有传言鹰眼客并不长于武功。",
                        "一日，有消息称骨面天君将独自一人于长安城附近出没，各派认为这是 擒杀此恶的绝佳时机，遂会同商会高手及“长风万里”卫栖梧，设计联合将之围杀。",
                        "是日，骨面天君果然出现，在长安醉蝶林为卫栖梧与商会众多高手围杀，几乎力竭之时，鹰眼客骤然杀到救走了骨面天君。其独门武功“七曜融金功”、“日落长空式”，比骨面天君的绝技“乾坤大手印”与“烟罗清风掌”更胜一筹，由此震慑了全场武人。 及至成为史朝义手下“魔罗四相”之一，鹰眼客依然甚少出手，却是四人中公认武功最为高强之人。",
                        "对于那些“幸运”见到鹰眼客出手的人而言，那双重重彩墨下鹰隼般的眼眸，已等同于绝望本身。",
                    ],
                },
                {
                    title: "赤幽明·赤厄明",
                    subTitle: "赤明二生",
                    content: [
                        "赤明二生本是孪生兄弟，出生时因二人身体相连而被父母遗弃。",
                        "婴孩挣扎濒死之际，一位擅长医术的祆教狂热教徒洛诺发现了他们，并将之视为神迹：教义之中，圣灵斯彭塔与恶神安哥拉亦为双生。成年后，在洛诺的帮助下，双生子终于得赐新生，分割了身体。二人原本修炼的功法一阴一阳，在同为一体时可相辅相成，但分割后却遭到反噬煎熬，而在洛诺的引导下，代表善的兄长赤幽明接受功法滋养，将始终保持年轻人的样貌，而由代表恶的弟弟赤厄明承受功法反噬，比真实外貌衰老二十岁有余。",
                        "此事于祆教内部掀起波澜，许多人认为赤幽明正是受圣灵庇护才得以存活，而赤厄明承担了恶神的诅咒，二人形貌，正是善战胜了恶的表现。 这使得赤幽明的地位在教中骤然提升，然而对兄弟二人而言，善恶并不如洛诺所坚信的那样分明。",
                        "对赤厄明而言，自己甘愿做赤幽明的影子，赤幽明却不愿将弟弟随意牺牲。兄弟两人只想长居于远离人烟之地。所以，伊玛目交予他们的任务反而正合他们之意。 冷龙峰上苦寒孤寂，寻常人难以忍受，自双生子到来之前，看门人已经更迭数代，他们到来之后，看守者自此稳定下来。",
                    ],
                },
            ],
            instancingCurrent: 0,
            secretVisible: false,
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
    computed: {},
    watch: {},
    methods: {
        init: function () {},
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.init();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/wuhaixunlong/index.less";
</style>
