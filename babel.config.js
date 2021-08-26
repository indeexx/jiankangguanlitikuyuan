module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    'env': {
        'development': {
            'plugins': ['dynamic-import-node']
        },
        'production': {
            'plugins': ['transform-remove-console']
        }
    },
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}