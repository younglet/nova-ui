# Tabs 标签页

## 效果预览

<div class="tabs my-4">
  <div class="tab active" onclick="activateTab(this)">实时数据</div>
  <div class="tab" onclick="activateTab(this)">历史趋势</div>
  <div class="tab" onclick="activateTab(this)">告警日志</div>
</div>

<div class="bg-white border border-t-0 rounded-b p-4 text-sm text-gray-500">
  当前选中：实时数据
</div>

<div class="tabs tabs-boxed my-4">
  <div class="tab active">日</div>
  <div class="tab">周</div>
  <div class="tab">月</div>
  <div class="tab">年</div>
</div>

---

## 极简代码

```html
<div class="tabs">
  <div class="tab active">实时</div>
  <div class="tab">历史</div>
</div>
```

激活需要 JS：

```js
function activate(el) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
  el.classList.add('active')
}
```

---

## 修改和应用

### 两种变体

| class | 效果 |
|---|---|
| `.tabs` | 默认（下划线样式） |
| `.tabs-boxed` | 背景容器样式（紧凑） |

效果：

<div class="tabs my-2">
  <div class="tab active">下划线</div>
  <div class="tab">样式</div>
</div>

<div class="tabs tabs-boxed my-2">
  <div class="tab active">背景容器</div>
  <div class="tab">样式</div>
</div>

### 颜色

默认 active 是蓝色。改 `.tab.active` 的 CSS 即可：

```css
.tab.active { color: var(--green-500); border-bottom-color: var(--green-500); }
```

---

## 实际场景

### 视图切换

```html
<div class="tabs mb-4">
  <div class="tab active" onclick="switchTab('a', this)">视图 A</div>
  <div class="tab" onclick="switchTab('b', this)">视图 B</div>
</div>

<div id="panel-a">视图 A 的内容</div>
<div id="panel-b" style="display: none;">视图 B 的内容</div>

<script>
  function switchTab(panelId, el) {
    el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    el.classList.add('active')
    document.getElementById('panel-a').style.display = panelId === 'a' ? 'block' : 'none'
    document.getElementById('panel-b').style.display = panelId === 'b' ? 'block' : 'none'
  }
</script>
```

### 时间筛选（紧凑样式）

```html
<div class="tabs tabs-boxed">
  <div class="tab active" onclick="activate(this)">今日</div>
  <div class="tab" onclick="activate(this)">本周</div>
  <div class="tab" onclick="activate(this)">本月</div>
  <div class="tab" onclick="activate(this)">本年</div>
</div>
```

效果：

<div class="tabs tabs-boxed my-4">
  <div class="tab active">今日</div>
  <div class="tab">本周</div>
  <div class="tab">本月</div>
  <div class="tab">本年</div>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 标签切换不绑 JS | 用 onclick + activate 函数切换 .active |
| 改 tab 文字颜色硬编码 | 改 `.tab.active` CSS 用 `--var` |
| Tabs 里塞很长的标签 | Tabs 标签要短（1-4 字） |

---

## 下一步

- 🪟 [Modal 弹窗](/components/modal)
- 🔔 [Toast 通知](/components/toast)