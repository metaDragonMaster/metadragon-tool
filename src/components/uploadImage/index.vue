<template>
	<div class="upload-image">
		<transition-group name="el-zoom-in-center" mode="out-in">
			<div v-show="!showPreview" key="up" class="upload-event-traget" @click="selectImageFile">
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
			<div v-show="showPreview" key="img" class="upload-preview">
				<el-image class="preview-image" :src="result.dataURL" @click="selectImageFile" />
			</div>
		</transition-group>
		<!-- <div v-show="showPreview">
			<el-button @click="uploadImageToSomewhere">上传图片</el-button>
		</div>-->
		<el-dialog
			v-model="dialogHandler"
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
				<el-button @click="cropper.clear()">清除</el-button>
				<el-button @click="cropper.reset()">重置</el-button>
				<el-button type="primary" @click="getResult">裁切</el-button>
			</template>
			<p>dialogWidth{{ dialogWidth }}</p>
			<!-- 图片裁切插件 -->
			<VuePictureCropper
				:img="image"
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
	computed,
	reactive,
	defineProps,
	defineEmits,
	defineExpose,
	// toRefs,
} from "vue";
import { PlusElMessage } from "@/utils/loadElement"
import { UseStoreResize } from "@/stores/window";
import { storeToRefs } from "pinia";
import { uploadImageByIpfs } from "@/config/ipfs"
import {
	fileToBase64, getExtensionWithPoint,
	downloadName, getFileName
} from "@/utils/file"
const props = defineProps({
	Base64: {
		type: String
	}
})
// const { Base64 } = toRefs(props);
const emits = defineEmits(['update:Base64'])


const image = ref('')
const accept = '.jpg,.jpeg,.png';
const acceptList = accept.slice(',')
const storeResize = UseStoreResize();
const { isPc } = storeToRefs(storeResize)
const dialogHandler = ref(false);
const dialogWidth = computed(() => isPc.value == true ? '600px' : '90%')
const showPreview = computed(() => !!result.dataURL)
const fileSelect = ref(null);
const result = reactive({
	dataURL: '',
	fileData: '',
	fileName: '',
})
const uploadhandler = computed(() => !!result.fileData)
/**
 * 获取裁切结果
 */
const getResult = async () => {
	// 获取生成的base64图片地址
	const base64 = cropper.getDataURL()
	const fileData = await cropper.getFile({
		fileName: result.fileName,
	})
	result.dataURL = base64
	result.fileData = fileData
	emits('update:Base64', base64)
	dialogHandler.value = false
}
/**
 * 清除裁切框
 * cropper.reset()
 */
/**
 * 重置默认的裁切区域
 * cropper.reset()
 */


function resetData() {
	result.dataURL = ''
	result.fileData = ''
	result.fileName =  ''
}
function close() {
	dialogHandler.value = false
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
		resetData()
		result.fileName = getFileName(downloadName(eimageFiles))
		console.log(result.fileName)
		image.value = await fileToBase64(eimageFiles)
		// const imageBase = await fileToBase64(eimageFiles)
		// emits('update:image',imageBase)
		handlerDialogShow(true)
		clearFiles()
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
	fileSelect.value.value = '';
}
function handlerDialogShow(bool) {
	typeof (bool) == 'boolean' && (dialogHandler.value = bool);
}
async function upload() {
	if (uploadhandler.value != true) {
		return false;
	} else {
		console.log("uploadImageToSomewhere----")
		let image_file = result.fileData;
		let res = await uploadImageByIpfs(image_file)
		console.log("uploadImageToSomewhere----", res)

		if(props.Base64) {
			emits('update:Base64', res.publicUrl)
		}
		return res;
	}
}
defineExpose({
	upload,
	resetData
})
</script>
<style lang='scss' scoped>
.upload-image {
	display: inline-block;
	vertical-align: bottom;
	position: relative;
	width: 94px;
	height: 94px;
}
.file-select {
	display: none;
}
.upload-preview,
.upload-event-traget {
	position: absolute;
	top: 0;
	left: 0;
	// width: 94px;
	// height: 94px;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 6px;
	color: #fff;
	font-size: 12px;
	overflow: hidden;
	cursor: pointer;
}
// .upload-event-traget {
// }
.upload-preview {
	.preview-image {
		width: 100%;
		height: 100%;
	}
}
</style>
