const base = require("@umijs/fabric/dist/eslint");

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    "arrow-parens": 1,
    "dot-notation": 0,
    "import/no-unresolved": 1,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "react-hooks/exhaustive-deps": 0
  }
};
