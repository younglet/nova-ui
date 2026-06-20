# 主题定制

Nova UI 的颜色全部基于 CSS 变量，改一个变量就改了整套主题。

## 自定义主题色

不想要默认的蓝/绿/红/黄？**只需在 nova-style.css 里改 `:root`**：

```css
/* nova-style.css */
:root {
  --nova-bg:         #f5f3ff;   /* 页面背景改紫色 */
  --nova-surface:    #ffffff;
  --nova-text:       #1e1b4b;
}

.dark {
  --nova-bg:         #1e1b5b;   /* 暗色下也对应 */
  --nova-surface:    #2e1b5b;
  --nova-text:       #f5f3ff;
}
```

**所有使用 `var(--nova-*)` 的组件自动跟随**——卡片、Modal、Navbar、Drawer 都会变成紫色调。

## 自定义品牌色

按钮、徽章、状态点等用的是 `--blue-500` `--green-500` 等固定色阶。改这些需要直接改色值：

```css
:root {
  --blue-500:  #6366f1;   /* 把蓝改成 indigo */
  --blue-700:  #4338ca;   /* hover 也对应改 */
}
```

**注意**：状态色（绿/红/黄）建议保持不动，否则"绿=好，红=坏"的语义就破坏了。

## 切换主题演示

<div class="grid grid-cols-2 gap-4 my-6">
  <div>
    <div class="text-xs text-gray-500 mb-2">默认主题</div>
    <div class="bg-gray-50 p-4 rounded">
      <button class="btn btn-primary">按钮</button>
      <span class="badge badge-success ml-2">徽章</span>
    </div>
  </div>
  <div>
    <div class="text-xs text-gray-500 mb-2">紫色调（自定义）</div>
    <div class="p-4 rounded" style="background-color: #f5f3ff;">
      <button class="btn btn-primary" style="background-color: #6366f1;">按钮</button>
      <span class="badge badge-success ml-2">徽章</span>
    </div>
  </div>
</div>

## 创建多套主题

定义多个主题 class，按需切换：

```css
/* 主题 1：默认（蓝） */
:root {
  --blue-500: #3b82f6;
}

/* 主题 2：紫色调（加在 .theme-purple 上） */
.theme-purple {
  --blue-500: #8b5cf6;
}

/* 主题 3：绿色调 */
.theme-green {
  --blue-500: #10b981;
}
```

切换：

```html
<html class="theme-purple">
```

或运行时切换：

```js
document.documentElement.classList.remove('theme-green', 'theme-purple')
document.documentElement.classList.add('theme-purple')
```

## 实际例子：番茄钟主题

```css
.theme-tomato {
  --nova-bg:      #fff7ed;
  --nova-surface: #ffffff;
  --nova-text:    #7c2d12;
  
  --blue-500:     #dc2626;   /* 主色变番茄红 */
  --blue-700:     #991b1b;
  
  --green-500:    #f59e0b;   /* 绿变成橙黄 */
  --green-700:    #b45309;
}

.theme-tomato.dark {
  --nova-bg:      #431407;
  --nova-surface: #7c2d12;
  --nova-text:    #fff7ed;
}
```

效果（演示用，实际样式需要按你的设计调整）：

<div class="my-4 p-4 rounded" style="background-color: #fff7ed;">
  <div class="font-bold mb-2" style="color: #7c2d12;">🍅 番茄钟主题</div>
  <button class="btn btn-primary" style="background-color: #dc2626;">开始专注</button>
</div>

## 注意事项

- ✅ 改 `var(--nova-*)` 语义变量：基础色变暗模式自动适配
- ✅ 改 `var(--blue-500)` 等具体色阶：固定色，所有模式都跟着变
- ⚠️ 不要改 `var(--green-500)` 等状态色——破坏"绿=好"的语义
- ⚠️ 改完色值记得测试暗色模式

## 下一步

- 🧩 [浏览组件](/components/button)
- 🌙 [暗色模式](/guide/dark-mode)