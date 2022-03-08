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
			<!--  @click="" -->
			<el-image class="preview-image" :src="previewImageBase64" alt />
			<!-- :preview-src-list="previewSrcList" -->
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
			<PictureCropper v-model:pic="previewImageBase64" @submit="handlerDialogShow(false)"></PictureCropper>
		</el-dialog>
	</div>
</template>

<script setup>
import PictureCropper from "./pictureCropper.vue"
import {
	ref,
	// unref,
	computed,
} from "vue";
import { PlusElMessage } from "@/utils/loadElement"
import { UseStoreResize } from "@/stores/window";
import { storeToRefs } from "pinia";
import { uploadByIpfs } from "@/config/ipfs"
import { fileToBase64, getExtensionWithPoint } from "@/utils/file"

const accept = '.jpg,.jpeg,.png';
const acceptList = accept.slice(',')
const storeResize = UseStoreResize();
const { isPc } = storeToRefs(storeResize)
const dialogValue = ref(false);
const dialogWidth = computed(() => isPc ? '600px' : '90%')
const imageFile = ref(null);
const previewImageBase64 = ref('');
const showPreview = computed(() =>
	!!previewImageBase64.value
)
const fileSelect = ref(null);

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
		previewImageBase64.value = await fileToBase64(eimageFiles)
		console.log(previewImageBase64.value)
		// imageFile.value = eimageFiles
		handlerDialogShow(true)
	} else {
		console.log("类型错误")
		clearFiles()
	}
}

function clearFiles() {
	previewImageBase64.value = '';
	imageFile.value = '';
	fileSelect.value.value = '';
}
//handlerDialogShow(true)
function handlerDialogShow(bool) {
	typeof (bool) == 'boolean' && (dialogValue.value = bool);
}
async function uploadImageToSomewhere() {
	// console.log(imageFile.value)
	let image_file = imageFile.value;
	// uploadByIpfs()
	let res = await uploadByIpfs(image_file)
	console.log("uploadImageToSomewhere----", res)
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
