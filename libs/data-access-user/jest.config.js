module.exports = {
  name: 'data-access-user',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-access-user',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
