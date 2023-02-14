module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended' // nível da regra
  ],
  globals: {
    objSwal: false,
    Swal: false,
    loader: false,
    app: false,
    getErrors: false,
    displayMessage: false
  },
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-undef': 'error',
    'space-infix-ops': ['error', { int32Hint: false }], // space around = , +, -, etc
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // space after :
    'keyword-spacing': ['error', { before: true }], //
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    semi: [2, 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: true
      }
    }],
    'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1, ignores: [] }],
    'vue/html-indent': ['error', 2, { attribute: 1, baseIndent: 1, closeBracket: 0, alignAttributesVertically: true, ignores: [] }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
