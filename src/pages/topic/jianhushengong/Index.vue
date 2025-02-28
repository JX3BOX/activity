<template>
	<div class="m-index">
<!--        p0-->
        <div class="m-p0">
            <div class="u-logo p-animation" v-animate="'fadeIn'"></div>
            <div class="u-p1 p-animation" v-animate="'fadeIn'"></div>
        </div>
<!--        p1-->
        <div class="m-p1 p-animation" v-animate="'fadeIn'">
            <div class="u-box">
                <div class="p-animation u-img" v-animate="'fadeIn'">
                    <img :src="imgurl+'p1-jhg.png'">
                </div>
                <div class="u-text p-animation" v-animate="'fadeIn'">
                    <span>剑湖宫为红衣教在南诏分坛的总部。阿萨辛特意选此作为其根据地，最重要的原因是想利用无量山下一处绝佳的修炼之地——隐藏于无量玉璧之后的千年寒冰洞。</span>
                    <span>
                    传闻洞内最深处的混元谷冰火共存，几百年来皆为南诏武林高手向往之地。然而，因其两极相差巨大，若是内力不高，则极易走火入魔。因此洞中常有遗失的神兵——都是在此修炼失败的高手所留下的，“剑湖”因此得名。
                </span>
                    <span>
                    后来，阿萨辛因在中原的计划失败，便想转移到南诏，派扶风将此地修建成红衣教在南诏的分部，得名“剑湖宫”。彼时恶人谷追杀叛逃的三大恶人至无量山，获悉三大恶人已与红衣教合作，并在秘密搬运恶人谷财宝，由陶寒亭与阮陵追查剑湖宫入口，势要将几人问罪。
                </span>
                </div>
                <div class="u-btn p-animation" v-animate="'fadeIn'">
                    <a href="https://origin.jx3box.com/fb/#/" target="_blank">
                        <img :src="imgurl+'gbgl.png'"/>
                    </a>
                </div>
            </div>

        </div>
<!--        p2 boss区域-->
        <div class="m-p2">
            <div class="m-boss-box p-animation" v-animate="'fadeIn'">
                <div class="u-boss" :class="getBossClass(i)" @click="bossActive=i" v-for="(item,i) in boss" :key="'boss'+i">
                    <img :src="imgurl+'bossactive.png'" class="u-img" />
                    <span class="u-boss-name">{{ item.site }}<br /> {{item.name}}</span>
                </div>
            </div>
            <div class="m-boss-info">
<!--                boss介绍内容区域-->
                <div class="u-boss-info">
                    <img class="u-img" :src="imgurl+'BOSS'+(bossActive+1)+'.png'" :class="bossActive==3?'boss4':''" />
                    <div class="u-boss-text">
                        <span class="u-boss-site">{{boss[bossActive].site}}</span>
                        <div class="u-boss-name">{{boss[bossActive].name}}</div>
                        <div class="u-boss-gist">{{boss[bossActive].gist}}</div>
                        <div class="u-boss-content" v-html="boss[bossActive].textHtml"></div>

                    </div>
                    <div class="u-fb-btn p-animation fadeIn">
                        <a href="https://origin.jx3box.com/fb/#/npc" target="_blank">
                            <img :src="imgurl+'slsj.png'" />
                        </a>
                    </div>
                </div>
                <div class="u-bottom-img"></div>
            </div>
        </div>
<!--        p3 八荒衡鉴-->
        <div class="p-animation m-p3-img" v-animate="'fadeIn'"></div>
        <div class="m-p3">
            <div class="m-bhhj">
                <div class="p-animation u-cover-img" v-animate="'fadeIn'">
                    <img :src="imgurl+'bhhj-left.png'" />
                </div>
                <div class="u-describe p-animation" v-animate="'fadeIn'">
                    <img :src="imgurl+'p2-title.png'" />
                    <div class="u-text">
                        若能成功破境「八荒衡鉴」，便可获得所藏秘宝，更可四海成名！<br/>
                        幻境之内荆棘遍布，隐元会为助侠觅宝，寻能人以其闯关经验绘制图纸，<br/>
                        破关要点皆有所述；若侠士依此路而行，通关几率将大有提升......
                    </div>
                    <div class="u-way">
                        进入方法：<br/>
                        NPC：季斯年（各大主城贡献昭示牌附近）<br/>
                        挑战人数：1-3人（难度视开启时的人数而定）
                    </div>
                    <div class="u-btn p-animation" v-animate="'fadeIn'" @click="toastMsg">
                        <img :src="imgurl+'ljqw.png'" />
                    </div>
                </div>
            </div>
        </div>
<!--        p4 觅宝奇缘-->
        <div class="p-animation m-p4-img" v-animate="'fadeIn'"></div>
        <div class="m-p4">
            <div class="m-mbqy">
                <div class="u-describe p-animation" v-animate="'fadeIn'">
                    <img :src="imgurl+'mbqy.png'" class="u-mbqy-img"/>
                    <div class="u-text">
                        八大宗门，奇缘现世。侠士组队前往各门派场景携手挖宝，<br/>
                        便有机会获得【玲珑多宝格】及【多宝珠】（共5种）<br/>
                        还有机会偶遇游货商或触发奇缘事件，获得海量【丹山水玉】！
                    </div>
                </div>
                <div class="p-animation u-cover-img" v-animate="'fadeIn'">
                    <img :src="imgurl+'mbqy-map.png'" />
                </div>
            </div>
        </div>
<!--        p5 轩辕秘宝-->
        <div class="p-animation m-p5-img" v-animate="'fadeIn'"></div>
        <div class="m-p5">
<!--            <div class="u-img">-->
<!--                <img :src="imgurl+'p4-xymb.png'">-->
<!--            </div>-->
            <div class="u-text text1">
                为酬谢各位豪侠前来助战，轩辕社将额外提供重磅秘宝作为奖励<br/>
                所有达成第一阶段挑战目标的侠士可参与秘宝竞拍<br/>
                达成第二阶段挑战目标的侠士可共同瓜分竞拍所得
            </div>
            <div class="u-text text2">
                每场世界任务首领活动结束后，秘宝奖池将出现多件PVP强力装备<br/>
                更有机会出现绑定版80级稀世神兵铸造材料「化玉玄晶」<br/>
                注：首批拍品为330品，奖池拍品将随赛季进程逐渐提品<br/>
                详细竞拍规则可在拍卖界面处了解。
            </div>
            <div class="u-made">
                <img :src="imgurl+'p4-jzty.png'">
                <div class="u-made-text">
                    现在，公共日常「驰援·轩辕社」不再受阶段限制<br/>
                    击败任意阶段敌人或收集道具可快速累计士气值，更快完成日常任务
                </div>
            </div>
        </div>
<!--        p6 玩法优化-->
        <div class="p-animation m-p6-img" v-animate="'fadeIn'"></div>
        <div class="p-animation m-p6-title" v-animate="'fadeIn'">
            <img :src="imgurl+'p5-title.png'">
        </div>
        <div class="m-p6">
            <img :src="imgurl+'p5-content1.png'" class="u-p6-img u-img-mb">
            <img :src="imgurl+'p5-content2.png'" class="u-p6-img u-img-mb">
            <img :src="imgurl+'p5-content3.png'" class="u-p6-img u-img-mb">
            <img :src="imgurl+'p5-content4.png'" class="u-p6-img u-img-mb">
            <img :src="imgurl+'p5-content5.png'" class="u-p6-img">
        </div>
<!--        二维码区域-->
        <div class="m-qrcode p-animation"  v-animate="'fadeIn'">
            <img :src="imgurl+'qrcode.png'">
        </div>
    </div>
</template>

<script>

const KEY = "jianhushengong";
import { getTopic } from "@/service/topic";
export default {
	name: "Index",
	props: [],
    components: {
    },
	data: function () {
		return {
            imgurl: "https://img.jx3box.com/topic/jianhushengong/",
            bossActive:0,
            boss:[
                {name:'褚吉光',site:'一号首领',gist:'机制要点:破招',textHtml:"褚吉光出身低微，贪财图宝，虽然身手不错，却习惯依附他人。<br/><br/>原是丐帮江陵分舵前任舵主冯宽手下，因其有武学天赋，曾得尹天赐指点棒法，而后成为了江陵分舵数一数二的好手。<br/><br/>后因冯宽被司空仲平处置，郭岩重整帮规，褚吉光自觉被断了财路，遂脱离丐帮，并对司空仲平怀恨在心。<br/><br/>天宝七年，褚吉光将司空仲平入宫盗珠的消息“卖”给柳公子换得柳公子的信任，从此跟随柳公子左右尽力讨好，以期能学到柳公子的盗术。"},

                {name:'柳公子',site:'二号首领',gist:'机制要点:闪避',textHtml:"江湖人称“大盗”，恶人谷十大恶人之一。<br/><br/>世上没有柳公子的手打不开的锁，也没有他看上却拿不走的东西，当把想要的东西盗到手之后，他还会将房间里的其他宝物一一破坏。<br/><br/>开元二十五年，柳公子为盗新罗贡品雪芙蓉独入大内，毁损诸多贡品后离开，因而被皇帝派兵追杀，逃入恶人谷。后因不满王遗风整治恶人谷而与康雪烛、陈和尚一同叛逃，并趁机将恶人谷的财宝盗出。"},

                {name:'扶风',site:'三号首领',gist:'机制要点:解谜',textHtml:"巴提推·扶风，红衣教六圣女之一，圣务门门主。<br/><br/>自小生活在红衣教，曾在年少时对一个男子动心，最后发现那人只是流连风月的花花公子，震怒之下杀其满门。<br/><br/>扶风从此变得特别敏感和暴躁，尤其痛恨男子，企图以杀更多的异教徒来赎清自己的罪。"},

                {name:'玄冥灵龟',site:'四号首领',gist:'机制要点:形态切换',textHtml:"被冰封起来的神兽。是一种类似于蛇龟的生物。<br/><br/>当地传说，正是这个神兽的存在才得以镇压无量山下的烈火。"},

                {name:'迦牟',site:'五号首领',gist:'机制要点:形态/切换',textHtml:"白马剑宗宗主，南诏剑术第一人。<br/><br/>被誉为“南诏剑神”，为人爽直骄傲，尚武，尤为介意胜负，但也不是个赖账的人。<br/><br/>一年前，有“贵客”拜访南诏王，以夺取混元谷魔剑为题与迦牟比试，那年轻人获胜后提出借走“南诏剑神”名号一年。<br/><br/>于是这一年中恰巧修炼进入瓶颈的迦牟选择留在混元谷修炼，险些走火入魔，直至阅读了柳公子带来的《寒冰诀》才有所好转。"},
            ]
		};
	},
	directives: {
		animate: {
			inserted: function (el, binding) {
				binding.addClass = () => {
					const { top } = el.getBoundingClientRect();
					const h = document.documentElement.clientHeight || document.body.clientHeight;
					if (top < h) {
						if (el.className.indexOf(binding.value) == -1) {
							// 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
							el.className = binding.value + " " + el.className;
						}
						if (binding.addClass) {
							window.removeEventListener("scroll", binding.addClass);
						}
					}
				};
				window.addEventListener("scroll", binding.addClass, true);
				binding.addClass();
			},
			unbind: function (el, binding) {
				if (binding.addClass) {
					window.removeEventListener("scroll", binding.addClass);
				}
			},
		},
	},
	computed: {
		data: function () {
			let _data = {};
			this.raw.forEach((item) => {
				if (!_data[item.subtype]) {
					_data[item.subtype] = [];
				}
				_data[item.subtype].push(item);
			});
			return _data;
		},
	},
	watch: {},
	methods: {
		init: function () {
			getTopic(KEY).then((res) => {
				this.raw = res.data.data;
				this.video = this.data.index_video[0]["link"];
				this.pve = this.data.index_pve;
				this.pvebanner = this.data.index_pve_banner;
				this.more = this.data.index_more || [];

				this.tabImg = this.pvebanner[0].img;
				this.tabImgLink = this.pvebanner[0].link;
			});
		},
        getBossClass(i){
            // bossActive===i?'u-boss-active':''"
            let c=['boss'+(i+1)];
            if(this.bossActive===i){
                c.push('u-boss-active')
            }
            return c;
        },
        toastMsg(){
            alert('敬请期待')
        }
	},
	filters: {},
	created: function () {},
	mounted: function () {
		// this.init();
	},
};
</script>

<style lang="less">
 @import "~@/assets/css/topic/jianhushengong/index.less";
</style>
