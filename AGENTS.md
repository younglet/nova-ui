# AGENTS.md — nova-ui

> AI 助手用的项目指南。

## 一句话

**nova-ui** 是 IoT 组件库。CSS-only 静态组件 + `<nova-*>` 自定义元素动态组件。9 个动态 + 20 个静态。

## 目标平台

和 novajs 配套：ESP32 + MicroPython 当 server，把 CSS + JS dump 到 flash。

| 层 | 文件 | 大小 | 用法 |
|---|---|---|---|
| 原子 CSS | `nova-style.css` | 7 KB min | 静态工具类 |
| 组件 CSS | `nova-ui.css` | 18 KB min | `.btn` / `.card` 等 |
| 静态组件 | 直接用 class | — | `<div class="sensor-card">` |
| 动态组件 | `nova-ui-elements.js` | 21 KB min | `<nova-switch model="x">` |
| 反应式 | `novajs.js`（从 nova-js 同步） | 13 KB min | `nova({...})` |

**没有** 函数式 API（早期做过 `novaUi.switch({...})`，已删——只留自定义元素一种方式）。

## 跑通

```bash
cd nova-frontend/nova-ui
npm install                 # terser + csso + vitepress
npm run build               # src/novajs.js + nova-ui-elements.js → min
npm run docs:dev            # 起 docs 站点（5175 端口）
cd test && npm install && node run.js   # 37 个测试
```

测试用 jsdom + vm.createContext，跟 nova-js 一样的模式。

## 关键文件

```
nova-ui/
├── AGENTS.md                       ← 你正在看的
├── nova-style.min.css              ← 原子工具（属于 nova-style 项目，副本）
├── nova-ui.css                     ← 组件样式
├── nova-ui.min.css                 ← 压缩
├── nova-ui-elements.js             ← 9 个自定义元素
├── nova-ui-elements.min.js         ← 压缩
├── novajs.js / novajs.min.js       ← 反应式内核（从 nova-js 同步）
├── package.json                    ← build / sync / docs:dev / docs:build
├── Dockerfile
├── scripts/
│   ├── esp32-serial.js             ← Web Serial 写文件到 ESP32
│   └── sync-public.js              ← 把 src / examples / index.novaui.html 同步到 docs/public/
├── index.novaui.html               ← ESP32 /static/ 入口 HTML
├── docs/
│   ├── guide/                      ← 安装/哲学/暗色模式/主题
│   ├── components/                 ← 20 个静态组件 + 13 个动态组件页
│   └── .vitepress/
│       ├── config.ts               ← sidebar 配置
│       └── theme/
│           ├── index.ts            ← 注册 Esp32Flasher 全局组件
│           ├── style.css
│           └── components/
│               └── Esp32Flasher.vue ← Web Serial 一键烧录按钮（内联 esp32-serial.js）
├── test/05-elements.test.js        ← 37 个自定义元素测试
└── examples/                       ← 14 个 HTML demo
    ├── 01-buttons.html ~ 08-complete-app.html  静态 demo
    ├── 09-js-api.html                          动态组件 demo
    ├── 10-custom-elements.html                 同上备用
    ├── 11-tabs.html                            动态 demo
    ├── 12-tag-input.html
    ├── 13-color-picker.html
    └── 14-thermostat.html
```

## 核心约定

### 1. 静态组件 vs 动态组件

**静态** = 只用 CSS 类，零 JS：
```html
<div class="sensor-card">
  <div class="sensor-label">温度</div>
  <div class="sensor-value">24.5</div>
</div>
```

**动态** = 用 `<nova-*>` 自定义元素，自动响应式：
```html
<nova-switch model="power" variant="primary"></nova-switch>
```

两种可以混用。

### 2. 9 个动态组件

| 元素 | 用途 |
|---|---|
| `<nova-switch>` | 开关 |
| `<nova-slider>` | 滑块（带 debounce，发 `change` + `debounced-change` 事件） |
| `<nova-input-mask>` | 输入掩码（手机号/身份证等，支持 `validate` URL 模板异步校验） |
| `<nova-knob>` | 旋钮（支持 `format` 属性：`percent` / `number` / `bytes`，fallback 到本地） |
| `<nova-modal>` | 弹窗（带 slot） |
| `<nova-tabs>` | 标签页（data-tab 配对，键盘 ← → 切换） |
| `<nova-tag-input>` | 设备标签输入（Enter 添加 / Backspace 删） |
| `<nova-color-picker>` | HSV 三轴调色（HEX 双向同步） |
| `<nova-thermostat>` | 温度控制组合（slider + 模式按钮 + 状态点） |

每个组件都有自己的文档页：`docs/components/dynamic/nova-XXX.md`。

### 3. Esp32Flasher Vue 组件

`docs/.vitepress/theme/components/Esp32Flasher.vue` 是一键烧录按钮。原理：

```js
import esp32SerialCode from '../../../../scripts/esp32-serial.js?raw'
// 不能用 new Function() — Vite ?raw 把反引号转义成 \`，new Function 会报语法错
// 用 <script> 元素注入：浏览器原生解析器天然处理 \` 和 \${
const script = document.createElement('script')
script.textContent = esp32SerialCode
document.head.appendChild(script)
```

使用：

```md
<Esp32Flasher project="novajs" />
```

`project` 决定写入哪些文件。在组件的 `PROJECTS` 常量里定义。

### 4. 文档结构

```
docs/
├── guide/                        安装 / 哲学 / 暗色 / 主题
└── components/
    ├── index.md                  组件总览
    ├── button.md ~ toast.md      20 个静态组件页
    └── dynamic/                  13 个动态组件页
        ├── index.md              概念
        ├── principle.md          原理
        ├── setup.md              引入
        └── nova-switch.md 等     9 个组件详细页
```

侧边栏在 `docs/.vitepress/config.ts`：
- `/components/` 键 → 静态组件侧边栏
- `/components/dynamic/` 键 → 动态组件侧边栏（独立）

VitePress 用最长前缀匹配，所以两边各看各的。

### 5. 添加新静态组件

1. `nova-ui.css` 加 `.your-component { ... }` class
2. `docs/components/your-component.md` 写文档（效果 → 代码 → 细节）
3. `docs/.vitepress/config.ts` sidebar 加链接
4. `examples/` 加 demo HTML

### 6. 添加新动态组件

1. `nova-ui-elements.js` 加 `customElements.define('nova-foo', ...)`
2. docs 加 `docs/components/dynamic/nova-foo.md`
3. sidebar 加链接
4. `test/05-elements.test.js` 加测试
5. examples 加 demo

## 改动会影响什么

| 改这个 | 也会影响 |
|---|---|
| `nova-ui.css` | 20 个静态组件的样式（要看所有 demo） |
| `nova-ui-elements.js` | 9 个自定义组件 + 所有 docs demo iframe |
| `novajs.js`（同步副本） | 所有动态组件 + 所有 nova-js 的功能 |
| 加新组件 | sidebar / docs / demo 都要同步 |
| 改属性 API | 所有 demo iframe 都坏 |
| 改 `Esp32Flasher.vue` | 4 个项目都有独立副本（不共享） |

## 提交前 checklist

```bash
cd nova-frontend/nova-ui/test && node run.js    # 37/37 ✅
cd ../nova-frontend/nova-ui && npm run docs:build   # 构建过
```

打开 `docs/public/examples/09-js-api.html` 在浏览器手动测交互。

如果改了 `src/novajs.js`，记得从 nova-js 同步过来：

```bash
cp ../nova-js/src/novajs.js src/novajs.js
```

## 不要做的事

- ❌ 加函数式 API（`novaUi.switch({...})`）——只留自定义元素
- ❌ 加 JS 逻辑到 `nova-ui.css`
- ❌ 改 nova-style.css（那是另一个项目）
- ❌ 改 `<nova-*>` 的 tag 名（破坏现有 demo 和用户代码）
- ❌ 把 `nova-ui-elements.js` 拆成多个文件（保持单文件）
- ❌ 在 `<nova-*>` 直接用于 .md（SSR 会崩），用 iframe 嵌入 demo
