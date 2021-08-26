/*
 * @Author: indeex
 * @Date: 2021-07-28 20:33:34
 * @Email: indeex@qq.com
 */
const globby = require('globby');
const pattern = ['./src/*/main.js'];
const { resolve } = require('path');

function pageEntries(pageName) {
    const entries = {};
    const paths = globby.sync(pattern);
    paths.forEach(path => {
        const name = path.split('/')[2];
        if (name === pageName) {
            entries[name] = {
                entry: path,
                template: resolve(__dirname, '../public/index.html'),
                filename: 'index.html',
                chunks: ['chunk-vendors', 'chunk-common', pageName]
            };
            return false;
        }
    });
    return entries;
}

function pageNames() {
    return globby.sync(pattern).map(path => path.split('/')[2]);
}
module.exports = {
    pageEntries,
    pageNames
};