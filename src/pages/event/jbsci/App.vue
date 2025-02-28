<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import Footer from "./components/footer.vue";
export default {
    name: "App",
    data: function () {
        return {};
    },
    components: { Footer },
    provide: {
        __imgRoot: __imgPath + "topic/jbsci/",
    },
    computed: {
        page_name: function () {
            return this.$route.name;
        },
    },
    created: function () {
        postStat("event", "jbsci");
    },
};
</script>
