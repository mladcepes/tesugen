module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      'publicPath': './html-report',
      '':'',
      'filename': 'report.html',
      'expand': true
    }]]
};