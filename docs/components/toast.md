# Toast 通知

## 效果预览

<div class="flex flex-wrap gap-2 my-4">
  <button class="btn btn-primary btn-sm" onclick="novaToast('保存成功！', 'success')">成功</button>
  <button class="btn btn-error btn-sm" onclick="novaToast('连接失败', 'error')">错误</button>
  <button class="btn btn-warning btn-sm" onclick="novaToast('网络不稳定', 'warning')">警告</button>
  <button class="btn btn-neutral btn-sm" onclick="novaToast('新消息', 'info')">信息</button>
</div>

<div id="nova-toast-container" class="toast-container"></div>

---

## 极简代码

HTML 部分（页面里放一次）：

```html
<div id="toast-container" class="toast-container"></div>
```

JS 工具函数（必加）：

```js
function showToast(message, type = 'info') {
  const t = document.createElement('div')
  t.className = 'toast toast-' + type
  t.textContent = message
  document.getElementById('toast-container').appendChild(t)
  setTimeout(() => t.remove(), 3000)
}
```

调用：

```js
showToast('保存成功', 'success')
```

---

## 修改和应用

### 4 种类型

| class | 颜色 | 用途 |
|---|---|---|
| `.toast-info` | 蓝 | 信息提示 |
| `.toast-success` | 绿 | 成功提示 |
| `.toast-warning` | 黄 | 警告提示 |
| `.toast-error` | 红 | 错误提示 |

效果（点上方预览按钮）：

### 自定义显示时长

默认 3000ms，加 duration 参数：

```js
function showToast(message, type = 'info', duration = 3000) {
  const t = document.createElement('div')
  t.className = 'toast toast-' + type
  t.textContent = message
  document.getElementById('toast-container').appendChild(t)
  setTimeout(() => t.remove(), duration)
}

showToast('这条会显示 10 秒', 'info', 10000)
```

### 带 HTML 内容（小心 XSS）

```js
const t = document.createElement('div')
t.className = 'toast toast-success'
t.innerHTML = '✅ <b>保存成功</b>，文件已上传'
```

---

## 实际场景

### 表单提交后反馈

```js
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    await fetch('/api/save', { method: 'POST', body: new FormData(form) })
    showToast('保存成功', 'success')
  } catch (err) {
    showToast('保存失败：' + err.message, 'error')
  }
})
```

### 设备操作反馈

```js
function toggleDevice(id, on) {
  showToast(`设备 ${id} 已${on ? '开启' : '关闭'}`, on ? 'success' : 'info')
}
```

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| toast 内容写很长的段落 | toast 应 1-2 句话 |
| 让 toast 永远不消失 | 必须 setTimeout 自动移除 |
| 一次显示 100+ toast | 限流，最多同时 3-5 条 |

---

## 下一步

- 🪟 [Modal 弹窗](/components/modal) — 需要交互的提示
- ⚪ [Status 状态点](/components/status)