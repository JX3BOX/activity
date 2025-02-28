<template>
    <div class="p-event-content p-jx3dat">
        <div class="m-top">
            <video class="mp4" playsinline="" autoplay="" muted="" loop="" :poster="`${__imgRoot}top.jpg`">
                <source :src="`${__imgRoot}top.mp4`" type="video/mp4" />
            </video>
            <img class="logo p-animation" v-animate="'bounceIn'" :src="`${__imgRoot}logo.svg`" />
            <div class="m-title">
                <img class="title p-animation" v-animate="'bounceIn'" :src="`${__imgRoot}video-title.svg`" />
            </div>
        </div>
        <!-- 视频轮播 -->

        <div class="m-video">
            <div class="m-play" v-if="currentVideo">
                <div class="u-play" v-html="currentVideo"></div>
                <img class="u-img" :src="`${__imgRoot}video-title.svg`" />
            </div>
            <div class="m-video-list">
                <img
                    class="u-img"
                    v-for="(video, index) in video"
                    :key="index"
                    :src="video.img"
                    @click="playVideo(index)"
                />
            </div>
        </div>
        <!-- 活动流程 -->
        <h2 class="title" :style="{ backgroundImage: `url(${title[0]})` }">活动流程</h2>
        <div class="m-clip">
            <div class="m-box m-steps">
                <div class="m-links">
                    <div class="m-clip" v-for="(item, i) in document" :key="i">
                        <a class="u-link" :href="item.link" target="_blank">
                            <span>
                                《{{ item.title }}<b :style="{ color: item.color }">{{ item.desc }}</b
                                >》
                            </span>
                        </a>
                    </div>
                </div>
                <div class="m-step" v-for="(item, i) in step" :key="i">
                    <h3 class="u-title" v-html="item.title"></h3>
                    <div class="u-time" v-html="item.link"></div>
                    <div class="u-desc" v-html="item.desc"></div>
                </div>
            </div>
        </div>
        <!-- 活动奖励 -->
        <div class="m-section">
            <h2 class="title" :style="{ backgroundImage: `url(${title[1]})` }">活动奖励</h2>
            <div class="m-content">
                <!-- 现金奖励 -->
                <h3 class="u-title">1.现金奖励</h3>
                <div class="m-clip">
                    <div class="m-box">发布会当晚（11.8日晚8点30）将在晚会直播间通过抽奖送出千元现金红包大奖！</div>
                </div>

                <!-- 实物奖励 -->
                <h3 class="u-title">2.实物大奖</h3>
                <div class="m-prize">
                    <div class="m-clip" v-for="(item, i) in prize" :key="i">
                        <a class="u-prize" :href="item.link" target="_blank">
                            <img class="u-img" :src="item.img" :alt="item.title" />
                            <span>{{ item.title }}</span>
                        </a>
                    </div>
                </div>
                <div class="m-clip">
                    <div class="m-box center">同时提供社区勋章、社区称号、社群红包（含正式服与怀旧服）</div>
                </div>

                <!-- 通宝奖励 -->
                <h3 class="u-title">3.通宝奖项</h3>
                <div class="m-clip">
                    <div class="m-box table"><BoxcoinTable /></div>
                </div>
                <!-- 基础包 -->
                <h3 class="u-title">4.基础包贡献</h3>
                <div class="m-clip">
                    <div class="m-box table">
                        <p>
                            <span>
                                基础包针对的是<b>普通玩家无人去翻新制作旧副本数据</b>，而这些<b
                                    >对休闲或成就党、外观党仍具有必要性。</b
                                >
                            </span>
                        </p>
                        <p>
                            魔盒对外公开征集所有旧副本数据包，它们将作为<b>依赖包</b>的形式提供给其他玩家使用。且任何玩家基于此数据包进行的修改等<b>无需特别署名或声明</b>。
                        </p>
                        <p>
                            被魔盒征集选用后，魔盒将对应包会作为依赖包的形式加入到魔盒官号的包中，并<b>一次性支付</b>对应通宝，但不包括后续迭代。<b
                                >如对应作者后续有任何更新，推荐大家去关注原始包。</b
                            >
                        </p>
                        <p>
                            <span style="color: #f6ff52">所有基础包征集范围：</span>
                            团队副本数据将按每个副本一个独立数据包。五人副本则按年代集合为一个数据包。
                        </p>

                        <BaseTable />
                    </div>
                </div>
                <!-- 教程征集 -->
                <h3 class="u-title">5.数据构建教程征集</h3>
                <div class="m-clip">
                    <div class="m-box table">
                        <p>
                            我们鼓励玩家创作适用于在线数据构建应用的教程内容（包括但不限于文字、视频内容），旨在帮助更多玩家上手与灵活使用此应用。
                        </p>
                        <p>参与此部分同样可获得一定数量的盒币奖励，其规则适用于工具版面打赏制度。</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 安全与风险 -->

        <h2 class="title" :style="{ backgroundImage: `url(${title[2]})` }">安全与风险</h2>
        <div class="m-clip">
            <div class="m-box m-safe" v-html="safe"></div>
        </div>

        <!-- 获奖名单 -->

        <h2 class="title" :style="{ backgroundImage: `url(${title[3]})` }">获奖名单</h2>
        <div class="m-content" v-for="(client, key) in rank" :key="key">
            <h3 class="u-title">{{ `${clients[key]}赛道` }}</h3>
            <div class="m-rank" v-for="(rank, i) in showItem(client)" :key="i">
                <div class="m-clip" :class="{ none: !users[item.author] }" v-for="(item, k) in rank" :key="k">
                    <a
                        :href="authorLink(item.author)"
                        target="_blank"
                        class="m-box"
                        :class="item.color"
                        v-if="users[item.author]"
                    >
                        <Avatar class="u-avatar" :url="users[item.author].avatar" size="60"> </Avatar>
                        <div class="m-info">
                            <span class="u-name">{{ users[item.author].name }}</span>
                            <span>{{ item.title }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const KEY = "jx3dat";
import BoxcoinTable from "./table/boxcoin-table.vue";
import BaseTable from "./table/base-table.vue";
import { getTopic, getUsers } from "@/service/event/topic";
import { uniq } from "lodash";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: { BoxcoinTable, BaseTable },
    data: function () {
        return {
            raw: [],
            prize: [],
            title: [],
            safe: "",
            step: [],
            video: [],
            document: [],
            index: 0,
            rank: {
                std: {},
                origin: {},
                all: {},
            },

            clients: {
                std: "正式服",
                origin: "怀旧服",
                all: "双端",
            },
            users: {},
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
    computed: {
        data: function () {
            let _data = {};
            this.raw.forEach((item) => {
                if (!_data[item.subtype]) {
                    _data[item.subtype] = [];
                }
                _data[item.subtype].push(item);
            });
            Object.keys(_data).forEach((key) => {
                _data[key] = _data[key].sort((a, b) => a.power - b.power);
            });
            return _data;
        },
        currentVideo() {
            return this.video.length && this.video[this.index].link;
        },
    },
    methods: {
        authorLink,
        init() {
            getTopic(KEY).then((res) => {
                this.raw = res.data.data;
                const { prize, safe, step, video, title, document, rank } = this.data;
                this.prize = prize;
                this.safe = safe[0].desc;
                this.step = step;
                this.video = video.map((item) => {
                    const { id, link, img, title } = item;
                    return { id, link, img, title };
                });

                this.title = title.map((item) => item.img);
                this.document = document;
                this.loadUser(rank);
                this.changeRank(rank);
            });
        },
        loadUser(list) {
            const users = uniq(list.map((item) => item.author).filter(Boolean)).join(",");
            users &&
                getUsers({ list: users }).then((res) => {
                    this.users = res.data.data.reduce((acc, cur) => {
                        acc[cur.ID] = {
                            name: cur.display_name,
                            avatar: cur.user_avatar,
                        };
                        return acc;
                    }, {});
                });
        },
        changeRank(list) {
            const obj = list.reduce((prev, cur) => {
                prev[cur.desc] = prev[cur.desc] || [];
                prev[cur.desc].push(cur);
                return prev;
            }, {});
            Object.keys(obj).forEach((key) => {
                this.rank[key] = obj[key].reduce((prev, cur) => {
                    const targetLink = cur.link || "other";
                    prev[targetLink] = prev[targetLink] || [];
                    prev[targetLink].push(cur);
                    return prev;
                }, {});
            });
        },
        showItem(obj) {
            let _obj = {};
            const type = ["pve", "pvp", "vpk", "dbm", "other"];
            type.forEach((item) => {
                if (obj[item]) _obj[item] = obj[item];
            });
            return _obj;
        },
        playVideo(i) {
            this.index = i;
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/jx3dat/index.less";
</style>
