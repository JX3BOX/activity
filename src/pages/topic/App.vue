<template>
    <div id="app">
        <CommonHeader></CommonHeader>
        <div class="p-topic-container">
            <Index />
        </div>
        <Footer class="p-topic-footer"></Footer>
    </div>
</template>

<script>
import Index from "@/components/topic/index/Index.vue";
export default {
    name: "App",
    components: { Index },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/index/index.less";
</style>
