const path = require('path')
const fs = require('fs')

const helper = require('./helper')

const testDir = __dirname
const files = fs.readdirSync(testDir)
  .filter(function (f) { return /^\d.*\.test\.js$/.test(f) })
  .sort()

global.describe = helper.describe
global.it = helper.it

const filter = process.argv[2] ? new RegExp(process.argv[2], 'i') : null

let totalSuites = 0
let totalTests = 0
let passed = 0
let failed = 0
const failures = []
const startTime = Date.now()

for (const f of files) {
  if (filter && !f.match(filter)) continue
  const fullPath = path.join(testDir, f)
  require(fullPath)
}

const suites = require('./helper').suites
totalSuites = suites.length

async function run () {
  for (const suite of suites) {
    const filtered = suite.tests.filter(function (t) {
      return !filter || suite.name.match(filter) || t.name.match(filter)
    })
    if (filtered.length === 0) continue
    console.log('\n' + suite.name)
    for (const test of filtered) {
      totalTests++
      try {
        await test.fn()
        passed++
        console.log('  ✓ ' + test.name)
      } catch (e) {
        failed++
        console.log('  ✗ ' + test.name + ' :: ' + e.message)
        failures.push({ suite: suite.name, test: test.name, error: e })
      }
    }
  }

  const totalMs = Date.now() - startTime
  console.log('\n---')
  if (failed === 0) {
    console.log('✓ All ' + passed + ' tests passed (' + totalMs + 'ms)')
  } else {
    console.log('✗ ' + failed + ' of ' + (passed + failed) + ' tests failed')
  }

  process.exit(failed > 0 ? 1 : 0)
}

run().catch(function (e) {
  console.error('Runner error:', e.message)
  process.exit(2)
})
