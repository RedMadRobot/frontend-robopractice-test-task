module.exports = {
  extends: [
    'prettier',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-rational-order',
  ],
  plugins: ['stylelint-scss'],
  defaultSeverity: 'error',
  rules: {
    'no-eol-whitespace': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-empty-line-before': null,
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': true,
      },
    ],

    /* "max-nesting-depth": [
      4,
      { "ignore": ["blockless-at-rules", "pseudo-classes"] }
    ],
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "selector-pseudo-class-no-unknown": true,
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "function-comma-space-after": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-no-vendor-prefix": true,
    "max-empty-lines": 2,
    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "property-no-vendor-prefix": true,
    "selector-list-comma-space-before": "never",
    "selector-list-comma-newline-after": "always",
    "string-quotes": "double",
    "value-no-vendor-prefix": true */
  },
};
