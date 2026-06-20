# `<nova-input-mask>` 输入掩码

> PrimeVue `InputMask` 风格。输入时自动格式化（如手机号 `138 0013 8000` → `138-0013-8000`）。

## 效果

<iframe src="/examples/09-js-api.html" width="100%" height="360" frameborder="0" style="border-radius:8px"></iframe>

## 代码

```html
<nova-input-mask model="phone" mask="999-9999-9999" placeholder="138-0000-0000"></nova-input-mask>
<nova-input-mask model="ipv4" mask="999.999.999.999"></nova-input-mask>
<nova-input-mask model="mac" mask="AA:AA:AA:AA:AA:AA"></nova-input-mask>

<script src="novajs.js"></script>
<script src="nova-ui-elements.js"></script>
<script>
  nova({ data: { phone: '', ipv4: '', mac: '' } })
</script>
```

## API

### 属性

| 属性 | 类型 | 默认 | 说明 |
|---|---|---|---|
| `model` | string | — | 双向绑定的 data 字段 |
| `mask` | string | — | 掩码模板 |
| `placeholder` | string | mask | 占位符 |
| `disabled` | boolean | false | 禁用 |

### mask 字符

| 字符 | 接受输入 |
|---|---|
| `9` | 数字 0-9 |
| `a` | 字母 a-z A-Z |
| `*` | 任意字符 |
| 其他（`-` `.` `:` `( )` 等）| 字面量 |

## 常用 mask

```html
<!-- 中国大陆手机号 -->
<nova-input-mask model="phone" mask="999-9999-9999"></nova-input-mask>

<!-- 身份证号 -->
<nova-input-mask model="id" mask="999999-99999999-9999"></nova-input-mask>

<!-- 固定电话 -->
<nova-input-mask model="tel" mask="9999-99999999"></nova-input-mask>

<!-- IPv4 -->
<nova-input-mask model="ip" mask="999.999.999.999"></nova-input-mask>

<!-- MAC 地址 -->
<nova-input-mask model="mac" mask="AA:AA:AA:AA:AA:AA"></nova-input-mask>

<!-- 日期 YYYY-MM-DD -->
<nova-input-mask model="date" mask="9999-99-99"></nova-input-mask>

<!-- 时间 HH:MM -->
<nova-input-mask model="time" mask="99:99"></nova-input-mask>

<!-- 信用卡 -->
<nova-input-mask model="card" mask="9999 9999 9999 9999"></nova-input-mask>
```

## 细节

### 输入过滤

输入非掩码字符会**自动跳过**：

```
mask = "999-9999-9999"
用户输入："abc13800138000"
data.phone = "138-0013-8000"  ← 自动跳过 abc 和多余字符
```

### 中文 / 全角字符

`9` 只接受半角数字。如果用户输入全角 `１`，**不会匹配**，会被跳过。

### 配合验证

```html
<nova-input-mask model="phone" mask="999-9999-9999"></nova-input-mask>
<span class="text-red-500" if="phone.length < 13">请输入完整手机号</span>
```

### 源码

`nova-ui-elements.js` 里搜 `applyMask`，约 20 行。

## 下一步

- [`<nova-knob>`](./nova-knob) — 旋钮
- [`<nova-modal>`](./nova-modal) — 弹窗
---

**返回**：[概念 →](./index) · [原理 →](./principle) · [引入 →](./setup)
