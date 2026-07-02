<template>
    <div class="m-superstar-boss">
        <div
            class="u-boss"
            :class="bossId == aid ? 'active' : ''"
            v-for="(label, aid) of boss"
            :key="aid"
            @click="changeBoss(aid)"
        >
            <img :src="bossIcon(aid)" :alt="boss.name" @error="handleImgError" />
            <span class="u-boss-name">{{ label }}</span>
        </div>
    </div>
</template>

<script>
import PICS from "@/assets/js/pics.js";
export default {
    props: {
        boss: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    computed: {
        bossId() {
            return this.$store.state.bossID;
        },
    },
    methods: {
        bossIcon(val) {
            return PICS.superBoss(val);
        },
        handleImgError(e) {
            e.target.src = "https://cdn.jx3box.com/design/event/superstar/Boss/0.png";
        },
        changeBoss(val) {
            this.$store.state.bossID = val;
            this.$router.push({
                name: this.$route.name,
                params: this.$route.params,
                query: {
                    ...this.$route.query,
                    aid: val,
                },
            });
        },
    },
};
</script>
