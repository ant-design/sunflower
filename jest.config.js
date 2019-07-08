module.exports = {
  moduleNameMapper: {
    '^@sunflower-antd/(.*)$': '<rootDir>/packages/sunflower-antd-$1/src',
    '^@sunflower-hooks/(.*)$': '<rootDir>/packages/sunflower-hooks-$1/src',
    '^sunflower-(.*)$': '<rootDir>/packages/sunflower-$1/src',
  },
  collectCoverageFrom: [
    'packages/*/src/**',
  ],
};
