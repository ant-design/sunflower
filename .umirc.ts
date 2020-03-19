import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Sunflower',
  mode: 'site',
  base: '/sunflower/',
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
      { title: 'GitHub', path: 'https://github.com/umijs/hooks' },
    ],
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/umijs/hooks' },
    ],
  },
});
