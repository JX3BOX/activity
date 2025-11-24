<template>
    <div class="m-info-content" v-loading="loading">
        <div v-html="content" v-if="content"></div>
        <div class="u-null" v-else-if="!loading">
            <img :src="data.nullImg" />
        </div>
    </div>
</template>
<script>
import { getEventAc } from "@/service/event/jx3story";
export default {
    name: "jx3storyInfo",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            content: "",
        };
    },
    computed: {
        ac_id() {
            return this.data.ac_id || "";
        },
    },
    watch: {
        ac_id: {
            handler(id) {
                this.content = "";
                id && this.loadInfo(id);
            },
            immediate: true,
        },
    },
    methods: {
        loadInfo(id) {
            this.loading = true;
            getEventAc(id)
                .then((post) => {
                    this.content = post;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
