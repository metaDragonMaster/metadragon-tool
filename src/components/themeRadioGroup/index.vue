<template>
    <div class="theme-radio-group">
        <ul class="select-list">
            <li
                @click="checked(item)"
                v-for="(item, index) in list"
                :key="item[keyAttr] || index"
                :ref="el => el && RefList.push(el)"
                :class="{ 'active': activeIndex == index }"
            >{{ item.label }}</li>
            <div class="after theme-type" ref="RefAfter"></div>
        </ul>
    </div>
</template>

<script setup>

import {
    computed,
    defineEmits,
    defineProps,
    onMounted,
    readonly,
    ref,
    // toRef,
    watch,
} from "vue"
import { UseStoreResize } from "@/stores/window"
import { storeToRefs } from "pinia";
const props = defineProps({
    list: {
        type: Array,
        required: true,
        // default: ()=>[],
    },
    keyAttr: {
        type: String,
        required: true,
    },
    // active: {
    //     type: [Number, String],
    //     required: true,
    // },
    startActive: {
        type: [Number, String],
        required: true,
    },
})
// const emits = defineEmits(['update:active']);
const emits = defineEmits(['change']);
// const { active } = toRefs(props);
const active = ref(props.startActive);

const { list, keyAttr } = readonly(props);
const RefAfter = ref(null);
const RefList = ref([]);
const useStoreResize = UseStoreResize();
const { clientWidth } = storeToRefs(useStoreResize);
const activeIndex = computed(() => {
    let i;
    list.forEach((item, index) => {
        if (active.value == item[keyAttr]) i = index;
    });
    return i
})
const checked = (item) => {
    // emits('update:active', item[keyAttr])
    active.value = item[keyAttr]
    emits('change', item[keyAttr])
}
watch(() => [active.value, clientWidth.value], () => {
    startAfter()
})
onMounted(() => {
    startAfter()
})
const startAfter = () => {
    const activeDom = RefList.value[activeIndex.value];
    const clientWidth = activeDom.clientWidth;
    const clientHeight = activeDom.clientHeight;
    const offsetWidth = activeDom.offsetLeft
    RefAfter.value.style.width = `${clientWidth}px`;
    RefAfter.value.style.height = `${clientHeight}px`;
    RefAfter.value.style.left = `${offsetWidth}px`;
}
</script>
<style lang='scss' scoped>
.theme-radio-group {
    display: inline-block;
    border-radius: 10rem;
    overflow: hidden;
    background-color: #eaeaea;
}
.select-list {
    display: flex;
    position: relative;
    z-index: 0;
    li {
        border-radius: 10rem;
        // line-height: 30px;
        padding: 8px 25px;
        cursor: pointer;
        transition: color 0.3s;
        @media screen and (max-width: 768px) {
            padding: 4px 15px;
        }
        &:not(.active) {
            color: #7a7a7a;
        }
    }
    .after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: 10rem;
        transition: left 0.3s, width 0.3s;
    }
}
</style>