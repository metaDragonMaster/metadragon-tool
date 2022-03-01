<template>
    <div class="select-game">
        <div class="pc theme-bg-blur">
            <h3 class="select-module-title">选择游戏</h3>
            <ul>
                <li>
                    <ThemeButton class="child-center" type="square">
                        <img :src="activeGame.image" alt />
                        <span class="font-hide">{{ activeGame.name }}</span>
                    </ThemeButton>
                </li>
            </ul>
        </div>
        <div class="ph">
            <h3 class="select-module-title">选择游戏</h3>
            <div class="game-name child-center">
                <img :src="activeGame.image" alt />
                <span class="font-hide">{{ activeGame.name }}</span>
            </div>
            <ThemeButton class="child-center" type="circular">More</ThemeButton>
        </div>
    </div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"
import { reactive } from "vue-demi"

const activeGame = reactive({
    name: "Meta Dragon",
    image: require('@/assets/games/matedragon.png')
})
</script>
<style lang='scss' scoped>
.select-game {
    .pc {
        text-align: center;
        @media screen and (max-width: 768px) {
            display: none;
        }
        .select-module-title {
            margin-bottom: 50px;
        }
        .theme-button {
            padding: 4px 16px 4px 4px;
            border-radius: 8px;
            img {
                margin-right: 10px;
            }
        }
    }
    .ph {
        display: grid;
        grid-template-columns: 4.25rem auto 4.25rem;
        align-items: center;
        justify-items: center;
        margin-block: 20px 30px;
        @media screen and (min-width: 769px) {
            display: none;
        }
        .select-module-title {
            font-size: 16px;
        }
        .game-name {
            font-size: 12px;
            font-weight: bold;
            max-width: 180px;
            img {
                margin-right: 10px;
                width: 18px;
                height: 18px;
            }
        }
        .theme-button {
            font-size: 12px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>