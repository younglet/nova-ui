# 原理

> 动态组件到底是怎么工作的？

## 三层叠加

```
┌──────────────────────────────────────────────────────────┐
│  nova-ui-elements.js  ──  JS 增强的自定义元素             │
│  把 <nova-switch model="x"> 转成"带交互的 DOM"             │
│  监听 model 属性变化、触发 @change、调用 nova.bind 等        │
├──────────────────────────────────────────────────────────┤
│  nova-ui.css  ──  组件样式（光板 CSS）                     │
│  .switch / .btn / .device-card 等的视觉效果               │
│  静态组件 / 动态组件都共用                                 │
├──────────────────────────────────────────────────────────┤
│  novajs.js  ──  反应式内核（让"动"的部分工作）            │
│  Proxy 自动追踪依赖、改字段 → 自动触发 DOM 更新            │
└──────────────────────────────────────────────────────────┘
```

每层各管一摊：

- **novajs.js**：不知道什么是 UI，只管"data 变了 → 通知所有订阅者"
- **nova-ui.css**：不知道什么是响应式，只管"这个 class 长得好看"
- **nova-ui-elements.js**：把它们串起来——把 `model` 属性变化翻译成 data 变化

## 一个具体例子

`<nova-switch model="power">` 做了什么？

### 1. 定义自定义元素（nova-ui-elements.js）

```js
customElements.define('nova-switch', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<label class="switch">' +
      '<input type="checkbox">' +
      '<span class="switch-slider"></span>' +
      '</label>'
    this._input = this.querySelector('input')

    // 关键：把 input 的变化同步到 data
    const model = this.getAttribute('model')
    nova.bind(model, this._input)  // ← 双向绑定
  }
})
```

### 2. `nova.bind('power', input)` 干了什么（novajs.js）

```js
function bind(path, input) {
  // 1. data → input
  effect(function () {
    input.checked = data[path]  // data.power 变了 → checkbox.checked 自动改
  })

  // 2. input → data
  input.addEventListener('change', function () {
    data[path] = input.checked   // checkbox 变了 → data.power 自动改
  })
}
```

### 3. data 是 Proxy（novajs.js）

```js
const data = nova({ data: { power: false } })
// data.power = true
//   ↓ Proxy.set 触发
//   ↓ 所有订阅了 'power' 的 effect 重跑
//   ↓ effect 改 input.checked
//   ↓ DOM 更新
```

## 三个角色

| 谁 | 干什么 | 不干什么 |
|---|---|---|
| `novajs.js` | data ↔ effect | 不管 UI 长什么样 |
| `nova-ui-elements.js` | 自定义元素 → data 绑定 | 不管视觉 |
| `nova-ui.css` | class → 视觉效果 | 不管响应式 |

**清晰分层 = 各自小 + 各自好测试**。

## 为什么是 `<nova-*>`

为什么不直接 `<switch>`（裸名）？

1. **HTML 里所有标签都是全局的**——`<switch>` 可能跟未来标准 HTML 冲突
2. **所有自定义元素必须有连字符**——这是 [HTML 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) 要求的
3. **`nova-` 前缀**——避免和别的库冲突

## 关于 shadow DOM

5 个元素里，**只有 `<nova-modal>` 用 shadow DOM**。原因：

- 普通元素用 light DOM（和普通 HTML 一样，全局 CSS 生效）
- 弹窗需要 **slot**（`<slot name="footer">`），slot 必须用 shadow DOM

其他 4 个（switch / slider / input-mask / knob）用 light DOM，更简单、更小。

## 接下来

- [引入 →](./setup) — 必须引入哪些 JS
- [`<nova-switch>` →](./nova-switch) — 第一个动态组件
- [`<nova-slider>` →](./nova-slider)