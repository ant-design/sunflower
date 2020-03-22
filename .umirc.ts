import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Sunflower',
  mode: 'site',
  base: '/sunflower/',
  publicPath: '/sunflower/',
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
  navs: {
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/ant-design/sunflower' },
    ],
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/ant-design/sunflower' },
    ],
  },
});
