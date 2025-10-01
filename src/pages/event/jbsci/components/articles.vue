<template>
    <div class="m-articles">
        <div class="m-filter">
            <h3>YEAR</h3>
            <div class="m-filter-list">
                <span
                    v-for="item in year"
                    :key="item"
                    :class="{ active: filter.year === item }"
                    @click="filter.year = item"
                >
                    {{ item }}
                </span>
            </div>
            <h3>SEASON</h3>
            <div class="m-filter-list">
                <a v-for="item in season" :key="item" @click="navigateToSeason(item)">
                    {{ item }}
                </a>
            </div>
        </div>
        <div class="m-content">
            <div :id="`m-season-${s}`" v-for="(season, s) in list" :key="s">
                <div class="m-content-header" v-if="seasons[filter.year] && seasons[filter.year][s]">
                    <img class="u-cover" :src="seasons[filter.year][s].img" />
                    <div class="m-content-title">
                        <h2>{{ seasons[filter.year][s].title }} SEASON {{ s }}</h2>
                        <h3>{{ seasons[filter.year][s].title }}年度 第{{ s }}季 期刊</h3>
                        <div class="u-desc">{{ seasons[filter.year][s].desc }}</div>
                    </div>
                </div>
                <div class="m-content-title">
                    <h2>ARTICLES</h2>
                    <h3>精选文章</h3>
                </div>

                <div class="m-content-list">
                    <div class="m-item" v-for="item in season" :key="item.id">
                        <a :href="showLink(item.link)" target="_blank" class="cover">
                            <img class="u-img" :src="showImg({ ...item, year: filter.year }) || ''" />
                            <i
                                class="u-mark"
                                :class="[`${item.type}`, { hasImg: item.img, coverYear: filter.year >= '2024' }]"
                                >{{ s }}</i
                            >
                            <div class="u-title" v-html="getCoverTitle(item.title)"></div>
                        </a>
                        <a :href="xfLink(item.color)" target="_blank" class="m-xf" v-if="showIcon(item.color)">
                            <img class="u-icon" :src="showIcon(item.color)" />
                            <span>{{ showXf(item.color) }}</span>
                        </a>
                        <div class="info">
                            <a :href="showLink(item.link)" target="_blank" class="u-title">
                                <span>{{ getTextTitle(item.desc) }}</span>
                                <img :src="`${__imgRoot}arr.svg`" />
                            </a>
                            <a :href="users[item.author].link" v-if="users[item.author]" class="u-author">
                                <user-avatar class="u-avatar" :src="users[item.author].avatar" :size="20" />
                                <span>{{ users[item.author].name }}</span>
                            </a>
                            <span class="u-desc">{{ getTextDesc(item.desc) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userAvatar from "@/components/event/avatar.vue";
import { getUsers } from "@/service/event/topic";
import { uniq, flatMapDeep, isObject, isArray, flatMap } from "lodash";
import { __cdn } from "@/utils/config";
import xf from "@jx3box/jx3box-data/data/xf/xf.json";
export default {
    name: "articles",
    props: ["data"],
    inject: ["__imgRoot"],
    components: { userAvatar },
    data: function () {
        return {
            sci: {},
            cover: {},
            seasons: {},
            year: [],
            filter: {
                year: null,
                season: 1,
            },
            users: {},
            xf,
            coverYear: false,
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function ({ sci, cover, season }) {
                if (sci) {
                    const list = this.resultArray(sci);
                    this.sci = sci;
                    this.seasons = season.reduce((acc, cur) => {
                        const { power, icon } = cur;
                        if (!acc[icon]) {
                            acc[icon] = {};
                        }
                        acc[icon][power] = cur;
                        return acc;
                    }, {});
                    this.cover = cover.reduce((acc, cur) => {
                        if (cur.icon && acc[cur.icon]) {
                            acc[cur.icon][cur.title] = cur.img;
                        } else {
                            acc[cur.icon] = {};
                        }
                        return acc;
                    }, {});
                    this.year = uniq(Object.keys(sci).sort((a, b) => b - a));
                    this.filter.year = this.queryYear || this.year[0];
                }
            },
        },
        season: {
            immediate: true,
            deep: true,
            handler: function (list) {
                if (list.length) this.filter.season = list[0];
            },
        },
        list: {
            immediate: true,
            deep: true,
            handler: function (sci) {
                this.loadUser(flatMap(sci));
            },
        },
    },
    computed: {
        queryYear() {
            return this.$route.query.year;
        },
        season() {
            return (this.sci[this.filter.year] && Object.keys(this.sci[this.filter.year]).sort((a, b) => a - b)) || [];
        },
        list() {
            return this.filter.year ? this.sci[~~this.filter.year] : {};
        },
    },
    methods: {
        loadUser(list) {
            if (!list) return;
            const users = uniq(list.map((item) => item.author).filter(Boolean)).join(",");
            users &&
                getUsers({ list: users }).then((res) => {
                    this.users = res.data.data.reduce((acc, cur) => {
                        acc[cur.ID] = {
                            name: cur.display_name,
                            avatar: cur.user_avatar,
                            link: "/author/" + cur.ID,
                        };
                        return acc;
                    }, {});
                });
        },
        resultArray(obj) {
            return (
                flatMapDeep(obj, (value) => {
                    if (isObject(value) && !isArray(value)) {
                        return flatMapDeep(value);
                    } else {
                        return value;
                    }
                }) || []
            );
        },

        activeXf(icon) {
            return Object.keys(this.xf).find((key) => key.includes(icon));
        },
        xfLink(icon) {
            return `/bps/?subtype=${this.activeXf(icon)}`;
        },
        showIcon(icon) {
            if (!icon) return;
            const id = this.activeXf(icon) ? this.xf[this.activeXf(icon)].id : "0";
            return id ? __cdn + "design/vector/mount/" + id + ".svg" : "";
        },
        showXf(icon) {
            return this.activeXf(icon) ? this.xf[this.activeXf(icon)].name : icon;
        },
        showImg({ type, img, year, bgcolor }) {
            if (img) return img;
            let cover = "";
            if (year <= 2023) {
                cover = this.cover["2023"][type];
                this.coverYear = false;
            } else {
                this.coverYear = true;
                const _cover = this.cover[this.filter.year];
                const school = (bgcolor && Object.keys(_cover).filter((item) => item.includes(bgcolor))[0]) || "通用";
                cover = _cover[school];
            }
            return cover;
        },
        showLink(link) {
            return "/" + link;
        },
        getCoverTitle(str) {
            return str?.replace(/\|/g, "<br/>") || "JBSCI";
        },
        getTextTitle(str) {
            return str?.split("|")?.[0] || "Unknown";
        },
        getTextDesc(str) {
            return str?.split("|")?.[1] || "Unknown";
        },
        navigateToSeason(item) {
            const targetElement = document.getElementById(`m-season-${item}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        },
    },
};
</script>
<style lang="less">
.m-articles {
    .pb(20px);
    .m-content {
        padding: 0 20px;
        &-list {
            margin: 20px 0 40px 0;
            .flex;
            flex-wrap: wrap;
            gap: 30px 20px;
            .m-item {
                .pr;
                .w(286px);
                box-sizing: border-box;

                .cover {
                    .pr;
                    .db;
                    .size(100%,300px);
                    &::before {
                        content: "";
                        .pa;
                        .lb(0);
                        .size(100%,230px);
                        background-color: rgba(0, 0, 0, 0.4);
                    }
                    .u-mark {
                        .pa;
                        .rt(10px);
                        .fz(38px,40px);
                        .size(40px);
                        .x;
                        font-style: normal;
                        color: #fff;
                        &.bbs {
                            background-color: #1b824a;
                        }
                        &.fb {
                            background-color: #2d2a3d;
                        }
                        &.tool {
                            background-color: #156772;
                        }
                        &.bps {
                            background-color: #9a305e;
                        }
                        &.macro {
                            background-color: #00b7c7;
                        }
                        &.pvp {
                            background-color: #b05600;
                        }
                        &.hasImg {
                            background: transparent;
                        }
                        &.coverYear {
                            .rt(12px,13px);
                            .fz(38px,45px);
                            .size(45px);
                            background: transparent;
                            border: 2px solid rgba(255, 255, 255, 0.6);
                        }
                    }

                    .u-title {
                        .pa;
                        .lb(0,10px);
                        .full;
                        .flex;
                        .fz(24px);
                        gap: 5px;
                        flex-direction: column;
                        padding: 120px 10px 0 10px;
                        box-sizing: border-box;
                        justify-content: flex-end;
                        color: #fff;
                        span:last-child {
                            .break(2);
                            .fz(18px);
                        }
                    }
                }
                .m-xf {
                    .pa;
                    .pointer;
                    .lt(10px,80px);
                    .flex;
                    .fz(20px);
                    align-items: center;
                    color: #fff;
                    gap: 3px;
                    user-select: none;
                    .u-icon {
                        .size(30px);
                        filter: invert(100%);
                    }
                }
                .info {
                    .fz(12px);
                    color: rgba(0, 0, 0, 0.6);
                    .u-title {
                        .w(100%);
                        .flex;
                        .fz(16px);
                        .color(#000);
                        gap: 10px;
                        justify-content: space-between;
                        padding: 10px 0;
                        align-items: center;
                        span {
                            .nobreak;
                        }
                    }
                    .u-author {
                        .flex;
                        gap: 3px;
                        align-items: center;
                        color: rgba(0, 0, 0, 0.6);
                    }
                    .u-desc {
                        .mt(10px);
                        .break(5);
                        //height: 52px;
                    }
                }
            }
        }

        &-header {
            .flex;
            .h(114px);
            gap: 20px;
            padding: 20px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            .m-content-title {
                h2 {
                    .fz(20px);
                }
                h3 {
                    .fz(13px);
                }
                .u-desc {
                    .mt(10px);
                    .fz(12px);
                    .break(3);
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
}
</style>
