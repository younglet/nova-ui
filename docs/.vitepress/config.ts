import { defineConfig } from 'vitepress'

// GitHub Pages project site uses /<repo>/ subpath; keep '/' for local dev.
const base = process.env.GITHUB_ACTIONS ? '/nova-ui/' : '/'

export default defineConfig({
  base,
  title: 'Nova UI',
  description: 'IoT 设备组件库（CSS 静态组件 + <nova-*> 自定义元素）。配套 novajs + nova-style，给 ESP32 + MicroPython server 用。',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'stylesheet', href: '/nova-style.css' }],
    ['link', { rel: 'stylesheet', href: '/nova-ui.css' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }]
  ],

  themeConfig: {
    siteTitle: 'Nova UI',

    nav: [
      { text: '指南', link: '/guide/install', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: '自定义元素', link: '/components/dynamic/index', activeMatch: '/components/dynamic' },
      { text: '案例', link: '/examples/01-buttons.html', activeMatch: '/examples/' },
      {
        text: '生态',
        items: [
          { text: 'novajs', link: 'http://novajs.localhost' },
          { text: 'Nova Style', link: 'http://nova-style.localhost' },
          { text: 'Nova UI', link: 'http://nova-ui.localhost' },
          { text: 'NovaChart', link: 'http://nova-chart.localhost' },
          { text: 'Nova Server', link: 'https://github.com/' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '介绍', link: '/guide/install' },
            { text: '设计哲学', link: '/guide/philosophy' },
            { text: '暗色模式', link: '/guide/dark-mode' },
            { text: '主题定制', link: '/guide/theming' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Badge 徽章', link: '/components/badge' },
            { text: 'Alert 提示框', link: '/components/alert' },
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' }
          ]
        },
        {
          text: '数据展示',
          items: [
            { text: 'Stat 数据', link: '/components/stat' },
            { text: 'Sensor Card 传感器', link: '/components/sensor-card' },
            { text: 'Device Card 设备', link: '/components/device-card' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Loading 加载', link: '/components/loading' }
          ]
        },
        {
          text: '状态与交互',
          items: [
            { text: 'Status 状态点', link: '/components/status' },
            { text: 'Switch 开关（静态 CSS）', link: '/components/switch' },
            { text: 'Input 输入框组合', link: '/components/input' },
            { text: 'Modal 弹窗（静态 CSS）', link: '/components/modal' },
            { text: 'Toast 通知', link: '/components/toast' }
          ]
        },
        {
          text: '布局',
          items: [
            { text: 'Navbar 顶栏', link: '/components/navbar' },
            { text: 'Drawer 侧边栏', link: '/components/drawer' },
            { text: 'Tabs 标签页', link: '/components/tabs' }
          ]
        }
      ],
      '/components/dynamic/': [
        {
          text: '自定义元素',
          items: [
            { text: '概念', link: '/components/dynamic/index' },
            { text: '原理', link: '/components/dynamic/principle' },
            { text: '引入', link: '/components/dynamic/setup' },
            { text: '‹nova-switch›', link: '/components/dynamic/nova-switch' },
            { text: '‹nova-slider›', link: '/components/dynamic/nova-slider' },
            { text: '‹nova-input-mask›', link: '/components/dynamic/nova-input-mask' },
            { text: '‹nova-knob›', link: '/components/dynamic/nova-knob' },
            { text: '‹nova-modal›', link: '/components/dynamic/nova-modal' },
            { text: '‹nova-tabs›', link: '/components/dynamic/nova-tabs' },
            { text: '‹nova-tag-input›', link: '/components/dynamic/nova-tag-input' },
            { text: '‹nova-color-picker›', link: '/components/dynamic/nova-color-picker' },
            { text: '‹nova-thermostat›', link: '/components/dynamic/nova-thermostat' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    footer: {
      message: '专为 NovaMP 2.0 设计 · powered by stemstar',
      copyright: ''
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '本页内容'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  },

  server: {
    host: '0.0.0.0',
    port: 5175,
    allowedHosts: ['novajs.localhost', 'nova-style.localhost', 'nova-ui.localhost', 'nova-chart.localhost', 'localhost']
  }
})