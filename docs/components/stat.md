# Stat 数据展示

## 效果预览

<div class="grid grid-cols-4 gap-3 my-4">
  <div class="card">
    <div class="stat">
      <div class="stat-title">本月用电</div>
      <div class="stat-value">128<span class="stat-unit">度</span></div>
      <div class="stat-desc">↑ 比上月 +12%</div>
    </div>
  </div>
  <div class="card">
    <div class="stat stat-success">
      <div class="stat-title">正常运行率</div>
      <div class="stat-value">98.5<span class="stat-unit">%</span></div>
      <div class="stat-desc">↑ 良好</div>
    </div>
  </div>
  <div class="card">
    <div class="stat stat-warning">
      <div class="stat-title">告警次数</div>
      <div class="stat-value">3</div>
      <div class="stat-desc">⚠ 待处理</div>
    </div>
  </div>
  <div class="card">
    <div class="stat stat-error">
      <div class="stat-title">故障设备</div>
      <div class="stat-value">1</div>
      <div class="stat-desc">✕ 需关注</div>
    </div>
  </div>
</div>

---

## 极简代码

一个 Stat = **`.stat` 容器** + **`.stat-title` + `.stat-value` + `.stat-desc`**：

```html
<div class="stat">
  <div class="stat-title">本月用电</div>
  <div class="stat-value">128<span class="stat-unit">度</span></div>
  <div class="stat-desc">↑ 比上月 +12%</div>
</div>
```

通常包在 `.card` 里使用：

```html
<div class="card">
  <div class="stat">...</div>
</div>
```

---

## 修改和应用

### 改颜色（值）

| class | 值颜色 | 何时用 |
|---|---|---|
| （默认） | 主文字色 | 中性数据 |
| `.stat-success` | 绿 | 良好 / 正常 |
| `.stat-error` | 红 | 异常 / 故障 |
| `.stat-warning` | 黄 | 警告 |
| `.stat-info` | 蓝 | 信息 / 主要数据 |

效果：

<div class="grid grid-cols-4 gap-3 my-4">
  <div class="card"><div class="stat"><div class="stat-title">默认</div><div class="stat-value">128</div></div></div>
  <div class="card"><div class="stat stat-success"><div class="stat-title">success</div><div class="stat-value">98.5%</div></div></div>
  <div class="card"><div class="stat stat-warning"><div class="stat-title">warning</div><div class="stat-value">3</div></div></div>
  <div class="card"><div class="stat stat-error"><div class="stat-title">error</div><div class="stat-value">1</div></div></div>
</div>

### 子元素清单

| class | 作用 |
|---|---|
| `.stat-title` | 顶部小灰字标签 |
| `.stat-value` | 大数字（30px / 粗体） |
| `.stat-unit` | 单位（小灰字） |
| `.stat-desc` | 描述（小字 / 灰色） |

### 自定义值颜色（细粒度）

如果想单独改值的颜色而不想用整组变体，用内联 style：

```html
<div class="stat-value" style="color: var(--blue-500)">65</div>
```

效果：

<div class="card my-4 inline-block"><div class="stat">
  <div class="stat-title">自定义颜色</div>
  <div class="stat-value" style="color: var(--blue-500)">65</div>
</div></div>

---

## 实际场景

### 仪表盘顶部数据条

```html
<div class="grid grid-cols-4 gap-3">
  <div class="card"><div class="stat">...</div></div>
  <div class="card"><div class="stat stat-success">...</div></div>
  <div class="card"><div class="stat stat-warning">...</div></div>
  <div class="card"><div class="stat stat-error">...</div></div>
</div>
```

效果看顶部预览。

### 单个统计

```html
<div class="card">
  <div class="stat">
    <div class="stat-title">本月收入</div>
    <div class="stat-value">¥ 12,480</div>
    <div class="stat-desc">↑ 比上月 +8.2%</div>
  </div>
</div>
```

效果：

<div class="card my-4 inline-block"><div class="stat">
  <div class="stat-title">本月收入</div>
  <div class="stat-value">¥ 12,480</div>
  <div class="stat-desc">↑ 比上月 +8.2%</div>
</div></div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 想做"传感器数据"用 `.stat` | 用 [Sensor Card](/components/sensor-card) 更语义化 |
| 数值用 `color: red` 硬编码 | 用 `style="color: var(--red-500)"` |

---

## 下一步

- 📊 [Card 卡片](/components/card)
- 🌡️ [Sensor Card 传感器卡片](/components/sensor-card)