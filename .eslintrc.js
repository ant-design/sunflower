const base = require("@umijs/fabric/dist/eslint");

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    "arrow-parens": 0,
    "dot-notation": 0,
    "import/no-unresolved": 1,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-underscore-dangle": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "arrow-body-style": 0,
  }
};
