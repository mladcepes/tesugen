module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      'publicPath': './html-report',
      '':'',
      'filename': `${Date.now()}-test-report.html`,
      'expand': true
    }]]
};