<template>
    <div class="topic-container">
        <div class="topic-scroll-wrapper" ref="scrollWrapper">
            <div class="topic-list" ref="topicList">
                <div class="topic-item" v-for="(item, index) in client === 'std' ? std : origin" :key="index"
                    @click="goToLink(item)">
                    <div class="topic-image">
                        <img class="u-img" :src="showImg(item.key)" :class="item.link ? 'u-hover' : ''" />
                    </div>
                    <div class="topic-title">{{ item.name }}</div>
                    <div class="topic-time">{{ item.time }}</div>
                </div>
            </div>
        </div>
        <div class="scroll-shadow left-shadow" ref="leftShadow"></div>
        <div class="scroll-shadow right-shadow" ref="rightShadow"></div>
    </div>
</template>

<script>
import { wxNewPage } from '@/utils/minprogram';
import { std, origin } from "@/assets/data/topic/topic.json";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    data() {
        return {
            std,
            origin,

        }
    },
    computed: {
        client() {
            return location.href.includes('std') ? 'std' : 'origin'
        },
    },
    created() {
        if (this.client === 'origin') {
            document.title = '缘起'
        } else {
            document.title = '重制/无界'
        }
    },
    mounted() {
        // 监听滚动事件
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll);
        // 初始检查滚动位置
        this.handleScroll();
    },
    beforeDestroy() {
        // 移除滚动事件监听
        this.$refs.scrollWrapper.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        showImg(key) {
            if (!key) key = "normal";
            return __cdn + "design/topic/index/" + key + ".png";
        },
        goToLink(item) {
            window.open(item.link, '_blank')
        },
        handleScroll() {
            const scrollWrapper = this.$refs.scrollWrapper;
            const leftShadow = this.$refs.leftShadow;
            const rightShadow = this.$refs.rightShadow;

            // 获取滚动信息
            const scrollLeft = scrollWrapper.scrollLeft;
            const scrollWidth = scrollWrapper.scrollWidth;
            const clientWidth = scrollWrapper.clientWidth;

            // 滚动到最左侧
            if (scrollLeft === 0) {
                leftShadow.style.display = 'none';
                rightShadow.style.display = 'block';
            }
            // 滚动到最右侧
            else if (scrollLeft + clientWidth >= scrollWidth - 1) { // 减1是为了处理精度问题
                leftShadow.style.display = 'block';
                rightShadow.style.display = 'none';
            }
            // 滚动到中间位置
            else {
                leftShadow.style.display = 'none';
                rightShadow.style.display = 'none';
            }
        },
    }
}
</script>

<style scoped lang="less">
.topic-container {
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #FAFAFA;
    overflow: hidden;
}

.topic-scroll-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 15px;

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
}

.topic-list {
    display: flex;
    gap: 15px;
    min-width: fit-content;
}

.topic-item {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.topic-image {
    width: 120px;
    height: 360px;
    background-color: #666;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 8px;
}

.topic-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 4px;
    text-align: center;
}

.topic-time {
    font-size: 12px;
    color: #999;
    text-align: center;
}

.scroll-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    pointer-events: none;
}

.left-shadow {
    left: 0;
    background: linear-gradient(90deg, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0) 100%);
    display: none;
}

.right-shadow {
    right: 0;
    background: linear-gradient(270deg, rgba(250, 250, 250, 1) 0%, rgba(250, 250, 250, 0) 100%);
    display: block; // 默认显示右侧阴影
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
    .topic-container {
        background-color: #000;
    }

    .topic-title {
        color: rgba(255, 255, 255, 0.80);
    }

    .topic-time {
        color: rgba(255, 255, 255, 0.60);
    }

    .left-shadow {
        background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .right-shadow {
        background: linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
}
</style>
