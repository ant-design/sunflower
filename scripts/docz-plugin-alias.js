const { join } = require("path");
const { createPlugin } = require("docz-core");
const glob = require("glob");

const alias = () =>
  createPlugin({
    onCreateWebpackChain: config => {
      const list = glob.sync(join(__dirname, "../packages/*"));
      list.forEach(item => {
        const array = item.split("/");
        const pkg = join(
          __dirname,
          "../packages",
          array[array.length - 1],
          "package.json"
        );
        const { name, entry } = require(pkg);
        if (!entry) {
          return;
        }
        config.resolve.alias.set(name, join(pkg, "../", entry));
      });
    }
  });

module.exports = alias;
