<template>
    <el-dialog
        fullscreen
        :model-value="dialogVisible"
        @update:model-value="dialogVisible = $event"
        custom-class="m-year-change-dialog"
        close-on-press-escape
        @close="onClose"
        :show-close="false"
        style="background: transparent;"
    >
        <div class="m-year-container" @click.self="onClose">
            <button class="u-year-close" type="button" aria-label="关闭年份选择" @click="onClose">
                <el-icon><Close /></el-icon>
            </button>
            <div class="m-year-cards" @click.stop>
                <div
                    class="m-year-card"
                    v-for="(item, index) in years"
                    :key="index"
                    :style="getCardStyle(item, index)"
                    @click="selectYear(item)"
                >
                    <div class="u-year-chinese">
                        <div class="u-chinese-char">{{ getYearInChinese(item.year).join("") }}届</div>
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
            default: false,
        },
        years: {
            type: Array,
            default: () => [],
        },
    },
    emits: ["update:modelValue", "year-selected"],
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    data() {
        return {
            color,
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit("update:modelValue", val);
            },
        },
    },
    methods: {
        onClose() {
            this.$emit("update:modelValue", false);
        },
        selectYear(item) {
            this.$emit("year-selected", item);
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
    },
};
</script>

<style lang="less">
.m-year-change-dialog {
    .el-dialog__header {
        .none;
    }
    .el-dialog__body {
        padding: 0;
        height: 100vh;
        background-color: transparent;
        .flex;
        align-items: center;
        justify-content: center;
    }
}

.m-year-container {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    .flex;
    align-items: center;
    justify-content: center;
}

.u-year-close {
    position: fixed;
    top: 28px;
    right: 32px;
    z-index: 1;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.68);
    border-radius: 50%;
    color: #fff;
    background: rgba(13, 20, 32, 0.88);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.48), 0 0 0 1px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(6px);
    cursor: pointer;
    .flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, transform 0.2s ease;

    .el-icon {
        font-size: 24px;
    }

    &:hover {
        background: rgba(37, 48, 66, 0.96);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.56), 0 0 0 1px rgba(255, 255, 255, 0.12);
        transform: rotate(90deg);
    }
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
    .u-year-close {
        top: 16px;
        right: 16px;
    }

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
