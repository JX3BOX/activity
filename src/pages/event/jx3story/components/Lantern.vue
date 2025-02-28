<template>
    <router-link class="lantern" :to="to" :style="positionStyle">
        <img class="lantern__image" :src="lanternImage" :alt="alt" />
        <img class="lantern__text" :src="textImage" :alt="textAlt" />
    </router-link>
</template>

<script>
export default {
    name: "Lantern",
    inject: ["__imgRoot"],
    props: {
        to: {
            type: String,
            required: true,
        },
        top: {
            type: [Number, String],
            required: true,
        },
        left: {
            type: [Number, String],
            required: true,
        },
        lanternPath: {
            type: String,
            required: true,
        },
        textPath: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: "灯笼",
        },
        textAlt: {
            type: String,
            default: "文字",
        },
    },
    computed: {
        positionStyle() {
            return {
                top: typeof this.top === "number" ? `${this.top}px` : this.top,
                left: typeof this.left === "number" ? `${this.left}px` : this.left,
            };
        },
        lanternImage() {
            return this.__imgRoot + this.lanternPath;
        },
        textImage() {
            return this.__imgRoot + this.textPath;
        },
    },
};
</script>

<style lang="less">
.lantern-group {
    position: fixed;
    left: 0;
    top: 60px;
    width: 300px;
    height: 640px;
}
.lantern {
    position: absolute;
    cursor: pointer;

    &:hover .lantern__text {
        transform: translate(-50%, -50%) scale(1.2);
    }
}
.lantern__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    transition: transform 0.3s ease;
}
.lantern__image {
    display: block;
}
</style>
