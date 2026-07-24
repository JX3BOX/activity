export const LOVER_V2_FIRST_EVENT_ID = 7;

export const registrationTypeMap = {
    lover: "情缘双人组",
    mate: "搭子",
    solo: "独狼",
};

export const registrationTypeShortMap = {
    lover: "情缘",
    mate: "搭子",
    solo: "独狼",
};

export const combatRoleMap = {
    dps: "输出",
    healer: "治疗",
};

export const phaseMap = {
    before_registration: "报名未开始",
    registration: "报名进行中",
    team_building: "组队整理期",
    locked: "阵容已锁定",
};

export const registrationStatusMap = {
    pending_review: "等待审核",
    approved: "审核通过",
    rejected: "需要修改",
    cancelled: "已取消",
};

export const formationStatusMap = {
    building: "组队中",
    complete: "阵容已齐",
    locked: "阵容已锁定",
    withdrawn: "已退赛",
};

export const competitionStatusMap = {
    pending: "等待开赛",
    active: "参赛中",
    eliminated: "已淘汰",
    withdrawn: "已退赛",
    disqualified: "已取消资格",
    finished: "赛事结束",
};

export const stageTypeMap = {
    round_robin: "循环积分赛",
    single_elimination: "单败淘汰赛",
    double_elimination: "双败淘汰赛",
};

export const stageStatusMap = {
    published: "即将开始",
    running: "进行中",
    finished: "已结束",
    cancelled: "已取消",
};

const RUNNING_STAGE_STATUSES = new Set(["running", "active", "in_progress"]);
const FINISHED_STAGE_STATUSES = new Set(["finished", "completed", "ended"]);
const TERMINAL_STAGE_STATUSES = new Set([...FINISHED_STAGE_STATUSES, "cancelled", "canceled"]);

export function getPreferredStageId(stages = []) {
    if (!stages.length) return "";

    const getStatus = (stage) => String(stage?.status || "").toLowerCase();
    const runningStage = stages.find((stage) => RUNNING_STAGE_STATUSES.has(getStatus(stage)));
    if (runningStage?.id != null) return runningStage.id;

    const upcomingStage = stages.find((stage) => !TERMINAL_STAGE_STATUSES.has(getStatus(stage)));
    if (upcomingStage?.id != null) return upcomingStage.id;

    const latestFinishedStage = [...stages]
        .reverse()
        .find((stage) => FINISHED_STAGE_STATUSES.has(getStatus(stage)));
    return latestFinishedStage?.id ?? stages[stages.length - 1]?.id ?? "";
}

export const matchStatusMap = {
    draft: "赛前准备",
    scheduled: "等待开战",
    ready: "双方就绪",
    running: "战斗中",
    finished: "已结束",
    cancelled: "已取消",
};

export function isLoverV2Event(event) {
    return Number(event?.id) >= LOVER_V2_FIRST_EVENT_ID;
}

export function formatDateTime(value) {
    if (!value) return "待定";
    return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(value));
}

export function formatDate(value) {
    if (!value) return "待定";
    return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(value));
}

export function getErrorMessage(error, fallback = "操作失败，请稍后重试") {
    return error?.data?.msg || error?.response?.data?.msg || error?.message || fallback;
}
