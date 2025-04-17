<template>
    <!-- 专题页 -->
    <div class="p-topic" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <router-view></router-view>
        <div class="p-topic-footer">
            <div class="wp">
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "App",
    props: [],
    components: {},
    data: function () {
        return {};
    },
    provide: {
        __imgRoot: __cdn + "design/topic/silufengyu/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {
        postStat("topic", "silufengyu");
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/topic/common/common.less";
</style>
