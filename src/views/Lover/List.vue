<template>
    <div class="p-lover-list" :style="containerStyle">
        <CommonHeader></CommonHeader>
        <div class="m-container">
            <img class="m-title" draggable="false" :src="`${cdnLink}design/event/lover/list/title.png`" />
            <img class="m-subtitle" draggable="false" :src="`${cdnLink}design/event/lover/list/subtitle.png`" />
            <div class="m-footer">主办：剑网3魔盒</div>
            <div class="m-list">
                <div
                    class="m-item"
                    v-for="(event, index) in events"
                    :key="event.id || event.slug || index"
                    :style="itemStyle(event)"
                    role="button"
                    tabindex="0"
                    :aria-label="eventAriaLabel(event)"
                    @click="goEvent(event)"
                    @keyup.enter="goEvent(event)"
                    @keyup.space.prevent="goEvent(event)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import jx3boxData from "@jx3box/jx3box-common/data/jx3box.json";
import { isLoverV2Event } from "@/utils/lover-v2";
const { __cdn: cdnLink } = jx3boxData;
export default {
    name: "LoverEventList",
    components: {},
    props: {},
    data: () => ({
        cdnLink,
    }),
    computed: {
        containerStyle() {
            const result = {
                "--background-image": `url(${cdnLink}design/event/lover/bg.webp)`,
            };
            return result;
        },
        events() {
            return this.$store.state.events || [];
        },
    },
    methods: {
        itemStyle(event) {
            const banner = event?.banner?.trim();
            return banner ? { backgroundImage: `url(${JSON.stringify(banner)})` } : {};
        },
        eventAriaLabel(event) {
            return `进入${event.name || "情缘杯"}活动`;
        },
        goEvent(event) {
            this.$router.push({
                name: isLoverV2Event(event) ? "v2-info" : "info",
                params: { slug: event.slug },
            });
        },
    },
};
</script>

<style lang="less">
.p-lover-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 1200px;
    height: 100dvh;
    overflow-y: auto;

    background-size: cover;
    background-position: center;
    background-image: var(--background-image);

    .m-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        gap: 77px;
        margin-top: 108px;
        .pr;
        width: 100%;
    }

    .m-title {
        .pa;
        top: 0;
        .size(671px, 486px);
        pointer-events: none;
    }

    .m-subtitle {
        .pa;
        top: 250px;
        height: 25px;
        pointer-events: none;
    }

    .m-list {
        .z(1);
        .mt(376px);
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
        gap: 36px;
    }

    .m-item {
        .size(600px, 160px);

        background-color: #5c382f;
        background-image: linear-gradient(135deg, #754b40 0%, #5c382f 48%, #38231f 100%);
        background-clip: border-box;
        background-size: cover;
        background-position: center;
        .pointer;
        .r(8px);

        border: 1px solid rgba(255, 177, 94, 1);
        box-sizing: border-box;
        transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

        &:hover {
            box-shadow: 0px 0px 20px rgba(255, 177, 94, 0.5);
            transform: scale(1.02);
        }

        &:focus-visible {
            outline: 2px solid #ffe0ac;
            outline-offset: 4px;
        }
    }

    .m-footer {
        .z(2);
        .pa;
        bottom: 56px;
        .size(672px, 40px);
        .r(4px);
        background: linear-gradient(
            90deg,
            rgba(89, 52, 45, 0) 0%,
            rgba(88, 51, 44, 1) 30.55%,
            rgba(88, 51, 44, 1) 67.36%,
            rgba(88, 51, 44, 0) 100%
        );
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 16px;
        line-height: 23.17px;
        color: white;
    }
}
</style>
