<template>
    <div class="m-index">
        <div class="m-index">
            <div class="m-top"></div>
            <!-- 全新副本 -->
            <div class="m-one"></div>
            <!-- 五大场景 -->
            <div class="m-two"></div>
            <!-- 全新门派 -->
            <div class="m-three"></div>
            <!-- 两大玩法 -->
            <div class="m-four"></div>
            <!-- 更多资讯 -->
            <div class="m-five"></div>
        </div>
    </div>
</template>

<script>
// TODO: 修改KEY
const KEY = "cangjianshanzhuang";
import { getTopic } from "@/service/topic";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            cangjian: [
                { name: "藏剑武学", link: "#/cangjian", target: "_self" },
                {
                    name: "藏剑宏库",
                    link: "/macro/#/?subtype=问水诀",
                    target: "_blank",
                },
                {
                    name: "藏剑配装",
                    link: "/pz/#/public?mount=10144",
                    target: "_blank",
                },
                {
                    name: "藏剑攻略",
                    link: "/bps/#/?subtype=问水诀",
                    target: "_blank",
                },
            ],
            video: "",
            tabIndex: 1,
            btn: [
                { name: "新配装器", link: "/pz" },
                {
                    name: "副本掉落",
                    link: "/fb/#/drop_v2?fb_name=荻花宫后山&fb_zlp=风起稻香",
                },
                { name: "战斗分析", link: "/battle" },
                { name: "团队工具", link: "/team" },
            ],
            pve: [],
            pvebanner: [],
            more: [],
            tabImg: "",
            tabImgLink: "/fb/#/npc?fb_zlp=风起稻香&fb_name=荻花宫后山",
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
// @import "~@/assets/css/topic/cangjianshanzhuang/index.less";
</style>
