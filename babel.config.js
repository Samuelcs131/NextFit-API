module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@routes': './src/routes'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
