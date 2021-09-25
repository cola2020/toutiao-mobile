module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // "prefer-const ": 0,
        semi: 'off',
        'arrow-parens': 0,
        'array-callback-return': 0,
        curly: 1,
        'no-void': 0,
        'no-eval': 2,
        'no-unused-vars': [
            'warn',
            {
                vars: 'local',
                args: 'none',
                ignoreRestSiblings: false
            }
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 2
            }
        ],
        'eol-last': 0,
        'space-before-function-paren': 0,
        'no-useless-escape': 0,
        'spaced-comment': 0,
        'arrow-spacing': 0,
        'no-multiple-empty-lines': 0,
        'brace-style': 'warn',
        quotes: 'warn',
        'padded-blocks': 0,
        camelcase: 'warn',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
