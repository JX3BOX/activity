<template>
    <div
        class="p-event-midAutumn_app"
        :class="{ 'is-android': isAndroid }"
        v-loading="yearsLoading"
        :style="{ backgroundImage: `url('${imgRoot}${year}/phone/bg1.jpg')` }"
    >
        <div class="m-app-menu">
            <div
                class="u-menu-item"
                v-for="item in menu"
                :key="item.key"
                @click="onClickItem(item)"
                :style="{ backgroundImage: `url('${imgRoot}${year}/phone/button1.jpg')` }"
            >
                <img :src="`${imgRoot}${year}/phone/flower1.png`" />
                <span>{{ item.name }}</span>
                <img :src="`${imgRoot}${year}/phone/flower1.png`" />
            </div>
        </div>
        <div class="u-year" role="button" tabindex="0" aria-label="选择活动年份" @click="showYears = true" @keydown.enter="showYears = true" @keydown.space.prevent="showYears = true">· {{ year }} ·</div>

        <YearPopup v-model:visible="showYears" :years="years" :year="year" @select="selectYear" />
    </div>
</template>

<script>
import { __cdn } from "@/utils/config";
import YearPopup from "./components_app/YearPopup.vue";
import yearsMixin from "./mixins/years.js";

export default {
    name: "AppIndex",
    mixins: [yearsMixin],
    components: { YearPopup },
    data: function () {
        return {
            showYears: false,
            isAndroid: typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent),
            menu: [
                {
                    key: "poem",
                    name: "诗词赏鉴",
                },
            ],
        };
    },
    provide() {
        return {
            __imgRoot: this.imgRoot,
        };
    },
    computed: {
        imgRoot() {
            return __cdn + "design/event/mid_autumn/";
        },
        page_name: function () {
            return this.$route.name;
        }, 
        year() {
            return this.currentYear;
        },
    },
    methods: {
        onClickItem(item) {
            this.$router.replace({ name: "list", query: { ...this.$route.query, year: this.year, tab: item.key, __env: "app" } });
        },
    },
};
</script>

<style scoped lang="less">
@keyframes mid-autumn-flower-spin {
    to {
        transform: rotate(360deg);
    }
}

.p-event-midAutumn_app {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
    overflow: hidden;
    background-size: cover;

    .m-app-menu {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: calc(6rem + env(safe-area-inset-bottom, 0rem));
        z-index: 10;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.75rem;
        justify-content: flex-end;
        .u-menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            width: 11rem;
            height: 3rem;
            line-height: 3rem;
            border-radius: 0.375rem;
            overflow: hidden;
            cursor: pointer;
            background-size: 100% 100%;
            gap: 0.625rem;
            img {
                width: 1rem;
                height: 1rem;
                animation: mid-autumn-flower-spin 12s linear infinite;
            }
        }
    }
        .u-year {
            cursor: pointer;
            position: fixed;
            left: 50%;
            width: 12rem;
            transform: translateX(-50%);
            bottom: calc(2rem + env(safe-area-inset-bottom, 0rem));
            text-align: center;
            font-size: 1rem;
            line-height: 2rem;
            color: #fdf0cd;
            font-weight: 500;
            letter-spacing: 0.25rem;
            padding: 0.375rem 0;
            background: linear-gradient(90deg, transparent 0%, rgba(224, 188, 112, 0.08) 20%, rgba(244, 215, 151, 0.24) 50%, rgba(224, 188, 112, 0.08) 80%, transparent 100%);
            text-shadow: 0 0 0.5rem rgba(244, 215, 151, 0.45);

            &::before,
            &::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                height: 0.0625rem;
                pointer-events: none;
                background: linear-gradient(90deg, transparent, #efd392, #fff1c7, #efd392, transparent);
                filter: drop-shadow(0 0 0.1875rem rgba(255, 220, 142, 0.9)) drop-shadow(0 0 0.375rem rgba(239, 195, 101, 0.6));
            }

            &::before {
                top: 0;
            }

            &::after {
                bottom: 0;
            }
        }

    &.is-android .m-app-menu {
        bottom: calc(6rem + max(env(safe-area-inset-bottom, 0rem), 3rem));
    }
}
@media (prefers-reduced-motion: reduce) {
    .p-event-midAutumn_app .m-app-menu .u-menu-item img {
        animation: none;
    }
}
</style>
