<template>
    <div class="m-race-tab">
        <router-link
            :class="['u-item', active(key)]"
            :to="link(key)"
            v-for="(label, key) in visible_blocks"
            :key="key"
            >{{ label }}</router-link
        >
    </div>
</template>

<script>
import blocks from "@/assets/data/rank/blocks.json";
export default {
    props: ["data"],
    data: function () {
        return {};
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        key: function () {
            // return this.$route.matched[0]?.name;
            return this.$route.name;
        },
        visible_blocks: function () {
            let enabled_blocks = (this.data && this.data.blocks) || [];
            let tabs = {};
            enabled_blocks.forEach((item) => {
                tabs[item] = blocks[item];
            });
            return tabs;
        },
    },
    methods: {
        link: function (val) {
            return "/" + this.id + "/" + val;
        },
        active(key) {
            return key == this.key ? "active" : "";
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_tab.less";
</style>
