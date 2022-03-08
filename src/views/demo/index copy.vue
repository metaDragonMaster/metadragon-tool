<template>
	<div class="limit-max-width-media">
		<UploadIcon></UploadIcon>
		<UploadImage ref="uploadimage"></UploadImage>
	</div>
</template>

<script setup>
import {
	ref,
} from "vue"
import UploadIcon from "@/components/uploadIcon"
import UploadImage from "@/components/uploadImage"
const uploadimage = ref(null)
</script>
<style lang='scss' scoped>
</style>
