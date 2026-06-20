# Progress 进度条

## 效果预览

<div class="my-4 space-y-3">
  <div class="progress progress-primary"><div class="progress-bar" style="width: 60%"></div></div>
  <div class="progress progress-success"><div class="progress-bar" style="width: 80%"></div></div>
  <div class="progress progress-warning"><div class="progress-bar" style="width: 45%"></div></div>
  <div class="progress progress-error"><div class="progress-bar" style="width: 90%"></div></div>
</div>

<div class="my-4 space-y-3">
  <div class="progress progress-sm progress-success"><div class="progress-bar" style="width: 50%"></div></div>
  <div class="progress progress-success"><div class="progress-bar" style="width: 50%"></div></div>
  <div class="progress progress-lg progress-success"><div class="progress-bar" style="width: 50%"></div></div>
</div>

---

## 极简代码

一个进度条 = **`.progress` 容器** + **`.progress-bar` 内层**：

```html
<div class="progress">
  <div class="progress-bar" style="width: 60%"></div>
</div>
```

**关键**：内层的 `style="width: N%"` 决定进度。

---

## 修改和应用

### 改颜色

| class | 颜色 | 何时用 |
|---|---|---|
| `.progress-primary` | 蓝 | 默认 |
| `.progress-success` | 绿 | 完成 / 正常 |
| `.progress-warning` | 黄 | 警告 |
| `.progress-error` | 红 | 错误 / 高占用 |

效果：

<div class="my-4 space-y-3">
  <div class="progress progress-primary"><div class="progress-bar" style="width: 60%"></div></div>
  <div class="progress progress-success"><div class="progress-bar" style="width: 80%"></div></div>
  <div class="progress progress-warning"><div class="progress-bar" style="width: 45%"></div></div>
  <div class="progress progress-error"><div class="progress-bar" style="width: 90%"></div></div>
</div>

### 改尺寸

| class | 高度 |
|---|---|
| `.progress-sm` | 4px（细线） |
| `.progress` | 8px（默认） |
| `.progress-lg` | 12px（粗条） |

效果：

<div class="my-4 space-y-3">
  <div class="progress progress-sm progress-primary"><div class="progress-bar" style="width: 50%"></div></div>
  <div class="progress progress-primary"><div class="progress-bar" style="width: 50%"></div></div>
  <div class="progress progress-lg progress-primary"><div class="progress-bar" style="width: 50%"></div></div>
</div>

### 改进度

进度完全由 `width` 控制：

```html
<div class="progress progress-success">
  <div class="progress-bar" style="width: 30%"></div>   <!-- 30% -->
</div>
```

效果：

<div class="my-4 space-y-3">
  <div class="progress progress-success"><div class="progress-bar" style="width: 30%"></div></div>
  <div class="progress progress-success"><div class="progress-bar" style="width: 60%"></div></div>
  <div class="progress progress-success"><div class="progress-bar" style="width: 90%"></div></div>
</div>

---

## 实际场景

### 存储使用率

```html
<div>
  <div class="flex justify-between text-sm mb-1">
    <span>存储空间</span>
    <span class="text-gray-500">75 GB / 100 GB</span>
  </div>
  <div class="progress progress-primary">
    <div class="progress-bar" style="width: 75%"></div>
  </div>
</div>
```

效果：

<div class="my-4">
  <div class="flex justify-between text-sm mb-1">
    <span>存储空间</span>
    <span class="text-gray-500">75 GB / 100 GB</span>
  </div>
  <div class="progress progress-primary"><div class="progress-bar" style="width: 75%"></div></div>
</div>

### 多条进度（资源占用）

```html
<div class="space-y-3">
  <div>
    <div class="text-sm mb-1">CPU</div>
    <div class="progress progress-success"><div class="progress-bar" style="width: 30%"></div></div>
  </div>
  <div>
    <div class="text-sm mb-1">内存</div>
    <div class="progress progress-warning"><div class="progress-bar" style="width: 70%"></div></div>
  </div>
  <div>
    <div class="text-sm mb-1">磁盘</div>
    <div class="progress progress-error"><div class="progress-bar" style="width: 92%"></div></div>
  </div>
</div>
```

效果：

<div class="space-y-3 my-4">
  <div>
    <div class="text-sm mb-1">CPU</div>
    <div class="progress progress-success"><div class="progress-bar" style="width: 30%"></div></div>
  </div>
  <div>
    <div class="text-sm mb-1">内存</div>
    <div class="progress progress-warning"><div class="progress-bar" style="width: 70%"></div></div>
  </div>
  <div>
    <div class="text-sm mb-1">磁盘</div>
    <div class="progress progress-error"><div class="progress-bar" style="width: 92%"></div></div>
  </div>
</div>

### 动态进度（JS）

```html
<div class="progress progress-primary">
  <div class="progress-bar" id="bar" style="width: 0%"></div>
</div>

<script>
  let progress = 0
  const bar = document.getElementById('bar')
  const timer = setInterval(() => {
    progress += 5
    bar.style.width = progress + '%'
    if (progress >= 100) clearInterval(timer)
  }, 200)
</script>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 颜色写在 `.progress-bar` 上 | 写在 `.progress` 上 |
| 进度忘记加 `%` | `width: 60` 是错的，必须 `width: 60%` |
| 多个 `.progress-bar` 同容器 | 一个 `.progress` 只能一个 `.progress-bar` |

---

## 下一步

- ⏳ [Loading 加载中](/components/loading)
- 📈 [Stat 数据展示](/components/stat)