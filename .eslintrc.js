module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'default',
    //     format: ['camelCase'],
    //   },
    //   {
    //     selector: 'variable',
    //     format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
    //   },
    //   {
    //     selector: 'parameter',
    //     format: ['camelCase'],
    //     leadingUnderscore: 'allow',
    //   },
    //   {
    //     selector: 'typeLike',
    //     format: ['PascalCase'],
    //   },
    // ],
    // Next.js の Link タグがエラーにならないようにする設定
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['invalidHref', 'preferButton'],
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
      },
    ],
    // // import/extension エラー対応
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     mjs: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    // // devDependencies を import できるファイルを設定する
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: ['**/next.config.js'],
    //   },
    // ],
    // // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
    // // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    // 'react/jsx-filename-extension': [
    //   'error',
    //   {
    //     extensions: ['.jsx', '.tsx'],
    //   },
    // ],
  },
  settings: {
    // 'import/resolver': {
    //   node: {
    //     extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
    //   },
    // },
  },
};
