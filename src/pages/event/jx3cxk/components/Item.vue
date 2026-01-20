<template>
    <div class="m-item-box" :class="{ play: isPlaying }" v-if="data.id">
        <div class="m-item">
            <template v-if="!show">
                <div class="u-title" :class="{ 'marquee-active': isMarqueeActive }">
                    <div class="clip">
                        <div
                            class="marquee-wrapper"
                            ref="marqueeWrapper"
                            :class="{ 'marquee-animate': isMarqueeActive }"
                        >
                            <span class="marquee-text" ref="marqueeText">
                                {{ data.title }}
                            </span>
                            <span v-if="isMarqueeActive" class="marquee-text copy">{{ data.title }}</span>
                        </div>
                    </div>
                </div>
                <div class="u-author">
                    练习生：<a :href="`${author}${data.user_info.id}`" target="_blank">
                        {{ data.user_info.display_name }}
                    </a>
                </div>
            </template>
            <a v-else class="u-name" :href="`${link}${data.sub_title}`" target="_blank">
                {{ data.user_info.display_name }}
            </a>

            <div class="m-record">
                <img class="u-needle" :class="{ isPlaying }" :src="`${imgRoot}web/item/needle.svg`" />
                <a :href="`${author}${data.user_info.id}`" target="_blank" class="u-record">
                    <img class="u-avatar" :class="{ isPlaying }" :src="data.user_info.avatar" />
                </a>
            </div>
            <template v-if="show">
                <div class="u-title u-song" :class="{ 'marquee-active': isMarqueeActive }">
                    <div class="clip">
                        <div
                            class="marquee-wrapper"
                            ref="marqueeWrapper"
                            :class="{ 'marquee-animate': isMarqueeActive }"
                        >
                            <span class="marquee-text" ref="marqueeText"> 出道歌曲：《{{ data.title }}》 </span>
                            <span v-if="isMarqueeActive" class="marquee-text copy">
                                出道歌曲：《{{ data.title }}》</span
                            >
                        </div>
                    </div>
                </div>
            </template>
            <el-slider
                v-model="slider"
                :max="100"
                :show-tooltip="false"
                @change="handleSliderChange"
                @mousedown.native="isDragging = true"
                @mouseup.native="isDragging = false"
            ></el-slider>
            <div class="m-play">
                <div class="u-play-button">
                    <img class="u-icon" :src="`${imgRoot}web/item/left.svg`" />
                    <img
                        class="u-icon u-play"
                        :src="`${imgRoot}web/item/${isPlaying ? 'stop.svg' : 'play.svg'}`"
                        @click="togglePlay"
                    />
                    <img class="u-icon" :src="`${imgRoot}web/item/right.svg`" />
                </div>
                <div class="u-like">
                    <img class="u-icon" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
                    {{ data.amount }}
                </div>
                <a class="u-link" :href="`${link}${data.sub_title}`" target="_blank">
                    {{ `${show ? "" : "查看"}原帖` }}
                </a>
            </div>
        </div>
        <div class="m-button" :class="{ active: isVote }" @click="toVote">
            <div class="u-call"><span>打call !</span></div>
            <img class="u-icon" :src="`${imgRoot}web/item/emoji-1.svg`" />
            <img class="u-icon u-hover" :src="`${imgRoot}web/item/emoji-2.svg`" />
            <img class="u-icon u-active" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
        </div>
        <div class="m-bilibili">
            <audio
                ref="audioPlayer"
                :src="data.content"
                @timeupdate="handleTimeUpdate"
                @loadedmetadata="handleLoadedMetadata"
                @ended="handleAudioEnded"
            ></audio>
        </div>
    </div>
</template>
<script>
import { __cdn, __Root } from "@/utils/config";
import { vote } from "@/service/event/vote";
export default {
    inject: ["__imgRoot"],
    emits: ["update:vote"],
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            imgRoot: this.__imgRoot,
            link: __Root + "community/",
            author: __Root + "author/",

            // 滚动标题
            isMarqueeActive: false,
            maxWidth: 300,
            scrollSpeed: 40,
            slider: 0,

            // 播放
            isPlaying: false,
        };
    },
    computed: {
        isVote() {
            return this.data?.isVoted || false;
        },
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
            const audio = this.$refs.audioPlayer;
            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        toVote() {
            const item = this.data;
            if (item.isVoted) return;
            const time = 1000;
            const now = Date.now();
            if (now - this.lastVoteTime < time) {
                return this.$message({
                    message: "投票速度太快啦！",
                    type: "warning",
                });
            }
            this.lastVoteTime = now;
            vote(item.program_id, { vote_id_list: [item.id] }).then(() => {
                this.$message({
                    message: "投票成功",
                    type: "success",
                });
                item.isVoted = true;
                this.$emit("update:vote", item.id);
            });
        },
        handleTimeUpdate() {
            if (!this.isDragging) {
                this.currentTime = this.$refs.audioPlayer.currentTime;
                this.slider = (this.currentTime / this.duration) * 100 || 0;
            }
        },
        handleLoadedMetadata() {
            this.duration = this.$refs.audioPlayer.duration;
        },
        handleAudioEnded() {
            this.isPlaying = false;
            this.currentTime = 0;
            this.slider = 0;
        },
        handleSliderChange(value) {
            this.$refs.audioPlayer.currentTime = (value / 100) * this.duration;
            this.currentTime = this.$refs.audioPlayer.currentTime;
            this.isDragging = false;
            if (this.isPlaying) {
                this.$refs.audioPlayer.play();
            }
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
    margin-left: 180px;
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
