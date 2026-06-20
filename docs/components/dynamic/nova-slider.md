# `<nova-slider>` 滑块

> 拖动调节数值。**带 debounce 防抖**，IoT 调光场景必备。

## 效果

<iframe src="/examples/09-js-api.html" width="100%" height="280" frameborder="0" style="border-radius:8px"></iframe>

## 代码

```html
<nova-slider model="brightness" min="0" max="100"></nova-slider>
<nova-slider model="x" min="0" max="100" debounce="400"></nova-slider>

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
<script>
  nova({ data: { brightness: 50 } })
</script>
```

## API

### 属性

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `model` | string | — | 双向绑定的 data 字段 |
| `min` | number | 0 | 最小值 |
| `max` | number | 100 | 最大值 |
| `step` | number | 1 | 步长 |
| `variant` | string | — | `primary` |
| `debounce` | ms | 0 | 防抖延迟（推荐设 300-500）|
| `disabled` | boolean | false | 禁用 |

### 事件

| 事件 | 触发时机 |
|---|---|
| `change` | 每次变化（拖动期间多次）|
| `debounced-change` | 防抖结束后（设了 `debounce` 才触发）|

## 细节

### debounce vs 实时上报

**不要在 `@change` 里发 HTTP**——拖动期间会触发几十次请求。用 `debounced-change`：

```html
<nova-slider model="brightness" debounce="400"
             @debounced-change="save()"></nova-slider>

<script>
  nova({
    data: { brightness: 50 },
    funcs: {
      save () {
        nova.http.put('/api/dim', { value: this.brightness })
      }
    }
  })
</script>
```

拖动期间 `save()` 不会触发，停下 400ms 后才调用一次。

### `name` 自动绑 vs `model`

| 写法 | 行为 |
|---|---|
| `<input type="range" name="brightness">` | 自动绑 `data.brightness`，但**没有防抖、没有事件** |
| `<nova-slider model="brightness" debounce="400">` | 自动绑 + 防抖 + 事件 |

动态组件更强大，但体积大 11KB。如果项目极简，用 `name` 足够。

### 配合其他指令

```html
<!-- 显示数值 -->
<span>{{ brightness }}%</span>
<nova-slider model="brightness" min="0" max="100"></nova-slider>

<!-- 联动其他字段 -->
<nova-slider model="brightness" min="0" max="100"
             @change="updateLedColor(brightness)"></nova-slider>
```

### 源码

`nova-ui-elements.js` 里搜 `NovaSlider`，约 35 行。

## 下一步

- [`<nova-knob>`](./nova-knob) — 旋钮控制
- [`<nova-input-mask>`](./nova-input-mask) — 输入掩码
---

**返回**：[概念 →](./index) · [原理 →](./principle) · [引入 →](./setup)
