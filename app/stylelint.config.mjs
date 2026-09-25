const config = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['.next/**', 'out/**', 'build/**'],
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
}

export default config
