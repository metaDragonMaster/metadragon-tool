<template>
	<button class="theme-button" :class="className" :disabled="type=='disabled'">
        <slot></slot>
    </button>
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
            return [
				'square', //方形
				'circular', //两边圆
				'dotted', //虚线
				'blur', //稍稍有颜色
				'disabled', //禁用
			].includes(value);
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
