# Badge 徽章

## 效果预览

<div class="flex gap-2 flex-wrap my-4">
  <span class="badge badge-success">在线</span>
  <span class="badge badge-error">故障</span>
  <span class="badge badge-warning">警告</span>
  <span class="badge badge-info">信息</span>
  <span class="badge badge-neutral">离线</span>
</div>

---

## 极简代码

一个徽章 = **`.badge`** + **颜色类 `.badge-{color}`**：

```html
<span class="badge badge-success">在线</span>
```

---

## 修改和应用

### 改颜色

| class | 背景色 | 用途 |
|---|---|---|
| `.badge-success` | 浅绿 | 正常 / 在线 |
| `.badge-error` | 浅红 | 故障 / 错误 |
| `.badge-warning` | 浅黄 | 警告 |
| `.badge-info` | 浅蓝 | 信息 |
| `.badge-neutral` | 浅灰 | 离线 / 中性 |

效果：

<div class="flex gap-2 flex-wrap">
  <span class="badge badge-success">success</span>
  <span class="badge badge-error">error</span>
  <span class="badge badge-warning">warning</span>
  <span class="badge badge-info">info</span>
  <span class="badge badge-neutral">neutral</span>
</div>

### 改尺寸

| class | 字号 |
|---|---|
| `.badge-sm` | 10px（紧凑） |
| `.badge` | 12px（默认） |
| `.badge-lg` | 14px（醒目） |

效果：

<div class="flex gap-2 items-center flex-wrap">
  <span class="badge badge-sm badge-success">sm</span>
  <span class="badge badge-success">默认</span>
  <span class="badge badge-lg badge-success">lg</span>
</div>

---

## 实际场景

### 设备列表行（最常用）

```html
<div class="flex items-center justify-between bg-white p-3 rounded border">
  <div class="flex items-center gap-2">
    <span class="status-dot status-online"></span>
    <span class="text-sm">客厅灯</span>
  </div>
  <span class="badge badge-success">在线</span>
</div>
```

效果：

<div class="flex items-center justify-between bg-white p-3 rounded border my-4">
  <div class="flex items-center gap-2">
    <span class="status-dot status-online"></span>
    <span class="text-sm">客厅灯</span>
  </div>
  <span class="badge badge-success">在线</span>
</div>

### 标题旁的状态

```html
<h2 class="text-lg font-bold">
  设备管理
  <span class="badge badge-info ml-2">5 台</span>
</h2>
```

效果：

<h2 class="text-lg font-bold my-4">设备管理 <span class="badge badge-info ml-2">5 台</span></h2>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 颜色硬编码 `background: green` | 用 `.badge-success` |
| 想做"按钮"用 `.badge` | 用 [Button 按钮](/components/button) |

---

## 下一步

- 📢 [Alert 提示框](/components/alert) — 更大的提示
- 👤 [Avatar 头像](/components/avatar)