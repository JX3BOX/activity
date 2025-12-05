<template>
    <div class="event-container">
        <div class="event-scroll-wrapper" ref="scrollWrapper">
            <div class="event-list" ref="eventList" v-for="(item, i) in monthList" :key="i">
                <div class="event-month">
                    <span v-if="item.month">
                        {{ item.month }}月
                    </span>
                    <span v-else>特殊活动</span>
                </div>
                <div class="event-item" v-for="(listItem, index) in item.list" :key="index">
                    <div class="event-image">
                        <img :src="listItem.img" alt="" class="u-image">
                    </div>
                    <div class="event-name">{{ listItem.name }}</div>
                </div>
            </div>
        </div>
        <div class="scroll-shadow top-shadow" ref="topShadow"></div>
        <div class="scroll-shadow bottom-shadow" ref="bottomShadow"></div>
    </div>
</template>

<script>
import { __cdn, __imgPath, __Root } from "@/utils/config";
import data from "@/assets/data/event/index.json";

import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            list: [],
            eventLink: __Root + "event",
            show: false,
            name: "",
            isNewEvent: true,
            monthList: [],
        }
    },
    computed: {
        client() {
            return location.href.includes('origin') ? 'origin' : 'std'
        },
        imgPath() {
            return __cdn + "/design/cover/cover_event";
        },
        topImg() {
            return __imgPath + "topic/event/top.png";
        },
    },
    mounted() {
        // 监听滚动事件
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll);
        // 初始检查滚动位置
        this.handleScroll();
        this.load();
    },
    beforeDestroy() {
        // 移除滚动事件监听
        this.$refs.scrollWrapper.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        load() {
            const { list, vertical } = data;
            this.list = list;
            this.monthList = vertical.reduce((acc, item) => {
                const month = acc.find((m) => m.month === item.month);
                if (month) {
                    month.list.push(item);
                    if (item.single) {
                        month.single = true;
                    }
                } else {
                    acc.push({ month: item.month, list: [item], single: item.single });
                }
                return acc;
            }, []);
        },
        onclick(item) {
            if (item.mini_path) {
                wx.miniProgram.navigateTo({
                    url: item.mini_path,
                });
            }
        },
        handleScroll() {
            const scrollWrapper = this.$refs.scrollWrapper;
            const topShadow = this.$refs.topShadow;
            const bottomShadow = this.$refs.bottomShadow;

            // 获取滚动信息
            const scrollTop = scrollWrapper.scrollTop;
            const scrollHeight = scrollWrapper.scrollHeight;
            const clientHeight = scrollWrapper.clientHeight;

            // 滚动到最顶部
            if (scrollTop === 0) {
                topShadow.style.display = 'none';
                bottomShadow.style.display = 'block';
            }
            // 滚动到最底部
            else if (scrollTop + clientHeight >= scrollHeight - 1) { // 减1是为了处理精度问题
                topShadow.style.display = 'block';
                bottomShadow.style.display = 'none';
            }
            // 滚动到中间位置
            else {
                topShadow.style.display = 'none';
                bottomShadow.style.display = 'none';
            }
        }
    }
}
</script>

<style scoped lang="less">
.event-container {
    position: relative;
    height: 100vh;
    background-color: #FFFFFF;
    overflow: hidden;
}

.event-scroll-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
}

.event-list {}

.event-month {
    color: rgba(28, 28, 28, 0.80);
    .fz(18px, 28px);
    font-style: normal;
    font-weight: 700;
    .mb(10px);

}

.event-item {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.event-image {
    width: 100%;
    height: 158px;
    background-color: #E8E8E8;
    border-radius: 20px;
    margin-bottom: 12px;
    overflow: hidden;

    .u-image {
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
}

.event-name {
    color: rgba(28, 28, 28, 0.80);
    text-align: center;
    .fz(12px, 18px);
    font-style: normal;
    font-weight: 400;
}

.scroll-shadow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 82px;
    pointer-events: none;
}

.top-shadow {
    top: 0;
    background: linear-gradient(180deg, #FAFAFA 0%, rgba(250, 250, 250, 0.00) 100%);
    display: none;
}

.bottom-shadow {
    bottom: 0;
    background: linear-gradient(0deg, #FAFAFA 0%, rgba(250, 250, 250, 0.00) 100%);
    // transform: translateX(-50%) rotate(180deg);
    /* 旋转阴影方向 */
    display: block; // 默认显示底部阴影
}

// @media screen and (width: 400px)
@media (prefers-color-scheme: dark) {
    .event-container {
        background-color: #000;
    }

    .event-month {
        color: rgba(255, 255, 255, 0.80);
    }

    .event-image {
        background-color: #333;
    }

    .event-name {
        color: rgba(255, 255, 255, 0.80);
    }

    .top-shadow {
        background: linear-gradient(180deg, #1C1C1C 0%, rgba(28, 28, 28, 0.00) 100%);
    }

    .bottom-shadow {
        background: linear-gradient(0deg, #1C1C1C 0%, rgba(28, 28, 28, 0.00) 100%);
    }
}
</style>
