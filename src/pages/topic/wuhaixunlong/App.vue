<template>
	<!-- 专题页 -->
	<div class="p-topic" :class="'v-' + page_name">
		<Header :overlayEnable="true"></Header>
		<router-view></router-view>
		<div class="p-topic-footer">
				<Footer darkMode></Footer>
		</div>
	</div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "App",
	props: [],
	components: {},
	data: function () {
		return {};
	},
	provide: {
		__imgRoot: __imgPath + "topic/wuhaixunlong/",
	},
	computed: {
		page_name: function () {
			return this.$route.name;
		},
	},
	watch: {},
	methods: {},
	filters: {},
	created: function () {
		postStat("topic", "wuhaixunlong");
	},
	mounted: function () { },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/common/common.less";
</style>
