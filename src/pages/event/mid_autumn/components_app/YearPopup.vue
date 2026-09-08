<template>
    <transition name="year-popup-fade">
        <div v-if="visible" class="m-year-mask" @click.self="onClose">
            <ul class="m-year-pop">
                <li
                    v-for="y in years"
                    :key="y.year"
                    :class="{ active: y.year == year }"
                    @click="onSelect(y.year)"
                >
                    {{ formatYear(y.year) }}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
export default {
    name: "YearPopup",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        years: {
            type: Array,
            default: () => [],
        },
        year: {
            type: [String, Number],
            default: "",
        },
    },
    emits: ["update:visible", "select"],
    methods: {
        formatYear(year) {
            const zodiac = ["子鼠", "丑牛", "寅虎", "卯兔", "辰龙", "巳蛇", "午马", "未羊", "申猴", "酉鸡", "戌狗", "亥猪"];
            const value = Number(year);
            if (!Number.isInteger(value)) return year;
            return `${year}·${zodiac[((value - 4) % 12 + 12) % 12]}`;
        },
        onClose() {
            this.$emit("update:visible", false);
        },
        onSelect(year) {
            this.$emit("select", year);
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style scoped lang="less">
.year-popup-fade-enter-from,
.year-popup-fade-leave-to {
    opacity: 0;
}

.year-popup-fade-enter-active,
.year-popup-fade-leave-active {
    transition: opacity 0.18s ease;
}

.m-year-mask {
    position: fixed;
    inset: 0;
    z-index: 999;
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);

    .m-year-pop {
        width: calc(100% - 3rem);
        max-width: 20rem;
        max-height: min(12rem, 70dvh);
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding: 1rem;
        border-radius: 0.75rem;
        background: #2a1d12;
        box-sizing: border-box;

        li {
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            font-size: 1.25rem;
            color: #fdf0cd;
            border-bottom: 0.0625rem solid rgba(253, 240, 205, 0.15);

            &.active {
                color: #ffd479;
                font-weight: 600;
            }

            &:last-child {
                border: 0;
            }
        }
    }
}
</style>
