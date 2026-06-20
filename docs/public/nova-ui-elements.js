/*!
 * nova-ui-elements — Custom Elements for novajs
 * License: MIT
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
          var emitDebounced = (global.nova && global.nova.debounce) ?
            global.nova.debounce(function () {
              self.dispatchEvent(new CustomEvent('debounced-change', { bubbles: true }))
            }, debounceMs) : null
          this._input.addEventListener('input', function () {
            if (emitDebounced) emitDebounced()
          })
        }
      }
      this._input.addEventListener('change', function (event) {
        self.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: event }))
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
      this.className = 'nova-ce nova-ce-input-mask'
      this.innerHTML = '<input type="text" class="nova-input-mask"' +
        ' placeholder="' + placeholder + '"' +
        (disabled ? ' disabled' : '') + '>'
      this._input = this.querySelector('input')
      this._mask = mask
      var self = this
      this._input.addEventListener('input', function () {
        var masked = applyMask(this.value, mask)
        if (this.value !== masked) this.value = masked
        if (self.getAttribute('model') && typeof global.nova === 'function' && global.nova._data) {
          global.nova._data[self.getAttribute('model')] = masked
        }
      })

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
      var decimals = parseInt(this.getAttribute('decimals')) || 0
      return decimals > 0 ? Number(v).toFixed(decimals) : Math.round(v)
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

  global.NovaUIElements = {
    version: '0.1.0',
    registered: ['nova-switch', 'nova-slider', 'nova-input-mask', 'nova-knob', 'nova-modal']
  }
})(typeof window !== 'undefined' ? window : globalThis)