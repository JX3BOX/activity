<template>
	<div class="m-info-boss">
		<arr :len="len" :index="index" @toTurn="toTurn"></arr>
		<div v-for="item in len" :key="item" class="u-box" :class="[item == index ? '' : 'u-hide', `u-box${item}`]">
			<template v-if="item == index">
				<img class="u-img p-animation bounceIn" :src="img_root + `boss${item}.png`" />
				<img class="u-txt p-animation bounceIn" :src="img_root + `boss${item}_text.png`" />
			</template>
		</div>
	</div>
</template>

<script>
import arr from "./arr.vue";
export default {
	name: "boss",
	props: ["img_root"],
	components: { arr },
	data: function () {
		return {
			len: 6,
			index: 1,
		};
	},
	computed: {},
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
