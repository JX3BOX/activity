<template>
    <div class="m-duanshi">
        <div class="u-list">
            <img class="u-img" v-for="(pic,i) in pics" :key="i" :src="buildImgUrl(pic)" :class="{'show':activeIndex == i}"/>
        </div>
        <div class="u-toggle" :class="{'show':isMultiple}" @click="toggleHandle">切换</div>
    </div>
</template>

<script>
export default {
    name: "duanshi",
    components: {},
    inject: ["__imgRoot"],
    props: {
        pics: {
            type: Array,
            default: () => [],
        },
    },
    data: function () {
        return {
            activeIndex : 0,
        };
    },
    computed: {
        isMultiple(){
            return this.pics.length > 1;
        },
    },
    watch: {},
    methods: {
        buildImgUrl(item) {
            return this.__imgRoot + item;
        },
        toggleHandle(){
            if(this.activeIndex == this.pics.length - 1){
                this.activeIndex = 0;
            }else{
                this.activeIndex = this.activeIndex + 1
            }
        }
    },
    created: function () {},
    mounted: function () {
    },
};
</script>


<style lang="less">
.m-duanshi{
    position: relative;

    .u-toggle{
        position: absolute;
        right: 20px;
        top:20px;
        color:#900;
        border:1px dashed #900;
        padding:2px 5px;
        cursor: pointer;

        display: none;

        &.show{
            display: block;
        }

        user-select: none;
    }

    .u-list{
        position: relative;
    }

    .u-img{
        position: absolute;

        transition: all 0.3s ease-in-out;
        opacity: 0;
        &.show{
            opacity: 1;
        }
    }
}
</style>
