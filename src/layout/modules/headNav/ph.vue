<template>
    <div class="is-ph">
        <NavPhDrawer ref="navPhDrawer">
            <NavLinks :nav-list="navList" className="link" @linkClick="linkClicked"></NavLinks>
        </NavPhDrawer>
        <NavLogo></NavLogo>
        <ThemeButton type="circular"  @click="toRegister">立即注册</ThemeButton>
    </div>
</template>
<script setup>
import NavPhDrawer from "@/components/navPhDrawer/index.vue";
import NavLogo from "@/components/navLogo/index.vue";
import ThemeButton from "@/components/themeButton/index.vue";
import NavLinks from "@/components/navLinks/index.vue";
import { toPath } from "@/router/util";

import {
    computed,
    defineProps,
    ref,
} from 'vue';

const navPhDrawer = ref(null)
const linkClicked = () => navPhDrawer.value.closeDrawer()
const props = defineProps({
    navList: {
        type: Object,
        readonly: true,
        required: true,
        default: () => { }
    }
})
const navList = computed(() => props.navList);
// console.log(navList);
function toRegister() {
    toPath('/register')
} 
</script>
<style lang="scss" scoped>
@import "@/styles/theme/theme.scss";
@import "@/styles/theme/headNav.scss";
.is-ph {
    // padding: 0 ;
    display: grid;
    grid-template-columns: 80px auto 80px;
    align-items: center;
    height: $ph-height;
    min-width: 100%;
    padding: 0 15px;
    .nav-logo {
        margin: auto;
    }
    .theme-button {
        font-size: 12px;
        padding: 6px 8px;
        zoom: 0.9;
        text-align: center;
    }
    .nav-links {
        display: flex;
        flex-direction: column;
        background-color: $back-color;
        :deep(.link) {
            color: red;
        }
    }
    :deep(.el-drawer)  {
        background-color: $back-color;
        @include GradualBoxShadow;
    }
}
</style>