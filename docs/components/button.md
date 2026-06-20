# Button 按钮

## 效果预览

7 种颜色 × 3 种尺寸的按钮，鼠标移上去能看到 hover 效果：

<div class="flex flex-wrap gap-2 my-4">
  <button class="btn btn-primary">主操作</button>
  <button class="btn btn-success">成功</button>
  <button class="btn btn-error">错误</button>
  <button class="btn btn-warning">警告</button>
  <button class="btn btn-neutral">中性</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-outline">Outline</button>
</div>

<div class="flex flex-wrap items-center gap-2 my-4">
  <button class="btn btn-primary btn-sm">小</button>
  <button class="btn btn-primary">默认</button>
  <button class="btn btn-primary btn-lg">大</button>
</div>

---

## 极简代码

一个按钮 = **基础类 `.btn`** + **颜色类 `.btn-{color}`**：

```html
<button class="btn btn-primary">主按钮</button>
```

加尺寸、形状、状态：

```html
<button class="btn btn-primary btn-sm">小按钮</button>
<button class="btn btn-primary btn-lg btn-block">占满宽度</button>
<button class="btn btn-primary" disabled>禁用</button>
```

---

## 修改和应用

### 改颜色

把 `.btn-primary` 换成其他颜色类即可：

| class | 颜色 | 何时用 |
|---|---|---|
| `.btn-primary` | 蓝 | 主操作（保存、提交） |
| `.btn-success` | 绿 | 确认、开始 |
| `.btn-error` | 红 | 危险（删除、停止） |
| `.btn-warning` | 黄 | 警告操作 |
| `.btn-neutral` | 灰 | 中性（取消） |
| `.btn-ghost` | 透明 | 隐藏样式，hover 才显形 |
| `.btn-outline` | 白底+边框 | 次要按钮 |

效果：

<div class="flex flex-wrap gap-2">
  <button class="btn btn-primary">.btn-primary</button>
  <button class="btn btn-success">.btn-success</button>
  <button class="btn btn-error">.btn-error</button>
  <button class="btn btn-warning">.btn-warning</button>
  <button class="btn btn-neutral">.btn-neutral</button>
  <button class="btn btn-ghost">.btn-ghost</button>
  <button class="btn btn-outline">.btn-outline</button>
</div>

### 改尺寸

| class | 大小 |
|---|---|
| `.btn-sm` | 小（用于紧凑场景） |
| `.btn` | 默认 |
| `.btn-lg` | 大（用于 CTA） |

效果：

<div class="flex items-center gap-2">
  <button class="btn btn-primary btn-sm">小</button>
  <button class="btn btn-primary">默认</button>
  <button class="btn btn-primary btn-lg">大</button>
</div>

### 改形状

| class | 效果 |
|---|---|
| `.btn-block` | 占满父容器宽度 |
| `.btn-circle` | 圆形（图标按钮） |

效果：

<div class="flex flex-col gap-2 mb-2">
  <button class="btn btn-primary btn-block">占满宽度（block）</button>
  <button class="btn btn-outline btn-block">次要按钮 block</button>
</div>

<div class="flex gap-2">
  <button class="btn btn-primary btn-circle">+</button>
  <button class="btn btn-error btn-circle">×</button>
  <button class="btn btn-success btn-circle">✓</button>
  <button class="btn btn-neutral btn-circle">⚙</button>
</div>

### 禁用

加 `disabled` 属性即可：

```html
<button class="btn btn-primary" disabled>禁用按钮</button>
```

效果：

<button class="btn btn-primary" disabled>禁用按钮</button>

### 图标 + 文字

按钮内置 `gap`，emoji 和文字会自动分开：

```html
<button class="btn btn-primary">💾 保存</button>
```

效果：

<div class="flex gap-2 flex-wrap">
  <button class="btn btn-primary">💾 保存</button>
  <button class="btn btn-success">✅ 提交</button>
  <button class="btn btn-error">🗑 删除</button>
</div>

---

## 实际场景

### 确认对话框（最常用）

```html
<div class="flex gap-2 justify-end">
  <button class="btn btn-ghost">取消</button>
  <button class="btn btn-outline">稍后</button>
  <button class="btn btn-error">确认删除</button>
</div>
```

效果：

<div class="flex gap-2 justify-end my-4">
  <button class="btn btn-ghost">取消</button>
  <button class="btn btn-outline">稍后</button>
  <button class="btn btn-error">确认删除</button>
</div>

### 表单底部

```html
<div class="flex gap-2">
  <button class="btn btn-primary btn-block">保存</button>
  <button class="btn btn-outline btn-block">取消</button>
</div>
```

效果：

<div class="flex gap-2 my-4">
  <button class="btn btn-primary btn-block">保存</button>
  <button class="btn btn-outline btn-block">取消</button>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 只写 `.btn` 没颜色 | 必加 `.btn-primary` 等 |
| 父元素用 `.btn-block` | `.btn-block` 是按钮自己的类 |
| 给禁用按钮加 `cursor-pointer` | 用 `<button disabled>`，Nova UI 自动 `.cursor-not-allowed` |

---

## 下一步

- 📊 [Card 卡片](/components/card) — 容器
- 🌡️ [Sensor Card 传感器卡片](/components/sensor-card) — IoT 数据展示