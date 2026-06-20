# Divider 分割线

## 效果预览

<hr class="divider my-4">

<div class="divider-text my-4"><span>或</span></div>

<div class="flex items-center my-4" style="height: 60px;">
  <span>选项 1</span>
  <hr class="divider-vertical">
  <span>选项 2</span>
  <hr class="divider-vertical">
  <span>选项 3</span>
</div>

---

## 极简代码

最简单的水平分割线：

```html
<hr class="divider">
```

带文字的分割线：

```html
<div class="divider-text"><span>或</span></div>
```

---

## 修改和应用

### 三种变体

| class | 效果 |
|---|---|
| `.divider` | 水平线（默认） |
| `.divider-text` | 带文字的水平线 |
| `.divider-vertical` | 垂直线（用于 flex 容器中） |

效果：

<hr class="divider my-3">
<div class="divider-text my-3"><span>或</span></div>
<div class="flex items-center my-3">
  <span>A</span>
  <hr class="divider-vertical">
  <span>B</span>
  <hr class="divider-vertical">
  <span>C</span>
</div>

### 改文字内容

```html
<div class="divider-text"><span>其他登录方式</span></div>
```

效果：

<div class="divider-text my-3"><span>其他登录方式</span></div>

---

## 实际场景

### 表单底部"或"

```html
<form>
  <input type="email" placeholder="邮箱">
  <input type="password" placeholder="密码">
  <button class="btn btn-primary btn-block">登录</button>

  <div class="divider-text"><span>或</span></div>

  <button class="btn btn-outline btn-block">微信登录</button>
</form>
```

效果：

<form class="my-4" style="max-width: 320px;">
  <input type="email" placeholder="邮箱" class="mb-2">
  <input type="password" placeholder="密码" class="mb-2">
  <button class="btn btn-primary btn-block mb-2">登录</button>
  <div class="divider-text my-2"><span>或</span></div>
  <button class="btn btn-outline btn-block">微信登录</button>
</form>

### 设置页分组

```html
<h3 class="text-sm font-bold text-gray-500 mb-2">账户设置</h3>
<input type="text" placeholder="用户名">
<input type="email" placeholder="邮箱">

<hr class="divider my-4">

<h3 class="text-sm font-bold text-gray-500 mb-2">通知设置</h3>
<label class="flex items-center gap-2"><input type="checkbox"> 邮件通知</label>
```

效果：

<div class="my-4" style="max-width: 320px;">
  <h3 class="text-sm font-bold text-gray-500 mb-2">账户设置</h3>
  <input type="text" placeholder="用户名" class="mb-2">
  <input type="email" placeholder="邮箱" class="mb-2">
  <hr class="divider my-4">
  <h3 class="text-sm font-bold text-gray-500 mb-2">通知设置</h3>
  <label class="flex items-center gap-2 text-sm"><input type="checkbox"> 邮件通知</label>
</div>

---

## 下一步

- 🧭 [Breadcrumb 面包屑](/components/breadcrumb)