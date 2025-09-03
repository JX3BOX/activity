<template>
    <el-dialog
        :visible="visible"
        custom-class="m-lover-battle-detail__dialog"
        :show-close="false"
        append-to-body
        :style="containerStyle"
    >
        <template #title>
            <el-button class="el-dialog__headerbtn" type="text" @click="visible = false">
                <img src="@/assets/img/rank/lover/close.svg" svg-inline alt="" />
            </el-button>
        </template>
        <div class="m-battle-detail" v-if="renderProcess">
            <battle-detail-team
                class="is-left"
                :team="renderProcess.team1_record"
                :card="cardInfo(renderProcess.team1_card)"
            ></battle-detail-team>
            <div class="m-middle">
                <img class="u-logo" :src="`${cdnLink}design/event/lover/battle_lover_logo.webp`" alt="" />
                <img class="u-vs" :src="`${cdnLink}design/event/lover/process/vs.png`" alt="" />
                <img class="u-round" v-if="renderProcess" :src="headImage[renderProcess.round - 1]" alt="" />
                <span class="u-time">{{ renderProcess.finish_at }} </span>
            </div>
            <battle-detail-team
                :team="renderProcess.team2_record"
                :card="cardInfo(renderProcess.team2_card)"
            ></battle-detail-team>
        </div>
    </el-dialog>
</template>

<script>
import BattleDetailTeam from "@/components/rank/lover/battle_detail_team.vue";
import { cloneDeep } from "lodash";
import { getEventCardList } from "@/service/rank/lover";

export default {
    name: "LoverBattleDetail",
    components: { BattleDetailTeam },
    props: {},
    inject: ["cdnLink", "headImage"],
    data: () => ({
        visible: false,
        process: null,
        cards: [],
    }),
    computed: {
        currentEvent() {
            return this.$store.state.event;
        },
        renderProcess() {
            if (!this.process) return null;
            const result = cloneDeep(this.process);
            result.team1_record = {
                ...(result.team1_record || {}),
                teammates_info: result.team1_teammates || [],
            };
            result.team2_record = {
                ...(result.team2_record || {}),
                teammates_info: result.team2_teammates || [],
            };
            return result;
        },
        containerStyle() {
            return {
                "--bg-image": `url(${this.cdnLink}design/event/lover/battle_detail_bg.webp)`,
            };
        },
    },
    methods: {
        loadCards() {
            getEventCardList({
                _no_page: 1,
                event_id: this.currentEvent.id,
            }).then((res) => {
                this.cards = res.data.data.list || [];
            });
        },
        open(process) {
            this.visible = true;
            this.process = process; 
        },
        cardInfo(id) {
            return this.cards.find((item) => item.id === id) || {};
        }
    },
    mounted() {
        this.loadCards();
    },
};
</script>

<style lang="less">
.m-lover-battle-detail__dialog {
    .w(869px);
    box-sizing: border-box;
    border: 1px solid #f3c768ff;
    border-top: 10px solid #f3c768ff;
    background: rgba(105, 63, 51, 1);

    .el-dialog__header {
        .pr;
        padding: 0;
    }
    .el-dialog__headerbtn {
        .pa;
        .rt(0px);
        .size(40px);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        color: rgba(243, 199, 104, 1);

        span {
            line-height: 0;
        }
    }
    .el-dialog__body {
        padding: 40px 0;
        background-image: var(--bg-image);
        background-size: cover;
    }
    .m-battle-detail {
        opacity: 1;
        background: rgba(77, 42, 33, 0.5);
        display: flex;
        justify-content: center;
        padding: 24px 70px;
        gap: 36px;
    }

    .m-middle {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        flex-direction: column;

        .u-logo {
            .size(97px, 70px);
            .mb(20px);
        }
        .u-vs {
            .size(65px, 54px);
            .mb(8px);
        }
        .u-round {
            .w(80px);
            .mb(8px);
        }
        .u-time {
            .fz(12px, 17.38px);
            color: rgba(255, 255, 255, 0.5);
        }
    }
}
</style>
