module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment', 'inside-block'],
        ignoreAtRules: ['custom-media'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'define-mixin', 'extend', 'mixin'],
      },
    ],
    'font-family-no-duplicate-names': [
      true,
      {
        ignoreFontFamilyNames: ['monospace'],
      },
    ],
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines'],
      },
    ],
    'no-descending-specificity': null,
    'length-zero-no-unit': null,
    // stylelint v16 で stylistic rules が削除されたため、以下は Prettier で処理
    // 'indentation': null,
    // 'string-quotes': 'single',
  },
};
