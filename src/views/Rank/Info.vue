<template>
    <!-- 活动规则与奖励设置 -->
    <div class="m-rank-info">
        <TimeLine :html="times" v-if="times" />
        <div class="m-rank-btns">
            <a class="u-btn u-btn-join" href="/rank/#/join" :target="linkTarget" rel="noopener"></a>
            <!-- <a class="u-btn u-btn-lucky" href="/fb" :target="linkTarget" rel="noopener">副本开荒攻略</a> -->
            <a class="u-btn u-btn-weal" href="/rank/#/surprise" :target="linkTarget" rel="noopener"></a>
        </div>
        <div class="m-rank-txt" v-html="desc"></div>
    </div>
</template>

<script>
import { isApp } from "@/utils/env";
import { __imgPath } from "@/utils/config";
import TimeLine from "@/components/rank/time_line.vue";
export default {
    components: {
        TimeLine,
    },
    data: function () {
        return {
            timelineArrow: __imgPath + "image/rank/common/timeline_arrow.svg",
        };
    },
    computed: {
        linkTarget() {
            return isApp() ? "_self" : "_blank";
        },
        id: function () {
            return this.$store.state.id;
        },
        desc: function () {
            return this.$store.state.race.desc;
        },
        times() {
            const timeline = this.$store.state.race?.timeline || [];
            return timeline
                .map(
                    (item) => `
                        <li>
                            <span class="u-time">${item.time}</span>
                            <span class="u-label">${item.text}</span>
                        </li>
                    `
                )
                .join("");
        },
    },
    methods: {
        timeShaftChange(type) {
            if (type == "next") {
                this.$refs.timeShaftSwiperRef.swiper.slideNext();
            } else if (type == "prev") {
                this.$refs.timeShaftSwiperRef.swiper.slidePrev();
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/race_info.less";
.m-rank-info .w-time-line-box h2 {
    margin: 0;
}
.m-rank-btns {
    .flex;
    flex-direction: column;
    .flex(o);
}
</style>
