<template>
	<div>
		404
		<ThemeButton type="square" @click="toPath('/')">返回首页</ThemeButton>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton"

import { toPath } from "@/router/util"


</script>
<style lang='scss' scoped>

</style>
