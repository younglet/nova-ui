'use strict'
const fs = require('fs')
const path = require('path')
const vm = require('node:vm')
const { JSDOM } = require('jsdom')

const SOURCE = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', 'nova-js', 'src', 'novajs.js'),
  'utf8'
)
const ELEMENTS_SOURCE = fs.readFileSync(
  path.join(__dirname, '..', 'nova-ui-elements.js'),
  'utf8'
)

function setup (html) {
  const fullHtml = '<!DOCTYPE html><html><head></head><body>' + (html || '') + '</body></html>'
  const dom = new JSDOM(fullHtml, { runScripts: 'outside-only' })
  const w = dom.window
  w.fetch = () => Promise.reject(new Error('fetch not mocked'))
  const ctx = {
    document: w.document,
    AbortController: w.AbortController,
    HTMLElement: w.HTMLElement,
    Node: w.Node,
    NodeFilter: w.NodeFilter,
    Comment: w.Comment,
    DocumentFragment: w.DocumentFragment,
    Text: w.Text,
    Element: w.Element,
    Event: w.Event,
    console,
    Promise, Map, Set, WeakMap,
    setTimeout, clearTimeout, setInterval, clearInterval,
    fetch: w.fetch
  }
  ctx.fetch = w.fetch
  vm.createContext(ctx)
  vm.runInContext(SOURCE, ctx)
  return {
    dom, window: w, document: w.document, nova: ctx.nova,
    tick: () => new Promise(r => setTimeout(r, 0))
  }
}

function eq (actual, expected, msg) {
  if (actual !== expected) {
    throw new Error('expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual) + (msg ? ' (' + msg + ')' : ''))
  }
}

function ok (cond, msg) { if (!cond) throw new Error('assertion failed' + (msg ? ': ' + msg : '')) }

const suites = []
let currentSuite = null

function describe (name, fn) {
  const suite = { name, tests: [], children: [] }
  suites.push(suite)
  const prev = currentSuite
  currentSuite = suite
  try { fn() } finally { currentSuite = prev }
}

function it (name, fn) {
  if (!currentSuite) throw new Error('it() must be inside describe()')
  currentSuite.tests.push({ name, fn })
}

module.exports = {
  setup, describe, it, eq, ok, suites,
  NOVA_JS: SOURCE,
  NOVA_UI_ELEMENTS_JS: ELEMENTS_SOURCE
}
