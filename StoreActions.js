const fs = require('fs')
const FILE = 'store.txt'

class StoreActions {
  constructor () {
    this.storeMap = this._loadStore()
  }

  add (key, value) {
    if (!value) {
      throw new Error(`Invalid command. \n $ store add myKey myValue`)
    } else {
      this.storeMap.set(key, value)
      this._persistStore()
      console.log(`Saved`)
    }
  }

  list () {
    console.log(`Store:`)
    for (const [key, value] of this.storeMap) {
      console.log(`Key: ${key} - Value: ${value}`)
    }
  }

  get (key) {
    if (!key) {
      throw new Error(`Invalid command. \n $ store get myKey`)
    } else {
      console.log(`Item: ${this.storeMap.get(key)}`)
    }
  }

  remove (key) {
    if (!key) {
      throw new Error(`Invalid command. \n $ store remove myKey`)
    } else {
      this.storeMap.delete(key)
      this._persistStore()
      console.log(`Removed`)
    }
  }

  _loadStore () {
    try {
      const data = fs.readFileSync(FILE, 'utf8')
      const store = this._jsonToMap(data)
      return store
    } catch (err) {
      console.log(err)
    }
  }

  _persistStore () {
    try {
      fs.writeFileSync(FILE, this._mapToJson(this.storeMap), 'utf8')
      this._loadStore()
    } catch (err) {
      console.log(err)
    }
  }

  _mapToJson (map) {
    return JSON.stringify([...map])
  }

  _jsonToMap (jsonStr) {
    return new Map(JSON.parse(jsonStr))
  }
}

module.exports = StoreActions
