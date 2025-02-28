<template>
    <div class="m-cangjian-equip">
        <div>
            <img class="u-img1 p-animation bounceIn" :src="img_root + `jianming.png`" />
        </div>
        <div>
            <img class="u-img2 p-animation bounceIn" :src="img_root + `yanyu.png`" />
        </div>
    </div>
</template>

<script>
export default {
    name: "equip",
    props: ["img_root"],
    components: {},
    data: function () {
        return {};
    },
    methods: {},
};
</script>