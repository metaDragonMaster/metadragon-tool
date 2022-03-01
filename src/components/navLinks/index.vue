<template>
    <nav class="nav-links">
        <router-link
            :class="className"
            v-for="(item, index) in navList"
            :to="item.path"
            :key="index"
            @click="emits('linkClick')"
        >{{ item.title }}</router-link>
        <!-- <div class="active-link">123</div> -->
        <!-- <NavLinks :nav-list="navList" className="link pseudo-block-class-before"></NavLinks> -->
    </nav>
</template>
<script setup>
import {
    computed,
    defineProps,
    defineEmits,
} from 'vue';
const emits = defineEmits(['linkClick'])
const props = defineProps({
    navList: {
        type: Object,
        readonly: true,
        required: true,
        default: () => { }
    },
    className:{
        type: [String,Object],
        readonly: true,
        required: false,
        default: () => { }
    }
})
const navList = computed(() => props.navList);
</script>
<style lang="scss" scoped>
// .nav-links {
//     position
// }
// .active-link {

// }
</style>