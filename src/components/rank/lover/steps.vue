<template>
    <div class="m-process-steps" ref="steps">
        <div
            class="u-step"
            v-for="(item, i) in list"
            :key="i"
            :style="{ margin: `${~~i * 57}px  0`, gap: `${~~i * 114 + 57}px` }"
        >
            <template v-if="item.length">
                <div
                    class="u-group"
                    v-for="(group, g) in item"
                    :key="g"
                    :style="{ height: `calc(100%/${~~item.length} - 60px)` }"
                >
                    <battle :data="battle" v-for="(battle, b) in group" :key="b" />
                </div>
            </template>
            <battle v-else />
        </div>
    </div>
</template>

<script>
import battle from "@/components/rank/lover/battle_old.vue";
import { groupBy, chunk } from "lodash";
export default {
    name: "steps",
    props: {
        steps: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
    },
    components: { battle },
    data: function () {
        return {
            list: [],
        };
    },
    watch: {
        steps: {
            handler: function (steps) {
                let arr = [];
                for (let i = 0; i < steps.length; i++) {
                    let subArray = [];
                    for (let j = 0; j < steps[i]; j++) {
                        subArray.push([
                            [{}, {}],
                            [{}, {}],
                        ]);
                    }
                    arr.push(subArray);
                }
                this.list = arr;
            },
            deep: true,
            immediate: true,
        },
        data: {
            handler: function (list) {
                if (list.length) {
                    const _group = groupBy(list, "round");
                    Object.keys(_group).forEach((i) => {
                        _group[i] = chunk(chunk(_group[i], 2), 2);
                    });
                    this.list.forEach((array, index) => {
                        const key = index + 1;
                        if (_group[key]) {
                            if (index < _group[key].length) {
                                array.splice(0, _group[key].length, ..._group[key]);
                            }
                        }
                    });
                }
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {},
    methods: {},
};
</script>
<style lang="less">
.m-process-steps {
    .flex;
    justify-content: center;
    gap: 80px;
    .u-step {
        .flex;
        flex-direction: column;
        justify-content: center;
        gap: 60px;
        &:first-child .m-lover-battle::before {
            content: none;
        }
    }
    .u-group {
        .pr;
        .flex;
        min-height: 300px;
        flex-direction: column;
        justify-content: space-between;
        &::after {
            content: "";
            .pa;
            .rt(-20px, 42px);
            .size(4px ,calc(100% - 100px));
            background-color: #fff;
            transform: translateX(-1px);
        }
    }
}
</style>
