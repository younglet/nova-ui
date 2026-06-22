---
layout: home

hero:
  name: "Nova UI"
  text: "IoT 设备组件库"
  tagline: "20 个静态 CSS 组件 + 5 个 <nova-*> 自定义元素 · 给 ESP32 + nova-server 用"
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /guide/install
    - theme: alt
      text: 🎨 查看组件
      link: /components/button
    - theme: alt
      text: ⚡ 自定义元素
      link: /components/dynamic/index

features:
  - icon: 🧩
    title: 即开即用
    details: 不再写 <code>px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 ...</code>，组件 class 一行搞定
  - icon: 🎨
    title: 基于 Nova Style
    details: 复用颜色 token、暗色模式、间距系统，组件自动跟随主题切换
  - icon: 📦
    title: 零依赖
    details: 纯 CSS，约 12KB。无需打包工具，无需 JavaScript 框架
  - icon: 🔌
    title: IoT 场景专用
    details: 内置 sensor-card、device-card、switch、status-dot 等物联网专用组件
  - icon: 🌙
    title: 暗色模式免费
    details: 加一行 <code>.dark</code> 类，全站变深色，组件自动适配
  - icon: 📋
    title: 复制粘贴
    details: 把整个 nova-ui/ 文件夹复制到项目，引入两个 CSS 文件，就能用
---

## 快速预览

```html
<link rel="stylesheet" href="nova-style.css">
<link rel="stylesheet" href="nova-ui.css">

<button class="btn btn-primary">保存</button>

<div class="sensor-card">
  <div class="sensor-label">温度</div>
  <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
  <div class="sensor-status sensor-status-normal">↑ 正常</div>
</div>

<label class="switch">
  <input type="checkbox" checked>
  <span class="switch-slider"></span>
</label>
```

<div class="nova-demo">
  <div class="nova-demo-header">实时效果（同一个 HTML 代码）</div>
  <div class="nova-demo-body">
    <button class="btn btn-primary">保存</button>
    <div class="sensor-card inline-block">
      <div class="sensor-label">温度</div>
      <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
      <div class="sensor-status sensor-status-normal">↑ 正常</div>
    </div>
    <label class="switch">
      <input type="checkbox" checked>
      <span class="switch-slider"></span>
    </label>
    <span class="status-dot status-online"></span>
    <span class="badge badge-success">在线</span>
  </div>
</div>

---

## 动态组件（自定义元素）

引入 [`novajs.js`](https://github.com/) + `nova-ui-elements.js`，用 `<nova-switch model="power">` 这种 HTML 标签——**自动响应式、自动防抖、自动事件**。

```html
<link rel="stylesheet" href="nova-style.css">
<link rel="stylesheet" href="nova-ui.css">
<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>

<nova-switch model="power" variant="primary"></nova-switch>
<nova-slider model="brightness" debounce="400"></nova-slider>
<nova-knob model="brightness" size="120"></nova-knob>
<nova-modal show="open" title="编辑">
  <p>内容</p>
  <button slot="footer">保存</button>
</nova-modal>

<script>
  nova({ data: { power: false, brightness: 50, open: false } })
</script>
```

**5 个内置元素**：`<nova-switch>` / `<nova-slider>` / `<nova-knob>` / `<nova-input-mask>` / `<nova-modal>`。

→ [详细文档（概念 + 原理 + 引入）](/components/dynamic/index) · [组件列表](/components/dynamic/nova-switch)

---

## 组件库

<div class="nova-grid-cards">
  <a href="/components/button" class="nova-grid-card">
    <div class="nova-grid-card-title">💡 Button</div>
    <div class="nova-grid-card-desc">7 种颜色 × 3 种尺寸 × 3 种形状</div>
    <div class="nova-grid-card-preview">
      <button class="btn btn-primary">主按钮</button>
    </div>
  </a>

  <a href="/components/sensor-card" class="nova-grid-card">
    <div class="nova-grid-card-title">🌡️ Sensor Card</div>
    <div class="nova-grid-card-desc">IoT 传感器卡片（标签+数值+单位+状态）</div>
    <div class="nova-grid-card-preview">
      <div class="sensor-card inline-block">
        <div class="sensor-label">温度</div>
        <div class="sensor-value" style="font-size: 24px;">24.5<span class="sensor-unit">°C</span></div>
      </div>
    </div>
  </a>

  <a href="/components/device-card" class="nova-grid-card">
    <div class="nova-grid-card-title">🔌 Device Card</div>
    <div class="nova-grid-card-desc">IoT 设备控制卡片</div>
    <div class="nova-grid-card-preview">
      <div class="device-card inline-block">
        <div class="device-card-header">
          <div class="device-card-title" style="font-size: 12px;">💡 客厅灯</div>
          <span class="device-card-status device-card-status-on"></span>
        </div>
        <div class="device-card-actions">
          <label class="switch" style="transform: scale(0.7);">
            <input type="checkbox" checked>
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>
    </div>
  </a>

  <a href="/components/switch" class="nova-grid-card">
    <div class="nova-grid-card-title">🔘 Switch</div>
    <div class="nova-grid-card-desc">纯 CSS 滑动开关，IoT 设备控制</div>
    <div class="nova-grid-card-preview">
      <label class="switch">
        <input type="checkbox" checked>
        <span class="switch-slider"></span>
      </label>
    </div>
  </a>

  <a href="/components/status" class="nova-grid-card">
    <div class="nova-grid-card-title">⚪ Status Dot</div>
    <div class="nova-grid-card-desc">LED 状态指示灯（含脉冲动画）</div>
    <div class="nova-grid-card-preview" style="gap: 12px;">
      <span class="status-dot status-online status-pulse"></span>
      <span class="status-dot status-online"></span>
      <span class="status-dot status-warning"></span>
      <span class="status-dot status-error"></span>
    </div>
  </a>

  <a href="/components/badge" class="nova-grid-card">
    <div class="nova-grid-card-title">🏷️ Badge</div>
    <div class="nova-grid-card-desc">状态徽章，5 种语义颜色</div>
    <div class="nova-grid-card-preview" style="gap: 6px;">
      <span class="badge badge-success">在线</span>
      <span class="badge badge-error">故障</span>
      <span class="badge badge-warning">警告</span>
    </div>
  </a>

  <a href="/components/card" class="nova-grid-card">
    <div class="nova-grid-card-title">📊 Card</div>
    <div class="nova-grid-card-desc">通用内容容器</div>
    <div class="nova-grid-card-preview">
      <div class="card inline-block">
        <div class="card-body">
          <div class="card-title" style="font-size: 14px;">卡片标题</div>
          <div class="text-xs text-gray-500">内容</div>
        </div>
      </div>
    </div>
  </a>

  <a href="/components/alert" class="nova-grid-card">
    <div class="nova-grid-card-title">📢 Alert</div>
    <div class="nova-grid-card-desc">4 种类型的提示框</div>
    <div class="nova-grid-card-preview">
      <div class="alert alert-info" style="font-size: 12px; padding: 6px 10px;">
        💡 提示信息
      </div>
    </div>
  </a>

  <a href="/components/stat" class="nova-grid-card">
    <div class="nova-grid-card-title">📈 Stat</div>
    <div class="nova-grid-card-desc">统计数据展示（大数字 + 标签）</div>
    <div class="nova-grid-card-preview">
      <div class="stat" style="padding: 0;">
        <div class="stat-title" style="font-size: 11px;">用电</div>
        <div class="stat-value" style="font-size: 22px;">128<span class="stat-unit">度</span></div>
      </div>
    </div>
  </a>

  <a href="/components/progress" class="nova-grid-card">
    <div class="nova-grid-card-title">📊 Progress</div>
    <div class="nova-grid-card-desc">进度条，4 色 × 3 尺寸</div>
    <div class="nova-grid-card-preview" style="flex-direction: column; width: 100%;">
      <div class="progress progress-success w-full" style="width: 100%;"><div class="progress-bar" style="width: 80%"></div></div>
      <div class="progress progress-primary w-full" style="width: 100%;"><div class="progress-bar" style="width: 60%"></div></div>
    </div>
  </a>

  <a href="/components/modal" class="nova-grid-card">
    <div class="nova-grid-card-title">🪟 Modal</div>
    <div class="nova-grid-card-desc">模态弹窗，配合少量 JS</div>
    <div class="nova-grid-card-preview">
      <button class="btn btn-primary btn-sm">打开弹窗</button>
    </div>
  </a>

  <a href="/components/toast" class="nova-grid-card">
    <div class="nova-grid-card-title">🔔 Toast</div>
    <div class="nova-grid-card-desc">短时弹出通知</div>
    <div class="nova-grid-card-preview" style="flex-direction: column; align-items: flex-start; width: 100%;">
      <div class="toast toast-success" style="font-size: 12px; padding: 6px 10px; min-width: 0;">✅ 保存成功</div>
      <div class="toast toast-error" style="font-size: 12px; padding: 6px 10px; min-width: 0;">❌ 连接失败</div>
    </div>
  </a>

  <a href="/components/navbar" class="nova-grid-card">
    <div class="nova-grid-card-title">📱 Navbar</div>
    <div class="nova-grid-card-desc">顶部导航栏</div>
    <div class="nova-grid-card-preview" style="width: 100%; padding: 8px;">
      <div class="navbar navbar-dark" style="font-size: 12px; padding: 8px;">
        <div class="navbar-brand">🏠 智能家居</div>
        <span class="status-dot status-online"></span>
      </div>
    </div>
  </a>

  <a href="/components/drawer" class="nova-grid-card">
    <div class="nova-grid-card-title">📐 Drawer</div>
    <div class="nova-grid-card-desc">侧边栏 + 主内容布局</div>
    <div class="nova-grid-card-preview">
      <span class="text-sm text-gray-500">侧边导航布局</span>
    </div>
  </a>

  <a href="/components/tabs" class="nova-grid-card">
    <div class="nova-grid-card-title">📑 Tabs</div>
    <div class="nova-grid-card-desc">标签页切换</div>
    <div class="nova-grid-card-preview">
      <div class="tabs tabs-boxed" style="font-size: 12px;">
        <div class="tab active">日</div>
        <div class="tab">周</div>
        <div class="tab">月</div>
      </div>
    </div>
  </a>

  <a href="/components/loading" class="nova-grid-card">
    <div class="nova-grid-card-title">⏳ Loading</div>
    <div class="nova-grid-card-desc">加载动画，4 色 × 3 尺寸</div>
    <div class="nova-grid-card-preview" style="gap: 12px;">
      <span class="loading loading-primary"></span>
      <span class="loading loading-success"></span>
      <span class="loading loading-warning"></span>
      <span class="loading loading-error"></span>
    </div>
  </a>

  <a href="/components/avatar" class="nova-grid-card">
    <div class="nova-grid-card-title">👤 Avatar</div>
    <div class="nova-grid-card-desc">头像，3 种尺寸</div>
    <div class="nova-grid-card-preview" style="gap: 8px;">
      <div class="avatar avatar-sm">A</div>
      <div class="avatar">B</div>
      <div class="avatar" style="background-color: var(--blue-500); color: white;">C</div>
    </div>
  </a>

  <a href="/components/breadcrumb" class="nova-grid-card">
    <div class="nova-grid-card-title">🧭 Breadcrumb</div>
    <div class="nova-grid-card-desc">面包屑导航</div>
    <div class="nova-grid-card-preview" style="font-size: 12px;">
      <div class="breadcrumb">
        <span>首页</span>
        <span class="breadcrumb-separator">/</span>
        <span>设备</span>
        <span class="breadcrumb-separator">/</span>
        <span class="active">客厅灯</span>
      </div>
    </div>
  </a>

  <a href="/components/divider" class="nova-grid-card">
    <div class="nova-grid-card-title">➖ Divider</div>
    <div class="nova-grid-card-desc">分割线</div>
    <div class="nova-grid-card-preview" style="width: 100%;">
      <hr class="divider" style="margin: 0;">
    </div>
  </a>

  <a href="/components/input" class="nova-grid-card">
    <div class="nova-grid-card-title">🔍 Input Group</div>
    <div class="nova-grid-card-desc">带前后缀的输入框</div>
    <div class="nova-grid-card-preview" style="width: 100%;">
      <div class="input-group" style="font-size: 12px;">
        <span class="input-group-addon">🔍</span>
        <input type="text" placeholder="搜索...">
      </div>
    </div>
  </a>
</div>

---

## 完整 IoT 控制台示例

打开 `examples/08-complete-app.html` 看一个真实可用的智能家居控制台（含设备开关、传感器实时数据、暗色模式切换、Toast 通知）。

<div class="nova-demo">
  <div class="nova-demo-header">实时截图预览</div>
  <div class="nova-demo-body" style="display: block; padding: 0;">
    <div style="background: linear-gradient(135deg, #1f2937, #374151); padding: 16px; color: white; border-radius: 8px;">
      <div class="flex justify-between items-center mb-4">
        <div class="font-bold">🏠 智能家居</div>
        <span class="status-dot status-online status-pulse"></span>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div class="sensor-card" style="text-align: center;">
          <div class="sensor-label">空气温度</div>
          <div class="sensor-value" style="font-size: 24px;">24.5<span class="sensor-unit">°C</span></div>
        </div>
        <div class="sensor-card" style="text-align: center;">
          <div class="sensor-label">空气湿度</div>
          <div class="sensor-value" style="font-size: 24px; color: var(--blue-500);">65<span class="sensor-unit">%</span></div>
        </div>
        <div class="sensor-card" style="text-align: center;">
          <div class="sensor-label">PM2.5</div>
          <div class="sensor-value" style="font-size: 24px; color: var(--green-500);">35</div>
        </div>
      </div>
    </div>
  </div>
</div>

[📂 查看完整代码 →](/examples/08-complete-app.html)

---

## 下一步

- 🚀 [5 分钟上手](/guide/install)
- 🧩 [浏览全部组件](/components/button)
- 🎨 [了解 Nova Style 工具类](https://nova-style.com)
- 📂 [复制 8 个 HTML 案例](/examples/01-buttons.html)