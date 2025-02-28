<template>
    <div class="m-yaozong-equip">
        <span class="u-next" @click="turn"></span>
        <img :src="img" :class="[`img` + index, show ? 'p-animations fadeIn' : '']" />
    </div>
</template>

<script>
export default {
    name: "equip",
    props: ["img_root"],
    components: {},
    data: function () {
        return {
            index: 1,
            len: 4,
            show: true,
        };
    },
    computed: {
        img: function () {
            return this.img_root + `yh` + this.index + `.png`;
        },
    },
    watch: {},
    methods: {
        turn: function () {
            this.show = false;
            setTimeout(() => {
                this.show = true;
            }, 10);
            this.index++;
            if (this.index > this.len) {
                this.index = 1;
            }
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>