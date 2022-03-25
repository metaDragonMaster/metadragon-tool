const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
// const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css'];
module.exports = {
	lintOnSave: true,
	publicPath: './', // 基本路径
	outputDir: 'metagame-tool-dist', // 输出文件目录
	css: {
		requireModuleExtension: true,
		// extract: true,
		sourceMap: process.env.NODE_ENV == 'development' ? true : false,
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('components', '@/components')
		config.plugin('AutoImport').use(
			AutoImport({
				imports: ['vue'],
				resolvers: [
					ElementPlusResolver({
						importStyle: 'css',
						exclude: new RegExp(/^(?!.*loading-directive).*$/)
					})
				],
				dts: 'auto-imports.d.ts'
			})
		)
		config.plugin('Components').use(
			Components({
				resolvers: [ElementPlusResolver({ importStyle: 'css' })],
				dts: 'components.d.ts'
			})
		)
		return config
	},
	// configureWebpack: (config) => {
	// 	config.plugins = [
	// 		new CompressionWebpackPlugin({
	// 			algorithm: 'gzip',
	// 			test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
	// 			threshold: 10240,
	// 			minRatio: 0.8,
	// 			deleteOriginalAssets: true // 删除源文件 （可选）
	// 		}),
	// 		new webpack.optimize.LimitChunkCountPlugin({
	// 			maxChunks: 5,
	// 			minChunkSize: 100
	// 		})
	// 	]
	// 	return config
	// }

}
