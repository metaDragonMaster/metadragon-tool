<template>
	<div class="create-script-view view theme-bg-blur child-center-column">
		<h1>创建脚本</h1>
		<el-form
			class="form-ref"
			ref="createProjectFormRef"
			:model="formData"
			label-width="120px"
			label-position="top"
		>
			<el-form-item label="脚本名字">
				<el-input v-model="formData.scriptName"></el-input>
			</el-form-item>
			<el-form-item label="最大运行数量">
				<el-input v-model="formData.max"></el-input>
			</el-form-item>
			<el-form-item label="合约地址">
				<el-input v-model="formData.contractAddress"></el-input>
			</el-form-item>
			<el-form-item label="脚本介绍">
				<el-input
					v-model="formData.introduce"
					type="textarea"
					placeholder="Please input"
					:autosize="{ minRows: 3, maxRows: 8 }"
				></el-input>
			</el-form-item>
			<el-form-item label="收费类型">
				<el-input v-model="formData.contractAddress"></el-input>
			</el-form-item>
			<el-form-item label="收费币种">
				<el-input v-model="formData.contractAddress"></el-input>
			</el-form-item>
			<el-form-item label="价格">
				<el-input v-model="formData.contractAddress"></el-input>
			</el-form-item>
		</el-form>
		<ThemeButton class="submit" type="square" @click="submit">创建脚本</ThemeButton>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"

import { toPath } from "@/router/util"
import { onActivated, reactive, ref } from 'vue';
const createProjectFormRef = ref(null)
const startFormData = {
	scriptName: '',//脚本名字
	max: '',//最大运行数量
	contractAddress: '',//合约地址
	introduce: '',//脚本介绍
	chargeType: '',//收费类型
	chargeCurrency: '',//收费币种
	price: '',//价格
}
let formData = reactive(startFormData)
onActivated(()=>{
	formData = reactive(startFormData)
})
function submit() {
	toPath('/becomeScript/projectPage')
}
</script>
<style lang='scss' scoped>
.create-script-view {
	.form-ref {
		max-width: 480px;
		width: 100%;
	}
	.submit {
		padding: 8px 30px;
	}
}
</style>
