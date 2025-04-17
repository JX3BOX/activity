import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";

const PICS = {
    LOGO: __cdn + "design/rank/common/logo.png",
    cover: function (id) {
        return __cdn + `design/rank/cover/${id}.png`;
    },
    boss: function (id) {
        return __cdn + `design/rank/race/${id}/boss.png`;
    },
    bg: function (id) {
        return __cdn + `design/rank/race/${id}/bg.png`;
    },
    version: function (id) {
        return __cdn + `design/rank/race/${id}/version.png`;
    },
    logos: function (val) {
        return __cdn + "design/rank/logos/" + val + ".png";
    },
    bossIcon: function (id) {
        return __cdn + `design/rank/boss/${id}.png`;
    },
};

export default PICS;
