<template>
    <div class="m-cangjian-weapon">
        <div
            class="u-box"
            :class="`u-box` + (i + 1)"
            v-for="(item, i) in type"
            :key="i"
            v-show="index == i + 1"
        >
            <img class="u-img p-animation fadeIn" :src="img_root + item + `.png`" />
            <img class="u-txt p-animation bounceIn" :src="img_root + item + `_txt.png`" />
        </div>
        <arr :len="len" :index="index" @toTurn="toTurn"></arr>
    </div>
</template>

<script>
import arr from "./arr.vue";
export default {
    name: "weapon",
    props: ["img_root"],
    components: { arr },
    data: function () {
        return {
            index: 1,
            len: 2,
            type: ["qingjian", "zhongjian"],
        };
    },

    methods: {
        toTurn(e) {
            if (e == 0) {
                this.index--;
            } else {
                this.index++;
            }
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>