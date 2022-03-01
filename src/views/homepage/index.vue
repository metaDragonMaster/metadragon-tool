<template>
    <div class="homepage-view limit-max-width-media">
        <div class="module-1">
            <div class="banner-text">
                <p class="theme-text">Game Auxiliary</p>
                <h1>链游全能辅助平台</h1>
                <h1>帮助用户省时、省力、赚钱</h1>
                <p>A product dedicated to creating an all-round assistance for chain games</p>
                <p>Help users save time and effort</p>
                <ThemeButton type="circular">立即体验</ThemeButton>
            </div>
            <Banner></Banner>
        </div>
        <div class="module-2">
            <div class="module-title flex">
                <span class="title">Supported Games</span>
                <div class="right">
                    <img src="@/assets/icons/arrow-left.png" alt />
                    <img src="@/assets/icons/arrow-right.png" alt />
                </div>
            </div>
            <ul class="game-list">
                <li v-for="item in module2GameList" :key="item.id">
                    <img class="game-image" :src="item.image" alt />
                    <div class="game-info child-center">
                        <img class="game-handle" src="@/assets/icons/game-handle.png" alt />
                        <span>{{ item.gameName }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="module-3">
            <div class="module-title flex">
                <span class="title">Our Recent Projects</span>
            </div>
            <ul class="grid">
                <li  v-for="item in items" :key="item.key">
                    <img :src="item.image" alt="egjs" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import Banner from "./modules/Banner"
import ThemeButton from "@/components/themeButton"
// import { JustifiedInfiniteGrid } from "@egjs/vue3-infinitegrid";

const module2GameList = [
    {
        id: '1',
        gameName: 'Meta Dragon',
        image: require("@/assets/games/m-2-game-1.png"),
    },
    {
        id: '2',
        gameName: 'Thetan Arena',
        image: require("@/assets/games/m-2-game-2.png"),
    },
    {
        id: '3',
        gameName: 'Thetan Arena',
        image: require("@/assets/games/m-2-game-3.png"),
    },
    {
        id: '4',
        gameName: 'Thetan Arena',
        image: require("@/assets/games/m-2-game-4.png"),
    },
    {
        id: '5',
        gameName: 'Thetan Arena',
        image: require("@/assets/games/m-2-game-5.png"),
    },
]

const items = [
    {
        key: 1,
        image: require("@/assets/games/m-3-game-1.png"),
    },
    {
        key: 2,
        image: require("@/assets/games/m-3-game-2.png"),
    },
    {
        key: 3,
        image: require("@/assets/games/m-3-game-3.png"),
    },
    {
        key: 4,
        image: require("@/assets/games/m-3-game-4.png"),
    },
    {
        key: 5,
        image: require("@/assets/games/m-3-game-5.png"),
    },
    {
        key: 6,
        image: require("@/assets/games/m-3-game-6.png"),
    },
]
</script>
<style lang="scss" scoped>
.homepage-view {
    min-height: 200vh;
    .module-title {
        width: 100%;
        align-items: flex-end;
        .title {
            font-size: 32px;
            font-weight: bold;
            line-height: 58px;
        }
        @media screen and (min-width: 1281px) {
            margin-bottom: 60px;
        }
        @media screen and (min-width: 769px) and (max-width: 1280px) {
            margin-bottom: 40px;
        }
        @media screen and (max-width: 768px) {
            align-items: center;
            margin-bottom: 30px;
            .title {
                font-size: 16px;
                line-height: 30px;
            }
        }
    }
    .module-1 {
        position: relative;
        // height: 100vh;
        padding-top: 80px;
        padding-bottom: 92px;
        margin-bottom: 130px;
        @media screen and (max-width: 1280px) {
            text-align: center;
            margin-bottom: 90px;
        }
        @media screen and (max-width: 768px) {
            padding-top: 40px;
            padding-bottom: 50px;
            font-size: 12px;
            margin-bottom: 0;
        }
        .theme-text {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 40px;
            @media screen and (max-width: 768px) {
                margin-bottom: 10px;
                font-size: 12px;
            }
        }
        .theme-button {
            padding: 14px 55px;
            margin-top: 86px;
            @media screen and (max-width: 768px) {
                margin-top: 32px;
                padding: 10px 30px;
            }
        }
        h1 {
            @media screen and (min-width: 769px) {
                font-size: 50px;
                line-height: 80px;
                & + p {
                    margin-top: 40px;
                }
            }
            @media screen and (max-width: 768px) {
                font-size: 24px;
                line-height: 36px;
                & + p {
                    margin-top: 20px;
                }
            }
        }
        p:not(.theme-text) {
            @media screen and (min-width: 769px) {
                max-width: 480px;
                line-height: 32px;
            }
            @media screen and (max-width: 768px) {
                max-width: 300px;
                line-height: 24px;
            }
            @media screen and (max-width: 1280px) {
                margin-left: auto;
                margin-right: auto;
            }
        }
    }
    .module-2 {
        margin-bottom: 100px;
        @media screen and (max-width: 1280px) {
            margin-bottom: 75px;
        }
        @media screen and (max-width: 768px) {
            margin-bottom: 40px;
        }
        .module-title .right {
            img:not(:last-child) {
                margin-right: 12px;
            }
            @media screen and (max-width: 768px) {
                img {
                    width: 20px;
                    height: 20px;
                }
                img:not(:last-child) {
                    margin-right: 6px;
                }
            }
        }
        .game-list {
            display: grid;
            place-items: center;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            @media screen and (min-width: 1281px) {
                // grid-template-columns: repeat(5, 1fr);
                grid-gap: 50px;
            }
            @media screen and (min-width: 941px) and (max-width: 1280px) {
                // grid-template-columns: repeat(4, 1fr);
                grid-gap: 30px;
            }
            @media screen and (min-width: 769px) and (max-width: 940px) {
                // grid-template-columns: repeat(3, 1fr);
                grid-gap: 30px;
            }
            @media screen and (max-width: 768px) {
                // grid-template-columns: repeat(2, 1fr);
                grid-gap: 20px;
            }
            li {
                .game-image {
                    border-radius: 20px;
                }
                .game-info {
                    @media screen and (min-width: 1281px) {
                        height: 40px;
                        margin-top: 25px;
                        font-size: 20px;
                    }
                    @media screen and (min-width: 768px) and (max-width: 1280px) {
                        height: 20px;
                        margin-top: 15px;
                        font-size: 16px;
                    }
                    @media screen and (max-width: 768px) {
                        height: 20px;
                        margin-top: 10px;
                        font-size: 12px;
                        .game-handle {
                            width: 15px;
                        }
                    }
                    .game-handle {
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    .module-3 {
        padding-bottom: 150px;
        .grid {
            display: flex;
            flex-flow: row wrap;
            li {
                margin: 10px;
            }
        }
    }
}
</style>