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
        <div class="m-content">
            <div class="m-content-title">
                <h2>AUTHORS</h2>
                <h3>签约名单</h3>
            </div>

            <a :href="item.link" target="_blank" class="m-content-item" v-for="(item, i) in users[active]" :key="i">
                <div class="m-info" :class="{ sign: item.sign }">
                    <user-avatar class="u-avatar" :src="item.avatar" :size="60" />
                    <div class="u-info">
                        <h4>
                            <span> {{ item.name }}</span>
                        </h4>
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
import { showDate } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "authors",
    props: ["data"],
    components: { userAvatar },
    data: function () {
        return {
            authors: {},
            author_list: {},
            year: [],
            active: "",
            users: {},
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: async function (authors) {
                if (authors && authors.length) {
                    this.year = uniq(authors.map((item) => item.title)).sort((a, b) => b - a);
                    this.authors = authors.reduce((prev, cur) => {
                        const { title, desc } = cur;
                        if (!prev[title]) {
                            prev[title] = "";
                        }
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
                    this.active = this.year[0];
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
        queryYear() {
            return ~~this.$route.query.year;
        },
    },
    methods: {
        async loadData(year) {
            const str = this.authors[year];
            if (str && !this.users[year]?.length) {
                const data = await this.loadUser(str);
                this.$set(this.users, year, data || []);
            }
        },
        async loadUser(list) {
            const res = await getUsers({ list });
            const _list = res.data.data || [];
            const data = _list.map((item) => {
                return {
                    author: item.ID,
                    name: item.display_name,
                    avatar: item.user_avatar,
                    link: "/author/" + item.ID,
                    sign: item.sign,
                };
            });
            return data;
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
