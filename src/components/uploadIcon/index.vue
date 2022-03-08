
<template>
	<div>
		<img style="width: 100px" :src="dialogImageUrl" alt />
	</div>
	<el-upload
		action
		ref="uploadDom"
		list-type="picture-card"
		:limit="props.limit"
		:auto-upload="false"
		:multiple="false"
		:file-list="fileList"
		accept=".jpg, .jpeg, .png"
		:on-change="onChange"
		:on-exceed="onExceed"
	>
		<template #default>
			<el-icon>
				<ElIconPlus />
			</el-icon>
		</template>
		<template #file="{ file }">
			<div>
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt />
				<span class="el-upload-list__item-actions">
					<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
						<el-icon>
							<ElIconZoomIn />
						</el-icon>
					</span>
					<span class="el-upload-list__item-delete" @click="handleDownload(file)">
						<el-icon>
							<ElIconDownload />
						</el-icon>
					</span>
					<span class="el-upload-list__item-delete" @click="handleRemove(file)">
						<el-icon>
							<ElIconDelete />
						</el-icon>
					</span>
				</span>
			</div>
		</template>
	</el-upload>
</template>

<script setup>
/*

*/
import {
	// computed,
	defineProps,
	// reactive,
	ref,
} from 'vue'
import {
	Plus as ElIconPlus,
	ZoomIn as ElIconZoomIn,
	Download as ElIconDownload,
	Delete as ElIconDelete,
} from '@element-plus/icons-vue'
// import { uploadByIpfs } from "@/config/ipfs"
// import { ElMessage } from "element-plus"
import { PlusElMessage } from "@/utils/loadElement"
import { saveAs } from 'file-saver';
import { downloadName } from "@/utils/file.js"
// import { downloadFile } from '@/utils/tools'

const props = defineProps({
	maxSize: {
		//单个文件大小
		type: Number,
		default: 2
	},
	limit: {
		//上传文件数量限制
		type: Number,
		default: 1,
		validator(value) {
			//必须大于0
			return value > 0;
		}
	},
})
//获取当前上传组件dom实例
const uploadDom = ref(null);
//绑定图片列表
const fileList = ref([]);
const dialogImageUrl = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg');

//查看图片
function handlePictureCardPreview(file) {
	console.log(file)
	dialogImageUrl.value = file.url
}
// 下载图片
function handleDownload(file) {
	console.log(file)
	// downloadFile(file.raw)
	const fileName = downloadName(file)
	saveAs(file.raw, fileName);
}
// 删除文件
function handleRemove(file) {
	console.log("handleRemove", file)
	fileList.value = fileList.value.filter(fileItem => file != fileItem);
	return fileList.value
}
// 文件列表发生改变
function onChange(file, fileList) {
	const isJPG = file.raw.type === 'image/jpeg'
	const isLt2M = file.size / 1024 / 1024 < props.maxSize;
	console.log(`beforeAvatarUpload isJPG:${isJPG}, isLt2M:${isLt2M}`, file, fileList)
	if (!isJPG) {
		PlusElMessage({
			type: 'error',
			duration: 0,
			message: 'Avatar picture must be JPG format!'
		})
	}
	if (!isLt2M) {
		PlusElMessage({
			offset: '80',
			duration: 0,
			type: 'error',
			message: 'Avatar picture size can not exceed 2MB!'
		})
	}
	return isJPG && isLt2M
}
// 检测文件大小
function onExceed(file, files) {
	// console.log(file, files)
	if (props.limit == 1) {
		console.log("onExceed props.limit == 1",file, files[0])
		// uploadDom.value.clearFiles()
		// uploadDom.value.handleStart(files[0])
	} else {
		PlusElMessage({
			duration: 0,
			type: 'error',
			message: `文件超出个数限制，最多 ${props.limit} 个`
		})
		const filterFiles = files.filter(item=> item!=file);
		// uploadDom.value.clearFiles()
		uploadDom.value.handleStart(filterFiles)
	}
}
// 是否自动触发上传
// const autoUpload = computed(() => props.limit == 1 && fileList.length > 0);
// function uploadImg() {
// 	uploadByIpfs()
// }

</script>
<style lang='scss' scoped>
</style>
