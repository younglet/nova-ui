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