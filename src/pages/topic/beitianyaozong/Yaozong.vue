<template>
    <div class="p-topic-yaozong-wrapper">
        <div class="p-yaozong" :style="{ backgroundImage: changebg ? otherImg : getBgUrl(index) }">
            <div class="m-yaozong-bg">
                <img :src="img_root + 'bg' + i + '.jpg'" v-for="(item, i) in 6" :key="i" />
            </div>
            <div class="wp p-yaozong-container">
                <div class="m-yaozong-box">
                    <!-- 左侧菜单 -->
                    <div class="m-yaozong-menu">
                        <div class="u-menubg"></div>
                        <div
                            v-for="(item, i) in menu"
                            :key="item"
                            :class="i == index ? 'active' : ''"
                            @click="changeMenu(i)"
                            class="u-menubox"
                        >
                            <span :class="`u-menu` + (i + 1)"></span>
                        </div>
                    </div>
                    <!-- 右侧内容 -->
                    <div class="m-yaozong-content">
                        <component
                            :is="focus"
                            :img_root="img_root"
                            :index="index"
                            @changeBg="changeBg"
                        />
                    </div>
                </div>
                <!-- 山水云 -->
                <div class="m-yaozong-landscape">
                    <img class="lb" :src="img_root + 'land-lb.png'" />
                    <img class="rt" :src="img_root + 'land-rt.png'" />
                    <img class="rb" :src="img_root + 'land-rb.png'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import mount from "./mount.vue";
import scenery from "./scenery.vue";
import skill from "./skill.vue";
import weapon from "./weapon.vue";
import equip from "./equip.vue";
import story from "./story.vue";

export default {
    name: "Yaozong",
    props: [],
    components: {},
    data: function () {
        return {
            // 背景ROOT
            img_root: __cdn + "design/topic/beitianyaozong/sect/",
            // 当前索引
            index: 0,
            menu: ["story", "mount", "skill", "weapon", "equip"],
            changebg: false,
            otherImg: "",
        };
    },
    computed: {
        focus: function () {
            return this.menu[this.index];
        },
    },
    watch: {},
    methods: {
        changeMenu(i) {
            this.index = i;
            this.changebg = false;
        },
        getBgUrl: function (i) {
            return `url('${this.img_root}bg${i}.jpg')`;
        },
        getWeaponUrl: function (i) {
            if (i == 3) {
                return `url('${this.img_root}bg${i}.jpg')`;
            }
            return `url('${this.img_root}wuqi${i}.jpg')`;
        },

        changeBg(i, name) {
            this.changebg = true;
            if (name == "weapon") {
                this.otherImg = this.getWeaponUrl(i);
            }
        },

    },
    filters: {},
    created: function () {},
    mounted: function () {},
    components: {
        mount,
        scenery,
        skill,
        weapon,
        equip,
        story,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/beitianyaozong/yaozong.less";
</style>
