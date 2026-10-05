import { ref, shallowRef, watch } from "vue";
import { ElMessage } from "element-plus";
import User from "@jx3box/jx3box-common/js/user";
import { getProgramDetail, getMyVote, vote } from "@/service/event/vote";

export function useVoting(programId) {
    const items = ref([]);
    const votedIds = ref([]);
    const loading = shallowRef(false);
    const error = shallowRef("");
    const voting = shallowRef(null);
    const revision = shallowRef(0);
    let generation = 0;
    watch([programId, revision], async ([id], _, onCleanup) => {
        const current = ++generation;
        let cancelled = false;
        onCleanup(() => { cancelled = true; });
        items.value = [];
        votedIds.value = [];
        error.value = "";
        loading.value = !!id;
        if (!id) return;
        try {
            const [program, history] = await Promise.all([
                getProgramDetail(id),
                User.isLogin() ? getMyVote(id) : Promise.resolve(null),
            ]);
            if (cancelled || current !== generation) return;
            items.value = program.data?.data?.vote_items || [];
            votedIds.value = (history?.data?.data?.list || []).map((item) => String(item.vote_item_id));
        } catch {
            if (!cancelled) error.value = "作品加载失败，请重试";
        } finally {
            if (!cancelled) loading.value = false;
        }
    }, { immediate: true });

    async function submit(item) {
        if (voting.value !== null || votedIds.value.includes(String(item.id))) return;
        if (!User.isLogin()) {
            ElMessage.warning("请先登录后再投票");
            return;
        }
        const current = generation;
        voting.value = item.id;
        try {
            await vote(programId.value, { vote_id_list: [item.id] }, { mute: true });
            if (current !== generation) return;
            votedIds.value.push(String(item.id));
            item.amount = Number(item.amount || 0) + 1;
            ElMessage.success("投票成功");
        } catch (err) {
            if (current !== generation) return;
            const data = err?.response?.data || err?.data;
            ElMessage.error(data?.msg || data?.message || "投票失败，请稍后重试");
        } finally {
            voting.value = null;
        }
    }
    return { items, votedIds, loading, error, voting, submit, reload: () => revision.value++ };
}
