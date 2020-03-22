const cp = require('child_process');
const path = require('path');
const fs = require('fs');

cp.fork(
  path.join(__dirname, 'node_modules/typescript/bin/tsc'),
  ['--module', 'esnext', '--outDir', './es'],
  {
    cwd: __dirname,
  },
).on('exit', code => {
  if (code !== 0) {
    process.exit(code);
  }
});

cp.fork(
  path.join(__dirname, 'node_modules/typescript/bin/tsc'),
  ['--module', 'commonjs', '--outDir', './lib'],
  {
    cwd: __dirname,
  },
).on('exit', code => {
  if (code !== 0) {
    process.exit(code);
  }

  function replace(name) {
    const filename = path.join(__dirname, 'lib', name);
    const str = fs.readFileSync(filename, 'utf8');
    fs.writeFileSync(filename, str.replace('antd/es/form', 'antd/lib/form'));
  }
  replace('form.js');
  replace('form.d.ts');
});
