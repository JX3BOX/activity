<template>
  <div class="m-cangjian-story">
    <arr :len="len" :index="index" @toTurn="toTurn"></arr>
    <img class="u-txt p-animation bounceIn" :src="img_root + `bg_txt.png`" v-if="index == 1" />
    <div class="u-box" v-else>
      <img class="u-txt1 p-animation bounceIn" :src="img_root + `bg_txt1.png`" />
      <img class="u-img p-animation bounceIn" :src="img_root + `bg_pic.png`" />
    </div>
  </div>
</template>

<script>
import arr from "./arr.vue";
export default {
  name: "story",
  props: ["img_root"],
  components: { arr },
  data: function () {
    return {
      len: 2,
      index: 1,
    };
  },
  methods: {
    toTurn(e) {
      if (e == 0) {
        this.index--;
      } else {
        this.index++;
      }
    },
  },
};
</script>