<template>
    <div class="m-winner">
        <div class="m-winner-section" v-for="(item, i) in list" :key="i">
            <div class="m-title">
                <img :src="`${__imgRoot}${item.type}.png`" class="u-title" />
                <span>{{ item.label }}</span>
            </div>
            <div class="m-list" :class="item.type" v-if="item.list">
                <div class="m-item" v-for="(e, index) in item.list" :key="index">
                    <h4>{{ e.title }}</h4>
                    <div class="u-user">
                        <img class="u-avatar" :src="e.user_info.avatar" />
                        <span>{{ e.user_info.display_name }}</span>
                    </div>
                    <div class="u-info">
                        <div class="u-tag">
                            <span class="u-button active" :class="e.tag">{{ e.tag }}</span>
                            <a href="http://" target="_blank">查看详细</a>
                        </div>
                        <div class="u-content">{{ e.content }}</div>
                    </div>
                </div>
            </div>
            <div class="u-line"></div>
        </div>
    </div>
</template>
<script>
export default {
    inject: ["__imgRoot"],
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
