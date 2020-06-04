const package = require('./package.json');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    /**
     * 下記を省略した形式（plugin:prettier/recommended）で設定する
     * extends: ['prettier']
     * plugins: ['prettier']
     * rules: { 'prettier/prettier': 'error' }
     * https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
     */
    'plugin:prettier/recommended',
    /**
     * eslint-config-prettier で Prettier と競合する可能性のあるルールを解決する
     * If you extend a config which uses a plugin, it is recommended to add "prettier/that-plugin" (if available). For example, eslint-config-airbnb enables eslint-plugin-react rules, so "prettier/react" is needed:
     * https://github.com/prettier/eslint-config-prettier#installation
     */
    'prettier/react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  // plugins: ['prettier'],
  rules: {
    // devDependencies を import できるファイルを設定する
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/next.config.js'],
      },
    ],
  },
  settings: {
    react: {
      version: package.dependencies.react,
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        // 型情報が必要なルールの設定 TypeScriptのビルドが必要となるのでパフォーマンスに影響する
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier/react',
        // @typescript-eslint/eslint-plugin を使用するのに必要な設定
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
      },
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        // Next.js の Link タグがエラーにならないようにする設定
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            aspects: ['invalidHref', 'preferButton'],
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
          },
        ],
      },
    },
  ],
};
