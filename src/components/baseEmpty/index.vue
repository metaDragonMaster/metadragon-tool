<template>
    <div class="base-empty child-center-column">
        <img :src="emptyType.image" alt />
        <p>{{props.title||emptyType.title}}</p>
    </div>
</template>

<script setup>
import { getItemByKey } from '@/utils/tools';
import {
  computed,
    // reactive,
    defineProps,
} from 'vue';
const props = defineProps({
    type: {
        type: String,
        readonly: true,
        required: false,
        default: 'data',
        validator: (value) => {
            return ['data', 'develop'].includes(value);
        }
    },
    title: {
        type: String,
        readonly: true,
        required: false,
        // default: '空的...',
    },
})
const emptyTypes = [
    {
        type: 'data',
        image: require("@/assets/icons/icon-dataEmpty.png"),
        title: '还没有数据哦...',
    },
    {
        type: 'develop',
        image: require("@/assets/icons/icon-developing.png"),
        title: '正在全力开发中~敬请期待',
    },
]

const emptyType = computed(()=>{
    return getItemByKey(props.type,emptyTypes,'type');
})

</script>
<style lang='scss' scoped>
</style>