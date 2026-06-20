# with-nova-ui · 案例重构

> 把 `../` 下的 5 个 novajs 案例，**用 nova-ui 的组件重写**。
> 业务逻辑（novajs 代码）完全不变，HTML 改用更高层的语义组件。

## 为什么重构？

原版 5 个案例全部用 nova-style 的**原子工具类**手写 UI：

```html
<!-- 原版：5 行手写 class -->
<div class="bg-white p-4 rounded-lg shadow text-center">
  <div class="text-lg font-bold mb-2">{{ d.name }}</div>
  <button class="px-3 py-1 rounded bg-green-500 text-white text-sm">开</button>
</div>
```

重构后用 nova-ui 的**语义组件**：

```html
<!-- nova-ui 版：组件即语义 -->
<div class="device-card text-center">
  <div class="device-card-title">{{ d.name }}</div>
  <div class="device-card-actions">
    <button class="btn btn-success btn-sm">开</button>
  </div>
</div>
```

### 三层关系

```
┌────────────────────────────────────────────────────────┐
│  nova-js（本目录）                                      │
│  → 数据 + 响应式 + 事件 + HTTP                          │
│  → 模板指令 :class / :style / loop / @click / ...      │
├────────────────────────────────────────────────────────┤
│  nova-ui（../../../nova-ui/nova-ui.css）              │
│  → 语义化组件：device-card / sensor-card / switch ...  │
│  → 状态元素：badge / status-dot / alert / loading     │
│  → 交互组件：modal / toast / tabs / navbar ...        │
├────────────────────────────────────────────────────────┤
│  nova-style（../../../nova-style/nova-style.css）      │
│  → CSS 变量：颜色 / 字体 / 圆角 / 阴影                 │
│  → 原子工具类：bg-*, text-*, p-*, flex, grid ...      │
└────────────────────────────────────────────────────────┘
```

**novajs + nova-ui + nova-style = 完整的 IoT 前端栈。**
novajs 负责"动"，nova-ui 负责"形"，nova-style 负责"原子"。

## 5 个案例对照

| # | 案例 | 重构前用的手写 class | 重构后用的 nova-ui 组件 |
|:--:|---|---|---|
| 1 | [01-toggle.html](./01-toggle.html) | `bg-white rounded-lg shadow` + 手写 `bg-green-500` 圆按钮 | `card` / `device-card` / `switch` / `status-dot` / `badge` / `btn` |
| 2 | [02-slider.html](./02-slider.html) | 手写滑块 + 同步状态文字 | `card` / `device-card` / `progress` / `badge` / `status-dot` |
| 3 | [03-live-sensors.html](./03-live-sensors.html) | 4 张手写白卡 + 自制进度条 | `navbar` / `sensor-card` / `badge` / `progress` / `status-dot` / `btn` |
| 4 | [04-device-grid.html](./04-device-grid.html) | 2 列手写白卡 + 4 个开关各写一遍 | `navbar` / `device-card` / `sensor-card` / `switch` / `progress` / `btn` / `alert` |
| 5 | [05-class-style.html](./05-class-style.html) | 10 个手写 demo-box | `card` / `badge` / `btn` / `status-dot` / `divider` / `alert` |

## 关键改造点

### ① `device-card` 替代手写"白底卡片+小圆灯"

```diff
- <div class="bg-white p-4 rounded-lg shadow">
-   <div class="flex justify-between items-center">
-     <span class="font-bold">客厅灯</span>
-     <span class="w-2 h-2 rounded-full bg-green-500"></span>
-   </div>
-   <button class="bg-green-500 text-white ...">开</button>
- </div>
+ <div class="device-card">
+   <div class="device-card-header">
+     <div class="device-card-title">客厅灯</div>
+     <span class="device-card-status device-card-status-on"></span>
+   </div>
+   <div class="device-card-actions">
+     <button class="btn btn-success btn-sm">开</button>
+   </div>
+ </div>
```

### ② `sensor-card` 替代手写"传感器数值卡"

```diff
- <div class="bg-white p-4 rounded-lg shadow text-center">
-   <div class="text-xs text-gray-500">温度</div>
-   <div class="text-3xl font-bold mb-2">24.5 °C</div>
-   <div class="text-xs text-green-500">↑ 正常</div>
-   <div class="h-2 bg-gray-200 rounded">
-     <div class="h-2 rounded bg-yellow-500" style="width: 49%"></div>
-   </div>
- </div>
+ <div class="sensor-card">
+   <div class="sensor-label">温度</div>
+   <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
+   <div class="sensor-status sensor-status-normal">↑ 正常</div>
+   <div class="progress progress-warning mt-2">
+     <div class="progress-bar" style="width: 49%"></div>
+   </div>
+ </div>
```

### ③ `switch` 组件（真正的 checkbox 风格开关）

```diff
- <button @click="setPower(d, !d.on)"
-         class="w-12 h-6 rounded-full transition-all"
-         :class="d.on ? 'bg-green-500' : 'bg-gray-300'">
-   <span class="block w-5 h-5 bg-white rounded-full transition-all"
-         :class="d.on ? 'translate-x-6' : 'translate-x-0.5'"></span>
- </button>
+ <label class="switch">
+   <input type="checkbox" :checked="d.on" @change="setPower(d, $event.target.checked)">
+   <span class="switch-slider"></span>
+ </label>
```

### ④ `status-dot` + `badge` 替代手写"小圆点+文字"

```diff
- <span class="w-2 h-2 rounded-full bg-green-500"></span>
- <span class="text-sm text-green-500">在线</span>
+ <span class="status-dot status-online status-pulse"></span>
+ <span class="badge badge-success">在线</span>
```

### ⑤ `navbar` 替代手写灰色顶栏

```diff
- <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
-   <div class="text-lg font-bold">🏠 智能家居</div>
-   <div class="text-sm">...</div>
- </div>
+ <div class="navbar navbar-dark">
+   <div class="navbar-brand">🏠 智能家居</div>
+   <div class="navbar-actions">
+     <span class="status-dot status-online status-pulse"></span>
+     <span class="badge badge-success">在线</span>
+   </div>
+ </div>
```

## 跑了看看

每个 `.html` 文件都自包含，双击即可在浏览器里运行（依赖 `../../src/novajs.js` + `../../../nova-style/nova-style.css` + `../../../nova-ui/nova-ui.css`）。

```bash
# 启动一个本地静态服务器
npx serve .

# 或用 python
python -m http.server 8000

# 浏览器访问
open http://localhost:8000/examples/with-nova-ui/01-toggle.html
```

## 业务逻辑完全没动

> **重要**：所有 novajs 代码（`nova({...})`、`@click`、`loop`、`$watch`、`nova.debounce`、`nova.http`）100% 保持原样。
> 这就是 novajs + nova-ui 解耦的好处——**改样式不动逻辑，换框架不动样式**。

| 层 | 改它会影响 | 不影响 |
|---|---|---|
| nova-style（原子类） | 颜色、间距、字号 | 组件结构、业务逻辑 |
| nova-ui（组件） | 组件外观、布局细节 | 原子类、业务逻辑 |
| novajs（脚本） | 数据流、事件、HTTP | 视觉、HTML |

随便换哪一层都不会爆炸。这就是分层的价值。
