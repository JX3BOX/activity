<script setup>
import SectionTitle from "./SectionTitle.vue";
import { rewardImages } from "./config";
const ranks = ["第一名", "第二名", "第三名"];
const specials = ["人气之王", "天道酬勤", "创意大师"];
</script>
<template>
    <div class="dat-rewards">
        <section class="dat-award-section">
            <SectionTitle title="总分排名奖项" tone="gold" />
            <div class="dat-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>名次</th>
                            <th>实体奖励</th>
                            <th>魔盒积分</th>
                            <th>社区荣誉</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rank in ranks" :key="rank">
                            <td>{{ rank }}</td>
                            <td>实体奖杯 + 龙马精神（2024+2026）币钞组合</td>
                            <td>2000</td>
                            <td>社区勋章、社区称号</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="dat-award-section">
            <SectionTitle title="特殊奖项" tone="orange" />
            <div class="dat-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>奖项</th>
                            <th>名额</th>
                            <th>实体奖励</th>
                            <th>魔盒积分</th>
                            <th>社区荣誉</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="award in specials" :key="award">
                            <td>{{ award }}</td>
                            <td>1名</td>
                            <td>实体奖杯、5000盒币</td>
                            <td>1000</td>
                            <td>社区勋章、社区称号</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="dat-award-section">
            <SectionTitle title="广谱奖项" />
            <div class="dat-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>奖项</th>
                            <th>奖励内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>「魔盒积分」</td>
                            <td>其余投票数据中玩家投票的评分达到 100 分以上的，将获得 500 积分（不重复）</td>
                        </tr>
                        <tr>
                            <td>「数据大师勋章」</td>
                            <td>所有投稿作者都将得社区勋章一枚</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <section class="dat-award-section dat-showcase">
            <SectionTitle title="实物奖励展示" tone="gold" />
            <p>实体奖杯以及龙马精神（2024+2026）币钞组合</p>
            <img
                v-if="rewardImages.physical"
                class="dat-physical"
                :src="rewardImages.physical"
                alt="龙马精神纪念币钞组合"
            />
            <div v-else class="dat-image-placeholder">
                龙马精神<span>2024 + 2026 生肖纪念币钞组合</span><small>实物图片待补充</small>
            </div>
        </section>
        <section class="dat-award-section dat-showcase">
            <SectionTitle title="社区奖励展示" tone="purple" />
            <p>同时提供 积分、社区勋章、社区称号</p>
            <img
                v-if="rewardImages.community"
                class="dat-community"
                :src="rewardImages.community"
                alt="2026数据大师赛社区称号"
            />
            <div v-else class="dat-community-placeholder">✧ <strong>2026数据大师赛</strong> ✧</div>
        </section>
    </div>
</template>
