<template>
	<div class="m-info">
		<!-- 左侧菜单 -->
		<div class="m-left">
			<div class="u-logo"></div>
			<div class="m-tab">
				<span class="u-col" :class="[`u-col` + (i + 1), i == tabIndex - 1 ? 'active' : '']" v-for="(item, i) in menu" :key="item" @click="changeTab(i + 1)">
					<i :class="`u-txt` + (i + 1)"></i>
				</span>
			</div>
		</div>
		<!-- 右侧内容 -->
		<div class="m-right">
			<component :is="focus" :img_root="img_root" :index="tabIndex" />
		</div>
		<!-- 花 -->
		<div class="m-hua"></div>
		<!-- 火 -->
		<div class="m-fire"></div>
		<!-- 背景 -->
		<div class="m-bg" :style="`background-image: ` + bgImg"></div>
	</div>
</template>
<script>
import boss from "./boss.vue";
import equip from "./equip.vue";
import story from "./story.vue";
export default {
	name: "Shengdian",
	inject: ["__imgRoot"],
	data: function () {
		return {
			tabIndex: 1,
			menu: ["story", "boss", "equip"],
		};
	},
	computed: {
		img_root() {
			return this.__imgRoot + "sect/";
		},
		focus: function () {
			return this.menu[this.tabIndex - 1];
		},
		bgImg: function () {
			switch (this.tabIndex) {
				case 1:
					return `url('${this.img_root}bg1.png')`;
				case 2:
				case 4:
					return `url('${this.img_root}bg2.png')`;
				case 3:
				case 5:
					return `url('${this.img_root}bg3.png')`;
			}
			return `url('${this.img_root}bg1.png')`;
		},
	},
	watch: {},
	methods: {
		changeTab(i) {
			this.tabIndex = i;
			this.$router.push({ path: "/shengdian", query: { tab: i } });
		},
	},
	created: function () {
		this.tabIndex = this.$route.query.tab || 1;
	},
	mounted: function () {},
	components: {
		boss,
		equip,
		story,
	},
};
</script>

<style lang="less">
@import ".~@/assets/css/topic/shengdianyunqi/info.less";
</style>
