// Generated by CoffeeScript 1.6.2
var EasyWebWorker, WorkerSideController;

EasyWebWorker = (function() {
  function EasyWebWorker(fileUrl, self) {
    var _this = this;

    this.self = self;
    this.worker = new Worker(fileUrl);
    this.worker.onmessage = function() {
      return _this.listen.apply(_this, arguments);
    };
  }

  EasyWebWorker.prototype.execute = function() {
    var arg, args;

    args = (function() {
      var _i, _len, _results;

      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        arg = arguments[_i];
        _results.push(arg);
      }
      return _results;
    }).apply(this, arguments);
    return this.worker.postMessage(args);
  };

  EasyWebWorker.prototype.listen = function(event) {
    var args, context, deep, func, funcName, nestedFunc, order, _i, _len;

    args = event.data;
    funcName = args[0];
    args = args.slice(1);
    args.unshift(event);
    if (funcName.indexOf(".") === -1) {
      return this.self[funcName].apply(this.self, args);
    } else {
      nestedFunc = funcName.split(".");
      funcName = this.self;
      deep = nestedFunc.length;
      context = "";
      for (order = _i = 0, _len = nestedFunc.length; _i < _len; order = ++_i) {
        func = nestedFunc[order];
        funcName = funcName[func];
        if (order === deep - 2) {
          context = funcName;
        }
      }
      return funcName.apply(context, args);
    }
  };

  return EasyWebWorker;

})();

WorkerSideController = (function() {
  function WorkerSideController(self) {
    var _this = this;

    this.self = self;
    this.self.onmessage = function() {
      return _this.listen.apply(_this, arguments);
    };
  }

  WorkerSideController.prototype.execute = function() {
    var arg, args;

    args = (function() {
      var _i, _len, _results;

      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        arg = arguments[_i];
        _results.push(arg);
      }
      return _results;
    }).apply(this, arguments);
    return this.self.postMessage(args);
  };

  WorkerSideController.prototype.listen = function(event) {
    var args, funcName;

    args = event.data;
    funcName = args[0];
    args = args.slice(1);
    args.unshift(event);
    return this.self[funcName].apply(this.self, args);
  };

  return WorkerSideController;

})();

if (this.document === void 0) {
  this.caller = new WorkerSideController(this);
  this.execute = this.caller.execute;
}

/*
//@ sourceMappingURL=easy-web-worker.map
*/
