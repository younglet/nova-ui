# Card 卡片

## 效果预览

<div class="grid grid-cols-2 gap-4 my-4">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">基础卡片</h3>
      <p class="text-sm text-gray-500">白底圆角阴影，最常见的容器。</p>
      <div class="card-actions">
        <button class="btn btn-ghost btn-sm">取消</button>
        <button class="btn btn-primary btn-sm">确定</button>
      </div>
    </div>
  </div>

  <div class="card card-bordered">
    <div class="card-body">
      <h3 class="card-title">带边框卡片</h3>
      <p class="text-sm text-gray-500">用边框代替阴影，更素雅。</p>
    </div>
  </div>
</div>

---

## 极简代码

一个卡片 = **`.card` 容器** + **`.card-body` 内边距** + **`.card-title` 标题**：

```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">标题</h3>
    <p>内容</p>
  </div>
</div>
```

带按钮组：

```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">标题</h3>
    <p>内容</p>
    <div class="card-actions">
      <button class="btn btn-primary">确定</button>
    </div>
  </div>
</div>
```

---

## 修改和应用

### 子元素清单

| class | 作用 | 何时用 |
|---|---|---|
| `.card` | 容器（白底圆角阴影） | 必加 |
| `.card-bordered` | 变体：带边框代替阴影 | 素雅风格时 |
| `.card-body` | 内容区（默认 `p-4`） | 必加 |
| `.card-body-lg` | 大内边距（`p-6`） | 内容多时 |
| `.card-title` | 标题（18px / 粗体） | 必有 |
| `.card-subtitle` | 副标题（14px / 灰色） | 副信息 |
| `.card-actions` | 底部按钮组（自动右对齐） | 有按钮时 |
| `.card-footer` | 底部 footer（灰底 + 上边框） | 次要信息 |

效果：

<div class="card my-4">
  <div class="card-body">
    <h3 class="card-title">完整结构示例</h3>
    <div class="card-subtitle">副标题说明</div>
    <p class="text-sm">主体内容...</p>
    <div class="card-actions">
      <button class="btn btn-ghost btn-sm">取消</button>
      <button class="btn btn-primary btn-sm">确定</button>
    </div>
  </div>
</div>

### 改变体

| 写法 | 效果 |
|---|---|
| `<div class="card">` | 默认阴影 |
| `<div class="card card-bordered">` | 带边框代替阴影 |

效果对比：

<div class="grid grid-cols-2 gap-4 my-4">
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">默认（阴影）</h3>
      <p class="text-sm text-gray-500">box-shadow</p>
    </div>
  </div>
  <div class="card card-bordered">
    <div class="card-body">
      <h3 class="card-title">带边框</h3>
      <p class="text-sm text-gray-500">border</p>
    </div>
  </div>
</div>

### 改内边距

把 `.card-body` 换成 `.card-body-lg`：

```html
<div class="card">
  <div class="card-body card-body-lg">  <!-- p-6 而不是 p-4 -->
    ...
  </div>
</div>
```

效果：

<div class="card my-4">
  <div class="card-body card-body-lg">
    <h3 class="card-title">大内边距（p-6）</h3>
    <p class="text-sm text-gray-500">内容多时用，看着不挤</p>
  </div>
</div>

### 加 Footer

```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">设备信息</h3>
    <p>客厅灯</p>
  </div>
  <div class="card-footer text-sm text-gray-500">
    上次更新：5 分钟前
  </div>
</div>
```

效果：

<div class="card my-4">
  <div class="card-body">
    <h3 class="card-title">设备信息</h3>
    <p>客厅灯</p>
  </div>
  <div class="card-footer text-sm text-gray-500">
    上次更新：5 分钟前
  </div>
</div>

---

## 实际场景

### 网格中的卡片

```html
<div class="grid grid-cols-3 gap-4">
  <div class="card"><div class="card-body">...</div></div>
  <div class="card"><div class="card-body">...</div></div>
  <div class="card"><div class="card-body">...</div></div>
</div>
```

效果：

<div class="grid grid-cols-3 gap-4 my-4">
  <div class="card"><div class="card-body text-center"><div class="text-2xl">📊</div><div class="font-bold mt-2">数据</div></div></div>
  <div class="card"><div class="card-body text-center"><div class="text-2xl">⚙️</div><div class="font-bold mt-2">设置</div></div></div>
  <div class="card"><div class="card-body text-center"><div class="text-2xl">👤</div><div class="font-bold mt-2">用户</div></div></div>
</div>

### 卡片 + 徽章组合

```html
<div class="card">
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h3 class="card-title">设备状态</h3>
      <span class="badge badge-success">在线</span>
    </div>
    <p class="text-sm text-gray-500">实时数据正常</p>
  </div>
</div>
```

效果：

<div class="card my-4">
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h3 class="card-title">设备状态</h3>
      <span class="badge badge-success">在线</span>
    </div>
    <p class="text-sm text-gray-500">实时数据正常</p>
  </div>
</div>

---

## 常见错误

| ❌ 不要 | ✅ 应该 |
|---|---|
| 把内容直接放 `.card` 里没 `.card-body` | 一定要 `.card-body` 才有内边距 |
| 自己写 `<style>` 改 `.card` 样式 | 加 `class="card-bordered"` 或自定义新组件 |
| 想做"传感器数据"用 `.card` | 用 [Sensor Card](/components/sensor-card) 更语义化 |

---

## 下一步

- 💡 [Button 按钮](/components/button)
- 🌡️ [Sensor Card 传感器卡片](/components/sensor-card)
- 📈 [Stat 数据展示](/components/stat)