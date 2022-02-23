/*
    // rem等比适配配置文件
    // 基准大小
    const baseSize = 16
        // 设置 rem 函数
    function setRem() {
        // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
        const scale = document.documentElement.clientWidth / 1920
            // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
    }
    // 初始化
    setRem()
        // 改变窗口大小时重新设置 rem
    window.onresize = function() {
        setRem()
    }
 */
// 结合 vue.config.js中的postcsstorem进行设置
function setRem() {
    // 设计稿宽度
    const baseWidth = 1920;
    // 窗口宽度
    const clientWidth = document.documentElement.clientWidth
    // scale 缩放比例
    const scale = clientWidth / baseWidth
    document.documentElement.style.fontSize = scale + 'px'
}
export { setRem };