# Input 输入框组合

## 效果预览

<div class="space-y-3 my-4">
  <div class="input-group">
    <span class="input-group-addon">🔍</span>
    <input type="text" placeholder="搜索设备...">
    <button class="btn btn-primary">搜索</button>
  </div>

  <div class="input-group">
    <span class="input-group-addon">https://</span>
    <input type="text" placeholder="example.com">
  </div>

  <div class="input-group">
    <input type="text" placeholder="价格">
    <span class="input-group-addon">元</span>
  </div>
</div>

---

## 极简代码

```html
<div class="input-group">
  <input type="text" placeholder="...">
</div>
```

加前缀：

```html
<div class="input-group">
  <span class="input-group-addon">🔍</span>
  <input type="text" placeholder="搜索...">
</div>
```

---

## 修改和应用

### 子元素

| class | 作用 |
|---|---|
| `.input-group` | 容器（带边框，focus 变蓝） |
| `.input-group-addon` | 前/后缀（灰底） |
| `<input>` | 输入框（自带基础样式） |

`.input-group-addon` 可以放任何东西：emoji、文本、按钮、单位、图标。

### 改类型

通过 `addon` 内容区分：

| 类型 | 例子 |
|---|---|
| 搜索 | `🔍 + input + "搜索"按钮` |
| URL | `https:// + input` |
| 价格 | `input + 元` |
| 邮箱 | `@ + input` |

### 放按钮

```html
<div class="input-group">
  <input type="text" placeholder="搜索设备...">
  <button class="btn btn-primary">搜索</button>
</div>
```

效果：

<div class="input-group my-4">
  <input type="text" placeholder="搜索设备...">
  <button class="btn btn-primary">搜索</button>
</div>

### 两端都加

```html
<div class="input-group">
  <span class="input-group-addon">¥</span>
  <input type="number" placeholder="0.00">
  <span class="input-group-addon">元</span>
</div>
```

效果：

<div class="input-group my-4">
  <span class="input-group-addon">¥</span>
  <input type="number" placeholder="0.00">
  <span class="input-group-addon">元</span>
</div>

---

## 实际场景

### 搜索框（最常用）

```html
<div class="input-group">
  <span class="input-group-addon">🔍</span>
  <input type="text" id="search" placeholder="搜索设备...">
  <button class="btn btn-primary" onclick="doSearch()">搜索</button>
</div>
```

效果：

<div class="input-group my-4">
  <span class="input-group-addon">🔍</span>
  <input type="text" placeholder="搜索设备...">
  <button class="btn btn-primary">搜索</button>
</div>

### 域名输入框

```html
<div class="input-group">
  <span class="input-group-addon">https://</span>
  <input type="text" placeholder="example.com">
</div>
```

### 数值输入

```html
<div class="input-group">
  <input type="number" placeholder="温度阈值">
  <span class="input-group-addon">°C</span>
</div>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 给 `.input-group` 加自定义 border | 已内置 border，focus 自动变蓝 |
| 想加 prefix 图标却用 `::before` | 用 `.input-group-addon` 加 `<span>` |

---

## 下一步

- 🪟 [Modal 弹窗](/components/modal) — 表单弹窗场景
- 📢 [Alert 提示框](/components/alert)