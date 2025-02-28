<template>
    <div class="lantern-group">
        <Lantern
            to="/event"
            :top="68"
            :left="44"
            lanternPath="/main/main__lantern1.png"
            textPath="/main/main__texttrans_event.png"
            alt="灯笼1"
            textAlt="内容活动"
            class="lantern lantern-1"
        />
        <Lantern
            to="/"
            :top="274"
            :left="136"
            lanternPath="/main/main__lantern2.png"
            textPath="/main/main__texttrans_article.png"
            alt="灯笼2"
            textAlt="文字赏析"
            class="lantern lantern-2"
        />
    </div>
</template>

<script>
import Lantern from "./Lantern.vue";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    components: {
        Lantern,
    },
};
</script>
