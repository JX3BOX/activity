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
                <h3>入选名单</h3>
            </div>
            <template v-for="(item, i) in list">
                <a
                    :href="users[item.author].link"
                    target="_blank"
                    class="m-content-item"
                    :key="i"
                    v-if="users[item.author]"
                >
                    <div class="m-info">
                        <user-avatar class="u-avatar" :src="users[item.author].avatar" :size="120" />
                        <div class="u-info">
                            <h4>
                                <span> {{ users[item.author].name }}</span>
                                <label>Join in {{ dataFormat(users[item.author].time) }}</label>
                            </h4>
                            <div class="u-sci">
                                <label>入围作品：</label>
                                <span>{{ item.desc || "暂无作品" }}</span>
                            </div>
                        </div>
                    </div>
                    <span class="u-desc">{{ item.title || "暂无介绍" }}</span>
                </a>
            </template>
        </div>
    </div>
</template>

<script>
import userAvatar from "@/components/event/avatar.vue";
import { uniq } from "lodash";
import { getUsers } from "@/service/event/topic";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { showDate } from "@jx3box/jx3box-common/js/moment";
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
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function (authors) {
                if (authors && authors.length) {
                    this.year = uniq(authors.map((item) => item.icon)).sort((a, b) => b - a);
                    this.authors = authors.reduce((acc, cur) => {
                        const { icon } = cur;
                        if (!acc[icon]) acc[icon] = [];
                        acc[icon].push(cur);
                        return acc;
                    }, {});
                    this.loadUser(authors);
                    this.active = this.queryYear || this.year[0];
                }
            },
        },
    },
    computed: {
        list() {
            return this.authors[this.active] || [];
        },
        queryYear() {
            return ~~this.$route.query.year;
        },
    },
    methods: {
        loadUser(list) {
            const users = uniq(list.map((item) => item.author).filter(Boolean)).join(",");
            users &&
                getUsers({ list: users }).then((res) => {
                    this.users = res.data.data.reduce((acc, cur) => {
                        acc[cur.ID] = {
                            name: cur.display_name,
                            avatar: cur.user_avatar,
                            link: "/author/" + cur.ID,
                            time: cur.user_registered,
                        };
                        return acc;
                    }, {});
                });
        },
        dataFormat(val) {
            return showDate(val);
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
            .fz(12px,20px);
            color: #000;
            width: calc(50% - 10px);
            .m-info {
                .flex;
                box-sizing: border-box;
                border-right: 4px solid #ba9624;
                gap: 10px;
                background: rgba(0, 0, 0, 0.02);
                .u-avatar {
                    flex-shrink: 0;
                }
                .u-info {
                    .flex;
                    padding: 10px 0;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box;
                    label,
                    span {
                        .db;
                    }
                    label {
                        .tm(0.4);
                    }
                    span {
                        .tm(1);
                    }
                    h4 span {
                        .fz(16px);
                    }
                }
            }
            .u-desc {
                .mt(20px);
                .tm(0.6);
                .break(2);
                height: 40px;
                .none;
            }
        }
    }
}
</style>
