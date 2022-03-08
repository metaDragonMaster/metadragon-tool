<template>
	<div class="create-project-view view theme-bg-blur child-center-column">
		<h1>创建项目</h1>
		<UploadIcon></UploadIcon>
		<el-form
			class="form-ref"
			ref="createProjectFormRef"
			:model="formData"
			label-width="120px"
			label-position="top"
		>
			<el-form-item label="项目图标">
				<el-input v-model="formData.projectIcon"></el-input>
			</el-form-item>
			<el-form-item label="项目名称">
				<el-input v-model="formData.porjectName"></el-input>
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
		</el-form>
		<ThemeButton class="submit" type="square" @click="submit">创建项目</ThemeButton>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"
import UploadIcon from "@/components/uploadIcon"

import { toPath } from "@/router/util"
import { reactive, ref } from 'vue';
const createProjectFormRef = ref(null)
const formData = reactive({
	projectIcon: '',//项目图标
	porjectName: '',//项目名称
	contractAddress: '',//合约地址
	introduce: '',//合约介绍
})
function submit() {
	toPath('/becomeScript/projectPage')
}
</script>
<style lang='scss' scoped>
.create-project-view {
	.form-ref {
		max-width: 480px;
		width: 100%;
	}
	.submit {
		padding: 8px 30px;
	}
}
</style>
