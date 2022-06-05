module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }
      },
      'minify'
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@pages': './src/pages',
        '@components': './src/components',
        '@styles': './src/styles',
        '@store': './src/store',
        '@theme': './src/theme'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
