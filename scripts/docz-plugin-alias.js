const { join } = require('path');
const { createPlugin } = require('docz-core');
const glob = require('glob');

const alias = () => createPlugin({
  onCreateWebpackChain: (config) => {
    const list = glob.sync(join(__dirname, '../packages/*'));
    list.forEach(item => {
      const array = item.split('/');
      const name = array[array.length -1];
      const pkg = join(__dirname, '../packages', name, 'package.json');
      const { entry } = require(pkg);
      if (!entry) {
        return;
      }
      config.resolve.alias.set(
        name,
        join(pkg, '../', entry),
      );
    });
  },
})

module.exports = alias;

