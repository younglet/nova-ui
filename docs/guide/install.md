# 快速开始

<Esp32Flasher project="nova-ui" />

## 给谁用？

nova-ui 是 **ESP32 + MicroPython server** 部署的 IoT 前端三件套之一：

| 项目 | 职责 | min 后大小 |
|---|---|---|
| [novajs](https://github.com/younglet/novajs) | 反应式内核 | 9 KB |
| [nova-style](https://github.com/younglet/nova-style) | 原子 CSS | 12 KB |
| **nova-ui** | **组件库** | **CSS 23 KB + JS 11 KB** |

整套 ~55 KB，能塞进 ESP32 的 4MB flash。

## 一句话安装

```html
<head>
  <link rel="stylesheet" href="src/nova-style.css">
  <link rel="stylesheet" href="src/nova-ui.css">
</head>
```

就这两行，20 个静态组件就能用了。

## 复制到项目

把整个 `nova-ui/src/` 复制到你的项目里：

```
your-project/
├── index.html
└── src/
    ├── nova-style.css
    ├── nova-style.min.css    ← 线上用 min 版
    ├── nova-ui.css
    └── nova-ui.min.css
```

然后在 HTML 里：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>我的 IoT 控制台</title>
  <link rel="stylesheet" href="src/nova-style.min.css">
  <link rel="stylesheet" href="src/nova-ui.min.css">
</head>
<body>
  <button class="btn btn-primary">保存</button>
  <div class="sensor-card">
    <div class="sensor-label">温度</div>
    <div class="sensor-value">24.5<span class="sensor-unit">°C</span></div>
  </div>
</body>
</html>
```

## 加响应式（动态组件）

如果页面要响应式（数据变化自动更新 UI），引入 `novajs.js` + `nova-ui-elements.js`：

```html
<head>
  <link rel="stylesheet" href="src/nova-style.min.css">
  <link rel="stylesheet" href="src/nova-ui.min.css">
</head>
<body>

<nova-switch model="power" variant="primary"></nova-switch>
<nova-slider model="brightness" min="0" max="100" debounce="400"></nova-slider>

<script src="src/novajs.min.js"></script>
<script src="src/nova-ui-elements.min.js"></script>
<script>
  nova({
    data: { power: false, brightness: 50 },
    funcs: {
      // 方法
    }
  })
</script>
</body>
```

详见 [动态组件 →](../components/dynamic/index)

## 部署到 MicroPython

从 ESP32 flash 提供 HTTP 服务，配套 [**nova-server**](../../../nova-server/)（10KB 的 MicroPython 异步 Web 框架）：

```bash
# 1. 拷贝前端文件到 ESP32 flash
mpremote cp -r src :/www/static/

# 2. 拷贝 nova-server 到 ESP32
mpremote cp -r ../nova-server/nova_server :

# 3. 启动（会自动在 80 端口提供 HTTP 服务）
mpremote exec "from nova_server import NovaServer; app = NovaServer()"
```

手机连 ESP32 的 WiFi AP，浏览器访问 `http://192.168.4.1/` 就能看到界面。

> 💡 详见 [nova-server 文档](../../../nova-server/) 的 `main.py` 模板，包含 WiFi 连接 + 静态文件服务 + API 路由的完整骨架。

## 下一步

- [设计哲学 →](./philosophy) — 为什么这样设计
- [暗色模式 →](./dark-mode) — 加一行 `.dark` 切换
- [组件列表 →](../components/) — 20 个组件详情
- [动态组件 →](../components/dynamic/index) — `<nova-*>` 自定义元素