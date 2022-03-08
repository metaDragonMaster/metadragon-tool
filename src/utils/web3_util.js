export async function getUserAddress(_web3) {
    let userAddress = '';
    await _web3.eth.getAccounts().then(res=> userAddress = res[0]);
    return userAddress;
}