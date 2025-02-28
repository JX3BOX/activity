<template>
    <div class="m-index">
        <!-- 第一屏 -->
        <div class="m-top">
            <div class="u-logo" v-animate="'fadeInDown'"></div>
            <div class="u-mohe" v-animate="'fadeInDown'"></div>
            <div class="u-slogan" v-animate="'fadeIn'"></div>
        </div>

        <!-- 五毒介绍 -->
        <div class="m-one m-module">
            <div class="u-bg" v-animate="'fadeIn'"></div>
            <div class="u-txt" v-animate="'fadeIn'"></div>
            <a :href="`${OriginRoot}bps/#/?subtype=%E6%AF%92%E7%BB%8F`" class="u-logo" v-animate="'fadeIn'"></a>
        </div>
        <!-- 荻花圣殿-->
        <div class="m-two m-module">
            <div class="u-bg" v-animate="'fadeIn'"></div>
            <div class="u-box">
                <div class="u-btn">
                    <a v-for="(item,key) in buttons" :key="key" :href="item.link" target="_blank" :class="`u-${item.name}`" v-animate="item.animate" :style="`background-image: url(${imgPath}${item.key}.png)`"></a>
                </div>
                <div class="u-txt" v-animate="'fadeIn'"></div>
            </div>

        </div>
        <!-- IF剧情-->
        <div class="m-three m-module">
            <div class="u-box">
                <div class="u-bg" v-animate="'fadeIn'"></div>
                <div class="u-man" v-animate="'fadeIn'"></div>
                <div class="u-woman" v-animate="'fadeIn'"></div>
                <div class="u-mark" v-animate="'fadeIn'"></div>
                <div class="u-txt" v-animate="'fadeIn'"></div>
            </div>
        </div>
        <!-- 标题4 更多精彩 -->
        <div class="m-four m-module">
            <div class="u-bg" v-animate="'fadeIn'"></div>
            <div class="u-box">
                <div class="u-more" v-animate="'fadeInDown'"></div>
                <a v-for="(item,key) in more" :key="key" :href="item.link" target="_blank" :class="`u-${item.name}`" v-animate="item.animate" :style="`background-image: url(${imgPath}four_${item.name}.png)`"></a>
            </div>

        </div>
        <!-- 底部logo -->
        <div class="m-bottom" ref="mark">
            <div class="u-logo" v-animate="'fadeIn'"></div>
        </div>
    </div>
</template>

<script>
const KEY = "wuduxianshi";
import { __imgPath, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            OriginRoot: __OriginRoot,
            buttons: [],
            more: [],
            imgPath: __imgPath + "topic/wuduxianshi/",
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
        init: function () {
            getTopic(KEY).then((res) => {
                res.data.data.forEach((item) => {
                    if (item.subtype == "index_btn") this.buttons.push(this.toButtons(item));
                    if (item.subtype == "index_more") this.more.push(this.toMore(item));
                });
            });
        },
        // 按钮链接-转换
        toButtons({ desc, link, id }) {
            let _item = { name: desc, link };
            _item.key = desc == "dihua" ? `two_` + desc : `btn_` + desc;
            _item.animate = desc == "dihua" ? "fadeIn" : id < 178 ? "fadeInRight" : "fadeInLeft";
            return _item;
        },
        // 更多内容-转换
        toMore({ desc, link, id }) {
            let _item = { name: desc, link };
            _item.animate = desc == "xianzonglin" ? "bounceIn" : id % 2 === 0 ? "fadeInLeft" : "fadeInRight";
            return _item;
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
    mounted: function () {
        this.init();
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
    @import "~@/assets/css/topic/wuduxianshi/index.less";
</style>
