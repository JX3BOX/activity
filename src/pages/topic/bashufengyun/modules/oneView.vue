<template>
    <div class="m-one" :style="{ minHeight: height }" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
        <img class="u-box-logo p-animation fadeIn" :src="`${img}box-logo.png`" />
        <div class="u-item">
            <img class="u-fire p-animation fadeIn" :src="`${img}fire.png`" :style="fireStyle" />
            <img class="u-txt p-animation fadeIn" :src="`${img}title1.png`" />
            <div class="u-btn" @click="scrollToNext">
                <view>查看更多</view>
                <div>↓</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "oneView",
    props: ["moduleData"],
    data: function () {
        return {
            offsetX: 0,
            offsetY: 0,
        };
    },
    computed: {
        img() {
            return this.moduleData?.img;
        },
        height() {
            return this.moduleData?.height;
        },
        fireStyle() {
            return {
                transform: `translate(${this.offsetX}px, ${this.offsetY}px)`,
                transition: "transform 0.3s ease-out",
            };
        },
    },
    methods: {
        onMouseMove(e) {
            const el = e.currentTarget;
            const centerX = el.clientWidth / 2;
            const centerY = el.clientHeight / 2;
            const ratio = 50;
            this.offsetX = -((e.clientX - centerX) / centerX) * ratio;
            this.offsetY = -((e.clientY - centerY) / centerY) * ratio;
        },
        onMouseLeave() {
            this.offsetX = 0;
            this.offsetY = 0;
        },
        scrollToNext() {
            const el = this.$el;
            const targetY = el.getBoundingClientRect().bottom + window.scrollY;
            const startY = window.scrollY;
            const distance = targetY - startY;
            const duration = 800;
            const startTime = performance.now();
            const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                window.scrollTo(0, startY + distance * easeInOutCubic(progress));
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        },
    },
};
</script>
<style lang="less">
.m-one {
    position: relative;
    background-image: url("@{kv_bashufengyun}bg1.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .u-box-logo {
        width: 330px;
        position: absolute;
        left: 47px;
        top: 109px;
    }
    .u-item {
        .pr;
        min-height: inherit;
        width: 100%;
        .flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .u-fire {
            .pa;
            .rb(0);
            width: 100%;
        }
        .u-txt {
            width: 720px;
        }
        .u-btn {
            color: #fff;
            text-align: center;
            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
            font-size: 20px;
            line-height: 30px;
            margin-top: 76px;
            animation: float 2s ease-in-out infinite;
            cursor: pointer;
        }
    }
}
@keyframes float {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
</style>
