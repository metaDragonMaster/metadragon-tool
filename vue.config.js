module.exports = {
    lintOnSave: true,
    publicPath: './', // 基本路径
    outputDir: 'metagame-tool', // 输出文件目录
    css: {
        requireModuleExtension: true,
        // extract: true,
        sourceMap: process.env.NODE_ENV == 'development' ? true : false,
    },
}