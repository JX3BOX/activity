<template>
    <el-dialog
        width="1152px"
        :close-on-click-modal="false"
        :show-close="false"
        :visible.sync="visible"
        mode
        destroy-on-close
    >
        <div class="m-modal">
            <div class="m-content" :style="{ height }">
                <img :style="seven_icon_style" class="m-content_7th" :src="getCdnLink('design/rank/seven/modal_7th.png')" />
                <img class="m-content_logo" :src="getCdnLink('design/rank/seven/modal_logo.png')" />
                <div style="position: relative; z-index: 99; height: 100%">
                    <slot></slot>
                </div>
            </div>
            <div class="m-close" @click="$emit('close')">
                <img class="m-close_icon" :src="getCdnLink('design/rank/seven/modal_close.png')" />
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {getCdnLink} from "@/utils";
export default {
    name: "global_modal",
    props: {
        visible: {
            default: false,
            type: Boolean,
        },
        seven_icon_style: {
            type: Object,
            default: () => {},
        },
        height: {
            type: String,
            default: "550px",
        },
    },
    methods: {
        getCdnLink,
    },
};
</script>
<style lang="less" scoped>
.m-modal {
    display: flex;
    gap: 10px;
    overflow: hidden;
}

.m-close:hover > .m-close_icon {
    transform: rotate(180deg);
}

.m-close {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    background: #424242;
    width: 50px;
    height: 50px;

    .m-close_icon {
        width: 22px;
        transition: all 1s linear;
        height: 22px;
    }
}
.m-content {
    position: relative;
    background: #424242;
    border: 1px solid #ffffff;
    width: 1092px;

    .m-content_logo {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.1;
        z-index: 1;
    }
    .m-content_7th {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 404px;
        height: 425px;
        left: -53px;
        bottom: 0;
        object-fit: contain;
    }
}
/deep/.el-dialog__header {
    display: none;
}
/deep/.el-dialog {
    background: none;
    border: none;
    padding: 0;
    box-shadow: none;
    .el-dialog__body {
        padding: 0;
    }
    .el-dialog__header {
        display: none;
    }
}
</style>
