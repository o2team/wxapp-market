/**
 * 该 ESLint 配置扩展自 eslint-config-o2team-wx
 * https://www.npmjs.com/package/eslint-config-o2team-wx
 * o2team-wx 这一套规则是参考了 StandardJS 和 Airbnb 的 JS 规范，然后结合业务中的最佳实践整理输出的。
 */
module.exports = {
    'extends': 'o2team-wx',
    'plugins': [
        'html'
    ],
    'settings': {
        'html/html-extensions': ['.wxml']
    },
    'rules': {
        'no-restricted-globals': ['error', 'Promise'],  // 禁止直接使用原生Promise，必须引入lib
        'newline-per-chained-call': 'off',
        'eqeqeq': 'off',
        'indent': ['error', 4, { SwitchCase: 1 }],
        'prefer-rest-params': 'off',
        'prefer-template': 'off',
        'no-else-return': 'off',
        'no-nested-ternary': 'off',
        'brace-style': 'off',
        'semi': 'off',
        'camelcase': ['off', { properties: 'never' }],  // ESLint 配置问题，暂时不强制所有变量名都用驼峰式命名
        'array-callback-return': 'off',  // 暂时关闭
        'prefer-const': 'warn',
        'no-mixed-operators': 'off',
        'callback-return': 'warn',
        'class-methods-use-this': 'warn',

        // 不能直接使用以下 api，如果修改该 api 的封装库，可以在代码加上以下注释忽略检查：
        // /* eslint-disable no-restricted-properties */
        // [your code]
        // /* eslint-enable no-restricted-properties */

        'no-restricted-properties': [2, {
            'object': 'wx',
            'property': 'navigateTo',
            'message': 'Please use this.$goto!!!'
        }, {
            'object': 'wx',
            'property': 'redirectTo',
            'message': 'Please use this.$goto!!!'
        }, {
            'object': 'wx',
            'property': 'switchTab',
            'message': 'Please use this.$goto!!!'
        }, {
            'object': 'wx',
            'property': 'request',
            'message': 'Please use common/request lib!!!'
        }, {
            'object': 'wx',
            'property': 'connectSocket',
            'message': 'Please use common/request lib!!!'
        }, {
            'object': 'wx',
            'property': 'setStorage',
            'message': 'Please use common/localStorage lib!!!'
        }, {
            'object': 'wx',
            'property': 'setStorageSync',
            'message': 'Please use common/localStorage lib!!!'
        }, {
            'object': 'wx',
            'property': 'getStorage',
            'message': 'Please use common/localStorage lib!!!'
        }, {
            'object': 'wx',
            'property': 'getStorageSync',
            'message': 'Please use common/localStorage lib!!!'
        }]
    }
}
