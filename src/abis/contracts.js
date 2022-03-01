const addressPro = {
    AddressBNBTest: '0x02ef938A0806cFF141fDcf56636368da615BCfeF',
    type: 'pro'
}
const addressTest = {
    AddressBNBTest: '0x02ef938A0806cFF141fDcf56636368da615BCfeF',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;