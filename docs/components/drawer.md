# Drawer 侧边栏布局

## 效果预览

<div class="drawer my-2 rounded overflow-hidden" style="height: 280px; border: 1px solid var(--nova-border);">
  <aside class="drawer-side">
    <div class="font-bold text-lg mb-3">🏠 智能家居</div>
    <div class="menu-item active"><span>📊</span><span>仪表盘</span></div>
    <div class="menu-item"><span>💡</span><span>设备</span></div>
    <div class="menu-item"><span>📈</span><span>历史数据</span></div>
    <div class="menu-item"><span>⚙️</span><span>设置</span></div>
  </aside>
  <main class="drawer-content">
    <h3 class="text-lg font-bold mb-2">主内容区</h3>
    <p class="text-sm text-gray-500">左侧菜单点击会高亮（JS 控制 .active）</p>
  </main>
</div>

---

## 极简代码

```html
<div class="drawer">
  <aside class="drawer-side">
    <!-- 菜单 -->
  </aside>
  <main class="drawer-content">
    <!-- 主内容 -->
  </main>
</div>
```

---

## 修改和应用

### 子元素

| class | 作用 |
|---|---|
| `.drawer` | 容器（flex 横排） |
| `.drawer-side` | 左侧菜单（固定 16rem 宽） |
| `.drawer-content` | 右侧主内容（自动占满剩余） |
| `.menu-item` | 菜单项 |
| `.menu-item.active` | 选中态 |
| `.menu-title` | 菜单分组标题 |

### 菜单激活（需要 JS）

```js
function activate(el) {
  el.parentElement.querySelectorAll('.menu-item')
    .forEach(i => i.classList.remove('active'))
  el.classList.add('active')
}
```

给菜单项加 `onclick="activate(this)"`：

```html
<div class="menu-item active" onclick="activate(this)">📊 仪表盘</div>
<div class="menu-item" onclick="activate(this)">💡 设备</div>
```

---

## 实际场景

### 完整后台布局

```html
<div class="drawer" style="min-height: 100vh;">
  <aside class="drawer-side">
    <div class="font-bold text-lg mb-4">🏠 智能家居</div>

    <div class="menu-title">主导航</div>
    <div class="menu-item active" onclick="activate(this)">
      <span>📊</span><span>仪表盘</span>
    </div>
    <div class="menu-item" onclick="activate(this)">
      <span>💡</span><span>设备</span>
    </div>

    <div class="menu-title">系统</div>
    <div class="menu-item" onclick="activate(this)">
      <span>⚙️</span><span>设置</span>
    </div>
  </aside>

  <main class="drawer-content">
    <!-- 主内容 -->
  </main>
</div>
```

效果看顶部预览。

### 简化版（无菜单标题）

```html
<aside class="drawer-side">
  <div class="menu-item active">🏠 首页</div>
  <div class="menu-item">📊 数据</div>
  <div class="menu-item">⚙️ 设置</div>
</aside>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 自己写 `<style>` 改 sidebar 宽度 | `.drawer-side` 已固定 16rem |
| 菜单不绑 JS 切换 | 用 onclick + activate 函数 |
| Drawer 用在移动端做导航 | Drawer 是桌面布局，移动端用汉堡菜单 |

---

## 下一步

- 📱 [Navbar 顶栏](/components/navbar)
- 📑 [Tabs 标签页](/components/tabs)