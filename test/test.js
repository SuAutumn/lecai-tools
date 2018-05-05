module.exports = {
  entry: './src',
  outDir: './src/language',
  baseSample: './src/language.json',
  // 保留字段
  preserveKeys: [
    'global.',
    'apis.',
    'api.',
    'posts.',
    'name.',
    'face.',
    'advert.',
    'apisorg.',
    'pis.'
  ],
  ignoreFileOrDirRelativePath: [
    'assets',
    'language.json',
    'components/view/exam',
    'components/view/training',
    'language',
    'HTone.js'
  ]
}