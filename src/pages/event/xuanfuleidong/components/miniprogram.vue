<template>
    <div class="m-miniprogram">
        <template v-if="isOne">
            <div class="m-one" @click="isOne = false">
                <div class="u-desc" v-html="data.descHtml"></div>
                <div class="u-button">
                    <img :src="`${__imgRoot}mini-enter.png`" class="u-enter" />
                </div>
            </div>
        </template>

        <div class="m-two" v-else>
            <div class="m-tabs">
                <div
                    v-for="(item, i) in data.tabs"
                    :key="i"
                    :class="[{ active: item.key == key }, [`u-tab-0${i + 1} u-tab-item`]]"
                    @click="handleTabClick(item.key)"
                ></div>
            </div>
            <div class="m-content">
                <img :src="`${__imgRoot}end.png`" class="u-axis" />
                <!-- 详细内容 -->
                <component class="m-info" :is="active" :list="componentData" />
                <img :src="`${__imgRoot}end.png`" class="u-axis" />
            </div>
        </div>
    </div>
</template>
<script>
import introduction from "./introduction.vue";
import vote from "./vote.vue";
import winner from "./winner.vue";
export default {
    name: "Miniprogram",
    inject: ["__imgRoot"],
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    components: { introduction, vote, winner },
    data: function () {
        return {
            isOne: true,
            key: "introduction",
        };
    },
    computed: {
        active() {
            return this.data.tabs.find((item) => item.key == this.key).component;
        },
        componentData() {
            return this.key == "winner" ? this.data.winList : this.data.list;
        },
    },
    methods: {
        handleTabClick(key) {
            this.key = key;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/event/xuanfuleidong/miniProgram.less";
</style>
