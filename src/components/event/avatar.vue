<template>
    <el-avatar class="u-avatar" :size="size" :src="srcUrl"> </el-avatar>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Avatar",
    props: {
        src: {
            type: String,
            default: "",
        },
        size: {
            type: Number,
            default: 20,
        },
    },
    computed: {
        srcUrl() {
            let avatar = this.src || "";
            return showAvatar(avatar, "l");
        },
    },
};
</script>
