/*!
 * test/05-elements.test.js — nova-ui-elements 自定义元素测试
 */
'use strict'

const vm = require('node:vm')
const { JSDOM } = require('jsdom')
const { describe, it, eq, NOVA_JS, NOVA_UI_ELEMENTS_JS } = require('./helper')

function setupCe (html) {
  const fullHtml = '<!DOCTYPE html><html><head></head><body>' + (html || '') + '</body></html>'
  const dom = new JSDOM(fullHtml, { runScripts: 'outside-only' })
  const w = dom.window
  w.fetch = function () { return Promise.reject(new Error('fetch not mocked')) }

  const ctx = {
    document: w.document,
    AbortController: w.AbortController,
    HTMLElement: w.HTMLElement,
    customElements: w.customElements,
    Node: w.Node,
    NodeFilter: w.NodeFilter,
    Comment: w.Comment,
    DocumentFragment: w.DocumentFragment,
    Text: w.Text,
    Element: w.Element,
    Event: w.Event,
    CustomEvent: w.CustomEvent,
    console,
    Promise, Map, Set, WeakMap,
    setTimeout, clearTimeout, setInterval, clearInterval,
    fetch: w.fetch
  }
  ctx.fetch = w.fetch
  vm.createContext(ctx)
  vm.runInContext(NOVA_JS, ctx)
  vm.runInContext(NOVA_UI_ELEMENTS_JS, ctx)

  return {
    dom,
    window: w,
    document: w.document,
    nova: ctx.nova,
    tick: () => new Promise(r => setTimeout(r, 0))
  }
}

function ok (cond, msg) { if (!cond) throw new Error('assertion failed' + (msg ? ': ' + msg : '')) }

// ============== <nova-switch> ==============
describe('nova-switch custom element', function () {
  it('renders with model', function () {
    const ctx = setupCe('<nova-switch model="power"></nova-switch>')
    ctx.nova({ data: { power: false } })
    const el = ctx.document.querySelector('nova-switch')
    ok(el)
    ok(el._initialized)
    const input = el.querySelector('input')
    ok(input)
    eq(input.type, 'checkbox')
    eq(input.checked, false)
  })

  it('two-way: data → input', function () {
    const ctx = setupCe('<nova-switch model="power"></nova-switch>')
    const data = ctx.nova({ data: { power: false } })
    return ctx.tick().then(function () {
      data.power = true
      return ctx.tick()
    }).then(function () {
      const input = ctx.document.querySelector('nova-switch input')
      eq(input.checked, true)
    })
  })

  it('two-way: input → data', function () {
    const ctx = setupCe('<nova-switch model="power"></nova-switch>')
    const data = ctx.nova({ data: { power: false } })
    return ctx.tick().then(function () {
      const input = ctx.document.querySelector('nova-switch input')
      input.checked = true
      input.dispatchEvent(new ctx.window.Event('change'))
      return ctx.tick()
    }).then(function () {
      eq(data.power, true)
    })
  })

  it('variant class', function () {
    const ctx = setupCe('<nova-switch model="x" variant="primary"></nova-switch>')
    ctx.nova({ data: { x: false } })
    const el = ctx.document.querySelector('nova-switch')
    ok(el.innerHTML.indexOf('switch-primary') >= 0)
  })

  it('disabled', function () {
    const ctx = setupCe('<nova-switch model="x" disabled></nova-switch>')
    ctx.nova({ data: { x: false } })
    const input = ctx.document.querySelector('nova-switch input')
    eq(input.disabled, true)
  })
})

// ============== <nova-slider> ==============
describe('nova-slider custom element', function () {
  it('renders with min/max', function () {
    const ctx = setupCe('<nova-slider model="x" min="0" max="200"></nova-slider>')
    ctx.nova({ data: { x: 50 } })
    const input = ctx.document.querySelector('nova-slider input')
    eq(input.type, 'range')
    eq(input.min, '0')
    eq(input.max, '200')
  })

  it('two-way binding', function () {
    const ctx = setupCe('<nova-slider model="brightness"></nova-slider>')
    const data = ctx.nova({ data: { brightness: 50 } })
    return ctx.tick().then(function () {
      const input = ctx.document.querySelector('nova-slider input')
      input.value = '80'
      input.dispatchEvent(new ctx.window.Event('input'))
      return ctx.tick()
    }).then(function () {
      eq(String(data.brightness), '80')
    })
  })

  it('emits debounced-change event with debounce attribute', function () {
    const ctx = setupCe('<nova-slider model="x" debounce="50"></nova-slider>')
    ctx.nova({ data: { x: 0 } })
    let debouncedCount = 0
    const el = ctx.document.querySelector('nova-slider')
    el.addEventListener('debounced-change', function () { debouncedCount++ })
    const input = el.querySelector('input')
    input.value = '10'
    input.dispatchEvent(new ctx.window.Event('input'))
    input.value = '20'
    input.dispatchEvent(new ctx.window.Event('input'))
    eq(debouncedCount, 0)
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      eq(debouncedCount, 1)
    })
  })

  it('debounce-attached slider also fires change immediately with detail.value', function () {
    const ctx = setupCe('<nova-slider model="x" debounce="50"></nova-slider>')
    ctx.nova({ data: { x: 0 } })
    let changeCount = 0
    let lastDetail = null
    const el = ctx.document.querySelector('nova-slider')
    el.addEventListener('change', function (e) { changeCount++; lastDetail = e.detail })
    const input = el.querySelector('input')
    input.value = '33'
    input.dispatchEvent(new ctx.window.Event('input'))
    eq(changeCount, 1)
    eq(lastDetail && lastDetail.value, '33')
  })
})

// ============== <nova-input-mask> ==============
describe('nova-input-mask custom element', function () {
  it('renders with mask', function () {
    const ctx = setupCe('<nova-input-mask model="phone" mask="99-999999"></nova-input-mask>')
    ctx.nova({ data: { phone: '' } })
    const input = ctx.document.querySelector('nova-input-mask input')
    eq(input.placeholder, '99-999999')
  })

  it('formats user input per mask', function () {
    const ctx = setupCe('<nova-input-mask model="phone" mask="99-999999"></nova-input-mask>')
    ctx.nova({ data: { phone: '' } })
    return ctx.tick().then(function () {
      const input = ctx.document.querySelector('nova-input-mask input')
      input.value = '13800138000'
      input.dispatchEvent(new ctx.window.Event('input'))
      return ctx.tick()
    }).then(function () {
      const input = ctx.document.querySelector('nova-input-mask input')
      eq(input.value, '13-800138')  // mask limited to 7 digits after first 2
    })
  })

  it('strips non-digit chars from 9-mask', function () {
    const ctx = setupCe('<nova-input-mask model="x" mask="999"></nova-input-mask>')
    ctx.nova({ data: { x: '' } })
    return ctx.tick().then(function () {
      const input = ctx.document.querySelector('nova-input-mask input')
      input.value = 'abc123def'
      input.dispatchEvent(new ctx.window.Event('input'))
      return ctx.tick()
    }).then(function () {
      const input = ctx.document.querySelector('nova-input-mask input')
      eq(input.value, '123')
    })
  })

  it('validate attribute renders status indicator and calls nova.http with {value}', function () {
    const ctx = setupCe('<nova-input-mask model="phone" mask="9999" validate="/api/check?id={value}"></nova-input-mask>')
    const fetchedUrls = []
    ctx.nova({
      data: { phone: '' },
      funcs: {}
    })
    // Inject mock nova.http
    ctx.nova.http = {
      get: function (url) { fetchedUrls.push(url); return Promise.resolve({ ok: true, valid: true }) }
    }
    const el = ctx.document.querySelector('nova-input-mask')
    ok(el.querySelector('.nova-input-mask-status'))
    return ctx.tick().then(function () {
      const input = el.querySelector('input')
      input.value = '1234'
      input.dispatchEvent(new ctx.window.Event('input'))
      return new Promise(function (r) { setTimeout(r, 20) })
    }).then(function () {
      eq(fetchedUrls.length, 1)
      eq(fetchedUrls[0], '/api/check?id=1234')
    })
  })
})

// ============== <nova-knob> ==============
describe('nova-knob custom element', function () {
  it('renders SVG', function () {
    const ctx = setupCe('<nova-knob model="brightness" min="0" max="100"></nova-knob>')
    ctx.nova({ data: { brightness: 50 } })
    const el = ctx.document.querySelector('nova-knob')
    ok(el)
    ok(el.querySelector('svg'))
    ok(el.querySelector('.knob-track'))
    ok(el.querySelector('.knob-value'))
    ok(el.querySelector('.knob-label'))
  })

  it('initial value reflects data', function () {
    const ctx = setupCe('<nova-knob model="brightness"></nova-knob>')
    ctx.nova({ data: { brightness: 75 } })
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      const label = ctx.document.querySelector('nova-knob .knob-label')
      eq(label.textContent, '75')
    })
  })

  it('updates label when data changes', function () {
    const ctx = setupCe('<nova-knob model="brightness"></nova-knob>')
    const data = ctx.nova({ data: { brightness: 50 } })
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      data.brightness = 88
      return ctx.tick()
    }).then(function () {
      const label = ctx.document.querySelector('nova-knob .knob-label')
      eq(label.textContent, '88')
    })
  })

  it('formats with decimals attribute', function () {
    const ctx = setupCe('<nova-knob model="x" decimals="1"></nova-knob>')
    ctx.nova({ data: { x: 24.567 } })
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      const label = ctx.document.querySelector('nova-knob .knob-label')
      eq(label.textContent, '24.6')
    })
  })

  it('formats with format="percent" using nova.fmt', function () {
    const ctx = setupCe('<nova-knob model="x" format="percent" decimals="1"></nova-knob>')
    ctx.nova({ data: { x: 0.5 } })
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      const label = ctx.document.querySelector('nova-knob .knob-label')
      eq(label.textContent, '50.0%')
    })
  })

  it('formats with format="number" using nova.fmt', function () {
    const ctx = setupCe('<nova-knob model="x" format="number" decimals="2"></nova-knob>')
    ctx.nova({ data: { x: 3.14159 } })
    return new Promise(function (r) { setTimeout(r, 100) }).then(function () {
      const label = ctx.document.querySelector('nova-knob .knob-label')
      eq(label.textContent, '3.14')
    })
  })
})

// ============== <nova-modal> ==============
describe('nova-modal custom element', function () {
  it('renders with shadow DOM', function () {
    const ctx = setupCe('<nova-modal show="open" title="Hello">content</nova-modal>')
    ctx.nova({ data: { open: false } })
    const el = ctx.document.querySelector('nova-modal')
    ok(el)
    ok(el.shadowRoot)
    ok(el.shadowRoot.querySelector('.dialog'))
    eq(el.shadowRoot.querySelector('.title').textContent, 'Hello')
  })

  it('slot content is rendered', function () {
    const ctx = setupCe('<nova-modal show="x"><p class="my-content">hi</p></nova-modal>')
    ctx.nova({ data: { x: false } })
    const el = ctx.document.querySelector('nova-modal')
    ok(el.querySelector('.my-content'))
    eq(el.querySelector('.my-content').textContent, 'hi')
  })

  it('hidden when show=false', function () {
    const ctx = setupCe('<nova-modal show="x">x</nova-modal>')
    ctx.nova({ data: { x: false } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const el = ctx.document.querySelector('nova-modal')
      eq(el.hasAttribute('data-visible'), false)
    })
  })

  it('visible when show=true', function () {
    const ctx = setupCe('<nova-modal show="x">x</nova-modal>')
    ctx.nova({ data: { x: true } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const el = ctx.document.querySelector('nova-modal')
      eq(el.hasAttribute('data-visible'), true)
    })
  })

  it('close button toggles show=false', function () {
    const ctx = setupCe('<nova-modal show="x">x</nova-modal>')
    const data = ctx.nova({ data: { x: true } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const el = ctx.document.querySelector('nova-modal')
      el.shadowRoot.querySelector('.close').click()
      return ctx.tick()
    }).then(function () {
      eq(data.x, false)
    })
  })

  it('size attribute sets dialog size', function () {
    const ctx = setupCe('<nova-modal show="x" size="lg">x</nova-modal>')
    ctx.nova({ data: { x: false } })
    const el = ctx.document.querySelector('nova-modal')
    ok(el.shadowRoot.querySelector('.dialog').classList.contains('size-lg'))
  })

  it('footer slot works', function () {
    const ctx = setupCe('<nova-modal show="x">body<button slot="footer">OK</button></nova-modal>')
    ctx.nova({ data: { x: false } })
    const el = ctx.document.querySelector('nova-modal')
    const footerButton = el.querySelector('button[slot="footer"]')
    ok(footerButton)
    eq(footerButton.getAttribute('slot'), 'footer')
  })
})

// ============== <nova-tabs> ==============
describe('nova-tabs custom element', function () {
  it('activates first tab by default', function () {
    const ctx = setupCe(
      '<nova-tabs model="active">' +
        '<button slot="tab" data-tab="a">A</button>' +
        '<button slot="tab" data-tab="b">B</button>' +
        '<div slot="panel" data-tab="a">A</div>' +
        '<div slot="panel" data-tab="b">B</div>' +
      '</nova-tabs>'
    )
    ctx.nova({ data: { active: 'a' } })
    return ctx.tick().then(function () {
      const a = ctx.document.querySelector('[data-tab="a"][slot="tab"]')
      const b = ctx.document.querySelector('[data-tab="b"][slot="tab"]')
      ok(a.classList.contains('nova-tab-active'))
      ok(!b.classList.contains('nova-tab-active'))
    })
  })

  it('clicking a tab changes model', function () {
    const ctx = setupCe(
      '<nova-tabs model="active">' +
        '<button slot="tab" data-tab="a">A</button>' +
        '<button slot="tab" data-tab="b">B</button>' +
        '<div slot="panel" data-tab="a">A</div>' +
        '<div slot="panel" data-tab="b">B</div>' +
      '</nova-tabs>'
    )
    const data = ctx.nova({ data: { active: 'a' } })
    return ctx.tick().then(function () {
      const b = ctx.document.querySelector('[data-tab="b"][slot="tab"]')
      b.click()
      return ctx.tick()
    }).then(function () {
      eq(data.active, 'b')
    })
  })

  it('arrow key navigation moves active tab', function () {
    const ctx = setupCe(
      '<nova-tabs model="active">' +
        '<button slot="tab" data-tab="a">A</button>' +
        '<button slot="tab" data-tab="b">B</button>' +
        '<button slot="tab" data-tab="c">C</button>' +
        '<div slot="panel" data-tab="a">A</div>' +
        '<div slot="panel" data-tab="b">B</div>' +
        '<div slot="panel" data-tab="c">C</div>' +
      '</nova-tabs>'
    )
    const data = ctx.nova({ data: { active: 'a' } })
    return ctx.tick().then(function () {
      const el = ctx.document.querySelector('nova-tabs')
      const ev = new ctx.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      el.dispatchEvent(ev)
      return ctx.tick()
    }).then(function () {
      eq(data.active, 'b')
    })
  })
})

// ============== <nova-tag-input> ==============
describe('nova-tag-input custom element', function () {
  it('Enter appends a tag', function () {
    const ctx = setupCe('<nova-tag-input model="tags"></nova-tag-input>')
    const data = ctx.nova({ data: { tags: [] } })
    return ctx.tick().then(function () {
      const input = ctx.document.querySelector('nova-tag-input input')
      input.value = '客厅'
      input.dispatchEvent(new ctx.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      return ctx.tick()
    }).then(function () {
      eq(data.tags.length, 1)
      eq(data.tags[0], '客厅')
    })
  })

  it('Backspace at empty input removes last tag', function () {
    const ctx = setupCe('<nova-tag-input model="tags"></nova-tag-input>')
    const data = ctx.nova({ data: { tags: ['a', 'b'] } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const input = ctx.document.querySelector('nova-tag-input input')
      input.value = ''
      input.dispatchEvent(new ctx.window.KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))
      return ctx.tick()
    }).then(function () {
      eq(data.tags.length, 1)
      eq(data.tags[0], 'a')
    })
  })

  it('chip × button removes a specific tag', function () {
    const ctx = setupCe('<nova-tag-input model="tags"></nova-tag-input>')
    const data = ctx.nova({ data: { tags: ['a', 'b', 'c'] } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const chips = ctx.document.querySelectorAll('nova-tag-input .nova-tag-chip-x')
      chips[1].click() // remove 'b'
      return ctx.tick()
    }).then(function () {
      eq(data.tags.length, 2)
      eq(data.tags[0], 'a')
      eq(data.tags[1], 'c')
    })
  })
})

// ============== <nova-color-picker> ==============
describe('nova-color-picker custom element', function () {
  it('initial color from model is reflected in inputs and preview', function () {
    const ctx = setupCe('<nova-color-picker model="c"></nova-color-picker>')
    ctx.nova({ data: { c: '#ff8800' } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const el = ctx.document.querySelector('nova-color-picker')
      eq(el.querySelector('.nova-color-hex').value, '#ff8800')
      ok(el.querySelector('.nova-color-preview').style.background.length > 0)
    })
  })

  it('hue slider change writes hex to model', function () {
    const ctx = setupCe('<nova-color-picker model="c"></nova-color-picker>')
    const data = ctx.nova({ data: { c: '#ff0000' } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const h = ctx.document.querySelector('nova-color-picker .nova-color-h')
      h.value = '120'
      h.dispatchEvent(new ctx.window.Event('input'))
      return ctx.tick()
    }).then(function () {
      // hue 120, s=1, v=1 → lime
      eq(data.c, '#00ff00')
    })
  })
})

// ============== <nova-thermostat> ==============
describe('nova-thermostat custom element', function () {
  it('renders slider and mode buttons', function () {
    const ctx = setupCe('<nova-thermostat model="t" mode-model="m" min="16" max="30"></nova-thermostat>')
    ctx.nova({ data: { t: 22, m: 'off' } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const el = ctx.document.querySelector('nova-thermostat')
      ok(el.querySelector('nova-slider'))
      ok(el.querySelector('.nova-thermostat-value'))
      eq(el.querySelectorAll('.nova-thermostat-mode button').length, 4)
    })
  })

  it('mode button click sets mode-model', function () {
    const ctx = setupCe('<nova-thermostat model="t" mode-model="m"></nova-thermostat>')
    const data = ctx.nova({ data: { t: 22, m: 'off' } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      const coolBtn = ctx.document.querySelector('.nova-thermostat-mode button[data-mode="cool"]')
      coolBtn.click()
      return ctx.tick()
    }).then(function () {
      eq(data.m, 'cool')
    })
  })

  it('mode change updates dot color', function () {
    const ctx = setupCe('<nova-thermostat model="t" mode-model="m"></nova-thermostat>')
    const data = ctx.nova({ data: { t: 22, m: 'off' } })
    return new Promise(function (r) { setTimeout(r, 50) }).then(function () {
      data.m = 'heat'
      return ctx.tick()
    }).then(function () {
      const dot = ctx.document.querySelector('.nova-thermostat-dot')
      // heat mode → red
      ok(dot.style.background.indexOf('239') >= 0 || dot.style.background.indexOf('rgb(239') >= 0 || dot.style.background === 'rgb(239, 68, 68)')
    })
  })
})