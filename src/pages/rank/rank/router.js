import { createRouter, createWebHashHistory } from "vue-router";
import { isEmbeddedApp } from "@/utils/env";

const Info = () => import("@/views/Rank/Info.vue");
const Rank = () => import("@/views/Rank/Rank.vue");
const Dps = () => import("@/views/Rank/Dps.vue");
const Vote = () => import("@/views/Rank/Vote.vue");
const Live = () => import("@/views/Rank/Live.vue");
const Video = () => import("@/views/Rank/Video.vue");
const Lucky = () => import("@/views/Rank/Lucky.vue");
const Stat = () => import("@/views/Rank/Stat.vue");
const Superstar = () => import("@/views/Rank/Superstar.vue");
const Awards = () => import("@/views/Rank/Awards.vue");
const Join = () => import("@/views/Rank/Join.vue");
const Index = () => import("@/views/Rank/Index.vue");
const SurpriseList = () => import("@/views/Rank/SurpriseList.vue");
const SurpriseSingle = () => import("@/views/Rank/SurpriseSingle.vue");
const TeamDetail = () => import("@/views/Rank/TeamDetail.vue");

const routes = [
    // 当前活动进程，开赛后修改为Rank
    { name: "index", path: "/", component: Index },
    { name: "join", path: "/join", component: Join },
    { name: "surprise-list", path: "/surprise", component: SurpriseList },
    { name: "surprise-single", path: "/surprise/:id", component: SurpriseSingle },
    {
        name: "detail",
        path: "/:id",
        // 显式保留入口参数，避免 App 环境标记在详情重定向时丢失。
        redirect: (to) => ({ name: "rank", params: to.params, query: to.query, hash: to.hash }),
        component: () => import("@/layouts/rank/RankLayout.vue"),
        children: [
            { name: "info", path: "/:id/info", component: Info },
            { name: "lucky", path: "/:id/lucky", component: Lucky },
            { name: "dps", path: "/:id/dps", component: Dps },
            { name: "rank", path: "/:id/rank", component: Rank },
            { name: "vote", path: "/:id/vote", component: Vote },
            { name: "live", path: "/:id/live", component: Live },
            { name: "video", path: "/:id/video", component: Video },
            { name: "stat", path: "/:id/stat", component: Stat },
            { name: "superstar", path: "/:id/superstar", component: Superstar },
            { name: "awards", path: "/:id/awards", component: Awards },
            { name: "team-detail", path: "/:id/team/:teamId", component: TeamDetail },
        ],
    },
];

const history = createWebHashHistory();
const router = createRouter({
    history,
    routes,
});

// 在最终写入历史时统一处理，覆盖页签、筛选、赛季和详情重定向。
// 列表进入赛事、进入报名页各保留一层返回记录，其余切换替换当前记录。
const pushHistory = history.push.bind(history);
history.push = (to, data) => {
    const target = router.resolve(to);
    const current = router.resolve(history.location);
    const enteringEvent = current.name === "index" && target.matched.some((record) => record.name === "detail");
    const enteringJoin = target.name === "join" && current.name !== "join";
    if (isEmbeddedApp() && !enteringEvent && !enteringJoin) {
        history.replace(to, data);
    } else {
        pushHistory(to, data);
    }
};

export default router;
