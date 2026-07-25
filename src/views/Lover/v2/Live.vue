<template>
    <LoverV2Layout>
        <section class="m-lover-v2-page-title">
            <div>
                <h2>在线直播</h2>
                <p>在主直播间一起见证本届情缘杯的每一场相逢与交锋。</p>
            </div>
        </section>

        <div class="m-lover-v2-live">
            <h3 class="u-page-title">主办方直播间</h3>
            <div
                class="m-live-box"
                @mouseenter="mainBoxHovered = true"
                @mouseleave="mainBoxHovered = false"
                @click="openMainLive"
            >
                <div class="m-live-container">
                    <iframe
                        class="m-live-iframe"
                        :src="liveUrl"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
                <img
                    class="u-frame-img"
                    :src="`${imageRoot}${mainBoxHovered ? 'jubanfangbox-hover.png' : 'jubanfangbox.png'}`"
                    alt=""
                />
            </div>

            <h3 class="u-page-title is-player-title">选手直播间</h3>
            <div v-if="list.length" class="m-player-list">
                <article v-for="item in list" :key="item.id" class="m-player-item">
                    <a class="u-video" :href="item.live_url" target="_blank" rel="noopener noreferrer">
                        <img :src="teamLogo(item.images?.[0])" class="u-live-null" loading="lazy" alt="" />
                        <i class="u-status">等待开播</i>
                    </a>
                    <div class="m-player-info">
                        <img class="u-team-logo" :src="teamLogo(item.images?.[0])" alt="" />
                        <strong class="u-team-name">{{ item.team_name }}</strong>
                        <div class="u-teammates">
                            <span
                                v-for="user in uniqBy(item.teammeta_user_list, 'id')"
                                :key="user.id"
                                class="u-teammate"
                            >
                                <a
                                    class="u-avatar-link"
                                    :href="`https://www.jx3box.com/author/${user.id}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :aria-label="`在新标签页查看 ${user.display_name} 的个人主页`"
                                    @click.stop
                                >
                                    <el-avatar :size="20" :src="showAvatar(user.avatar || defaultAvatar)" />
                                </a>
                                {{ user.display_name }}
                            </span>
                        </div>
                        <p class="u-slogan">{{ item.slogan }}</p>
                    </div>
                </article>
            </div>
            <div v-else class="m-lover-v2-panel m-lover-v2-empty">
                <h3>暂无选手直播</h3>
                <p>主直播间开放后，可直接从上方进入观看。</p>
            </div>
        </div>
    </LoverV2Layout>
</template>

<script>
import { getSelectedList } from "@/service/rank/lover";
import { uniqBy } from "lodash";
import { getThumbnail, showAvatar } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@/utils/config";
import { default_avatar as defaultAvatar } from "@/utils/config";
import LoverV2Layout from "@/layouts/lover/LoverV2Layout.vue";

export default {
    name: "LoverV2Live",
    components: { LoverV2Layout },
    data: function () {
        return {
            defaultAvatar,
            imageRoot: `${__imgPath}image/lover/`,
            list: [],
            mainBoxHovered: false,
        };
    },
    computed: {
        eventId() {
            return this.$store.getters.currentEventId;
        },
        liveUrl() {
            return (
                this.$store.state.v2_event?.live_url ||
                "https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=31109814&danmaku=1"
            );
        },
    },
    watch: {
        eventId: {
            handler: function () {
                this.loadData();
            },
            immediate: true,
        },
    },
    methods: {
        showAvatar,
        uniqBy,
        teamLogo(value) {
            return value ? getThumbnail(value, 240, true) : defaultAvatar;
        },
        async loadData() {
            if (!this.eventId) return;
            try {
                const res = await getSelectedList(this.eventId);
                this.list = res.data.data.list || [];
            } catch (error) {
                console.error("[LoverV2Live.loadData]", error);
                this.list = [];
            }
        },
        openMainLive() {
            window.open(this.liveUrl, "_blank", "noopener,noreferrer");
        },
    },
};
</script>

<style scoped lang="less">
.m-lover-v2-live {
    .u-page-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 18px;
        margin: 0 0 24px;
        color: #6f332e;
        font-family: "ZCOOL XiaoWei", "STSong", serif;
        font-size: 30px;
        font-weight: 400;
        line-height: 1.3;
        letter-spacing: 0.14em;
        text-align: center;

        &::before,
        &::after {
            content: "";
            width: 84px;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(132, 69, 55, 0.58));
        }

        &::after {
            transform: rotate(180deg);
        }

        &.is-player-title {
            margin-top: 48px;
        }
    }
}

.m-live-box {
    position: relative;
    aspect-ratio: 16 / 9;
    box-sizing: border-box;
    cursor: pointer;
}

.m-live-container {
    position: absolute;
    z-index: 1;
    inset: 5px 15px;
    overflow: hidden;
    border-radius: 6px;
    background: #241817;
}

.m-live-iframe,
.u-frame-img {
    width: 100%;
    height: 100%;
}

.u-frame-img {
    position: absolute;
    z-index: 2;
    inset: 0;
    pointer-events: none;
}

.m-player-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.m-player-item {
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #c39769;
    background: rgba(81, 36, 31, 0.94);
    color: #ffe9c7;
}

.u-video {
    position: relative;
    display: block;
    height: 220px;
    overflow: hidden;
    margin-bottom: 12px;
    background: #211817;

    .u-live-null {
        display: block;
        width: 120px;
        height: 120px;
        margin: 50px auto;
        object-fit: cover;
    }
}

.u-status {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 4px 10px;
    border-radius: 2px;
    background: rgba(126, 52, 45, 0.9);
    color: #fff;
    font-size: 12px;
    font-style: normal;
}

.m-player-info {
    min-height: 82px;

    .u-team-logo {
        float: left;
        width: 80px;
        height: 80px;
        margin-right: 12px;
        border: 1px solid rgba(249, 226, 193, 0.72);
        border-radius: 4px;
        object-fit: cover;
    }

    .u-team-name {
        display: block;
        margin-bottom: 7px;
        font-size: 15px;
    }

    .u-teammates {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px 10px;
        font-size: 12px;
    }

    .u-teammate {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    .u-avatar-link {
        display: inline-flex;
        border-radius: 50%;
        outline: none;

        &:hover,
        &:focus-visible {
            box-shadow: 0 0 0 2px rgba(236, 194, 145, 0.46);
        }
    }

    .u-slogan {
        display: -webkit-box;
        overflow: hidden;
        margin: 8px 0 0;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #e5c9a8;
        font-size: 12px;
    }
}

@media screen and (max-width: 760px) {
    .m-lover-v2-live .u-page-title {
        gap: 12px;
        font-size: 24px;

        &::before,
        &::after {
            width: 42px;
        }
    }

    .m-player-list {
        grid-template-columns: 1fr;
    }

    .u-video {
        height: 180px;

        .u-live-null {
            width: 100px;
            height: 100px;
            margin-top: 40px;
        }
    }
}
</style>
