<template>
    <div class="m-index">
        <!-- 第一屏：人物&标题 -->
        <div class="m-first m-screen">
            <div class="people" ref="mark"></div>
            <div class="title pa"></div>
            <div class="fish pa"></div>
            <div class="fish-1 pa"></div>
            <div class="logo pa">
                <a href="https://jx3.xoyo.com/" target="_blank"></a>
                <a href="https://www.jx3box.com/index/" target="_blank"></a>
            </div>
        </div>
        <!-- 第二屏：视频&鱼 -->
        <div class="m-two m-screen">
            <div class="u-title pa">序</div>
            <div class="video pa">
                <div class="u-video" v-html="video"></div>
            </div>
            <div class="lantern pa" style="pointer-events:none"></div>
            <div class="fish-2 pa" style="pointer-events:none"></div>
        </div>
        <!-- 第三屏：门派 -->
        <div class="m-three m-screen">
            <div class="u-title pa">
                <span class="label">PART <b>01</b></span>
                <span class="value">侠</span>
                <span class="value value-hover">侠之章</span>
                <span class="desc">本部分主要介绍游戏内部的全部门派，以及对应门派的攻略和数据资源。</span>
            </div>
            <div class="m-content pa">
                <div class="mark" :class="`mark-${active}`"></div>
                <div :class="`people-${active} pa`"></div>
                <div :class="`text-${active} pa`">
                    <img :src="`${__imgRoot}school/${active}-text.png?welcome`" class="img" />
                    <div class="txt">
                        {{ mp[active] }}
                    </div>
                    <div class="m-button pa">
                        <span>门派心法:</span>
                        <a :href="item.link" target="_blank" class="u-btn" v-for="(item, i) in xf[active]" :key="i">
                            {{ item.name }}
                        </a>
                    </div>
                </div>
                <a href="https://www.jx3box.com/macro/#/" target="_blank" class="macro pa"></a>
            </div>
            <div class="m-name pa">
                <span
                    class="u-name"
                    v-for="(item, key) in mp"
                    :key="key"
                    :class="{ active: key == active, [`u-${key}`]: true }"
                    @click="change(key)"
                ></span>
            </div>
        </div>
        <!-- 第四屏： pve玩法 -->
        <div class="m-four m-screen">
            <div class="u-title pa">
                <span class="label">PART <b>02</b></span>
                <span class="value">面</span>
                <span class="value value-hover">面之章</span>
                <span class="desc">
                    本部分主要介绍游戏内主流PVE玩法，方便各位新玩家了解并找到自己喜欢的内容以及相对应的攻略或数据资源。
                </span>
            </div>
            <div class="m-content">
                <div class="m-item">
                    <div class="fb" :style="play.fb.style">
                        <div class="mark pa" :style="play.fb.mark">
                            <div class="text" :style="play.fb.textStyle">
                                <span class="label">{{ play.fb.label }}</span>
                                <span class="title">{{ play.fb.title }}</span>
                                <span class="desc">{{ play.fb.desc }}</span>
                                <span class="info" style="margintop: 39px">{{ play.fb.info }}</span>
                                <a href="https://www.jx3box.com/fb/npc" target="_blank" class="boss alink"></a>
                                <a href="https://www.jx3box.com/fb/" target="_blank" class="alink"></a>
                            </div>
                        </div>
                    </div>
                    <div class="baizhan" :style="play.baizhan.style">
                        <div class="mark pa" :style="play.baizhan.mark">
                            <div class="text" :style="play.baizhan.textStyle">
                                <span class="label">{{ play.baizhan.label }}</span>
                                <span class="title">{{ play.baizhan.title }}</span>
                                <span class="desc">{{ play.baizhan.desc }}</span>
                                <span class="info" style="margintop: 17px">{{ play.baizhan.info }}</span>
                                <a href="https://www.jx3box.com/fb/?fb_zlp=%E9%9B%BE%E6%B5%B7%E5%AF%BB%E9%BE%99&fb_name=%E7%99%BE%E6%88%98%E5%BC%82%E9%97%BB%E5%BD%95" target="_blank" class="alink" style="bottom: 10px"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-item">
                    <div class="week" :style="play.week.style">
                        <div class="mark" :style="play.week.mark">
                            <div class="text" :style="play.week.textStyle">
                                <span class="label">{{ play.week.label }}</span>
                                <span class="title">{{ play.week.title }}</span>
                                <span class="desc">{{ play.week.desc }}</span>
                                <span class="info" style="margintop: 20px">{{ play.week.info }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="m-box">
                        <div class="left">
                            <div class="lang" :style="play.lang.style">
                                <div class="mark" :style="play.lang.mark">
                                    <div class="text">
                                        <span class="label">{{ play.lang.label }}</span>
                                        <span class="title">{{ play.lang.title }}</span>
                                        <span class="info">{{ play.lang.info }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="shilian" :style="play.shilian.style">
                                <div class="mark" :style="play.shilian.mark">
                                    <div class="text">
                                        <span class="label">{{ play.shilian.label }}</span>
                                        <span class="title">{{ play.shilian.title }}</span>
                                        <span class="info">{{ play.shilian.info }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="more" :style="play.more.style">
                            <div class="mark" :style="play.more.mark">
                                <div class="box">
                                    <a
                                        class="item"
                                        :href="item.link"
                                        target="_blank"
                                        v-for="(item, i) in play.more.list"
                                        :key="i"
                                    >
                                        <img class="icon" :src="item.icon" />
                                        <span>{{ item.name }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第五屏：pvp玩法 -->
        <div class="m-five m-screen">
            <div class="u-title pa">
                <span class="label">PART <b>03</b></span>
                <span class="value">武</span>
                <span class="value value-hover">武之章</span>
                <span class="desc">
                    本部分主要介绍游戏内主流PVP玩法，方便各位新玩家了解并找到自己喜欢的内容以及相对应的攻略或数据资源。
                </span>
            </div>
            <div class="m-content" :class="pvpIndex">
                <div class="carousel">
                    <div class="content" v-for="(item, i) in pvp" :key="i" :class="{ active: pvpIndex == i }">
                        <span class="label">{{ item.label }}</span>
                        <span class="title">{{ item.title }}</span>
                        <span class="desc">{{ item.desc }}</span>
                        <span class="info" v-html="item.info"></span>
                        <div class="m-button pa" v-if="item.button">
                            <a
                                :href="btn.link"
                                target="_blank"
                                class="u-btn"
                                v-for="(btn, key) in item.button"
                                :key="key"
                            >
                                {{ btn.name }}
                            </a>
                        </div>
                    </div>
                    <div class="m-dot pa">
                        <span
                            class="dot"
                            v-for="item in pvpArr"
                            :key="item"
                            :class="{ active: pvpIndex == item }"
                            @click="changePlay(item, 'pvp')"
                        >
                        </span>
                    </div>
                    <span class="arr left pa" @click="changeArr(pvpArr, pvpIndex, 'left')"></span>
                    <span class="arr right pa" @click="changeArr(pvpArr, pvpIndex, 'right')"></span>
                </div>
            </div>
        </div>
        <!-- 第六屏：pvx玩法 -->
        <div class="m-six m-screen">
            <div class="u-title pa">
                <span class="label">PART <b>04</b></span>
                <span class="value">缘</span>
                <span class="value value-hover">缘之章</span>
                <span class="desc">
                    奇遇，成就，还是伙伴侠客，又或是每个NPC背后的故事？本部分主要介绍游戏内主流PVX玩法。
                </span>
            </div>
            <div class="m-content" :class="pvxIndex">
                <div class="carousel">
                    <div class="content" v-for="(item, i) in pvx" :key="i" :class="{ active: pvxIndex == i }">
                        <span class="label">{{ item.label }}</span>
                        <span class="title">{{ item.title }}</span>
                        <span class="desc">{{ item.desc }}</span>
                        <span class="info">{{ item.info }}</span>
                        <div class="m-button pa" v-if="item.button">
                            <span
                                :href="btn.link"
                                target="_blank"
                                class="u-btn"
                                v-for="(btn, key) in item.button"
                                :key="key"
                                @click="open(btn.link)"
                            >
                                {{ btn.name }}
                            </span>
                        </div>
                    </div>
                    <div class="m-dot pa">
                        <span
                            class="dot"
                            v-for="item in pvxArr"
                            :key="item"
                            :class="{ active: pvxIndex == item }"
                            @click="changePlay(item, 'pvx')"
                        >
                        </span>
                    </div>
                    <span class="arr left pa" @click="changeArr(pvxArr, pvxIndex, 'left')"></span>
                    <span class="arr right pa" @click="changeArr(pvxArr, pvxIndex, 'right')"></span>
                </div>
            </div>
        </div>
        <!-- 第七屏：魔盒助力 -->
        <div class="m-seven">
            <div class="m-content">
                <div class="title">豪行江湖 魔盒助力</div>
                <div class="label">一站式剑网3资源工具站</div>
                <div class="m-box">
                    <a :href="item.link" target="_blank" class="item" v-for="(item, i) in box" :key="i">
                        <span :class="`item-bg item-${i + 1}`"> </span>
                        <span class="u-title">{{ item.title }}</span>
                    </a>
                </div>
            </div>
            <div class="code"></div>
        </div>
        <!-- tips -->
        <div class="m-tips" v-if="show">敬请期待</div>
    </div>
</template>

<script>
import { mp, xf, play, pvp, pvx, box } from "@/assets/data/event/welcome.json";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {},
    data: function () {
        return {
            video: `<iframe src="//player.bilibili.com/player.html?aid=478020716&bvid=BV1nK411k716&cid=971857784&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`,
            active: "wh",
            mp,
            xf,
            play,
            pvp,
            pvx,
            box,
            pvpIndex: "mjdh",
            pvxIndex: "hcqy",
            show: false,
            zIndex: false,
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
        pvpArr() {
            return Object.keys(this.pvp);
        },
        pvxArr() {
            return Object.keys(this.pvx);
        },
    },
    watch: {},
    methods: {
        change(name) {
            this.active = name;
        },
        changePlay(item, type) {
            if (type == "pvp") this.pvpIndex = item;
            if (type == "pvx") this.pvxIndex = item;
        },
        changeArr(arr, index, type) {
            const _index = arr.findIndex((item) => item == index);
            let name = "";
            if (type == "left") {
                const i = _index - 1;
                name = i < 0 ? arr[arr.length - 1] : arr[i];
            }
            if (type == "right") {
                const i = _index + 1;
                name = i < arr.length ? arr[i] : arr[0];
            }
            if (this.pvpIndex == index) this.pvpIndex = name;
            if (this.pvxIndex == index) this.pvxIndex = name;
        },
        open(link) {
            if (link) return window.open(link, "_blank");
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 1000);
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
        window.addEventListener("mousemove", this.hanldMask);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/welcome/index.less";
</style>
