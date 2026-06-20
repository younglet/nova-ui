# 概念

> 什么是"动态组件"？为什么需要它？

## 一个问题

nova-ui 的 **CSS 组件**（`<label class="switch">`）漂亮、轻量、但**不会响应式**——你点了开关，啥都不会发生。

要让它响应式，得自己写：

```js
const input = document.querySelector('.switch input')
input.addEventListener('change', () => {
  // 同步到 data
})
data.$watch('power', (newValue) => {
  // data 变了 → 改 DOM
  input.checked = newValue
})
```

每个组件都这样写一次？IoT 项目 50+ 个组件 → 200+ 行样板代码。

## 解决：动态组件

**动态组件 = CSS 组件 + 自定义元素（HTML 标签） + novajs 响应式**

```html
<!-- 写一次，自动响应式 -->
<nova-switch model="power"></nova-switch>
```

不需要写事件监听、不需要写 `$watch`、不需要手动同步 DOM。

## 静态 vs 动态对比

| | 静态（CSS-only） | 动态（自定义元素） |
|---|---|---|
| HTML 写法 | `<label class="switch">…</label>` | `<nova-switch model="power">` |
| 响应式 | ❌ 不会 | ✅ 自动 |
| 双向绑定 | ❌ 手写 onchange | ✅ `model` 属性 |
| 防抖 | ❌ 自己写 | ✅ `debounce` 属性 |
| 文件 | `nova-ui.css` | `nova-ui.css` + `novajs.js` + `nova-ui-elements.js` |
| 适合 | 静态展示 / 文档 | 实际交互页面 |

**两种可以混用**——同一个页面里同时有静态按钮和动态开关。

## 一个例子

需求：一个电源开关，点了之后通知服务器。

### 静态版（10 行 JS）

```html
<label class="switch">
  <input type="checkbox" id="sw">
  <span class="switch-slider"></span>
</label>

<script>
  const sw = document.getElementById('sw')
  sw.addEventListener('change', async () => {
    await fetch('/api/device/power', { method: 'POST', body: JSON.stringify({ on: sw.checked }) })
    sw.checked ? alert('已开启') : alert('已关闭')
  })
</script>
```

### 动态版（0 行 JS）

```html
<nova-switch model="power" @change="toggle()"></nova-switch>

<script>
  nova({
    data: { power: false },
    funcs: {
      toggle () {
        nova.http.post('/api/device/power', { on: this.power })
      }
    }
  })
</script>
```

## 接下来

- [原理 →](./principle) — 动态组件是怎么工作的
- [引入 →](./setup) — 必须引入哪些 JS
- [`<nova-switch>` →](./nova-switch)
- [`<nova-slider>` →](./nova-slider)
- [`<nova-input-mask>` →](./nova-input-mask)
- [`<nova-knob>` →](./nova-knob)
- [`<nova-modal>` →](./nova-modal)