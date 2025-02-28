<template>
    <div class="m-arr">
        <span class="u-arr u-prev" @click="turn(0)" v-if="index > 1"></span>
        <span class="u-arr u-next" @click="turn(1)" v-if="index < len"></span>
    </div>
</template>
<script>
export default {
    name: "arr",
    props: ["len", "index"],

    data: function () {
        return {};
    },

    methods: {
        turn: function (direction) {
            this.$emit("toTurn", direction);
        },
    },
};
</script>

<style lang="less">
@import ".~@/assets/css/topic/cangjianshanzhuang/arr.less";
</style>
