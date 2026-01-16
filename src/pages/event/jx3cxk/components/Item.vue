<template>
    <div class="m-item-box">
        <div class="m-item">
            <div class="u-title">DEAD MAN</div>
            <div class="u-author">练习生：djkjkm</div>
            <div class="m-record">
                <img class="u-needle" :src="`${imgRoot}web/item/needle.svg`" />
                <div class="u-record">
                    <img class="u-avatar" src="https://cdn.jx3box.com/upload/avatar/2021/3/5/9393123.jpg?" />
                </div>
            </div>
            <el-slider v-model="slider" size="small" :show-tooltip="false" />
            <div class="m-play">
                <img class="u-icon" :src="`${imgRoot}web/item/left.svg`" />
                <img class="u-icon u-play" :src="`${imgRoot}web/item/play.svg`" />
                <img class="u-icon" :src="`${imgRoot}web/item/right.svg`" />
            </div>
            <div class="m-link">
                <div class="u-like">
                    <img class="u-icon" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
                    982391
                </div>
                <a :href="``" target="_blank">查看原帖</a>
            </div>
        </div>
        <div class="m-button">
            <div class="u-call"><span>打call !</span></div>
            <img class="u-icon" :src="`${imgRoot}web/item/emoji-1.svg`" />
            <img class="u-icon u-hover" :src="`${imgRoot}web/item/emoji-2.svg`" />
            <img class="u-icon u-active" :src="`${imgRoot}web/item/like.svg?jx3cxk`" />
        </div>
    </div>
</template>
<script>
export default {
    inject: ["__imgRoot"],
    data() {
        return { imgRoot: this.__imgRoot, slider: 0 };
    },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/event/jx3cxk/item.less";
</style>
<style lang="less">
.el-slider__button {
    border: 2px solid rgba(65, 61, 82, 0.3);
}
.el-slider__runway {
    height: 3px;
    background-color: rgba(65, 61, 82, 0.3);
}
.el-slider__button-wrapper {
    top: -17px;
}
.el-slider__bar {
    height: 3px;
    background-color: #fff;
}
.el-slider__button {
    .size(12px);
}
</style>
