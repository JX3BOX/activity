<template>
    <div class="m-introduce">
        <template v-if="superstar_desc">
            <div class="u-content">
                <div class="u-info" v-html="superstar_desc"></div>
            </div>
            <img :src="imgUrl + 'bg01-1.png'" class="u-bg-top" />
            <img :src="imgUrl + 'bg01-3.png'" class="u-bg-bottom" />
        </template>
        <div class="m-null" v-else><img :src="imgUrl + 'null.png'" /></div>
    </div>
</template>

<script>
import { __cdn } from "@/utils/config";
export default {
    components: {},
    data() {
        return {
            imgUrl: __cdn + "design/event/superstar/",
        };
    },
    computed: {
        id() {
            return this.$store.state.id;
        },
        superstar_desc() {
            return this.$store.state.race.superstar_desc;
        },
    },
};
</script>
