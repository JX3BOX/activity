<template>
    <div class="c-midAutumn-nav">
        <div class="m-midAutumn-nav" :class="`m-midAutumn-nav-${i}`" v-for="i in 2" :key="i">
            <div class="u-title">
                <img :src="`${__imgRoot}menu.png`" />
            </div>

            <div class="u-date">
                <span>2</span>
                <span>0</span>
                <span>2</span>
                <span>4</span>
            </div>

            <div class="u-nav-box">
                <div
                    class="u-nav-item"
                    :class="{ active: achieve_id == item.value }"
                    v-for="item in navs"
                    :key="item.value"
                    @click="navChange(item.value)"
                >
                    {{ item.text }}
                </div>
                <div class="u-select-poem" v-show="poemName">《{{ poemName }}》</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        poemName: {
            type: String,
            default: "",
        },
    },
    inject: ["__imgRoot"],
    components: {},
    data() {
        return {
            achieve_id: 1,
            navs: [
                { text: "活动介绍", value: 1 },
                { text: "诗词赏析", value: 2 },
                // { text: "往届作品", value: 3 },
            ],
        };
    },
    watch: {
        "$route.query": {
            handler: function (val) {
                if (val.a) {
                    this.achieve_id = val.a;
                }
            },
            immediate: true,
        },
    },
    created() {},
    mounted() {},
    methods: {
        navChange(val) {
            this.$emit("navChange", val);
            this.$router.push({
                query: {
                    a: val,
                },
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/midautumn/v2/nav.less";
</style>
