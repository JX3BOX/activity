<template>
    <div
        class="p-event-midAutumn_app"
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
            <div class="u-year">· {{ year }} ·</div>
        </div>

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
            menu: [
                {
                    key: "info",
                    name: "活动介绍",
                },
                {
                    key: "poem",
                    name: "诗词赏鉴",
                },
                {
                    key: "years",
                    name: "往届活动",
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
            if (item.key === "years") {
                this.showYears = true;
            } else {
                this.$router.push({ name: "list", query: { year: this.year, tab: item.key, __env: "app" } });
            }
        },
    },
};
</script>

<style scoped lang="less">
.p-event-midAutumn_app {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
    overflow: hidden;
    background-size: cover;

    .m-app-menu {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        padding-bottom: 6.5vw;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 6.5vw;
        justify-content: flex-end;
        .u-menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 5.33vw;
            width: 80.8vw;
            height: 14vw;
            line-height: 14vw;
            background-size: 100% 100%;
            gap: 5vw;
            img {
                width: 6.5vw;
                height: 6.5vw;
            }
        }
        .u-year {
            font-size: 5.33vw;
            height: 16vw;
            line-height: 16vw;
            color: #fdf0cd;
            font-weight: 500;
            letter-spacing: 1vw;
        }
    }
}
</style>
