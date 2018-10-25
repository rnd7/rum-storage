export const STORAGE_DEFAULTS = {
  index: 'sid',
  indexDelimiter: '-'
}

export const NOT_FOUND = 404
export const METHOD_NOT_ALLOWED = 405

export class Storage {
  constructor(opts) {
    Object.assign(this, STORAGE_DEFAULTS, opts)
    this._cache = {}
  }

  indexIn(record) {
    if (typeof this.index === "string") return record[this.index]
    if (Array.isArray(this.index)) {
      let index = []
      for (let p of this.index) index.push(record[p])
      return index.join(this.indexDelimiter)
    }
  }


  insert(record) {
    const index = this.indexIn(record)
    return new Promise((resolve, reject)=>{
      if (!this._cache.hasOwnProperty(index)) {
        this._cache[index] = record
        resolve(this._cache[index])
      } else reject(METHOD_NOT_ALLOWED)
    })
  }

  list() {
    return new Promise((resolve, reject)=>{
      resolve(Object.keys(this._cache))
    })
  }

  find(recordOrIndex) {
    let index
    if (typeof recordOrIndex === "string") index = recordOrIndex
    else index = this.indexIn(recordOrIndex)
    return new Promise((resolve, reject)=>{
      if (this._cache.hasOwnProperty(index)) {
        resolve(this._cache[index])
      } else reject(NOT_FOUND)
    })
  }

  update(record) {
    const index = this.indexIn(record)
    return new Promise((resolve, reject)=>{
      if (this._cache.hasOwnProperty(index)) {
        Object.assign(this._cache[index], record)
        resolve(this._cache[index])
      } else reject(NOT_FOUND)
    })
  }

  upsert(record) {
    const index = this.indexIn(record)
    if (this._cache.hasOwnProperty(index)) return this.update(record)
    return this.insert(record)
  }

  replace(record) {
    const index = this.indexIn(record)
    return new Promise((resolve, reject)=>{
      if (this._cache.hasOwnProperty(index)) {
        this._cache[index] = record
        resolve(this._cache[index])
      } else reject(NOT_FOUND)
    })
  }

  remove(recordOrIndex) {
    let index
    if (typeof recordOrIndex === "string") index = recordOrIndex
    else index = this.indexIn(recordOrIndex)
    return new Promise((resolve, reject)=>{
      if (this._cache.hasOwnProperty(index)) {
        let deleted = this._cache[index]
        delete this._cache[index]
        resolve(deleted)
      } else reject(NOT_FOUND)
    })
  }
}
