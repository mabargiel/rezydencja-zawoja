export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-deprecated': [true, { ignoreAtRules: ['apply'] }],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'config',
          'custom-variant',
          'plugin',
          'reference',
          'source',
          'theme',
          'utility',
          'variant',
        ],
      },
    ],
    'import-notation': 'string',
  },
  ignoreFiles: ['.next/**', 'out/**', 'build/**'],
}
