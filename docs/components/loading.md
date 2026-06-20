# Loading 加载中

## 效果预览

<div class="flex flex-wrap items-center gap-6 my-4">
  <span class="loading loading-sm loading-primary"></span>
  <span class="loading loading-primary"></span>
  <span class="loading loading-lg loading-primary"></span>
</div>

<div class="flex items-center gap-4 my-4">
  <span class="loading loading-primary"></span>
  <span class="loading loading-success"></span>
  <span class="loading loading-warning"></span>
  <span class="loading loading-error"></span>
</div>

<button class="btn btn-primary my-2" disabled>
  <span class="loading loading-white loading-sm"></span>
  保存中...
</button>

---

## 极简代码

```html
<span class="loading"></span>
```

加颜色和尺寸：

```html
<span class="loading loading-primary"></span>
<span class="loading loading-lg loading-success"></span>
```

---

## 修改和应用

### 改尺寸

| class | 大小 |
|---|---|
| `.loading-sm` | 12px |
| `.loading` | 16px（默认） |
| `.loading-lg` | 32px |

效果：

<div class="flex items-center gap-4">
  <span class="loading loading-sm loading-primary"></span>
  <span class="loading loading-primary"></span>
  <span class="loading loading-lg loading-primary"></span>
</div>

### 改颜色

| class | 颜色 |
|---|---|
| `.loading-primary` | 蓝（默认） |
| `.loading-success` | 绿 |
| `.loading-warning` | 黄 |
| `.loading-error` | 红 |
| `.loading-white` | 白（深色按钮里用） |

效果：

<div class="flex items-center gap-4">
  <span class="loading loading-primary"></span>
  <span class="loading loading-success"></span>
  <span class="loading loading-warning"></span>
  <span class="loading loading-error"></span>
</div>

### 按钮内嵌（最常用）

```html
<button class="btn btn-primary" disabled>
  <span class="loading loading-white loading-sm"></span>
  保存中...
</button>
```

效果：

<button class="btn btn-primary my-2" disabled>
  <span class="loading loading-white loading-sm"></span>
  保存中...
</button>

---

## 实际场景

### 表单提交按钮

```html
<form onsubmit="handleSubmit(event)">
  <button id="submit-btn" class="btn btn-primary" type="submit">
    保存
  </button>
</form>

<script>
  function handleSubmit(e) {
    e.preventDefault()
    const btn = document.getElementById('submit-btn')
    btn.disabled = true
    btn.innerHTML = '<span class="loading loading-white loading-sm"></span> 保存中...'
    setTimeout(() => {
      btn.disabled = false
      btn.textContent = '保存'
    }, 2000)
  }
</script>
```

### 全屏 Loading 遮罩

```html
<div id="loading" class="loading-overlay">
  <span class="loading loading-lg loading-primary"></span>
</div>

<script>
  // 显示
  document.getElementById('loading').style.display = 'flex'
  // 隐藏
  // document.getElementById('loading').style.display = 'none'
</script>
```

> `.loading-overlay` 已内置 `position: fixed` + 全屏背景。

效果（示意）：

<div class="bg-gray-100 p-8 rounded text-center">
  <span class="loading loading-lg loading-primary"></span>
  <p class="text-sm text-gray-500 mt-2">正在加载数据...</p>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 按钮里用 `.loading-primary`（看不见） | 深底按钮用 `.loading-white` |
| Loading 写超大尺寸 | 32px 是合理上限 |
| Loading 没动画 | Loading 自带 0.8s 旋转动画 |

---

## 下一步

- 📊 [Progress 进度条](/components/progress) — 已知进度的加载
- 🔔 [Toast 通知](/components/toast)