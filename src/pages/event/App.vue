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
    export default {
        name: "App",
        components: { Index },
    };
</script>

<style lang="less">
    @import "~@/assets/css/event/app.less";
</style>
