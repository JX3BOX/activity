<template>
    <div class="m-index">
        <div class="m-top-png"></div>
        <!-- 第一屏 -->
        <div class="m-top">
            <div class="u-logo p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-mohe p-animation" v-animate="'flipInX'"></div>
        </div>
        <!-- 视频 -->
        <div class="m-video">
            <div class="u-box">
                <div class="u-txtr p-animation" v-animate="'fadeInRight'"></div>
                <div class="u-video" v-html="video"></div>
            </div>
            <div class="u-text p-animation" v-animate="'fadeInDown'"></div>
            <!-- 链接 -->
            <div class="u-btn p-animation" v-animate="'fadeInDown'">
                <a :href="item.link" target="_blank" v-for="(item, i) in shengdian" :key="i" :class="`u-btn` + (i + 1)"></a>
            </div>
        </div>
        <!-- PVE -->
        <div class="m-one m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box p-animation" v-animate="'bounceIn'">
                <!-- 切换tab -->
                <div class="u-tab">
                    <span v-for="item in 2" :key="item" :class="[`u-tab` + item, item == tabIndex ? 'active' : '']" @click="changeTab(item)"></span>
                </div>
                <div class="u-tab-block">
                    <!-- BOSS图片 -->
                    <div class="u-img">
                        <img :src="tabImg" />
                        <a :href="tabImgLink" class="u-more" target="_blank"></a>
                    </div>
                    <!-- 新闻 -->
                    <div class="u-news">
                        <a :href="item.link" target="_blank" class="u-line" v-for="(item, i) in pve" :key="i">
                            <span class="u-name">{{ item.title }}</span>
                            <span class="u-author">{{ item.author }}</span>
                        </a>
                    </div>
                    <!-- 按钮 -->
                    <div class="u-btnbox">
                        <a v-for="(item, i) in btn" :key="i" :href="item.link" class="u-btn" :class="`u-btn` + (i + 1)" target="_blank"></a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 秘境 -->
        <div class="m-two m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box">
                <div class="u-slogan p-animation" v-animate="'bounceIn'"></div>
            </div>
        </div>
        <!-- 阵营 -->
        <div class="m-three m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box">
                <span v-for="item in 4" :key="item" :class="`u-img${item}`" class="u-img p-animation" v-animate="'fadeInDown'"></span>
            </div>
        </div>
        <!-- 其它 -->
        <div class="m-four m-module">
            <div class="u-title p-animation" v-animate="'fadeInDown'"></div>
            <div class="u-box p-animation" v-animate="'fadeInDown'">
                <div class="u-more" v-if="more.length < 1"></div>
                <div class="u-swiper" v-else>
                    <el-carousel height="440px">
                        <el-carousel-item v-for="(item, i) in more" :key="i">
                            <a :href="item.link" target="_blank">
                                <img :src="item.img" alt />
                            </a>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="u-logo p-animation" v-animate="'bounceIn'"></div>
        </div>
        <!-- 全屏叶子 -->
        <div class="m-leaf" ref="mark"></div>
    </div>
</template>

<script>
const KEY = "shengdianyunqi";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {},
    data: function () {
        return {
            shengdian: [
                { name: "秘境背景", link: "#/shengdian" },
                { name: "秘境首领", link: "#/shengdian?tab=2" },
                { name: "秘境掉落", link: "#/shengdian?tab=3" },
                { name: "门派攻略", link: "/bps/#/" },
                { name: "门派宏库", link: "/macro/#/" },
                { name: "门派配装", link: "/pz/#/public" },
            ],
            video: "",
            tabIndex: 1,
            btn: [
                { name: "新配装器", link: "/pz" },
                { name: "副本掉落", link: "/fb/#/drop_v2?fb_name=荻花圣殿&fb_zlp=巴蜀风云" },
                { name: "战斗分析", link: "/battle" },
                { name: "团队工具", link: "/team" },
            ],
            pve: [],
            pvebanner: [],
            more: [],
            tabImg: "",
            tabImgLink: "/fb/#/drop_v2?fb_name=荻花圣殿&fb_zlp=巴蜀风云",
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
                this.pve = this.data.index_pve_posts;
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
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
    @import "~@/assets/css/topic/shengdianyunqi/index.less";
</style>
