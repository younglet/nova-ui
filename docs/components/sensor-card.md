# Sensor Card 传感器卡片（IoT 专用）

## 效果预览

<div class="grid grid-cols-3 gap-3 my-4">
  <div class="sensor-card">
    <div class="sensor-label">空气温度</div>
    <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
    <div class="sensor-status sensor-status-normal">↑ 正常</div>
  </div>
  <div class="sensor-card">
    <div class="sensor-label">空气湿度</div>
    <div class="sensor-value" style="color: var(--blue-500);">65<span class="sensor-unit">%</span></div>
    <div class="sensor-status sensor-status-normal">↑ 正常</div>
  </div>
  <div class="sensor-card">
    <div class="sensor-label">温度</div>
    <div class="sensor-value" style="color: var(--red-500);">32.1<span class="sensor-unit">°C</span></div>
    <div class="sensor-status sensor-status-error">✕ 超过阈值</div>
  </div>
</div>

---

## 极简代码

```html
<div class="sensor-card">
  <div class="sensor-label">温度</div>
  <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
  <div class="sensor-status sensor-status-normal">↑ 正常</div>
</div>
```

---

## 修改和应用

### 子元素清单

| class | 作用 |
|---|---|
| `.sensor-card` | 卡片容器 |
| `.sensor-card-bordered` | 变体：带边框代替阴影 |
| `.sensor-label` | 顶部小灰字标签 |
| `.sensor-value` | 主数值（30px / 粗体） |
| `.sensor-unit` | 单位（小灰字） |
| `.sensor-status` | 状态行 |
| `.sensor-status-normal` | 正常（绿色） |
| `.sensor-status-warning` | 警告（黄色） |
| `.sensor-status-error` | 异常（红色） |

### 改值颜色（最常用）

`.sensor-value` 默认是主文字色（黑/白）。改色用内联 `style`：

```html
<div class="sensor-value" style="color: var(--blue-500);">65</div>
<div class="sensor-value" style="color: var(--green-500);">35</div>
<div class="sensor-value" style="color: var(--red-500);">32.1</div>
```

效果：

<div class="grid grid-cols-3 gap-3 my-4">
  <div class="sensor-card"><div class="sensor-label">蓝色</div><div class="sensor-value" style="color: var(--blue-500);">65</div></div>
  <div class="sensor-card"><div class="sensor-label">绿色</div><div class="sensor-value" style="color: var(--green-500);">35</div></div>
  <div class="sensor-card"><div class="sensor-label">红色</div><div class="sensor-value" style="color: var(--red-500);">32.1</div></div>
</div>

### 改状态颜色

状态行（`.sensor-status`）的颜色由 3 个变体决定：

| 状态 | class |
|---|---|
| 正常 | `.sensor-status-normal`（绿） |
| 警告 | `.sensor-status-warning`（黄） |
| 异常 | `.sensor-status-error`（红） |

### 改变体

```html
<div class="sensor-card sensor-card-bordered">  <!-- 带边框代替阴影 -->
```

效果：

<div class="grid grid-cols-2 gap-3 my-4">
  <div class="sensor-card">
    <div class="sensor-label">默认（阴影）</div>
    <div class="sensor-value">24.5</div>
  </div>
  <div class="sensor-card sensor-card-bordered">
    <div class="sensor-label">带边框</div>
    <div class="sensor-value">24.5</div>
  </div>
</div>

---

## 实际场景

### 3 列传感器网格（最经典）

```html
<div class="grid grid-cols-3 gap-4">
  <div class="sensor-card">
    <div class="sensor-label">空气温度</div>
    <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
    <div class="sensor-status sensor-status-normal">↑ 正常</div>
  </div>
  <div class="sensor-card">
    <div class="sensor-label">空气湿度</div>
    <div class="sensor-value" style="color: var(--blue-500);">65<span class="sensor-unit">%</span></div>
    <div class="sensor-status sensor-status-normal">↑ 正常</div>
  </div>
  <div class="sensor-card">
    <div class="sensor-label">PM2.5</div>
    <div class="sensor-value" style="color: var(--green-500);">35</div>
    <div class="sensor-status sensor-status-normal">↑ 优</div>
  </div>
</div>
```

效果：

<div class="grid grid-cols-3 gap-4 my-4">
  <div class="sensor-card"><div class="sensor-label">空气温度</div><div class="sensor-value">24.5<span class="sensor-unit">°C</span></div><div class="sensor-status sensor-status-normal">↑ 正常</div></div>
  <div class="sensor-card"><div class="sensor-label">空气湿度</div><div class="sensor-value" style="color: var(--blue-500);">65<span class="sensor-unit">%</span></div><div class="sensor-status sensor-status-normal">↑ 正常</div></div>
  <div class="sensor-card"><div class="sensor-label">PM2.5</div><div class="sensor-value" style="color: var(--green-500);">35</div><div class="sensor-status sensor-status-normal">↑ 优</div></div>
</div>

### 动态数据（JS）

```html
<div class="sensor-card">
  <div class="sensor-label">温度</div>
  <div class="sensor-value" id="temp">--<span class="sensor-unit">°C</span></div>
  <div class="sensor-status sensor-status-normal" id="status">--</div>
</div>

<script>
  setInterval(() => {
    const v = (22 + Math.random() * 6).toFixed(1)
    document.getElementById('temp').innerHTML = v + '<span class="sensor-unit">°C</span>'

    const status = document.getElementById('status')
    if (v > 28) {
      status.className = 'sensor-status sensor-status-error'
      status.textContent = '✕ 超过阈值'
    } else if (v > 26) {
      status.className = 'sensor-status sensor-status-warning'
      status.textContent = '⚠ 偏高'
    } else {
      status.className = 'sensor-status sensor-status-normal'
      status.textContent = '↑ 正常'
    }
  }, 2000)
</script>
```

效果（每 2 秒更新）：

<div class="sensor-card inline-block my-4">
  <div class="sensor-label">温度</div>
  <div class="sensor-value" id="demo-temp">24.5<span class="sensor-unit">°C</span></div>
  <div class="sensor-status sensor-status-normal" id="demo-status">↑ 正常</div>
</div>

（看 examples/ 目录的实际 demo 跑动态效果）

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 数值用 `color: red` 硬编码 | 用 `style="color: var(--red-500)"` 跟主题 |
| 单位和大数字一样大 | 用 `.sensor-unit` 自动变小变灰 |
| 状态颜色和值颜色不匹配 | 值红 → 状态用 `.sensor-status-error` |

---

## 下一步

- 🔌 [Device Card 设备卡片](/components/device-card) — 设备控制
- 📈 [Stat 数据展示](/components/stat) — 统计数据
- 🔘 [Switch 开关](/components/switch)