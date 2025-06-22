module.exports = {
    customSyntax: 'postcss-styled-syntax',
    extends: ['stylelint-config-standard'],
    rules: {
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
        'property-no-vendor-prefix': null,
        'value-keyword-case': null,
    },
    ignoreFiles: ['**/node_modules/**', '**/dist/**'],
}