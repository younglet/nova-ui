# Breadcrumb 面包屑

## 效果预览

<div class="breadcrumb my-4">
  <span class="breadcrumb-item">首页</span>
  <span class="breadcrumb-separator">/</span>
  <span class="breadcrumb-item">设备</span>
  <span class="breadcrumb-separator">/</span>
  <span class="breadcrumb-item active">客厅灯</span>
</div>

---

## 极简代码

一个面包屑 = **多个 `.breadcrumb-item`** + **`.breadcrumb-separator` 分隔**：

```html
<div class="breadcrumb">
  <span class="breadcrumb-item">首页</span>
  <span class="breadcrumb-separator">/</span>
  <span class="breadcrumb-item">设备</span>
  <span class="breadcrumb-item active">客厅灯</span>
</div>
```

---

## 修改和应用

### 子元素

| class | 作用 |
|---|---|
| `.breadcrumb` | 容器 |
| `.breadcrumb-item` | 路径项（hover 变蓝） |
| `.breadcrumb-item.active` | 当前页（不可点） |
| `.breadcrumb-separator` | 分隔符 |

### 改分隔符

默认是 `/`，可以换成 `›` `→` 等：

```html
<span class="breadcrumb-separator">›</span>
```

效果：

<div class="my-4 space-y-2">
  <div class="breadcrumb">
    <span class="breadcrumb-item">首页</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item">设备</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item active">客厅灯</span>
  </div>
  <div class="breadcrumb">
    <span class="breadcrumb-item">首页</span>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-item">设备</span>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-item active">客厅灯</span>
  </div>
  <div class="breadcrumb">
    <span class="breadcrumb-item">首页</span>
    <span class="breadcrumb-separator">→</span>
    <span class="breadcrumb-item">设备</span>
    <span class="breadcrumb-separator">→</span>
    <span class="breadcrumb-item active">客厅灯</span>
  </div>
</div>

### 改样式

`.breadcrumb-item` 默认是次要文字灰色，可点击的项会自动变蓝：

```html
<span class="breadcrumb-item">可点击</span>
```

加 `.active` 表示当前页（不可点）：

```html
<span class="breadcrumb-item active">当前页</span>
```

---

## 实际场景

### 后台管理面包屑（最常用）

```html
<div class="navbar">
  <div>
    <div class="breadcrumb mb-1">
      <span class="breadcrumb-item">首页</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">设备</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">客厅灯</span>
    </div>
    <h1 class="text-2xl font-bold">客厅灯详情</h1>
  </div>
</div>
```

效果：

<div class="navbar my-4">
  <div>
    <div class="breadcrumb mb-1">
      <span class="breadcrumb-item">首页</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item">设备</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">客厅灯</span>
    </div>
    <h1 class="text-2xl font-bold">客厅灯详情</h1>
  </div>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 当前页用普通 `.breadcrumb-item` | 用 `.breadcrumb-item.active` 标记当前页 |
| 用 `<a>` 标签包当前页 | 当前页用 `<span>` + `.active` |
| 分隔符忘记加 `.breadcrumb-separator` class | 不加 class 颜色不对 |

---

## 下一步

- ➖ [Divider 分割线](/components/divider)
- 👤 [Avatar 头像](/components/avatar)