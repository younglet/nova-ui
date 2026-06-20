# 暗色模式

Nova UI **免费支持暗色模式**——不需要 `dark:` 前缀，不需要配置，**加一行 `.dark` 类就切换**。

## 一行开启

```html
<html class="dark">
```

或者用 `data-theme` 属性（等价写法）：

```html
<html data-theme="dark">
```

效果对比：

<div class="grid grid-cols-2 gap-4 my-6">
  <div>
    <div class="text-xs text-gray-500 mb-2">☀️ 浅色</div>
    <div class="card">
      <div class="card-body text-center">
        <div class="text-sm text-gray-500">温度</div>
        <div class="text-3xl font-bold">24.5°C</div>
      </div>
    </div>
  </div>
  <div>
    <div class="text-xs text-gray-500 mb-2">🌙 暗色</div>
    <div class="card bg-gray-900" style="color: white;">
      <div class="card-body text-center">
        <div class="text-sm text-gray-500">温度</div>
        <div class="text-3xl font-bold text-white">24.5°C</div>
      </div>
    </div>
  </div>
</div>

**注意：白卡变深卡，文字颜色自动翻转**——你的 HTML 不用动一行。

## 为什么能自动适配？

因为 Nova UI 的所有组件都用 nova-style 的 CSS 变量（`var(--nova-surface)` `var(--nova-text)` 等），这些变量在浅色 / 暗色模式下值不同。

```css
/* nova-style.css */
:root {
  --nova-surface: #ffffff;  /* 浅色：白 */
  --nova-text:    #111827;
}

.dark {
  --nova-surface: #1f2937;  /* 暗色：深灰 */
  --nova-text:    #f9fafb;
}

/* nova-ui.css */
.card {
  background-color: var(--nova-surface);
  color: var(--nova-text);
}
```

切换 `.dark` 时，CSS 变量值变化，所有引用它们的组件自动适配。

## 切换按钮

```html
<button onclick="document.documentElement.classList.toggle('dark')">
  切换暗色
</button>
```

或者更精致一点：

```html
<button id="theme-toggle" class="btn btn-ghost btn-circle">🌙</button>

<script>
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
  })
</script>
```

## 跟随系统偏好

放在 `<head>` 里，页面加载时自动检测系统设置：

```html
<script>
  if (matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
  }
</script>
```

## 哪些组件自动变暗，哪些不变？

| 自动变暗（语义色） | 保持不变（状态色） |
|---|---|
| `.card` `.sensor-card` `.device-card` | `.btn-primary` `.btn-success` 等状态按钮 |
| `.alert` | `.badge-success` 等状态徽章 |
| `.navbar`（默认） | `.status-online` 等状态点 |
| `.modal` `.toast` `.drawer-side` | `.sensor-status-normal` 等状态文字 |
| `.menu-item` `.tab` | |

**规律**：以"基础外观"为目的的组件会变暗（白卡、灰背景、主文字）。以"状态/强调"为目的的组件不变（绿=好、红=坏，不管在哪种模式下都该是这个颜色）。

## 下一步

- 🎨 [主题定制](/guide/theming) — 改色板
- 🧩 [浏览组件](/components/button)