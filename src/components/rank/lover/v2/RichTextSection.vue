<template>
    <article class="c-lover-rich-text m-lover-v2-panel">
        <div class="u-section-title">
            <span>{{ title }}</span>
        </div>
        <!-- 活动说明与规则仅由运营后台维护，按可信赛事内容渲染。 -->
        <div v-if="content" class="c-lover-rich-text__content" v-html="content"></div>
        <p v-else class="c-lover-rich-text__empty">{{ emptyText }}</p>
    </article>
</template>

<script>
export default {
    name: "LoverV2RichTextSection",
    props: {
        title: { type: String, required: true },
        content: { type: String, default: "" },
        emptyText: { type: String, default: "内容正在整理中。" },
    },
};
</script>

<style scoped lang="less">
.c-lover-rich-text {
    padding: 26px;
}

.u-section-title {
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(135, 79, 62, 0.18);

    span {
        color: #56342f;
        font-size: 20px;
        font-weight: 700;
    }
}

.c-lover-rich-text__content {
    overflow-x: auto;
    color: #6f514a;
    font-size: 15px;
    line-height: 1.9;
    scrollbar-color: rgba(131, 66, 54, 0.38) transparent;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        height: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: rgba(131, 66, 54, 0.38);
    }

    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
        margin: 1.5em 0 0.65em;
        color: #56342f;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-weight: 600;
        line-height: 1.45;
        letter-spacing: 0.04em;
    }

    :deep(h1:first-child),
    :deep(h2:first-child),
    :deep(h3:first-child),
    :deep(h4:first-child),
    :deep(p:first-child) {
        margin-top: 0;
    }

    :deep(h1) {
        font-size: 26px;
    }

    :deep(h2) {
        font-size: 22px;
    }

    :deep(h3) {
        font-size: 19px;
    }

    :deep(h4),
    :deep(h5),
    :deep(h6) {
        font-size: 16px;
    }

    :deep(p) {
        margin: 0.8em 0;
    }

    :deep(ul),
    :deep(ol) {
        margin: 0.9em 0;
        padding-left: 2em;
    }

    :deep(li + li) {
        margin-top: 0.35em;
    }

    :deep(a) {
        color: #873a33;
        text-decoration: underline;
        text-decoration-color: rgba(135, 58, 51, 0.42);
        text-underline-offset: 3px;
    }

    :deep(strong) {
        color: #5d342f;
    }

    :deep(blockquote) {
        margin: 1.2em 0;
        padding: 12px 18px;
        border-left: 4px solid #a55b49;
        background: rgba(160, 91, 67, 0.07);
        color: #82665e;
    }

    :deep(hr) {
        height: 1px;
        margin: 24px 0;
        border: 0;
        background: linear-gradient(90deg, transparent, rgba(135, 79, 62, 0.35), transparent);
    }

    :deep(img) {
        max-width: 100%;
        height: auto;
        border: 1px solid rgba(130, 75, 59, 0.22);
        box-shadow: 0 8px 20px rgba(79, 40, 31, 0.08);
    }

    :deep(table) {
        width: 100%;
        min-width: 640px;
        margin: 18px 0;
        border: 1px solid rgba(126, 77, 63, 0.32);
        border-collapse: collapse;
        background: rgba(255, 251, 241, 0.7);
        color: #654941;
        font-size: 14px;
        line-height: 1.65;
    }

    :deep(th),
    :deep(td) {
        padding: 11px 14px;
        border: 1px solid rgba(126, 77, 63, 0.22);
        text-align: left;
        vertical-align: top;
    }

    :deep(th) {
        background: linear-gradient(180deg, #8f483e, #71312c);
        color: #ffe8c2;
        font-weight: 600;
        letter-spacing: 0.04em;
    }

    :deep(tbody tr:nth-child(even)) {
        background: rgba(226, 199, 164, 0.2);
    }

    :deep(tbody tr:hover) {
        background: rgba(205, 160, 112, 0.2);
    }

    :deep(code) {
        padding: 2px 5px;
        border: 1px solid rgba(130, 75, 59, 0.16);
        background: rgba(122, 66, 53, 0.07);
        color: #7a342e;
        font-family: Consolas, Monaco, monospace;
        font-size: 0.9em;
    }

    :deep(pre) {
        overflow-x: auto;
        padding: 16px;
        background: #4b302c;
        color: #f8e8cf;

        code {
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
        }
    }
}

.c-lover-rich-text__empty {
    margin: 0;
    color: #927870;
    line-height: 1.9;
}

@media screen and (max-width: 700px) {
    .c-lover-rich-text {
        padding: 20px 18px;
    }

    .c-lover-rich-text__content {
        font-size: 14px;

        :deep(table) {
            min-width: 560px;
        }
    }
}
</style>
