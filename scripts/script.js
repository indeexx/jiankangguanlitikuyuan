/*
 * @Author: indeex
 * @Date: 2021-07-28 20:25:48
 * @Email: indeex@qq.com
 */
const { execSync } = require('child_process');
const { log } = console;
const { pageNames } = require('./utils');
const action = process.argv[2];
const fn_map = {
    serve: iServe,
    build: iBuild,
}
if (!fn_map[action]) {
    throw new Error('啥都没有匹配上');
}
fn_map[action]();
const ienv = process.platform == 'win32' ? 'cross-env' : '';

function iServe() {
    const chalk = require('chalk');
    const inquirer = require('inquirer');
    const fuzzy = require('fuzzy');
    inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

    function searchPages(answers, input) {
        input = input || '';
        return new Promise(resolve => {
            const fuzzyResult = fuzzy.filter(input, pageNames());
            resolve(fuzzyResult.map(el => el.original));
        });
    }
    inquirer
        .prompt([{
            type: 'autocomplete',
            name: 'page',
            message: '请选择要启动的页面',
            pageSize: 10,
            source: searchPages
        }])
        .then(({ page: pageName }) => {
            log(`${chalk.blue.bold('服务启动中...')}`);
            execSync(`${ienv} PAGE_NAME=${pageName} npx vue-cli-service serve`, { stdio: 'inherit' });
        });
}

function iBuild() {
    const ienv = process.platform == 'win32' ? 'cross-env' : '';
    const pageName = process.argv[3];
    // const env = process.argv[4];
    const env = 'prd';
    if (!pageName) {
        console.error('请输入具体的页面！！！');
        process.exit(0);
    }
    if (!['prd'].includes(env)) {
        console.error('是不是少点啥...');
        process.exit(0);
    }
    try {
        execSync(
            `rm -rf ./dist/${pageName} && PAGE_NAME=${pageName} npx vue-cli-service build --mode ${env}`, { stdio: 'inherit' }
        );
    } catch (e) {
        execSync(
            `${ienv} PAGE_NAME=${pageName} npx vue-cli-service build --mode ${env}`, { stdio: 'inherit' }
        );
    }

}