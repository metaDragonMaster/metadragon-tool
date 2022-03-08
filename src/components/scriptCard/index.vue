<template>
    <ul class="script-card-list theme-bg-blur">
        <li class="script-card-item" v-for="item in props.list" :key="item[keyAttr] || index">
            <slot name="item" :item="item"></slot>
        </li>
    </ul>
</template>

<script setup>
import { 
    defineProps ,
} from "vue"

const props = defineProps({
    list:{
        type:Array,
        required: true,
        readonly: true,
    },
    keyAttr:{
        type:String,
        required: false,
        readonly: true,
        default: 'id'
    }
})
</script>
<style lang='scss' scoped>
@import "@/styles/theme/variable.scss";
.script-card-list {
    border-radius: $radius-square-big;
    padding: 0 20px;
    .script-card-item {
        padding: 10px 0;
        &:not(:last-child) {
            border-bottom: 1px solid #6B607A;
        }
    }
}

</style>