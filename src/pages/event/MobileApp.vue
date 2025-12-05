<template>
    <div id="app">
        <Header></Header>
        <div class="p-topic-container_mobile">
            <Index />
        </div>
        <!-- <Footer class="p-topic-footer"></Footer> -->
    </div>
</template>

<script>
import Index from "@/components/event/mobile/Index.vue";
export default {
    name: "App",
    components: { Index },
};
</script>

<style lang="less">
.v-miniprogram {
    body {
        height: 100vh;
        width: 100vw;
    }

    .c-header {
        display: none;
    }

    .p-topic-container_mobile {
        height: 100vh;
        background-color: #ffffff;
    }
}
</style>
