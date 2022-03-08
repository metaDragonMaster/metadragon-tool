const addressPro = {
    AddressBNBTest: '0x02ef938A0806cFF141fDcf56636368da615BCfeF',
    type: 'pro'
}
const addressTest = {
    AddressBNBTest: '0x3e0B79F94Ea24816dbe29882D26963FeBBb953c3',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;
