# 部署到 ESP32 + MicroPython server

> 把 nova-ui 三件套（novajs + nova-ui-elements + nova-ui.min.css）+ 你的 HTML 写到 ESP32。
> 完整 MicroPython 烧录流程见 [novajs 的部署文档](/guide/esp32-deploy)（任务 7 完整版）。

## 一次性

1. 烧 MicroPython 固件
2. 上传 main.py（HTTP server 模板）
3. 上传 3 个文件到 `/static/`（详见下面）

## 上传文件

```bash
# 启静态服务
python3 -m http.server 8000 --directory src

# 浏览器打开文档站首页的「下载到 ESP32」按钮（自动）
# 或手动：
#   src/novajs.min.js              → /static/novajs.min.js
#   src/nova-ui-elements.min.js    → /static/nova-ui-elements.min.js
#   src/nova-ui.min.css            → /static/nova-ui.min.css
#   写一个 index.novaui.html 到 /static/
```

## index.novaui.html 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的 nova-ui 页面</title>
  <link rel="stylesheet" href="/static/nova-style.min.css">
  <link rel="stylesheet" href="/static/nova-ui.min.css">
</head>
<body class="bg-gray-50 p-4">
  <div class="card">
    <div class="card-body">
      <h1 class="card-title">智能家居控制</h1>

      <nova-switch model="power"></nova-switch>
      <span class="badge" :class="power ? 'badge-success' : 'badge-neutral'">
        {{ power ? 'ON' : 'OFF' }}
      </span>

      <nova-slider model="brightness" min="0" max="100" debounce="300"></nova-slider>
      <span class="badge badge-info">{{ brightness }}%</span>
    </div>
  </div>

  <script src="/static/novajs.min.js"></script>
  <script src="/static/nova-ui-elements.min.js"></script>
  <script>
    nova({ data: { power: false, brightness: 50 } })
  </script>
</body>
</html>
```

## 文件清单

| 文件 | 大小 | 路径 |
|---|---|---|
| `nova-style.min.css` | 7 KB | `/static/nova-style.min.css` |
| `nova-ui.min.css` | 14 KB | `/static/nova-ui.min.css` |
| `novajs.min.js` | 13 KB | `/static/novajs.min.js` |
| `nova-ui-elements.min.js` | 21 KB | `/static/nova-ui-elements.min.js` |
| `index.novaui.html` | < 1 KB | `/static/index.novaui.html` |

**总传输：~55 KB**。ESP32-WROOM 4MB flash 完全够（用了不到 1.5%）。

## 配合 nova-chart

- + [nova-chart](http://nova-chart.test)：在同一个 HTML 里 `<canvas id="chart">` + 加载 nova-chart.min.js
- 文件名加前缀（`.novaui.` / `.novachart.`）避免冲突
