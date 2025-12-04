<template>
    <section class="m-introduction">
        <div v-for="(item, i) in html" :key="i">
            <div class="m-section">
                <img :src="`${__imgRoot}${item.img}`" class="u-title" />
                <div class="u-content" v-if="i == 0">
                    <span v-html="item.rules"> </span>
                    <a href="https://www.jx3box.com/publish/#/community" target="_blank" class="u-enter"
                        ><img :src="`${__imgRoot}enter.png`"
                    /></a>
                    <span v-html="item.date"> </span>
                </div>
                <div class="u-content" v-else v-html="item.content"></div>
            </div>
            <div class="u-line" v-if="i < html.length - 1"></div>
        </div>
    </section>
</template>
<script>
export default {
    inject: ["__imgRoot"],
    data: function () {
        return {
            html: [
                {
                    title: "参赛须知",
                    img: "info-title-1.png",
                    rules: "<h3>创作规则</h3><p>围绕着「剑网3」或「剑网3缘起」，前往【魔盒论坛-讨论】板块发布你创意的剑三玩法！<br/>注意：给你的作品来个响当当的概括吧~所有作品需在开头简短概括一下，否则无法录入专题页</p><p>1、可以是单人、双人或多人玩法。<br />2、可以是利用已有地图和道具构思场景，也可以加入你的家园作品作为单位，亦或是剑三编辑器中你构造的场景。<br />3、可以增加NPC互动或协作，设计自己创意的QTE技能等。</p>",
                    date: "<h3>活动时间</h3><p>11月9日0:00 ~ 11月30日24:00</p>",
                },
                {
                    title: "活动奖励",
                    img: "info-title-2.png",
                    content: `<table style="border-collapse: collapse;width: 100%; table-layout: fixed;"><tbody><tr><td>奖项（可重复获得）</td><td width="100">获奖人数</td><td>盒币奖励</td><td>社区奖励</td><td>奖项说明</td></tr><tr><td>comingsoon</td><td>1</td><td><span>50000盒币/篇</span><span>故宫冰箱贴</span></td><td><span>社区勋章</span><span>社区称号</span><span>积分1000点</span></td><td>神秘嘉宾组评定</td></tr><tr><td>todolist</td><td>3</td><td>20000盒币/篇</td><td><span>社区勋章</span><span>社区称号</span><span>积分500点</span></td><td>神秘嘉宾组评定</td></tr><tr><td>awesome</td><td>魔盒评分<br/>1~5名</td><td>10000盒币/篇</td><td><span>社区勋章</span><span>社区称号</span><span>积分500点</span></td><td>魔盒评委小组综合评定</td></tr><tr><td>undefined</td><td>魔盒评分<br/>6~10名</td><td>5000盒币/篇</td><td><span>社区勋章</span><span>社区称号</span><span>积分200点</span></td><td><span>创意奖</span><span>（魔盒小组评定）</span></td></tr><tr><td>sortdesc</td><td>5</td><td>5000盒币/篇</td><td><span>社区勋章</span><span>社区称号</span><span>积分200点</span></td><td>投票</td></tr><tr><td>优选作品</td><td>-</td><td>100-5000盒币</td><td>社区勋章</td><td>你的才思值得这个奖</td></tr><tr><td>投票幸运奖</td><td>1</td><td>故宫冰箱贴</td><td>积分1000点</td><td>参与投票的侠士中随机抽取</td></tr><tr><td>投票参与奖</td><td>-</td><td>-</td><td>积分100点</td><td>投票皆可得</td></tr></tbody></table><br/><img src="https://cdn.jx3box.com/design/event/xuanfuleidong/prize.png"> 
`
                },
                {
                    title: "评选流程",
                    img: "info-title-3.png",
                    content:
                        "<h3><span>&lt; 1 &gt;</span>基础评选阶段</h3><p>所有参赛作品默认可被魔盒论坛编辑进行品鉴（常规品鉴）。其他侠士可以对作品进行评论、点赞等互动。此阶段仅供编辑进行常规品鉴操作与促进大家交流和互动，不直接影响最终评选结果。</p><h3><span>&lt; 2 &gt;</span>编辑初选阶段</h3><p>魔盒活动小组将审阅所有参赛作品，将根据作品的创意、完成度等因素进行评判，并优选优秀作品录入专题页。</p><h3><span>&lt; 3 &gt;</span>玩家投票阶段</h3><p>投票期用户可前往专题页/小程序投票。单个账号限制三票，且单个账号对单个作品仅可投票一次。<br/> > sortdesc奖 按照玩家投票来评定<br/> > awesome及undefined奖 由魔盒小组评定<br/> > comingsoon及todolist奖 由神秘嘉宾评定</p><h3><span>&lt; 4 &gt;</span>结果公示阶段</h3><p>于公示期在专题页面公示获奖作品及作者。</p>",
                },

                {
                    title: "补充说明",
                    img: "info-title-4.png",
                    content:
                        '<h3>注意事项</h3><p>1、参赛作品必须为原创且符合<a target="_blank" href="https://www.jx3box.com/notice/21022" style="color: #7FDAF9;">《魔盒创作公约》</a>，严禁抄袭。<br/>2、作品一经发布需保持公开状态，否则视为放弃参赛。<br/>3、主办方保留对活动规则解释和修改的权利。</p><h3>申诉机制</h3><p>1、结果公示后，将设置为期2天的申诉期。<br/>2、如有玩家对结果有异议（如怀疑有抄袭行为），可以向活动组提出申诉。<br/>3、活动组核实后，如发现问题，保留调整结果的权利。</p>',
                },
            ],
        };
    },
};
</script>
