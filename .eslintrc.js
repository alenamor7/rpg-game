module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        "no-plusplus": [0],
        'max-len': ["error", { "code": 130 }],
        "no-bitwise": [0],
        "no-return-assign": "warn",
        "no-param-reassign": "warn",
    },
};
