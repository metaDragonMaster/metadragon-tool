<template>
    <div class="head-nav">
        <component :is="headComponent" :navList="navList"></component>
    </div>
</template>
<script setup>
import {
    defineProps,
    toRefs,
    computed,
    watchEffect,
} from 'vue';
import { useI18n } from 'vue-i18n';
import PC from "./pc.vue";//电脑
import PH from "./ph.vue";//移动端
const { t } = useI18n();
const props = defineProps({
    clientWidth: {
        type: Number,
        readonly: true,
        required: true,
    },
    // scrollTop: {
    //     type: Number,
    //     readonly: true,
    //     required: true,
    // },
})
const {
    clientWidth,
    // scrollTop
} = toRefs(props);
const headComponent = computed(() => {
    return clientWidth.value > 768 ? PC : PH
});
watchEffect(() => {
    console.log("headNav-页面视图宽度：",clientWidth.value);
    // console.log(scrollTop.value);
})
const navList = computed(() => ({
    homepage: {
        title: t('headNav.homepage'),
        path: '/homepage',
    },
    developer: {
        title: t('headNav.developer'),
        path: '/developer',
    },
    whiteBook: {
        title: t('headNav.whiteBook'),
        path: '/whiteBook',
    },
    control: {
        title: t('headNav.control'),
        path: '/control',
    },
    becomeScript: {
        title: t('headNav.becomeScript'),
        path: '/becomeScript',
    },
}))
// watchEffect(() => {
//     console.log(navList.value);
// })
</script>
<style lang="scss" scoped>
.head-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 500;
}
</style>