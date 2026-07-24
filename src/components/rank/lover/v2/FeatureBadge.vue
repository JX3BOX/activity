<template>
    <div class="c-lover-feature-badge" :class="{ 'is-small': small }">
        <img :src="src" :alt="alt" />
    </div>
</template>

<script>
const icons = {
    lover: require("@/assets/img/lover/v2/icons/lover.webp"),
    mate: require("@/assets/img/lover/v2/icons/mate.webp"),
    solo: require("@/assets/img/lover/v2/icons/solo.webp"),
    invitation: require("@/assets/img/lover/v2/icons/invitation.webp"),
    team: require("@/assets/img/lover/v2/icons/team.webp"),
    "solo-draw": require("@/assets/img/lover/v2/icons/solo-draw.webp"),
    schedule: require("@/assets/img/lover/v2/icons/schedule.webp"),
    "match-config": require("@/assets/img/lover/v2/icons/match-config.webp"),
    "destiny-card": require("@/assets/img/lover/v2/icons/destiny-card.webp"),
};

export default {
    name: "LoverV2FeatureBadge",
    props: {
        name: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: "",
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        src() {
            return icons[this.name];
        },
    },
};
</script>

<style scoped lang="less">
.c-lover-feature-badge {
    display: inline-flex;
    width: 112px;
    height: 112px;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 10px 18px rgba(100, 43, 35, 0.2));
    }

    &.is-small {
        width: 72px;
        height: 72px;
    }
}
</style>
