module.exports = {
    'env': {
        'commonjs': true,
        'es2020': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
        'no-console': 'off', // "warn" // "off",
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            'stroustrup'
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'no-unused-vars': [
            'warn'
        ],
        'no-var': [
            'off'
        ],
        'one-var': [
            'off'
        ]
    }
};
