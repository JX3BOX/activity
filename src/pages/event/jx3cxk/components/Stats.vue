<template>
    <div class="m-content m-stats wp">
        <template v-if="hasList">
            <div class="m-list m-top-list">
                <img class="u-title" :src="`${imgRoot}web/item/good1.png`" />
                <vote-item class="m-show-item" v-for="item in topList" :key="item.id" :data="item"></vote-item>
            </div>
            <div class="m-list m-other-list">
                <img class="u-title" :src="`${imgRoot}web/item/good2.png`" />
                <vote-item class="m-show-item" v-for="item in otherList" :key="item.id" :data="item"></vote-item>
            </div>
        </template>
        <div class="m-list" v-else>
            <img class="u-null" :src="`${imgRoot}web/item/null.png`" />
        </div>
    </div>
</template>
<script>
import voteItem from "./Item.vue";
export default {
    inject: ["__imgRoot"],
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        voteItem,
    },
    computed: {
        imgRoot() {
            return this.__imgRoot;
        },
        topList() {
            return this.list[0] || [];
        },
        otherList() {
            return this.list[1] || [];
        },
        hasList() {
            return this.topList.length && this.otherList.length;
        },
    },
    methods: {},
    mounted() {},
};
</script>
<style lang="less" scoped>
.m-content.m-stats {
    .m-list {
        .pr;
        .flex;
        .r(48px);
        .mt(240px);
        padding: 74px 67px 64px 67px;
        flex-wrap: wrap;
        background: linear-gradient(180deg, rgba(69, 50, 85, 0.5) 0%, rgba(179, 133, 209, 0.5) 99%);
        box-sizing: border-box;
        border: 3px solid rgba(255, 255, 255, 0.6);
        &.m-top-list {
            justify-content: center;
        }
        .u-title {
            .pa;
            .lt(50%,-42px);
            .ml(-255px);
            height: 84px;
        }
        .u-null {
            .auto(x);
            .mb(40px);
            height: 562px;
        }
    }
}
</style>
