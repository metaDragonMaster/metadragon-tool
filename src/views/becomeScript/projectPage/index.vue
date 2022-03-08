<template>
	<div class="script-page">
		<div class="select-group flex">
			<ThemeRadioGroup :startActive="currentRadio" :list="radioList" keyAttr="id" @change="changeRadio"></ThemeRadioGroup>
			<ThemeButton class="right" type="square" @click="toPath('/becomeScript/createProject')" >创建项目</ThemeButton>
		</div>
		<ThemeTable :tableData="tableDataDeep">
			<template v-slot:table>
				<el-table-column prop="scriptNo" label="脚本编号" width="120">
					<template v-slot="{ row }">
						<img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
						<span>{{ row.scriptNo }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="ethAddress" label="钱包地址" width="360">
					<template v-slot="{ row }">
						<span>{{ row.ethAddress }}</span>
						<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
					</template>
				</el-table-column>
				<el-table-column prop="implement" label="执行数量" width="108" />
				<el-table-column prop="startData" label="开始时间" width="135" />
				<el-table-column prop="endData" label="结束时间" width="135" />
				<el-table-column prop="status" label="脚本状态" >
					<template v-slot="{ row }">
						<div class="status child-center">
							<span :class="row.status.className">{{ row.status.text }}</span>
							<img class="right" :src="row.status.icon" alt />
						</div>
					</template>
				</el-table-column>
			</template>
			<template v-slot:card="{ item }">
				<div class="item">
					<span>脚本列表</span>
					<img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
					<span>{{ item.scriptNo }}</span>
				</div>
				<div  class="item">
					<span>钱包地址</span>
					<span class="font-hide">{{ item.ethAddress }}</span>
					<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
				</div>
				<div  class="item">
					<span>执行数量</span>
					<span>{{ item.implement }}</span>
				</div>
				<div  class="item">
					<span>开始时间</span>
					<span>{{ item.startData }}</span>
				</div>
				<div  class="item">
					<span>结束时间</span>
					<span>{{ item.endData }}</span>
					<p class="right child-center">
						<span :class="item.status.className">{{ item.status.text }}</span>
						<img class="icon-status" :src="item.status.icon" alt />
					</p>
				</div>
			</template>
		</ThemeTable>
	</div>
</template>

<script setup>
import ThemeTable from "@/components/themeTable"
import ThemeRadioGroup from "@/components/themeRadioGroup"
import ThemeButton from "@/components/themeButton"

import { toPath } from "@/router/util"
import { computed } from "vue";
import { deepClone } from "@/utils/tools";
const radioList = [
	{
		id: '1',
		label: '全部脚本',

	},
	{
		id: '2',
		label: '运行中',
	},
	{
		id: '3',
		label: '审核中',
	},
]
const currentRadio = '1'
const changeRadio = (item) => {
	console.log("changeRadio ---",item);
	// toPath(item.path)
}

const tableData = [
	{
		scriptNo: "1089899781",
		ethAddress: "0x44431dFcf7E5955E31d133aCCcad7Fbf8C6Ef9cc",
		implement: "99",
		startData: "2021-09-07 21:22:22",
		endData: "2021-09-07 21:22:22",
		status: "failed",
	},
	{
		scriptNo: "1089899782",
		ethAddress: "0x44431dFcf7E5955Edas133Ce6cad7Fbf8C6Ef9cc",
		implement: "99",
		startData: "2021-09-07 21:22:22",
		endData: "2021-09-07 21:22:22",
		status: "success",
	},
	{
		scriptNo: "1089899783",
		ethAddress: "0x44431dFcf7E5955E31d133Ce6cad7Fbf8C6Ef9ca",
		implement: "99",
		startData: "2021-09-07 21:22:22",
		endData: "2021-09-07 21:22:22",
		status: "wait",
	},
	{
		scriptNo: "1089899784",
		ethAddress: "0x44431dFcf7E5955E31d133Ce6cadffbf8C6Ef9cc",
		implement: "99",
		startData: "2021-09-07 21:22:22",
		endData: "2021-09-07 21:22:22",
		status: "over",
	},
];
const statusList = {
	failed: {
		className: "status-failed",
		text: "创建失败",
		icon: require("@/assets/icons/icon-failed.png"),
	},
	success: {
		className: "status-success",
		text: "正在运行",
		icon: require("@/assets/icons/icon-success.png"),
	},
	wait: {
		className: "status-wait",
		text: "等待中",
		icon: require("@/assets/icons/icon-wait.png"),
	},
	over: {
		className: "status-over",
		text: "已完成",
		icon: require("@/assets/icons/icon-over.png"),
	},
};
const tableDataDeep = computed(() => {
	const deepList = deepClone(tableData);
	deepList.map((item) => {
		let status = item.status;
		let icon = statusList[status].icon;
		let text = statusList[status].text;
		let className = statusList[status].className;
		item.status = {
			className: className,
			text: text,
			icon: icon,
			status: status,
		};
	});
	return deepList;
});
// console.log(tableDataDeep);
</script>
<style lang='scss' scoped>
// .select-group {
// 	margin-bottom: 20px;
// 	font-size: 12px;
// 	.theme-button {
// 		padding: 8px 15px;
// 	}
// }
.icon-script {
	margin-right: 6px;
	@media screen and (max-width: 768px) {
		width: 12px;
	}
}
.icon-copy {
	margin-left: 10px;
	cursor: pointer;
}
.status {
	width: 66px;
}
</style>
