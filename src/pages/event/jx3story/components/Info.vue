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

<style lang="less">
// .m-info-content {
    // width: 960px;
    // background: linear-gradient(180deg, rgba(245, 241, 228, 1) 0%, rgba(209, 205, 192, 1) 100%);
    // border: 10px solid rgba(115, 109, 106, 1);
    // backdrop-filter: blur(10px);
    // display: flex;
    // flex-direction: column;
    // justify-content: flex-start;
    // align-items: center;
    // padding: 40px 120px 40px 120px;
    // margin:100px auto 0 50px;
// }
</style>
