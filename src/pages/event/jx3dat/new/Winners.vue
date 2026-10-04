<script setup>
import SectionTitle from "./SectionTitle.vue";
import { winnerGroups } from "./config";
</script>
<template>
    <div class="dat-winners"> 
        <section
            v-for="group in winnerGroups"
            :key="group.title"
            class="dat-winner-section"
            :class="'tone-' + group.tone"
        >
            <SectionTitle :title="group.title" :tone="group.tone" />
            <div class="dat-winner-grid" :class="{ 'is-general': group.tone === 'cyan' }">
                <div v-for="person in group.people" :key="person.name" class="dat-person">
                    <img v-if="person.avatar" :src="person.avatar" :alt="person.name" loading="lazy" />
                    <div v-else class="dat-avatar-placeholder" aria-label="头像待补充">
                        {{ person.name.slice(0, 1) }}
                    </div>
                    <p v-if="person.award" class="dat-person-award">「 {{ person.award }} 」</p>
                    <h3>{{ person.name }}</h3>
                </div>
            </div>
        </section>
    </div>
</template>
