<template>
  <div class="m-cangjian topic-mobile-baseline">
    <!-- 左侧菜单 -->
    <div class="m-left">
      <div class="u-logo"></div>
      <div class="m-tab">
        <span
          class="u-col"
          :class="[`u-col` + (i + 1), i == tabIndex - 1 ? 'active' : '']"
          v-for="(item, i) in menu"
          :key="item"
          role="button"
          tabindex="0"
          :aria-label="menuLabels[i]"
          :aria-pressed="i === tabIndex - 1"
          @click="changeTab(i + 1)"
          @keydown.enter="changeTab(i + 1)"
          @keydown.space.prevent="changeTab(i + 1)"
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
import { __cdn } from "@/utils/config";
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
      img_root: __cdn + "design/topic/cangjianshanzhuang/sect/",
      tabIndex: 1,
      menu: ["story", "mount", "skill", "weapon", "equip"],
      menuLabels: ["背景", "心法", "镇派", "武器", "校服"],
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
@import "~@/assets/css/topic/cangjianshanzhuang/cangjian.less";
@import "~@/assets/css/topic/mobile/baseline.less";

@media (max-width: 767px) {
  html.topic-cangjianshanzhuang body,
  #app .p-topic.v-cangjian {
    min-width: 0;
    width: 100%;
  }

  #app .v-cangjian .m-cangjian {
    display: block;
    isolation: isolate;
    height: auto;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 16px;
    background-position: center;
    background-size: cover;

    .p-animation {
      animation: none;
      opacity: 1;
    }

    .m-left,
    .m-right {
      width: min(100%, 640px);
      height: auto;
      margin: 0 auto;
      padding: 0;
    }

    .m-left > .u-logo {
      width: min(45%, 158px);
      height: clamp(60px, 24vw, 104px);
      margin: 0 auto 12px;
      background: url('@{kv_cangjianshanzhuang}sect/logo.png') center / contain no-repeat;
    }

    .m-tab {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 6px;
      height: auto;
      padding: 0;

      .u-col {
        width: 100%;
        min-height: 44px;
        height: auto;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        touch-action: manipulation;

        &:focus-visible {
          outline: 2px solid #ecca89;
          outline-offset: 2px;
        }

        > i {
          width: min(74%, 68px);
          height: 26px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
    }

    .m-right {
      display: block;
      margin-top: 12px;
      padding: 12px;
      background-position: center;

      img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
      }

      .m-cangjian-story,
      .m-cangjian-mount,
      .m-cangjian-skill,
      .m-cangjian-weapon {
        display: grid;
        gap: 12px;
        width: 100%;
        padding: 0;
      }

      .m-cangjian-story .u-box,
      .m-cangjian-weapon .u-box {
        display: grid;
        gap: 12px;
        padding: 0;
      }

      .m-cangjian-weapon .u-img {
        width: auto;
        max-width: 90%;
        max-height: 220px;
        object-fit: contain;
      }

      .m-cangjian-equip {
        display: grid;
        gap: 12px;
        padding: 0;

        > div {
          width: min(100%, 360px);
          margin: 0 auto;
        }
      }

      .m-arr {
        position: static;
        display: flex;
        justify-content: center;
        gap: 12px;
        order: 1;
        width: 100%;
        min-height: 44px;
        height: auto;

        .u-arr {
          position: static;
          width: 44px;
          height: 44px;
          margin: 0;
          padding: 0;
          background-size: auto 24px;
          touch-action: manipulation;
        }

        .u-prev {
          transform: rotate(180deg);
        }

        .u-next {
          transform: none;
        }
      }
    }

    > .m-leaf {
      display: none;
    }

    > .m-bg {
      z-index: -1;
      background-size: 100% auto;
      background-position: center top;
      background-repeat: no-repeat;
    }
  }
}
</style>
