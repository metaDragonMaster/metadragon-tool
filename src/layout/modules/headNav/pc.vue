<template>
    <div class="is-pc">
        <NavLogo></NavLogo>
        <NavLinks :nav-list="navList" :className="'link pseudo-block-class'"></NavLinks>
        <ThemeButton class="right" type="circular" @click="toRegister">链接钱包</ThemeButton>
    </div>
</template>
<script setup>
import NavLinks from "@/components/navLinks/index.vue";
import NavLogo from "@/components/navLogo/index.vue";
import ThemeButton from "@/components/themeButton/index.vue"
import { toPath } from "@/router/util";
import {
    computed,
    defineProps,
} from 'vue';
const props = defineProps({
    navList: {
        type: Object,
        readonly: true,
        required: true,
        default: () => { }
    }
})
const navList = computed(() => props.navList);
function toRegister() {
    toPath('/register')
} 
</script>
<style lang="scss" scoped>
@import "@/styles/theme/theme.scss";
@import "@/styles/theme/headNav.scss";
// @import "@/styles/theme/variable.scss";
.is-pc {
    display: flex;
    align-items: center;
    height: $pc-height;
    @media screen and (min-width: 1500px) {
        padding: 0 calc((100% - 1440px) / 2);
    }
    @media screen and (max-width: 1499px) and (min-width: 769px) {
        padding: 0 30px;
    }
    .theme-button {
        padding: 12px 40px;
        @media screen and (max-width: 1020px) and (min-width: 769px) {
            padding: 8px 20px;
        }
    }
    .nav-links {
        margin-left: 200px;
        padding-bottom: 10px;
        transition: margin-left 0.3s;
        @media screen and (max-width: 1440px) and (min-width: 769px) {
            margin-left: 30px;
        }
        :deep(.link) {
            padding: 20px 25px;
            transition: padding 0.3s;
            @media screen and (max-width: 1020px) and (min-width: 769px) {
                padding: 20px 10px;
            }
        }
        :deep(.router-link-active) {
            &::before,
            &::after {
                @include GradualBGColor;
                transition: all 0.3s;
                bottom: 0;
                height: 4px;
                border-radius: $radius-square;
            }
            &::before {
                left: calc((50% - 8px) / 2);
                width: calc(50% - 4px);
            }
            &::after {
                // left: calc((50% - 8px) / 2 + 50%);
                left: calc(75% - 4px);
                width: 4px;
            }
        }
    }
}
</style>