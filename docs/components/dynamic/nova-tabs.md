# ‹nova-tabs›

> 动态切换面板 · 数据双向绑定 · 键盘左右键导航

## 基础用法

```html
<nova-tabs model="active">
  <button slot="tab" data-tab="overview">概览</button>
  <button slot="tab" data-tab="sensors">传感器</button>
  <div slot="panel" data-tab="overview">面板 A 内容</div>
  <div slot="panel" data-tab="sensors">面板 B 内容</div>
</nova-tabs>
```

```js
nova({ data: { active: 'overview' } })
```

效果：

<nova-tabs model="active">
  <button slot="tab" data-tab="overview">概览</button>
  <button slot="tab" data-tab="sensors">传感器</button>
  <div slot="panel" data-tab="overview">当前面板：<code>{{ active }}</code></div>
  <div slot="panel" data-tab="sensors">温度 24.5 °C，湿度 62 %</div>
</nova-tabs>

## 属性

| 属性 | 说明 | 默认 |
|---|---|---|
| `model` | 双向绑定的 data 字段（保存当前 tab 的 `data-tab` 值） | `tab` |

## 子元素约定

- **tab 按钮**：任意带 `slot="tab"` + `data-tab="xxx"` 的元素
- **面板**：任意带 `slot="panel"` + `data-tab="xxx"` 的元素

`data-tab` 是面板与按钮配对的 key。`active` 状态会同步到 `data[model]`。

## 键盘导航

焦点在 tab 上时：

- `←` / `→`：切换上一/下一 tab（到头循环）

## 事件

- `change` — 切换 tab 时触发，`detail.value` 是新的 tab key

## 编程控制

修改 `data.active` 即可切换面板：

```html
<button @click="active = 'sensors'">跳到传感器</button>
```

## 懒加载

面板默认都是 light DOM，可放任意 HTML。如果想"点 tab 再加载"，可以在面板里写 `if="active === 'xxx'"`：

```html
<div slot="panel" data-tab="a" if="active === 'a'">
  <!-- 只有切到 A 才渲染 -->
</div>
```
