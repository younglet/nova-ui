/*!
 * nova-ui-elements — Custom Elements for novajs
 * 专为 NovaMP 2.0 设计 · powered by stemstar
 */
(function (global) {
  'use strict'

  if (typeof global.customElements === 'undefined') {
    return
  }

  // ============== 公共工具 ==============
  var readyHandlers = []
  function onNovaReady (handler) {
    if (typeof global.nova === 'function' && global.nova._data) {
      handler(global.nova._data)
      return
    }
    readyHandlers.push(handler)
    document.addEventListener('nova-ready', function dispatch (e) {
      var data = e && e.detail && e.detail.data
      if (data) {
        document.removeEventListener('nova-ready', dispatch)
        var hs = readyHandlers.slice()
        readyHandlers.length = 0
        for (var i = 0; i < hs.length; i++) hs[i](data)
      }
    })
  }

  function bindModelToElement (model, inputEl, parseFn) {
    onNovaReady(function (data) {
      global.nova.bind(model, inputEl)
      if (parseFn) {
        inputEl.addEventListener('input', function () {
          data[model] = parseFn(inputEl.value)
        })
      }
    })
  }

  // ============== <nova-switch> ==============
  var NovaSwitch = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var variant = this.getAttribute('variant') || ''
      var size = this.getAttribute('size') || ''
      var disabled = this.hasAttribute('disabled')
      this.className = 'nova-ce nova-ce-switch'
      this.innerHTML = '<label class="switch ' + (variant ? 'switch-' + variant : '') + ' ' + (size ? 'switch-' + size : '') + '">' +
        '<input type="checkbox"' + (disabled ? ' disabled' : '') + '>' +
        '<span class="switch-slider"></span>' +
        '</label>'
      this._input = this.querySelector('input')
      var model = this.getAttribute('model')
      if (model) bindModelToElement(model, this._input)
    }

    cls.prototype.attributeChangedCallback = function (name) {
      if (!this._initialized) return
      if (name === 'disabled' && this._input) {
        this._input.disabled = this.hasAttribute('disabled')
      } else if (name === 'model' && this._input) {
        var model = this.getAttribute('model')
        if (model) bindModelToElement(model, this._input)
      }
    }

    cls.observedAttributes = ['model', 'variant', 'size', 'disabled']
    return cls
  }()

  if (!customElements.get('nova-switch')) customElements.define('nova-switch', NovaSwitch)

  // ============== <nova-slider> ==============
  var NovaSlider = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var min = this.getAttribute('min') || '0'
      var max = this.getAttribute('max') || '100'
      var step = this.getAttribute('step') || '1'
      var variant = this.getAttribute('variant') || ''
      var disabled = this.hasAttribute('disabled')
      this.className = 'nova-ce nova-ce-slider'
      this.innerHTML = '<input type="range" class="slider ' + (variant ? 'slider-' + variant : '') + '"' +
        ' min="' + min + '" max="' + max + '" step="' + step + '"' +
        (disabled ? ' disabled' : '') + '>'
      this._input = this.querySelector('input')
      var model = this.getAttribute('model')
      var self = this
      if (model) {
        bindModelToElement(model, this._input)
        var debounceMs = parseInt(this.getAttribute('debounce')) || 0
        if (debounceMs > 0) {
          // nova.debounce 返回的闭包同时还发布：
          //   - 'change' (立即) — UI 跟随
          //   - 'debounced-change' (节流后) — 用于发起 HTTP
          // 如果 nova.debounce 不可用则降级为仅 'change' 事件
          var emitDebounced = (global.nova && global.nova.debounce) ?
            global.nova.debounce(function () {
              self.dispatchEvent(new CustomEvent('debounced-change', { bubbles: true, detail: { value: self._input.value } }))
            }, debounceMs) : null
          this._input.addEventListener('input', function () {
            if (emitDebounced) emitDebounced()
            self.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: self._input.value } }))
          })
        }
      }
      this._input.addEventListener('change', function (event) {
        self.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: self._input.value } }))
      })
    }

    cls.prototype.attributeChangedCallback = function (name) {
      if (!this._initialized) return
      if (name === 'disabled' && this._input) this._input.disabled = this.hasAttribute('disabled')
    }

    cls.observedAttributes = ['disabled']
    return cls
  }()

  if (!customElements.get('nova-slider')) customElements.define('nova-slider', NovaSlider)

  // ============== <nova-input-mask> ==============
  function applyMask (value, mask) {
    var result = ''
    var valueIdx = 0
    for (var i = 0; i < mask.length; i++) {
      var maskChar = mask[i]
      if (maskChar === '9' || maskChar === 'a' || maskChar === '*') {
        var inputChar = null
        while (valueIdx < value.length) {
          var c = value[valueIdx]
          var match =
            (maskChar === '9' && /\d/.test(c)) ||
            (maskChar === 'a' && /[a-zA-Z]/.test(c)) ||
            maskChar === '*'
          valueIdx++
          if (match) { inputChar = c; break }
        }
        if (inputChar !== null) result += inputChar
      } else {
        result += maskChar
      }
    }
    return result
  }

  var NovaInputMask = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var mask = this.getAttribute('mask') || ''
      var placeholder = this.getAttribute('placeholder') || mask
      var disabled = this.hasAttribute('disabled')
      var validateUrl = this.getAttribute('validate') || ''
      this.className = 'nova-ce nova-ce-input-mask'
      this.innerHTML = '<input type="text" class="nova-input-mask"' +
        ' placeholder="' + placeholder + '"' +
        (disabled ? ' disabled' : '') + '>' +
        '<span class="nova-input-mask-status" aria-hidden="true"></span>'
      this._input = this.querySelector('input')
      this._status = this.querySelector('.nova-input-mask-status')
      this._mask = mask
      var self = this
      var lastValidateToken = 0
      this._input.addEventListener('input', function () {
        var masked = applyMask(this.value, mask)
        if (this.value !== masked) this.value = masked
        if (self.getAttribute('model') && typeof global.nova === 'function' && global.nova._data) {
          global.nova._data[self.getAttribute('model')] = masked
        }
        // 异步校验（可选，依赖 nova.http）
        if (validateUrl && global.nova && global.nova.http) {
          var token = ++lastValidateToken
          var url = validateUrl.replace('{value}', encodeURIComponent(masked))
          self._setStatus('pending')
          global.nova.http.get(url).then(function (resp) {
            if (token !== lastValidateToken) return
            var ok = !!(resp && (resp.ok === true || resp.valid === true))
            self._setStatus(ok ? 'ok' : 'err')
            self.dispatchEvent(new CustomEvent('validate', {
              bubbles: true,
              detail: { value: masked, ok: ok, response: resp }
            }))
          }).catch(function () {
            if (token !== lastValidateToken) return
            self._setStatus('err')
            self.dispatchEvent(new CustomEvent('validate', {
              bubbles: true,
              detail: { value: masked, ok: false }
            }))
          })
        }
      })

      this._setStatus = function (state) {
        if (!self._status) return
        self._status.dataset.state = state
        self._status.textContent = state === 'pending' ? '…' : (state === 'ok' ? '✓' : (state === 'err' ? '✗' : ''))
      }

      var model = this.getAttribute('model')
      if (model) {
        onNovaReady(function (data) {
          var v = data[model]
          if (typeof v === 'string' && v) self._input.value = applyMask(v, mask)
        })
      }
    }

    cls.prototype.attributeChangedCallback = function (name) {
      if (!this._initialized) return
      if (name === 'disabled' && this._input) this._input.disabled = this.hasAttribute('disabled')
    }

    cls.observedAttributes = ['disabled', 'mask']
    return cls
  }()

  if (!customElements.get('nova-input-mask')) customElements.define('nova-input-mask', NovaInputMask)

  // ============== <nova-knob> ==============
  var NovaKnob = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    var SIZE_DEFAULT = 120
    var ARC_START = 135
    var ARC_END = 405
    var ARC_RANGE = ARC_END - ARC_START

    function polarToCartesian (cx, cy, r, angleDeg) {
      var a = (angleDeg - 90) * Math.PI / 180
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
    }

    function describeArc (cx, cy, r, startAngle, endAngle) {
      var start = polarToCartesian(cx, cy, r, endAngle)
      var end = polarToCartesian(cx, cy, r, startAngle)
      var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
      return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ')
    }

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var size = parseInt(this.getAttribute('size')) || SIZE_DEFAULT
      var valueColor = this.getAttribute('value-color') || '#10b981'
      var trackColor = this.getAttribute('track-color') || '#e5e7eb'
      var strokeWidth = parseInt(this.getAttribute('stroke-width')) || 6

      this.className = 'nova-ce nova-ce-knob'
      this.style.display = 'inline-block'
      this.style.position = 'relative'
      this.style.width = size + 'px'
      this.style.height = size + 'px'
      this.style.userSelect = 'none'
      this.style.touchAction = 'none'
      this.style.cursor = 'grab'

      this.innerHTML = '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '">' +
        '<path class="knob-track" d="' + describeArc(50, 50, 40, ARC_START, ARC_END) + '"' +
        ' stroke="' + trackColor + '" stroke-width="' + strokeWidth + '" fill="none" stroke-linecap="round"/>' +
        '<path class="knob-value" d="' + describeArc(50, 50, 40, ARC_START, ARC_START) + '"' +
        ' stroke="' + valueColor + '" stroke-width="' + strokeWidth + '" fill="none" stroke-linecap="round"/>' +
        '</svg>' +
        '<div class="knob-label" style="' +
        'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'font-size:' + Math.max(12, size / 6) + 'px;font-weight:600;color:#111;' +
        'pointer-events:none;">0</div>'

      var valuePath = this.querySelector('.knob-value')
      var label = this.querySelector('.knob-label')
      var self = this

      function setVisual (value) {
        var min = parseFloat(self.getAttribute('min')) || 0
        var max = parseFloat(self.getAttribute('max')) || 100
        var percent = (value - min) / (max - min)
        var angle = ARC_START + percent * ARC_RANGE
        valuePath.setAttribute('d', describeArc(50, 50, 40, ARC_START, angle))
        label.textContent = self._formatValue(value)
      }

      self._setVisual = setVisual

      var dragging = false
      var startY = 0
      var startValue = 0

      function onPointerDown (e) {
        e.preventDefault()
        dragging = true
        startY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0
        var min = parseFloat(self.getAttribute('min')) || 0
        var max = parseFloat(self.getAttribute('max')) || 100
        var model = self.getAttribute('model')
        startValue = model && global.nova && global.nova._data ? global.nova._data[model] : min
        self.style.cursor = 'grabbing'
      }

      function onPointerMove (e) {
        if (!dragging) return
        var y = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0
        var dy = startY - y
        var min = parseFloat(self.getAttribute('min')) || 0
        var max = parseFloat(self.getAttribute('max')) || 100
        var step = parseFloat(self.getAttribute('step')) || 1
        var range = max - min
        var newValue = startValue + (dy / 100) * range
        newValue = Math.max(min, Math.min(max, newValue))
        newValue = Math.round(newValue / step) * step

        setVisual(newValue)
        var model = self.getAttribute('model')
        if (model && typeof global.nova === 'function' && global.nova._data) {
          global.nova._data[model] = newValue
        }
        self.dispatchEvent(new CustomEvent('change', { detail: { value: newValue }, bubbles: true }))
      }

      function onPointerUp () {
        if (dragging) {
          dragging = false
          self.style.cursor = 'grab'
        }
      }

      this.addEventListener('mousedown', onPointerDown)
      document.addEventListener('mousemove', onPointerMove)
      document.addEventListener('mouseup', onPointerUp)
      this.addEventListener('touchstart', onPointerDown, { passive: false })
      document.addEventListener('touchmove', onPointerMove, { passive: false })
      document.addEventListener('touchend', onPointerUp)

      this.addEventListener('wheel', function (e) {
        e.preventDefault()
        var model = self.getAttribute('model')
        if (!model || !global.nova || !global.nova._data) return
        var min = parseFloat(self.getAttribute('min')) || 0
        var max = parseFloat(self.getAttribute('max')) || 100
        var step = parseFloat(self.getAttribute('step')) || 1
        var cur = global.nova._data[model] || 0
        var delta = e.deltaY > 0 ? -step : step
        var newValue = Math.max(min, Math.min(max, cur + delta))
        global.nova._data[model] = newValue
        self.dispatchEvent(new CustomEvent('change', { detail: { value: newValue }, bubbles: true }))
      })

      var model = this.getAttribute('model')
      if (model) {
        onNovaReady(function (data) {
          var value = data[model]
          if (typeof value === 'number') setVisual(value)
          if (data.$watch && !self._watching) {
            self._watching = true
            data.$watch(model, function (newValue) {
              setVisual(newValue)
            })
          }
        })
      }
    }

    cls.prototype._formatValue = function (v) {
      var format = this.getAttribute('format')
      var decimals = parseInt(this.getAttribute('decimals'))
      var n = Number(v)
      if (isNaN(n)) return ''
      // 优先用 nova.fmt（如果加载了）
      if (format && global.nova && global.nova.fmt) {
        var fmtFn = global.nova.fmt[format]
        if (typeof fmtFn === 'function') {
          return fmtFn(n, isNaN(decimals) ? undefined : decimals)
        }
      }
      // 降级 / 默认
      if (format === 'percent') {
        var d = isNaN(decimals) ? 0 : decimals
        return (n * 100).toFixed(d) + '%'
      }
      if (format === 'number') {
        var d2 = isNaN(decimals) ? 0 : decimals
        return n.toFixed(d2)
      }
      if (format === 'bytes' && global.nova && global.nova.fmt) {
        return global.nova.fmt.bytes(n)
      }
      // 不带 format：保持老行为（decimals 属性 或 整数）
      if (!isNaN(decimals) && decimals > 0) return n.toFixed(decimals)
      return String(Math.round(n))
    }

    return cls
  }()

  if (!customElements.get('nova-knob')) customElements.define('nova-knob', NovaKnob)

  // ============== <nova-modal> ==============
  var NovaModal = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true

      var shadow = this.attachShadow({ mode: 'open' })
      var title = this.getAttribute('title') || ''
      var size = this.getAttribute('size') || 'md'

      shadow.innerHTML =
        '<style>' +
          ':host { display: none; position: fixed; inset: 0; z-index: 9000; }' +
          ':host([data-visible]) { display: block; }' +
          '.backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.5); animation: fadeIn 0.2s; }' +
          '.dialog { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);' +
          ' background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);' +
          ' max-width: 90vw; max-height: 85vh; display: flex; flex-direction: column;' +
          ' animation: scaleIn 0.2s; }' +
          '.dialog.size-sm { width: 320px; }' +
          '.dialog.size-md { width: 480px; }' +
          '.dialog.size-lg { width: 720px; }' +
          '.header { padding: 16px 20px; border-bottom: 1px solid #e5e7eb; display: flex;' +
          ' justify-content: space-between; align-items: center; }' +
          '.title { font-size: 16px; font-weight: 600; color: #111; margin: 0; }' +
          '.close { background: none; border: 0; font-size: 20px; cursor: pointer;' +
          ' color: #6b7280; padding: 4px 8px; border-radius: 4px; }' +
          '.close:hover { background: #f3f4f6; }' +
          '.body { padding: 20px; overflow-y: auto; flex: 1; }' +
          '.footer { padding: 12px 20px; border-top: 1px solid #e5e7eb; display: flex;' +
          ' justify-content: flex-end; gap: 8px; }' +
          '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }' +
          '@keyframes scaleIn { from { transform: translate(-50%,-50%) scale(0.95); opacity: 0; }' +
          ' to { transform: translate(-50%,-50%) scale(1); opacity: 1; } }' +
        '</style>' +
        '<div class="backdrop"></div>' +
        '<div class="dialog size-' + size + '">' +
          '<div class="header">' +
            '<h3 class="title">' + title + '</h3>' +
            '<button class="close" type="button" aria-label="Close">×</button>' +
          '</div>' +
          '<div class="body"><slot></slot></div>' +
          '<div class="footer"><slot name="footer"></slot></div>' +
        '</div>'

      var self = this
      shadow.querySelector('.close').addEventListener('click', function () {
        self._setVisible(false)
      })
      shadow.querySelector('.backdrop').addEventListener('click', function () {
        if (!self.hasAttribute('persistent')) self._setVisible(false)
      })

      this._escHandler = function (e) {
        if (e.key === 'Escape' && self.hasAttribute('data-visible')) {
          if (!self.hasAttribute('persistent')) self._setVisible(false)
        }
      }
      document.addEventListener('keydown', this._escHandler)

      onNovaReady(function (data) {
        self._data = data
        var model = self.getAttribute('show')
        if (model && data.$watch) {
          data.$watch(model, function (visible) {
            if (visible) self.setAttribute('data-visible', '')
            else self.removeAttribute('data-visible')
            self.dispatchEvent(new CustomEvent(visible ? 'open' : 'close', { bubbles: true }))
          })
          if (data[model]) self.setAttribute('data-visible', '')
        }
      })
    }

    cls.prototype._setVisible = function (visible) {
      var model = this.getAttribute('show')
      if (model && this._data) this._data[model] = visible
    }

    cls.prototype.disconnectedCallback = function () {
      if (this._escHandler) document.removeEventListener('keydown', this._escHandler)
    }

    return cls
  }()

  if (!customElements.get('nova-modal')) customElements.define('nova-modal', NovaModal)

  // ============== <nova-tabs> ==============
  // 用法：
  //   <nova-tabs model="active">
  //     <button slot="tab" data-tab="a">A</button>
  //     <button slot="tab" data-tab="b">B</button>
  //     <div slot="panel" data-tab="a">panel A</div>
  //     <div slot="panel" data-tab="b">panel B</div>
  //   </nova-tabs>
  var NovaTabs = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      this.className = 'nova-ce nova-ce-tabs'
      var model = this.getAttribute('model') || 'tab'
      var self = this

      // 初始化：model 默认为第一个 tab
      onNovaReady(function (data) {
        var tabs = self.querySelectorAll('[slot="tab"]')
        var panels = self.querySelectorAll('[slot="panel"]')
        if (!data[model]) {
          var first = tabs[0]
          if (first) data[model] = first.getAttribute('data-tab')
        }
        self._render(tabs, panels, data[model])
        data.$watch && data.$watch(model, function (active) {
          self._render(tabs, panels, active)
          self.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: active } }))
        })
      })

      this.addEventListener('click', function (e) {
        var t = e.target.closest('[slot="tab"]')
        if (!t) return
        var key = t.getAttribute('data-tab')
        if (global.nova && global.nova._data) global.nova._data[model] = key
      })

      // 键盘：左/右键
      this.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
        var tabs = self.querySelectorAll('[slot="tab"]')
        var cur = global.nova && global.nova._data ? global.nova._data[model] : null
        var idx = -1
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].getAttribute('data-tab') === cur) { idx = i; break }
        }
        if (idx < 0) idx = 0
        var next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length
        var newKey = tabs[next].getAttribute('data-tab')
        if (global.nova && global.nova._data) global.nova._data[model] = newKey
        tabs[next].focus()
        e.preventDefault()
      })
    }

    cls.prototype._render = function (tabs, panels, active) {
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i]
        var on = t.getAttribute('data-tab') === active
        t.classList.toggle('nova-tab-active', on)
        t.setAttribute('aria-selected', on ? 'true' : 'false')
        t.setAttribute('tabindex', on ? '0' : '-1')
      }
      for (var j = 0; j < panels.length; j++) {
        var p = panels[j]
        p.style.display = p.getAttribute('data-tab') === active ? '' : 'none'
      }
    }

    return cls
  }()

  if (!customElements.get('nova-tabs')) customElements.define('nova-tabs', NovaTabs)

  // ============== <nova-tag-input> ==============
  // model: 字符串数组（或 CSV）；回车添加，Backspace 删除最后一枚
  var NovaTagInput = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var model = this.getAttribute('model') || 'tags'
      var placeholder = this.getAttribute('placeholder') || '输入后回车'
      var separator = this.getAttribute('separator') || ','
      var self = this
      this.className = 'nova-ce nova-ce-tag-input'
      this.innerHTML = '<div class="nova-tag-input-box">' +
        '<div class="nova-tag-list"></div>' +
        '<input class="nova-tag-input-field" placeholder="' + placeholder + '">' +
        '</div>'
      this._list = this.querySelector('.nova-tag-list')
      this._input = this.querySelector('.nova-tag-input-field')

      this._input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === separator) {
          e.preventDefault()
          var v = self._input.value.trim()
          if (v) {
            var arr = self._readModel()
            arr.push(v)
            self._writeModel(arr)
            self._input.value = ''
          }
        } else if (e.key === 'Backspace' && self._input.value === '') {
          var a = self._readModel()
          if (a.length) { a.pop(); self._writeModel(a) }
          e.preventDefault()
        }
      })

      onNovaReady(function (data) {
        if (data[model] == null) data[model] = []
        self._render(data[model])
        data.$watch && data.$watch(model, function (arr) { self._render(arr || []) })
      })
    }

    cls.prototype._readModel = function () {
      var model = this.getAttribute('model') || 'tags'
      var v = (global.nova && global.nova._data) ? global.nova._data[model] : []
      if (typeof v === 'string') return v ? v.split(',').map(function (s) { return s.trim() }).filter(Boolean) : []
      return Array.isArray(v) ? v.slice() : []
    }

    cls.prototype._writeModel = function (arr) {
      var model = this.getAttribute('model') || 'tags'
      if (global.nova && global.nova._data) global.nova._data[model] = arr
    }

    cls.prototype._render = function (arr) {
      var self = this
      this._list.innerHTML = ''
      for (var i = 0; i < arr.length; i++) {
        (function (tag, idx) {
          var chip = document.createElement('span')
          chip.className = 'nova-tag-chip'
          chip.textContent = tag
          var x = document.createElement('button')
          x.type = 'button'
          x.className = 'nova-tag-chip-x'
          x.textContent = '×'
          x.addEventListener('click', function () {
            var a = self._readModel()
            a.splice(idx, 1)
            self._writeModel(a)
          })
          chip.appendChild(x)
          self._list.appendChild(chip)
        })(arr[i], i)
      }
    }

    return cls
  }()

  if (!customElements.get('nova-tag-input')) customElements.define('nova-tag-input', NovaTagInput)

  // ============== <nova-color-picker> ==============
  // model: HEX 字符串（'#rrggbb'）。用单个滑块 + HEX 输入框实现，压缩体积
  var NovaColorPicker = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    function hexToHsv (hex) {
      hex = hex.replace('#', '')
      if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c }).join('')
      var r = parseInt(hex.substr(0, 2), 16) / 255
      var g = parseInt(hex.substr(2, 2), 16) / 255
      var b = parseInt(hex.substr(4, 2), 16) / 255
      var max = Math.max(r, g, b), min = Math.min(r, g, b)
      var h = 0, s = max === 0 ? 0 : (max - min) / max, v = max
      if (max !== min) {
        var d = max - min
        if (max === r) h = ((g - b) / d) % 6
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h *= 60
        if (h < 0) h += 360
      }
      return { h: h, s: s, v: v }
    }

    function hsvToHex (h, s, v) {
      var c = v * s
      var x = c * (1 - Math.abs((h / 60) % 2 - 1))
      var m = v - c
      var r = 0, g = 0, b = 0
      if (h < 60) { r = c; g = x; b = 0 }
      else if (h < 120) { r = x; g = c; b = 0 }
      else if (h < 180) { r = 0; g = c; b = x }
      else if (h < 240) { r = 0; g = x; b = c }
      else if (h < 300) { r = x; g = 0; b = c }
      else { r = c; g = 0; b = x }
      function toHex (n) { var v = Math.round((n + m) * 255); return (v < 16 ? '0' : '') + v.toString(16) }
      return '#' + toHex(r) + toHex(g) + toHex(b)
    }

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var model = this.getAttribute('model') || 'color'
      var self = this
      this.className = 'nova-ce nova-ce-color-picker'
      this.innerHTML =
        '<div class="nova-color-preview" style="background:#3b82f6"></div>' +
        '<div class="nova-color-controls">' +
          '<label class="nova-color-row"><span>H</span><input class="nova-color-h" type="range" min="0" max="360" step="1" value="210"></label>' +
          '<label class="nova-color-row"><span>S</span><input class="nova-color-s" type="range" min="0" max="100" step="1" value="90"></label>' +
          '<label class="nova-color-row"><span>V</span><input class="nova-color-v" type="range" min="0" max="100" step="1" value="73"></label>' +
          '<input class="nova-color-hex" type="text" maxlength="7" value="#3b82f6">' +
        '</div>'

      this._preview = this.querySelector('.nova-color-preview')
      this._hIn = this.querySelector('.nova-color-h')
      this._sIn = this.querySelector('.nova-color-s')
      this._vIn = this.querySelector('.nova-color-v')
      this._hexIn = this.querySelector('.nova-color-hex')

      function emit (hex) {
        self._preview.style.background = hex
        self._hexIn.value = hex
        if (global.nova && global.nova._data) global.nova._data[model] = hex
        self.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: hex } }))
      }

      function syncFromHsv (h, s, v) {
        self._hIn.value = Math.round(h)
        self._sIn.value = Math.round(s * 100)
        self._vIn.value = Math.round(v * 100)
        emit(hsvToHex(h, s, v))
      }

      var sliderEls = [this._hIn, this._sIn, this._vIn]
      for (var si = 0; si < sliderEls.length; si++) {
        sliderEls[si].addEventListener('input', function () {
          emit(hsvToHex(+self._hIn.value, +self._sIn.value / 100, +self._vIn.value / 100))
        })
      }
      this._hexIn.addEventListener('change', function () {
        var v = self._hexIn.value.trim()
        if (!/^#?[0-9a-fA-F]{3,6}$/.test(v)) return
        if (v[0] !== '#') v = '#' + v
        var hsv = hexToHsv(v)
        syncFromHsv(hsv.h, hsv.s, hsv.v)
      })

      onNovaReady(function (data) {
        var init = data[model]
        if (typeof init === 'string' && /^#?[0-9a-fA-F]{3,6}$/.test(init)) {
          if (init[0] !== '#') init = '#' + init
          var hsv = hexToHsv(init)
          syncFromHsv(hsv.h, hsv.s, hsv.v)
        }
        data.$watch && data.$watch(model, function (hex) {
          if (typeof hex !== 'string') return
          if (!/^#[0-9a-fA-F]{3,6}$/.test(hex)) return
          var h = hexToHsv(hex)
          syncFromHsv(h.h, h.s, h.v)
        })
      })
    }

    return cls
  }()

  if (!customElements.get('nova-color-picker')) customElements.define('nova-color-picker', NovaColorPicker)

  // ============== <nova-thermostat> ==============
  // 组合：nova-slider + 数字输入 + 模式按钮 + 状态点
  // 属性：model (温度), mode-model (cool/heat/auto/off), min, max, step, unit
  var NovaThermostat = function () {
    var cls = function () { var el = Reflect.construct(HTMLElement, [], cls); el._initialized = false; return el }
    cls.prototype = Object.create(HTMLElement.prototype)
    cls.prototype.constructor = cls

    cls.prototype.connectedCallback = function () {
      if (this._initialized) return
      this._initialized = true
      var model = this.getAttribute('model') || 'temp'
      var modeModel = this.getAttribute('mode-model') || 'mode'
      var min = this.getAttribute('min') || '16'
      var max = this.getAttribute('max') || '30'
      var step = this.getAttribute('step') || '0.5'
      var unit = this.getAttribute('unit') || '°C'
      var self = this

      this.className = 'nova-ce nova-ce-thermostat'
      this.innerHTML =
        '<div class="nova-thermostat-readout">' +
          '<div class="nova-thermostat-value">0</div>' +
          '<div class="nova-thermostat-unit">' + unit + '</div>' +
        '</div>' +
        '<div class="nova-thermostat-mode">' +
          '<button type="button" data-mode="cool">❄</button>' +
          '<button type="button" data-mode="heat">☀</button>' +
          '<button type="button" data-mode="auto">A</button>' +
          '<button type="button" data-mode="off">⏻</button>' +
        '</div>' +
        '<nova-slider class="nova-thermostat-slider" min="' + min + '" max="' + max + '" step="' + step + '"></nova-slider>' +
        '<div class="nova-thermostat-status">' +
          '<span class="nova-thermostat-dot"></span>' +
          '<span class="nova-thermostat-mode-label">off</span>' +
        '</div>'

      this._value = this.querySelector('.nova-thermostat-value')
      this._modeLabel = this.querySelector('.nova-thermostat-mode-label')
      this._dot = this.querySelector('.nova-thermostat-dot')
      var slider = this.querySelector('nova-slider')
      slider.setAttribute('model', model)

      this._modeButtons = this.querySelectorAll('.nova-thermostat-mode button')
      for (var i = 0; i < this._modeButtons.length; i++) {
        this._modeButtons[i].addEventListener('click', function (e) {
          var m = e.currentTarget.getAttribute('data-mode')
          if (global.nova && global.nova._data) global.nova._data[modeModel] = m
        })
      }

      onNovaReady(function (data) {
        if (data[modeModel] == null) data[modeModel] = 'off'
        self._renderValue(data[model], min, max, unit, data[modeModel])
        data.$watch && data.$watch(model, function (v) {
          self._renderValue(v, min, max, unit, data[modeModel])
        })
        data.$watch && data.$watch(modeModel, function (m) {
          self._renderValue(data[model], min, max, unit, m)
        })
      })
    }

    cls.prototype._renderValue = function (v, min, max, unit, mode) {
      var n = Number(v)
      this._value.textContent = isNaN(n) ? '—' : n
      this._modeLabel.textContent = mode
      var colorMap = { cool: '#3b82f6', heat: '#ef4444', auto: '#10b981', off: '#6b7280' }
      this._dot.style.background = colorMap[mode] || '#6b7280'
      for (var i = 0; i < this._modeButtons.length; i++) {
        var b = this._modeButtons[i]
        b.classList.toggle('nova-thermostat-mode-active', b.getAttribute('data-mode') === mode)
      }
    }

    return cls
  }()

  if (!customElements.get('nova-thermostat')) customElements.define('nova-thermostat', NovaThermostat)

  global.NovaUIElements = {
    version: '0.2.0',
    registered: ['nova-switch', 'nova-slider', 'nova-input-mask', 'nova-knob', 'nova-modal', 'nova-tabs', 'nova-tag-input', 'nova-color-picker', 'nova-thermostat']
  }
})(typeof window !== 'undefined' ? window : globalThis)