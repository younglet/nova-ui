# Modal 弹窗

## 效果预览

<button class="btn btn-primary" onclick="document.getElementById('demo-modal').classList.add('modal-open')">
  打开弹窗
</button>

<div id="demo-modal" class="modal-backdrop" onclick="if(event.target===this) this.classList.remove('modal-open')">
  <div class="modal">
    <h3 class="modal-title">确认保存？</h3>
    <p class="modal-body">您的更改将立即生效。</p>
    <div class="modal-actions">
      <button class="btn btn-neutral" onclick="document.getElementById('demo-modal').classList.remove('modal-open')">取消</button>
      <button class="btn btn-primary" onclick="document.getElementById('demo-modal').classList.remove('modal-open')">确认</button>
    </div>
  </div>
</div>

---

## 极简代码

HTML 部分（页面里写一次）：

```html
<div id="m1" class="modal-backdrop">
  <div class="modal">
    <h3 class="modal-title">标题</h3>
    <p class="modal-body">内容</p>
    <div class="modal-actions">
      <button class="btn btn-neutral">取消</button>
      <button class="btn btn-primary">确认</button>
    </div>
  </div>
</div>
```

JS 控制显隐：

```js
function openModal(id)  { document.getElementById(id).classList.add('modal-open') }
function closeModal(id) { document.getElementById(id).classList.remove('modal-open') }
```

---

## 修改和应用

### 4 个核心 class

| class | 作用 |
|---|---|
| `.modal-backdrop` | 全屏遮罩（默认隐藏） |
| `.modal-open` | 加在 `.modal-backdrop` 上 → 显示弹窗 |
| `.modal` | 弹窗本体 |
| `.modal-actions` | 底部按钮组（自动右对齐） |

### 子元素

| class | 作用 |
|---|---|
| `.modal-title` | 标题（20px / 粗体） |
| `.modal-body` | 内容（14px / 灰色） |
| `.modal-actions` | 底部按钮组 |

都不是必须的——可以根据需要组合。

### 显示 / 隐藏

```js
// 显示
document.getElementById('m1').classList.add('modal-open')

// 隐藏
document.getElementById('m1').classList.remove('modal-open')

// 切换
document.getElementById('m1').classList.toggle('modal-open')
```

### 点击遮罩关闭

加 `onclick` 到 `.modal-backdrop`，判断点击目标是不是 backdrop 本身：

```html
<div id="m1" class="modal-backdrop"
     onclick="if(event.target===this) closeModal('m1')">
  <div class="modal">...</div>
</div>
```

---

## 实际场景

### 1. 确认弹窗

```html
<div id="m-confirm" class="modal-backdrop" onclick="if(event.target===this) closeModal('m-confirm')">
  <div class="modal">
    <h3 class="modal-title">确认保存？</h3>
    <p class="modal-body">您的更改将立即生效。</p>
    <div class="modal-actions">
      <button class="btn btn-neutral" onclick="closeModal('m-confirm')">取消</button>
      <button class="btn btn-primary" onclick="closeModal('m-confirm')">确认</button>
    </div>
  </div>
</div>
<button class="btn btn-primary" onclick="openModal('m-confirm')">打开弹窗</button>
```

### 2. 危险操作弹窗

```html
<div id="m-danger" class="modal-backdrop" onclick="if(event.target===this) closeModal('m-danger')">
  <div class="modal">
    <h3 class="modal-title">⚠️ 删除设备？</h3>
    <p class="modal-body">删除后将无法恢复，此操作不可撤销。</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal('m-danger')">取消</button>
      <button class="btn btn-error" onclick="closeModal('m-danger')">确认删除</button>
    </div>
  </div>
</div>
```

### 3. 表单弹窗

```html
<div id="m-form" class="modal-backdrop" onclick="if(event.target===this) closeModal('m-form')">
  <div class="modal">
    <h3 class="modal-title">添加新设备</h3>
    <div class="modal-body">
      <label>设备名称</label>
      <input type="text" placeholder="例如：客厅灯">
      <label>设备类型</label>
      <select>
        <option>💡 灯</option>
        <option>❄️ 空调</option>
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn btn-neutral" onclick="closeModal('m-form')">取消</button>
      <button class="btn btn-primary" onclick="closeModal('m-form')">保存</button>
    </div>
  </div>
</div>
```

---

## 完整可运行示例

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="nova-style.css">
  <link rel="stylesheet" href="nova-ui.css">
</head>
<body class="p-4">

  <button class="btn btn-primary" onclick="openModal('m1')">打开弹窗</button>

  <div id="m1" class="modal-backdrop" onclick="if(event.target===this) closeModal('m1')">
    <div class="modal">
      <h3 class="modal-title">你好</h3>
      <p class="modal-body">点击遮罩或取消按钮可关闭。</p>
      <div class="modal-actions">
        <button class="btn btn-neutral" onclick="closeModal('m1')">取消</button>
        <button class="btn btn-primary" onclick="closeModal('m1')">确认</button>
      </div>
    </div>
  </div>

  <script>
    function openModal(id)  { document.getElementById(id).classList.add('modal-open') }
    function closeModal(id) { document.getElementById(id).classList.remove('modal-open') }
  </script>

</body>
</html>
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 用 JS 操作 `style.display` | 用 `.modal-open` class（自动带动画） |
| 多个弹窗共用同一个 id | 每个弹窗独立 id |
| 弹窗放过多内容 | 弹窗应简洁，复杂内容用独立页 |
| 用 Modal 显示短消息 | 用 [Toast](/components/toast) 更轻量 |

---

## 下一步

- 🔔 [Toast 通知](/components/toast) — 轻量提示
- 📊 [Card 卡片](/components/card)