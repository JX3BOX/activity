<template>
    <div class="m-item-box" v-if="data.id">
        <div class="m-item">
            <div class="u-title" :class="{ 'marquee-active': isMarqueeActive }">
                <div class="clip">
                    <div class="marquee-wrapper" ref="marqueeWrapper" :class="{ 'marquee-animate': isMarqueeActive }">
                        <span class="marquee-text" ref="marqueeText">
                            {{ data.title }}
                        </span>
                        <span class="marquee-text copy">{{ data.title }}</span>
                    </div>
                </div>
            </div>
            <div class="u-author">
                练习生：<a :href="`https://jx3box.com/user/${data.user_info.id}`" target="_blank">
                    {{ data.user_info.display_name }}
                </a>
            </div>
            <div class="m-record">
                <img class="u-needle" :class="{ isPlaying }" :src="`${imgRoot}web/item/needle.svg`" />
                <div class="u-record">
                    <img class="u-avatar" :class="{ isPlaying }" :src="data.user_info.avatar" />
                </div>
            </div>
            <el-slider v-model="slider" size="small" :show-tooltip="false" />
            <div class="m-play">
                <img class="u-icon" :src="`${imgRoot}web/item/left.svg`" />
                <img
                    class="u-icon u-play"
                    :src="`${imgRoot}web/item/${isPlaying ? 'stop.svg' : 'play.svg'}`"
                    @click="togglePlay"
                />
                <img class="u-icon" :src="`${imgRoot}web/item/right.svg`" />
            </div>
            <div class="m-link">
                <div class="u-like">
                    <img class="u-icon" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
                    {{ data.amount }}
                </div>
                <a :href="`${link}${data.sub_title}`" target="_blank">查看原帖</a>
            </div>
        </div>
        <div class="m-button">
            <div class="u-call"><span>打call !</span></div>
            <img class="u-icon" :src="`${imgRoot}web/item/emoji-1.svg`" />
            <img class="u-icon u-hover" :src="`${imgRoot}web/item/emoji-2.svg`" />
            <img class="u-icon u-active" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
        </div>
        <div class="m-bilibili" v-html="play"></div>
    </div>
</template>
<script>
import { __cdn, __Root } from "@/utils/config";
export default {
    inject: ["__imgRoot"],
    emits:["update"],
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            imgRoot: this.__imgRoot,
            link: __Root + "community/",

            // 滚动标题
            isMarqueeActive: false,
            maxWidth: 300,
            scrollSpeed: 40,
            slider: 0,

            // 播放
            isPlaying: false,
            play:''
        };
    },

    methods: {
        checkTextWidth() {
            const textEl = this.$refs.marqueeText;
            const wrapperEl = this.$refs.marqueeWrapper;
            if (!textEl || !wrapperEl) return;

            const singleTextWidth = textEl.offsetWidth;
            this.isMarqueeActive = singleTextWidth > this.maxWidth;

            if (this.isMarqueeActive) {
                const duration = singleTextWidth / this.scrollSpeed;
                wrapperEl.style.animationDuration = `${duration}s`;
            } else {
                wrapperEl.style.animationDuration = "";
            }
        },
        togglePlay() {
            this.isPlaying = !this.isPlaying;
            this.play = this.data.content
            // if (this.isPlaying) this.$emit("update", this.data);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.checkTextWidth();
        });
    },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/event/jx3cxk/item.less";
</style>
<style lang="less">
.el-slider__button {
    border: 2px solid rgba(65, 61, 82, 0.3);
}
.el-slider__runway {
    height: 3px;
    background-color: rgba(65, 61, 82, 0.3);
}
.el-slider__button-wrapper {
    top: -17px;
}
.el-slider__bar {
    height: 3px;
    background-color: #fff;
}
.el-slider__button {
    .size(12px);
}
</style>
<style scoped>
.marquee-wrapper {
    white-space: nowrap;
    position: relative;
    display: inline-block;
    transition: transform 0s linear;
}

.marquee-text {
    display: inline-block;
}
.marquee-text::after {
    content: "》";
    display: inline-block;
}
.marquee-text::before {
    content: "《";
    display: inline-block;
}
.marquee-text.copy::after,
.marquee-text.copy::before {
    display: none;
}
.marquee-text.copy {
    margin-left: 50px;
    display: none;
}
.marquee-animate {
    animation: marquee linear infinite;
    animation-fill-mode: forwards;
}
.marquee-active .marquee-text.copy {
    display: inline-block;
}
.marquee-animate .marquee-text::after,
.marquee-animate .marquee-text::before {
    display: none;
}

.marquee-active::after {
    content: "》";
    display: inline-block;
    position: absolute;
    right: -28px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}
.marquee-active::before {
    content: "《";
    display: inline-block;
    position: absolute;
    left: -28px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
