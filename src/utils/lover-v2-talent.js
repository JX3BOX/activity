import { $node } from "@jx3box/jx3box-common/js/api";
import stdTalents from "@jx3box/jx3box-talent/dist/std/talents.json";
import wujieTalents from "@jx3box/jx3box-talent/dist/wujie/talents.json";
import { __iconPath } from "@/utils/config";

const api = $node();
const talentSources = { std: stdTalents, wujie: wujieTalents };
const cache = new Map();

export function talentIconUrl(icon) {
    return icon ? `${__iconPath}icon/${icon}.png` : "";
}

export async function loadMountTalents(mountId, client = "std") {
    const normalizedMountId = Number(mountId);
    const normalizedClient = client === "wujie" ? "wujie" : "std";
    const layers = talentSources[normalizedClient]?.[normalizedMountId];
    if (!Array.isArray(layers) || !layers.length) throw new Error("没有找到该心法的可用奇穴数据");
    const cacheKey = `${normalizedClient}:${normalizedMountId}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    const ids = [...new Set(layers.flat().map(Number).filter((id) => Number.isInteger(id) && id > 0))];
    const response = await api.post(`/resource/${normalizedClient}/skill`, {
        ids: ids.map((id) => `${id}_0`),
    });
    const rows = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
    const resources = new Map(rows.map((row) => [Number(row.SkillID), row]));
    const talents = layers.map((layer, tier) =>
        layer.map((rawId) => {
            const id = Number(rawId);
            const resource = resources.get(id);
            if (!resource?.Name) throw new Error(`奇穴 #${id} 的资料暂时无法读取`);
            return {
                id,
                name: resource.Name,
                icon: Number(resource.IconID || 0),
                tier: tier + 1,
                mount_id: normalizedMountId,
            };
        })
    );
    cache.set(cacheKey, talents);
    return talents;
}
