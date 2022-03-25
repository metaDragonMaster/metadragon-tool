<template>
	<div class="create-project-view view theme-bg-blur child-center-column">
		<h1>创建项目</h1>
		<el-form
			class="form-ref"
			ref="createProjectFormRef"
			:model="formData"
			:rules="rules"
			label-width="120px"
			label-position="top"
		>
			<el-form-item label="项目图标" prop="projectIcon">
				<UploadImage ref="upImage" v-model:Base64="formData.projectIcon"></UploadImage>
				<!-- <el-input v-model="formData.projectIcon"></el-input> -->
			</el-form-item>
			<el-form-item label="项目名称" prop="porjectName">
				<el-input v-model="formData.porjectName"></el-input>
			</el-form-item>
			<el-form-item label="合约地址" prop="contractAddress">
				<el-input v-model="formData.contractAddress"></el-input>
			</el-form-item>
			<el-form-item label="脚本介绍" prop="introduce">
				<el-input
					v-model="formData.introduce"
					type="textarea"
					placeholder="Please input"
					:autosize="{ minRows: 4, maxRows: 8 }"
				></el-input>
			</el-form-item>
		</el-form>
		<ThemeButton class="submit" type="square" @click="submit(createProjectFormRef)">创建项目</ThemeButton>
		<!-- <ThemeButton class="submit" type="square" @click="resetFrom(createProjectFormRef)">重置</ThemeButton> -->
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"
import UploadImage from "@/components/uploadImage"
import { lockLoadHandler, PlusElMessage } from "@/utils/loadElement";
import { toPath } from "@/router/util"
import {
	reactive,
	ref,
	toRaw,
	onUnmounted
} from 'vue';
import { UseStoreContracts, UseStoreWeb3js } from '@/stores/web3js'
import { storeToRefs } from "pinia";
import { getValidCode } from "@/utils/tools"
import { objectToJsonBlob, blobType } from '@/utils/blob'
import { uploadFile, randomName } from "@/config/ipfs"

const storeContracts = UseStoreContracts();
const storeWeb3js = UseStoreWeb3js()
const { Contracts } = storeToRefs(storeContracts);
const { userAddress } = storeToRefs(storeWeb3js)
const createProjectFormRef = ref(null)
const formData = reactive({
	projectIcon: '',//项目图标
	porjectName: '',//项目名称
	contractAddress: '',//合约地址
	introduce: '',//合约介绍
})
const rules = reactive({
	projectIcon: [
		{ required: true, message: 'Please input Activity name', trigger: 'change' }
	],
	porjectName: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' }
	],
	contractAddress: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
	],
	introduce: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' }
	],
})

function resetFrom(fromEl) {
	if (!fromEl) {
		return
	}
	fromEl.resetFields()
	upImage.value.resetData()
}
onUnmounted(() => {
	if (createProjectFormRef.value) {
		resetFrom(createProjectFormRef.value)
	}
})
const upImage = ref(null)
function submit(fromEl) {
	console.log(fromEl)
	// setProjectData()
	fromEl.validate(async (valid, fields) => {
		if (valid) {
			console.log('submit!')
			const loadHandler = lockLoadHandler('正在上传...')
			try {
				const res = await upImage.value.upload()
				// 	console.log(res)
				formData.contractAddress = getValidCode(40);//测试用代码，随机生成40位代替合约
				if (res) {
					// 		formData.projectIcon = res.publicUrl
					const success = await setProjectData()
					if (success) {
						PlusElMessage({
							type: 'success',
							message: 'create success'
						})
						toPath('/becomeScript/projectPage')
					}
				} else {
					console.log('图片上传失败')
				}
				loadHandler.close()
			} catch (e) {
				console.error(e);
				loadHandler.close()
			}
		} else {
			console.log('error submit!', fields)
		}
	})
}
// async function upUrl() {
// 	const filename = randomName(proName,'json');
// 	const res = await uploadFile(blobFile,blobType.json,filename,(e,p)=>{
// 		console.log(e,p)
// 	})
// 	console.log(res)
// }
async function setProjectData() {
	try {
		// console.log('正在获取项目列表');
		const { BNBContract } = Contracts.value;
		// console.log('正在获取项目列表', BNBContract);
		// const {
		// 	contractAddress,
		// 	porjectName,
		// } = formData;
		const rawData = toRaw(formData)
		console.log(rawData)
		const blobFile = objectToJsonBlob(rawData);
		const filename = randomName(rawData.porjectName, 'json');
		const url = await uploadFile(blobFile, blobType.json, filename)
		console.log(url)
		const amount = await BNBContract.methods.get_project_BNB_AmountOut().call()
		const projects = await BNBContract.methods.set_project_data(
			rawData.contractAddress,
			rawData.porjectName,
			amount,
			url,
		).send({
			form: userAddress
		});
		return projects
		// return true;
	} catch (e) {
		console.error(e);
		return false;
	}
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
