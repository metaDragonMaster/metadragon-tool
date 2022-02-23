<template>
  <div id="nav">
    <router-view></router-view>
  </div>
  <router-view/>
</template>
<script setup>
import { onMounted } from "vue";
import { setRem } from "@/utils/rem.js"
onMounted(()=>{
  setRem();
  window.addEventListener('resize',setRem)
})
</script>
<style lang="scss">
</style>
