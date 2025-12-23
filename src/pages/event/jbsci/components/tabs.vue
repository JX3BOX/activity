<template>
    <div class="m-tabs">
        <div class="title">JBSCI<i>·</i>JX3BOX SCIENCE CITATION INDEX</div>
        <div class="logo">
            <img class="u-logo" src="@/assets/img/event/jbsci.svg" svg-inline @click="change('SLIDER')" />
        </div>
        <div class="tabs">
            <span
                class="u-tab"
                :class="{ active: active == item.label }"
                v-for="(item, i) in tabs"
                :key="i"
                @click="change(item.label)"
            >
                {{ item.label }}<i>{{ item.name }}</i>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Tabs",
    emits: ["update"],
    data: function () {
        return {
            tabs: [
                { name: "精选作品", label: "ARTICLES" },
                { name: "特约作者", label: "INVITED" },
                { name: "签约作者", label: "AUTHORS" },
            ],
            active: "SLIDER",
        };
    },
    computed: {
        key() {
            return this.$route.query.tab;
        },
    },
    methods: {
        change(name) {
            this.active = name;
        },
    },
    watch: {
        key: {
            immediate: true,
            handler: function () {
                const key = {
                    sci: "ARTICLES",
                    authors: "AUTHORS",
                    invited: "INVITED",
                };
                this.active = key[this.key] || "SLIDER";
            },
        },
        active() {
            this.$emit("update", this.active);
            const key = {
                SLIDER: "index",
                ARTICLES: "sci",
                AUTHORS: "authors",
                INVITED: "invited",
            };
            this.$router.push({ query: { tab: key[this.active] } });
        },
    },
};
</script>
<style lang="less">
.m-tabs {
    .flex;
    flex-direction: column;
    .title {
        .x;
        .h(30px);
        .fz(13px,30px);
        background: #ba9624;
        color: #fff;
        user-select: none;
        i {
            margin: 0 5px;
        }
    }
    .logo {
        .flex;
        .h(100px);
        justify-content: center;
        align-items: center;
        .u-logo {
            .pointer;
            .size(80px);
            fill: #ba9624;
        }
    }
    .tabs {
        .flex;
        .h(26px);
        .fz(13px,26px);
        color: rgba(0, 0, 0, 0.6);
        font-weight: 400;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .u-tab {
            .w(200px);
            .x;
            .pointer;
            user-select: none;
            &:hover,
            &.active {
                color: #fff;
                background: #ba9624;
            }
        }
        i {
            .ml(10px);
            font-style: normal;
        }
    }
}
</style>
