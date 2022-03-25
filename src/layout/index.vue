<template>
	<div id="layout" class="theme-font-color theme-view-background">
		<headNav :clientWidth="clientWidth" :scrollTop="scrollTop"></headNav>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script setup>
import {
	// onMounted,
	// toRefs
} from "vue"
import headNav from "./modules/headNav/index.vue"
import { UseStoreResize, UseStoreScroll } from "@/stores/window.js"
import _ from "lodash"
import { storeToRefs } from "pinia";
import { onBeforeUnmount } from "vue-demi";
import {
	UseStoreWeb3js,
} from "@/stores/web3js"
const useStoreResize = UseStoreResize();
const useStoreScroll = UseStoreScroll();
const { setClientWidth } = useStoreResize;
const { setScrollTop } = useStoreScroll;
const { clientWidth } = storeToRefs(useStoreResize);
const { scrollTop } = storeToRefs(useStoreScroll);
const setClientWidthFunc = _.throttle(() => {
	console.log("视图宽度");
	setClientWidth()
}, 16, { leading: true })
const setScrollTopFunc = _.throttle(setScrollTop, 16, { leading: true })
window.addEventListener('resize', setClientWidthFunc, true)
window.addEventListener('scroll', setScrollTopFunc, true)
onBeforeUnmount(() => {
	window.removeEventListener('resize', setClientWidthFunc, true)
	window.removeEventListener('scroll', setScrollTopFunc, true)
})

const useStoreWeb3js = UseStoreWeb3js();
const { haveAuth, startWeb3 } = useStoreWeb3js;
if (!haveAuth) {
	console.log('获取web3')
	startWeb3();
}

</script>
<style lang="scss" scoped>
@import "@/styles/theme/headNav.scss";
// @import "@/styles/theme/theme.scss";
@import "@/styles/theme/variable.scss";

#layout {
	min-height: 100vh;
	overflow: hidden;
	.main {
		@media screen and (min-width: 769px) {
			padding-top: $pc-height;
		}
		@media screen and (max-width: 768px) {
			padding-top: $ph-height;
		}
	}
}

.theme-view-background {
	$X_1: 1336px;
	$Y_1: 1289px;
	$X_2: 654px;
	$Y_2: 654px;
	$X_3: 786px;
	$Y_3: 786px;
	$X_4: 1060px;
	$Y_4: 1060px;
	background-color: $back-color;
	background-repeat: no-repeat;
	background-image: url("~@/assets/themeViewBackground/image-1.png"),
		url("~@/assets/themeViewBackground/image-2.png"),
		url("~@/assets/themeViewBackground/image-3.png"),
		url("~@/assets/themeViewBackground/image-4.png");
	background-size: $X_1 $Y_1, $X_2 $Y_2, $X_3 $Y_3, $X_4 $Y_4;
	background-position: 50% calc(($Y_1 - $Y_1 * 2) / 2),
		calc(100% + 200px) 400px, calc(($X_3 - $X_3 * 2 + 100px) / 2) 400px,
		100% 1300px;

	// animation: move infinite 3s ease alternate;
	@keyframes move {
		0% {
			background-position: 50% calc(-1336px / 2), 100% 100%, 0 0,
				100% 100%;
		}
		// 20% {
		// 	background-position:
		// 		50% calc(1000px / 2),
		// 		100% 0,
		// 		0 0,
		// 		100% 100%,
		// 	;
		// }
		100% {
			background-position: 50% 0, 0 100%, 100% 0, 0 100%;
		}
	}
}
</style>
