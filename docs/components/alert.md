# Alert 提示框

## 效果预览

<div class="flex flex-col gap-2 my-4">
  <div class="alert alert-info">
    <span class="alert-icon">💡</span>
    <div class="alert-content">
      <div class="alert-title">系统提示</div>
      <div>检测到新固件版本 v2.1.0。</div>
    </div>
  </div>
  <div class="alert alert-success">
    <span class="alert-icon">✅</span>
    <div class="alert-content">
      <div class="alert-title">操作成功</div>
      <div>设备已添加到您的账户。</div>
    </div>
  </div>
  <div class="alert alert-warning">
    <span class="alert-icon">⚠️</span>
    <div class="alert-content">
      <div class="alert-title">注意</div>
      <div>电池电量低于 20%。</div>
    </div>
  </div>
  <div class="alert alert-error">
    <span class="alert-icon">❌</span>
    <div class="alert-content">
      <div class="alert-title">错误</div>
      <div>设备连接断开，请检查网络。</div>
    </div>
  </div>
</div>

---

## 极简代码

一个提示框 = **`.alert`** + **类型 `.alert-{type}`** + **图标 + 内容**：

```html
<div class="alert alert-info">
  <span class="alert-icon">💡</span>
  <div class="alert-content">
    <div class="alert-title">提示</div>
    <div>这是一条提示信息</div>
  </div>
</div>
```

最小版本（不要标题）：

```html
<div class="alert alert-success">✅ 保存成功！</div>
```

---

## 修改和应用

### 改类型

| class | 颜色 | 用途 |
|---|---|---|
| `.alert-info` | 蓝 | 信息提示 |
| `.alert-success` | 绿 | 成功 |
| `.alert-warning` | 黄 | 警告 |
| `.alert-error` | 红 | 错误 |

效果：

<div class="flex flex-col gap-2 my-4">
  <div class="alert alert-info">💡 info 提示</div>
  <div class="alert alert-success">✅ success 提示</div>
  <div class="alert alert-warning">⚠️ warning 提示</div>
  <div class="alert alert-error">❌ error 提示</div>
</div>

### 子元素

| class | 作用 |
|---|---|
| `.alert-icon` | 左侧图标（emoji 或 SVG） |
| `.alert-content` | 内容容器 |
| `.alert-title` | 标题（粗体） |

```html
<div class="alert alert-warning">
  <span class="alert-icon">⚠️</span>
  <div class="alert-content">
    <div class="alert-title">这是标题</div>
    <div>这是详细说明文字...</div>
  </div>
</div>
```

效果：

<div class="alert alert-warning my-4">
  <span class="alert-icon">⚠️</span>
  <div class="alert-content">
    <div class="alert-title">这是标题</div>
    <div>这是详细说明文字...</div>
  </div>
</div>

### 不要图标

直接放文字也行，自动左对齐：

```html
<div class="alert alert-error">连接失败，请重试。</div>
```

效果：

<div class="alert alert-error my-4">连接失败，请重试。</div>

---

## 实际场景

### 表单验证失败

```html
<form>
  <label>邮箱</label>
  <input type="email" value="invalid-email">
  <div class="alert alert-error mt-2">
    <span class="alert-icon">❌</span>
    <div class="alert-content">邮箱格式不正确</div>
  </div>
</form>
```

效果：

<div class="my-4">
  <label>邮箱</label>
  <input type="email" value="invalid-email">
  <div class="alert alert-error mt-2">
    <span class="alert-icon">❌</span>
    <div class="alert-content">邮箱格式不正确</div>
  </div>
</div>

### 系统通知区

```html
<div class="flex flex-col gap-2">
  <div class="alert alert-info">💡 系统将于今晚 22:00 维护</div>
  <div class="alert alert-success">✅ 5 台设备已成功添加</div>
</div>
```

效果：

<div class="flex flex-col gap-2 my-4">
  <div class="alert alert-info">💡 系统将于今晚 22:00 维护</div>
  <div class="alert alert-success">✅ 5 台设备已成功添加</div>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| Alert 写很长段落 | Alert 应保持简短，详细用 Modal |
| 严重警告用 Alert | 关键警告用 [Modal](/components/modal) 更醒目 |
| Alert 里塞很多按钮 | Alert 只是提示，操作应该用 Modal |

---

## 下一步

- 🔔 [Toast 通知](/components/toast) — 短时弹出
- 🪟 [Modal 弹窗](/components/modal) — 需要交互的提示