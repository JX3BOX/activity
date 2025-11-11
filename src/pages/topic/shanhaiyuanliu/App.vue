<template>
	<!-- 专题页 -->
	<div class="p-topic" :class="'v-' + page_name">
		<Header :overlayEnable="true"></Header>
        <div id="box">
            <router-view></router-view>
        </div>
		<div class="p-topic-footer">
			<div class="wp">
				<Footer></Footer>
			</div>
		</div>
	</div>
</template>

<script>
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __cdn } from "@/utils/config";
export default {
	name: "App",
	props: [],
	components: {},
	data: function () {
		return {};
	},
	provide: {
		__imgRoot: __cdn + "design/topic/demo/",
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
		postStat("topic", "shanhaiyuanliu");
	},
	mounted: function () {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        var screen_width = width; //屏幕宽度
        if (width < height) {
            screen_width = height; //如果 是竖屏，灵感的宽度就等于屏高

            const contentDOM = document.getElementById("box");
            contentDOM.style.width = height + "px";
            contentDOM.style.height = width + "px";
            contentDOM.style.top = (height - width) / 2 + "px";
            contentDOM.style.left = 0 - (height - width) / 2 + "px";
            contentDOM.style.transform = "rotate(90deg)";
        }
    },
};
</script>

<style lang="less">
@import "~@/assets/css/topic/common/common.less";
</style>
