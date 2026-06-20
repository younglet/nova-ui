# AGENTS.md — nova-ui

> AI 助手用的项目指南。

## 一句话

**nova-ui** 是 IoT 组件库。CSS-only 静态组件 + `<nova-*>` 自定义元素动态组件。

## 目标平台

和 novajs 配套：ESP32 + MicroPython 当 server，把 CSS + JS dump 到 flash。

| 层 | 文件 | 大小 | 用法 |
|---|---|---|---|
| 原子 CSS | `nova-style.css` | 12 KB | 静态工具类 |
| 组件 CSS | `nova-ui.css` | 12 KB | `.btn` / `.card` 等 |
| 静态组件 | 直接用 class | — | `<div class="sensor-card">` |
| 动态组件 | `nova-ui-elements.js` | 11 KB | `<nova-switch model="x">` |

**没有** 函数式 API（早期做过 `novaUi.switch({...})`，已删——只留自定义元素一种方式）。

## 跑通

```bash
cd nova-frontend/nova-ui
ls *.css *.js          # 主文件
cd test && npm install && node run.js   # 22 个测试
```

测试用 jsdom + vm.createContext，跟 nova-js 一样的模式。

## 关键文件

```
nova-ui/
├── AGENTS.md                       ← 你正在看的
├── nova-style.css                  ← 原子工具（属于 nova-style 项目）
├── nova-ui.css                     ← 组件样式
├── nova-ui-elements.js             ← 5 个自定义元素（主 JS）
├── nova-ui-elements.min.js         ← 压缩版
├── novajs.js / novajs.min.js       ← 反应式内核（同步过来）
├── package.json                    ← VitePress + jsdom
├── docs/
│   ├── guide/                      ← 安装/哲学/暗色模式/主题
│   ├── components/                 ← 20 个静态组件 + 8 个动态组件页
│   └── .vitepress/config.ts        ← sidebar 配置
├── test/05-elements.test.js        ← 22 个自定义元素测试
└── examples/                       ← 11 个 HTML demo
    ├── 01-buttons.html ~ 08-complete-app.html  静态 demo
    ├── 09-js-api.html                          动态组件 demo
    ├── 10-custom-elements.html                 同上备用
    ├── with-nova-ui/                           nova-style 静态样式
    └── demos/                                  小 demo 片段
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

### 2. 5 个动态组件

| 元素 | 用途 | 文件 |
|---|---|---|
| `<nova-switch>` | 开关 | `nova-ui-elements.js` |
| `<nova-slider>` | 滑块（带 debounce） | 同上 |
| `<nova-input-mask>` | 输入掩码（手机号/身份证等）| 同上 |
| `<nova-knob>` | 旋钮 | 同上 |
| `<nova-modal>` | 弹窗（带 slot） | 同上 |

每个组件都有自己的文档页：`docs/components/dynamic/nova-XXX.md`。

### 3. 文档结构

```
docs/
├── guide/                        安装 / 哲学 / 暗色 / 主题
└── components/
    ├── index.md                  组件总览
    ├── button.md ~ toast.md      20 个静态组件页
    └── dynamic/                  8 个动态组件页
        ├── index.md              概念
        ├── principle.md          原理
        ├── setup.md              引入
        └── nova-switch.md 等     5 个组件详细页
```

侧边栏在 `docs/.vitepress/config.ts`：
- `/components/` 键 → 静态组件侧边栏
- `/components/dynamic/` 键 → 动态组件侧边栏（独立）

VitePress 用最长前缀匹配，所以两边各看各的。

### 4. 添加新静态组件

1. `nova-ui.css` 加 `.your-component { ... }` class
2. `docs/components/your-component.md` 写文档（效果 → 代码 → 细节）
3. `docs/.vitepress/config.ts` sidebar 加链接
4. `examples/` 加 demo HTML

### 5. 添加新动态组件

1. `nova-ui-elements.js` 加 `customElements.define('nova-foo', ...)`
2. docs 加 `docs/components/dynamic/nova-foo.md`
3. sidebar 加链接
4. `test/05-elements.test.js` 加测试
5. examples 加 demo

## 改动会影响什么

| 改这个 | 也会影响 |
|---|---|
| `nova-ui.css` | 20 个静态组件的样式（要看所有 demo） |
| `nova-ui-elements.js` | 5 个自定义组件 + 所有 docs demo iframe |
| 加新组件 | sidebar / docs / demo 都要同步 |
| 改属性 API | 所有 demo iframe 都坏 |

## 提交前 checklist

```bash
cd nova-frontend/nova-ui/test && node run.js    # 22/22 ✅
cd ../nova-frontend/nova-ui && npx vitepress build docs   # 构建过
```

打开 `docs/public/examples/09-js-api.html` 在浏览器手动测交互。

## 不要做的事

- ❌ 加函数式 API（`novaUi.switch({...})`）——只留自定义元素
- ❌ 加 JS 逻辑到 `nova-ui.css`
- ❌ 改 nova-style.css（那是另一个项目）
- ❌ 改 `<nova-*>` 的 tag 名（破坏现有 demo 和用户代码）
- ❌ 把 `nova-ui-elements.js` 拆成多个文件（保持单文件 11KB）