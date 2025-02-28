<template>
	<div class="m-info-story">
		<arr :len="len" :index="index" @toTurn="toTurn"></arr>
		<div v-for="item in len" :key="item" :class="[item == index ? '' : 'u-hide', `u-box${item}`]">
			<template v-if="item == index">
				<img class="u-txt p-animation bounceIn" :src="img_root + `text${item}.png`" />
				<img class="u-img p-animation bounceIn" :src="img_root + `text${item}_people.png`" />
			</template>
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
			len: 1,
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
