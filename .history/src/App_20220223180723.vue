<template>
  <div id="nav">
    <router-view></router-view>
  </div>
  <router-view/>
</template>
<script setup>
import { onMounted } from "vue";
import { setRem } from "@/utils/rem.js";
import { throttle } from "lodash";
const throSetRem = throttle(() => setRem())
onMounted(()=>{
  setRem();
  window.addEventListener('resize',throSetRem)
})
// onUnmounted(()=>)
</script>
<style lang="scss">
</style>
