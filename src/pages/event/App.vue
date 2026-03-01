<template>
    <div id="app">
        <Header></Header>
        <div class="p-event-container">
            <Index />
        </div>
        <Footer class="p-event-footer" darkMode></Footer>
    </div>
</template>

<script>
import Index from "@/components/event/index/Index.vue";
import { isApp } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    components: { Index },
    created() {
        isApp() && localStorage.setItem("__env", "app");
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/app.less";
</style>
