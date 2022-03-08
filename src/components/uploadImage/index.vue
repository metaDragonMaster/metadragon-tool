<template>
	<div class="upload-image">
		<div v-show="!showPreview" class="upload-event-traget" @click="selectImageFile">
			<span>点击上传</span>
			<input
				class="file-select"
				ref="fileSelect"
				type="file"
				name="file"
				:accept="accept"
				@change="getFile"
			/>
		</div>
		<div v-show="showPreview" class="upload-preview">
			<el-image class="preview-image" :src="result.dataURL" @click="selectImageFile" />
		</div>
		<div v-show="showPreview">
			<el-button @click="uploadImageToSomewhere">上传图片</el-button>
		</div>
		<el-dialog
			v-model="dialogValue"
			title="裁剪图片"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			center
			:width="dialogWidth"
			draggable
		>
			<!-- <PictureCropper v-model:pic="previewImageBase64" @submit="handlerDialogShow(false)"></PictureCropper> -->
			<template #footer>
				<el-button @click="close">取消</el-button>
				<el-button @click="clear">清除</el-button>
				<el-button @click="reset">重置</el-button>
				<el-button type="primary" @click="getResult">裁切</el-button>
			</template>

			<!-- 图片裁切插件 -->
			<VuePictureCropper
				:img="pic"
				:boxStyle="{
					width: '100%',
					height: '100%',
					margin: 'auto',
				}"
				:options="{
					viewMode: 1,
					dragMode: 'crop',
					// cropBoxResizable: false,//能否拖动裁剪框
					aspectRatio: 9 / 9,
				}"
			/>
		</el-dialog>
	</div>
</template>

<script setup>
// import PictureCropper from "./pictureCropper.vue"
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import {
	ref,
	// unref,
	computed,
	reactive,
	defineEmits,
} from "vue";
import { PlusElMessage } from "@/utils/loadElement"
import { UseStoreResize } from "@/stores/window";
import { storeToRefs } from "pinia";
import { uploadByIpfs } from "@/config/ipfs"
import { fileToBase64, getExtensionWithPoint } from "@/utils/file"
const emits = defineEmits(['update:image'])
const accept = '.jpg,.jpeg,.png';
const acceptList = accept.slice(',')
const storeResize = UseStoreResize();
const { isPc } = storeToRefs(storeResize)
const dialogValue = ref(false);
const dialogWidth = computed(() => isPc ? '600px' : '90%')
const showPreview = computed(() => !!result.dataURL)
const fileSelect = ref(null);
const pic = ref('')
const result = reactive({
	dataURL: '',
	fileData: '',
})
/**
 * 获取裁切结果
 */
const getResult = async () => {
	// console.log(cropper)
	// 获取生成的base64图片地址
	const base64 = cropper.getDataURL()
	const fileData = await cropper.getFile({
		fileName: '测试文件名，可不传',
	})
	console.log({ base64 })
	result.dataURL = base64
	result.fileData = fileData
	dialogValue.value = false
}
/**
 * 清除裁切框
 */
const clear = () => {
	cropper.clear()
}
/**
 * 重置默认的裁切区域
 */
const reset = () => {
	cropper.reset()
}
function close() {
	dialogValue.value = false
}
function selectImageFile() {
	let res = fileSelect.value.dispatchEvent(new MouseEvent('click'))
	console.log("selectImageFile", res)
}
async function getFile(e) {
	console.log("成功", e);
	const eimageFiles = e.target.files[0];
	console.log(eimageFiles);
	const isLt2M = eimageFiles.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		PlusElMessage({
			duration: 0,
			type: 'error',
			message: 'Avatar picture size can not exceed 2MB!'
		})
		clearFiles()
		return;
	}
	const filetype = getExtensionWithPoint(eimageFiles.name)
	const fileTypeValidator = acceptList.includes(filetype);
	if (fileTypeValidator) {
		result.dataURL = ''
		result.fileData = ''
		pic.value = await fileToBase64(eimageFiles)
		handlerDialogShow(true)
	} else {
		PlusElMessage({
			duration: 0,
			type: 'error',
			message: '类型错误'
		})
		clearFiles()
	}
}


function clearFiles() {
	// previewImageBase64.value = '';
	// imageFile.value = '';
	fileSelect.value.value = '';
}
function handlerDialogShow(bool) {
	typeof (bool) == 'boolean' && (dialogValue.value = bool);
}
async function uploadImageToSomewhere() {
	let image_file = result.fileData;
	let res = await uploadByIpfs(image_file)
	console.log("uploadImageToSomewhere----", res)
	emits('update:image', res.publicUrl)
}

</script>
<style lang='scss' scoped>
.upload-image {
	display: inline-block;
}
.file-select {
	display: none;
}
.upload-preview,
.upload-event-traget {
	width: 94px;
	height: 94px;
	display: grid;
	place-items: center;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 6px;
	color: #fff;
	font-size: 12px;
	overflow: hidden;
}
.upload-event-traget {
	cursor: pointer;
}
.upload-preview {
	.preview-image {
		width: 100%;
		height: 100%;
	}
}
</style>
