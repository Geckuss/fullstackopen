import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { listhelper } from '../utils/list_helper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = listhelper.dummy(blogs)
  strictEqual(result, 1)
})