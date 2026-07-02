<template>
    <div class="m-introduce">
        <template v-if="superstar_desc">
            <div class="u-content">
                <div class="u-info" v-html="superstar_desc"></div>
            </div>
            <img :src="imgUrl + 'bg01-1.png'" class="u-bg-top" />
            <img :src="imgUrl + 'bg01-3.png'" class="u-bg-bottom" />
        </template>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            imgUrl: "https://cdn.jx3box.com/design/event/superstar/",
        };
    },
    computed: {
        id: function () {
            return this.$store.state.id;
        },
        superstar_desc: function () {
            return this.$store.state.race.superstar_desc;
        },
    },
};
</script>
