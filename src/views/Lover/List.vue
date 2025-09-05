<template>
    <div class="p-lover-list" :style="containerStyle">
        <Header></Header>
        <div class="m-container">
            <img class="m-title" draggable="false" :src="`${cdnLink}design/event/lover/list/title.png`" />
            <img class="m-subtitle" draggable="false" :src="`${cdnLink}design/event/lover/list/subtitle.png`" />
            <div class="m-footer">主办：剑网3魔盒</div>
            <div class="m-list">
                <div
                    class="m-item"
                    v-for="(event, index) in events"
                    :key="index"
                    :style="itemStyle(event)"
                    @click="goEvent(event)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { __cdn as cdnLink } from "@jx3box/jx3box-common/data/jx3box.json";
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
            return {
                backgroundImage: `url(${event.banner})`,
            };
        },
        goEvent(event) {
            this.$router.push({
                name: "info",
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

        background-clip: border-box;
        background-size: cover;
        background-position: center;
        .pointer;
        .r(8px);

        border: 1px solid rgba(255, 177, 94, 1);
        box-sizing: border-box;

        &:hover{
            box-shadow: 0px 0px 20px rgba(255, 177, 94, 0.5);
            transform: scale(1.02);
            transition: all 0.3s ease-in-out;
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
