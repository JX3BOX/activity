<template>
    <div class="m-yaozong-skill">
        <div class="u-tab">
            <img :src="img_root + `zhaoshi.png`" class="u-logo" />
            <span
                v-for="(item, i) in tab"
                :key="item"
                :class="[item, i == index ? 'active' : '']"
                @click="changeTab(i)"
            ></span>
        </div>
        <div class="u-cont">
            <span class="u-prev" @click="turn()" v-show="contIndex > 1"></span>
            <span class="u-next" @click="turn(true)" v-show="contIndex < len"></span>
            <img :src="contImg" :class="animation ? 'p-animation fadeIn' : ''" />
        </div>
    </div>
</template>

<script>
export default {
    name: "skill",
    props: ["img_root"],
    components: {},
    data: function () {
        return {
            animation: true,
            index: 0,
            contIndex: 1,
            tab: ["lingsu", "tongyong", "wufang"],
        };
    },
    computed: {
        contImg() {
            return (
                this.img_root +
                "/" +
                this.tab[this.index] +
                "/" +
                this.contIndex +
                ".png"
            );
        },
        len() {
            if (this.index == 1) return 5;
            if (this.index == 2) return 8;
            return 7;
        },
    },
    watch: {},
    methods: {
        changeTab(i) {
            this.index = i;
            this.contIndex = 1;
        },
        turn: function (direction) {
            this.animation = false;
            setTimeout(() => {
                this.animation = true;
            }, 10);
            if (direction) {
                this.contIndex++;
            } else {
                this.contIndex--;
            }
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>