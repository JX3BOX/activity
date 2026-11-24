<script setup>
import { computed } from "vue";
import { getPoemTextLines, normalizeAvatar, onAvatarError } from "../components_app/poemCommon";
const props = defineProps({
    item: { type: Object, required: true },
    year: { type: String, required: true },
    voted: Boolean,
    busy: Boolean,
    submitting: Boolean,
});
defineEmits(["vote"]);
const firstLine = computed(() => getPoemTextLines(props.item.content)[0] || "—");
const avatar = computed(() => normalizeAvatar(props.item.user_info?.avatar || props.item.user_info?.user_avatar));
</script>

<template>
    <tr class="vote-row">
        <td class="title-cell">
            <router-link class="poem-title" :title="item.title" :to="{ name: 'poem', params: { year }, query: { id: item.id } }">《{{ item.title }}》</router-link>
        </td>
        <td><span class="poem-first-line" :title="firstLine">{{ firstLine }}</span></td>
        <td><div class="poem-author"><img :src="avatar" alt="" @error="onAvatarError" /><span :title="item.user_info?.display_name">{{ item.user_info?.display_name || '侠士' }}</span></div></td>
        <td class="vote-count" aria-live="polite">{{ item.amount || 0 }}</td>
        <td class="action-cell"><button class="vote-button" :class="{ voted }" type="button" :disabled="voted || busy" :aria-label="`${voted ? '已投票' : '投票给'}：${item.title}`" @click="$emit('vote')"><span aria-hidden="true">✿</span> {{ voted ? '已投票' : submitting ? '提交中…' : '投票' }}</button></td>
    </tr>
</template>

<style scoped>
.vote-row { background: linear-gradient(100deg, #f1ebdd, #fcfbf7); clip-path: inset(0 round 4px); }
.vote-row td { height: clamp(58px, 3.75vw, 76px); padding: 0 12px; background: transparent; color: #373733; font-size: clamp(14px, .9vw, 18px); }
.vote-row td:first-child { border-radius: 4px 0 0 4px; }
.vote-row td:last-child { border-radius: 0 4px 4px 0; }
.poem-title { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; color: #bc5061; font-size: clamp(15px, 1vw, 20px); text-decoration: none; }
.poem-title:hover { text-decoration: underline; }
.poem-first-line { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.poem-author { display: flex; align-items: center; gap: 6px; min-width: 0; }
.poem-author img { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; flex: none; }
.poem-author span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vote-row .vote-count { text-align: center; color: #bf4b60; }
.action-cell { text-align: center; }
.vote-button { width: 100%; max-width: 128px; min-height: 40px; border: 0; border-radius: 24px; color: white; background: linear-gradient(100deg, #d7b36a, #b58634); font: inherit; cursor: pointer; white-space: nowrap; }
.vote-button.voted { background: #bababa; }
.vote-button:disabled { cursor: default; }
.vote-button:disabled:not(.voted) { opacity: .65; }
.vote-button:not(:disabled):hover { filter: brightness(1.1); }
a:focus-visible, button:focus-visible { outline: 2px solid #b58634; outline-offset: 3px; }
</style>
