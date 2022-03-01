<template>
    <div class="module-1-banner">
        <div class="play-game-handle" functional>
            <img class="image" src="@/assets/homepage/Image_game.png" />
            <img class="icon icon-1" src="@/assets/homepage/Icon_1.png" />
            <img class="icon icon-2" src="@/assets/homepage/Icon_2.png" />
            <img class="icon icon-3" src="@/assets/homepage/Icon_3.png" />
            <img class="icon icon-4" src="@/assets/homepage/Icon_4.png" />
        </div>
    </div>
</template>
<style lang='scss' scoped>
.module-1-banner {
    position: absolute;
    top: -88px;
    right: 115px;
    animation: move 1s 1 ease;
    @media screen and (max-width: 1280px) {
        display: none;
    }
    @keyframes move {
        0% {
            top: -2000px;
        }
        55% {
            top: -88px;
        }
        70% {
            top: -200px;
        }
        85% {
            top: -88px;
        }
        95% {
            top: -100px;
        }
        100% {
            top: -88px;
        }
    }
}
.play-game-handle {
    position: relative;

    .icon {
        position: absolute;
    }
    .icon-1 {
        top: 200px;
        left: -36px;
    }
    .icon-2 {
        top: 200px;
        right: -155px;
    }
    .icon-3 {
        bottom: 45px;
        right: -95px;
    }
    .icon-4 {
        bottom: 65px;
        left: -112px;
    }
   
}
</style>