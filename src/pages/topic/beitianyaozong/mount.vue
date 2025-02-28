<template>
    <div class="m-yaozong-mount">
        <span class="u-prev" @click="turn()" v-show="index > 1"></span>
        <span class="u-next" @click="turn(true)" v-show="index < len"></span>
        <div class="u-item">
            <div class="u-logo">
                <img :src="img_root + 'xinfa.png'" />
                <img
                    :src="imgIcon"
                    v-if="index > 1"
                    class="u-icon"
                    :class="show ? 'p-animation flipInY' : ''"
                />
            </div>

            <img :src="mountText" class="u-text" :class="show ? 'p-animation fadeInDown' : ''" />
            <a
                href="/bps/#/?subtype=无方"
                target="_blank"
                class="u-btn u-wufang"
                :class="show ? 'p-animation fadeInLeft' : ''"
                v-if="index == 1"
            ></a>
            <a
                href="/bps/#/?subtype=灵素"
                target="_blank"
                class="u-btn u-lingsu"
                :class="show ? 'p-animation fadeInRight' : ''"
                v-if="index == 1"
            ></a>
            <a
                href="/macro/#/?subtype=无方"
                target="_blank"
                class="u-btn u-yaozong"
                :class="show ? 'p-animation fadeInUp' : ''"
                v-else
            ></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "mount",
    props: ["img_root"],
    data: function () {
        return {
            len: 5,
            index: 1,
            show: true,
        };
    },
    computed: {
        imgIcon: function () {
            return this.img_root + "icon" + (this.index - 1) + ".png";
        },
        mountText: function () {
            return this.img_root + "xinfa" + this.index + ".png";
        },
    },
    watch: {},
    methods: {
        turn: function (direction) {
            this.show = false;
            setTimeout(() => {
                this.show = true;
            }, 10);
            if (direction) {
                this.index++;
            } else {
                this.index--;
            }
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>