# ‹nova-color-picker›

> HSV 三轴滑块（H/S/V）+ HEX 输入 · 双向绑定

## 基础用法

```html
<nova-color-picker model="themeColor"></nova-color-picker>
```

```js
nova({ data: { themeColor: '#3b82f6' } })
```

效果：

<nova-color-picker model="themeColor"></nova-color-picker>

## 属性

| 属性 | 说明 | 默认 |
|---|---|---|
| `model` | data 字段（HEX 字符串） | `color` |

## 格式

- 接受：`#rgb` / `#rrggbb`（大小写不敏感）
- 写入：统一成 `#rrggbb` 6 位格式
- 非合法 HEX 输入会被忽略（不写入 data）

## 编程控制

```html
<button @click="themeColor = '#ef4444'">红</button>
<button @click="themeColor = '#10b981'">绿</button>
```

UI 会自动同步：滑块位置、HEX 输入框、预览色块都更新。

## 事件

- `change` — 颜色变化时触发，`detail.value` 是 HEX 字符串

## 组合示例：跟随主题

```html
<nova-color-picker model="theme"></nova-color-picker>
<button class="btn" :style="{ background: theme, borderColor: theme }">
  主题按钮
</button>
```
