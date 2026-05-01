<template>
    <div id="app" class="p-topic">
        <CommonHeader></CommonHeader>
        <div class="p-topic-container_mobile">
            <Index />
        </div>
        <!-- <Footer class="p-topic-footer"></Footer> -->
    </div>
</template>

<script>
import Index from "./components/Mobile.vue";
export default {
    name: "App",
    components: { Index },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/app.less";
html.v-miniprogram,
html.v-miniprogram body,
html.v-miniprogram #app {
    width: 100vw;
    min-width: 0;
    overflow: hidden;
}

.v-miniprogram {
    .c-header {
        display: none;
    }

    .p-topic-container_mobile {
        height: 100vh;
        // background-color: #ffffff;
    }
}
</style>
