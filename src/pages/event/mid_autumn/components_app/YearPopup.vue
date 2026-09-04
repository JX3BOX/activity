<template>
    <transition name="fade">
        <div v-if="visible" class="m-year-mask" @click.self="onClose">
            <ul class="m-year-pop">
                <li
                    v-for="y in years"
                    :key="y.year"
                    :class="{ active: y.year == year }"
                    @click="onSelect(y.year)"
                >
                    {{ y.year }}
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
        width: 80.8vw;
        max-height: 70vh;
        overflow-y: auto;
        padding: 4vw;
        border-radius: 3vw;
        background: #2a1d12;
        box-sizing: border-box;

        li {
            height: 14vw;
            line-height: 14vw;
            text-align: center;
            font-size: 5.33vw;
            color: #fdf0cd;
            border-bottom: 1px solid rgba(253, 240, 205, 0.15);

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
