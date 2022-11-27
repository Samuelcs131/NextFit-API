
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
        '@routes': './src/routes',
        '@controllers': './src/controllers',
        '@config': './src/config',
        '@resources': './src/resources',
        '@services': './src/services',
        '@utils': './src/utils',
        '@middlewares': './src/middlewares',
        '@types': './src/types'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
