<template>
    <div class="m-mapdisplay">
        <div class="u-mapdisplay fadeIn" v-for="(item, i) in list" :key="i" ref="displaybox">
            <img :src="buildImageUrl(item)" alt="风景" class="u-pic" />
            <div class="u-textbox">
                <span class="u-title">{{ item.title }}</span>
                <span class="u-desc">{{ item.desc }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MapDisplay",
    inject: ["__imgRoot"],
    props: [],
    components: {},
    data: function () {
        return {
            list: [
                {
                    url: "009/01.png",
                    title: "流体模拟 溪流飞瀑",
                    desc: "模拟流体的运动状态，实现逼真效果。",
                },
                {
                    url: "009/02.png",
                    title: "沉浸大气 天光云影",
                    desc: "全新的大气与云层系统，提升细腻渲染效果。",
                },
                {
                    url: "009/03.png",
                    title: "午夜晨夕 时光漫游",
                    desc: "以摄影级的后期效果呈现多样化视觉盛宴。",
                },
            ],
        };
    },
    computed: {},
    watch: {},
    methods: {
        buildImageUrl(item) {
            return this.__imgRoot + item.url;
        },
        slideShow(){
            const mapbox_list = this.$refs.displaybox;
            let i = 0;
            mapbox_list[0].style.display = "block";
            setInterval(() => {
                mapbox_list[i].style.display = "none";
                if(i === mapbox_list.length - 1){
                    i = 0;
                }else{
                    i++;
                }
                mapbox_list[i].style.display = "block";
            }, 3000);
        },
    },
    created: function () {},
    mounted: function () {
        this.slideShow();
    },
};
</script>

<style lang="less">
.m-mapdisplay{
    @w:1000px;
    @h:492px;
    .size(@w,@h);
    .auto(x);

    .u-mapdisplay{
        .size(@w,@h);
        position: absolute;
        display: none;
    }
    .u-pic {
        display: block;
    }
    .u-textbox{
        .size(480px,130px);
        background-color:#fdf5df;
        border:1px solid #bb9031;
        box-shadow:3px 3px 3px rgba(0,0,0,0.3);
        position: absolute;
        bottom:33px;

        left:50%;
        // margin-left:-240px;
        transform: translateX(-50%);

        text-align: center;
        color: #7A1F17;
    }

    .u-title{
        display: block;
        font-weight: 700;
        font-size: 24px;
        padding:15px 0;
    }

    .u-desc{
        width: 390px;
        display: block;
        .auto(x);
    }

    @keyframes mapFadeIn{
        from{opacity: 0;}
        to{opacity: 1;}
    }
    .fadeIn{
        animation: mapFadeIn 0.4s ease-in-out forwards;
    }

}
</style>
