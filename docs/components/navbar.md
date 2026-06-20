# Navbar 顶栏

## 效果预览

<div class="navbar my-2 rounded">
  <div class="navbar-brand">🏠 智能家居</div>
  <div class="navbar-actions">
    <span class="status-dot status-online"></span>
    <span>在线</span>
  </div>
</div>

<div class="navbar navbar-dark my-2 rounded">
  <div class="navbar-brand">🌡️ 实验室环境监控</div>
  <div class="navbar-actions">
    <span class="status-dot status-online status-pulse"></span>
    <span class="text-sm">5 台设备在线</span>
    <button class="btn btn-sm" style="background-color: var(--gray-700); color: white;">⚙️ 设置</button>
  </div>
</div>

---

## 极简代码

```html
<div class="navbar">
  <div class="navbar-brand">🏠 智能家居</div>
  <div class="navbar-actions">
    <button class="btn btn-primary btn-sm">登录</button>
  </div>
</div>
```

---

## 修改和应用

### 子元素

| class | 作用 |
|---|---|
| `.navbar` | 容器（白底 + 下边框） |
| `.navbar-dark` | 变体：深色背景 |
| `.navbar-brand` | 左上品牌/标题 |
| `.navbar-actions` | 右侧操作容器 |

### 改主题

```html
<div class="navbar">           <!-- 浅色（默认） -->
<div class="navbar navbar-dark">  <!-- 深色 -->
```

效果对比：

<div class="navbar my-2 rounded">
  <div class="navbar-brand">浅色</div>
  <div class="navbar-actions"><span class="text-sm">操作</span></div>
</div>

<div class="navbar navbar-dark my-2 rounded">
  <div class="navbar-brand">深色</div>
  <div class="navbar-actions"><span class="text-sm">操作</span></div>
</div>

---

## 实际场景

### 浅色 navbar（普通站点）

```html
<div class="navbar">
  <div class="navbar-brand">🏠 智能家居</div>
  <div class="navbar-actions">
    <input type="text" placeholder="搜索..." style="padding: 0.375rem 0.75rem; border: 1px solid var(--nova-border); border-radius: 0.5rem;">
    <button class="btn btn-primary btn-sm">登录</button>
  </div>
</div>
```

效果：

<div class="navbar my-2 rounded">
  <div class="navbar-brand">🏠 智能家居</div>
  <div class="navbar-actions">
    <input type="text" placeholder="搜索..." style="padding: 0.375rem 0.75rem; border: 1px solid var(--nova-border); border-radius: 0.5rem;">
    <button class="btn btn-primary btn-sm">登录</button>
  </div>
</div>

### 深色 navbar（IoT 仪表盘最常用）

```html
<div class="navbar navbar-dark">
  <div class="navbar-brand">🌡️ 实验室环境</div>
  <div class="navbar-actions">
    <span class="status-dot status-online status-pulse"></span>
    <span class="text-sm">5 台在线</span>
    <button class="btn btn-sm" style="background-color: var(--gray-700); color: white;">设置</button>
  </div>
</div>
```

效果看顶部预览。

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| Navbar 里塞很多东西 | Navbar 只放品牌 + 主要操作 |
| 用 `<header>` 自定义样式 | 直接用 `.navbar` 类 |
| 深色 navbar 文字还是黑色 | 深色 navbar 自动白字 |

---

## 下一步

- 📐 [Drawer 侧边栏布局](/components/drawer)
- 📑 [Tabs 标签页](/components/tabs)