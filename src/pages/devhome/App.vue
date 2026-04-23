<template>
    <div class="dev-nav">
        <div class="dev-nav__panel">
            <p class="dev-nav__eyebrow">Local Dev</p>
            <h1 class="dev-nav__title">导航测试页</h1>
            <p class="dev-nav__desc">仅在本地开发环境挂载，用于快速跳转到各业务入口。</p>

            <div class="dev-nav__list">
                <a v-for="item in links" :key="item.path" class="dev-nav__item" :href="item.path">
                    <span class="dev-nav__name">{{ item.name }}</span>
                    <span class="dev-nav__path">{{ item.path }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DevHome",
    data() {
        return {
            links: [
                { name: "资料片专题", path: "/topic" },
                { name: "活动专题", path: "/event" },
                { name: "百强榜", path: "/rank" },
                { name: "情缘杯", path: "/lover" },
                { name: "门派天团", path: "/superstar" },
            ],
        };
    },
};
</script>

<style>
body {
    margin: 0;
}
</style>
<style scoped>
.dev-nav {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background: radial-gradient(circle at top, rgba(196, 181, 253, 0.25), transparent 38%),
        linear-gradient(135deg, #0f172a 0%, #111827 45%, #1f2937 100%);
}

.dev-nav__panel {
    width: 100%;
    max-width: 720px;
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 24px;
    background: rgba(15, 23, 42, 0.72);
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.35);
    backdrop-filter: blur(14px);
}

.dev-nav__eyebrow {
    margin: 0 0 12px;
    color: #f59e0b;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.dev-nav__title {
    margin: 0;
    color: #f8fafc;
    font-size: 40px;
    line-height: 1.1;
}

.dev-nav__desc {
    margin: 14px 0 0;
    color: #cbd5e1;
    font-size: 16px;
    line-height: 1.7;
}

.dev-nav__list {
    display: grid;
    gap: 14px;
    margin-top: 28px;
}

.dev-nav__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    color: inherit;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.04);
    transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.dev-nav__item:hover {
    transform: translateY(-2px);
    border-color: rgba(245, 158, 11, 0.5);
    background: rgba(245, 158, 11, 0.08);
}

.dev-nav__name {
    color: #f8fafc;
    font-size: 18px;
    font-weight: 600;
}

.dev-nav__path {
    color: #94a3b8;
    font-size: 14px;
}

@media (max-width: 640px) {
    .dev-nav {
        padding: 20px;
    }

    .dev-nav__panel {
        padding: 24px;
        border-radius: 20px;
    }

    .dev-nav__title {
        font-size: 30px;
    }

    .dev-nav__item {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
