# `<nova-modal>` 弹窗

> 带 slot 的弹窗。标题 + 主体 + 底部按钮都通过 slot 投影。

## 效果

<iframe src="/examples/09-js-api.html" width="100%" height="380" frameborder="0" style="border-radius:8px"></iframe>

## 代码

```html
<button @click="data.openModal = true">打开弹窗</button>

<nova-modal show="openModal" title="编辑设备">
  <p>设备名称：</p>
  <input model="deviceName" placeholder="输入名字">

  <button slot="footer" @click="data.openModal = false">取消</button>
  <button slot="footer" @click="save()">保存</button>
</nova-modal>

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
<script>
  nova({
    data: { openModal: false, deviceName: '' },
    funcs: {
      save () {
        console.log('保存：' + this.deviceName)
        this.openModal = false
      }
    }
  })
</script>
```

## API

### 属性

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `show` | string | — | 双向绑定的 data 字段（必填） |
| `title` | string | — | 标题 |
| `size` | string | `md` | `sm` / `md` / `lg` |
| `persistent` | boolean | false | 禁用 ESC 和点遮罩关闭 |

### 事件

| 事件 | 触发时机 |
|---|---|
| `open` | 弹窗打开时 |
| `close` | 弹窗关闭时 |

## Slots

```html
<nova-modal show="openModal" title="标题">
  <!-- 默认 slot：弹窗主体 -->
  <p>主体内容</p>

  <!-- 命名 slot：底部按钮（右对齐） -->
  <button slot="footer">取消</button>
  <button slot="footer" class="btn-primary">确认</button>
</nova-modal>
```

## 关闭方式

1. 点右上角 **×** 按钮
2. 点遮罩（灰色半透明背景）
3. 按 **ESC** 键

加 `persistent` 禁用后两种：

```html
<nova-modal show="openModal" persistent>...</nova-modal>
<!-- 必须显式把 show 设 false 才能关 -->
```

## 细节

### 为什么用 shadow DOM？

`<nova-modal>` 是自定义元素，**带 shadow DOM**（其他动态组件如 `<nova-switch>` 是 light DOM）。

原因：slot 投影需要 shadow DOM。

### slot 必须是直接子节点

```html
<!-- ✅ 直接子节点 -->
<nova-modal show="x">
  <button slot="footer">x</button>
</nova-modal>

<!-- ❌ 包了一层 div，slot 失效 -->
<nova-modal show="x">
  <div>
    <button slot="footer">x</button>
  </div>
</nova-modal>
```

### 配合其他动态组件

弹窗里可以放任意东西，包括其他动态组件：

```html
<nova-modal show="openModal" title="设置亮度">
  <nova-slider model="brightness" min="0" max="100" debounce="200"></nova-slider>
  <p>当前：{{ brightness }}%</p>

  <button slot="footer" @click="data.openModal = false">完成</button>
</nova-modal>
```

### 自定义关闭逻辑

`@click` 设 `data.show = false` 即可。`persistent` 时这是唯一关闭方式。

### 源码

`nova-ui-elements.js` 里搜 `NovaModal`，约 80 行。

## 下一步

- [`<nova-switch>`](./nova-switch) — 开关
- [`<nova-slider>`](./nova-slider) — 滑块
---

**返回**：[概念 →](./index) · [原理 →](./principle) · [引入 →](./setup)
