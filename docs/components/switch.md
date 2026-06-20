# Switch 开关（IoT 设备控制）

## 效果预览

<div class="flex items-center gap-6 flex-wrap my-4">
  <div class="flex flex-col items-center gap-1">
    <label class="switch"><input type="checkbox"><span class="switch-slider"></span></label>
    <span class="text-xs text-gray-500">关闭</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <label class="switch"><input type="checkbox" checked><span class="switch-slider"></span></label>
    <span class="text-xs text-gray-500">绿色 ON（默认）</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <label class="switch switch-primary"><input type="checkbox" checked><span class="switch-slider"></span></label>
    <span class="text-xs text-gray-500">蓝色 ON</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <label class="switch switch-error"><input type="checkbox" checked><span class="switch-slider"></span></label>
    <span class="text-xs text-gray-500">红色 ON</span>
  </div>
  <div class="flex flex-col items-center gap-1">
    <label class="switch"><input type="checkbox" disabled><span class="switch-slider"></span></label>
    <span class="text-xs text-gray-500">禁用</span>
  </div>
</div>

---

## 极简代码

```html
<label class="switch">
  <input type="checkbox">
  <span class="switch-slider"></span>
</label>
```

加 checked + 监听：

```html
<label class="switch">
  <input type="checkbox" checked onchange="handleToggle(this.checked)">
  <span class="switch-slider"></span>
</label>
```

---

## 修改和应用

### 基础结构（3 个必加）

```html
<label class="switch">          <!-- 容器 -->
  <input type="checkbox">       <!-- 状态承载（必须有） -->
  <span class="switch-slider"></span>  <!-- 视觉（必须有） -->
</label>
```

**3 个必加点**：
1. 用 `<label>` 包，点击整个滑动条都能切换
2. `<input type="checkbox">` 是状态本身
3. `<span class="switch-slider">` 是视觉

### 改颜色

| class | ON 时颜色 | 何时用 |
|---|---|---|
| （默认） | 绿 | 设备开启 |
| `.switch-primary` | 蓝 | 主要控制（如空调模式） |
| `.switch-error` | 红 | 危险操作（如加热器） |

效果：

<div class="flex items-center gap-4 my-4">
  <label class="switch"><input type="checkbox" checked><span class="switch-slider"></span></label>
  <label class="switch switch-primary"><input type="checkbox" checked><span class="switch-slider"></span></label>
  <label class="switch switch-error"><input type="checkbox" checked><span class="switch-slider"></span></label>
</div>

### 禁用

加 `disabled` 属性：

```html
<label class="switch">
  <input type="checkbox" disabled>
  <span class="switch-slider"></span>
</label>
```

效果：<label class="switch ml-2"><input type="checkbox" disabled><span class="switch-slider"></span></label>

### 监听状态变化

#### 用 `onchange`

```html
<label class="switch">
  <input type="checkbox" onchange="console.log(this.checked)">
  <span class="switch-slider"></span>
</label>
```

#### 用 addEventListener

```js
document.querySelector('.switch input').addEventListener('change', (e) => {
  console.log('设备已', e.target.checked ? '开启' : '关闭')
})
```

---

## 实际场景

### 设备列表开关

```html
<div class="flex items-center justify-between bg-white border rounded p-3">
  <div>
    <div class="font-medium text-sm">💡 客厅灯</div>
    <div class="text-xs text-gray-500">客厅 · 已连接</div>
  </div>
  <label class="switch">
    <input type="checkbox" checked onchange="toggleDevice(this.checked)">
    <span class="switch-slider"></span>
  </label>
</div>
```

效果：

<div class="my-4">
  <div class="flex items-center justify-between bg-white border rounded p-3">
    <div>
      <div class="font-medium text-sm">💡 客厅灯</div>
      <div class="text-xs text-gray-500">客厅 · 已连接</div>
    </div>
    <label class="switch">
      <input type="checkbox" checked>
      <span class="switch-slider"></span>
    </label>
  </div>
</div>

### 配合 JS 完整示例

```html
<label class="switch">
  <input type="checkbox" id="sw1">
  <span class="switch-slider"></span>
</label>

<script>
  const sw = document.getElementById('sw1')
  sw.addEventListener('change', async (e) => {
    const on = e.target.checked
    try {
      await fetch('/api/device/light', {
        method: 'POST',
        body: JSON.stringify({ on }),
        headers: { 'Content-Type': 'application/json' }
      })
      showToast(on ? '已开启' : '已关闭', 'success')
    } catch (err) {
      // 失败时回滚
      e.target.checked = !on
      showToast('操作失败', 'error')
    }
  })
</script>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 用 `<div>` 代替 `<label>` | 必须 `<label>`，否则点击无反应 |
| `<input>` 在 `<label>` 外 | input 必须在 label 内 |
| 自己写 JS 实现滑动 | 直接用 `.switch-slider`，CSS 已处理 |
| 颜色硬编码 `background: green` | 用 `.switch-primary` 等变体 |

---

## 下一步

- ⚪ [Status 状态点](/components/status)
- 🔌 [Device Card 设备卡片](/components/device-card)
- 🔔 [Toast 通知](/components/toast)