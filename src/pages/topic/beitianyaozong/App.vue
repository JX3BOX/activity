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
export default {
    name: "App",
    props: [],
    components: {},
    data: function() {
        return {};
    },
    computed: {
        page_name: function() {
            return this.$route.name;
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function() {
        postStat("topic", "beitianyaozong");
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "~@/assets/css/topic/beitianyaozong/common.less";
@import "~@/assets/css/topic/common/animation.less";
@import "~@/assets/css/topic/beitianyaozong/index.less";
</style>
