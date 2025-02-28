import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

const PICS = {
    LOGO: __imgPath + "image/rank/common/logo.png",
    cover: function (id) {
        return __imgPath + `image/rank/cover/${id}.png`;
    },
    boss: function (id) {
        return __imgPath + `image/rank/race/${id}/boss.png`;
    },
    bg: function (id) {
        return __imgPath + `image/rank/race/${id}/bg.png`;
    },
    version: function (id) {
        return __imgPath + `image/rank/race/${id}/version.png`;
    },
    logos: function (val) {
        return __imgPath + "image/rank/logos/" + val + ".png";
    },
    bossIcon: function (id) {
        return __imgPath + `image/rank/boss/${id}.png`;
    },
};

export default PICS;
