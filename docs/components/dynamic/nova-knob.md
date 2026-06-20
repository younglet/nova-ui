# `<nova-knob>` 旋钮

> SVG 旋钮控制。**拖动 / 滚轮**改变值。IoT 调音量 / 调亮度 / 调温度的物理感控制。

## 效果

<iframe src="/examples/09-js-api.html" width="100%" height="280" frameborder="0" style="border-radius:8px"></iframe>

## 代码

```html
<nova-knob model="brightness" min="0" max="100"></nova-knob>
<nova-knob model="x" value-color="#3b82f6"></nova-knob>
<nova-knob model="temp" size="80" decimals="1"></nova-knob>

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
<script>
  nova({ data: { brightness: 50, x: 0, temp: 24.5 } })
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
| `size` | px | 120 | 直径 |
| `value-color` | color | `#10b981` | 弧线颜色 |
| `track-color` | color | `#e5e7eb` | 轨道颜色 |
| `stroke-width` | px | 6 | 弧线粗细 |
| `decimals` | number | 0 | 显示小数位 |

### 事件

| 事件 | 触发时机 |
|---|---|
| `change` | 拖动 / 滚轮时，`event.detail.value` 是新值 |

## 操作方式

- **鼠标拖动**：按住上下拖。拖 100px = 一个完整 range
- **滚轮**：每次 ±step
- **触摸**：手机 / 平板上同鼠标拖动

## 细节

### 与 slider 的区别

| | `<nova-slider>` | `<nova-knob>` |
|---|---|---|
| 交互 | 线性拖动 | 圆形旋转 |
| 适合 | 进度 / 亮度 | 音量 / 温度 / 工业参数 |
| 视觉 | 直线 | 圆弧 |
| 占用空间 | 宽 | 方 |

两种组件底层都是 `model` + min/max/step，**选哪个看场景**。

### 三个旋钮联动

```html
<div class="flex gap-4">
  <nova-knob model="r" min="0" max="255" value-color="#ef4444"></nova-knob>
  <nova-knob model="g" min="0" max="255" value-color="#10b981"></nova-knob>
  <nova-knob model="b" min="0" max="255" value-color="#3b82f6"></nova-knob>
</div>
<div :style="{ background: 'rgb(' + r + ',' + g + ',' + b + ')' }"
     style="width:100%;height:40px;margin-top:12px;border-radius:4px"></div>
```

拖三个旋钮调出任意颜色。

### 触摸设备

`<nova-knob>` 自带 `touch-action: none`，防止浏览器吞掉触摸事件。在手机上拖动顺滑。

### 源码

`nova-ui-elements.js` 里搜 `NovaKnob`，约 100 行（包含 SVG 弧线计算）。

## 下一步

- [`<nova-modal>`](./nova-modal) — 弹窗
- [`<nova-slider>`](./nova-slider) — 线性滑块
---

**返回**：[概念 →](./index) · [原理 →](./principle) · [引入 →](./setup)
