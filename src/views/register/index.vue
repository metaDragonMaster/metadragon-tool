<template>
	<div class="register-view child-center-column">
		<h3 class="title child-center">
			<img class="icon-logo" src="@/assets/icons/icon-logo.png" alt />
			<span>注册链灵用户</span>
		</h3>
		<ThemeButton
			type="square"
			class="child-center"
			@click="toRegister"
			v-loading="registLoading"
			:element-loading-spinner="LoadSvg"
			:element-loading-svg-view-box="svgViewBox"
		>
			<span class="ps">点击支付 100USDT</span>
		</ThemeButton>
		<span class="ps color-grey">您的账户尚未注册 支付成功后解锁控制台功能</span>
	</div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton";
import { LoadSvg, svgViewBox } from "@/utils/loadElement";
import {
	ElNotification
} from "element-plus"
import {
	UseStoreContracts,
	UseStoreWeb3js
} from "@/stores/web3js"
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n"

const { t } = useI18n()
const storeWeb3js = UseStoreWeb3js();
const storeContracts = UseStoreContracts();
const { Contracts } = storeToRefs(storeContracts);
console.log(storeContracts, Contracts.value);
const registLoading = ref(false);

async function toRegister() {
	registLoading.value = true;
	try {
		const { userAddress, haveAuth, startWeb3 } = storeWeb3js;
		if (!haveAuth) {
			await startWeb3()
			return toRegister();
		}
		const { BNBContract } = Contracts.value;
		const isRegisted = await isRegister(BNBContract)
		if (!isRegisted) {
			const registerBNBAmount = await BNBContract.methods.get_register_BNB_AmountOut().call();
			console.log(userAddress, registerBNBAmount)
			const registed = await BNBContract.methods.register(userAddress, registerBNBAmount).send({
				from: userAddress,
				value: registerBNBAmount
			});
			console.log("registed 注册信息", registed);
		}
		registLoading.value = false;
	} catch (error) {
		console.error(error);
		ElNotification({
			title: t('elMessage.tips'),
			message: t('elMessage.register.failed'),
			type: 'error',
		})
		registLoading.value = false;
	}
}

async function isRegister(BNBContract) {
	const { userAddress } = storeWeb3js;
	const is = await BNBContract.methods.isRegister(userAddress).call();
	if (is) {
		ElNotification({
			title: t('elMessage.tips'),
			message: t('elMessage.register.registered'),
			type: 'warning',
			duration: 0
		})
	}
	return is;
}
</script>
<style lang='scss' scoped>
.register-view {
	padding-top: 100px;
}
.title {
	font-size: 32px;
	.icon-logo {
		margin-right: 10px;
	}
	@media screen and (max-width: 768px) {
		font-size: 16px;
		.icon-logo {
			width: 26px;
		}
	}
}
.ps {
	@media screen and (max-width: 768px) {
		zoom: 0.5;
	}
}
.color-grey {
	color: rgba(255, 255, 255, 0.5);
}
.theme-button {
	margin-block: 40px;
	width: 100%;
	max-width: 270px;
	height: 60px;
	@media screen and (max-width: 768px) {
		width: 100%;
		max-width: 270px;
		height: 30px;
	}
}
</style>
