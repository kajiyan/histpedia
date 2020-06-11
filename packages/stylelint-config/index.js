module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
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
    'length-zero-no-unit': null,
    indentation: null,
    'string-quotes': 'single',
  },
};
