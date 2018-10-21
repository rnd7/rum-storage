function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var STORAGE_DEFAULTS = {
  index: 'sid',
  indexDelimiter: '-'
};
var NOT_FOUND = 404;
var METHOD_NOT_ALLOWED = 405;
var Storage =
/*#__PURE__*/
function () {
  function Storage(opts) {
    _classCallCheck(this, Storage);

    Object.assign(this, STORAGE_DEFAULTS, opts);

    this._init();
  }

  _createClass(Storage, [{
    key: "_init",
    value: function _init() {
      this._cache = {};
    }
  }, {
    key: "indexIn",
    value: function indexIn(record) {
      if (typeof this.index === "string") return record[this.index];

      if (Array.isArray(this.index)) {
        var index = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.index[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;
            index.push(record[p]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return index.join(this.indexDelimiter);
      }
    }
  }, {
    key: "insert",
    value: function insert(record) {
      var _this = this;

      var index = this.indexIn(record);
      return new Promise(function (resolve, reject) {
        if (!_this._cache.hasOwnProperty(index)) {
          _this._cache[index] = record;
          resolve(_this._cache[index]);
        } else reject(METHOD_NOT_ALLOWED);
      });
    }
  }, {
    key: "list",
    value: function list() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        resolve(Object.keys(_this2._cache));
      });
    }
  }, {
    key: "find",
    value: function find(recordOrIndex) {
      var _this3 = this;

      var index;
      if (typeof recordOrIndex === "string") index = recordOrIndex;else index = this.indexIn(recordOrIndex);
      return new Promise(function (resolve, reject) {
        if (_this3._cache.hasOwnProperty(index)) {
          resolve(_this3._cache[index]);
        } else reject(NOT_FOUND);
      });
    }
  }, {
    key: "update",
    value: function update(record) {
      var _this4 = this;

      var index = this.indexIn(record);
      return new Promise(function (resolve, reject) {
        if (_this4._cache.hasOwnProperty(index)) {
          Object.assign(_this4._cache[index], record);
          resolve(_this4._cache[index]);
        } else reject(NOT_FOUND);
      });
    }
  }, {
    key: "upsert",
    value: function upsert(record) {
      var index = this.indexIn(record);
      if (this._cache.hasOwnProperty(index)) return this.update(record);
      return this.insert(record);
    }
  }, {
    key: "replace",
    value: function replace(record) {
      var _this5 = this;

      var index = this.indexIn(record);
      return new Promise(function (resolve, reject) {
        if (_this5._cache.hasOwnProperty(index)) {
          _this5._cache[index] = record;
          resolve(_this5._cache[index]);
        } else reject(NOT_FOUND);
      });
    }
  }, {
    key: "remove",
    value: function remove(recordOrIndex) {
      var _this6 = this;

      var index;
      if (typeof recordOrIndex === "string") index = recordOrIndex;else index = this.indexIn(recordOrIndex);
      return new Promise(function (resolve, reject) {
        if (_this6._cache.hasOwnProperty(index)) {
          var deleted = _this6._cache[index];
          delete _this6._cache[index];
          resolve(deleted);
        } else reject(NOT_FOUND);
      });
    }
  }]);

  return Storage;
}();

export default Storage;
export { STORAGE_DEFAULTS, NOT_FOUND, METHOD_NOT_ALLOWED, Storage };
