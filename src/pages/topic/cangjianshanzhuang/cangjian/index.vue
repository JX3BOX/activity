<template>
  <div class="m-cangjian">
    <!-- 左侧菜单 -->
    <div class="m-left">
      <div class="u-logo"></div>
      <div class="m-tab">
        <span
          class="u-col"
          :class="[`u-col` + (i + 1), i == tabIndex - 1 ? 'active' : '']"
          v-for="(item, i) in menu"
          :key="item"
          @click="changeTab(i + 1)"
        >
          <i :class="`u-txt` + (i + 1)"></i>
        </span>
      </div>
    </div>
    <!-- 右侧内容 -->
    <div class="m-right">
      <component :is="focus" :img_root="img_root" :index="tabIndex" />
    </div>
    <!-- 叶子 -->
    <div class="m-leaf"></div>
    <!-- 背景 -->
    <div class="m-bg" :style="`background-image: ` + bgImg"></div>
  </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import mount from "./mount.vue";
import skill from "./skill.vue";
import weapon from "./weapon.vue";
import equip from "./equip.vue";
import story from "./story.vue";
export default {
  name: "Cangjian",
  props: [],
  data: function () {
    return {
      img_root: __imgPath + "topic/cangjianshanzhuang/sect/",
      tabIndex: 1,
      menu: ["story", "mount", "skill", "weapon", "equip"],
    };
  },
  computed: {
    focus: function () {
      return this.menu[this.tabIndex - 1];
    },
    bgImg: function () {
      switch (this.tabIndex) {
        case 1:
          return `url('${this.img_root}bg.png')`;
        case 2:
        case 4:
          return `url('${this.img_root}bg1.png')`;
        case 3:
        case 5:
          return `url('${this.img_root}bg2.png')`;
      }
      return `url('${this.img_root}bg.png')`;
    },
  },
  watch: {},
  methods: {
    changeTab(i) {
      this.tabIndex = i;
    },
  },
  filters: {},
  created: function () {},
  mounted: function () {},
  components: {
    mount,
    skill,
    weapon,
    equip,
    story,
  },
};
</script>

<style lang="less">
@import ".~@/assets/css/topic/cangjianshanzhuang/cangjian.less";
</style>
