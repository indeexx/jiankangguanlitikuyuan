const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const { pageEntries } = require("./scripts/utils");
const { PAGE_NAME } = process.env;
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
    publicPath: `./`,
    outputDir: path.resolve(__dirname, `./dist/${PAGE_NAME}`),
    lintOnSave: false,
    pages: {
        index: {
            entry: './src/piaxi/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        // recruitment: {
        //     // path: '/recruitment',
        //     entry: './src/recruitment/main.js',
        //     template: 'public/index.html',
        //     filename: 'index.html'
        // },
        // dragonBoatFestival: {
        //     entry: './src/dragonBoatFestival/main.js',
        //     template: 'public/index.html',
        //     filename: 'index.html'
        // },
        // meeting: {
        //     entry: './src/meeting/main.js',
        //     template: 'public/index.html',
        //     filename: 'index.html'
        // }
    },
    chainWebpack: (config) => {

    },
    pages: pageEntries(PAGE_NAME),
    indexPath: "index.html",
    chainWebpack: (config) => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 512,
                    minRatio: 0.8,
                    deleteOriginalAssets: false
                }))
        } else {
            config.mode = 'development'
        }
        Object.assign(config, {
            resolve: {
                alias: {
                    '@': path.posix.join(__dirname, `./src/${PAGE_NAME}`)
                }
            }
        })
    },
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    }),
                ]
            }
        },
        modules: true,
        requireModuleExtension: true
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    devServer: {
        open: true,
        openPage: ``,
        host: '0.0.0.0',
        port: 8866,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                // target: '/',
                // target: 'https://api.murder-mystery.cn',
                target: 'http://47.111.77.161',
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    pluginOptions: {}
}