<template>
	<div class="m-info-equip">
		<img class="u-txt p-animation bounceIn" :src="img_root + `mode_text.png`" />
		<img class="u-img25 p-animation bounceIn" :src="img_root + `mode_25.png`" />
		<img class="u-img10 p-animation bounceIn" :src="img_root + `mode_10.png`" />
	</div>
</template>

<script>
export default {
	name: "equip",
	props: ["img_root"],
	components: {},
	data: function () {
		return {};
	},
	methods: {},
};
</script>
