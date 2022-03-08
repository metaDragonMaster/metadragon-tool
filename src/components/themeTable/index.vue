<template>
	<div class="theme-table">
		<div class="el-table-bg theme-bg-blur" v-show="!dataIsEmpty">
			<el-table
				:data="tableData"
				size="small"
				:cell-style="{ background: 'transparent' }"
				table-layout="auto"
			>
				<slot name="table" :table="tableData"></slot>
			</el-table>
		</div>
		<ul class="table-card-list theme-bg-blur" v-show="!dataIsEmpty">
			<li class="table-card-item" v-for="item in tableData" :key="item.id">
				<slot name="card" :item="item"></slot>
			</li>
		</ul>
		<BaseEmpty v-show="dataIsEmpty" title="还没有订单~快去创建一个吧"></BaseEmpty>
	</div>
</template>

<script setup>
import {
	computed,
	defineProps, toRefs
} from "vue";
// import { deepClone } from "@/utils/tools";
import BaseEmpty from "@/components/baseEmpty"
const props = defineProps({
	tableData: {
		type: Array,
		readonly: true,
		required: true,
	}
})
const { tableData } = toRefs(props)
// console.log("theme-table---", tableData.value);
const dataIsEmpty = computed(() => {
	// console.log("--dataIsEmpty  tableData--", tableData.value)
	return tableData.value.length < 0
});
// console.log(dataIsEmpty.value);
</script>
<style lang='scss' scoped>
@import "@/styles/theme/variable.scss";
// .theme-table {
// padding: 10px;
// }
:deep() {
	.status-failed {
		color: $failed;
	}
	.status-success {
		color: $success;
	}
	.status-wait {
		color: $wait;
	}
	.status-over {
		color: $over;
	}
}
.table-card-list {
	border-radius: $radius-square-big;
	padding: 4px 20px;
	@media screen and (min-width: 769px) {
		display: none;
	}
	.table-card-item {
		padding: 10px 0;
		font-size: 12px;
		&:not(:last-child) {
			border-bottom: 1px solid #6b607a;
		}
		& > :deep(.item) {
			display: flex;
			align-items: center;
			width: 100%;
			&:not(:last-child) {
				margin-bottom: 10px;
			}
			& > *:first-child {
				// display: inline-block;
				width: 4rem;
				color: #bdbdbd;
			}
			.font-hide {
				max-width: 185px;
			}
			.icon-status {
				margin-left: 10px;
			}
		}
	}
}
.el-table-bg.theme-bg-blur {
	border-radius: 20px;
	padding: 10px;
	@media screen and (max-width: 768px) {
		display: none;
	}
}
:deep(.el-table) {
	// border-radius: 20px;
	background-color: transparent;
	// padding: 10px;
	tr,
	th.el-table__cell {
		background-color: transparent;
		color: $font-color;
	}
}
:deep(.el-table__inner-wrapper) {
	&::before {
		//去掉 列表最下面的白边
		display: none;
	}
	table th {
		//去掉 表头 的下边框
		border-bottom: none !important;
	}
	.el-table__body .el-table__row {
		& > td {
			//所有行的下边框的颜色
			border-color: #6b607a;
		}
		&:last-child > td {
			//去掉最下行的下边框
			border-bottom: none;
		}
	}
}
// .icon-script {
//     margin-right: 6px;
//     @media screen and (max-width: 768px) {
//         width: 12px;
//     }
// }
// .icon-copy {
//     margin-left: 10px;
//     margin-top: -4px;
//     cursor: pointer;
// }
</style>
