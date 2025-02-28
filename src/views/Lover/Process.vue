<template>
    <div class="m-lover-process">
        <div class="u-page-title">
            <img class="u-img" :src="`${__imgRoot}process-title.png`" />
        </div>
        <LoverSteps :steps="steps" :data="teams" />
    </div>
</template>

<script>
import LoverSteps from "@/components/rank/lover/steps.vue";
import { getLoverProgress } from "@/service/rank/lover";
export default {
    name: "LoverProcess",
    inject: ["__imgRoot"],
    components: { LoverSteps },
    data: function () {
        return {
            steps: [],
            teams: [],
            process: {},
        };
    },
    computed: {
        limit() {
            return this.$store.state.info.join_limit;
        },
        loverId() {
            return this.$store.state.loverId;
        },
        params() {
            return {
                event_id: this.loverId,
                round: -1,
                pair: -1,
            };
        },
    },
    watch: {
        limit: {
            handler: function (number) {
                number && this.getStep(number);
            },
            immediate: true,
        },
    },
    methods: {
        getStep(number) {
            let steps = [];
            while (number > 1) {
                number /= 2;
                steps.push(number);
            }
            this.steps = steps.concat(0);
        },
        load() {
            getLoverProgress(this.params).then((res) => {
                this.teams = res.data.data || [];
            });
        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/rank/lover/process.less";
</style>
