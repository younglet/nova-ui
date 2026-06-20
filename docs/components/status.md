# Status 状态点（LED 指示灯）

## 效果预览

<div class="flex flex-col gap-2 my-4">
  <div class="flex items-center gap-2">
    <span class="status-dot status-online status-pulse"></span>
    <span class="text-sm">在线（脉冲动画）</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="status-dot status-online"></span>
    <span class="text-sm">在线（默认 8px）</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="status-dot status-online status-lg"></span>
    <span class="text-sm">在线（大 12px）</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="status-dot status-offline"></span>
    <span class="text-sm">离线</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="status-dot status-error"></span>
    <span class="text-sm">故障</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="status-dot status-warning"></span>
    <span class="text-sm">警告</span>
  </div>
</div>

---

## 极简代码

```html
<span class="status-dot status-online"></span>
```

---

## 修改和应用

### 改状态

| class | 颜色 | 何时用 |
|---|---|---|
| `.status-online` | 绿 | 在线 / 正常 |
| `.status-offline` | 灰 | 离线 / 关闭 |
| `.status-error` | 红 | 故障 |
| `.status-warning` | 黄 | 警告 |

效果：

<div class="flex items-center gap-4 my-4">
  <span class="status-dot status-online"></span>
  <span class="status-dot status-offline"></span>
  <span class="status-dot status-error"></span>
  <span class="status-dot status-warning"></span>
</div>

### 改尺寸

| class | 大小 |
|---|---|
| `.status-sm` | 6px |
| `.status` | 8px（默认） |
| `.status-lg` | 12px |

效果：

<div class="flex items-center gap-4 my-4">
  <span class="status-dot status-sm status-online"></span>
  <span class="status-dot status-online"></span>
  <span class="status-dot status-lg status-online"></span>
</div>

### 加脉冲动画

加 `.status-pulse` 让点产生光晕脉冲，适合"实时活动"指示：

```html
<span class="status-dot status-online status-pulse"></span>
```

效果：<span class="status-dot status-online status-pulse"></span> （每 1.5s 一次光晕）

---

## 实际场景

### 设备列表行（最常用）

```html
<div class="flex items-center justify-between bg-white p-3 rounded border">
  <div class="flex items-center gap-2">
    <span class="status-dot status-online"></span>
    <span class="text-sm">主传感器</span>
  </div>
  <span class="text-xs text-gray-500">运行中</span>
</div>
```

效果：

<div class="my-4">
  <div class="flex items-center justify-between bg-white p-3 rounded border">
    <div class="flex items-center gap-2">
      <span class="status-dot status-online"></span>
      <span class="text-sm">主传感器</span>
    </div>
    <span class="text-xs text-gray-500">运行中</span>
  </div>
</div>

### 多设备实时活动指示

```html
<div class="flex items-center gap-2">
  <span class="status-dot status-online status-pulse"></span>
  <span class="font-medium">3 台设备在线</span>
</div>
```

效果：

<div class="flex items-center gap-2 my-4">
  <span class="status-dot status-online status-pulse"></span>
  <span class="font-medium">3 台设备在线</span>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 颜色硬编码 `background: green` | 用 `.status-online` |
| 用 emoji 🟢 代替 | emoji 风格不一致，状态点稳定 |
| pulse 用在静态场景 | pulse 只用于"正在实时变化"的状态 |

---

## 下一步

- 🔘 [Switch 开关](/components/switch) — 设备控制
- 🔌 [Device Card 设备卡片](/components/device-card)