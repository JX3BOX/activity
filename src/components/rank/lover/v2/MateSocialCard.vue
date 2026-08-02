<template>
    <article class="c-mate-social-card" :style="themeStyle">
        <div class="u-inner-border" aria-hidden="true"></div>
        <div class="u-divider" aria-hidden="true"></div>
        <img v-if="spriteUrl" class="u-school-sprite" :src="spriteUrl" alt="" />
        <div class="u-pluses" aria-hidden="true">＋　＋　＋</div>
        <div class="u-card-title">
            <strong>剑网3魔盒自介卡</strong>
            <span>Only the best can follow one's inclinations.</span>
            <span>This is the best state of life.</span>
        </div>

        <section class="u-photo-stack">
            <div class="u-photo-shadow"></div>
            <div class="u-polaroid">
                <div class="u-photo">
                    <img :src="portraitUrl" :alt="`${roleName} 的角色照片`" @error="portraitStage += 1" />
                    <span>{{ photoName }}</span>
                </div>
                <p>{{ quoteText }}</p>
            </div>
            <div class="u-heart" aria-hidden="true">♥</div>
        </section>

        <div class="u-jx3box" aria-hidden="true">
            <span v-for="(letter, index) in 'JX3BOX'" :key="`${letter}-${index}`">{{ letter }}</span>
        </div>

        <section class="u-profile">
            <div class="u-role-name"><span></span><h3>{{ roleName }}</h3></div>
            <div class="u-profile-lines">
                <strong>{{ card.mbti || "未知" }} / {{ card.gender || "未知" }} / {{ card.zodiac || "未知星座" }}</strong>
                <strong>{{ card.server || "区服未知" }} / {{ card.body_type || "体型未知" }} / {{ card.rank_tier || "段位未知" }}</strong>
                <span>在线：{{ card.online_time || "未填写" }} / 初入江湖：{{ joinYearText }}</span>
            </div>
            <div class="u-rule"><i></i><i></i></div>

            <section class="u-section u-game-view">
                <div class="u-section-title"><h4>游戏观</h4><span>PERSONAL INFORMATION</span></div>
                <p>{{ card.judgment || "这位侠士尚未留下游戏观判词。" }}</p>
            </section>

            <div class="u-bottom-grid">
                <section class="u-section">
                    <div class="u-section-title is-column"><h4>兴趣标签</h4><span>INTERESTS</span></div>
                    <div class="u-tags">
                        <em v-for="item in interests" :key="item">{{ item }}</em>
                        <small v-if="!interests.length">未选择</small>
                    </div>
                </section>
                <section class="u-section u-mindsets">
                    <div class="u-section-title is-column"><h4>常用心法</h4><span>OFTENPLAYED GAMES</span></div>
                    <div class="u-xinfas">
                        <el-tooltip v-for="item in mindsets" :key="item.name" :content="item.name" placement="top">
                            <span><img :src="item.icon" :alt="item.name" /></span>
                        </el-tooltip>
                        <small v-if="!mindsets.length">未选择心法</small>
                    </div>
                </section>
            </div>
        </section>
    </article>
</template>

<script>
import { getXinfaByName } from "@/utils/lover-v2-xf";

const ASSET_ORIGIN = "https://matecard.gyork.fun";
const XINFA_FORCE = Object.freeze({
    易筋经: "少林", 洗髓经: "少林", 花间游: "万花", 离经易道: "万花", 傲血战意: "天策",
    铁牢律: "天策", 紫霞功: "纯阳", 太虚剑意: "纯阳", 冰心诀: "七秀", 云裳心经: "七秀",
    毒经: "五毒", 补天诀: "五毒", 惊羽诀: "唐门", 天罗诡道: "唐门", 问水诀: "藏剑",
    山居剑意: "藏剑", 笑尘诀: "丐帮", 焚影圣诀: "明教", 明尊琉璃体: "明教", 铁骨衣: "苍云",
    分山劲: "苍云", 莫问: "长歌", 相知: "长歌", 北傲诀: "霸刀", 凌海诀: "蓬莱",
    隐龙诀: "凌雪", 太玄经: "衍天", 无方: "药宗", 灵素: "药宗", 孤锋诀: "刀宗",
    山海心诀: "万灵", 周天功: "段氏", 幽罗引: "无相",
});
const FORCE_SECT = Object.freeze({
    少林: "shaolin", 万花: "wanhua", 天策: "tiance", 纯阳: "chunyang", 七秀: "qixiu", 五毒: "wudu",
    唐门: "tangmen", 藏剑: "cangjian", 丐帮: "gaibang", 明教: "mingjiao", 苍云: "cangyun", 长歌: "changge",
    霸刀: "badao", 蓬莱: "penglai", 凌雪: "lingxue", 衍天: "yantian", 药宗: "yaozong", 刀宗: "daozong",
    万灵: "wanling", 段氏: "duanshi",
});
const FORCE_COLORS = Object.freeze({
    少林: ["#ffb25f", "#b45309"], 万花: ["#c498ff", "#7e22ce"], 天策: ["#ff6f53", "#b91c1c"],
    纯阳: ["#16d8d8", "#0369a1"], 七秀: ["#ff81b0", "#be185d"], 五毒: ["#3793ff", "#1d4ed8"],
    唐门: ["#79b736", "#4d7c0f"], 藏剑: ["#d6f95d", "#a16207"], 丐帮: ["#cd853f", "#854d0e"],
    明教: ["#f04660", "#be123c"], 苍云: ["#5d6d7e", "#34495e"], 长歌: ["#64fab4", "#047857"],
    霸刀: ["#6a6cbd", "#4338ca"], 蓬莱: ["#abe3fa", "#0369a1"], 凌雪: ["#2c3e50", "#1f2937"],
    衍天: ["#a653fb", "#5b21b6"], 药宗: ["#00ac99", "#0f766e"], 刀宗: ["#6bb7f2", "#0284c7"],
    万灵: ["#16a085", "#047857"], 段氏: ["#d35400", "#9a3412"], 无相: ["#7f8c8d", "#374151"],
    江湖: ["#bda9ad", "#5f5558"],
});
const XINFA_PINYIN = Object.freeze({
    易筋经: "yijin", 洗髓经: "xisui", 花间游: "huajian", 离经易道: "lijing", 傲血战意: "aoxue",
    铁牢律: "tielao", 紫霞功: "zixia", 太虚剑意: "taixu", 冰心诀: "bingxin", 云裳心经: "yunshang",
    毒经: "dujing", 补天诀: "butian", 惊羽诀: "jingyu", 天罗诡道: "tianluo", 问水诀: "wenshui",
    山居剑意: "shanju", 笑尘诀: "xiaochen", 焚影圣诀: "fenying", 明尊琉璃体: "mingzun",
    铁骨衣: "tiegu", 分山劲: "fenshan", 莫问: "mowen", 相知: "xiangzhi", 北傲诀: "beiao",
    凌海诀: "linghai", 隐龙诀: "yinlong", 太玄经: "taixuan", 无方: "wufang", 灵素: "lingsu",
    孤锋诀: "gufeng", 山海心诀: "shanhai", 周天功: "zhoutian", 幽罗引: "youluo",
});

export default {
    name: "LoverV2MateSocialCard",
    props: {
        registration: { type: Object, default: null },
    },
    data: function () {
        return { portraitStage: 0 };
    },
    computed: {
        card() {
            return this.registration?.mate_card || {};
        },
        member() {
            return this.registration?.members?.[0] || this.registration?.member || {};
        },
        roleName() {
            return this.card.game_name || this.card.nick_name || this.member.display_name || "神秘侠士";
        },
        forceName() {
            return XINFA_FORCE[this.card.mindset] || "江湖";
        },
        themeStyle() {
            const [primary, accent] = FORCE_COLORS[this.forceName] || FORCE_COLORS.江湖;
            return { "--mate-primary": primary, "--mate-accent": accent };
        },
        spriteUrl() {
            const sect = FORCE_SECT[this.forceName];
            if (!sect) return "";
            return `${ASSET_ORIGIN}/workspace/sprite/${encodeURIComponent(`${sect} - 已编辑.webp`)}`;
        },
        portraitCandidates() {
            return [this.card.card_image_url, this.card.avatar_url, this.spriteUrl].filter(Boolean);
        },
        portraitUrl() {
            return this.portraitCandidates[Math.min(this.portraitStage, this.portraitCandidates.length - 1)] || "";
        },
        photoName() {
            const pinyin = XINFA_PINYIN[this.card.mindset];
            return pinyin ? pinyin.charAt(0).toUpperCase() + pinyin.slice(1) : "Daxia";
        },
        quoteText() {
            return this.card.signature || `${this.forceName}侠士，江湖路远。`;
        },
        joinYearText() {
            return this.card.join_year ? `${this.card.join_year} 年` : "未填写";
        },
        interests() {
            return Array.isArray(this.card.interests) ? this.card.interests.slice(0, 8) : [];
        },
        mindsetNames() {
            return [...new Set([this.card.mindset, ...(this.card.favorite_xinfas || [])].filter(Boolean))].slice(0, 5);
        },
        mindsets() {
            return this.mindsetNames
                .map((name) => {
                    const xinfa = getXinfaByName(name);
                    return xinfa ? { name, icon: `${ASSET_ORIGIN}/xf-icons/${xinfa.id}.webp` } : null;
                })
                .filter(Boolean);
        },
    },
    watch: {
        registration() {
            this.portraitStage = 0;
        },
    },
};
</script>

<style scoped lang="less">
.c-mate-social-card {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 12px;
    background: #f7f6f6;
    box-shadow: 0 18px 45px rgba(40, 28, 31, 0.2);
    color: #171415;
    container-type: inline-size;
    font-family: "Songti SC", "STSong", "Noto Serif CJK SC", serif;
}

.u-inner-border {
    position: absolute;
    inset: 16px;
    border: 1px solid rgba(189, 169, 173, 0.24);
    pointer-events: none;
}

.u-divider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 42.9%;
    border-left: 1px solid rgba(189, 169, 173, 0.14);
}

.u-school-sprite {
    position: absolute;
    right: -2%;
    bottom: -15%;
    width: 62%;
    height: 110%;
    transform: scaleX(-1);
    opacity: 0.09;
    object-fit: contain;
    object-position: center bottom;
    pointer-events: none;
}

.u-pluses {
    position: absolute;
    top: 2.2%;
    left: 2%;
    color: rgba(189, 169, 173, 0.35);
    font-size: clamp(12px, 2.2cqw, 22px);
}

.u-card-title {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 2%;
    right: 5%;
    align-items: flex-end;
    flex-direction: column;
    color: rgba(15, 13, 14, 0.32);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(7px, 1cqw, 11px);
    line-height: 1.2;

    strong {
        margin-bottom: 3px;
        color: rgba(189, 169, 173, 0.72);
        font-family: "Songti SC", "STSong", serif;
        font-size: clamp(9px, 1.5cqw, 15px);
        letter-spacing: 0.12em;
    }
}

.u-photo-stack {
    position: absolute;
    z-index: 3;
    top: 8.3%;
    left: 7.5%;
    width: 34.4%;
    height: 84%;
}

.u-photo-shadow {
    position: absolute;
    inset: 1.5% 7% 1.5% 0;
    transform: rotate(-7deg);
    background: #ded9da;
}

.u-polaroid {
    position: absolute;
    inset: 0 3% 0 4%;
    padding: 3.8%;
    background: #fff;
    box-shadow: 0 14px 30px rgba(40, 28, 31, 0.1);

    > p {
        display: flex;
        height: 12%;
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 1% 4% 0;
        overflow: hidden;
        text-align: center;
        font-size: clamp(7px, 1.35cqw, 14px);
        letter-spacing: 0.06em;
        line-height: 1.25;
    }
}

.u-photo {
    position: relative;
    height: 86%;
    overflow: hidden;
    background: #ebe8e9;

    img {
        width: 100%;
        height: 100%;
        filter: saturate(0.82) contrast(0.96) brightness(1.04);
        object-fit: cover;
        object-position: center top;
    }

    span {
        position: absolute;
        top: 2%;
        left: 6%;
        transform: rotate(-8deg);
        color: rgba(60, 56, 57, 0.82);
        font-family: "Brush Script MT", "Segoe Script", cursive;
        font-size: clamp(18px, 4.6cqw, 46px);
        line-height: 1;
    }
}

.u-heart {
    display: flex;
    position: absolute;
    z-index: 5;
    top: 30%;
    left: -2.5%;
    width: 19%;
    aspect-ratio: 1.6;
    align-items: center;
    justify-content: center;
    border: 1px solid #d8ccce;
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 3px 8px rgba(40, 28, 31, 0.1);
    color: var(--mate-accent);
    font-size: clamp(12px, 2.5cqw, 25px);
}

.u-jx3box {
    display: flex;
    position: absolute;
    z-index: 1;
    top: 7.8%;
    left: 40.2%;
    align-items: center;
    flex-direction: column;
    color: rgba(119, 119, 119, 0.18);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(17px, 5cqw, 48px);
    line-height: 0.92;
}

.u-profile {
    position: absolute;
    z-index: 3;
    top: 15.3%;
    left: 50.2%;
    width: 41.2%;
}

.u-role-name {
    display: inline-flex;
    position: relative;
    max-width: 100%;
    align-items: center;

    > span {
        position: absolute;
        right: -8px;
        bottom: 3px;
        left: -8px;
        height: 38%;
        background: rgba(228, 223, 224, 0.88);
    }

    h3 {
        position: relative;
        z-index: 1;
        max-width: 100%;
        margin: 0;
        overflow: hidden;
        font-size: clamp(22px, 5.6cqw, 54px);
        font-weight: 900;
        line-height: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.u-profile-lines {
    display: flex;
    margin-top: 4.5%;
    padding-left: 4%;
    border-left: 5px solid #e4dfe0;
    flex-direction: column;
    font-size: clamp(9px, 1.75cqw, 18px);
    line-height: 1.45;
    letter-spacing: 0.06em;

    strong,
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: #3c3839;
        font-size: 0.86em;
    }
}

.u-rule {
    display: flex;
    position: relative;
    height: 14px;
    border-bottom: 1px solid rgba(205, 191, 194, 0.45);
    justify-content: space-between;

    i {
        width: 8px;
        height: 8px;
        transform: translateY(10px) rotate(45deg);
        background: #ded4d6;
    }
}

.u-section {
    min-width: 0;
}

.u-section-title {
    display: flex;
    align-items: baseline;
    gap: 7%;

    &.is-column {
        align-items: flex-start;
        flex-direction: column;
        gap: 1px;
    }

    h4 {
        margin: 0;
        font-size: clamp(12px, 2.4cqw, 24px);
        font-weight: 900;
        line-height: 1;
        white-space: nowrap;
    }

    span {
        color: #4b4446;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(5px, 0.9cqw, 10px);
        letter-spacing: 0.16em;
        white-space: nowrap;
    }
}

.u-game-view {
    margin-top: 3.5%;

    > p {
        display: flex;
        min-height: 58px;
        align-items: center;
        margin: 2.5% 0 0;
        padding: 2.5% 5%;
        border-top: 1px solid #cfc7c8;
        border-bottom: 1px solid #cfc7c8;
        border-left: 4px solid #cfc7c8;
        background: rgba(255, 255, 255, 0.3);
        font-size: clamp(8px, 1.4cqw, 14px);
        line-height: 1.5;
    }
}

.u-bottom-grid {
    display: grid;
    margin-top: 3.5%;
    grid-template-columns: minmax(0, 1fr) 34%;
    gap: 4%;
}

.u-tags,
.u-xinfas {
    display: flex;
    min-height: 34px;
    margin-top: 6%;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 5px;

    small {
        color: #8a8082;
        font-style: italic;
    }
}

.u-tags em {
    padding: 2px 8px;
    border: 1px solid var(--mate-primary);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.62);
    color: var(--mate-accent);
    font-size: clamp(6px, 1.05cqw, 11px);
    font-style: normal;
    white-space: nowrap;
}

.u-xinfas > span {
    display: inline-flex;
    width: clamp(22px, 3.6cqw, 34px);
    height: clamp(22px, 3.6cqw, 34px);
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid #766d6f;
    border-radius: 50%;
    background: #fff;

    img {
        width: 88%;
        height: 88%;
        border-radius: 50%;
        object-fit: contain;
    }
}

@media screen and (max-width: 640px) {
    .c-mate-social-card {
        min-height: 610px;
        aspect-ratio: auto;
    }

    .u-divider,
    .u-jx3box {
        display: none;
    }

    .u-card-title {
        top: 18px;
        right: 24px;
    }

    .u-photo-stack {
        top: 72px;
        left: 28px;
        width: 42%;
        height: 260px;
    }

    .u-profile {
        top: 84px;
        right: 26px;
        left: auto;
        width: 44%;
    }

    .u-game-view,
    .u-bottom-grid {
        position: absolute;
        right: 0;
        left: -112%;
        width: 212%;
    }

    .u-game-view {
        top: 272px;
    }

    .u-bottom-grid {
        top: 400px;
    }
}
</style>
