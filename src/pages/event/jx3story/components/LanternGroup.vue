<template>
    <div class="lantern-group">
        <Lantern
            to="/event"
            :top="68"
            :left="44"
            lanternPath="main/main__lantern1.png"
            textPath="main/main__texttrans_event.png"
            alt="灯笼1"
            textAlt="内容活动"
        />
        <Lantern
            to="/article"
            :top="274"
            :left="136"
            lanternPath="main/main__lantern2.png"
            textPath="main/main__texttrans_article.png"
            alt="灯笼2"
            textAlt="文字赏析"
        />
        <Lantern
            to="/vote"
            :top="440"
            :left="66"
            lanternPath="/main/main__lantern3.png"
            textPath="/main/main__texttrans_vote.png"
            alt="灯笼3"
            textAlt="投票参与"
        />
    </div>
</template>

<script>
import Lantern from "./Lantern.vue";
export default {
    name: "LanternGroup",
    components: {
        Lantern,
    },
};
</script>
