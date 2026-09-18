<template>
    <span
        class="c-app-select-drawer__trigger"
        :class="{ 'is-disabled': disabled }"
        @click="open"
    >
        <slot :open="open" :value="modelValue" :selected-option="selectedOption" />
    </span>

    <Teleport to="body">
        <Transition name="app-select-drawer">
            <div
                v-if="opened"
                class="c-app-select-drawer__mask"
                role="presentation"
                @click.self="close"
            >
                <section
                    class="c-app-select-drawer"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="titleId"
                    @click.stop
                >
                    <div class="c-app-select-drawer__handle" aria-hidden="true"></div>

                    <header class="c-app-select-drawer__header">
                        <h2 :id="titleId" class="c-app-select-drawer__title">{{ title }}</h2> 
                    </header>

                    <div class="c-app-select-drawer__list" role="radiogroup">
                        <button
                            v-for="(option, index) in options"
                            :key="optionKey(option, index)"
                            type="button"
                            class="c-app-select-drawer__option"
                            :class="{
                                'is-selected': isSelected(option),
                                'is-disabled': isOptionDisabled(option),
                            }"
                            role="radio"
                            :aria-checked="isSelected(option)"
                            :disabled="isOptionDisabled(option)"
                            @click="selectOption(option)"
                        >
                            <slot name="option" :option="option" :selected="isSelected(option)">
                                <span class="c-app-select-drawer__label">{{ optionLabel(option) }}</span>
                                <span class="c-app-select-drawer__radio" aria-hidden="true"></span>
                            </slot>
                        </button>

                        <div v-if="!options.length" class="c-app-select-drawer__empty">
                            {{ emptyText }}
                        </div>
                    </div>
                </section>
            </div>
        </Transition>
    </Teleport>
</template>

<script>
let drawerSeed = 0;

export default {
    name: "AppSelectDrawer",
    props: {
        modelValue: {
            type: [String, Number, Boolean, Object],
            default: "",
        },
        title: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "请选择",
        },
        options: {
            type: Array,
            default: () => [],
        },
        labelKey: {
            type: String,
            default: "label",
        },
        valueKey: {
            type: String,
            default: "value",
        },
        disabledKey: {
            type: String,
            default: "disabled",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        emptyText: {
            type: String,
            default: "暂无选项",
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["update:modelValue", "select", "change", "open", "close"],
    data() {
        drawerSeed += 1;
        return {
            opened: false,
            titleId: `app-select-drawer-title-${drawerSeed}`,
            originalBodyOverflow: "",
        };
    },
    computed: {
        selectedOption() {
            return this.options.find((option) => Object.is(this.optionValue(option), this.modelValue));
        },
    },
    beforeUnmount() {
        this.unlockBodyScroll();
        document.removeEventListener("keydown", this.onKeydown);
    },
    methods: {
        open() {
            if (this.disabled || this.opened) return;
            this.opened = true;
            this.lockBodyScroll();
            document.addEventListener("keydown", this.onKeydown);
            this.$emit("open");
        },
        close() {
            if (!this.opened) return;
            this.opened = false;
            this.unlockBodyScroll();
            document.removeEventListener("keydown", this.onKeydown);
            this.$emit("close");
        },
        onKeydown(event) {
            if (this.closeOnPressEscape && event.key === "Escape") {
                this.close();
            }
        },
        lockBodyScroll() {
            this.originalBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
        },
        unlockBodyScroll() {
            if (typeof document === "undefined") return;
            document.body.style.overflow = this.originalBodyOverflow;
        },
        optionValue(option) {
            if (option !== null && typeof option === "object") {
                return option[this.valueKey];
            }
            return option;
        },
        optionLabel(option) {
            if (option !== null && typeof option === "object") {
                return option[this.labelKey];
            }
            return option;
        },
        optionKey(option, index) {
            const value = this.optionValue(option);
            return value === undefined || (value !== null && typeof value === "object") ? index : value;
        },
        isOptionDisabled(option) {
            return Boolean(option !== null && typeof option === "object" && option[this.disabledKey]);
        },
        isSelected(option) {
            return Object.is(this.optionValue(option), this.modelValue);
        },
        selectOption(option) {
            if (this.isOptionDisabled(option)) return;

            const value = this.optionValue(option);
            const changed = !Object.is(value, this.modelValue);
            // 先关闭抽屉：父组件的 select 回调可能立即跳转路由或触发重渲染。
            this.close();
            this.$emit("update:modelValue", value);
            this.$emit("select", value, option);
            if (changed) this.$emit("change", value, option);
        },
    },
};
</script>

<style scoped lang="less">
.c-app-select-drawer__trigger {
    display: contents;

    &.is-disabled {
        pointer-events: none;
    }
}

.c-app-select-drawer__mask {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: flex;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.42);
    -webkit-tap-highlight-color: transparent;
}

.c-app-select-drawer {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 60vh;
    max-height: 60dvh;
    padding: 10px 16px calc(12px + env(safe-area-inset-bottom));
    overflow: hidden;
    color: #1f2329;
    background: #fff;
    border-radius: 24px 24px 0 0;
    box-sizing: border-box;
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12);
}

.c-app-select-drawer__handle {
    flex: none;
    width: 40px;
    height: 4px;
    margin: 0 auto 14px;
    background: #d8dde6;
    border-radius: 2px;
}

.c-app-select-drawer__header {
    flex: none;
    padding: 0 4px 16px;
}

.c-app-select-drawer__title {
    margin: 0;
    color: #17191c;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
} 

.c-app-select-drawer__list {
    flex: 1;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.c-app-select-drawer__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 56px;
    margin: 0 0 10px;
    padding: 12px 18px;
    color: #24272c;
    font: inherit;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    background: #fff;
    border: 1px solid #e4e7ec;
    border-radius: 14px;
    box-sizing: border-box;
    appearance: none;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:active,
    &.is-selected {
        background: #f7f6ff;
        border-color: #7c6ee6;
    }

    &.is-disabled {
        color: #b8bdc5;
        background: #f6f7f8;
        cursor: not-allowed;
    }
}

.c-app-select-drawer__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.c-app-select-drawer__radio {
    flex: none;
    width: 20px;
    height: 20px;
    margin-left: 16px;
    border: 2px solid #dfe3e8;
    border-radius: 50%;
    box-sizing: border-box;
}

.c-app-select-drawer__option.is-selected .c-app-select-drawer__radio {
    border: 6px solid #6f5ddd;
}

.c-app-select-drawer__empty {
    padding: 32px 16px;
    color: #9298a1;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
}

.app-select-drawer-enter-active,
.app-select-drawer-leave-active {
    transition: background-color 0.22s ease;

    .c-app-select-drawer {
        transition: transform 0.22s ease;
    }
}

.app-select-drawer-enter-from,
.app-select-drawer-leave-to {
    background: rgba(0, 0, 0, 0);

    .c-app-select-drawer {
        transform: translateY(100%);
    }
}
</style>
