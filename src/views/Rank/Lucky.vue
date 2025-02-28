<template>
    <div class="m-rank-info m-rank-lucky">
        <!-- gifts -->
        <div class="m-rank-txt" v-html="data"></div>
    </div>
</template>

<script>
export default {
    props: [],
    data: function() {
        return {};
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        data: function() {
            return this.$store.state.race.gifts;
        },
    },
    methods: {},
    filters: {},
    created: function() {},
    components: {},
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_info.less";
</style>
