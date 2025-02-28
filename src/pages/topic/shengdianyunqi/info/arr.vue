<template>
	<div class="m-arr">
		<span class="u-arr u-prev" @click="turn(0)" v-if="index > 1"></span>
		<span class="u-arr u-next" @click="turn(1)" v-if="index < len"></span>
	</div>
</template>
<script>
export default {
	name: "arr",
	props: ["len", "index"],
	data: function () {
		return {};
	},
	methods: {
		turn: function (direction) {
			this.$emit("toTurn", direction);
		},
	},
};
</script>

<style lang="less">
.m-arr {
	.pa;
	.lt(0);
	.size(100%);
	.u-arr {
		.pointer;
		background-image: url("@{kv_shengdianyunqi}/sect/arr.png");
		background-repeat: no-repeat;
		background-position: center center;
		.size(54px, 105px);
		.pa;
		.z(9);
		padding: 0 40px;
	}

	.u-prev {
		transform: rotate(180deg) translateY(-50%);
		// transform-origin: 0 0;
		.lt(0,50%);
		margin-top: -40px - 105px;
	}
	.u-next {
		.rt(0,50%);
		transform: translateY(-50%);
		// margin-right: 40px;
		margin-top: -40px;
	}
}
</style>
