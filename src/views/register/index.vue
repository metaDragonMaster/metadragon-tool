<template>
    <div class="register-view child-center-column">
        <h3 class="title child-center">
            <img class="icon-logo" src="@/assets/icons/icon-logo.png" alt />
            <span>注册链灵用户</span>
        </h3>
        <ThemeButton type="square" class="child-center">
            <span class="ps">点击支付 100USDT</span>
        </ThemeButton>
        <span class="ps color-grey">您的账户尚未注册 支付成功后解锁控制台功能</span>
    </div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"

</script>
<style lang='scss' scoped>
.register-view {
    padding-top: 100px;
}
.title {
    font-size: 32px;
    .icon-logo {
        margin-right: 10px;
    }
    @media screen and (max-width: 768px) {
        font-size: 16px;
        .icon-logo {
            width: 26px;
        }
    }
}
.ps {
    @media screen and (max-width: 768px) {
        zoom: 0.5;
    }
}
.color-grey {
    color: rgba(255, 255, 255, 0.5);
}
.theme-button {
    margin-block: 40px;
    width: 100%;
    max-width: 270px;
    height: 60px;
    @media screen and (max-width: 768px) {
        width: 100%;
        max-width: 270px;
        height: 30px;
    }
}
</style>