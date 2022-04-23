'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ethers = require('ethers');
var BigNumber = _interopDefault(require('bignumber.js'));
var axios = _interopDefault(require('axios'));
var ethSigUtil = require('eth-sig-util');
var Websocket = _interopDefault(require('ws'));
var ReconnectingWebSocket = _interopDefault(require('reconnecting-websocket'));
var EventEmitter = _interopDefault(require('events'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var Tokens = /*#__PURE__*/function () {
  function Tokens(nameToAddress) {
    this.nameToAddress = {};

    for (var key in nameToAddress) {
      if (nameToAddress[key]) {
        this.nameToAddress[key] = nameToAddress[key].toLowerCase();
      }
    }
  }

  var _proto = Tokens.prototype;

  _proto.addressToName = function addressToName(address) {
    for (var name in this.nameToAddress) {
      if (this.nameToAddress[name]) {
        if (this.nameToAddress[name] === address.toLowerCase()) return name;
      }
    }

    return undefined;
  };

  _proto.addressToNameSafe = function addressToNameSafe(address) {
    var name = this.addressToName(address);
    if (name === undefined) throw new Error('no token name for ' + address);
    return name;
  };

  _proto.nameToAddressSafe = function nameToAddressSafe(name) {
    var address = this.nameToAddress[name];
    if (!address) throw new Error('no address for ' + name);
    return address;
  };

  _proto.addressesToSymbol = function addressesToSymbol(baseAsset, quoteAsset) {
    var base = this.addressToName(baseAsset);
    if (!base) return undefined;
    var quote = this.addressToName(quoteAsset);
    if (!quote) return undefined;
    return base + '-' + quote;
  };

  _proto.addressesToSymbolSafe = function addressesToSymbolSafe(baseAsset, quoteAsset) {
    var symbol = this.addressesToSymbol(baseAsset, quoteAsset);
    if (symbol === undefined) throw new Error('no symbol name for ' + baseAsset + ', ' + quoteAsset);
    return symbol;
  };

  _proto.symbolToAddresses = function symbolToAddresses(symbol) {
    var arr = symbol.split('-');
    if (arr.length !== 2) return undefined;
    var base = this.nameToAddress[arr[0]];
    if (!base) return undefined;
    var quote = this.nameToAddress[arr[1]];
    if (!quote) return undefined;
    return [base, quote];
  };

  return Tokens;
}();

var Tokens$1 = {
  __proto__: null,
  Tokens: Tokens
};

var NETWORK = {
  TEST: {
    BSC: {
      RPC: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      ORION: 'https://testing.orionprotocol.io/bsc-testnet',
      CHAIN_ID: 97,
      TX_TIMEOUT_SEC: 60
    },
    ETH: {
      RPC: 'https://testing.orionprotocol.io/eth-ropsten/rpc',
      ORION: 'https://testing.orionprotocol.io/eth-ropsten',
      CHAIN_ID: 3,
      TX_TIMEOUT_SEC: 60
    }
  },
  MAIN: {
    BSC: {
      RPC: 'https://bsc-dataseed.binance.org',
      ORION: 'https://trade-exp.orionprotocol.io',
      CHAIN_ID: 56,
      TX_TIMEOUT_SEC: 120
    },
    ETH: {
      RPC: 'https://trade.orionprotocol.io/rpc',
      ORION: 'https://trade.orionprotocol.io',
      CHAIN_ID: 1,
      TX_TIMEOUT_SEC: 120
    }
  }
};
var ORION_WS = {
  TEST: {
    BSC: 'wss://testing.orionprotocol.io/bsc-testnet',
    ETH: 'wss://testing.orionprotocol.io/eth-ropsten'
  },
  MAIN: {
    BSC: 'wss://trade-exp.orionprotocol.io',
    ETH: 'wss://trade.orionprotocol.io'
  }
};
var DEFAULT_EXPIRATION = 29 * 24 * 60 * 60 * 1000; // 29 days

var ORDER_TYPES = {
  Order: [{
    name: "senderAddress",
    type: "address"
  }, {
    name: "matcherAddress",
    type: "address"
  }, {
    name: "baseAsset",
    type: "address"
  }, {
    name: "quoteAsset",
    type: "address"
  }, {
    name: "matcherFeeAsset",
    type: "address"
  }, {
    name: "amount",
    type: "uint64"
  }, {
    name: "price",
    type: "uint64"
  }, {
    name: "matcherFee",
    type: "uint64"
  }, {
    name: "nonce",
    type: "uint64"
  }, {
    name: "expiration",
    type: "uint64"
  }, {
    name: "buySide",
    type: "uint8"
  }]
};
var CANCEL_ORDER_TYPES_V2 = {
  DeleteOrder: [{
    name: "sender",
    type: "address"
  }, {
    name: "id",
    type: "string"
  }]
};
var CANCEL_ORDER_TYPES = {
  DeleteOrder: [{
    name: "senderAddress",
    type: "address"
  }, {
    name: "id",
    type: "uint64"
  }]
};
var DOMAIN_TYPE = [{
  name: "name",
  type: "string"
}, {
  name: "version",
  type: "string"
}, {
  name: "chainId",
  type: "uint256"
}, {
  name: "salt",
  type: "bytes32"
}];
var ORDER_STATUSES = ["NEW", "ACCEPTED", "DIRECT_SWAP_PENDING", "ROUTING", "PARTIALLY_FILLED", "FILLED", "TX_PENDING", "REJECTED", "SETTLED", "CANCELED", "FAILED"];
var NETWORK_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
var PRICE_DEVIATIONS = {
  MIN: 0,
  MAX: 50
};
var EXCHANGE_ORDER_PRECISION = 8;
var CHAIN_TX_TYPES = {
  approve: {
    code: 1,
    name: 'APPROVE'
  },
  deposit: {
    code: 2,
    name: 'DEPOSIT'
  },
  withdraw: {
    code: 3,
    name: 'WITHDRAW'
  }
};
var TEST_WALLET = {
  mnemonicPhrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
};

var Constants = {
  __proto__: null,
  NETWORK: NETWORK,
  ORION_WS: ORION_WS,
  DEFAULT_EXPIRATION: DEFAULT_EXPIRATION,
  ORDER_TYPES: ORDER_TYPES,
  CANCEL_ORDER_TYPES_V2: CANCEL_ORDER_TYPES_V2,
  CANCEL_ORDER_TYPES: CANCEL_ORDER_TYPES,
  DOMAIN_TYPE: DOMAIN_TYPE,
  ORDER_STATUSES: ORDER_STATUSES,
  NETWORK_TOKEN_ADDRESS: NETWORK_TOKEN_ADDRESS,
  PRICE_DEVIATIONS: PRICE_DEVIATIONS,
  EXCHANGE_ORDER_PRECISION: EXCHANGE_ORDER_PRECISION,
  CHAIN_TX_TYPES: CHAIN_TX_TYPES,
  TEST_WALLET: TEST_WALLET
};

var erc20ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x06fdde03"
	},
	{
		constant: false,
		inputs: [
			{
				name: "spender",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x095ea7b3"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x18160ddd"
	},
	{
		constant: false,
		inputs: [
			{
				name: "sender",
				type: "address"
			},
			{
				name: "recipient",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x23b872dd"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x313ce567"
	},
	{
		constant: false,
		inputs: [
			{
				name: "spender",
				type: "address"
			},
			{
				name: "addedValue",
				type: "uint256"
			}
		],
		name: "increaseAllowance",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x39509351"
	},
	{
		constant: true,
		inputs: [
			{
				name: "account",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x70a08231"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x95d89b41"
	},
	{
		constant: false,
		inputs: [
			{
				name: "spender",
				type: "address"
			},
			{
				name: "subtractedValue",
				type: "uint256"
			}
		],
		name: "decreaseAllowance",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0xa457c2d7"
	},
	{
		constant: false,
		inputs: [
			{
				name: "recipient",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0xa9059cbb"
	},
	{
		constant: true,
		inputs: [
			{
				name: "owner",
				type: "address"
			},
			{
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0xdd62ed3e"
	},
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor",
		signature: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event",
		signature: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event",
		signature: "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
	}
];

var TxError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(TxError, _Error);

  function TxError(txHash, type, message) {
    var _this;

    _this = _Error.call(this, message) || this;
    _this.txHash = txHash;
    _this.txCode = type.code;
    _this.txName = type.name;
    _this.name = 'Transaction error';
    return _this;
  }

  return TxError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function getPriceWithDeviation(price, side, deviation) {
  var d = deviation.dividedBy(100);
  var percent = (side === 'buy' ? d : d.negated()).plus(1);
  return price.multipliedBy(percent);
}
function sumBigNumber(arr) {
  var result = new BigNumber(0);

  for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done;) {
    var x = _step.value;
    result = result.plus(x);
  }

  return result;
}

function toFeePrice(currency, nameToPrice, feeAsset) {
  var price = nameToPrice[currency].dividedBy(nameToPrice[feeAsset]);
  return price || new BigNumber(0);
}

function calculateMatcherFee(_ref) {
  var baseAsset = _ref.baseAsset,
      amount = _ref.amount,
      assetsPrices = _ref.assetsPrices,
      feePercent = _ref.feePercent,
      feeAsset = _ref.feeAsset;
  var MATCHER_FEE_PERCENT = new BigNumber(feePercent).dividedBy(100);
  var feeAmount = amount.multipliedBy(MATCHER_FEE_PERCENT);
  var feeToAssetPrice = feeAmount.multipliedBy(toFeePrice(baseAsset, assetsPrices, feeAsset));
  return feeToAssetPrice;
}

function calculateNetworkFee(_ref2) {
  var networkAsset = _ref2.networkAsset,
      feeAsset = _ref2.feeAsset,
      gasPriceWei = _ref2.gasPriceWei,
      assetsPrices = _ref2.assetsPrices,
      needWithdraw = _ref2.needWithdraw,
      _ref2$isPool = _ref2.isPool,
      isPool = _ref2$isPool === void 0 ? false : _ref2$isPool,
      limits = _ref2.limits;
  if (gasPriceWei === 'N/A') return {
    networkFeeEth: new BigNumber(0),
    networkFee: new BigNumber(0)
  };
  var requiredKeys = ['SWAP_THROUGH_ORION_POOL_GAS_LIMIT', 'FILL_ORDERS_AND_WITHDRAW_GAS_LIMIT', 'FILL_ORDERS_GAS_LIMIT'];
  requiredKeys.forEach(function (key) {
    if (!Object.keys(limits).includes(key)) throw new Error(key + " in limits is required!");
  });
  var SWAP_THROUGH_ORION_POOL_GAS_LIMIT = limits.SWAP_THROUGH_ORION_POOL_GAS_LIMIT,
      FILL_ORDERS_AND_WITHDRAW_GAS_LIMIT = limits.FILL_ORDERS_AND_WITHDRAW_GAS_LIMIT,
      FILL_ORDERS_GAS_LIMIT = limits.FILL_ORDERS_GAS_LIMIT;
  var gasPriceEth = new BigNumber(ethers.ethers.utils.formatUnits(gasPriceWei, 'ether'));
  var gasLimit;

  if (isPool) {
    gasLimit = SWAP_THROUGH_ORION_POOL_GAS_LIMIT;
  } else {
    if (needWithdraw) {
      gasLimit = FILL_ORDERS_AND_WITHDRAW_GAS_LIMIT;
    } else {
      gasLimit = FILL_ORDERS_GAS_LIMIT;
    }
  }

  var networkFeeEth = gasPriceEth.multipliedBy(gasLimit);
  var price = assetsPrices[feeAsset] && assetsPrices[networkAsset] ? assetsPrices[networkAsset].dividedBy(assetsPrices[feeAsset]) : new BigNumber(0);
  var networkFee = networkFeeEth.multipliedBy(price);
  return {
    networkFeeEth: networkFeeEth,
    networkFee: networkFee
  };
}
/*
    getFee return fee value rounded with EXCHANGE_ORDER_PRECISION
*/


function getFee(_ref3) {
  var baseAsset = _ref3.baseAsset,
      amount = _ref3.amount,
      networkAsset = _ref3.networkAsset,
      gasPriceWei = _ref3.gasPriceWei,
      assetsPrices = _ref3.assetsPrices,
      feePercent = _ref3.feePercent,
      _ref3$feeAsset = _ref3.feeAsset,
      feeAsset = _ref3$feeAsset === void 0 ? 'ORN' : _ref3$feeAsset,
      _ref3$needWithdraw = _ref3.needWithdraw,
      needWithdraw = _ref3$needWithdraw === void 0 ? false : _ref3$needWithdraw,
      _ref3$isPool = _ref3.isPool,
      isPool = _ref3$isPool === void 0 ? false : _ref3$isPool,
      limits = _ref3.limits;
  if (!amount || new BigNumber(amount).isNaN() || new BigNumber(amount).lte(0)) throw new Error('amount field is invalid!');
  if (!feePercent || Number.isNaN(Number(feePercent)) || Number(feePercent) <= 0) throw new Error('feePercent field is invalid!');

  if (!gasPriceWei || new BigNumber(gasPriceWei).isNaN() || new BigNumber(gasPriceWei).lte('0')) {
    throw new Error('gasPriceWei field is invalid!');
  }

  if (!assetsPrices || !Object.entries(assetsPrices).length) {
    throw new Error('assetsPrices field is invalid!');
  }

  Object.keys(assetsPrices).forEach(function (key) {
    assetsPrices[key] = new BigNumber(assetsPrices[key]);
    if (assetsPrices[key].isNaN() || assetsPrices[key].lte(0)) throw new Error("assetsPrices." + key + " value should be valid BigNumber");
  });
  if (!assetsPrices[baseAsset]) throw new Error('baseAsset field is invalid!');
  if (!assetsPrices[feeAsset]) throw new Error('feeAsset field is invalid!');
  if (!assetsPrices[networkAsset]) throw new Error('networkAsset field is invalid!');
  if (!limits || !Object.keys(limits).length) throw new Error('limits field is required');
  if (!Object.values(limits).every(function (el) {
    return typeof el === 'number' && el > 0;
  })) throw new Error('limits values should be positive numbers');
  var matcherFee = calculateMatcherFee({
    baseAsset: baseAsset,
    amount: amount,
    assetsPrices: assetsPrices,
    feePercent: feePercent,
    feeAsset: feeAsset
  });

  var _calculateNetworkFee = calculateNetworkFee({
    networkAsset: networkAsset,
    feeAsset: feeAsset,
    gasPriceWei: gasPriceWei,
    assetsPrices: assetsPrices,
    needWithdraw: needWithdraw,
    isPool: isPool,
    limits: limits
  }),
      networkFee = _calculateNetworkFee.networkFee;

  if (!matcherFee.gt(0)) throw new Error('matcherFee couldn`t be 0!');
  if (!networkFee.gt(0)) throw new Error('networkFee couldn`t be 0!');
  var totalFee = matcherFee.plus(networkFee).decimalPlaces(EXCHANGE_ORDER_PRECISION);
  return totalFee;
}
function parseTradeOrder(item) {
  var amount = new BigNumber(item.orderQty);
  var price = new BigNumber(item.price);
  var subOrders = item.subOrders ? item.subOrders.map(function (subOrder) {
    return parseTradeSubOrder(subOrder);
  }) : [];
  var total = amount.multipliedBy(price);
  return _extends({}, {
    date: Number(item.time),
    sender: item.clientId,
    id: Number(item.id),
    type: item.side,
    pair: item.symbol
  }, {
    blockchainOrder: item == null ? void 0 : item.blockchainOrder,
    status: item.status,
    baseAsset: item.baseAsset,
    quoteAsset: item.quoteAsset,
    feeAsset: item.feeCurrency,
    fee: new BigNumber(item.feeQty),
    side: item.side,
    amount: amount,
    price: price,
    total: total,
    subOrders: subOrders
  });
}
function parseTradeSubOrder(item) {
  return {
    pair: item.symbol,
    exchange: item.exchange,
    id: Number(item.id),
    amount: new BigNumber(item.subOrdQty),
    price: new BigNumber(item.price),
    status: item.status || 'NEW',
    side: item.side,
    sent: item.sent
  };
}
function parseTradeOrderV2(item) {
  var amount = new BigNumber(item.amount);
  var price = new BigNumber(item.price);

  var _item$assetPair$split = item.assetPair.split('-'),
      baseAsset = _item$assetPair$split[0],
      quoteAsset = _item$assetPair$split[1];

  var subOrdersKeys = Object.keys(item.subOrders);
  var subOrders = subOrdersKeys.length ? subOrdersKeys.map(function (key) {
    return parseTradeSubOrderV2(item.subOrders[key]);
  }) : [];
  var total = amount.multipliedBy(price);
  return _extends({}, {
    date: Number(item.creationTime),
    sender: item.sender,
    id: item.id,
    type: item.side,
    pair: item.assetPair
  }, {
    blockchainOrder: item == null ? void 0 : item.blockchainOrder,
    status: item.status,
    baseAsset: baseAsset,
    quoteAsset: quoteAsset,
    feeAsset: item.feeAsset,
    fee: new BigNumber(item.fee),
    amount: amount,
    side: item.side,
    price: price,
    total: total,
    subOrders: subOrders
  });
}
function parseTradeSubOrderV2(item) {
  return {
    pair: item.assetPair,
    exchange: item.exchange,
    id: Number(item.id),
    amount: new BigNumber(item.amount),
    price: new BigNumber(item.price),
    status: item.status || 'NEW',
    side: item.side,
    tradesInfo: item.tradesInfo
  };
}
function canCancelOrder(order) {
  return order.status === 'NEW' || order.status === 'ACCEPTED' || order.status === 'ROUTING' || order.status === 'PARTIALLY_FILLED';
}
function isOrderOpen(order) {
  return order.status === 'NEW' || order.status === 'ACCEPTED' || order.status === 'ROUTING' || order.status === 'PARTIALLY_FILLED' || order.status === 'FILLED' || order.status === 'TX_PENDING' || order.status === 'DIRECT_SWAP_PENDING';
}
function parseOrderbookItem(arr) {
  var _arr$;

  var price = new BigNumber(arr[0]);
  var size = new BigNumber(arr[1]);
  return {
    price: price,
    size: size,
    total: price.multipliedBy(size),
    cumulativeSize: new BigNumber(0),
    cumulativeTotal: new BigNumber(0),
    avgPrice: new BigNumber(0),
    deltaSize: 0,
    exchanges: (_arr$ = arr[2]) == null ? void 0 : _arr$.map(function (s) {
      return s.toLowerCase();
    })
  };
}
function parseOrderbookItemsV1(message) {
  var asks = message.asks,
      bids = message.bids;
  return {
    asks: asks.map(parseOrderbookItem),
    bids: bids.map(parseOrderbookItem)
  };
}
function parseOrderbookItemsV2(message) {
  var _message$ob = message.ob,
      a = _message$ob.a,
      b = _message$ob.b;
  return {
    asks: a.map(parseOrderbookItem),
    bids: b.map(parseOrderbookItem)
  };
}
function parsePair(arr) {
  var name = arr[0]; // "ETH-BTC"

  var _name$split = name.split('-'),
      fromCurrency = _name$split[0],
      toCurrency = _name$split[1];

  var lastPrice = new BigNumber(arr[1]);
  var openPrice = new BigNumber(arr[2]);
  var change24h = lastPrice.div(openPrice).minus(1).multipliedBy(100);
  var high = new BigNumber(arr[3]);
  var low = new BigNumber(arr[4]);
  var vol24h = new BigNumber(arr[5]);
  return {
    name: name,
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    lastPrice: lastPrice,
    openPrice: openPrice,
    change24h: change24h,
    high: high,
    low: low,
    vol24h: vol24h
  };
}
function parsePairs(data) {
  var newNameToPair = {};

  for (var i = 1; i < data.length; i++) {
    var arr = data[i];
    var pair = parsePair(arr);
    newNameToPair[pair.name] = pair;
  }

  return newNameToPair;
}
function numberToUnit(currency, n, blockchainInfo) {
  if (currency === blockchainInfo.baseCurrencyName) {
    return ethers.ethers.utils.parseEther(n.toString()).toString();
  } else {
    var decimals = blockchainInfo.assetToDecimals[currency];
    if (decimals === undefined) throw new Error('no decimals for ' + currency);
    return n.multipliedBy(Math.pow(10, decimals)).toFixed(0, BigNumber.ROUND_DOWN);
  }
}
function unitToNumber(currency, n, blockchainInfo) {
  var decimals = currency === blockchainInfo.baseCurrencyName ? 18 : blockchainInfo.assetToDecimals[currency];
  if (decimals === undefined) throw new Error('no decimals for ' + currency);
  return n.dividedBy(Math.pow(10, decimals));
}
function numberTo8(n) {
  return Number(new BigNumber(n).multipliedBy(1e8).toFixed(0));
}
function handleResponse(_x) {
  return _handleResponse.apply(this, arguments);
}

function _handleResponse() {
  _handleResponse = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(request) {
    var _yield$request, data;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return request;

          case 3:
            _yield$request = _context.sent;
            data = _yield$request.data;
            return _context.abrupt("return", data);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", Promise.reject(_context.t0));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _handleResponse.apply(this, arguments);
}

function waitForTx(_x2, _x3, _x4) {
  return _waitForTx.apply(this, arguments);
}

function _waitForTx() {
  _waitForTx = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(txResponse, timeoutSec, txType) {
    var txHasResult, timeoutRunner, txResult;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            txHasResult = false;
            timeoutRunner = setTimeout(function () {
              if (!txHasResult) throw new TxError(txResponse.hash, txType, "Request failed due to exceeding the time limit of " + timeoutSec + " seconds!");
            }, timeoutSec * 1000);
            _context2.next = 4;
            return txResponse.wait();

          case 4:
            txResult = _context2.sent;
            txHasResult = true;
            clearTimeout(timeoutRunner);

            if (!(txResult.status !== 1)) {
              _context2.next = 9;
              break;
            }

            throw new TxError(txResponse.hash, txType, "Request failed with status " + txResult.status + "!");

          case 9:
            return _context2.abrupt("return", txResponse.hash);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _waitForTx.apply(this, arguments);
}

function getTokenContracts(chain) {
  var tokensContracts = {};
  var tokens = chain.blockchainInfo.assetToAddress;

  for (var name in tokens) {
    if (name === chain.blockchainInfo.baseCurrencyName) continue;
    var tokenAddress = tokens[name];
    var tokenContract = new ethers.ethers.Contract(tokenAddress, erc20ABI, chain.signer);
    tokensContracts[name] = tokenContract;
    tokensContracts[tokenAddress] = tokenContract;
  }

  return tokensContracts;
}

var Helpers = {
  __proto__: null,
  getPriceWithDeviation: getPriceWithDeviation,
  sumBigNumber: sumBigNumber,
  getFee: getFee,
  parseTradeOrder: parseTradeOrder,
  parseTradeSubOrder: parseTradeSubOrder,
  parseTradeOrderV2: parseTradeOrderV2,
  parseTradeSubOrderV2: parseTradeSubOrderV2,
  canCancelOrder: canCancelOrder,
  isOrderOpen: isOrderOpen,
  parseOrderbookItem: parseOrderbookItem,
  parseOrderbookItemsV1: parseOrderbookItemsV1,
  parseOrderbookItemsV2: parseOrderbookItemsV2,
  parsePair: parsePair,
  parsePairs: parsePairs,
  numberToUnit: numberToUnit,
  unitToNumber: unitToNumber,
  numberTo8: numberTo8,
  handleResponse: handleResponse,
  waitForTx: waitForTx,
  getTokenContracts: getTokenContracts
};

var Api = function Api(network) {
  if (Api.instance) return Api.instance;
  Api.instance = this;
  this.orionBlockchain = axios.create({
    baseURL: network.ORION + "/api",
    timeout: 5000
  });
  this.orionAggregator = axios.create({
    baseURL: network.ORION + "/backend/api/v1",
    timeout: 5000
  });
  this.binance = axios.create({
    baseURL: network.RPC,
    timeout: 5000
  });
};

var Chain = /*#__PURE__*/function () {
  function Chain(privateKey, network) {
    if (network === void 0) {
      network = NETWORK.TEST.BSC;
    }

    this.provider = new ethers.ethers.providers.JsonRpcProvider(network.RPC);
    this.api = new Api(network);
    var privateKeyFormatted = privateKey.startsWith('0x') ? privateKey : "0x" + privateKey;
    this.signer = new ethers.ethers.Wallet(privateKeyFormatted).connect(this.provider);
    this.network = network;
  }

  var _proto = Chain.prototype;

  _proto.init = /*#__PURE__*/function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var info;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getBlockchainInfo();

            case 2:
              info = _context.sent;
              _context.next = 5;
              return this.getTokensFee();

            case 5:
              this._tokensFee = _context.sent;
              _context.next = 8;
              return this.getBaseLimits();

            case 8:
              this._baseLimits = _context.sent;
              info.baseCurrencyName = this.getNetworkAsset(info);
              this._blockchainInfo = info;
              this._tokens = new Tokens(this._blockchainInfo.assetToAddress);
              this._isEthereum = this._blockchainInfo.baseCurrencyName === 'ETH';
              this.tokensContracts = getTokenContracts(this);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function init() {
      return _init.apply(this, arguments);
    }

    return init;
  }();

  _proto.getTokenAddress = function getTokenAddress(name) {
    return this.blockchainInfo.assetToAddress[name];
  };

  _proto.getTokenSymbolsList = function getTokenSymbolsList() {
    return Object.keys(this.blockchainInfo.assetToAddress);
  };

  _proto.getTokenAddressesList = function getTokenAddressesList() {
    return Object.values(this.blockchainInfo.assetToAddress);
  };

  _proto.tokenAddressToName = function tokenAddressToName(address) {
    for (var name in this.blockchainInfo.assetToAddress) {
      if (Object.prototype.hasOwnProperty.call(this.blockchainInfo.assetToAddress, name)) {
        if (this.blockchainInfo.assetToAddress[name] === address.toLowerCase()) return name;
      }
    }

    return '';
  };

  _proto.getNetworkAsset = function getNetworkAsset(data) {
    var networkToken = Object.entries(data.assetToAddress).find(function (el) {
      return el[1] === NETWORK_TOKEN_ADDRESS;
    });
    if (!networkToken || !networkToken[0]) throw new Error('Cannot get network token!');
    return networkToken[0];
  };

  _proto.isNetworkAsset = function isNetworkAsset(asset) {
    return this.blockchainInfo.baseCurrencyName.toUpperCase() === asset.toUpperCase();
  };

  _proto.checkNetworkTokens = /*#__PURE__*/function () {
    var _checkNetworkTokens = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var networkAssetBalance;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getNetworkBalance();

            case 2:
              networkAssetBalance = _context2.sent;

              if (networkAssetBalance.gt(0)) {
                _context2.next = 5;
                break;
              }

              throw new Error('A non-zero balance of network tokens is required!');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function checkNetworkTokens() {
      return _checkNetworkTokens.apply(this, arguments);
    }

    return checkNetworkTokens;
  }();

  _proto.getBlockchainInfo = function getBlockchainInfo() {
    return handleResponse(this.api.orionBlockchain.get('/info'));
  };

  _proto.getTokensFee = function getTokensFee() {
    return handleResponse(this.api.orionBlockchain.get('/tokensFee'));
  };

  _proto.getBaseLimits = function getBaseLimits() {
    return handleResponse(this.api.orionBlockchain.get('/baseLimits'));
  };

  _proto.getBlockchainPrices = /*#__PURE__*/function () {
    var _getBlockchainPrices = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      var data, result, key, assetName;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return handleResponse(this.api.orionBlockchain.get('/prices'));

            case 3:
              data = _context3.sent;
              result = {};

              for (key in data) {
                assetName = this.tokens.addressToName(key);

                if (assetName) {
                  result[assetName] = new BigNumber(data[key]);
                }
              }

              return _context3.abrupt("return", result);

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.reject(_context3.t0));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 9]]);
    }));

    function getBlockchainPrices() {
      return _getBlockchainPrices.apply(this, arguments);
    }

    return getBlockchainPrices;
  }()
  /**
   * @return gasPrice current gas price in wei
   */
  ;

  _proto.getGasPrice =
  /*#__PURE__*/
  function () {
    var _getGasPrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4() {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.isEthereum) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", this.getGasPriceOB());

            case 2:
              return _context4.abrupt("return", this.getGasPriceBinance());

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getGasPrice() {
      return _getGasPrice.apply(this, arguments);
    }

    return getGasPrice;
  }();

  _proto.getGasPriceOB = /*#__PURE__*/function () {
    var _getGasPriceOB = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5() {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", handleResponse(this.api.orionBlockchain.get('/gasPrice')));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getGasPriceOB() {
      return _getGasPriceOB.apply(this, arguments);
    }

    return getGasPriceOB;
  }();

  _proto.getGasPriceBinance = /*#__PURE__*/function () {
    var _getGasPriceBinance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6() {
      var data;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return handleResponse(this.api.binance.post('', {
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_gasPrice',
                params: []
              }));

            case 3:
              data = _context6.sent;
              return _context6.abrupt("return", new BigNumber(data.result).toString());

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", Promise.reject(_context6.t0));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 7]]);
    }));

    function getGasPriceBinance() {
      return _getGasPriceBinance.apply(this, arguments);
    }

    return getGasPriceBinance;
  }();

  _proto.getNetworkBalance = /*#__PURE__*/function () {
    var _getNetworkBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7() {
      var wei;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return this.provider.getBalance(this.signer.address);

            case 3:
              wei = _context7.sent;
              return _context7.abrupt("return", new BigNumber(ethers.ethers.utils.formatEther(wei)));

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", Promise.reject(_context7.t0));

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 7]]);
    }));

    function getNetworkBalance() {
      return _getNetworkBalance.apply(this, arguments);
    }

    return getNetworkBalance;
  }();

  _proto.getWalletBalance = /*#__PURE__*/function () {
    var _getWalletBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(ticker) {
      var _this = this;

      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                if (ticker === _this.blockchainInfo.baseCurrencyName) {
                  _this.getNetworkBalance().then(function (balance) {
                    var _resolve;

                    resolve((_resolve = {}, _resolve[_this.blockchainInfo.baseCurrencyName] = balance.toString(), _resolve));
                  })["catch"](function (error) {
                    return reject(error);
                  });
                } else {
                  var promises = [];

                  try {
                    var tokens = _this.getTokenSymbolsList();

                    if (ticker) {
                      tokens = tokens.filter(function (el) {
                        return el === ticker.toUpperCase();
                      });
                    }

                    tokens.forEach(function (token) {
                      if (token === _this.blockchainInfo.baseCurrencyName) return;
                      promises.push(_this.getTokenBalance(token));
                    });
                    Promise.all(promises).then(function (values) {
                      var result = {};
                      values.forEach(function (el) {
                        var name = el[0].toString();
                        var value = el[1].toString();
                        result[name] = value;
                      });
                      resolve(result);
                    });
                  } catch (error) {
                    reject(error);
                  }
                }
              }));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function getWalletBalance(_x) {
      return _getWalletBalance.apply(this, arguments);
    }

    return getWalletBalance;
  }();

  _proto.getTokenBalance = /*#__PURE__*/function () {
    var _getTokenBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(token) {
      var balance;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return this.tokensContracts[token].balanceOf(this.signer.address);

            case 3:
              balance = _context9.sent;
              return _context9.abrupt("return", [token, balance.toString()]);

            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", Promise.reject(_context9.t0));

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this, [[0, 7]]);
    }));

    function getTokenBalance(_x2) {
      return _getTokenBalance.apply(this, arguments);
    }

    return getTokenBalance;
  }();

  _proto.sendTransaction = /*#__PURE__*/function () {
    var _sendTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(unsignedTx, gasLimit, gasPriceWei) {
      var unsignedRequest;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              if (gasLimit > 0) unsignedTx.gasLimit = ethers.ethers.BigNumber.from(gasLimit);
              unsignedTx.gasPrice = ethers.ethers.BigNumber.from(gasPriceWei.toString());
              _context10.next = 5;
              return this.signer.populateTransaction(unsignedTx);

            case 5:
              unsignedRequest = _context10.sent;
              return _context10.abrupt("return", this.signer.sendTransaction(unsignedRequest));

            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", Promise.reject(_context10.t0));

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this, [[0, 9]]);
    }));

    function sendTransaction(_x3, _x4, _x5) {
      return _sendTransaction.apply(this, arguments);
    }

    return sendTransaction;
  }();

  _proto.getAllowance = /*#__PURE__*/function () {
    var _getAllowance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(currency, toAddress) {
      var decimals, currentTokenContract, unit;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              decimals = this.blockchainInfo.assetToDecimals[currency];
              currentTokenContract = this.tokensContracts[currency];

              if (!(!decimals || !currentTokenContract)) {
                _context11.next = 5;
                break;
              }

              throw new Error('Currency is invaild!');

            case 5:
              if (!toAddress) {
                toAddress = this.blockchainInfo.exchangeContractAddress;
              }

              _context11.next = 8;
              return currentTokenContract.allowance(this.signer.address, toAddress);

            case 8:
              unit = _context11.sent;
              return _context11.abrupt("return", new BigNumber(unit.toString()).dividedBy(Math.pow(10, decimals)));

            case 12:
              _context11.prev = 12;
              _context11.t0 = _context11["catch"](0);
              return _context11.abrupt("return", Promise.reject(_context11.t0));

            case 15:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this, [[0, 12]]);
    }));

    function getAllowance(_x6, _x7) {
      return _getAllowance.apply(this, arguments);
    }

    return getAllowance;
  }();

  _proto.allowanceHandler = /*#__PURE__*/function () {
    var _allowanceHandler = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(currency, amount, gasPriceWei) {
      var bignumberAmount, tokenContract, allowance, needReset;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!this.isNetworkAsset(currency)) {
                _context12.next = 2;
                break;
              }

              return _context12.abrupt("return");

            case 2:
              _context12.prev = 2;
              bignumberAmount = new BigNumber(amount);
              tokenContract = this.tokensContracts[currency];
              _context12.next = 7;
              return this.getAllowance(currency);

            case 7:
              allowance = _context12.sent;

              if (!allowance.lt(bignumberAmount)) {
                _context12.next = 19;
                break;
              }

              _context12.next = 11;
              return this.checkNeedZeroReset(tokenContract);

            case 11:
              needReset = _context12.sent;

              if (!needReset) {
                _context12.next = 18;
                break;
              }

              _context12.next = 15;
              return this.approve(currency, ethers.ethers.constants.Zero.toString(), gasPriceWei);

            case 15:
              return _context12.abrupt("return", this.approve(currency, ethers.ethers.constants.MaxUint256.toString(), gasPriceWei));

            case 18:
              return _context12.abrupt("return", this.approve(currency, ethers.ethers.constants.MaxUint256.toString(), gasPriceWei));

            case 19:
              _context12.next = 24;
              break;

            case 21:
              _context12.prev = 21;
              _context12.t0 = _context12["catch"](2);
              return _context12.abrupt("return", Promise.reject(_context12.t0));

            case 24:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this, [[2, 21]]);
    }));

    function allowanceHandler(_x8, _x9, _x10) {
      return _allowanceHandler.apply(this, arguments);
    }

    return allowanceHandler;
  }();

  _proto.checkNeedZeroReset = /*#__PURE__*/function () {
    var _checkNeedZeroReset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(contract) {
      var unsignedTx;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return contract.populateTransaction.approve(this.signer.address, ethers.ethers.constants.MaxUint256);

            case 2:
              unsignedTx = _context13.sent;
              _context13.prev = 3;
              _context13.next = 6;
              return this.signer.estimateGas(unsignedTx);

            case 6:
              return _context13.abrupt("return", false);

            case 9:
              _context13.prev = 9;
              _context13.t0 = _context13["catch"](3);
              return _context13.abrupt("return", true);

            case 12:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this, [[3, 9]]);
    }));

    function checkNeedZeroReset(_x11) {
      return _checkNeedZeroReset.apply(this, arguments);
    }

    return checkNeedZeroReset;
  }();

  _proto.approve = /*#__PURE__*/function () {
    var _approve = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(currency, amountUnit, gasPriceWei) {
      var gasPriceWeiLocal, tokenContract, toAddress;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return this.checkNetworkTokens();

            case 3:
              if (!gasPriceWei) {
                _context14.next = 7;
                break;
              }

              _context14.t0 = gasPriceWei;
              _context14.next = 10;
              break;

            case 7:
              _context14.next = 9;
              return this.getGasPrice();

            case 9:
              _context14.t0 = _context14.sent;

            case 10:
              gasPriceWeiLocal = _context14.t0;
              tokenContract = this.tokensContracts[currency];
              toAddress = this.blockchainInfo.exchangeContractAddress;
              return _context14.abrupt("return", this.approveERC20({
                amountUnit: amountUnit,
                gasPriceWei: gasPriceWeiLocal,
                toAddress: toAddress,
                tokenContract: tokenContract
              }));

            case 16:
              _context14.prev = 16;
              _context14.t1 = _context14["catch"](0);
              return _context14.abrupt("return", Promise.reject(_context14.t1));

            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this, [[0, 16]]);
    }));

    function approve(_x12, _x13, _x14) {
      return _approve.apply(this, arguments);
    }

    return approve;
  }();

  _proto.approveERC20 = /*#__PURE__*/function () {
    var _approveERC = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(_ref) {
      var amountUnit, gasPriceWei, toAddress, tokenContract, unsignedTx, txResponse;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              amountUnit = _ref.amountUnit, gasPriceWei = _ref.gasPriceWei, toAddress = _ref.toAddress, tokenContract = _ref.tokenContract;
              _context15.prev = 1;
              _context15.next = 4;
              return tokenContract.populateTransaction.approve(toAddress, amountUnit);

            case 4:
              unsignedTx = _context15.sent;
              _context15.next = 7;
              return this.sendTransaction(unsignedTx, this.baseLimits.APPROVE_ERC20_GAS_LIMIT, new BigNumber(gasPriceWei));

            case 7:
              txResponse = _context15.sent;
              return _context15.abrupt("return", waitForTx(txResponse, this.network.TX_TIMEOUT_SEC, CHAIN_TX_TYPES.approve));

            case 11:
              _context15.prev = 11;
              _context15.t0 = _context15["catch"](1);
              return _context15.abrupt("return", Promise.reject(_context15.t0));

            case 14:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this, [[1, 11]]);
    }));

    function approveERC20(_x15) {
      return _approveERC.apply(this, arguments);
    }

    return approveERC20;
  }();

  _createClass(Chain, [{
    key: "blockchainInfo",
    get: function get() {
      return this._blockchainInfo;
    }
  }, {
    key: "tokens",
    get: function get() {
      return this._tokens;
    }
  }, {
    key: "baseLimits",
    get: function get() {
      return this._baseLimits;
    }
  }, {
    key: "tokensFee",
    get: function get() {
      return this._tokensFee;
    }
  }, {
    key: "isEthereum",
    get: function get() {
      return this._isEthereum;
    }
  }]);

  return Chain;
}();

var exchangeABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "assetAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isDeposit",
				type: "bool"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "amount",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "timestamp",
				type: "uint64"
			}
		],
		name: "NewAssetTransaction",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "asset_spend",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "asset_receive",
				type: "address"
			},
			{
				indexed: false,
				internalType: "int112",
				name: "amount_spent",
				type: "int112"
			},
			{
				indexed: false,
				internalType: "int112",
				name: "amount_received",
				type: "int112"
			}
		],
		name: "NewSwapOrionPool",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "buyer",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "seller",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "baseAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "quoteAsset",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "filledPrice",
				type: "uint64"
			},
			{
				indexed: false,
				internalType: "uint192",
				name: "filledAmount",
				type: "uint192"
			},
			{
				indexed: false,
				internalType: "uint192",
				name: "amountQuote",
				type: "uint192"
			}
		],
		name: "NewTrade",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "OwnershipTransferred",
		type: "event"
	},
	{
		stateMutability: "nonpayable",
		type: "fallback"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "allowStakeRelease",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "assetRisks",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "calcPosition",
		outputs: [
			{
				components: [
					{
						internalType: "enum MarginalFunctionality.PositionState",
						name: "state",
						type: "uint8"
					},
					{
						internalType: "int256",
						name: "weightedPosition",
						type: "int256"
					},
					{
						internalType: "int256",
						name: "totalPosition",
						type: "int256"
					},
					{
						internalType: "int256",
						name: "totalLiabilities",
						type: "int256"
					}
				],
				internalType: "struct MarginalFunctionality.Position",
				name: "",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "checkPosition",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "deposit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "assetAddress",
				type: "address"
			},
			{
				internalType: "uint112",
				name: "amount",
				type: "uint112"
			}
		],
		name: "depositAsset",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "buyOrder",
				type: "tuple"
			},
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "sellOrder",
				type: "tuple"
			},
			{
				internalType: "uint64",
				name: "filledPrice",
				type: "uint64"
			},
			{
				internalType: "uint112",
				name: "filledAmount",
				type: "uint112"
			}
		],
		name: "fillOrders",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "order",
				type: "tuple"
			},
			{
				internalType: "uint112",
				name: "filledAmount",
				type: "uint112"
			},
			{
				internalType: "uint64",
				name: "blockchainFee",
				type: "uint64"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "fillThroughOrionPool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "filledAmounts",
		outputs: [
			{
				internalType: "uint192",
				name: "",
				type: "uint192"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "assetAddress",
				type: "address"
			},
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getBalance",
		outputs: [
			{
				internalType: "int192",
				name: "",
				type: "int192"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "assetsAddresses",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getBalances",
		outputs: [
			{
				internalType: "int192[]",
				name: "balances",
				type: "int192[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCollateralAssets",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "orderHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "getFilledAmounts",
		outputs: [
			{
				internalType: "int192",
				name: "totalFilled",
				type: "int192"
			},
			{
				internalType: "int192",
				name: "totalFeesPaid",
				type: "int192"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getLiabilities",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "asset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "timestamp",
						type: "uint64"
					},
					{
						internalType: "uint192",
						name: "outstandingAmount",
						type: "uint192"
					}
				],
				internalType: "struct MarginalFunctionality.Liability[]",
				name: "liabilitiesArray",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getLockedStakeBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "getOrderHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getStake",
		outputs: [
			{
				components: [
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "enum OrionVault.StakePhase",
						name: "phase",
						type: "uint8"
					},
					{
						internalType: "uint64",
						name: "lastActionTimestamp",
						type: "uint64"
					}
				],
				internalType: "struct OrionVault.Stake",
				name: "stake",
				type: "tuple"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getStakeBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "getStakePhase",
		outputs: [
			{
				internalType: "enum OrionVault.StakePhase",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "initialize",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "liabilities",
		outputs: [
			{
				internalType: "address",
				name: "asset",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "timestamp",
				type: "uint64"
			},
			{
				internalType: "uint192",
				name: "outstandingAmount",
				type: "uint192"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "liquidationPremium",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint64",
				name: "amount",
				type: "uint64"
			}
		],
		name: "lockStake",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "broker",
				type: "address"
			},
			{
				internalType: "address",
				name: "redeemedAsset",
				type: "address"
			},
			{
				internalType: "uint112",
				name: "amount",
				type: "uint112"
			}
		],
		name: "partiallyLiquidate",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "positionOverdue",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			}
		],
		name: "postponeStakeRelease",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "priceOverdue",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "renounceOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "requestReleaseStake",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "amount",
				type: "uint64"
			}
		],
		name: "seizeFromStake",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "orionToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "priceOracleAddress",
				type: "address"
			},
			{
				internalType: "address",
				name: "allowedMatcher",
				type: "address"
			}
		],
		name: "setBasicParams",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "orionToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "priceOracleAddress",
				type: "address"
			},
			{
				internalType: "address",
				name: "allowedMatcher",
				type: "address"
			},
			{
				internalType: "address",
				name: "orionpoolRouter",
				type: "address"
			}
		],
		name: "setBasicParams",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "stakeRisk",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint112",
				name: "amount_spend",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "amount_receive",
				type: "uint112"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "bool",
				name: "is_exact_spend",
				type: "bool"
			}
		],
		name: "swapThroughOrionPool",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address"
			}
		],
		name: "transferOwnership",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "assets",
				type: "address[]"
			},
			{
				internalType: "uint8[]",
				name: "risks",
				type: "uint8[]"
			}
		],
		name: "updateAssetRisks",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_collateralAssets",
				type: "address[]"
			},
			{
				internalType: "uint8",
				name: "_stakeRisk",
				type: "uint8"
			},
			{
				internalType: "uint8",
				name: "_liquidationPremium",
				type: "uint8"
			},
			{
				internalType: "uint64",
				name: "_priceOverdue",
				type: "uint64"
			},
			{
				internalType: "uint64",
				name: "_positionOverdue",
				type: "uint64"
			}
		],
		name: "updateMarginalSettings",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "senderAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherAddress",
						type: "address"
					},
					{
						internalType: "address",
						name: "baseAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "quoteAsset",
						type: "address"
					},
					{
						internalType: "address",
						name: "matcherFeeAsset",
						type: "address"
					},
					{
						internalType: "uint64",
						name: "amount",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "price",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "matcherFee",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "nonce",
						type: "uint64"
					},
					{
						internalType: "uint64",
						name: "expiration",
						type: "uint64"
					},
					{
						internalType: "uint8",
						name: "buySide",
						type: "uint8"
					},
					{
						internalType: "bool",
						name: "isPersonalSign",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "signature",
						type: "bytes"
					}
				],
				internalType: "struct LibValidator.Order",
				name: "order",
				type: "tuple"
			}
		],
		name: "validateOrder",
		outputs: [
			{
				internalType: "bool",
				name: "isValid",
				type: "bool"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "assetAddress",
				type: "address"
			},
			{
				internalType: "uint112",
				name: "amount",
				type: "uint112"
			}
		],
		name: "withdraw",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var Exchange = /*#__PURE__*/function () {
  function Exchange(chain) {
    this.chain = chain;
    this.exchangeContract = new ethers.ethers.Contract(this.chain.blockchainInfo.exchangeContractAddress, exchangeABI, this.chain.signer);
  }

  var _proto = Exchange.prototype;

  _proto.getContractBalance = /*#__PURE__*/function () {
    var _getContractBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(tokenSymbol) {
      var _this = this;

      var token, result, tokenAddresses, tokens, total, locked;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = tokenSymbol ? tokenSymbol.toUpperCase() : '';
              _context.prev = 1;

              if (!(token && !this.chain.getTokenSymbolsList().includes(token))) {
                _context.next = 4;
                break;
              }

              throw new Error('Invalid token');

            case 4:
              result = {};
              tokenAddresses = token ? [this.chain.getTokenAddress(token)] : this.chain.getTokenAddressesList();
              tokens = token ? [token] : this.chain.getTokenSymbolsList();
              _context.next = 9;
              return this.exchangeContract.getBalances(tokenAddresses, this.chain.signer.address);

            case 9:
              total = _context.sent;
              _context.next = 12;
              return this.checkReservedBalance(this.chain.signer.address);

            case 12:
              locked = _context.sent;
              total.forEach(function (totalBalance, i) {
                var lockedValue = locked[tokens[i]] || 0;
                result[tokens[i]] = _this.parseContractBalance(totalBalance, lockedValue);
              });
              return _context.abrupt("return", result);

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", Promise.reject(_context.t0));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 17]]);
    }));

    function getContractBalance(_x) {
      return _getContractBalance.apply(this, arguments);
    }

    return getContractBalance;
  }();

  _proto.checkReservedBalance = /*#__PURE__*/function () {
    var _checkReservedBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(walletAddress, asset) {
      var path;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (asset === void 0) {
                asset = '';
              }

              path = "/address/balance/reserved/" + asset + "?address=" + walletAddress;
              return _context2.abrupt("return", handleResponse(this.chain.api.orionAggregator.get(path)));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function checkReservedBalance(_x2, _x3) {
      return _checkReservedBalance.apply(this, arguments);
    }

    return checkReservedBalance;
  }();

  _proto.parseContractBalance = function parseContractBalance(total8, locked) {
    var total = ethers.ethers.utils.formatUnits(ethers.ethers.BigNumber.from(total8.toString()), EXCHANGE_ORDER_PRECISION);
    var totalBN = new BigNumber(total);
    var lockedBN = new BigNumber(locked);
    var availableBN = totalBN.minus(lockedBN);
    var balanceSummary = {
      total: totalBN,
      locked: lockedBN,
      available: availableBN
    };
    return balanceSummary;
  };

  _proto.depositETH = /*#__PURE__*/function () {
    var _depositETH = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(amountUnit, gasPriceWei) {
      var unsignedTx, txResponse;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.exchangeContract.populateTransaction.deposit();

            case 2:
              unsignedTx = _context3.sent;
              unsignedTx.value = ethers.ethers.BigNumber.from(amountUnit);
              _context3.next = 6;
              return this.chain.sendTransaction(unsignedTx, this.chain.baseLimits.DEPOSIT_ETH_GAS_LIMIT, gasPriceWei);

            case 6:
              txResponse = _context3.sent;
              return _context3.abrupt("return", waitForTx(txResponse, this.chain.network.TX_TIMEOUT_SEC, CHAIN_TX_TYPES.deposit));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function depositETH(_x4, _x5) {
      return _depositETH.apply(this, arguments);
    }

    return depositETH;
  }();

  _proto.depositERC20 = /*#__PURE__*/function () {
    var _depositERC = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(currency, amountUnit, gasPriceWei) {
      var txResponse;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = this.chain;
              _context4.next = 3;
              return this.exchangeContract.populateTransaction.depositAsset(this.chain.getTokenAddress(currency), amountUnit);

            case 3:
              _context4.t1 = _context4.sent;
              _context4.t2 = this.chain.baseLimits.DEPOSIT_ERC20_GAS_LIMIT;
              _context4.t3 = gasPriceWei;
              _context4.next = 8;
              return _context4.t0.sendTransaction.call(_context4.t0, _context4.t1, _context4.t2, _context4.t3);

            case 8:
              txResponse = _context4.sent;
              return _context4.abrupt("return", waitForTx(txResponse, this.chain.network.TX_TIMEOUT_SEC, CHAIN_TX_TYPES.deposit));

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function depositERC20(_x6, _x7, _x8) {
      return _depositERC.apply(this, arguments);
    }

    return depositERC20;
  }();

  _proto.deposit = /*#__PURE__*/function () {
    var _deposit = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(currency, amount, gasPriceWei) {
      var bignumberAmount, amountUnit, walletBalanceUint, walletBalance, gasPriceWeiLocal;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this.chain.checkNetworkTokens();

            case 3:
              bignumberAmount = new BigNumber(amount);
              amountUnit = numberToUnit(currency, bignumberAmount, this.chain.blockchainInfo);
              _context5.next = 7;
              return this.chain.getWalletBalance(currency);

            case 7:
              walletBalanceUint = _context5.sent;
              walletBalance = unitToNumber(currency, new BigNumber(walletBalanceUint[currency]), this.chain.blockchainInfo);

              if (!walletBalance.lt(bignumberAmount)) {
                _context5.next = 11;
                break;
              }

              throw new Error("The wallet balance (" + walletBalance + ") is lower than the deposit amount (" + amount + ")!");

            case 11:
              if (!gasPriceWei) {
                _context5.next = 15;
                break;
              }

              _context5.t0 = gasPriceWei;
              _context5.next = 18;
              break;

            case 15:
              _context5.next = 17;
              return this.chain.getGasPrice();

            case 17:
              _context5.t0 = _context5.sent;

            case 18:
              gasPriceWeiLocal = _context5.t0;

              if (!this.chain.isNetworkAsset(currency)) {
                _context5.next = 23;
                break;
              }

              return _context5.abrupt("return", this.depositETH(amountUnit, new BigNumber(gasPriceWeiLocal)));

            case 23:
              _context5.next = 25;
              return this.chain.allowanceHandler(currency, amount, gasPriceWeiLocal);

            case 25:
              return _context5.abrupt("return", this.depositERC20(currency, amountUnit, new BigNumber(gasPriceWeiLocal)));

            case 26:
              _context5.next = 31;
              break;

            case 28:
              _context5.prev = 28;
              _context5.t1 = _context5["catch"](0);
              return _context5.abrupt("return", Promise.reject(_context5.t1));

            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 28]]);
    }));

    function deposit(_x9, _x10, _x11) {
      return _deposit.apply(this, arguments);
    }

    return deposit;
  }();

  _proto.withdraw = /*#__PURE__*/function () {
    var _withdraw = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(currency, amount, gasPriceWei) {
      var amountUnit, balance, gasPriceWeiLocal, txResponse;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return this.chain.checkNetworkTokens();

            case 3:
              amountUnit = numberToUnit(currency, new BigNumber(amount), this.chain.blockchainInfo);
              _context6.next = 6;
              return this.getContractBalance(currency);

            case 6:
              balance = _context6.sent;

              if (!gasPriceWei) {
                _context6.next = 11;
                break;
              }

              _context6.t0 = gasPriceWei;
              _context6.next = 14;
              break;

            case 11:
              _context6.next = 13;
              return this.chain.getGasPrice();

            case 13:
              _context6.t0 = _context6.sent;

            case 14:
              gasPriceWeiLocal = _context6.t0;

              if (!balance[currency].available.lt(new BigNumber(amount))) {
                _context6.next = 17;
                break;
              }

              throw new Error("The available contract balance (" + balance[currency].available + ") is less than the withdrawal amount (" + new BigNumber(amount) + ")! ");

            case 17:
              _context6.t1 = this.chain;
              _context6.next = 20;
              return this.exchangeContract.populateTransaction.withdraw(this.chain.getTokenAddress(currency), amountUnit);

            case 20:
              _context6.t2 = _context6.sent;
              _context6.t3 = this.chain.baseLimits.WITHDRAW_GAS_LIMIT;
              _context6.t4 = new BigNumber(gasPriceWeiLocal);
              _context6.next = 25;
              return _context6.t1.sendTransaction.call(_context6.t1, _context6.t2, _context6.t3, _context6.t4);

            case 25:
              txResponse = _context6.sent;
              return _context6.abrupt("return", waitForTx(txResponse, this.chain.network.TX_TIMEOUT_SEC, CHAIN_TX_TYPES.withdraw));

            case 29:
              _context6.prev = 29;
              _context6.t5 = _context6["catch"](0);
              return _context6.abrupt("return", Promise.reject(_context6.t5));

            case 32:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[0, 29]]);
    }));

    function withdraw(_x12, _x13, _x14) {
      return _withdraw.apply(this, arguments);
    }

    return withdraw;
  }();

  _proto.validateOrder = /*#__PURE__*/function () {
    var _validateOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(order) {
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", this.exchangeContract.validateOrder(order));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function validateOrder(_x15) {
      return _validateOrder.apply(this, arguments);
    }

    return validateOrder;
  }();

  return Exchange;
}();

function getDomainData(chainId) {
  return {
    name: "Orion Exchange",
    version: "1",
    chainId: chainId,
    salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a557"
  };
}

function signCancelOrder(_x, _x2, _x3) {
  return _signCancelOrder.apply(this, arguments);
}

function _signCancelOrder() {
  _signCancelOrder = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cancelOrderRequest, signer, chainId) {
    var data, msgParams, bufferKey;
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!signer.privateKey) {
              _context.next = 7;
              break;
            }

            data = {
              types: {
                EIP712Domain: DOMAIN_TYPE,
                DeleteOrder: CANCEL_ORDER_TYPES_V2.DeleteOrder
              },
              domain: getDomainData(chainId),
              primaryType: 'DeleteOrder',
              message: cancelOrderRequest
            };
            msgParams = {
              data: data
            };
            bufferKey = Buffer.from(signer.privateKey.substr(2), 'hex');
            return _context.abrupt("return", ethSigUtil.signTypedMessage(bufferKey, msgParams, 'V4'));

          case 7:
            throw new Error('privateKey is required!');

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _signCancelOrder.apply(this, arguments);
}

function signOrder(_x4, _x5, _x6) {
  return _signOrder.apply(this, arguments);
}

function _signOrder() {
  _signOrder = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(order, signer, chainId) {
    var data, msgParams, bufferKey;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!signer.privateKey) {
              _context2.next = 7;
              break;
            }

            data = {
              types: {
                EIP712Domain: DOMAIN_TYPE,
                Order: ORDER_TYPES.Order
              },
              domain: getDomainData(chainId),
              primaryType: 'Order',
              message: order
            };
            msgParams = {
              data: data
            };
            bufferKey = Buffer.from(signer.privateKey.substr(2), 'hex');
            return _context2.abrupt("return", ethSigUtil.signTypedMessage(bufferKey, msgParams, 'V4'));

          case 7:
            throw new Error('privateKey is required!');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signOrder.apply(this, arguments);
}

function hashOrder(order) {
  return ethers.ethers.utils.solidityKeccak256(['uint8', 'address', 'address', 'address', 'address', 'address', 'uint64', 'uint64', 'uint64', 'uint64', 'uint64', 'uint8'], ["0x03", order.senderAddress, order.matcherAddress, order.baseAsset, order.quoteAsset, order.matcherFeeAsset, order.amount, order.price, order.matcherFee, order.nonce, order.expiration, order.buySide ? '0x01' : '0x00']);
}

var OrionAggregator = /*#__PURE__*/function () {
  function OrionAggregator(chain) {
    this.chain = chain;
    this.exchange = new Exchange(chain);
  }

  var _proto = OrionAggregator.prototype;

  _proto.init = /*#__PURE__*/function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.warn('OrionAggregator.init() method is currently deprecated and unnecessary');
              return _context.abrupt("return", new Promise(function (resolve) {
                return resolve(true);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init() {
      return _init.apply(this, arguments);
    }

    return init;
  }();

  _proto.getPairsInfo = /*#__PURE__*/function () {
    var _getPairsInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var data, pairConfigs;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return handleResponse(this.chain.api.orionAggregator.get('/pairs/exchangeInfo'));

            case 3:
              data = _context2.sent;
              pairConfigs = {};
              data.forEach(function (item) {
                pairConfigs[item.name] = item;
              });
              return _context2.abrupt("return", pairConfigs);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", Promise.reject(_context2.t0));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 9]]);
    }));

    function getPairsInfo() {
      return _getPairsInfo.apply(this, arguments);
    }

    return getPairsInfo;
  }();

  _proto.checkBalanceForOrder = /*#__PURE__*/function () {
    var _checkBalanceForOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(order, feeAsset, feeAmount) {
      var asset, amount, balance;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              asset = order.side === 'buy' ? order.toCurrency.toUpperCase() : order.fromCurrency.toUpperCase();
              amount = order.side === 'buy' ? order.amount.multipliedBy(order.price) : order.amount;
              _context3.next = 5;
              return this.exchange.getContractBalance();

            case 5:
              balance = _context3.sent;

              if (!(asset === feeAsset)) {
                _context3.next = 11;
                break;
              }

              if (!balance[asset].available.lt(amount.plus(feeAmount))) {
                _context3.next = 9;
                break;
              }

              throw new Error("The available contract balance (" + balance[asset].available + " " + asset + ") is less than the order amount+fee (" + amount.plus(feeAmount) + " " + asset + ")!");

            case 9:
              _context3.next = 15;
              break;

            case 11:
              if (!balance[asset].available.lt(amount)) {
                _context3.next = 13;
                break;
              }

              throw new Error("The available contract balance (" + balance[asset].available + " " + asset + ") is less than the order amount (" + amount + " " + asset + ")!");

            case 13:
              if (!balance[feeAsset].available.lt(feeAmount)) {
                _context3.next = 15;
                break;
              }

              throw new Error("The available contract balance (" + balance[feeAsset].available + " " + feeAsset + ") is less than the order fee amount (" + feeAmount + " " + feeAsset + ")!");

            case 15:
              _context3.next = 20;
              break;

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.reject(_context3.t0));

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 17]]);
    }));

    function checkBalanceForOrder(_x, _x2, _x3) {
      return _checkBalanceForOrder.apply(this, arguments);
    }

    return checkBalanceForOrder;
  }();

  _proto.formatRawOrder = /*#__PURE__*/function () {
    var _formatRawOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(order) {
      var pair, pairs, pairConfig, formattedOrder;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              pair = order.fromCurrency.toUpperCase() + "-" + order.toCurrency.toUpperCase();
              _context4.next = 3;
              return this.getPairsInfo();

            case 3:
              pairs = _context4.sent;
              pairConfig = pairs[pair];

              if (pairConfig) {
                _context4.next = 7;
                break;
              }

              throw new Error("No such pair " + pair);

            case 7:
              if (!(order.priceDeviation && (new BigNumber(PRICE_DEVIATIONS.MIN).gt(order.priceDeviation) || new BigNumber(PRICE_DEVIATIONS.MAX).lt(order.priceDeviation)))) {
                _context4.next = 9;
                break;
              }

              throw new Error("priceDeviation value should between " + PRICE_DEVIATIONS.MIN + " and " + PRICE_DEVIATIONS.MAX);

            case 9:
              formattedOrder = Object.assign(order, {
                numberFormat: pairConfig,
                price: new BigNumber(order.price),
                amount: new BigNumber(order.amount),
                priceDeviation: new BigNumber(order.priceDeviation !== undefined ? order.priceDeviation : 0),
                needWithdraw: order.needWithdraw || false // set to false by default, because this feature isn't ready

              });
              return _context4.abrupt("return", formattedOrder);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function formatRawOrder(_x4) {
      return _formatRawOrder.apply(this, arguments);
    }

    return formatRawOrder;
  }();

  _proto.createOrder = /*#__PURE__*/function () {
    var _createOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(orderParams) {
      var params, baseAsset, quoteAsset, matcherFeeAsset, nonce, gasPriceWei, blockchainPrices, _blockchainPrices, totalFee, priceWithDeviation, amountRounded, priceRounded, order;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this.formatRawOrder(orderParams);

            case 3:
              params = _context5.sent;
              baseAsset = this.chain.getTokenAddress(params.fromCurrency);
              quoteAsset = this.chain.getTokenAddress(params.toCurrency);
              matcherFeeAsset = this.chain.getTokenAddress(params.feeCurrency);
              nonce = Date.now();

              if (['buy', 'sell'].includes(params.side)) {
                _context5.next = 10;
                break;
              }

              throw new Error('Invalid side, should be buy | sell');

            case 10:
              if (params.price.gt(0)) {
                _context5.next = 12;
                break;
              }

              throw new Error('Invalid price');

            case 12:
              if (params.amount.gt(0)) {
                _context5.next = 14;
                break;
              }

              throw new Error('Invalid amount');

            case 14:
              if (params.priceDeviation.gte(0)) {
                _context5.next = 16;
                break;
              }

              throw new Error('Invalid priceDeviation');

            case 16:
              if (this.chain.tokensFee[params.feeCurrency]) {
                _context5.next = 18;
                break;
              }

              throw new Error("Invalid feeCurrency, should be one of " + Object.keys(this.chain.tokensFee));

            case 18:
              if (!(params.numberFormat.qtyPrecision === undefined || params.numberFormat.qtyPrecision === null)) {
                _context5.next = 20;
                break;
              }

              throw new Error('Invalid qtyPrecision');

            case 20:
              if (!(params.numberFormat.pricePrecision === undefined || params.numberFormat.pricePrecision === null)) {
                _context5.next = 22;
                break;
              }

              throw new Error('Invalid pricePrecision');

            case 22:
              if (!params.chainPrices) {
                _context5.next = 33;
                break;
              }

              gasPriceWei = params.chainPrices.gasWei;
              blockchainPrices = (_blockchainPrices = {}, _blockchainPrices[this.chain.blockchainInfo.baseCurrencyName] = new BigNumber(params.chainPrices.networkAsset), _blockchainPrices[params.fromCurrency] = new BigNumber(params.chainPrices.baseAsset), _blockchainPrices[params.feeCurrency] = new BigNumber(params.chainPrices.feeAsset), _blockchainPrices);

              if (blockchainPrices[this.chain.blockchainInfo.baseCurrencyName].gt(0)) {
                _context5.next = 27;
                break;
              }

              throw new Error('Invalid chainPrices networkAsset');

            case 27:
              if (blockchainPrices[params.fromCurrency].gt(0)) {
                _context5.next = 29;
                break;
              }

              throw new Error('Invalid chainPrices baseAsset');

            case 29:
              if (blockchainPrices[params.feeCurrency].gt(0)) {
                _context5.next = 31;
                break;
              }

              throw new Error('Invalid chainPrices feeAsset');

            case 31:
              _context5.next = 39;
              break;

            case 33:
              _context5.next = 35;
              return this.chain.getGasPrice();

            case 35:
              gasPriceWei = _context5.sent;
              _context5.next = 38;
              return this.chain.getBlockchainPrices();

            case 38:
              blockchainPrices = _context5.sent;

            case 39:
              totalFee = getFee({
                baseAsset: params.fromCurrency,
                amount: params.amount,
                feePercent: this.chain.tokensFee[params.feeCurrency],
                assetsPrices: blockchainPrices,
                networkAsset: this.chain.blockchainInfo.baseCurrencyName,
                gasPriceWei: gasPriceWei,
                needWithdraw: params.needWithdraw,
                isPool: false,
                feeAsset: params.feeCurrency,
                limits: this.chain.baseLimits
              });
              priceWithDeviation = params.priceDeviation.isZero() ? params.price : getPriceWithDeviation(params.price, params.side, params.priceDeviation);
              amountRounded = params.amount.decimalPlaces(params.numberFormat.qtyPrecision, BigNumber.ROUND_DOWN);
              priceRounded = priceWithDeviation.decimalPlaces(params.numberFormat.pricePrecision, params.side === 'buy' ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN);

              if (!totalFee.isZero()) {
                _context5.next = 45;
                break;
              }

              throw new Error('Zero fee');

            case 45:
              _context5.next = 47;
              return this.checkBalanceForOrder(params, params.feeCurrency, totalFee);

            case 47:
              order = {
                id: '',
                senderAddress: this.chain.signer.address,
                matcherAddress: this.chain.blockchainInfo.matcherAddress,
                baseAsset: baseAsset,
                quoteAsset: quoteAsset,
                matcherFeeAsset: matcherFeeAsset,
                amount: numberTo8(amountRounded),
                price: numberTo8(priceRounded),
                matcherFee: numberTo8(totalFee),
                nonce: nonce,
                expiration: nonce + DEFAULT_EXPIRATION,
                buySide: params.side === 'buy' ? 1 : 0,
                isPersonalSign: false,
                signature: '',
                needWithdraw: params.needWithdraw
              };
              order.id = hashOrder(order);
              _context5.next = 51;
              return signOrder(order, this.chain.signer, this.chain.network.CHAIN_ID);

            case 51:
              order.signature = _context5.sent;
              _context5.next = 54;
              return this.exchange.validateOrder(order);

            case 54:
              if (_context5.sent) {
                _context5.next = 56;
                break;
              }

              throw new Error('Order validation failed');

            case 56:
              return _context5.abrupt("return", order);

            case 59:
              _context5.prev = 59;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", Promise.reject(_context5.t0));

            case 62:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 59]]);
    }));

    function createOrder(_x5) {
      return _createOrder.apply(this, arguments);
    }

    return createOrder;
  }();

  _proto.sendOrder = /*#__PURE__*/function () {
    var _sendOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(order, isCreateInternalOrder) {
      var internalRoute;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (isCreateInternalOrder === void 0) {
                isCreateInternalOrder = false;
              }

              internalRoute = '/order/internal';
              return _context6.abrupt("return", handleResponse(this.chain.api.orionAggregator.post(isCreateInternalOrder ? internalRoute : '/order', order)));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function sendOrder(_x6, _x7) {
      return _sendOrder.apply(this, arguments);
    }

    return sendOrder;
  }();

  _proto.cancelOrder = /*#__PURE__*/function () {
    var _cancelOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(orderId) {
      var order, cancelationSubject;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return this.getOrderById(orderId);

            case 3:
              order = _context7.sent;
              cancelationSubject = this.getCancelationSubject(order);
              _context7.next = 7;
              return signCancelOrder(cancelationSubject, this.chain.signer, this.chain.network.CHAIN_ID);

            case 7:
              cancelationSubject.signature = _context7.sent;
              return _context7.abrupt("return", handleResponse(this.chain.api.orionAggregator["delete"]('/order', {
                data: cancelationSubject
              })));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", Promise.reject(_context7.t0));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 11]]);
    }));

    function cancelOrder(_x8) {
      return _cancelOrder.apply(this, arguments);
    }

    return cancelOrder;
  }();

  _proto.getCancelationSubject = function getCancelationSubject(order) {
    var id = order.id,
        blockchainOrder = order.blockchainOrder;
    return {
      id: id,
      sender: blockchainOrder.senderAddress,
      signature: '',
      isPersonalSign: blockchainOrder.isPersonalSign
    };
  };

  _proto.getTradeHistory = /*#__PURE__*/function () {
    var _getTradeHistory = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(options) {
      var url, params, data;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              url = '/order/history';
              params = _extends({
                address: this.chain.signer.address
              }, options);
              _context8.next = 4;
              return handleResponse(this.chain.api.orionAggregator.get(url, {
                params: params
              }));

            case 4:
              data = _context8.sent;
              return _context8.abrupt("return", Array.isArray(data) && data.length ? data.map(parseTradeOrderV2) : []);

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getTradeHistory(_x9) {
      return _getTradeHistory.apply(this, arguments);
    }

    return getTradeHistory;
  }();

  _proto.getOrderById = /*#__PURE__*/function () {
    var _getOrderById = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(orderId, owner) {
      var path, _yield$handleResponse, order;

      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (owner === void 0) {
                owner = this.chain.signer.address;
              }

              path = "/order?orderId=" + orderId + "&owner=" + owner;
              _context9.next = 4;
              return handleResponse(this.chain.api.orionAggregator.get(path));

            case 4:
              _yield$handleResponse = _context9.sent;
              order = _yield$handleResponse.order;
              return _context9.abrupt("return", parseTradeOrderV2(order));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getOrderById(_x10, _x11) {
      return _getOrderById.apply(this, arguments);
    }

    return getOrderById;
  }();

  _proto.getApiVersion = /*#__PURE__*/function () {
    var _getApiVersion = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10() {
      var version, _yield$handleResponse2, apiVersion;

      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              version = 1;
              _context10.prev = 1;
              _context10.next = 4;
              return handleResponse(this.chain.api.orionAggregator.get('/version'));

            case 4:
              _yield$handleResponse2 = _context10.sent;
              apiVersion = _yield$handleResponse2.apiVersion;
              version = Number(apiVersion);
              _context10.next = 12;
              break;

            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](1);
              version = 1;

            case 12:
              return _context10.abrupt("return", version);

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this, [[1, 9]]);
    }));

    function getApiVersion() {
      return _getApiVersion.apply(this, arguments);
    }

    return getApiVersion;
  }();

  return OrionAggregator;
}();

var SubscriptionType = {
  ASSET_PAIRS_CONFIG_UPDATES_SUBSCRIBE: 'apcus',
  AGGREGATED_ORDER_BOOK_UPDATES_SUBSCRIBE: 'aobus',
  ADDRESS_UPDATES_SUBSCRIBE: 'aus'
};

var WsEmitter = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(WsEmitter, _EventEmitter);

  function WsEmitter(socket) {
    var _this;

    _this = _EventEmitter.call(this) || this;
    _this.socket = socket;
    return _this;
  }

  var _proto = WsEmitter.prototype;

  _proto.close = function close() {
    this.socket.close();
  };

  return WsEmitter;
}(EventEmitter);

var WS = /*#__PURE__*/function () {
  function WS(url) {
    if (url === void 0) {
      url = ORION_WS.MAIN.BSC;
    }

    this.wsOrionUrl = url;
  }

  var _proto2 = WS.prototype;

  _proto2.init = /*#__PURE__*/function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.warn('WS.init() method is currently deprecated and unnecessary');
              return _context.abrupt("return", new Promise(function (resolve) {
                return resolve(true);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init() {
      return _init.apply(this, arguments);
    }

    return init;
  }();

  _proto2.connect = function connect(url, middleware, query) {
    var socket = new ReconnectingWebSocket(url, [], {
      WebSocket: Websocket
    });
    var localEmitter = new WsEmitter(socket);

    socket.onerror = function (error) {
      throw new Error("WS connection error: " + error.message + "!");
    };

    socket.onmessage = function (message) {
      if (!message.data) return;
      var handledMessage = JSON.parse(message.data); // Ping-pong handling

      if (handledMessage && handledMessage.T === 'pp') {
        socket.send(JSON.stringify(handledMessage));
        return;
      }

      if (query && handledMessage.T && query.T !== handledMessage.T + "s") return;
      if (middleware) handledMessage = middleware(handledMessage);
      localEmitter.emit('message', handledMessage);
    };

    if (query) socket.send(JSON.stringify(query));
    return localEmitter;
  };

  _proto2.priceFeedAll = function priceFeedAll() {
    var url = this.wsOrionUrl + "/ws2/allTickers";
    return this.connect(url, parsePairs);
  };

  _proto2.priceFeedTicker = function priceFeedTicker(symbol) {
    var url = this.wsOrionUrl + "/ws2/ticker/" + symbol;
    return this.connect(url, parsePairs);
  };

  _proto2.orderBooks = function orderBooks(pair) {
    return this.orderBooksV2(pair);
  };

  _proto2.orderBooksV2 = function orderBooksV2(pair) {
    var url = this.wsOrionUrl + "/v1";
    return this.connect(url, parseOrderbookItemsV2, {
      S: pair,
      T: SubscriptionType.AGGREGATED_ORDER_BOOK_UPDATES_SUBSCRIBE
    });
  };

  return WS;
}();

var DEFAULT_NUMBER_FORMAT = {
  "name": "ETH-BTC",
  "minQty": 0,
  "maxQty": Number.MAX_VALUE,
  "minPrice": 0,
  "maxPrice": Number.MAX_VALUE,
  "pricePrecision": 8,
  "qtyPrecision": 8,
  "baseAssetPrecision": 8,
  "quoteAssetPrecision": 8,
  "limitOrderThreshold": 0.001,
  "executableOnBrokersPriceDeviation": 0.001
};
var Side;

(function (Side) {
  Side["BUY"] = "buy";
  Side["SELL"] = "sell";
})(Side || (Side = {}));

var Models = {
  __proto__: null,
  DEFAULT_NUMBER_FORMAT: DEFAULT_NUMBER_FORMAT,
  get Side () { return Side; }
};

exports.Chain = Chain;
exports.Constants = Constants;
exports.Exchange = Exchange;
exports.Helpers = Helpers;
exports.Models = Models;
exports.OrionAggregator = OrionAggregator;
exports.Tokens = Tokens$1;
exports.WS = WS;
//# sourceMappingURL=orion-trading-sdk.cjs.development.js.map
