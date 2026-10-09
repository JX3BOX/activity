<script setup>
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { getEditions } from "../topic";

const route = useRoute();
const container = ref(null);
const open = shallowRef(false);
const options = shallowRef([]);
const current = computed(() => options.value.find((edition) => route.path === `/${edition.year}`)
    || { year: Number(route.path.slice(1)), label: route.path.slice(1) });
onMounted(async () => {
    try {
        options.value = await getEditions();
    } catch {
        // 接口不可用时显示当前地址中的年份。
    }
});
onClickOutside(container, () => { open.value = false; });
watch(() => route.fullPath, () => { open.value = false; });
</script>

<template>
    <div ref="container" class="dat-edition-select" @keydown.esc="open = false">
        <button type="button" class="dat-edition-trigger" :aria-expanded="open" @click="open = !open">
            {{ current.label }}
        </button>
        <nav v-if="open" class="dat-edition-menu" aria-label="切换活动届数">
            <router-link v-for="edition in options" :key="edition.year"
                :to="{ path: `/${edition.year}`, query: route.query }"
                :aria-current="current.year === edition.year ? 'page' : undefined"
                @click="open = false">{{ edition.label }}</router-link>
        </nav>
    </div>
</template>

<style scoped lang="less">
.dat-edition-select { position: relative; display: inline-block; }
.dat-edition-trigger {
    padding: 0; border: 0; background: transparent; color: inherit;
    font: inherit; letter-spacing: inherit; cursor: pointer;
}
.dat-edition-trigger:focus-visible { outline: 1px solid #fff; outline-offset: 6px; }
.dat-edition-menu {
    position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
    z-index: 20; min-width: 100%; padding: 6px; border: 1px solid #555;
    border-radius: 4px; background: #000; box-shadow: 0 8px 24px #0008;
    font-size: clamp(14px, 1vw, 18px); font-weight: normal; letter-spacing: 1px;
    a { display: block; padding: 10px 16px; color: #fff; white-space: nowrap; text-decoration: none; }
    a:hover, a:focus-visible, a[aria-current="page"] { background: #333; }
}
</style>
