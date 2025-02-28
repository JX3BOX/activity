<template>
    <div class="container">
        <!-- 主横幅 -->
        <section class="banner">
            <img class="banner__logo" :src="buildImgUrl('bg/banner__title.png')" alt="丝路风语" />
        </section>
        <!-- 剧情推进模块 -->
        <section class="story-progress">
            <!-- 包裹图片和叠加文本 -->
            <div class="story-progress__content">
                <!-- 在图片上叠加的文本 -->
                <div class="story-progress__text">
                    <h2 class="u-title">剧情推进</h2>
                    <p class="u-desc">
                        振武军探得史朝义已派特使潜入回鹘，另一边吐蕃频扰河西，甚至已取得丝绸之路南道的主导权。九天深感西域的动向将直接影响大唐与周边民族的格局，可如今的大唐岌岌可危，西域形势更是扑朔迷离。
                    </p>
                </div>
            </div>
        </section>
        <!--pr1  资料片速览 -->
        <section class="rsc-overview">
            <div class="rsc-overview__content m-section">
                <block-title :order="1"></block-title>

                <ul class="expansion-overview__list">
                    <li class="expansion-overview__item">
                        <img :src="buildImgUrl('001/pr1u1.png')" alt="新地图" class="expansion-overview__image" />
                    </li>
                    <li class="expansion-overview__item">
                        <img :src="buildImgUrl('001/pr1u2.png')" alt="新门派" class="expansion-overview__image" />
                    </li>
                    <li class="expansion-overview__item">
                        <img :src="buildImgUrl('001/pr1u3.png')" alt="新副本" class="expansion-overview__image" />
                    </li>
                    <li class="expansion-overview__item">
                        <img :src="buildImgUrl('001/pr1u4.png')" alt="颜值优化" class="expansion-overview__image" />
                    </li>
                    <li class="expansion-overview__item">
                        <img :src="buildImgUrl('001/pr1u5.png')" alt="引擎升级" class="expansion-overview__image" />
                    </li>
                </ul>
            </div>
        </section>

        <!-- p2 -->
        <section class="new-map">
            <div class="new-map__content m-section">
                <!-- 标题模块 -->
                <block-title :order="2" class="new-map__title"></block-title>

                <!-- 轮播的主图和文本 -->
                <mapshow class="new-map__pics"></mapshow>
            </div>
        </section>

        <!-- p3 -->
        <section class="new-sec">
            <block-title :order="3" class="block-title3"></block-title>
            <div class="new-sec_content m-section">
                <div class="new-sec__text">
                    <h3 class="u-title">段氏</h3>
                    <p class="u-desc">
                        <span>苍山雪覆衡门外 洱月观花倦尘嚣</span>
                        <span>世第含章远逐鹿 周天风劲予逍遥</span>
                    </p>
                    <div class="new-sec__textP">
                        <p class="u-desc1">
                            段氏自春秋时期兴起，跟随历史的步伐南迁，在滇中一带扩张自己的家族势力。为求自保，段氏号召族中弟子习武，在融天岭修建了气势恢宏的大理宫、天龙寺与神剑宫，逐步成为西南豪门。
                        </p>
                        <p class="u-desc2">
                            天宝年间，作为南诏第一武林世家的段氏，被迫卷入南诏王与大唐的纷争中，而南诏皇宫一役却让段氏一族的命运有了新的转机。随着南诏皇宫阁罗凤打压中原武林的计划失败，段氏与南诏皇室间的矛盾显露，但这反而使得段氏家族内部的信念开始统一。
                        </p>
                        <p class="u-desc3">
                            南诏会武后，段氏家主段慎思，以退为进，宣布退任家主之位，并选擢新任家主，试图用此举将段氏彻底从南诏、吐蕃和大唐之间的斗争中摘除。而原本位于融天岭的大理宫，也迁居至洱海，正式更名为大理山庄。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- p4 -->
        <section class="duanshi">
            <block-title :order="4" class="block-title4"></block-title>

            <div class="duanshi__content m-section">
                <!-- 菜单导航栏 -->
                <ul class="duanshi__nav">
                    <li
                        v-for="item in duanshi"
                        :key="item.key"
                        class="u-tab"
                        :class="{ active: activeTab === item.key }"
                        @click="activeTab = item.key"
                    >
                        <img :src="buildTabImgUrl(item.key)" class="u-img" />
                    </li>
                </ul>

                <!-- 内容 -->
                <div class="duanshi__primary">
                    <DS
                        class="u-content"
                        v-for="(item, i) in duanshi"
                        :key="i"
                        :pics="item.pics"
                        :class="{ active: activeTab === item.key }"
                    />
                </div>
            </div>
        </section>

        <!-- p5 -->
        <section class="new-instance">
            <block-title :order="5" class="block-title5"></block-title>
            <div class="new-instance__text">
                <p class="u-desc">一之窟位处广袤无垠的大沙海腹地，正是传闻中会浮现于海市蜃楼幻影里的失落城池。</p>
                <p class="u-desc">元凤四年，傅介子斩楼兰王安归，另立质子为王。</p>
                <p class="u-desc">尉屠耆归国后，将王城南迁至扜泥城，依附王都而兴起的周边城镇逐渐凋敝。</p>
                <p class="u-desc">随着水源枯竭与风沙肆虐，被抛弃的故城最终完全被浩瀚沙海所吞没，成为世人遗忘的尘埃。</p>
                <p class="u-desc">
                    直至求法的僧侣循着蜃景神迹的引领再度踏足，他们以为找寻到了圣迹，于是决定在这片佛光照耀的土地上开窟塑像。
                </p>
                <p class="u-desc">
                    然而，随着前所未有的大沙暴席卷了干涸的河谷，僧人连同尚未完成的佛窟一并被无情地吞噬了。
                </p>
                <br />
                <p class="u-desc">开皇年间，九天筹建四方宝库时，意外寻到此地。</p>
                <p class="u-desc">
                    借助流动变换的沙丘和深邃幽暗的洞窟，九天设计了繁复的机关与迷阵，建立了守护九天秘宝的“一之窟”。
                </p>
                <p class="u-desc">除非有地图与“钥匙”相辅，否则再难踏入这片神秘的藏宝地。</p>
            </div>

            <div class="new-instance__content m-section">
                <!-- 调用 BossShow 组件 -->
                <boss-show />
            </div>
        </section>

        <!-- p6 -->
        <section class="ranking-list">
            <div class="ranking-list__content m-section">
                <div class="ranking-list__title-number">
                    <img :src="buildImgUrl('title/6.png')" alt="06" class="ranking-list__number-image" />
                </div>

                <div class="ranking-list__title-banner">
                    <img
                        :src="buildImgUrl('006/ranking-list.png')"
                        alt="秘境百强榜"
                        class="ranking-list__title-image"
                    />
                </div>

                <!-- 立即报名 图片 -->
                <a class="ranking-list__btn" href="/rank/#/9/info" target="_blank">
                    <img :src="buildImgUrl('006/register.png')" alt="立即报名" class="ranking-list__signup-image" />
                </a>
            </div>
        </section>

        <!-- p7 -->
        <section class="new-season">
            <div class="new-season__main m-section">
                <block-title :order="7" class="new-season__title"></block-title>

                <!-- 图标和小标题列表 -->
                <ul class="new-season__list">
                    <!-- TODO:用v-for改写 -->
                    <li class="new-season__item">
                        <a href="/macro" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/macro.png')" alt="宏库" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">宏库</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/bps" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/bps.png')" alt="职业" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">职业</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/fb" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/fb.png')" alt="副本" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">副本</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/team" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/team.png')" alt="团队" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">团队</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/battle" target="_blank">
                            <div class="u-icon">
                                <img
                                    :src="buildImgUrl('007/icon/battle.png')"
                                    alt="战斗分析"
                                    class="new-season__icon"
                                />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">战斗分析</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/jcl" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/jcl.png')" alt="JCL" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">JCL</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/pz" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/pz.png')" alt="配装器" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">配装器</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/app/database" target="_blank">
                            <div class="u-icon">
                                <img
                                    :src="buildImgUrl('007/icon/database.png')"
                                    alt="游戏数据"
                                    class="new-season__icon"
                                />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">游戏数据</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/achievement" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/cj.png')" alt="成就" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">成就</span>
                            </div>
                        </a>
                    </li>
                    <li class="new-season__item">
                        <a href="/face" target="_blank">
                            <div class="u-icon">
                                <img :src="buildImgUrl('007/icon/face 1.png')" alt="捏脸" class="new-season__icon" />
                            </div>
                            <div class="u-label">
                                <span class="new-season__label">捏脸</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>

        <!-- p8 -->
        <section class="visual-enhancement">
            <block-title :order="8" class="visual-enhancement__title"></block-title>
            <div class="visual-enhancement__content m-section">
                <img
                    :src="buildImgUrl('008/maincontent.png')"
                    alt="Top 100 Ranking"
                    class="u-pic"
                />
            </div>
        </section>

        <!-- p9-->
        <section class="engine-update">
            <block-title :order="9" class="engine-update__title"></block-title>
            <div class="engine-update__content m-section">
                <!-- 轮播的主图和文本 -->
                <mapdisplay class="new-map__play"></mapdisplay>
            </div>
        </section>
    </div>
</template>

<script>
import BlockTitle from "./components/title.vue";
import Mapshow from "./components/mapshow.vue";
import DS from "./components/duanshi.vue";
import BossShow from "./components/bossshow.vue";
import Mapdisplay from "./components/mapdisplay.vue";

export default {
    name: "Index",
    components: {
        BlockTitle,
        Mapshow,
        DS,
        BossShow,
        Mapdisplay,
    },
    inject: ["__imgRoot"],
    data() {
        return {
            currentIndex: 0, // 当前轮播索引
            activeTab: "wuxue", // 当前激活的选项卡
            duanshi: [
                { key: "wuxue", label: "武学", pics: ["004/content/wuxue_1.png"] },
                { key: "xiaofu", label: "校服", pics: ["004/content/xiaofu_1.png", "004/content/xiaofu_2.png"] },
                {
                    key: "changjing",
                    label: "场景",
                    pics: ["004/content/changjing_1.png", "004/content/changjing_2.png"],
                },
                { key: "genchong", label: "跟宠", pics: ["004/content/pet.png"] },
                { key: "qunxiang", label: "群像", pics: ["004/content/photo_1.png", "004/content/photo_2.png"] },
                {
                    key: "wuqi",
                    label: "武器",
                    pics: ["004/content/weapon_1.png", "004/content/weapon_2.png", "004/content/weapon_3.png"],
                },
            ],
            active: 0,
            timer: null,
            videoList: [],
            video: "",
            boxActive: 0,
            popApplication: [],
        };
    },
    computed: {
        currentImage() {
            return this.buildImgUrl(this.images[this.currentIndex]);
        },
        currentTitle() {
            return this.titles[this.currentIndex];
        },
        currentDescription() {
            return this.descriptions[this.currentIndex];
        },
        data() {
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
    mounted() {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
    methods: {
        buildTabImgUrl(tab) {
            const imgUrl = this.activeTab === tab ? tab + "_active" : tab;
            return this.buildImgUrl(`004/pr4tab/${imgUrl}.png`);
        },

        buildImgUrl(path) {
            return `${this.__imgRoot}${path}`;
        },
        init() {
            // 你的初始化逻辑
        },
        hanldMask(event) {
            let x = -event.clientX / 150;
            let y = -event.clientY / 150;
            if (this.$refs.mark) {
                this.$refs.mark.style.backgroundPositionX = x + "px";
                this.$refs.mark.style.backgroundPositionY = y + "px";
            }
        },
        imgChange(index) {
            this.active = index;
        },
        setActiveImg(index) {
            this.$refs.imgCarousel.setActiveItem(index);
        },
        chooseImage(index) {
            this.boxActive = index;
            this.video = this.videoList[index].link;
        },
        getMoreVideos() {
            window.open("https://space.bilibili.com/2066064028");
        },
    },
    directives: {
        animate: {
            inserted(el, binding) {
                binding.addClass = () => {
                    const { top } = el.getBoundingClientRect();
                    const h = document.documentElement.clientHeight || document.body.clientHeight;
                    if (top < h) {
                        if (!el.className.includes(binding.value)) {
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
            unbind(el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/silufengyu/index.less";
</style>
