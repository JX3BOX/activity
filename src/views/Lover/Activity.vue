<template>
    <div class="m-lover-page m-lover-activity wp">
        <div class="m-lover-box">
            <div v-html="note"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoverActivity",
    inject: ["__imgRoot"],
    data: function () {
        return {};
    },
    computed: {
        note() {
            return this.$store.state.info.note;
        },
    },
    methods: {},
};
</script>
