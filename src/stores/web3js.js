
import { defineStore } from "pinia";
import { useWeb3, startContracts } from "@/hooks/useWeb3"
export const UseStoreWeb3js = defineStore('Web3js', {
	state: () => ({
		_web3: null,
		_address: '',
	}),
	getters: {
		web3: ({ _web3 }) => _web3,
		haveAuth: ({ _web3 }) => !!_web3,//是否被授权
		userAddress: ({ _address }) => _address,
		fromWei: ({ _web3 }) => {
			let fromWei;
			if (_web3.utils) {
				fromWei = _web3.utils.fromWei;
			}
			return fromWei;
		}
	},
	actions: {
		async startWeb3() {
			const web3InCode = await useWeb3(async (web3Eth, userAddress) => {
				console.log('用户切换了钱包后的操作')
				this.setUserAddress(userAddress)
				this.setWeb3(web3Eth)
				const { setContracts } = UseStoreContracts();
				const contracts = await startContracts(web3Eth);
				setContracts(contracts);
			})
			return !!web3InCode
		},
		setWeb3(web3) {
			this._web3 = web3
		},
		setUserAddress(address) {
			this._address = address
		}
	}

})

export const UseStoreContracts = defineStore('contracts', {
	state: () => ({
		_Contracts: null,
	}),
	getters: {
		Contracts: ({ _Contracts }) => _Contracts,
	},
	actions: {
		setContracts(Contracts) {
			// console.log('Contracts set **---',Contracts)
			this._Contracts = Contracts
		},
	}
})
// async function userEnable(setWeb3, setUserAddress) {
// 	const loadHandler = lockLoadHandler('正在获取授权...')
// 	try {
// 		const web3Provider = window.ethereum;
// 		// 请求用户授权
// 		web3Provider.enable();
// 		// 0x61 测试网络
// 		// 0x38 正式网络
// 		// if (web3Provider.chainId == '0x38') {
// 		const web3 = new Web3(web3Provider); //web3js就是你需要的web3实例
// 		console.log("web3js -- 74:web3:",web3);
// 		const userAddress = await getUserAddress(web3);
// 		console.log("web3js -- 76:", userAddress);
// 		if (userAddress.length <= 0) throw new Error();
// 		setUserAddress(userAddress)
// 		setWeb3(web3)
// 		ElMessage({
// 			type: 'success',
// 			message: 'Authorization success',
// 			grouping: true,
// 			showClose: true,
// 		})
// 		console.log("userEnable",web3)
// 		loadHandler.close()
// 		return web3
// 		// } else {
// 		//     ElMessage({
// 		//         duration: 0,
// 		//         type: 'error',
// 		//         showClose: true,
// 		//         grouping: true,
// 		//         message: 'Please switch the BSC network'
// 		//     })
// 		// }
// 	} catch (error) {
// 		// 用户不授权时
// 		// console.error('User denied accoun t access');
// 		ElMessage({
// 			duration: 0,
// 			type: 'error',
// 			showClose: true,
// 			grouping: true,
// 			message: 'User denied account access'
// 		})
// 		loadHandler.close()
// 		throw new Error(error);
// 	}
// }
// function getContract(web3, abi, abiAddress) {
// 	return new web3.eth.Contract(abi, abiAddress)
// }
// async function startContracts(web3) {
// 	const BNBContract = await getContract(web3, AbiBNBTest, AddressBNBTest);
// 	return {
// 		BNBContract
// 	}
// }
