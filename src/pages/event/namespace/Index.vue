<template>
    <!-- 专题页 -->
    <div class="p-event" :class="'v-' + page_name">
        <div class="p-event-content">
            <div class="m-top"></div>
            <Content />
            <div class="m-bottom">
                <a :href="eventLink" target="_blank" class="u-link"></a>
                <img :src="imgRoot + 'man.png'" class="m-man" />
                <img :src="imgRoot + 'woman.png'" class="m-woman" />
            </div>
        </div>
    </div>
</template>

<script>
import Content from "./Content";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { __imgPath, __Root } from "@/utils/config";
export default {
    name: "Index",
    components: {
        Content,
    },
    data: function () {
        return {
            imgRoot: __imgPath + "topic/namespace/",
        };
    },
    computed: {
        page_name: function () {
            return "namespace";
        },
        eventLink() {
            return __Root + "event";
        },
    },
    created: function () {
        postStat("event", "namespace");
    },
};
</script>
