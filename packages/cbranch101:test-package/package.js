Package.describe({
  name: 'cbranch101:test-package',
  summary: 'This is just a package to figure out how packages work',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.3');
  api.addFiles('cbranch101:test-package.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cbranch101:test-package');
  api.addFiles('cbranch101:test-package-tests.js');
});
