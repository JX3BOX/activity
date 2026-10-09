import { shallowRef, watch } from "vue";
import { getTopic, getUsers } from "@/service/event/topic";

export const assetRoot = "https://cdn.jx3box.com/design/event/jx3dat/remake/";


let sharedRequest;

export function getSharedTopic() {
    if (!sharedRequest) {
        sharedRequest = getTopic("jx3dat_2026").catch((error) => {
            sharedRequest = undefined;
            throw error;
        });
    }
    return sharedRequest;
}


export async function getEditions() {
    const res = await getSharedTopic();
    return res.data.data.filter((item) => item.subtype === "session")
        .map((item) => ({ year: Number(item.title), label: item.desc || item.title }))
        .filter((item) => item.year === 2023 || (Number.isInteger(item.year) && item.year >= 2026))
        .sort((a, b) => b.year - a.year);
}

const rewards = {
    reward_rank: { title: "总分排名", color: "gold", order: 0 },
    reward_special: { title: "特殊奖项", color: "orange", order: 1 },
    reward_base: { title: "广谱奖项", color: "cyan", order: 2 },
    reward_physical: { title: "实物奖励展示", color: "gold", order: 3 },
    reward_community: { title: "社区奖励", color: "purple", order: 4 },
};

export function normalizeHtml(value = "") {
    return String(value || "").replace(/\\+"/g, '"').replace(/\\+n/g, "\n")
        .replace(/^(\s*)(div|section)(\s+class=)/, "$1<$2$3");
}

export function normalizeTopic(records) {
    const modules = { prize: [], document: [], rank: [] };
    records.forEach((item) => {
        if (item.subtype === "document" || item.subtype === "prize") {
            const reward = rewards[item.link];
            const isReward = item.subtype === "prize" || Boolean(reward);
            modules[isReward ? "prize" : "document"].push({
                ...item, desc: normalizeHtml(item.desc),
                color: ["gold", "orange", "cyan", "purple"].includes(item.color) ? item.color : reward?.color || "cyan",
                showcase: item.link === "showcase" || ["reward_physical", "reward_community"].includes(item.link),
            });
        } else if (item.subtype === "rank") {
            const reward = rewards[item.title];
            if (!reward) {
                modules.rank.push(item);
                return;
            }
            // 后台允许填写未加引号的对象键；只转换键后解析 JSON，不执行正文。
            const text = String(item.desc || "[]").replace(/([{,]\s*)([A-Za-z_]\w*)(\s*:)/g, '$1"$2"$3');
            const people = JSON.parse(text);
            if (!Array.isArray(people)) throw new Error("获奖名单必须为数组");
            people.forEach((person, index) => modules.rank.push({
                ...item, id: `${item.id}-${index}`, title: person.name || "", desc: person.desc || "",
                author: person.uid || 0, img: person.avatar || person.img || "",
                link: reward.title, color: item.color || reward.color, groupKey: item.title,
            }));
        }
    });
    modules.document.sort((a, b) => Number(a.power || 0) - Number(b.power || 0));
    modules.prize.sort((a, b) => Number(a.power || 0) - Number(b.power || 0)
        || (rewards[a.link]?.order ?? 99) - (rewards[b.link]?.order ?? 99));
    modules.rank.sort((a, b) => Number(a.power || 0) - Number(b.power || 0)
        || (rewards[a.groupKey]?.order ?? 99) - (rewards[b.groupKey]?.order ?? 99));
    return modules;
}


export function useTopic(route) {
    const modules = shallowRef({ prize: [], document: [], rank: [] });
    const loading = shallowRef(false);
    const error = shallowRef("");
    watch(() => route.path, async (path, _, onCleanup) => {
        let cancelled = false;
        onCleanup(() => { cancelled = true; });
        loading.value = true;
        error.value = "";
        modules.value = { prize: [], document: [], rank: [] };
        try {
            const topic = `jx3dat_${path.slice(1)}`;
            const [res, shared] = await Promise.all([
                topic === "jx3dat_2026" ? getSharedTopic() : getTopic(topic),
                topic === "jx3dat_2026" ? Promise.resolve(null) : getSharedTopic(),
            ]);
            const records = res.data.data;
            const next = normalizeTopic(records);
            if (shared) {
                next.document = next.document.filter((item) => item.link !== "safety")
                    .concat(normalizeTopic(shared.data.data).document.filter((item) => item.link === "safety"));
            }
            if (cancelled) return;
            modules.value = next;
            const ids = [...new Set(next.rank.map((item) => item.author).filter(Boolean))];
            if (ids.length) {
                try {
                    const usersRes = await getUsers({ list: ids.join(",") });
                    const users = new Map(usersRes.data.data.map((user) => [String(user.ID), user]));
                    if (cancelled) return;
                    modules.value = { ...next, rank: next.rank.map((item) => {
                        const user = users.get(String(item.author));
                        return { ...item, title: user?.display_name || item.title, img: user?.user_avatar || item.img };
                    }) };
                } catch {
                    // 用户资料不可用时，保留专题中填写的昵称和头像。
                }
            }
        } catch {
            if (!cancelled) error.value = "活动数据加载失败，请刷新重试。";
        } finally {
            if (!cancelled) loading.value = false;
        }
    }, { immediate: true });
    return { modules, loading, error };
}
