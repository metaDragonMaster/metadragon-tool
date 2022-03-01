<template>
    <div class="theme-button" :class="className">
        <slot></slot>
    </div>
</template>

<script setup>
import {
    computed,
    defineProps,
} from 'vue'

const props = defineProps({
    type: {
        type: String,
        readonly: true,
        required: false,
        validator: (value) => {
            return ['square', 'circular', 'dotted','blur'].includes(value);
        }
    }
})
const className = computed(() => {
    return !props.type ? '' : `theme-button-${props.type}`
})
</script>
<style lang='scss' scoped>
@import "@/styles/theme/button.scss";
</style>