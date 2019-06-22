const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'arrow-parens': 1,
    'dot-notation': 1,
    'import/no-unresolved': 1,
  },
};