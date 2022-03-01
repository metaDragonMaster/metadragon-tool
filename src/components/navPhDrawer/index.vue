<template>
    <OpenIcon :active="active" @click="openDrawer"></OpenIcon>
    <el-drawer v-model="active" direction="ltr" size="80%" :with-header="false">
        <slot></slot>
    </el-drawer>
</template>

<script setup>
import { 
    ref, 
    defineExpose, 
} from "vue";
import OpenIcon from "./openIcon.vue";
const active = ref(false);
function openDrawer() {
    console.log("openDrawer");
    active.value = true;
}

function closeDrawer() {
    active.value = false;
}
defineExpose({
    closeDrawer
})
</script>