<script setup>
import { shallowRef, watch } from "vue";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@/utils/config";
import { useVoting } from "@/composables/useVoting";
import { voteProgramId } from "../topic";

const programId = shallowRef(voteProgramId);
const { items, votedIds, loading, error, voting, submit, reload } = useVoting(programId);
const rankedItems = shallowRef([]);

// 仅在榜单载入时排位，投票时更新行内票数。
watch(items, (loadedItems) => {
    rankedItems.value = [...loadedItems]
        .sort((a, b) => (b.amount || 0) - (a.amount || 0))
        .map((item) => ({ item, workUrl: getWorkUrl(item) }));
}, { immediate: true });

const defaultAvatar = showAvatar("");

function handleVote(item) {
    if (!User.isLogin()) return User.toLogin();
    return submit(item);
}

function getWorkUrl({ tag, sub_title: workId }) {
    if (tag === "dbm/pkg" && /^[1-9]\d*$/.test(workId)) {
        return new URL(`${tag}/${workId}`, __Root).href;
    }
    return "";
}

function onAvatarError(event) {
    if (event.target.src !== defaultAvatar) event.target.src = defaultAvatar;
}
</script>

<template>
    <section class="dat-vote" aria-labelledby="dat-vote-title" :aria-busy="loading">
        <div class="vote-intro">
            <h2 id="dat-vote-title">请为自己认可的插件数据作者投票</h2>
            <p>本次评审将采取 玩家投票 + 特邀评审人 的评分方式</p>
            <p>［魔盒认证用户评分］根据魔盒账号等级，每次投票时，1级记为1分，2级记为2分，3–4级记为4分，5级及以上记为8分</p>
            <p>截止日后评审根据玩家提交的数据进行评选</p>
        </div>
        <div class="dat-divider vote-divider tone-gold" aria-hidden="true">
            <span class="dat-divider-diamond"></span>
        </div>
        <p v-if="loading" class="vote-status" role="status">投票作品加载中…</p>
        <p v-else-if="error" class="vote-status" role="alert">
            {{ error }} <button type="button" @click="reload">重新加载</button>
        </p>
        <p v-else-if="!rankedItems.length" class="vote-status">暂无投票作品</p>
        <div v-else role="table" aria-label="玩家投票榜">
            <div class="vote-row vote-heading" role="row">
                <span role="columnheader">名次</span>
                <span role="columnheader">数据作者</span>
                <span role="columnheader">参赛作品</span>
                <span role="columnheader">票数</span>
                <span role="columnheader">参与投票</span>
            </div>
            <div v-for="({ item, workUrl }, index) in rankedItems" :key="item.id" class="vote-row" role="row">
                <span class="vote-rank" role="cell">{{ index + 1 }}</span>
                <span class="vote-author" role="cell">
                    <img :src="showAvatar(item.user_info?.avatar || item.user_info?.user_avatar, 'm')" alt="" @error="onAvatarError" />
                    <strong>{{ item.user_info?.display_name || "侠士" }}</strong>
                </span>
                <span class="vote-work" role="cell">
                    <span class="vote-mobile-label">参赛作品：</span>
                    <a v-if="workUrl" :href="workUrl" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
                    <template v-else>{{ item.title }}</template>
                </span>
                <span class="vote-count" role="cell"><span class="vote-mobile-label">票数：</span>{{ item.amount || 0 }}</span>
                <span class="vote-action" role="cell">
                    <button
                        type="button"
                        :class="{ 'is-voted': votedIds.includes(String(item.id)) }"
                        :disabled="voting !== null || votedIds.includes(String(item.id))"
                        :aria-label="`${votedIds.includes(String(item.id)) ? '已投票' : '投票'}：${item.title}`"
                        @click="handleVote(item)"
                    >
                        {{ votedIds.includes(String(item.id)) ? "已投票" : "投票" }}
                    </button>
                </span>
            </div>
        </div>
    </section>
</template>

<style scoped lang="less">
.vote-intro {
    padding: clamp(18px, 1.15vw, 24px) 5% clamp(18px, 1.4vw, 30px);
    border: 1px solid #42aeb3;
    border-top: 3px solid #65f5ef;
    border-radius: 6px;
    background: #102530;
    text-align: center;
    line-height: 2.2;
    font-size: clamp(12px, .84vw, 16px);
    h2 {
        margin-bottom: clamp(10px, 1.25vw, 24px);
        color: var(--dat-accent);
        font-size: clamp(16px, 1.25vw, 24px);
    }
}
.vote-row {
    display: grid;
    grid-template-columns: 14.5% 23% 37% 11% 14.5%;
    align-items: center;
    min-height: clamp(53px, 3.55vw, 68px);
    margin-bottom: clamp(10px, .73vw, 14px);
    border: 1px solid #c7e5e8;
    border-radius: 5px;
    background: linear-gradient(100deg, #060c13, #152a32);
    color: #fff;
    text-align: center;
    line-height: 1.5;
}
.vote-heading {
    min-height: clamp(48px, 3.25vw, 62px);
    margin-bottom: clamp(14px, 1.15vw, 22px);
    border-color: #36e8e9;
    background: linear-gradient(#087e87, #032731);
    font-weight: 700;
}
.vote-row:last-child { margin-bottom: 0; }
.vote-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 4px;
    overflow-wrap: anywhere;
    img {
        flex: none;
        width: clamp(20px, 1.25vw, 24px);
        height: clamp(20px, 1.25vw, 24px);
        border-radius: 50%;
        object-fit: cover;
    }
}
.vote-work {
    padding: 4px 8px;
    overflow-wrap: anywhere;
    a {
        color: #cbf5f9;
        text-decoration: none;
        text-underline-offset: 3px;
        &:hover, &:focus-visible {
            color: var(--dat-accent);
            text-decoration: underline;
        }
    }
}
.vote-mobile-label { display: none; }
.vote-action { padding: 6px; }
.vote-action button, .vote-status button {
    width: 100%;
    max-width: 118px;
    min-height: clamp(34px, 2.25vw, 43px);
    border: 1px solid #a8d9dd;
    border-radius: 9px;
    background: linear-gradient(#205658, #010708);
    color: #cbf5f9;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    &:focus-visible { outline: 2px solid var(--dat-accent); outline-offset: 2px; }
    &:disabled { cursor: default; }
    &.is-voted { background: #050505; border-color: #777; color: white; }
}
@media (hover: hover) {
    .vote-action button:not(:disabled):hover {
        border-color: #a8ffff;
        background: linear-gradient(#307777, #092326);
        box-shadow: 0 0 12px rgba(85, 255, 255, .45);
        color: white;
    }
}
.vote-status { padding: 20px; text-align: center; }

.is-app .dat-vote {
    .vote-intro { padding: 17px 5% 12px; font-size: 10px; line-height: 2; }
    .vote-intro h2 { margin-bottom: 6px; font-size: 14px; }
    .vote-heading { display: none; }
    .vote-row {
        grid-template-columns: 28px minmax(0, 1fr) auto;
        grid-template-areas: "rank author count" "rank work action";
        min-height: 88px;
        margin: 0 6px 14px;
        padding: 8px 10px 8px 0;
        border-radius: 14px;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
    }
    .vote-row:last-child { margin-bottom: 0; }
    .vote-rank {
        grid-area: rank;
        align-self: start;
        margin-top: -8px;
        padding: 10px 0;
        background: linear-gradient(#76faff, transparent);
        font-size: 20px;
        text-align: center;
    }
    .vote-author { grid-area: author; justify-content: flex-start; padding: 0 10px; gap: 5px; font-size: 16px; }
    .vote-work { grid-area: work; padding: 0 8px 0 10px; font-size: 12px; }
    .vote-count { grid-area: count; text-align: center; }
    .vote-action { grid-area: action; padding: 0; }
    .vote-action button { width: 84px; min-height: 37px; font-size: 16px; }
    .vote-mobile-label { display: inline; }
}
</style>
