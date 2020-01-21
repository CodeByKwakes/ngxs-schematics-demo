module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['chore', 'ci', 'docs', 'feat', 'fix', 'style', 'refactor', 'revert', 'perf', 'plugin', 'test', 'wip']
    ]
  }
};
