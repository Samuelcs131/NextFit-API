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
        '@routes': './src/routes',
        '@controllers': './src/controllers'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
