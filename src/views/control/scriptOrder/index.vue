<template>
	<div class="script-order-view">
		<!-- <ThemeTable :tableData="tableDataDeep" v-loading="scriptDataLoad">
			<template v-slot:table>
				<el-table-column prop="scriptNo" label="脚本编号" width="120">
					<template v-slot="{ row }">
						<img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
						<span>{{ row.scriptNo }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="ethAddress" label="钱包地址" min-width="360">
					<template v-slot="{ row }">
						<span>{{ row.ethAddress }}</span>
						<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
					</template>
				</el-table-column>
				<el-table-column prop="implement" label="执行数量" width="108" />
				<el-table-column prop="startData" label="开始时间" width="135" />
				<el-table-column prop="endData" label="结束时间" width="135" />
				<el-table-column prop="status" label="脚本状态" width="86">
					<template v-slot="{ row }">
						<div class="child-center">
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
				<div class="item">
					<span>钱包地址</span>
					<span class="font-hide">{{ item.ethAddress }}</span>
					<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
				</div>
				<div class="item">
					<span>执行数量</span>
					<span>{{ item.implement }}</span>
				</div>
				<div class="item">
					<span>开始时间</span>
					<span>{{ item.startData }}</span>
				</div>
				<div class="item">
					<span>结束时间</span>
					<span>{{ item.endData }}</span>
					<p class="right child-center">
						<span :class="item.status.className">{{ item.status.text }}</span>
						<img class="icon-status" :src="item.status.icon" alt />
					</p>
				</div>
			</template>
		</ThemeTable>-->
		<ThemeTable :tableData="dataDeep" v-loading="scriptDataLoad">
			<template v-slot:table>
				<el-table-column prop="id" label="脚本编号">
					<template v-slot="{ row }">
						<img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
						<span>{{ row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="owner" label="钱包地址">
					<template v-slot="{ row }">
						<span>{{ row.owner }}</span>
						<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
					</template>
				</el-table-column>
				<el-table-column prop="_max" label="执行数量" />
				<!-- <el-table-column prop="startData" label="开始时间" width="135" /> -->
				<!-- <el-table-column prop="endData" label="结束时间" width="135" /> -->
				<el-table-column prop="_type" label="脚本状态">
					<template v-slot="{ row }">
						<div class="child-center">
							<span :class="row.scriptStatus.className">{{ row.scriptStatus.text }}</span>
							<img class="right" :src="row.scriptStatus.icon" alt />
						</div>
					</template>
				</el-table-column>
			</template>
			<template v-slot:card="{ item }">
				<div class="item">
					<span>脚本</span>
					<img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
					<span>{{ item.id }}</span>
				</div>
				<div class="item">
					<span>钱包地址</span>
					<span class="font-hide">{{ item.owner }}</span>
					<img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
				</div>
				<div class="item">
					<span>执行数量</span>
					<span>{{ item._max }}</span>
				</div>
				<!-- <div class="item">
					<span>开始时间</span>
					<span>{{ item.startData }}</span>
				</div>
				<div class="item">
					<span>结束时间</span>
					<span>{{ item.endData }}</span>
					<p class="right child-center">
						<span :class="item.status.className">{{ item.status.text }}</span>
						<img class="icon-status" :src="item.status.icon" alt />
					</p>
				</div>-->
				<div class="item">
					<span>状态</span>
					<span :class="item.scriptStatus.className">{{ item.scriptStatus.text }}</span>
					<img class="icon-status" :src="item.scriptStatus.icon" alt />
				</div>
			</template>
		</ThemeTable>
	</div>
</template>

<script setup>
import ThemeTable from "@/components/themeTable"
import { computed } from "vue";
import { deepClone } from "@/utils/tools";

import { storeToRefs } from "pinia";
import {
	UseStoreProjectScriptData
} from "@/stores/projectScriptData"

const storeProjectScriptData = UseStoreProjectScriptData()
const {
	scriptData,
	scriptDataLoad,
} = storeToRefs(storeProjectScriptData);
console.log(scriptData.value);

// const tableData = [
// 	{
// 		scriptNo: "1089899781",
// 		ethAddress: "0x44431dFcf7E5955E31d133aCCcad7Fbf8C6Ef9cc",
// 		implement: "99",
// 		startData: "2021-09-07 21:22:22",
// 		endData: "2021-09-07 21:22:22",
// 		status: "failed",
// 	},
// 	{
// 		scriptNo: "1089899782",
// 		ethAddress: "0x44431dFcf7E5955Edas133Ce6cad7Fbf8C6Ef9cc",
// 		implement: "99",
// 		startData: "2021-09-07 21:22:22",
// 		endData: "2021-09-07 21:22:22",
// 		status: "success",
// 	},
// 	{
// 		scriptNo: "1089899783",
// 		ethAddress: "0x44431dFcf7E5955E31d133Ce6cad7Fbf8C6Ef9ca",
// 		implement: "99",
// 		startData: "2021-09-07 21:22:22",
// 		endData: "2021-09-07 21:22:22",
// 		status: "wait",
// 	},
// 	{
// 		scriptNo: "1089899784",
// 		ethAddress: "0x44431dFcf7E5955E31d133Ce6cadffbf8C6Ef9cc",
// 		implement: "99",
// 		startData: "2021-09-07 21:22:22",
// 		endData: "2021-09-07 21:22:22",
// 		status: "over",
// 	},
// ];

// const statusList = {
// 	failed: {
// 		className: "status-failed",
// 		text: "创建失败",
// 		icon: require("@/assets/icons/icon-failed.png"),
// 	},
// 	success: {
// 		className: "status-success",
// 		text: "正在运行",
// 		icon: require("@/assets/icons/icon-success.png"),
// 	},
// 	wait: {
// 		className: "status-wait",
// 		text: "等待中",
// 		icon: require("@/assets/icons/icon-wait.png"),
// 	},
// 	over: {
// 		className: "status-over",
// 		text: "已完成",
// 		icon: require("@/assets/icons/icon-over.png"),
// 	},
// };
const dataStatusList = {
	'0': {
		className: "status-failed",
		text: "创建失败",
		icon: require("@/assets/icons/icon-failed.png"),
	},
	'1': {
		className: "status-success",
		text: "正在运行",
		icon: require("@/assets/icons/icon-success.png"),
	},
	'2': {
		className: "status-wait",
		text: "等待中",
		icon: require("@/assets/icons/icon-wait.png"),
	},
	'3': {
		className: "status-over",
		text: "已完成",
		icon: require("@/assets/icons/icon-over.png"),
	},
};

/*
	id: "0"
	isChecked: false
	owner: "0xc058FD311a22a369EF6fE178f7233c30B812f8A9"
	url: "45212"
	_f: true
	_max: "1212"
	_project_id: "0"
	_script_amount: "12810084696136"
	_type: "1"
*/
const dataDeep = computed(() => {
	const deepList = deepClone(scriptData.value);
	deepList.map((item) => {
		let status = item._type;
		let icon = dataStatusList[status].icon;
		let text = dataStatusList[status].text;
		let className = dataStatusList[status].className;
		item.scriptStatus = {
			className: className,
			text: text,
			icon: icon,
			status: status,
		};
	});
	return deepList;
});
console.log(dataDeep.value)
// const tableDataDeep = computed(() => {
// 	const deepList = deepClone(tableData);
// 	deepList.map((item) => {
// 		let status = item.status;
// 		let icon = statusList[status].icon;
// 		let text = statusList[status].text;
// 		let className = statusList[status].className;
// 		item.status = {
// 			className: className,
// 			text: text,
// 			icon: icon,
// 			status: status,
// 		};
// 	});
// 	return deepList;
// });
</script>
<style lang='scss' scoped>
@import "@/styles/theme/variable.scss";
.script-order-view {
	padding-bottom: 100px;
}
.icon-script {
	margin-right: 6px;
	@media screen and (max-width: 768px) {
		width: 12px;
	}
}
.icon-copy {
	margin-left: 10px;
	margin-top: -4px;
	cursor: pointer;
}
</style>
