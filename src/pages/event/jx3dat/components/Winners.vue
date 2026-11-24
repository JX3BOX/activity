<script setup>
import { computed } from "vue";
import SectionTitle from "./SectionTitle.vue";
import EmptyState from "./EmptyState.vue";
const props = defineProps({ items: { type: Array, default: () => [] } });
const groups = computed(() => {
    const result = new Map();
    props.items.forEach((item) => {
        const title = item.link || "获奖名单";
        if (!result.has(title)) result.set(title, { title, tone: item.color || "cyan", people: [] });
        result.get(title).people.push(item);
    });
    return [...result.values()];
});
</script>
<template>
    <div class="dat-winners">
        <section v-for="group in groups" :key="group.title" class="dat-winner-section" :class="'tone-' + group.tone">
            <SectionTitle :title="group.title" :tone="group.tone" />
            <div class="dat-winner-grid" :class="{ 'is-general': group.tone === 'cyan' }">
                <div v-for="(person, index) in group.people" :key="person.id || index" class="dat-person">
                    <component :is="person.author ? 'a' : 'div'"
                        :href="person.author ? `https://www.jx3box.com/author/${person.author}` : undefined"
                        :target="person.author ? '_blank' : undefined"
                        :rel="person.author ? 'noopener noreferrer' : undefined"
                        :aria-label="person.author ? `${person.title}的个人中心` : undefined">
                        <img v-if="person.img" :src="person.img" :alt="person.title" loading="lazy" />
                        <div v-else class="dat-avatar-placeholder" aria-label="头像待补充">{{ (person.title || '').slice(0, 1) }}</div>
                    </component>
                    <p v-if="person.desc" class="dat-person-award">「 {{ person.desc }} 」</p>
                    <h3>{{ person.title }}</h3>
                </div>
            </div>
        </section>
        <EmptyState v-if="!groups.length" />
    </div>
</template>
