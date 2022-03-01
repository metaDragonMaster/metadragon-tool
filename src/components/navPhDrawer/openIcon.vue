<template>
    <div class="open-icon" :class="{ 'active': active }">
        <div class="p1"></div>
        <div class="p2"></div>
        <div class="p3"></div>
    </div>
</template>

<script setup>
import { defineProps, readonly, toRefs } from 'vue'
const props = defineProps({
    active: {
        type: Boolean,
        required: true,

    }
})
const { active } = readonly(toRefs(props));
</script>
<style lang='scss' scoped>
.open-icon {
    width: 20px;
    height: 20px;
    padding: 10px;
    margin: 10px;
    position: relative;
    // background-color: red;
    .p1,
    .p2,
    .p3 {
        width: 100%;
        height: 2px;
        border-radius: 10px;
        position: absolute;
        left: 0;
        background-color: #FFFFFF;
        // transition: all 1s;
    }
    .p1 {
        top: 0;
    }
    .p2 {
        top: calc(50% - 2px);
        // transform: rotateX(90deg);
    }
    .p3 {
        top: calc(100% - 4px);
        // transform: rotateZ(45deg);
    }
}
</style>