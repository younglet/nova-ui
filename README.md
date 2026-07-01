# Nova UI

[![License](https://img.shields.io/github/license/younglet/nova-ui)](https://github.com/younglet/nova-ui/blob/main/LICENSE) [![GitHub stars](https://img.shields.io/github/stars/younglet/nova-ui.svg)](https://github.com/younglet/nova-ui) [![Docs](https://img.shields.io/badge/Docs-nova-ui.app-blueviolet.svg)](https://younglet.github.io/nova-ui/) ![Size](https://img.shields.io/badge/Size-21KB_min-orange.svg)

> IoT 组件库。20 个 CSS 静态组件 + 5 个 `<nova-*>` 自定义元素。
> 给烧了 MicroPython 的 ESP32 当 HTTP server 时的前端三件套之一。
> 配套 [novajs](https://github.com/younglet/novajs) + [nova-style](https://github.com/younglet/nova-style)。
> 后端推荐 [**nova-server**](https://github.com/younglet/nova-server)（MicroPython 异步 Web 框架）。

## ✨ 特点

- 🧩 **20 个静态组件** — `class="btn btn-primary"` 直接用，复制粘贴即可
- ⚡ **9 个动态组件** — `<nova-switch model="power">` 响应式，PrimeVue / Element 风格
- 🎨 **基于 Nova Style** — 自动复用 nova-style.css 的颜色 token 和暗色模式
- 📦 **零依赖** — 纯 CSS + 原生 Custom Elements，约 23KB CSS + 11KB JS
- 🎯 **IoT 场景优化** — 内置 `sensor-card` / `device-card` / `switch` / `status-dot` 等

## 📦 包含什么组件？

| 分类 | 组件 |
|---|---|
| **基础** | Button, Card, Badge, Alert, Avatar, Divider, Breadcrumb |
| **数据展示** | Stat, Sensor Card, Device Card, Progress, Loading |
| **状态** | Status Dot (LED), Switch (开关), Badge |
| **布局** | Navbar, Drawer (侧边栏), Tabs |
| **交互** | Modal, Toast, Input Group |

## 🚀 快速开始

### 1. 引入两个 CSS 文件

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="nova-style.css">  <!-- 必须先引入 -->
  <link rel="stylesheet" href="nova-ui.css">     <!-- 组件库 -->
</head>
<body>
  <button class="btn btn-primary">保存</button>
</body>
</html>
```

> ⚠️ nova-ui.css 依赖 nova-style.css 的 CSS 变量。**顺序很重要**：nova-style.css 必须在 nova-ui.css 之前。

### 2. 跑文档站（可选）

```bash
npm install
npm run docs:dev        # 开发模式 http://localhost:5173
npm run docs:build      # 静态构建到 docs/.vitepress/dist/
npm run docs:preview    # 预览生产构建
```

文档站基于 VitePress，包含完整组件参考 + 20 个组件实时演示 + 暗色模式。

### 3. 开始使用组件

```html
<!-- 按钮 -->
<button class="btn btn-primary">保存</button>
<button class="btn btn-error btn-sm">删除</button>

<!-- 卡片 -->
<div class="card">
  <div class="card-body">
    <h3 class="card-title">标题</h3>
    <p>内容</p>
  </div>
</div>

<!-- 传感器卡片（IoT 场景） -->
<div class="sensor-card">
  <div class="sensor-label">温度</div>
  <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
  <div class="sensor-status sensor-status-normal">↑ 正常</div>
</div>

<!-- 状态点 -->
<span class="status-dot status-online"></span>在线

<!-- 开关 -->
<label class="switch">
  <input type="checkbox" checked>
  <span class="switch-slider"></span>
</label>

<!-- 加载中 -->
<span class="loading loading-primary"></span>
```

### 3. 完整的 IoT 控制台示例

```html
<!DOCTYPE html>
<html class="dark">  <!-- 暗色模式只需加 .dark -->
<head>
  <link rel="stylesheet" href="nova-style.css">
  <link rel="stylesheet" href="nova-ui.css">
</head>
<body>

  <div class="navbar navbar-dark">
    <div class="navbar-brand">🌡️ 智能家居</div>
    <div class="navbar-actions">
      <span class="status-dot status-online status-pulse"></span>
      <span>在线</span>
    </div>
  </div>

  <div class="p-4">
    <!-- 传感器网格 -->
    <div class="grid grid-cols-3 gap-4">
      <div class="sensor-card">
        <div class="sensor-label">温度</div>
        <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
        <div class="sensor-status sensor-status-normal">↑ 正常</div>
      </div>
      <div class="sensor-card">
        <div class="sensor-label">湿度</div>
        <div class="sensor-value text-blue-500" style="color: var(--blue-500)">65<span class="sensor-unit">%</span></div>
        <div class="sensor-status sensor-status-normal">↑ 正常</div>
      </div>
      <div class="sensor-card">
        <div class="sensor-label">PM2.5</div>
        <div class="sensor-value" style="color: var(--green-500)">35</div>
        <div class="sensor-status sensor-status-normal">↑ 优</div>
      </div>
    </div>

    <!-- 设备控制 -->
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="device-card">
        <div class="device-card-header">
          <div class="device-card-title">💡 客厅灯</div>
          <span class="device-card-status device-card-status-on"></span>
        </div>
        <div class="device-card-actions">
          <label class="switch">
            <input type="checkbox" checked>
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
```

## 📂 项目结构

```
nova-ui/
├── AGENTS.md             ← AI 助手指南
├── README.md             ← 本文件
├── package.json          ← build / docs:* 脚本
│
├── src/                  ← 主代码（发布物）
│   ├── nova-style.css    ← 12KB 源（已包含）
│   ├── nova-style.min.css ← 7KB min
│   ├── nova-ui.css        ← 23KB 源
│   ├── nova-ui.min.css    ← 13KB min
│   ├── novajs.js          ← 18KB 源（同步自 novajs 项目）
│   ├── novajs.min.js      ← 9KB min
│   ├── nova-ui-elements.js   ← 18KB 自定义元素源
│   └── nova-ui-elements.min.js ← 11KB min
│
├── docs/                 ← VitePress 文档站（docs/components/ + docs/guide/）
│   └── public/            ← iframe demo 用的静态资源（与 src/ 同步）
│
├── usage/               ← 可直接复制粘贴的 HTML 案例（14 个 + index.novaui.html 部署模板）
│   ├── 01-buttons.html ~ 14-thermostat.html
│   └── index.novaui.html
│
└── test/                 ← 22 个 jsdom 测试
    │   ├── config.ts            ← 站点配置（导航/侧边栏）
    │   └── theme/
    │       ├── index.ts
    │       └── style.css        ← 自定义主题（daisyui 风格）
    ├── index.md                 ← 首页（20 个组件预览）
    ├── guide/                   ← 指南
    │   ├── install.md
    │   ├── philosophy.md
    │   ├── dark-mode.md
    │   └── theming.md
    ├── components/              ← 20 个组件详细文档
    │   ├── button.md · card.md · badge.md · alert.md
    │   ├── sensor-card.md · device-card.md · switch.md · status.md
    │   ├── modal.md · toast.md · loading.md · progress.md · stat.md
    │   ├── navbar.md · drawer.md · tabs.md
    │   └── avatar.md · breadcrumb.md · divider.md · input.md
    └── public/                  ← 静态资源（被 docs/ 引用）
        ├── nova-style.css
        ├── nova-ui.css
        └── examples/            ← HTML 案例复制（站点用）
```

**自包含**：把整个 `nova-ui/` 文件夹复制到项目里就能用，不需要另外下载 nova-style。

## 🎓 学习路径

| 步骤 | 看什么 | 学到什么 |
|:---:|---|---|
| 1 | `usage/01-buttons.html` | 按钮所有变体 |
| 2 | `usage/02-cards.html` | 卡片、徽章、提示框 |
| 3 | `usage/03-forms.html` | 输入框、开关、加载 |
| 4 | `usage/04-modals.html` | 弹窗、通知 |
| 5 | `usage/05-navigation.html` | 导航栏、侧边栏、标签页 |
| 6 | `usage/06-status.html` | 状态点、进度条、面包屑 |
| 7 | `usage/07-dashboard.html` | 综合 IoT 仪表盘 |
| 8 | `usage/08-complete-app.html` | 完整智能家居控制台 |

## 🧩 自定义

想要新组件？参考 [nova-style 的扩展指南](https://github.com/younglet/nova-style)，在 `nova-ui.css` 末尾添加：

```css
.my-component {
  /* 引用 nova-style 的 CSS 变量 */
  background-color: var(--nova-surface);
  padding: 1rem;
  border-radius: 0.5rem;
}
```

## 🤝 配合 nova-style 使用

Nova UI 是 nova-style 的**组件层**——你完全可以混用：

```html
<!-- 组件 + 工具类 -->
<button class="btn btn-primary mt-4 w-full">占满宽度的按钮</button>

<div class="card shadow-lg">                <!-- 用 nova-style 的 shadow-lg -->
  <div class="card-body">
    <h3 class="card-title">标题</h3>
  </div>
</div>
```

工具类 + 组件，让你能快速搭出 IoT 控制页面。

## 📜 License

powered by stemstar