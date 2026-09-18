<template>
    <div ref="tabs" class="m-race-tab">
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
        ensureActiveVisible() {
            const container = this.$refs.tabs;
            const isAppMode = document.documentElement.classList.contains("v-app");
            if (!container || !isAppMode) return;

            const activeItem = container.querySelector(".u-item.active");
            if (!activeItem) return;

            const targetLeft = activeItem.offsetLeft - (container.clientWidth - activeItem.offsetWidth) / 2;
            const maxLeft = container.scrollWidth - container.clientWidth;
            const left = Math.max(0, Math.min(targetLeft, maxLeft));

            if (typeof container.scrollTo === "function") {
                container.scrollTo({ left, behavior: "smooth" });
            } else {
                container.scrollLeft = left;
            }
        },
    },
    watch: {
        "$route.fullPath"() {
            this.$nextTick(() => this.ensureActiveVisible());
        },
        visible_blocks() {
            // 切换版本后，若当前激活 tab 在新版本中不存在，自动回退到"活动介绍"
            const current = this.$route.name;
            // 团队详情是由榜单条目进入的辅助页，不会出现在顶部 Tab 列表中。
            const nonTabRoutes = ["team-detail"];
            if (current && !(current in this.visible_blocks) && !nonTabRoutes.includes(current)) {
                this.$router.replace("/" + this.id + "/info");
                return;
            }
            this.$nextTick(() => this.ensureActiveVisible());
        },
    },
    mounted() {
        this.ensureActiveVisible();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_tab.less";
</style>
