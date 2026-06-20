# `<nova-switch>` 开关

> IoT 设备开关。两端绑定 `model`，自动响应式。

## 效果

<iframe src="/examples/09-js-api.html" width="100%" height="200" frameborder="0" style="border-radius:8px"></iframe>

## 代码

```html
<nova-switch model="power"></nova-switch>
<nova-switch model="power" variant="primary"></nova-switch>
<nova-switch model="power" disabled></nova-switch>

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
<script>
  nova({ data: { power: false } })
</script>
```

## API

### 属性

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `model` | string | — | 双向绑定的 data 字段 |
| `variant` | string | — | `primary`（蓝）/ `error`（红）/ 不传（绿）|
| `size` | string | — | `sm` / `lg` |
| `disabled` | boolean | false | 禁用 |

### 事件

| 事件 | 触发时机 |
|---|---|
| `change` | 切换状态时冒泡 |

## 细节

### 与 CSS 版共存

`nova-switch` 的 CSS class 是 `.switch`（来自 nova-ui.css）。你**也可以直接写** `<label class="switch">`——只是没响应式。

### 配合其他指令

```html
<!-- :class 动态 -->
<nova-switch :class="large ? 'switch-lg' : ''" model="power"></nova-switch>

<!-- :disabled 联动 -->
<nova-switch model="power" :disabled="busy"></nova-switch>

<!-- @change 事件 -->
<nova-switch model="power" @change="onToggle()"></nova-switch>
```

### 多种用法等价

```js
// 函数式（如果你的代码需要动态创建）
const sw = document.createElement('nova-switch')
sw.setAttribute('model', 'power')
container.appendChild(sw)
```

### 源码

[`nova-ui-elements.js`](https://github.com/) 里搜 `NovaSwitch` 看实现，约 30 行。

## 下一步

- [`<nova-slider>`](./nova-slider) — 滑块
- [`<nova-modal>`](./nova-modal) — 弹窗
---

**返回**：[概念 →](./index) · [原理 →](./principle) · [引入 →](./setup)
