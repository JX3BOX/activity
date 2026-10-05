<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import VoteCard from "./VoteCard.vue";
import { useVoting } from "../composables/useVoting";

const props = defineProps({ years: { type: Array, default: () => [] } });
const route = useRoute();
const programId = computed(() => props.years.find((item) => String(item.year) === String(route.params.year))?.vote_id || 0);
const { items, votedIds, loading, error, voting, submit, reload } = useVoting(programId);
</script>

<template>
    <section class="m-midautumn-vote" v-loading="loading" aria-label="作品投票" :aria-busy="loading">
        <div v-if="error" class="vote-status" role="alert">{{ error }} <button type="button" @click="reload">重新加载</button></div>
        <p v-else-if="!loading && !items.length" class="vote-status">{{ programId ? '作品收集中，敬请期待' : '本届暂无投票活动' }}</p>
        <table v-else class="vote-table" aria-label="作品投票列表">
            <colgroup><col style="width: 29%" /><col style="width: 27%" /><col style="width: 20%" /><col style="width: 8%" /><col style="width: 16%" /></colgroup>
            <thead><tr><th scope="col">作品名</th><th scope="col">作品首句</th><th scope="col">作者</th><th scope="col">票数</th><th scope="col"><span class="sr-only">投票操作</span></th></tr></thead>
            <tbody>
                <VoteCard v-for="item in items" :key="item.id" :item="item"
                    :year="String(route.params.year)" :voted="votedIds.includes(String(item.id))"
                    :busy="voting !== null" :submitting="voting === item.id" @vote="submit(item)" />
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.m-midautumn-vote { min-height: 200px; padding: 2px 12px 12px; border-radius: 16px 16px 0 0; background: rgba(237, 233, 220, .52); }
.vote-table { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0 10px; }
.vote-table th { height: 38px; padding: 0 12px; color: #f9f6ee; background: #4b402a; font-size: clamp(14px, .9vw, 18px); font-weight: 400; }
.vote-table th:first-child { border-radius: 4px 0 0 4px; }
.vote-table th:last-child { border-radius: 0 4px 4px 0; }
.vote-status { padding: 48px 20px; margin: 10px 0 0; text-align: center; color: #4b402a; background: #f6f1e6; border-radius: 4px; }
.vote-status button { font: inherit; cursor: pointer; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
</style>
