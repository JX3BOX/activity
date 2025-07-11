<template>
    <div class="m-certificate">
        <h3 class="u-title">情缘证</h3>
        <div class="m-lover-users">
            <div class="m-lover-user" v-for="user in data.members" :key="user.id">
                <img class="u-avatar" :src="user.user_info.avatar || defaultAvatar" />
                <div class="u-name">{{ user.user_info.display_name }}</div>
            </div>
        </div>
        <h3 class="u-days">结缘于 {{ dayCount }} 天前</h3>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    name: "certificate",
    props: {
        data: {
            type: Object,
            default: () => {},
        },
    },
    data: function () {
        return {};
    },
    computed: {
        defaultAvatar() {
            return `https://cdn.jx3box.com/image/common/avatar.png`;
        },
        dayCount() {
            const maxDate = this.data.members.reduce((max, member) => {
                const date = dayjs(member.created_at);
                return date.isAfter(max) ? date : max;
            }, dayjs(0));
            return maxDate.diff(dayjs(), "day") * -1; // 计算天数差
        },
    },
    methods: {},
    mounted() {
        console.log(this.data);
    },
};
</script>
<style lang="less">
.m-certificate {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    .m-lover-users {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 80px;
    }

    .m-lover-user {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        background-color: #ff6f6f33;
        border: 1px solid #ff6f6f66;
        .r(4px);
        padding: 16px;
        .u-avatar {
            .size(72px);
            .r(100%);
        }
        .u-name {
            font-size: 16px;
            color: #ff6f6f;
        }
    }
}
</style>
