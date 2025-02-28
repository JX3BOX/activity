<template>
    <div class="m-topic-text-list m-topic-text-list-y">
        <ul class="u-list" v-if="list && list.length">
            <li class="u-item" v-for="(item,i) in list" :key="i">
                <a class="u-link" :href="item.link" target="_blank" :style="linkstyle">
                    <span
                        class="u-title"
                        :style="{color:item.color,'font-weight':~~item.icon ? 'bold':'normal'}"
                    >{{item.title}}</span>
                    <span
                        class="u-date"
                        v-if="withDate"
                    >{{(item.time || item.updated_at) | formatDate}}</span>
                    <span class="u-author" v-if="withAuthor">{{item.author}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { simpledate } from "@/utils/simpledate.js";
export default {
    name: "TopicTextListY",
    props: ["data", "withDate", "length", "withAuthor"],
    components: {},
    data: function () {
        return {};
    },
    computed: {
        list: function () {
            let data = this.data || [];
            if (this.length) {
                data = data.slice(0, this.length);
            }
            if (this.withDate) {
                data = data.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });
            }
            return data;
        },
        linkstyle: function () {
            if (this.withDate || this.withAuthor) {
                return "padding-right:80px;";
            } else {
                return "";
            }
        },
    },
    watch: {},
    methods: {},
    filters: {
        formatDate: function (val) {
            return simpledate(val);
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.m-topic-text-list {
    .u-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .u-item {
        border-bottom: 1px solid #eee;
        &:last-child {
            border-bottom: none;
        }
    }
    .u-link {
        color: @color;
        padding: 2px 0;
        // display: flex;
        // justify-content: space-between;
        &:hover .u-title {
            color: @color-link;
        }
        .pr;
        .db;
    }
    @h: 34px;
    .u-title {
        .db;
        .nobreak;
        .fz(14px,@h);
    }
    .u-author,
    .u-date {
        .pa;
        .rt(0);
    }
    .u-author,
    .u-date {
        .fz(12px,@h);
        color: #888;
    }
}
</style>