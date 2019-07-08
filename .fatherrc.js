import alias from './scripts/docz-plugin-alias';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  doc: {
    plugins: [
      alias(),
    ],
    title: 'sunflower',
    base: '/sunflower/',
    description: 'Collection of React Hooks returning components of antd.',
    repository: 'https://github.com/ant-design/sunflower',
    ordering: 'ascending',
    indexHtml: './docs/index.html',
    themeConfig: {
      repository: 'https://github.com/ant-design/sunflower',
      styles: {
        container: {
          fontSize: 16,
        },
      },
      colors: {
        primary:'rgb(230, 174, 49)',
      },
    },
    menu: [
      'Overview',
      'Hooks',
    ]
  },
}