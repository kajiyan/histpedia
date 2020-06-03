module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
  // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
};
