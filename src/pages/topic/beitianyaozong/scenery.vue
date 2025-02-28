<template>
    <div class="m-yaozong-scenery">
        <span class="u-next" @click="turn"></span>
    </div>
</template>

<script>
export default {
    name: "scenery",
    props: ["img_root", "index"],
    components: {},
    data: function () {
        return {
            bgIndex: this.index,
            len: 5,
        };
    },
    computed: {},
    watch: {},
    methods: {
        turn: function () {
            this.bgIndex++;
            if (this.bgIndex > this.len) {
                this.bgIndex = 1;
            }
            this.$emit("changeBg", this.bgIndex, "scenery");
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>