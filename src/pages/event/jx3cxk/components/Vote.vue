<template>
    <div class="m-content m-vote wp">
        <vote-item></vote-item>
    </div>
</template>
<script>
import voteItem from "./Item.vue";

export default {
    components: {
        voteItem,
    },
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
.m-content.m-vote {
    .r(48px);
    box-sizing: border-box;
    padding: 48px;
    background: rgba(59, 46, 70, 0.5);
    .flex;
    flex-wrap: wrap;
    gap: 28px;
}
</style>
