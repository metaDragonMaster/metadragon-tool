<template>
	<div class="select-game" v-loading="projectDataLoad">
		<div class="pc theme-bg-blur">
			<h3 class="select-module-title">选择游戏</h3>
			<slot name="pcChangeButton"></slot>
			<ul class="select-table-list">
				<li class="game-item" v-for="item in projectData" :key="item.id">
					<ThemeButton :type="activeType(item)" @click="changeProject(item)">
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
				<span class="font-hide">{{ projectData.length > 0 ? projectData[0].name : '' }}</span>
			</div>
			<ThemeButton class="child-center" type="circular">More</ThemeButton>
		</div>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"
import activeGameImage from '@/assets/games/matedragon.png'
import { ArrayKeysToObject } from "@/utils/tools"

import { scriptKeyInterface, projectKeyInterface } from "@/config/interface"
import {
	// defineEmits,
	defineProps,
	onMounted,
	watch,
	// isRef,
	toRefs,
	ref,
	onBeforeUnmount
	// watchEffect,
	// reactive,
} from "vue"
import {
	UseStoreContracts
} from "@/stores/web3js";
import {
	UseStoreProjectScriptData
} from "@/stores/projectScriptData"
import { storeToRefs } from "pinia";
import {
	ElNotification
} from "element-plus"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const props = defineProps({
	stopCreate: {
		type: Boolean,
		readonly: true,
		required: false,
		default: false,
	},
	stopSelectScript: {
		type: Boolean,
		readonly: true,
		required: false,
		default: false,
	}
})
const { stopCreate, stopSelectScript } = toRefs(props);
// const emits = defineEmits(['changeProject'])
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
const storeProjectScriptData = UseStoreProjectScriptData()
const {
	setProjectData,
	setScriptData,
	handlerProjectDataLoading,
	handlerScriptDataLoading,
	removeProjectData,
	removeScriptData,
} = storeProjectScriptData;
onBeforeUnmount(()=> {
	//页面注销前先清除数据
	removeProjectData()
	removeScriptData()
})
// console.log(storeProjectScriptData)
const {
	// scriptData,
	projectData,
	projectDataLoad,
} = storeToRefs(storeProjectScriptData)
// console.log(
// 	scriptData.value,
// 	projectData.value
// );
const currentActiveId = ref('');
const activeType = (item) => {
	if (!item._f) return 'disabled';
	return currentActiveId.value == item.id ? 'square' : 'blur';
}
onMounted(() => {
	startProjectToSelectList()
})
watch(() => projectData.value, (n) => {
	if (n.length > 0) {
		startProjectActive()
	}
})
function projectToObject(project) { //把项目转换成对象
	return ArrayKeysToObject(project, projectKeyInterface)
}
function scriptToObject(script) {
	return ArrayKeysToObject(script, scriptKeyInterface)
}

const startProjectToSelectList = async () => {
	// console.log("stopCreate ---", stopCreate.value)
	if (!stopCreate.value) {
		const data = await getAllProject();
		setProjectData(data)
	}
}
function startProjectActive() {
	if (projectData.value[0]) {
		changeProject(projectData.value[0])
	}
}
// function getCurrentProject(key, keyAttr = 'id') {
// 	return projectData.value.filter(item => item[keyAttr] == key)[0] || {}
// }
async function changeProject(project) {
	if (project._f != true) {
		return;
	}
	removeScriptData();//切换项目时先注销脚本列表
	// console.log('select game changeProject', project);
	currentActiveId.value = project.id;
	// let scriptData;
	if (!stopSelectScript.value) {
		const scriptDataToGet = await getProjectScriptData(project.id);
		setScriptData(scriptDataToGet)
	}
	// const currentProject = getCurrentProject();
	// console.log("currentProject isref?", isRef(currentProject))
	// console.log('select game getProjectScriptData', project);
}
async function getAllProject() {
	try {
		handlerProjectDataLoading(true);
		// console.log('正在获取项目列表');
		const { BNBContract } = Contracts.value;
		// console.log('正在获取项目列表', BNBContract);
		const projects = await BNBContract.methods.get_all_project().call();
		console.log("项目列表", projects);
		handlerProjectDataLoading(false);
		if (projects) {
			const list = projects.map(item => projectToObject(item));
			// console.log(list);
			return list
		}
	} catch (error) {
		console.error(error);
		ElNotification({
			title: t('elMessage.failed'),
			type: 'error',
		})
		handlerProjectDataLoading(false);
	}
}
async function getProjectScriptData(project_id) {
	// console.log('getProjectScriptData project_id:', project_id);
	try {
		handlerScriptDataLoading(true)
		const { BNBContract } = Contracts.value;
		// console.log('正在获取脚本列表', BNBContract);
		const scripts = await BNBContract.methods.get_project_Script_data(project_id).call();
		console.log("项目脚本列表", scripts);
		handlerScriptDataLoading(false)
		if (scripts) {
			const list = scripts.map(item => scriptToObject(item));
			// console.log(list);
			return list
		}
	} catch (error) {
		console.error(error);
		ElNotification({
			title: t('elMessage.failed'),
			type: 'error',
		})
		handlerScriptDataLoading(false)
	}
}
/*
// async function getProjectIndex() {
// 	try {
// 		const { BNBContract } = Contracts.value;
// 		const res = await BNBContract.methods.getProject_index().call();
// 		console.log("项目数量", res);
// 	} catch (error) {
// 		console.error(error);
// 		ElNotification({
// 			title: t('elMessage.failed'),
// 			// message: t('elMessage.register.failed'),
// 			type: 'error',
// 		})
// 	}
// }
*/

</script>
<style lang='scss' scoped>
.select-game {
	.pc {
		// text-align: center;
		display: grid;
		justify-items: center;
		// grid-template-rows: ;
		@media screen and (max-width: 768px) {
			display: none;
		}
		.select-module-title {
			padding-bottom: 25px;
		}
		.select-table-list {
			padding-top: 25px;
		}
		.game-item {
			margin-bottom: 10px;
			min-width: 160px;

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
