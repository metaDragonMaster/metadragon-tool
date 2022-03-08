<template>
	<div class="select-game">
		<div class="pc theme-bg-blur">
			<h3 class="select-module-title">选择游戏</h3>
			<ul>
				<li class="game-item" v-for="item in projects" :key="item.id" @click="changeProject(item)">
					<ThemeButton :type="activeType(item)">
						<img :src="activeGameImage" alt />
						<span class="font-hide">{{ item.name }}</span>
					</ThemeButton>
				</li>
			</ul>
		</div>
		<div class="ph">
			<h3 class="select-module-title">选择游戏</h3>
			<div class="game-name child-center">
				<img :src="activeGameImage" alt />
				<span class="font-hide">{{ projects.length > 0 ? projects[0].name : '' }}</span>
			</div>
			<ThemeButton class="child-center" type="circular">More</ThemeButton>
		</div>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"
import activeGameImage from '@/assets/games/matedragon.png'

import { defineProps,defineEmits, ref, toRefs, onMounted, watch } from "vue"
const props = defineProps({
	projects: {
		type: Array,
		required: true,
		readonly: true,
		default: () => []
	}
})
const emits = defineEmits(['changeProject']);
// const { projects } = toRef(props.projects)
const { projects } = toRefs(props)
const activeItemId = ref('');
onMounted(()=> {
	startProjectActive()
})
watch(()=> projects.value,()=>{
	startProjectActive()
})
function startProjectActive() {
	if(projects.value[0]) {
		changeProject(projects.value[0])
	}
}
const activeType = (item) =>{
	if(!item._f) return 'disabled';
	return activeItemId.value == item.id? 'square':'blur';
}
function changeProject(item) {
	// console.log("changeProject",item);
	activeItemId.value = item.id;
	emits('changeProject',item);
}
// console.log("projects-----select-game", props.projects)
// console.log("projects-----select-game", projects.value)

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
		.game-item {
			margin-bottom: 10px;

			.theme-button {
				padding: 4px 16px 4px 4px;
				border-radius: 8px;
				width: 100%;
				display: grid;
				grid-template-columns: 28px 1fr;
				align-items: center;
				img {
					margin-right: 10px;
					width: 28px;
					height: 28px;
				}
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
