<template>
    <div class="m-index m-xuanfuleidong">
        <div class="m-kv">
            <img :src="`${__imgRoot}kv.jpg`" alt="玄府雷动" />
            <div class="m-title">
                <img :src="`${__imgRoot}title.png`" alt="玩法创意大赛" />
                <img :src="`${__imgRoot}no${index}.png`" class="u-no" :alt="`第${index}届`" />
                <p class="u-desc">
                    侠影开新境，巧思妙笔神。至微至玄、不可察之空隙，亦能震荡躁动，声势若雷鸣，名曰玄府雷动。<br />
                    侠士是江湖最微小的构成点，是否也心有丘壑，意蕴磅礴，遂于一瞬，巧思如泉涌，欲为江湖开辟新局、创作出新鲜的玩法呢？<br />
                    快拿起手中的生花妙笔，祝侠士奇思异想如潮生，同品江湖新章！
                    <span class="u-desc-shadow">
                        侠影开新境，巧思妙笔神。至微至玄、不可察之空隙，亦能震荡躁动，声势若雷鸣，名曰玄府雷动。<br />
                        侠士是江湖最微小的构成点，是否也心有丘壑，意蕴磅礴，遂于一瞬，巧思如泉涌，欲为江湖开辟新局、创作出新鲜的玩法呢？<br />
                        快拿起手中的生花妙笔，祝侠士奇思异想如潮生，同品江湖新章！
                    </span>
                </p>
            </div>
        </div>
        <div class="m-tabs">
            <div
                v-for="(item, i) in tabs"
                :key="i"
                :class="[{ active: item.key == key }, [`u-tab-0${i + 1}`]]"
                @click="handleTabClick(item.key)"
            ></div>
        </div>
        <div class="m-content">
            <div class="u-start"></div>
            <img :src="`${__imgRoot}end.png`" class="u-axis" />
            <!-- 详细内容 -->
            <component class="m-info" :is="active" />
            <img :src="`${__imgRoot}end.png`" class="u-axis" />
        </div>
    </div>
</template>
<script>
import introduction from "./components/introduction.vue";
import vote from "./components/vote.vue";
import winner from "./components/winner.vue";
export default {
    name: "Index",
    inject: ["__imgRoot"],
    components: {
        introduction,
        vote,
        winner,
    },
    data: function () {
        return {
            index: 1,
            key: "vote",
            tabs: [
                { name: "活动介绍", key: "introduction", component: introduction },
                { name: "玩法投票", key: "vote", component: vote },
                { name: "获奖作品", key: "winner", component: winner },
            ],
        };
    },

    computed: {
        active() {
            return this.tabs.find((item) => item.key == this.key).component;
        },
    },
    watch: {},
    methods: {
        handleTabClick(key) {
            this.key = key;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/xuanfuleidong/index.less";
</style>
