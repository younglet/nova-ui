# 引入

> 使用动态组件必须引入哪些 JS / CSS？

## 必须的 4 个文件

```html
<!-- 1. 原子 CSS（可选，但推荐） -->
<link rel="stylesheet" href="nova-style.css">

<!-- 2. 组件样式（动态组件必需） -->
<link rel="stylesheet" href="nova-ui.css">

<!-- 3. 反应式内核（动态组件必需） -->
<script src="novajs.js"></script>

<!-- 4. 自定义元素（动态组件必需） -->
<script src="nova-ui-elements.js"></script>
```

## 体积（min 后）

| 文件 | 大小 | 必需 |
|---|---|---|
| `nova-style.css` | ~10 KB | 可选 |
| `nova-ui.css` | ~12 KB | ✅ |
| `novajs.js` | 9 KB | ✅ |
| `nova-ui-elements.js` | 11 KB | ✅ |
| **合计** | **~42 KB** | |

如果只用自定义元素不用 nova-style 原子类，**最小 ~32 KB**。

## 加载顺序

**严格按这个顺序**——否则 `<nova-*>` 标签不会被识别：

```html
<!-- 顺序：CSS → 反应式内核 → 自定义元素 -->
<link rel="stylesheet" href="nova-ui.css">
<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>

<nova-switch model="power"></nova-switch>  <!-- 在 scripts 之后用 -->
```

**为什么这个顺序？**

1. `nova-ui.css` 提供样式（独立，无依赖）
2. `novajs.js` 定义 `nova()` 函数
3. `nova-ui-elements.js` 用 `nova.bind()` 绑定，所以必须在 novajs.js 之后
4. `<nova-*>` 元素**升级**只在 customElements.define 之后才能识别

## 文件在哪？

最小工程结构：

```
my-project/
├── index.html
├── nova-style.css          # 静态资源
├── nova-ui.css
├── novajs.js
├── novajs.min.js           # 生产用 min 版
├── nova-ui-elements.js
└── nova-ui-elements.min.js
```

**生产用 min 版**（`*.min.js`），开发可以用 dev 版（方便调试）。

## CDN / 单文件部署（IoT 设备）

ESP32 / 路由器等嵌入式设备，**单文件部署**最简单：

```bash
# 把 4 个文件合并（可选）
cat nova-ui.css novajs.min.js nova-ui-elements.min.js > bundle.txt
# 或者直接 4 个文件 dump 到 flash
```

页面里相对路径引用：

```html
<link rel="stylesheet" href="nova-ui.css">
<script src="novajs.min.js"></script>
<script src="nova-ui-elements.min.js"></script>
```

## 一个完整最小例子

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IoT 控制台</title>
  <link rel="stylesheet" href="nova-ui.css">
</head>
<body>
  <nova-switch model="power"></nova-switch>
  <nova-slider model="brightness" min="0" max="100" debounce="400"></nova-slider>

  <script src="novajs.js"></script>
  <script src="nova-ui-elements.js"></script>
  <script>
    nova({
      data: {
        power: false,
        brightness: 50
      },
      funcs: {
        // 滑块停下后保存
      }
    })
  </script>
</body>
</html>
```

这个 HTML 不到 30 行，**直接扔进 ESP32 的静态目录**就能跑。

## 加载失败排查

### `<nova-switch>` 看起来是空白的

- `nova-ui.css` 没加载 → 组件没样式
- `nova-ui-elements.js` 没加载 → 标签不识别
- `novajs.js` 没加载 → `nova.bind` 不存在，控制台报错

**检查控制台**，通常会有 `customElements is not defined` 或 `nova is not defined`。

### 输入框不响应

- `nova-ui-elements.js` 在 `novajs.js` **之前**加载 → `nova` 还没定义就执行 nova-ui-elements → 失败

**修**：调整 `<script>` 标签顺序。

### model 改了但 UI 没变

- `novajs.js` 的 `nova()` 没被调用 → 没有 data proxy
- `model` 字段名写错了 → Proxy.set 不触发对应 effect

**检查**：控制台有没有 `Cannot read property 'xxx' of undefined`。

## 下一步

- [概念 →](./index) — 什么是动态组件
- [原理 →](./principle) — 怎么工作
- [`<nova-switch>` →](./nova-switch) — 第一个组件