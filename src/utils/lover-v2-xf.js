import xf from "@jx3box/jx3box-data/data/xf/xf.json";
import mountData from "@jx3box/jx3box-data/data/xf/mount_group.json";

const healerIds = new Set((mountData.mount_group?.治疗 || []).map(Number));
const xinfas = Object.values(xf).map((item) => ({ ...item, id: Number(item.id) }));

export function getXinfaOptions(client = "std") {
    return xinfas
        .filter((item) => item.id > 0 && item.name !== "通用")
        .filter((item) => !client || item.client?.includes("all") || item.client?.includes(client))
        .sort((left, right) => left.school - right.school || left.id - right.id);
}

export function getXinfa(mountId) {
    if (mountId == null || mountId === "") return null;
    return xinfas.find((item) => item.id === Number(mountId)) || null;
}

export function getXinfaByName(name, client = "std") {
    const normalized = String(name || "").trim();
    return getXinfaOptions(client).find((item) => item.name === normalized) || null;
}

export function getCombatRole(mountId) {
    return healerIds.has(Number(mountId)) ? "healer" : "dps";
}
