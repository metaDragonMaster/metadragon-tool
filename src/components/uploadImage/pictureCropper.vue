<template>
	<div class="picture-cropper">
		<div class="picture-cropper-content">
			<vue-picture-cropper
				:img="pic"
				:boxStyle="boxStyle"
				:options="options"
				:presetMode="presetMode"
			/>
			<div class="previews">
				<div class="preview-item preview-3x" ref="cropperDom3"></div>
				<div class="preview-item preview-2x" ref="cropperDom2"></div>
				<!-- <div class="preview-item preview-1x" ref="cropperDom1"></div> -->
			</div>
		</div>
		<div class="operations">
			<!-- <el-button @click="getDataUrl">裁剪</el-button> -->
			<el-button @click="reset">重置裁剪框</el-button>
			<el-button @click="submit">确认裁剪</el-button>
		</div>
	</div>
</template>

<script setup>
// import { fileToUrl } from "@/utils/tools"
import {
	ref,
	// unref,
	reactive,
	toRefs,
	watch,
	// computed,
	defineProps,
	// defineEmits,
	defineExpose
} from "vue"
import {
	UseStoreResize
} from "@/stores/window"
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { storeToRefs } from "pinia";
// const emits = defineEmits(['update:imageBase64','update:imageFile','submit'])
// const emits = defineEmits(['update:pic','submit'])
const props = defineProps({
	// imageBase64: {
	// 	type: String,
	// 	required: true,
	// 	readonly: true,
	// },
	// imageBase64: {
	// 	defaule: ''
	// },
	pic: {
		type: String,
		required: true,
		readonly: true,
	}
})
const { pic } = toRefs(props)
// const cropperDom1 = ref(null)
const cropperDom2 = ref(null)
const cropperDom3 = ref(null)
const storeResize = UseStoreResize();
const { clientWidth } = storeToRefs(storeResize)
watch(() => clientWidth.value, (n) => {
	console.log(n)
	reset()
})
const boxStyle = {
	width: '100%',
	height: '100%',
	// backgroundColor: '#000000',
	margin: 'auto',
	imageSmoothingQuality: 'high'
}
const presetMode = {
	mode: 'fixedSize',
	width: '100%',
	height: '100%'
}
const options = reactive({
	viewMode: 1,
	dragMode: 'crop',
	// dragMode: 'move',
	// cropBoxResizable: false,//能否拖动裁剪框
	aspectRatio: 9 / 9,
	preview: {
		// cropperDom1,
		cropperDom2,
		cropperDom3,
	},
})
function reset() {
	cropper.reset()
}
function getDataUrl() {
	// const file = cropper.getFile({fileName: '123.jpg'})
	const dataURL = cropper.getDataURL()
	console.log(dataURL)
	return dataURL
}
async function getFile() {
	const file = await cropper.getFile()
	console.log(file)
	return file;
}
async function submit() {
	// getDataUrl()
	// getFile()
	// const dataURL = cropper.getDataURL()
	// console.log(dataURL)
	// const file = await cropper.getFile()
	// console.log(file)
	// console.log(imageBase64.value)

	// return await getDataUrl();
	// const base64 = cropper.getDataURL()
	// console.log({ base64, imageBase64 })
	// const dataURL =
	getDataUrl()
	// emits('update:pic',dataURL)
	// emits('submit')
	// emits('update:imageBase64',dataURL)
	// emits('update:imageFile',file)
}
defineExpose({
	getDataUrl,
	getFile,
})
</script>
<style lang="scss" scoped>
.previews {
	display: flex;
}
.preview-item {
	overflow: hidden;
	margin-right: 10px;
}
// .preview-1x {
// 	// margin-left: 500px;
// 	width: 50px;
// 	height: 50px;
// }
.preview-2x {
	// margin-left: 500px;
	width: 64px;
	height: 64px;
}
.preview-3x {
	// margin-left: 500px;
	width: 128px;
	height: 128px;
}
.picture-cropper {
	margin: auto;
}
.picture-cropper-content {
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: 200px;
	grid-gap: 10px;
	@media screen and (max-width: 768px) {
		grid-template-columns: 200px;
		grid-template-rows: 200px 200px;
		justify-content: center;
	}
}
.operations {
	padding-top: 10px;
}
</style>
