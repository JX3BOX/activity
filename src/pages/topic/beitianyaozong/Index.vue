<template>
    <!-- 专题页 -->
    <div class="p-topic-container">
        <div class="wp shadow">
            <!-- 叶子 -->
            <div class="m-topic-leaf p-animation" ref="mark"></div>
            <!-- 第一屏 -->
            <div class="m-topic-header">
                <div class="u-sleeve"></div>
                <img v-animate="'p-animation fadeInRight'" class="u-textImg" :src="btyz + `yaozong.png`" />
            </div>
            <!-- 专题内容 -->
            <div class="m-topic-content" ref="scrollShow">
                <!-- 视频 -->
                <div class="m-topic-video" v-animate="'p-animation fadeInDown'">
                    <img v-animate="'p-animation fadeInRight'" class="u-textImg" :src="btyz + `txtr.png`" />

                    <div class="u-video" v-html="video"></div>
                </div>
                <!-- 药宗介绍和链接 -->
                <div class="m-topic-info">
                    <img v-animate="'p-animation fadeInDown'" class="u-textImg" :src="btyz + `txt.png`" />
                    <div class="u-btnbox">
                        <a v-for="(item, i) in yaozong" :href="item.link" :key="i" v-animate="'p-animations fadeInUp'" class="u-btn" :class="`u-btn` + i" target="_blank"></a>
                    </div>
                </div>
                <!-- pve -->
                <div class="m-topic-block m-topic-pve">
                    <img v-animate="'p-animation fadeInDown'" class="u-title" :src="btyz + `one.png`" />
                    <div class="u-cont" v-animate="'p-animation fadeInLeft'">
                        <!-- 切换tab -->
                        <div class="u-tab">
                            <span v-for="(item, i) in tab" :key="i" :class="[item, i == tabIndex ? 'active' : '']" @click="changeTab(i)"></span>
                        </div>
                        <div class="u-tab-block">
                            <!-- BOSS图片 -->
                            <div class="u-img">
                                <img :src="tabImg" />
                                <a :href="tabImgLink" class="u-more"></a>
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
                                <a v-for="(item, i) in fb" :key="i" :href="item.link" class="u-btn" :class="`u-btn` + i" target="_blank"></a>
                            </div>
                        </div>
                        <a class="u-sword" v-animate="'p-animation fadeInRightBig'" href="/fb" target="_blank"></a>
                    </div>
                </div>
                <!-- pvp -->
                <div class="m-topic-block m-topic-pvp">
                    <img class="u-title" v-animate="'p-animation fadeInDown'" :src="btyz + `two.png`" />
                    <div class="u-cont">
                        <a class="u-img" v-animate="'p-animation bounceIn'" :href="item.link" target="_blank" v-for="(item, i) in pvp" :key="i">
                            <img :src="item.img" />
                        </a>
                    </div>
                </div>
                <!-- pvx -->
                <div class="m-topic-block m-topic-pvx">
                    <img class="u-title" v-animate="'p-animation fadeInDown'" :src="btyz + `three.png`" />
                    <div class="u-cont" v-animate="'p-animation fadeInDown'">
                        <div class="u-swiper">
                            <el-carousel height="480px">
                                <el-carousel-item v-for="(item, i) in pvx" :key="i">
                                    <a :href="item.link" target="_blank">
                                        <img :src="item.img" alt />
                                    </a>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
                <!-- 二维码 -->
                <div class="m-topic-qrcode" ref="footer">
                    <img :src="btyz + 'qrcode_index_box.png'" alt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "beitianyaozong";
import { getTopic } from "@/service/topic";
export default {
    name: "Topic",
    props: [],
    components: {},
    data: function() {
        return {
            btyz: "https://img.jx3box.com/topic/beitianyaozong/new/",
            tab: ["leiyu", "wushi"],
            tabIndex: 0,
            raw: [],
            tabImg: "",
            tabImgLink: "",
            yaozong: [
                {
                    name: "药宗武学",
                    link: "#/yaozong",
                },
                { name: "药宗宏库", link: "/macro/#/?subtype=无方" },
                { name: "药宗配装", link: "/pz/#/public?mount=10627" },
                { name: "无方攻略", link: "/bps/#/?subtype=无方" },
                { name: "灵素攻略", link: "/bps/#/?subtype=灵素" },
                { name: "更多", link: "/bps/#/raw?subtype=%E6%97%A0%E6%96%B9" },
            ],
            fb: [
                { name: "新配装器", link: "/pz" },
                {
                    name: "副本掉落",
                    link: "/fb/#/drop?fb_name=雷域大泽&fb_zlp=奉天证道",
                },
                { name: "战斗分析", link: "/battle" },
                { name: "团队工具", link: "/team" },
            ],
            pvp: [],
            pve: [],
            pvx: [],
            video: "",
            offAnimation: false,
        };
    },
    directives: {
        animate: {
            inserted: function(el, binding) {
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
            unbind: function(el, binding) {
                if (binding.addClass) {
                    window.removeEventListener("scroll", binding.addClass);
                }
            },
        },
    },
    computed: {
        data: function() {
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
        init: function() {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                this.video = this.data.new_video[0]["link"];
                this.pve = this.data.new_pve;
                this.pvebanner = this.data.new_pve_banner;
                this.pvp = this.data.new_pvp;
                this.pvx = this.data.new_pvx;

                this.tabImg = this.pvebanner[0].img;
                this.tabImgLink = this.pvebanner[0].link;
            });
        },
        changeTab(i) {
            this.tabIndex = i;
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
    created: function() {},
    mounted: function() {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>
