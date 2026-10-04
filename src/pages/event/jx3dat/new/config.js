export const assetRoot = "https://cdn.jx3box.com/design/event/jx3dat/remake/";
export const links = {
    guide: "https://www.jx3box.com/tool/17401",
    specification: "https://www.jx3box.com/tool/67744",
    entry: "https://www.jx3box.com/dbm/pkg/list",
};
// 待提供独立素材后填入完整 CDN URL；不将往届奖项或用户信息当作本届结果。
export const rewardImages = { physical: "", community: "" };
// 设计稿展示数据，正式发布前请替换为确认后的名单及头像。
export const winnerGroups = [
    {
        title: "总分排名",
        tone: "gold",
        people: [
            { name: "南宫伯", award: "第一名" },
            { name: "Zeratulag", award: "第二名" },
            { name: "筱儿", award: "第三名" },
        ],
    },
    {
        title: "特殊奖项",
        tone: "orange",
        people: [
            { name: "浮烟", award: "人气之王" },
            { name: "魔盒研发部", award: "天道酬勤" },
            { name: "唯歌", award: "创意大师" },
        ],
    },
    {
        title: "广谱奖项",
        tone: "cyan",
        people: [
            "青墨白宣",
            "需天盗",
            "池鱼",
            "李时戏",
            "yunmoer",
            "起思猫",
            "唐小莺",
            "赵本山",
            "龙战",
            "清晨雨曦",
            "八转达人",
            "丝域",
            "岑岑的肉垫鸭",
            "洛水龙渊",
        ].map((name) => ({ name })),
    },
];
