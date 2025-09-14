<template>
    <el-dialog fullscreen :visible="modelValue" custom-class="m-year-change-dialog" close-on-press-escape @close="onClose" :show-close="false">
        <div class="m-year-container">
            <div class="m-year-cards">
                <div
                    class="m-year-card"
                    v-for="(item, index) in years"
                    :key="index"
                    :style="getCardStyle(item, index)"
                    @click="selectYear(item)"
                >
                    <div class="u-year-chinese">
                        <div
                            class="u-chinese-char"
                        >
                            {{ getYearInChinese(item.year).join('') }}届
                        </div>
                    </div>
                    <div class="u-year-number">{{ item.year }}</div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import color from "@/assets/data/event/color.json";
const zh_num = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
export default {
    name: "YearChange",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        years: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['update:modelValue', 'year-selected'],
    model: {
        prop: 'modelValue',
        event: 'update:modelValue'
    },
    data() {
        return {
            color,
        }
    },
    methods: {
        onClose() {
            this.$emit('update:modelValue', false);
        },
        selectYear(item) {
            this.$emit('year-selected', item);
            this.onClose();
        },
        getCardStyle(item, index) {
            const cardColor = item.color || this.color.color[index % this.color.color.length].color;
            return {
                background: cardColor,
            };
        },
        getYearInChinese(year) {
            year = year.toString().split("");
            let res = [];
            year.forEach((item) => {
                res.push(zh_num[parseInt(item)]);
            });
            return res;
        },
    }
}
</script>

<style lang="less">
.m-year-change-dialog {
    .el-dialog__header {
        .none;
    }
    .el-dialog__body {
        padding: 0;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.9);
        .flex;
        align-items: center;
        justify-content: center;
    }
}

.m-year-container {
    width: 100%;
    height: 100%;
    .flex;
    align-items: center;
    justify-content: center;
}

.m-year-cards {
    .flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
}

.m-year-card {
    width: 160px;
    height: 320px;
    border-radius: 20px;
    .flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    .pr;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .u-year-chinese {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        .flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .u-chinese-char {
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
    }

    .u-year-number {
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        .pa;
        bottom: 10px;
    }
}

@media (max-width: 768px) {
    .m-year-cards {
        flex-direction: column;
        gap: 30px;
    }

    .m-year-card {
        width: 160px;
        height: 260px;

        .u-year-number {
            font-size: 36px;
            margin-top: 40px;
        }

        .u-year-chinese {
            top: 20px;

            .u-chinese-char {
                font-size: 16px;
            }
        }
    }
}
</style>
