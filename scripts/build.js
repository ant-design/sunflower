const { fork } = require('child_process');
const { join } = require('path');
const glob = require('glob');
const father = require.resolve('father/bin/father');

const list = process.env.NAME ? [process.env.NAME] : glob.sync('packages/*').map(item => {
  const array = item.split('/');
  const name = array[array.length -1];
  return name;
});

const depsMap = {};
list.forEach(item => {
  const pkg = join(__dirname, '../packages', item, 'package.json');
  const { dependencies, main, module: pkgModule } = require(pkg);
  const deps = [];
  const dist = [];
  if (dependencies) {
    Object.keys(dependencies).forEach(dependencie => {
      const name = dependencie
        .replace('@sunflower-antd/', 'sunflower-antd-')
        .replace('@sunflower-hooks/', 'sunflower-hooks-');
      if (list.includes(name)) {
        deps.push(name);
      }
    });
  }
  depsMap[item] = deps;
});


const map = {};

function build(name) {
  if (map[name]) {
    return map[name];
  }
  map[name] = new Promise(resolve => {
    const deps = depsMap[name];
    const promise = Promise.all(deps.map(item => build(item)));
    promise.then(() => {
      console.log(`\nbuilding ${name}\n`);
      fork(father, ['build'], {
        cwd: join(__dirname, '../'),
        env: {
          PACKAGE: name,
        },
        stdio: 'inherit'
      }).on('close', (code) => {
        if (code !== 0) {
          process.exit(code);
        } else {
          resolve();
        }
      });
    })
  });
  return map[name];
}



const promise = Promise.all(Object.keys(depsMap).map(name => build(name)));

promise.then(() => {
  console.log('build success');
});
