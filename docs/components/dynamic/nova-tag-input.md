# ‹nova-tag-input›

> 输入设备标签 · 回车添加 · Backspace 删除 · × 移除指定

## 基础用法

```html
<nova-tag-input model="deviceTags" placeholder="输入后回车"></nova-tag-input>
```

```js
nova({ data: { deviceTags: ['客厅', '主卧'] } })
```

<iframe src="/examples/12-tag-input.html" width="100%" height="200" frameborder="0" style="border-radius:8px"></iframe>

## 属性

| 属性 | 说明 | 默认 |
|---|---|---|
| `model` | data 字段（字符串数组） | `tags` |
| `placeholder` | 输入框占位符 | `输入后回车` |
| `separator` | 视为"添加"的键（默认 Enter） | `,` |

## 交互

- **输入 + Enter**：添加新标签
- **Backspace（空输入时）**：删除最后一枚
- **点击 × 按钮**：删除指定标签

## 编程控制

```html
<button @click="deviceTags.push('客房')">添加"客房"</button>
<button @click="deviceTags = []">清空</button>
```

## 暗色模式

继承 nova-style 的 `.dark` class。

```html
<body class="dark">
  <nova-tag-input model="tags"></nova-tag-input>
</body>
```
