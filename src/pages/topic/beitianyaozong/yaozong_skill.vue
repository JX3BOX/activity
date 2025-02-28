<template>
    <div class="m-yaozong-skill">
        <header class="u-header">
            <div class="u-title">
                {{current_title}}
                <!-- <i class="el-icon-arrow-right"></i> -->
            </div>
            <ul class="u-tabs">
                <li v-for="(item,i) in tabs" :key="item">
                    <img
                        :src="item | resolveImagePath"
                        @click="setActive(i)"
                        :class="{active : i==active}"
                    />
                </li>
            </ul>
        </header>
        <div class="u-desc" v-html="current_desc"></div>
        <i class="u-logo"></i>
    </div>
</template>

<script>
export default {
    name: "YaozongSkill",
    props: ["data"],
    components: {},
    data: function () {
        return {
            active: 0,
        };
    },
    computed: {
        current: function () {
            return this.data?.[this.active];
        },
        current_title: function () {
            return this.current?.["title"];
        },
        current_desc: function () {
            return this.current?.["desc"];
        },
        tabs: function () {
            return this.data?.map((item) => {
                return item.img;
            });
        },
    },
    watch: {},
    methods: {
        setActive: function (i) {
            this.active = i;
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.m-yaozong-skill {
    .pr;
}
@h: 70px;
.u-header {
    .h(@h);
    background-color: rgb(72, 104, 115);
    .pr;
    padding-left: 120px;
}
.u-title {
    .fz(32px,@h);
    .lh(@h);
    color: #fff;
}
.u-tabs {
    .pa;
    .rt(0);
    list-style: none;
    .clearfix;
    margin: 0;
    li {
        .fl;
        .size(@h);
        .pointer;
        img {
            .db;
            .size(100%);
            transition: 0.1s ease-in;
            .tm(0.4);
        }
        .active {
            .tm(1);
        }
    }
}
.u-desc {
    .fz(16px,2);
    padding: 40px;
    white-space: pre-line;
    .h(208px);
    box-sizing: border-box;
    background: url("@{kv_beitianyaozong}skill_posts_bg.png") #fff no-repeat
        right -200px;
    background-size: 40% auto;
}
.u-logo {
    background: url("@{kv_beitianyaozong}yaozong_logo.png") no-repeat 0 0;
    .size(121px,171px);
    .db;
    .pa;
    .lt(0,-50px);
}
</style>