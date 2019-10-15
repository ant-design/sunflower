const enDocs = [
  'overview'
]

const zhDocs = [
  './zh/overview'
]

const enHooks = [
  './hooks/sunflower-antd-cascade-select',
  './hooks/sunflower-antd-form',
  './hooks/sunflower-antd-form-table',
  './hooks/sunflower-antd-modal',
  './hooks/sunflower-antd-modal-form'
]

const zhHooks = [
  './zh/hooks/sunflower-antd-cascade-select',
  './zh/hooks/sunflower-antd-form',
  './zh/hooks/sunflower-antd-form-table',
  './zh/hooks/sunflower-antd-modal',
  './zh/hooks/sunflower-antd-modal-form'
]

module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  // 网站被部署到非根路径时需要设置
  base: '/sunflower/',

  markdown: {
    lineNumbers: true
  },

  plugins: [
    ['@vuepress/google-analytics', {
      'ga': '' // UA-00000000-0
    }],
    ['@vuepress/back-to-top'],
    ['@vuepress/active-header-links']
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Sunflower',
      description: 'A react-hooks + antd library from Alipay Industry Technology department'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Sunflower',
      description: '支付宝行业技术部开源的 React-Hooks + antd 库'
    }
  },

  themeConfig: {
    repo: 'ant-design/sunflower',
    docsRepo: 'ant-design/sunflower',
    docsDir: 'docs',
    editLinks: true,
    markdown: {
      html: true,
      toc: { includeLevel: [1, 2] },
      // config: md => {
      //   // 使用更多的 markdown-it 插件!
      //   md.use(require('markdown-it-katex'))
      // }
    },
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        sidebar: {
          '/': [
            {
              title: 'Overview',
              collapsable: false,
              children: enDocs
            },
            {
              title: 'Hooks',
              collapsable: false,
              children: enHooks
            } 
          ]
        }
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 文档上次更新时间
        lastUpdated: '上次更新',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
        sidebar: {
          '/': [
            {
              title: '项目概览',
              collapsable: false,
              children: zhDocs
            },
            {
              title: 'Hooks',
              collapsable: false,
              children: zhHooks
            } 
          ]
        }
      }
    }
  }
}
