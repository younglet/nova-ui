---
title: 自定义元素
---

# 自定义元素（`<nova-*>`）

> 用 `<nova-switch>` 这种 HTML 标签，自动响应式。底层由 [novajs](https://github.com/) 驱动。

## 引入

```html
<link rel="stylesheet" href="nova-style.css">
<link rel="stylesheet" href="nova-ui.css">

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
```

## 三层关系

```
┌─────────────────────────────────────────────────┐
│  nova-ui-elements.js  — JS 增强自定义元素         │
│  <nova-switch> · <nova-slider> · <nova-knob>    │
├─────────────────────────────────────────────────┤
│  nova-ui.css  — 组件样式（纯 CSS 也可用）        │
│  nova-style.css  — 原子 CSS 工具类              │
├─────────────────────────────────────────────────┤
│  novajs.js  — 反应式内核（让 UI 活起来）         │
└─────────────────────────────────────────────────┘
```

## 5 个内置元素

### `<nova-switch>`

```html
<nova-switch model="power"></nova-switch>
<nova-switch model="power" variant="primary"></nova-switch>
<nova-switch model="power" disabled></nova-switch>
```

| 属性 | 类型 | 说明 |
|---|---|---|
| `model` | string | 双向绑定的 data 字段 |
| `variant` | string | `primary` / `error` |
| `size` | string | `sm` / `lg` |
| `disabled` | boolean | 禁用 |

事件：`change`（切换时冒泡）

### `<nova-slider>`

```html
<nova-slider model="brightness" min="0" max="100"></nova-slider>
<nova-slider model="x" debounce="400"></nova-slider>
```

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `model` | string | — | data 字段 |
| `min` / `max` / `step` | number | 0/100/1 | 范围 |
| `variant` | string | — | `primary` |
| `debounce` | ms | 0 | 防抖延迟 |
| `disabled` | boolean | false | 禁用 |

事件：`change`、`debounced-change`（设了 debounce 才触发）

### `<nova-input-mask>`

```html
<nova-input-mask model="phone" mask="999-9999-9999"></nova-input-mask>
<nova-input-mask model="ipv4" mask="999.999.999.999"></nova-input-mask>
<nova-input-mask model="mac" mask="AA:AA:AA:AA:AA:AA"></nova-input-mask>
```

**mask 字符**：

| 字符 | 接受输入 |
|---|---|
| `9` | 数字 0-9 |
| `a` | 字母 |
| `*` | 任意 |
| 其他 | 字面量（`-` `.` `:` 等）|

### `<nova-knob>`

SVG 旋钮，**拖动 / 滚轮**改变值。

```html
<nova-knob model="brightness" min="0" max="100"></nova-knob>
<nova-knob model="x" value-color="#3b82f6" track-color="#e5e7eb"></nova-knob>
<nova-knob model="temp" size="80" decimals="1"></nova-knob>
```

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `model` | string | — | data 字段 |
| `min` / `max` / `step` | number | 0/100/1 | 范围 |
| `size` | px | 120 | 直径 |
| `value-color` | color | `#10b981` | 弧线颜色 |
| `track-color` | color | `#e5e7eb` | 轨道颜色 |
| `decimals` | number | 0 | 显示小数位 |

### `<nova-modal>`

```html
<nova-modal show="openModal" title="编辑设备">
  <p>默认 slot 内容</p>
  <button slot="footer" @click="save()">保存</button>
</nova-modal>
```

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `show` | string | — | data 字段 |
| `title` | string | — | 标题 |
| `size` | string | `md` | `sm` / `md` / `lg` |
| `persistent` | boolean | false | 禁用 ESC 和点遮罩关闭 |

**Slots**：
- 默认 — 主体
- `slot="footer"` — 底部按钮（右对齐）

事件：`open` / `close`

## 完整示例

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="nova-style.css">
  <link rel="stylesheet" href="nova-ui.css">
</head>
<body>
  <nova-switch model="power"></nova-switch>

  <nova-slider model="brightness" min="0" max="100" debounce="400"
               @change="save()"></nova-slider>

  <nova-knob model="brightness" size="120"></nova-knob>

  <nova-input-mask model="phone" mask="999-9999-9999"></nova-input-mask>

  <nova-modal show="openModal" title="设置">
    <p>内容</p>
    <button slot="footer" @click="data.openModal = false">关闭</button>
  </nova-modal>

  <script src="novajs.js"></script>
  <script src="nova-ui-elements.js"></script>
  <script>
    nova({
      data: {
        power: false,
        brightness: 50,
        phone: '',
        openModal: false
      },
      funcs: {
        save () {
          nova.http.put('/api/dim', { value: this.brightness })
        }
      }
    })
  </script>
</body>
</html>
```

## 自定义元素 + 普通指令

`<nova-*>` 是普通 HTML 元素，所有 nova-ui 指令都生效：

```html
<!-- :class 动态样式 -->
<nova-switch :class="size" model="power"></nova-switch>

<!-- :style 动态样式 -->
<nova-knob :style="{ transform: 'scale(1.2)' }" model="x"></nova-knob>

<!-- @click 事件 -->
<nova-switch model="power" @click="log()"></nova-switch>
```

## 体积

| 文件 | min 后 |
|---|---|
| `novajs.js` | 9 KB |
| `nova-ui-elements.js` | 11 KB |
| **合计** | **20 KB** |

完整 IoT 控制台（含反应式 + 5 个交互组件）压缩后 20 KB，**ESP32 flash 装得下**。

## 下一步

- [示例 demo](https://github.com/) — 5 个元素组合（仓库 examples/ 目录）
- [组件列表](/components/) — 静态 CSS 组件
- [novajs 文档](https://github.com/) — 反应式内核参考