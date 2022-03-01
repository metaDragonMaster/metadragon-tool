
import { defineStore } from "pinia";
import { AbiBNBTest, AddressBNBTest } from '@/abis/abis.js';
import Web3 from 'web3';
import { ElMessage } from 'element-plus'
// const { locale } = useI18n();
export const UseStoreWeb3js = defineStore('Web3js',{
    state: () => ({
        _web3: null,
        _address: '',
    }),
    getters: {
        web3: ({ _web3 }) => _web3,
        userAddress: ({ _address }) => _address,
    },
    actions: {
        async startWeb3() {
            const web3Provider = window.ethereum;
            const wab3InCode = await userEnable(web3Provider,this.setWeb3,this.setUserAddress);
            if (wab3InCode) {
                const useStoreContracts = UseStoreContracts()
                const { setContracts } = useStoreContracts;
                const contracts = await startAbis(wab3InCode);
                // console.log("contracts ---",contracts);
                setContracts(contracts);
            }
        },
        setWeb3(web3) {
            this._web3 = web3
        },
        setUserAddress(address) {
            this._address = address
        }
    }

})

export const UseStoreContracts = defineStore('contracts',{
    state: () => ({
        _Contracts:null,
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


// async function init() {
//     const web3Provider = window.ethereum;
//     const wab3InCode = await userEnable(web3Provider);
//     if (wab3InCode) {
//         const contracts = startAbis(wab3InCode);
//         setContracts(contracts);
//     }
// }
async function userEnable(web3Provider,setWeb3,setUserAddress) {
    try {
        // 请求用户授权
        web3Provider.enable();
        // 0x61 测试网络
        // 0x38 正式网络
        // if (web3Provider.chainId == '0x38') {
        const web3 = new Web3(web3Provider); //web3js就是你需要的web3实例
        let userAddress = '';
        await web3.eth.getAccounts().then(res => {
            userAddress = res[0];
            setUserAddress(userAddress)
            setWeb3(web3)
        });
        // console.log('layout - web3js', web3)
        ElMessage({
            type: 'success',
            message: 'success',
            grouping: true,
            showClose: true,
        })
        return {
            'web3': web3,
            'userAddress': userAddress
        }
        // } else {
        //     ElMessage({
        //         duration: 0,
        //         type: 'error',
        //         showClose: true,
        //         grouping: true,
        //         message: 'Please switch the BSC network'
        //     })
        // }
    } catch (error) {
        // 用户不授权时
        // console.error('User denied accoun t access');
        ElMessage({
            duration: 0,
            type: 'error',
            showClose: true,
            grouping: true,
            message: 'User denied account access'
        })
        throw new Error(error);
    }
}
function getContract(web3, abi, abiAddress) {
    return new web3.eth.Contract(abi, abiAddress)
}
async function startAbis({
    web3,
    // userAddress
}) {
    // console.log('userAddress', userAddress, 'web3', web3);
    // console.log('AbiBNBTest', AbiBNBTest, 'AddressBNBTest', AddressBNBTest);
    const BNBContract = await getContract(web3, AbiBNBTest, AddressBNBTest);
    // console.log("bnbContract", BNBContract);
    return {
        BNBContract
    }
}