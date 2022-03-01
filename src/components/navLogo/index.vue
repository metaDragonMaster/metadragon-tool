<template>
    <div class="nav-logo">
        <img class="nav-logo-image" src="@/assets/headNav/Image_logo.png" alt="">
    </div>
</template>
<style lang='scss' scoped>
.nav-logo {
    @media screen and (min-width: 768px) {
        max-width: 150px;
    }
    @media screen and (max-width: 769px) {
        max-width: 75px;
    }
    .nav-logo-image {
        width: 100%;
    }
}
</style>