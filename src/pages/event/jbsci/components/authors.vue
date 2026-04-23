<template>
    <div class="m-authors">
        <div class="m-filter">
            <h3>YEAR</h3>
            <div class="m-filter-list">
                <span v-for="item in year" :key="item" :class="{ active: active === item }" @click="active = item">
                    {{ item }}
                </span>
            </div>
        </div>
        <div class="m-content" v-loading="loading">
            <div class="m-content-title">
                <h2>AUTHORS</h2>
                <h3>签约名单</h3>
            </div>

            <a :href="getLink(item)" target="_blank" class="m-content-item" v-for="(item, i) in list" :key="i">
                <div class="m-info" :class="{ sign: getUser(item).sign }">
                    <user-avatar class="u-avatar" :src="getUser(item).avatar" :size="60" />
                    <div class="u-info">
                        <span>{{ getName(item) }}</span>
                        <p v-if="isDirectMode && item.desc" class="u-desc">{{ item.desc }}</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import userAvatar from "@/components/event/avatar.vue";
import { uniq } from "lodash";
import { getUsers } from "@/service/event/topic";
import { __Root } from "@/utils/config";

export default {
    name: "authors",
    props: ["data"],
    components: { userAvatar },
    data: function () {
        return {
            authors: {},
            year: [],
            active: "",
            users: {},
            loading: false,
            isDirectMode: false,
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function (authors) {
                if (!(authors && authors.length)) return;

                this.isDirectMode = authors.some((item) => item.author && item.icon);

                if (this.isDirectMode) {
                    this.year = uniq(authors.map((item) => Number(item.icon)).filter(Boolean)).sort((a, b) => b - a);
                    this.authors = authors.reduce((prev, cur) => {
                        const year = Number(cur.icon);
                        if (!year) return prev;
                        if (!prev[year]) prev[year] = [];
                        prev[year].push(cur);
                        return prev;
                    }, {});

                    const list = uniq(authors.map((item) => item.author).filter(Boolean)).join(",");
                    this.loadUsers(list);
                } else {
                    this.year = uniq(authors.map((item) => item.title)).sort((a, b) => b - a);
                    this.authors = authors.reduce((prev, cur) => {
                        const { title, desc } = cur;
                        if (!prev[title]) prev[title] = "";
                        prev[title] = desc;
                        return prev;
                    }, {});
                }
            },
        },
        year: {
            immediate: true,
            handler: function (arr) {
                if (arr.length) {
                    this.active = this.queryYear || this.year[0];
                }
            },
        },
        active: {
            immediate: true,
            handler: function (year) {
                this.loadData(year);
            },
        },
    },
    computed: {
        list() {
            if (this.isDirectMode) {
                return this.authors[this.active] || [];
            }
            return this.users[this.active] || [];
        },
        queryYear() {
            return ~~this.$route.query.year;
        },
    },
    methods: {
        async loadData(year) {
            if (this.isDirectMode) return;

            const str = this.authors[year];
            if (str && !this.users[year]?.length) {
                this.loading = true;
                this.loadUser(str)
                    .then((data) => {
                        this.users = {
                            ...this.users,
                            [year]: data || [],
                        };
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        loadUsers(list) {
            if (!list) return;

            this.loading = true;
            getUsers({ list })
                .then((res) => {
                    this.users = (res.data.data || []).reduce((acc, cur) => {
                        acc[cur.ID] = {
                            name: cur.display_name,
                            avatar: cur.user_avatar,
                            link: "/author/" + cur.ID,
                            sign: cur.sign,
                        };
                        return acc;
                    }, {});
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadUser(list) {
            const res = await getUsers({ list });
            const id_list = list.split(",").map((item) => ~~item);
            const info_list = res.data.data || [];
            const data = [];

            for (const item of id_list) {
                for (const u of info_list) {
                    if (u.ID == item) {
                        data.push({
                            author: u.ID,
                            name: u.display_name,
                            avatar: u.user_avatar,
                            link: "/author/" + u.ID,
                            sign: u.sign,
                        });
                    }
                }
            }

            return data;
        },
        getUser(item) {
            return this.users[item.author] || item;
        },
        getName(item) {
            return this.getUser(item).name || item.title || "";
        },
        getLink(item) {
            return this.getUser(item).link || item.link || `${__Root}author/${item.author || ""}`;
        },
    },
};
</script>
<style lang="less">
.m-authors {
    .pb(20px);
    .el-avatar--circle {
        .r(0);
    }
    .m-content {
        .flex;
        padding: 20px;
        flex-wrap: wrap;
        gap: 20px;
        box-sizing: border-box;

        &-item {
            .fz(16px,60px);
            color: rgba(0, 0, 0, 0.9);
            width: calc(33% - 11px);
            .m-info {
                .flex;
                box-sizing: border-box;
                border-right: 4px solid #aaa;
                gap: 10px;
                background: rgba(0, 0, 0, 0.02);
                .u-avatar {
                    flex-shrink: 0;
                }
                .u-info {
                    // padding: 10px 0;
                    overflow: hidden;
                }
                .u-desc {
                    .fz(12px,20px);
                    margin-top: 4px;
                    color: rgba(0, 0, 0, 0.6);
                    .break(2);
                }
                &.sign {
                    border-right: 4px solid #ba9624;
                    background: url(../../../../assets/img/event/vip.png) no-repeat center right;
                    background-size: cover;
                }
            }
        }
    }
}
</style>
