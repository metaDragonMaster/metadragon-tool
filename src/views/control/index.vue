<template>
	<div class="control-view limit-max-width-media">
		<el-row :gutter="40">
			<el-col :xs="colLeft.xs" :sm="colLeft.sm" :md="colLeft.md" :lg="colLeft.lg" :xl="colLeft.xl">
				<SelectGame @changeProject="changeProject"></SelectGame>
			</el-col>
			<el-col
				:xs="colRight.xs"
				:sm="colRight.sm"
				:md="colRight.md"
				:lg="colRight.lg"
				:xl="colRight.xl"
			>
				<!-- <ThemeRadioGroup v-model:active="active" :list="list" keyAttr="id"></ThemeRadioGroup> -->
				<ThemeRadioGroup :startActive="startListActive" :list="routerList" keyAttr="id" @change="listToPath"></ThemeRadioGroup>
				<router-view v-slot="{ Component, route }">
					<transition name="el-zoom-in-center" mode="out-in">
						<keep-alive>
							<component :is="Component" :key="route.name"></component>
						</keep-alive>
					</transition>
				</router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import ThemeRadioGroup from "@/components/themeRadioGroup"
// import SelectGame from "@/components/selectGame"
import SelectGame from "@/components/selectGame/index.vue"

import { colLeft, colRight } from "@/config/row_col"
import { toPath } from "@/router/util"
import { getItemByKey } from "@/utils/tools"
import { useRoute } from "vue-router"
import { ref } from "vue-demi"
const $route = useRoute();
const routerList = [
	{
		id: '1',
		label: '创建脚本',
		path: '/control/createScript'

	},
	{
		id: '2',
		label: '脚本订单',
		path: '/control/scriptOrder'
	},
]
const startListActive = getItemByKey($route.path, routerList, 'path').id || routerList[0].id;
const listToPath = (item) => {
	// const item = getItemByKey(value, routerList, 'id');
	// console.log(item);
	toPath(item.path)
}
const scriptList = ref([])
function changeProject(data) {
	console.log("changeProject---control",data)
	scriptList.value = data.scriptData
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme/variable.scss";
:deep(.select-game .theme-bg-blur),
:deep(.create-script-view > .theme-bg-blur) {
	@media screen and (min-width: 769px) {
		border-radius: $radius-square-big;
		padding: 28px 22px;
	}
	@media screen and (max-width: 768px) {
		border-radius: $radius-square;
		padding: 18px 12px;
	}
}
.control-view {
	.theme-radio-group {
		@media screen and (min-width: 769px) {
			margin-bottom: 40px;
		}
		@media screen and (max-width: 768px) {
			margin-bottom: 20px;
		}
	}
}
</style>
