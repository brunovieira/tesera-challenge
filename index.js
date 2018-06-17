#!/usr/bin/env node

const StoreActions = require('./StoreActions')

const command = process.argv[2]
const key = process.argv[3]
const value = process.argv[4]

const storeActions = new StoreActions()

try {
  switch (command) {
    case 'add':
      storeActions.add(key, value)
      break
    case 'list':
      storeActions.list()
      break
    case 'get':
      storeActions.get(key)
      break
    case 'remove':
      storeActions.remove(key)
      break
    default:
      throw new Error('Invalid command')
  }
} catch (err) {
  console.log(err.message)
}
