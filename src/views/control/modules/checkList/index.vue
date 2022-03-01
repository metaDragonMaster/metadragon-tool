<template>
    <p class="label">{{ _label }}</p>
    <ul class="grid">
        <li v-for="(item, index) in filterList" :key="item[keyAttr] || index">
            <slot name="item" :item="item"></slot>
        </li>
        <div class="is-open theme-bg-blur child-center" @click="openList" v-show="showOpen">
            <span>{{ opened }}</span>
            <img :class="openedImageClass" src="@/assets/icons/arrow-down.png" alt />
        </div>
    </ul>
</template>

<script setup>
import { computed, defineProps, ref, toRefs, } from "vue"
const props = defineProps({
    label: {
        type: String,
        required: true,
        readonly: true,
    },
    list: {
        type: Array,
        required: true,
        readonly: true,
    },
    keyAttr: {
        type: String,
        required: false,
        readonly: true,
    },
    filterMax: {
        type: Number,
        default: 8
    },
})
// const _list = ref(props.list);
const { list } = toRefs(props)
const isOpen = ref(false);
const opened = computed(() => !isOpen.value ? '展开' : '收回');
const showOpen = computed(() => list.value.length > props.filterMax);
const openedImageClass = computed(() => `icon ${isOpen.value ? 'icon-open' : ''}`);
const filterList = computed(() => !isOpen.value && props.filterMax > 0 ? list.value.filter((item, index) => index < props.filterMax) : list.value)
const _label = computed(() => props.label ? `${props.label}:` : '');
const openList = () => {
    isOpen.value = !isOpen.value
}
</script>

<style lang='scss' scoped>
.grid {
    display: grid;
    @media screen and (min-width: 769px) {
        grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
        grid-gap: 16px;
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr));
        grid-gap: 6px 12px;
        font-size: 12px;
    }
}
.label {
    @media screen and (min-width: 769px) {
        line-height: 40px;
    }
    @media screen and (max-width: 768px) {
        line-height: 20px;
        font-size: 12px;
    }
}
.is-open {
    border-radius: 6px;
    cursor: pointer;
    @media screen and (min-width: 769px) {
        padding: 8px 15px;
    }
    @media screen and (max-width: 768px) {
        padding: 4px;
        font-size: 12px;
        .icon {
            width: 8px;
        }
    }
    .icon {
        transition: transform 0.3s;
        margin-left: 6px;
    }
    .icon-open {
        transform: rotateZ(180deg);
    }
}
</style>