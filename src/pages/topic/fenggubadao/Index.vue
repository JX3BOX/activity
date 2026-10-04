<template>
    <main class="m-fenggu" :class="{ 'is-app': appMode }">
        <section class="m-kv">
            <img class="u-kv-logo" :src="asset('logo1.png')" alt="剑网3 缘起 × JX3BOX 魔盒" />
            <div class="m-kv-content a-enter">
                <img class="u-kv-title" :src="asset('bt0.png')" alt="风骨霸刀" />
                <div class="u-kv-label"><img :src="asset('bt.png')" alt="" /><strong>魔盒专题页</strong></div>
            </div>
        </section>

        <section class="m-section m-sect">
            <img class="u-title a-enter" :src="asset('bt1.png')" alt="新门派 霸刀山庄" />
            <div class="m-tabs m-sect-tabs">
                <button
                    v-for="(tab, index) in sectTabs"
                    :key="tab"
                    :class="{ active: sectTab === index }"
                    @click="sectTab = index"
                >
                    {{ tab }}
                </button>
            </div>
            <div class="m-sect-panel">
                <div v-if="sectTab === 0" class="m-sect-background">
                    <img :src="asset('p1-1.png')" alt="霸刀山庄" />
                    <div class="u-sect-copy">
                        <p>河朔太行山，大唐武林四大家族之一</p>
                        <p>九天武座看守者，表面治炼名刀，实则守护天下兵甲</p>
                        <p>霸王刀法气壮山河，扬刀大会名动江湖</p>
                    </div>
                </div>
                <template v-else-if="sectTab === 1">
                    <div class="m-scene-stage">
                        <button class="u-arrow is-left" aria-label="上一张" @click="changeSect(-1)">‹</button>
                        <img class="u-scene" :src="asset(sectScenes[sceneIndex])" alt="霸刀山庄场景" />
                        <button class="u-arrow is-right" aria-label="下一张" @click="changeSect(1)">›</button>
                    </div>
                    <p class="u-scene-copy"><i></i>{{ sceneDescriptions[sceneIndex] }}</p>
                    <div class="u-dots" aria-label="门派场景导航">
                        <button
                            v-for="(scene, index) in sectScenes"
                            :key="scene"
                            :class="{ active: sceneIndex === index }"
                            :aria-label="`查看第${index + 1}张门派场景`"
                            :aria-current="sceneIndex === index ? 'true' : null"
                            @click="sceneIndex = index"
                        ></button>
                    </div>
                </template>
                <div v-else class="m-sect-position">
                    <img class="u-position-character" :src="asset('p1-3.png')" alt="霸刀" />
                    <div class="u-position-info">
                        <h3><img :src="asset('logo3.png')" alt="" />北傲诀</h3>
                        <p><b>定位</b><span>近战输出</span></p>
                        <div class="u-item">
                            <b>三体态战斗</b>
                            <div class="u-skills">
                                <span v-for="skill in positionSkills" :key="skill.name">
                                    <img :src="asset(skill.image)" :alt="skill.name" />{{ skill.name }}
                                </span>
                            </div>
                            <span class="u-position-text">铁骨铮铮、重义轻生的燕赵<br />豪侠气质</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="m-section m-dungeon">
            <img class="u-title a-enter" :src="asset('bt2.png')" alt="新副本 风雷刀谷" />
            <div class="m-tabs">
                <button
                    v-for="(tab, index) in dungeonTabs"
                    :key="tab"
                    :class="{ active: dungeonTab === index }"
                    @click="selectDungeon(index)"
                >
                    {{ tab }}
                </button>
            </div>
            <div class="m-dungeon-panel">
                <button class="u-arrow is-left" aria-label="上一位首领" @click="changeBoss(-1)">‹</button>
                <div class="m-dungeon-stage">
                    <div v-if="bossIndex < 0" :key="dungeonTab" class="m-dungeon-cover" ref="cover">
                        <img :src="asset(activeDungeon.cover.image)" :alt="activeDungeon.cover.name" />
                        <p
                            class="u-dungeon-cover-copy"
                            :class="{
                                'is-light': dungeonTab === 1,
                                'is-scrolling': !appMode && coverInView && !coverCopyPlayed[dungeonTab],
                                'is-done': coverCopyPlayed[dungeonTab],
                            }"
                            :style="{ '--scroll-lines': scrollLines }"
                            @animationend="markCoverCopyPlayed"
                        >
                            <span class="u-dungeon-cover-copy-text">{{ activeDungeon.cover.copy }}</span>
                        </p>
                    </div>
                    <template v-else>
                        <img class="u-boss-frame" :src="asset('boss/bossbg.png')" alt="" />
                        <img
                            class="u-boss-figure"
                            :class="currentBossClass"
                            :src="asset(currentBoss.image)"
                            :alt="currentBoss.name"
                        />
                        <img
                            class="u-boss-name"
                            :class="currentBossClass"
                            :src="asset(currentBoss.nameImage)"
                            :alt="currentBoss.name"
                        />
                        <p class="u-boss-copy">{{ currentBoss.copy }}</p>
                    </template>
                    <div
                        class="m-boss-list"
                        :class="{ 'is-cover': bossIndex < 0, 'has-five-bosses': activeDungeon.bosses.length > 3 }"
                    >
                        <button
                            v-for="(boss, index) in activeDungeon.bosses"
                            :key="boss.image"
                            :class="{
                                active: bossIndex === index,
                                'is-cover-selected':
                                    appMode && bossIndex < 0 && index === activeDungeon.bosses.length - 1,
                            }"
                            @click="bossIndex = index"
                        >
                            <img :src="asset(boss.avatar)" :alt="boss.name" /><span>{{ boss.name }}</span>
                        </button>
                    </div>
                </div>
                <button class="u-arrow is-right" aria-label="下一位首领" @click="changeBoss(1)">›</button>
                <div class="u-boss-dots">
                    <button
                        v-for="index in activeDungeon.bosses.length + 1"
                        :key="index"
                        :class="{ active: bossIndex === index - 2 }"
                        @click="bossIndex = index - 2"
                    ></button>
                </div>
            </div>
        </section>

        <section class="m-section m-play">
            <img class="u-title a-enter" :src="asset('bt3.png')" alt="新玩法 淬体成锋" />
            <div class="m-tabs">
                <button
                    v-for="(tab, index) in playTabs"
                    :key="tab"
                    :class="{ active: playTab === index }"
                    @click="playTab = index"
                >
                    {{ tab }}
                </button>
            </div>
            <div class="m-play-panel" :class="{ 'is-trial': playTab === 1 }">
                <template v-if="playTab === 0">
                    <p v-if="appMode" class="u-play-intro">淬体成锋孤入境，百战铸甲踏云巅</p>
                    <img :src="asset('p3-1.png')" alt="淬体成锋玩法" />
                    <p v-if="appMode" class="u-play-description">
                        主城寻找NPC柳沉舟，选择层数开启挑战！<br />淬剑珠还可通过行侠令、九宫奇卦活<br />跃度奖励、剑踪幻域获得，其中剑踪幻域获<br />得的淬剑珠与新玩法共享周上限。
                    </p>
                    <div class="m-play-actions">
                        <a
                            v-for="action in playActions"
                            :key="action.label"
                            :href="action.link"
                            target="_blank"
                            rel="noopener"
                            ><strong>{{ action.label }}</strong
                            ><small>{{ action.detail }}</small></a
                        >
                    </div>
                </template>
                <div v-else class="m-trial-panel">
                    <h3>六大首领</h3>
                    <div class="m-trial-bosses">
                        <img v-for="boss in trialBosses" :key="boss.image" :src="asset(boss.image)" :alt="boss.name" />
                    </div>
                    <ul>
                        <li v-for="line in trialCopy" :key="line" v-html="line"></li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="m-section m-pvp">
            <img class="u-title a-enter" :src="asset('bt4.png')" alt="新PVP日常 洛阳神兵暗角逐" />
            <div class="m-pvp-panel a-enter">
                <img :src="asset('p4-1.png')" alt="洛阳神兵暗角逐" />
                <div class="m-pvp-flags">
                    <a v-for="flag in pvpFlags" :key="flag.title" :href="flag.link" target="_blank" rel="noopener"
                        ><strong>{{ flag.title }}</strong
                        ><span class="u-flag-detail"
                            ><i
                                v-for="(line, lineIndex) in flag.detail"
                                :key="line.text"
                                :class="{ 'has-mark': line.mark, 'is-last': lineIndex === flag.detail.length - 1 }"
                                >{{ line.text }}</i
                            ></span
                        ></a
                    >
                </div>
            </div>
        </section>

        <section class="m-section m-encounter">
            <img class="u-title a-enter" :src="asset('bt5.png')" alt="全新奇遇" />
            <div class="m-tabs">
                <button
                    v-for="(tab, index) in encounterTabs"
                    :key="tab"
                    :class="{ active: encounterTab === index }"
                    @click="encounterTab = index"
                >
                    {{ tab }}
                </button>
            </div>
            <div v-if="encounterTab === 0" class="m-encounter-card">
                <a href="https://origin.jx3box.com/cj/view/7494" target="_blank" rel="noopener"
                    ><img :src="asset('p5-1.png')" alt="舞众生奇遇"
                /></a>
            </div>
            <div v-else class="m-pets">
                <a v-for="pet in pets" :key="pet.name" :href="pet.link" target="_blank" rel="noopener"
                    ><img :src="asset(pet.image)" :alt="pet.name" /><span
                        ><small>{{ pet.subtitle }}</small
                        ><b>{{ pet.name }}</b></span
                    ></a
                >
            </div>
            <img class="u-encounter-footer-logo" :src="asset('logo2.png')" alt="剑网3 缘起 × JX3BOX 魔盒" />
        </section>
    </main>
</template>

<script>
const ASSET_ROOT = "https://cdn.jx3box.com/design/topic/fenggubadao/";
export default {
    name: "FengguBadaoIndex",
    props: { appMode: { type: Boolean, default: false } },
    data() {
        return {
            sectTab: 0,
            sceneIndex: 0,
            dungeonTab: this.appMode ? 1 : 0,
            bossIndex: -1,
            coverCopyPlayed: [false, false],
            coverInView: false,
            playTab: this.appMode ? 1 : 0,
            encounterTab: this.appMode ? 1 : 0,
            sectTabs: ["门派背景", "门派场景", "门派定位"],
            dungeonTabs: ["风雷刀谷·锻刀厅", "风雷刀谷·千雷殿"],
            playTabs: ["淬体成锋", "层层试炼"],
            encounterTabs: ["江湖奇遇", "宠物奇遇"],
            sectScenes: ["p1-2-1.png", "p1-2-2.png", "p1-2-3.png", "p1-2-4.png", "p1-2-5.png"],
            sceneDescriptions: [
                "山庄主殿，扬刀大会举办地",
                "风雷交汇，刀谷试炼之地",
                "山庄内殿，传承霸刀风骨",
                "隐于山林的霸刀居所",
                "晶矿深处，蕴藏刀谷秘闻",
            ],
            positionSkills: [
                { name: "秀明尘身", image: "jn_02.png" },
                { name: "松烟竹雾", image: "jn_01.png" },
                { name: "雪絮金屏", image: "jn_03.png" },
            ],
            dungeons: [
                {
                    cover: {
                        name: "风雷刀谷·锻刀厅",
                        image: "p2-1.png",
                        copy: "风雷刀谷深处，\n锻刀之火昼夜不息。\n这里是霸刀山庄锻造神兵的核心所在，\n也是柳家秘密的中心。\n安史之乱爆发后，\n风雷刀谷四爷柳鸾旗暗中与狼牙军史思明合作，\n将霸刀铸造的精良兵器源源不断地输送给狼牙。\n锻刀厅厅首柳愚野心勃勃，\n总管柳哲在情义与大局之间艰难周旋。\n史思明之女史朝英更拜入刀谷，\n将这潭深水搅得更加浑浊……\n侠士将深入锻刀厅，\n直面刀谷内部的暗流涌动……",
                    },
                    bosses: [
                        {
                            name: "壹·史朝英",
                            image: "boss/boss01.png",
                            nameImage: "boss/id01.png",
                            avatar: "tx_01.png",
                            copy: "史朝英是个同父亲史思明一样对权力有很深执念的人，为此她可以牺牲一切。\n在史朝英于风雷刀谷修行的过程中，她结识了四爷柳鸾旗长孙柳时清。\n在她的刻意接近下，柳时清很容易便栽入了史朝英编织的爱河之中。\n柳鸾旗认为他们两人是亲上加亲，更有利于狼牙军和风雷刀谷的联合。\n但柳秀岳却暗暗地开始提防这个弟子的心机。",
                        },
                        {
                            name: "贰·柳愚",
                            image: "boss/boss02.png",
                            nameImage: "boss/id02.png",
                            avatar: "tx_02.png",
                            copy: "柳愚是六爷柳鱼夫的独子，但他父母早逝，一直由大奶奶柳廷芳收养。对于他的父亲，山庄中一直有许多风言风语，大都是对父亲不利的评价。\n柳愚常会“偶然”听到这些评价，并且越发怨恨这些碎嘴的人。柳愚知道要让自己真正不再受人欺负，只能变得强大才行。\n所以柳愚自请入风雷刀谷，拜掌谷人三爷柳秀岳为师，苦练刀术和冶铸之术，在二十四岁时，得到柳秀岳的认可，被他委以重任，担任刀谷锻刀厅的厅首。",
                        },
                        {
                            name: "叁·柳哲",
                            image: "boss/boss03.png",
                            nameImage: "boss/id03.png",
                            avatar: "tx_03.png",
                            copy: "柳哲是个孤儿，从小被霸刀山庄收养，虽是由大奶奶柳廷芳抚养，但是记在六爷名下，六爷的儿子柳愚也就成了他的大哥。\n柳廷芳十分疼爱柳五爷的女儿柳夕，常带着柳夕在风雷刀谷中玩耍，于此柳哲从小便和柳夕有了许多接触，他很是亲近这个比自己年长的姐姐。\n柳哲自从柳夕死后，常年潜入日月塘中闭关修炼“大日月轮回刀法”，武学已然超越了义兄柳愚。",
                        },
                        {
                            name: "肆·柳时清",
                            image: "boss/boss04.png",
                            nameImage: "boss/id04.png",
                            avatar: "tx_04.png",
                            copy: "柳时清的父亲柳云桥当年在柳叶争斗中残疾，后来柳时清的爷爷柳鸾旗重金请来万花谷匠师，配合柳家熔炼金属的高超手段为柳云桥打造了一座以身体为兵刃，战力极强的机关龙甲，柳云桥的后半生，让柳时清受到极大影响。\n在柳云桥死后，柳时清继承了龙甲，他常在亮甲台上驾驭龙甲与一些身穿重甲的下属相斗取乐，这次柳廷芳反对投靠史思明，柳鸾旗和柳时清爷孙将她关押后，将柳廷芳的拥护者俘虏。",
                        },
                        {
                            name: "伍·解语",
                            image: "boss/boss05.png",
                            nameImage: "boss/id05.png",
                            avatar: "tx_05.png",
                            copy: "解语出身解家，自从隋末解家自老祖天魔针解冰与其子解旭被长孙家所逼之下投靠了武家之后，解家子弟世代皆奉武家位尊，在武家门下，解氏精锐“暗军亭”与卢家执掌的十二冥煞实为武氏左膀右臂，缺一不可。\n解语修习的乃是传自解氏，由武家前辈武征王注释修改过的阴雨针法、穿林针等针法武技，其中以阴雨针针法最为缠绵，但也极为难修。",
                        },
                    ],
                },
                {
                    cover: {
                        name: "风雷刀谷·千雷殿",
                        image: "p2-7.png",
                        copy: "风雷刀谷最高处，\n千雷殿矗立于雷电之间。\n掌谷柳秀岳、器刃掌事柳鸾旗坐镇于此，\n刀谷的命运在此交汇。\n当暗中的合作终于浮出水面，\n风雷刀谷与霸刀山庄的决裂已不可避免。\n侠士需闯入千雷殿核心，\n直面刀谷掌权者的抉择与风暴……",
                    },
                    bosses: [
                        {
                            name: "壹·伊玛目",
                            image: "boss/boss06.png",
                            nameImage: "boss/id06.png",
                            avatar: "tx_06.png",
                            copy: "伊玛目身为祆教前长老，在中原潜伏多年，一直想壮大拜火教，然而他的阴谋实施地并不顺利。\n伊玛目了解到霸刀一脉乃是九天暗藏的武库，内藏无数神兵利器。若是能获得一二，便可速度实现他扩张拜火教势力的愿望。\n所以在史思明联系他时，他表现出对霸刀的兴趣，但他表面上协助史朝英入侵风雷刀谷，暗里却是在实现自己探究九天武库的欲望……",
                        },
                        {
                            name: "贰·柳秀岳",
                            image: "boss/boss07.png",
                            nameImage: "boss/id07.png",
                            avatar: "tx_07.png",
                            copy: "柳秀岳是刀谷掌谷，柳五爷的三哥。\n从小习武的资质虽然比不上四弟，但是格外努力，夏练三伏，冬练三九，靠自己的努力超过了四弟，成为了刀谷的掌谷之人。\n柳秀岳在四弟柳鸾旗的劝诱之下，决定与他一同恢复霸刀山庄荣光，为此他违背了柳五爷的禁令，重开千雷殿震离刑炉，引雷火锻造神兵。",
                        },
                        {
                            name: "叁·柳鸾旗",
                            image: "boss/boss08.png",
                            nameImage: "boss/id08.png",
                            avatar: "tx_08.png",
                            copy: "柳鸾旗是风雷刀谷的器刃掌事，天赋卓越却生性懒惰，他苦于修炼的辛苦，总想办法偷懒，所以渐渐被三哥和五弟超过。\n为维持表面风光，他兼修了许多其他门派的零招散式，颇能唬住眼力浅的武人，然而这些招式基本都是有神无质，难以用于与同级别高手实战。\n但是即使如此，柳鸾旗凭借自己的巧舌如簧和本身依然超出绝大多数常人的刀术，加上层出不穷的花招，依然在庄中获得了许多拥趸。",
                        },
                    ],
                },
            ],
            playActions: [
                { label: "五孔镶嵌", detail: "解锁更多武器潜能", link: "/" },
                { label: "品质分级", detail: "挑战更高品质", link: "/" },
                { label: "词条激活", detail: "搭配专属词条", link: "/" },
                { label: "属性增长", detail: "强化刀锋属性", link: "/" },
            ],
            trialBosses: [
                { name: "地鼠门分坛主", image: "sl_01.png" },
                { name: "红衣教宣使", image: "sl_02.png" },
                { name: "南诏军将", image: "sl_03.png" },
                { name: "铜钱会参宝堂主", image: "sl_04.png" },
                { name: "血尸将", image: "sl_05.png" },
                { name: "玉灵蟹", image: "sl_06.png" },
            ],
            trialCopy: [
                "<em>单人挑战</em>，孤狼玩家福音！",
                "<em>3分钟一局</em>，快速挑战绝不拖沓",
                "<em>轻度养成、长享受期</em>，带来不一样的驭剑体验！",
                "通关当前层数后，将直接解锁后5层",
                "失败也无妨，侠士可随时重整旗鼓再次挑战！",
            ],
            pvpFlags: [
                {
                    title: "节奏加快",
                    detail: [
                        { text: "甲乙两组任务轮换提速，", mark: true },
                        { text: "战斗更紧凑", mark: false },
                        { text: "车辇轮流刷新，体验更流畅", mark: true },
                    ],
                    link: "/pvp",
                },
                {
                    title: "玩法升级",
                    detail: [
                        { text: "击退狼牙兵保护物资车，", mark: true },
                        { text: "获取战斗贡献", mark: false },
                        { text: "治疗物资车、守卫同样获得贡献", mark: true },
                        { text: "水下打捞物资箱，探索水底秘境", mark: false },
                    ],
                    link: "/pvp",
                },
                {
                    title: "争夺神兵",
                    detail: [
                        { text: "双方阵营达到一定人数，", mark: true },
                        { text: "神兵方才现世", mark: false },
                        { text: "拔取神兵，同阵营侠士共享积分", mark: true },
                        { text: "占领据点持续获取积分", mark: false },
                    ],
                    link: "/pvp",
                },
            ],
            pets: [
                {
                    name: "富富",
                    subtitle: "烟花戏·春",
                    image: "cw_01.png",
                    link: "https://origin.jx3box.com/cj/view/6030",
                },
                {
                    name: "瑞瑞",
                    subtitle: "烟花戏·秋",
                    image: "cw_02.png",
                    link: "https://origin.jx3box.com/cj/view/6028",
                },
                {
                    name: "鸿鸿",
                    subtitle: "烟花戏·风",
                    image: "cw_03.png",
                    link: "https://origin.jx3box.com/cj/view/6031",
                },
            ],
        };
    },
    computed: {
        activeDungeon() {
            return this.dungeons[this.dungeonTab];
        },
        currentBoss() {
            return this.activeDungeon.bosses[this.bossIndex];
        },
        currentBossClass() {
            const previousBossCount = this.dungeons
                .slice(0, this.dungeonTab)
                .reduce((count, dungeon) => count + dungeon.bosses.length, 0);
            return `is-boss-${previousBossCount + this.bossIndex + 1}`;
        },
        scrollLines() {
            return this.activeDungeon.cover.copy.split("\n").length - 4;
        },
    },
    methods: {
        asset(name) {
            return ASSET_ROOT + name + "?v=20260930";
        },
        changeSect(offset) {
            this.sceneIndex = (this.sceneIndex + offset + this.sectScenes.length) % this.sectScenes.length;
        },
        changeBoss(offset) {
            const total = this.activeDungeon.bosses.length + 1;
            this.bossIndex = ((this.bossIndex + 1 + offset + total) % total) - 1;
        },
        selectDungeon(index) {
            this.dungeonTab = index;
            this.bossIndex = -1;
            this.coverCopyPlayed[index] = false;
            this.$nextTick(() => this.observeCover());
        },
        observeCover() {
            const el = this.$refs.cover;
            if (!el) return;
            if (this.coverObserver) this.coverObserver.disconnect();
            this.coverInView = false;
            this.coverObserver = new IntersectionObserver(
                (entries) =>
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.coverInView = true;
                        }
                    }),
                { threshold: 0.35 }
            );
            this.coverObserver.observe(el);
        },
        markCoverCopyPlayed() {
            this.coverCopyPlayed[this.dungeonTab] = true;
        },
    },
    mounted() {
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                }),
            { threshold: 0.15 }
        );
        this.$el.querySelectorAll(".a-enter").forEach((el) => observer.observe(el));
        this.$nextTick(() => this.observeCover());
    },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/topic/fenggubadao/index.less";
@import "~@/assets/css/topic/fenggubadao/app.less";
</style>
