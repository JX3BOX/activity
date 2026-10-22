import { shallowRef, onMounted, onBeforeUnmount } from "vue";

// Observe each section independently so revisiting a chapter replays its entrance.
export function useSectionMotion() {
    const section = shallowRef(null);
    const visible = shallowRef(false);
    let observer;
    onMounted(() => {
        observer = new IntersectionObserver(([entry]) => {
            visible.value = entry.isIntersecting;
        }, { threshold: 0.15 });
        if (section.value) observer.observe(section.value);
    });
    onBeforeUnmount(() => observer?.disconnect());
    return { section, visible };
}
