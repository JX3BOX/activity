<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <Header :overlayEnable="true"></Header>
        <router-view></router-view>
        <Footer darkMode></Footer>
    </div>
</template>

<script>
    import { postStat } from "@jx3box/jx3box-common/js/stat";
    import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
    export default {
        name: "App",
        data: function () {
            return {};
        },
        provide: {
            // TODO: 修改图片对应的文件夹名称
            __imgRoot: __imgPath + "topic/demo/",
        },
        computed: {
            page_name: function () {
                return this.$route.name;
            },
        },
        created: function () {
            // TODO: 修改对应的项目名称
            postStat("event", "demo");
        },
    };
</script>
