<template>
    <div class="m-awards">
        <div class="m-top">
            <!-- 左右布局 -->
            <div class="u-left">
                <div>可以由玩家个人、团队或其它组织形式提交奖项设立申请，奖品由玩家提供。</div>
                <div>每届共接受100个奖项设立，可由玩家自定义奖项授予范围。</div>
                <div>奖品包括：现金、实物和虚拟三种类型。</div>
                <div>
                    赛事中﹝百强榜﹞指代团队百强榜，﹝天梯榜﹞指代个人天梯榜（即通过dps排名，所有进入天梯榜的本身需属于一个参赛团队方可，但团队本身不一定进百强），如发生削弱，将会提前闭榜。
                </div>
                <h2>限制条件</h2>
                <span>
                    ① 玩家在设立以上奖项时，需按照魔盒指定规范进行提交，如有意向但未及时提供相应资料或奖励则视为放弃 <br />
                    ② 每个奖项必须为不可预知的获奖目标，不能带有强指定性<br />
                    ③ 每个设立单位最多不能超过设立10个奖项，魔盒将根据实际情况，有权选择性接受设立的奖项
                </span>
            </div>
            <div class="u-right">
                <img :src="getCdnLink('design/rank/rank/top-right.png')" />
            </div>
        </div>
        <!-- 奖项table -->
        <div class="m-awards-header">
            <div class="m-awards-th">序号</div>
            <div class="m-awards-th">出奖人</div>
            <div class="m-awards-th">奖项</div>
            <div class="m-awards-th">授予</div>
            <div class="m-awards-th">获奖人</div>
            <div class="m-awards-th">备注</div>
        </div>
        <div class="m-awards-list" v-for="(item, index) in list" :key="index">
            <div class="m-awards-td">
                <div class="u-number">{{ index + 1 }}</div>
            </div>
            <template v-if="item.name">
                <div class="m-awards-td">
                    <div class="u-name">{{ item.name || "" }}</div>
                </div>
                <div class="m-awards-td">
                    <div class="m-break">{{ item.gift || "" }}</div>
                </div>
                <div class="m-awards-td">
                    <div class="m-break" v-katex="options">{{ item.target }}</div>
                </div>
                <div class="m-awards-td">
                    <div class="u-name">{{ item.prizewinner || "待定" }}</div>
                </div>
                <div class="m-awards-td">
                    <div v-if="item.name" class="u-btn" :class="!item.remark && 'is-disabled'"></div>
                </div>
            </template>
            <div v-else class="m-awards-td u-no-data">虚位以待</div>
        </div>
    </div>
</template>

<script>
import { getGifts } from "@/service/rank/awards";
import {getCdnLink} from "@/utils";
export default {
    name: "Awards",
    components: {},
    data() {
        return {
            options: {
                delimiters: [
                    { left: "$$", right: "$$", display: false },
                    { left: "$", right: "$", display: false },
                    { left: "\\(", right: "\\)", display: false },
                    { left: "\\[", right: "\\]", display: true },
                ],
            },
            list: [],
        };
    },
    methods: {
        getList() {
            getGifts({ orderBy: "rank" }).then((res) => {
                // 通过rank字段来排序
                const list = res?.data?.data?.list.sort((a, b) => ~~a.order - ~~b.order);
                const len = 100 - list.length;
                this.list = list.concat(new Array(len).fill({}));
            });
        },
        getCdnLink,
    },
    mounted() {
        this.getList();
        // this.getGifts();
        // this.getDesc();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/rank/awards.less";
</style>
