# Avatar 头像

## 效果预览

<div class="flex items-center gap-3 flex-wrap my-4">
  <div class="avatar avatar-sm">ZC</div>
  <div class="avatar">ZC</div>
  <div class="avatar avatar-lg" style="background-color: var(--blue-500); color: white;">Z</div>
  <div class="avatar" style="background-color: var(--green-500); color: white;">A</div>
  <div class="avatar" style="background-color: var(--red-500); color: white;">B</div>
  <img class="avatar avatar-sm" src="/avatar.jpg" alt="图片头像">
  <img class="avatar" src="/avatar.jpg" alt="图片头像">
  <img class="avatar avatar-lg" src="/avatar.jpg" alt="图片头像">
</div>

---

## 极简代码

一个头像 = **`.avatar`** + 文字（或 `<img>`）：

```html
<div class="avatar">ZC</div>
```

用图片：

```html
<img class="avatar" src="user.jpg" alt="">
```

---

## 修改和应用

### 改尺寸

| class | 大小 | 典型场景 |
|---|---|---|
| `.avatar-sm` | 28px | 列表项、表格 |
| `.avatar` | 40px（默认） | 评论、卡片 |
| `.avatar-lg` | 64px | 个人主页 |

效果：

<div class="flex items-center gap-3">
  <div class="avatar avatar-sm">S</div>
  <div class="avatar">D</div>
  <div class="avatar avatar-lg">L</div>
</div>

### 改颜色

文字头像默认是灰底黑字。要换颜色用内联 `style`：

```html
<div class="avatar" style="background-color: var(--blue-500); color: white;">Z</div>
```

效果：

<div class="flex items-center gap-3">
  <div class="avatar" style="background-color: var(--blue-500); color: white;">蓝</div>
  <div class="avatar" style="background-color: var(--green-500); color: white;">绿</div>
  <div class="avatar" style="background-color: var(--red-500); color: white;">红</div>
  <div class="avatar" style="background-color: var(--yellow-500); color: white;">黄</div>
</div>

---

## 实际场景

### 用户列表

```html
<div class="flex items-center gap-3">
  <div class="avatar">ZC</div>
  <div>
    <div class="font-medium text-sm">张程</div>
    <div class="text-xs text-gray-500">管理员</div>
  </div>
</div>
```

效果：

<div class="flex items-center gap-3 my-4">
  <div class="avatar">ZC</div>
  <div>
    <div class="font-medium text-sm">张程</div>
    <div class="text-xs text-gray-500">管理员</div>
  </div>
</div>

### 头像组（多个叠放）

```html
<div class="flex">
  <div class="avatar" style="border: 2px solid white;">A</div>
  <div class="avatar" style="border: 2px solid white; margin-left: -8px;">B</div>
  <div class="avatar" style="border: 2px solid white; margin-left: -8px;">C</div>
</div>
```

效果：

<div class="flex my-4">
  <div class="avatar" style="border: 2px solid white; background-color: var(--blue-500); color: white;">A</div>
  <div class="avatar" style="border: 2px solid white; margin-left: -8px; background-color: var(--green-500); color: white;">B</div>
  <div class="avatar" style="border: 2px solid white; margin-left: -8px; background-color: var(--red-500); color: white;">C</div>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 头像写 `background: #3b82f6` 硬编码 | 用 `style="background-color: var(--blue-500)"` 跟主题 |
| 用 emoji 代替头像 | emoji 风格不一致 |

---

## 下一步

- 🏷️ [Badge 徽章](/components/badge)
- 🧭 [Breadcrumb 面包屑](/components/breadcrumb)