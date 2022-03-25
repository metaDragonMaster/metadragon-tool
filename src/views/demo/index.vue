<template>
	<div class="limit-max-width-media">
		<el-button @click="up">上传</el-button>
	</div>
</template>

<script setup>
import { objectToJsonBlob,blobType } from '@/utils/blob'
import { uploadFile,randomName } from "@/config/ipfs"
const json = {
	'test':'哈哈'
}
const blobFile = objectToJsonBlob(json);
const proName = "测试项目";
async function up() {
	const filename = randomName(proName,'json');
	const res = await uploadFile(blobFile,blobType.json,filename,(e,p)=>{
		console.log(e,p)
	})
	console.log(res)
}
</script>
