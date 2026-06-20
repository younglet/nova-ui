# 设计哲学

Nova UI 的几个设计原则，理解了能帮你更快地上手。

## 1. 组件是 utility 的组合

Nova UI 不是一个独立的框架，它是 **Nova Style utility class 的预组合**。

```html
<!-- 自己写 utility 拼一个按钮（很啰嗦） -->
<button class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white cursor-pointer transition font-medium inline-flex items-center justify-center gap-2">保存</button>

<!-- 用 Nova UI 组件（一行） -->
<button class="btn btn-primary">保存</button>
```

**两种写法效果完全一样**，但后者写起来快得多、可读性强、改色方便（只改 `.btn-primary` 一处）。

## 2. 基于 token，自动跟主题

所有组件都用 nova-style 的 CSS 变量（`var(--blue-500)` `var(--nova-surface)` 等），不写死颜色：

```css
/* nova-ui.css 里的实际写法 */
.btn-primary {
  background-color: var(--blue-500);  /* 不是 #3b82f6 */
  color: white;
}
```

**好处**：
- 暗色模式自动适配（颜色变量值在不同主题下不同）
- 改主题色不用动 nova-ui.css，只改 nova-style.css 的 `:root`

## 3. IoT 场景专用

通用 UI 库（Tailwind UI / DaisyUI）没考虑过 IoT 场景。Nova UI 内置了几个**专门组件**：

| 组件 | 通用库 | Nova UI |
|---|---|---|
| 传感器数据展示 | ❌ 自己拼 | ✅ `.sensor-card` |
| 设备控制卡片 | ❌ 自己拼 | ✅ `.device-card` |
| LED 状态点 | ❌ 自己拼 | ✅ `.status-dot` |
| 设备开关 | ⚠️ 有 toggle | ✅ `.switch`（绿色 ON） |

## 4. 一致的状态语义

颜色服务于状态，不是装饰。所有组件都遵循 Nova Style 的颜色约定：

| 颜色 | 语义 |
|---|---|
| 🟢 绿色 | 正常 / 开启 / 成功 |
| 🔴 红色 | 异常 / 关闭 / 错误 |
| 🟡 黄色 | 警告 / 注意 |
| 🔵 蓝色 | 信息 / 主要操作 |
| ⚪ 灰色 | 中性 / 禁用 |

所以 `.btn-success` 一定是绿色、`.alert-error` 一定是红色、`.status-online` 一定是绿色。一致性 > 个性化。

## 5. 最小可用组件集

Nova UI 故意只做 20 个组件，不追求"组件大全"：

- **够用就好**：再多就是 bloat
- **可读可改**：每个组件的 CSS 都是清晰的几十行，学生能看懂
- **易扩展**：要加新组件，按现有模式照抄就行

如果你需要 Tree / Combobox / DatePicker 这类复杂组件，Nova UI 不是为它们设计的——去用 Element Plus / Ant Design 这种组件库。

## 6. 工具类 + 组件，混着用

Nova UI 不强迫你"全组件化"。工具类和组件可以混着用：

```html
<!-- 组件：btn -->
<button class="btn btn-primary mt-4 w-full">占满宽度的按钮</button>

<!-- 组件 + 工具类 -->
<div class="card shadow-lg">                  <!-- 加 nova-style 的 shadow-lg -->
  <div class="card-body p-8">                 <!-- 用 p-8 加大内边距 -->
    <h3 class="card-title">标题</h3>
  </div>
</div>

<!-- 工具类：手写（nova-style 的） -->
<div class="flex items-center justify-between bg-gray-100 p-3 rounded">
  <span>标题</span>
  <span>右侧</span>
</div>
```

这种"组件管通用 UI 模式，工具类管细节调整"的方式让你既快速又灵活。

## 下一步

- 🌙 [暗色模式](/guide/dark-mode)
- 🎨 [主题定制](/guide/theming)
- 🧩 [浏览组件](/components/button)