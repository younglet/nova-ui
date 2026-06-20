# ‹nova-thermostat›

> 温度控制组合 · 大字读数 + 模式按钮 + 滑块 + 状态点

## 基础用法

```html
<nova-thermostat model="temp" mode-model="mode" min="16" max="30" step="0.5" unit="°C"></nova-thermostat>
```

```js
nova({ data: { temp: 22, mode: 'cool' } })
```

<iframe src="/examples/14-thermostat.html" width="100%" height="500" frameborder="0" style="border-radius:8px"></iframe>

## 属性

| 属性 | 说明 | 默认 |
|---|---|---|
| `model` | 温度 data 字段 | `temp` |
| `mode-model` | 模式 data 字段（`cool` / `heat` / `auto` / `off`） | `mode` |
| `min` / `max` | 温度范围 | `16` / `30` |
| `step` | 步进 | `0.5` |
| `unit` | 单位文字 | `°C` |

## 模式

| 值 | 图标 | 状态点色 |
|---|---|---|
| `cool` | ❄ | 蓝 `#3b82f6` |
| `heat` | ☀ | 红 `#ef4444` |
| `auto` | A | 绿 `#10b981` |
| `off` | ⏻ | 灰 `#6b7280` |

点模式按钮 → `data[modeModel]` 切换 → 状态点变色 + 高亮当前按钮。

## 组合 `nova-slider`

`nova-thermostat` 内部用 `<nova-slider>` 做温度调节，所以 nova-slider 的 `debounce` 也可叠加（在内部 nova-slider 元素加 `debounce` 属性）。

## 暗色

继承 nova-style 的 `.dark` class。
