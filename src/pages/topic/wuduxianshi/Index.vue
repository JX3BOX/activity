<template>
    <div data-topic="wuduxianshi" class="topic-mobile-baseline m-index">
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
            <div class="u-mobile-copy" hidden>
                <h2>五毒教</h2>
                <p>五仙，亦称五毒教，地处苗疆，是一个历史悠久，隐秘庞大的特色门派。</p>
                <p>天宝元年，五仙教内部分裂，元气大伤。西南地区一时势力错杂，局势动荡，唐门百年望族的兴起、天一教与南诏势力的暗中串通，在波云诡谲的氛围之下，庞大的五毒教也逐渐向中原露出了它的冰山一角。</p>
            </div>
            <a :href="`${OriginRoot}bps/#/?subtype=%E6%AF%92%E7%BB%8F`" class="u-logo" aria-label="毒经职业攻略" v-animate="'fadeIn'"></a>
        </div>
        <!-- 荻花圣殿-->
        <div class="m-two m-module">
            <div class="u-bg" v-animate="'fadeIn'"></div>
            <div class="u-box">
                <div class="u-btn">
                    <a
                        v-for="(item, key) in buttons"
                        :key="key"
                        :href="item.link"
                        :aria-label="item.title"
                        target="_blank"
                        :class="`u-${item.name}`"
                        v-animate="item.animate"
                        :style="`background-image: url(${imgPath}${item.key}.png)`"
                    ></a>
                </div>
                <div class="u-txt" v-animate="'fadeIn'"></div>
                <div class="u-mobile-copy" hidden>
                    <p>红衣教传教受挫，欲勾结天一教、南诏王，进行禁忌之祭祀，陷大唐子民于水深火热之中。</p>
                    <p>而此时在圣殿后山事件后，红衣教的动作引起了一直继续追查荻花圣殿入口所在的拜火教的关注。与红衣教同源的他们，意识到红衣教将要做的是什么。为此，他们将这些消息通告给了那些曾经帮助过他们的中原侠士们。</p>
                    <p>新的波澜，将在圣殿之中掀起。南诏的蓄谋与阿萨辛的报复，都将在此展开……</p>
                </div>
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
            <div class="u-mobile-copy" hidden>
                <h2>全新 IF 线剧情</h2>
                <p>五毒大殿，一坛老酒……</p>
                <p>一次机缘巧合，一坛迷仙老酒，一段温情往事，一场真假梦幻。</p>
            </div>
        </div>
        <!-- 标题4 更多精彩 -->
        <div class="m-four m-module">
            <div class="u-bg" v-animate="'fadeIn'"></div>
            <div class="u-box">
                <div class="u-more" v-animate="'fadeInDown'"></div>
                <h2 class="u-mobile-title" hidden>更多精彩</h2>
                <a
                    v-for="(item, key) in more"
                    :key="key"
                    :href="item.link"
                    :aria-label="item.title"
                    target="_blank"
                    :class="`u-${item.name}`"
                    v-animate="item.animate"
                    :style="`background-image: url(${imgPath}four_${item.name}.png)`"
                ></a>
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
import { __cdn, __OriginRoot } from "@/utils/config";
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
            imgPath: __cdn + "design/topic/wuduxianshi/",
        };
    },
    directives: {
        animate: {
            mounted: function (el, binding) {
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
            unmounted: function (el, binding) {
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
        toButtons({ desc, link, id, title }) {
            let _item = { name: desc, link, title };
            _item.key = desc == "dihua" ? `two_` + desc : `btn_` + desc;
            _item.animate = desc == "dihua" ? "fadeIn" : id < 178 ? "fadeInRight" : "fadeInLeft";
            return _item;
        },
        // 更多内容-转换
        toMore({ desc, link, id, title }) {
            let _item = { name: desc, link, title };
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

<style lang="less">
@import "~@/assets/css/topic/mobile/reflow.less";

@media (min-width: 768px) {
    .m-index[data-topic="wuduxianshi"] {
        > .m-one,
        > .m-four,
        > .m-bottom {
            // Their fixed artwork heights exclude the surrounding padding.
            box-sizing: content-box;
        }
    }
}
</style>
