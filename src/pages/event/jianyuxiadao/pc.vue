<template>
    <div class="m-page">
        <div class="m-index">
            <!-- 第一屏 -->
            <div class="m-p1 p-animation fadeIn">
                <div class="wp">
                    <div class="m-title">
                        <img :src="imgurl + 'jyxd.png'" class="p-animation fadeIn" />
                        <div class="u-ljcq p-animation fadeIn">
                            <a href="#p2">
                                <img :src="imgurl + 'ljxq.png'" class="u-img" />
                            </a>
                        </div>
                    </div>
                    <div class="m-tips p-animation fadeIn">
                        注：本桌游建议5-10人参与游戏，建议使用Excel或记录纸，以获得更好的游戏体验。<br />
                        本桌游虽由魔盒百强赛奖励20面骰子而生，但并不强制要求使用同骰子。
                    </div>
                    <div class="m-qrcode">
                        <img :src="imgurl + 'qrcode.jpg'" />
                    </div>
                </div>
            </div>
            <!-- 第二屏 -->
            <div class="m-txt p-animation fadeIn" id="p2">
                <div class="wp">
                    <!-- 综述 -->
                    <h2>{{ play.zongshu.title }}</h2>
                    <span class="u-txt" v-for="item in play.zongshu.content" :key="item">➢ {{ item }}</span>
                    <!-- 建立角色阶段 -->
                    <h2>{{ play.juese.title }}</h2>
                    <span class="u-txt" v-for="item in play.juese.content" :key="item">● {{ item }}</span>
                    <!-- 属性对应门派 -->
                    <div class="m-table">
                        <div class="m-line" v-for="(item, key) in play.group" :key="key">
                            <span class="u-label" :class="name[key]">{{ key }}</span>
                            <span v-for="school in item" :key="school">
                                {{ school }}
                            </span>
                        </div>
                    </div>
                    <!-- 门派对应属性 -->
                    <div class="m-table m-column">
                        <div class="m-line" v-for="(item, key) in play.menpai" :key="key">
                            <span class="u-label">{{ key }}</span>
                            <span v-for="school in item.tag" :key="school" :class="name[school]">
                                {{ school }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 第三屏 -->
            <div class="m-txt p-animation fadeIn">
                <div class="wp">
                    <!-- 属性详解 -->
                    <h2>{{ play.shuxing.title }}</h2>
                    <span class="u-txt" v-for="item in play.shuxing.content" :key="item">✧ {{ item }}</span>
                    <div class="m-box">
                        <!-- 门派对应属性 -->
                        <div class="m-table m-number">
                            <div class="m-line">
                                <span class="u-label" v-for="item in title[0]" :key="item" :class="name[item]">
                                    {{ item }}
                                </span>
                            </div>
                            <div class="m-line" v-for="(item, key) in play.menpai" :key="key">
                                <span class="u-label">{{ key }}</span>
                                <span v-for="(number, i) in item.attribute" :key="i">
                                    {{ number }}
                                </span>
                                <span>{{ count(item.attribute) }}</span>
                            </div>
                        </div>
                        <!-- 体型对应属性 -->
                        <div class="m-table m-number">
                            <div class="m-line">
                                <span class="u-label" v-for="item in title[1]" :key="item" :class="name[item]">
                                    {{ item }}
                                </span>
                            </div>
                            <div class="m-line" v-for="(item, key) in play.tixing" :key="key">
                                <span class="u-label">{{ key }}</span>
                                <span v-for="(number, i) in item" :key="i">
                                    {{ number }}
                                </span>
                                <span>{{ count(item) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 第四屏 -->
            <div class="m-txt p-animation fadeIn">
                <div class="wp">
                    <!-- 江湖游历 -->
                    <h2>{{ play.youli.title }}</h2>
                    <span class="u-txt" v-for="item in play.youli.content" :key="item">❋ {{ item }}</span>

                    <div class="m-map">
                        <div class="m-map-line" v-for="(item, key) in play.maps" :key="key">
                            <span v-for="(name, i) in item" :key="i" :class="!name ? 'u-blank' : ''">{{ name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 第六屏 -->
            <div class="m-txt p-animation fadeIn">
                <div class="wp">
                    <h2>玩法说明</h2>
                    <span class="u-txt"> {{ play.kapai.info }} </span>
                    <!-- 普通 -->
                    <h3>{{ play.kapai.putong.title }}</h3>
                    <span class="u-txt" v-for="item in play.kapai.putong.content" :key="item">{{ item }}</span>
                    <!-- 抉择 -->
                    <h3>{{ play.kapai.jueze.title }}</h3>
                    <span class="u-txt" v-for="item in play.kapai.jueze.content" :key="item">{{ item }}</span>
                    <!-- 特殊 -->
                    <h3>{{ play.kapai.teshu.title }}</h3>
                    <span class="u-txt" v-for="item in play.kapai.teshu.content" :key="item">{{ item }}</span>
                </div>
            </div>
            <!-- 第七屏 -->
            <div class="m-txt p-animation fadeIn">
                <div class="wp">
                    <!-- 游戏寄语 -->
                    <h2>{{ play.jiyu.title }}</h2>
                    <span class="u-txt" v-for="item in play.jiyu.content" :key="item">❂ {{ item }}</span>
                </div>
            </div>
            <!-- 第八屏 -->
            <div class="m-p4 p-animation fadeIn">
                <div class="m-p4-title">
                    <img :src="imgurl + 'jyxd.png'" class="p-animation fadeIn" />
                    <div class="u-btn p-animation fadeIn">
                    <a :href="imgurl + '魔盒 - 桌游 - 桌上江湖 - 盾咚.pptx'"  > <img :src="imgurl + 'download.png'" @click="toastMsg" /></a>
                        <span class="u-text" @click="goHome">返回顶部</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "jianyuxiadao";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import play from "@/assets/data/event/dnd.json";
import { reduce } from "lodash";
export default {
    name: "Index",
    props: [],
    components: {},
    data: function () {
        return {
            imgurl: __imgPath + "/topic/jianyuxiadao/",
            play,
            name: {
                身法: "shenfa",
                体质: "tizhi",
                根骨: "gengu",
                元气: "yuanqi",
                力道: "lidao",
            },
            title: [
                ["门派", "力道", "元气", "体质", "根骨", "身法", "自选", "总计"],
                ["体型", "财富", "阅历", "颜值", "天赋", "自选", "总计"],
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
        count(obj) {
            const num = reduce(obj, (result, value, key) => {
                return result + value;
            });
            return num;
        },
        goHome() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        toastMsg() {
            // alert("百强结榜后放出，敬请期待");
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        // this.init();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/event/jianyuxiadao/index.less";
</style>
