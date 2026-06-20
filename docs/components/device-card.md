# Device Card 设备控制卡片（IoT 专用）

## 效果预览

<div class="grid grid-cols-3 gap-3 my-4">
  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">💡 客厅灯</div>
      <span class="device-card-status device-card-status-on"></span>
    </div>
    <div class="text-xs text-gray-500 mb-3">运行中 · 80% 亮度</div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>

  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">❄️ 空调</div>
      <span class="device-card-status device-card-status-off"></span>
    </div>
    <div class="text-xs text-gray-500 mb-3">已关闭 · 24°C</div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>

  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">🔥 加热器</div>
      <span class="device-card-status device-card-status-warn"></span>
    </div>
    <div class="text-xs text-gray-500 mb-3">温度异常</div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>
</div>

---

## 极简代码

```html
<div class="device-card">
  <div class="device-card-header">
    <div class="device-card-title">💡 客厅灯</div>
    <span class="device-card-status device-card-status-on"></span>
  </div>
  <div class="device-card-actions">
    <button class="btn btn-success btn-sm">开</button>
    <button class="btn btn-neutral btn-sm">关</button>
  </div>
</div>
```

---

## 修改和应用

### 子元素清单

| class | 作用 |
|---|---|
| `.device-card` | 卡片容器 |
| `.device-card-bordered` | 变体：带边框代替阴影 |
| `.device-card-header` | 顶部（标题 + 状态点） |
| `.device-card-title` | 设备名 |
| `.device-card-status` | 状态点 |
| `.device-card-actions` | 底部按钮组 |

### 改状态点

| class | 颜色 | 何时用 |
|---|---|---|
| `.device-card-status-on` | 绿 | 在线 / 开启 |
| `.device-card-status-off` | 灰 | 离线 / 关闭 |
| `.device-card-status-error` | 红 | 故障 |
| `.device-card-status-warn` | 黄 | 警告 |

效果：

<div class="grid grid-cols-4 gap-3 my-4">
  <div class="device-card"><div class="device-card-header"><div class="device-card-title text-sm">在线</div><span class="device-card-status device-card-status-on"></span></div></div>
  <div class="device-card"><div class="device-card-header"><div class="device-card-title text-sm">离线</div><span class="device-card-status device-card-status-off"></span></div></div>
  <div class="device-card"><div class="device-card-header"><div class="device-card-title text-sm">故障</div><span class="device-card-status device-card-status-error"></span></div></div>
  <div class="device-card"><div class="device-card-header"><div class="device-card-title text-sm">警告</div><span class="device-card-status device-card-status-warn"></span></div></div>
</div>

### 改变体

```html
<div class="device-card device-card-bordered">  <!-- 带边框 -->
```

效果：

<div class="grid grid-cols-2 gap-3 my-4">
  <div class="device-card">
    <div class="device-card-header"><div class="device-card-title">默认（阴影）</div><span class="device-card-status device-card-status-on"></span></div>
  </div>
  <div class="device-card device-card-bordered">
    <div class="device-card-header"><div class="device-card-title">带边框</div><span class="device-card-status device-card-status-on"></span></div>
  </div>
</div>

### 配合 Switch 开关

```html
<div class="device-card">
  <div class="device-card-header">
    <div class="device-card-title">💡 客厅灯</div>
    <span class="device-card-status device-card-status-on"></span>
  </div>
  <div class="device-card-actions mt-3">
    <span class="text-sm text-gray-700">开关</span>
    <label class="switch">
      <input type="checkbox" checked>
      <span class="switch-slider"></span>
    </label>
  </div>
</div>
```

效果：

<div class="device-card inline-block my-4">
  <div class="device-card-header">
    <div class="device-card-title">💡 客厅灯</div>
    <span class="device-card-status device-card-status-on"></span>
  </div>
  <div class="device-card-actions mt-3">
    <span class="text-sm text-gray-700">开关</span>
    <label class="switch">
      <input type="checkbox" checked>
      <span class="switch-slider"></span>
    </label>
  </div>
</div>

---

## 实际场景

### 设备控制网格

```html
<div class="grid grid-cols-3 gap-3">
  <div class="device-card">...</div>
  <div class="device-card">...</div>
  <div class="device-card">...</div>
</div>
```

效果：

<div class="grid grid-cols-3 gap-3 my-4">
  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">💡 客厅灯</div>
      <span class="device-card-status device-card-status-on"></span>
    </div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>
  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">❄️ 空调</div>
      <span class="device-card-status device-card-status-off"></span>
    </div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>
  <div class="device-card">
    <div class="device-card-header">
      <div class="device-card-title">💧 加湿器</div>
      <span class="device-card-status device-card-status-warn"></span>
    </div>
    <div class="device-card-actions">
      <button class="btn btn-success btn-sm btn-block">开</button>
      <button class="btn btn-neutral btn-sm btn-block">关</button>
    </div>
  </div>
</div>

### 配合 JS 切换状态

```html
<div class="device-card">
  <div class="device-card-header">
    <div class="device-card-title">💡 客厅灯</div>
    <span class="device-card-status device-card-status-on" id="led"></span>
  </div>
  <div class="device-card-actions mt-3">
    <button class="btn btn-success btn-sm" onclick="on()">开</button>
    <button class="btn btn-neutral btn-sm" onclick="off()">关</button>
  </div>
</div>

<script>
  function on() {
    document.getElementById('led').className = 'device-card-status device-card-status-on'
  }
  function off() {
    document.getElementById('led').className = 'device-card-status device-card-status-off'
  }
</script>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 想展示"传感器数据"用 device-card | 用 [Sensor Card](/components/sensor-card) 更语义化 |
| 自己写 CSS 改 device-card 样式 | 改变体 `.device-card-bordered` 或自定义新组件 |
| 状态点直接放设备名旁边 | 用 `.device-card-header` flex 容器 |

---

## 下一步

- 🌡️ [Sensor Card 传感器卡片](/components/sensor-card)
- 🔘 [Switch 开关](/components/switch)
- ⚪ [Status 状态点](/components/status)