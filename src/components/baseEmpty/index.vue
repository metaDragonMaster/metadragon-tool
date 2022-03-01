<template>
    <div class="base-empty child-center-column">
        <img :src="emptyType.image" alt />
        <p>{{props.title}}</p>
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
    },
    {
        type: 'develop',
        image: require("@/assets/icons/icon-developing.png")
    },
]

const emptyType = computed(()=>{
    return getItemByKey(props.type,emptyTypes,'type');
})

</script>
<style lang='scss' scoped>
</style>