# Rumbullion Storage
Generic single index Storage Abstraction Base Class used by the Rumbullion Toolkit. It is more likely that you want to use a derived Class such as the TemporaryStorage Class.

See also:

[Rumbullion](https://github.com/rnd7/rum)

[TemporaryStorage](https://github.com/rnd7/rum-temporary-storage)

## Download
[Builds](https://github.com/rnd7/rum-storage/tree/master/dist)

## Installation

```bash
npm i @rnd7/rum-storage

```
## Include

Via script tag
```
<script src="node_modules/@rnd7/rum-storage/dist/rum-storage.js"></script>
```

Using require
```javascript
const Storage = require('@rnd7/rum-storage')
```

Using import
```javascript
import { Storage } from '@rnd7/rum-storage'
```

## Usage
```javascript
let myStorage = new Storage()
let sid = 'someStorageId'
myStorage.insert(sid, {myProperty: "myValue"}).then(console.log)
```
## API

### Constructor
Pass optional configuration data as opts parameter assigned directly to the instance.
```javascript
new Storage(opts)
```

The Defaults are. The index can be either a string or an array. When using and array this will result in a combined index of multiple properties. The delimiter is used to generate the index key string.
```javascript
{
  index: 'sid', // storage id as default index field
  indexDelimiter: '-'
}
```

### insert
Inserts a new record. Pass some JSONable Data as record parameter. If it contains a property matching the storage index this key will be used otherwise a random key is generated. Returns Promise resolving with the inserted data or rejecting with an error code.
```javascript
insert(record)
```

### list
List all records. Returns Promise resolving with an array containing all sids.
```javascript
list()
```

### find
Find a single record. Returns Promise resolving with the corresponding data. You can either pass the index or an object containing the indexed field.
```javascript
find(recordOrIndex)
```

### update
Updates a single record. The data passed is merged into the actual record. Returns Promise resolving with the updated record. The Base Storage Class update is using assign, so keep in mind when working with references. Prefer shallow objects.
```javascript
update(record)
```

### upsert
Updates or inserts data. Internally update and insert are invoked.
```javascript
upsert(recordOrIndex)
```

### replace
Replaces an existing record.
```javascript
replace(record)
```

### remove
Removes an existing record. Pass an object or the index.
```javascript
remove(recordOrIndex)
```

## Development

### Installation
Install development dependencies such as gulp4, webpack, babel and mocha
```bash
npm install
```

### Build
Production build
```bash
npm run build
```

### Test
Run Tests
```bash
npm test
```

## License
See the [LICENSE](https://github.com/rnd7/rum-storage/tree/master/LICENSE.md) file for software license rights and limitations (MIT).
