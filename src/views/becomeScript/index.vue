<template>
	<div class="control-view limit-max-width-media">
		<el-row :gutter="40">
			<el-col :xs="colLeft.xs" :sm="colLeft.sm" :md="colLeft.md" :lg="colLeft.lg" :xl="colLeft.xl">
				<SelectGame :stopCreate="false">
					<!-- <template v-slot:pcChangeButton>
						<ThemeButton
							class="change-page-button"
							type="square"
							v-for="item in filterJumpList"
							:key="item.currentPath"
							@click="toRoute(item)"
						>{{ item.pexvTitle }}</ThemeButton>
					</template>-->
				</SelectGame>
			</el-col>
			<el-col
				:xs="colRight.xs"
				:sm="colRight.sm"
				:md="colRight.md"
				:lg="colRight.lg"
				:xl="colRight.xl"
			>
				<ThemeRadioGroup
					v-show="showRadioGroupCondition"
					:startActive="currentRoute.path"
					:list="JumpList"
					keyAttr="jumpPath"
					labelAttr="pexvTitle"
					@change="toRoute"
				></ThemeRadioGroup>
				<router-view v-slot="{ Component, route }">
					<transition name="el-zoom-in-center" mode="out-in">
						<!-- <keep-alive> -->
							<component :is="Component" :key="route.name"></component>
						<!-- </keep-alive> -->
					</transition>
				</router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
// import BaseEmpty from "@/components/baseEmpty"
import ThemeRadioGroup from "@/components/themeRadioGroup"
// import ThemeButton from "@/components/themeButton"
import SelectGame from "@/components/selectGame"

import { colLeft, colRight } from "@/config/row_col"
// import { provide } from "vue"
import { useRoute } from "vue-router"
import { toPath } from "@/router/util"
import {
	computed,
	//   computed,
	// onMounted,
	ref,
} from "vue"
// const Route = useRoute();
const currentRoute = ref(useRoute())
const JumpList = [
	{
		currentPath: '/becomeScript/scriptPage',
		jumpPath: '/becomeScript/projectPage',
		// pexvTitle: '添加脚本' ,
		pexvTitle: '添加项目',
	},
	{
		currentPath: '/becomeScript/projectPage',
		jumpPath: '/becomeScript/scriptPage',
		// pexvTitle: '添加项目' ,
		pexvTitle: '添加脚本',
	},
]
const showRadioGroupCondition = computed(() => JumpList.filter(item => currentRoute.value.path == item.currentPath).length > 0)
// const filterJumpList = computed(()=> JumpList.filter((item)=> currentRoute.value.path == item.currentPath))
function toRoute(item) {
	toPath(item.jumpPath)
}

</script>

<style  lang="scss" scoped>
@import "@/styles/theme/variable.scss";
:deep(.select-game .theme-bg-blur),
:deep(.view.theme-bg-blur) {
	@media screen and (min-width: 769px) {
		border-radius: $radius-square-big;
		padding: 28px 22px;
	}
	@media screen and (max-width: 768px) {
		border-radius: $radius-square;
		padding: 18px 12px;
	}
}
:deep(.select-group) {
	margin-bottom: 20px;
	font-size: 12px;
	.theme-button {
		padding: 4px 10px;
		// padding: 8px 15px;
	}
}
.change-page-button {
	padding: 8px 30px;
}
.view {
	:deep(.el-form) {
		$--bg-color: rgba(255, 255, 255, 0.2);
		$--color: #ffffff;
		.el-form-item__label {
			color: $--color;
		}
		.el-input {
			width: 100%;
			border-color: $--bg-color;
		}
		.el-input .el-input__inner,
		.el-textarea .el-textarea__inner {
			color: $--color;
			background-color: $--bg-color;
			border-radius: 20px;
			box-shadow: 0 0 0 1px $--bg-color inset;
		}
	}
}
</style>
