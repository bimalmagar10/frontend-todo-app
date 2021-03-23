// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/index.js":[function(require,module,exports) {
//Datacontroller
var dataController = function () {
  var Todos = function Todos(id, title, completed, active) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.active = active;
  };

  var datas = {
    todos: [],
    count: 0
  };
  return {
    createTodo: function createTodo(title) {
      var ID, newItem;

      if (datas.todos.length !== 0) {
        ID = datas.todos[datas.todos.length - 1].id + 1;
      } else {
        ID = 0;
      } //Creates a new Todo


      newItem = new Todos(ID, title, false, true); //adds the todo to datas

      datas.todos.push(newItem);
      console.log(newItem);
      return newItem;
    },
    filterActive: function filterActive() {
      var activeDatas;
      activeDatas = datas.todos.filter(function (el) {
        return el.active === true;
      });
      return activeDatas;
    },
    filterCompleted: function filterCompleted() {
      var completedDatas;
      completedDatas = datas.todos.filter(function (el) {
        return el.completed === true;
      });
      return completedDatas;
    },
    allTodos: function allTodos() {
      return datas.todos;
    },
    addCompletedItems: function addCompletedItems(id, check) {
      var dataId = parseInt(id);
      datas.todos.map(function (el) {
        if (check === true) {
          if (el.id === dataId) {
            el.completed = true;
            el.active = false;
          }
        } else if (check === false) {
          if (el.id === dataId) {
            el.completed = false;
            el.active = true;
          }
        }
      });
      console.log(datas.todos);
      return datas.todos;
    },
    updateCount: function updateCount() {
      var newCount;
      newCount = datas.todos.filter(function (el) {
        return el.active === true;
      });
      datas.count = newCount.length;
      return newCount.length;
    },
    deleteTodo: function deleteTodo(id) {
      var ids, index;
      ids = datas.todos.map(function (el) {
        return el.id;
      });
      index = ids.indexOf(parseInt(id));

      if (index !== -1) {
        datas.todos.splice(index, 1);
      }
    },
    clearCompleted: function clearCompleted(data) {
      var completedDatas, indexes, allDatas;
      allDatas = datas.todos.map(function (el) {
        return el.id;
      });
      completedDatas = data.map(function (el) {
        return el.id;
      });
      indexes = completedDatas.map(function (el) {
        return allDatas.indexOf(el);
      });

      for (var i = 0; i < indexes.length; i++) {
        datas.todos.splice(indexes[i], 1);
        indexes = indexes.map(function (el) {
          return el - 1;
        });
      }
    }
  };
}(); //UIController


var UIController = function () {
  var DOMstrings = {
    todoInput: '.todo-app__input',
    listItem: '.todo-app__lists--item',
    parentList: '.todo-app__lists',
    todoState: '.todo-app__state',
    activeState: '.todo-app__state-active',
    completedState: '.todo-app__state-completed',
    jsCheckbox: '.js--checkbox',
    itemsLeft: '.todo-app__items-left',
    deleteBtn: '.todo-app__lists--delete',
    deleteBtnImg: 'todo-app__delete-img',
    clearCompleted: '.todo-app__clear-completed',
    themeBtn: '.todo-app__header--logo',
    body: 'body',
    appTop: '.todo-app__top',
    msg: '.todo-app__lists--msg'
  };
  return {
    getDOMStrings: function getDOMStrings() {
      return DOMstrings;
    },
    getInput: function getInput() {
      return {
        title: document.querySelector(DOMstrings.todoInput).value
      };
    },
    addLists: function addLists(title, id, status) {
      var parentNode = document.querySelector(DOMstrings.parentList);
      parentNode.insertAdjacentHTML("beforeend", "\n     \t\t<li class=\"todo-app__lists--item\"  id=\"list-".concat(id, "\">\n\t            <input type=\"checkbox\" name=\"\" id=\"work-").concat(id, "\" class=\"todo-app__checkbox js--checkbox\" data-id=\"").concat(id, "\" ").concat(status, ">\n\t            <label for=\"work-").concat(id, "\" class=\"todo-app__checkbox-label\"></label>\n\t            <span class=\"todo-app__lists--name\" id=\"").concat(id, "\">").concat(title, "</span>            \n\t            <button class=\"todo-app__lists--delete\">\n\t              <img src=\"/icon-cross.861255e5.svg\" alt=\"Delete Work\" class=\"todo-app__delete-img\">\n\t            </button>\n            </li>\n     \t\t"));
    },
    removeTodos: function removeTodos() {
      var parentNode = document.querySelector(DOMstrings.parentList);
      parentNode.innerHTML = '';
    },
    clearInput: function clearInput() {
      document.querySelector(DOMstrings.todoInput).value = "";
    },
    updateCounter: function updateCounter(count) {
      if (count == 0) {
        document.querySelector(DOMstrings.itemsLeft).innerHTML = "No items left";
      } else {
        document.querySelector(DOMstrings.itemsLeft).innerHTML = "".concat(count, " items left");
      }

      console.log("execute vachha");
    },
    deleteLists: function deleteLists(selectorId) {
      var el = document.querySelector("#list-".concat(selectorId));
      el.parentNode.removeChild(el);
    },
    clearCompletedLists: function clearCompletedLists(ids) {
      var listIds, element;
      listIds = ids;
      listIds.forEach(function (el) {
        element = document.querySelector("#list-".concat(el));
        element.parentNode.removeChild(element);
      });
    },
    defaultCount: function defaultCount() {
      document.querySelector(DOMstrings.itemsLeft).innerHTML = "No items left";
    },
    updateThemeLogo: function updateThemeLogo() {
      // return {
      // 	body:document.querySelector(DOMstrings.body),
      // 	toggleBtn:document.querySelector(DOMstrings.themeBtn)
      // };
      var theme = "light";
      document.querySelector(DOMstrings.body).classList.toggle("dark-theme");

      if (document.querySelector(DOMstrings.themeBtn).getAttribute("src") == '/icon-moon.4401c989.svg') {
        document.querySelector(DOMstrings.themeBtn).src = "/icon-sun.e8063967.svg";
      } else {
        document.querySelector(DOMstrings.themeBtn).src = "/icon-moon.4401c989.svg";
      }

      if (document.querySelector(DOMstrings.body).classList.contains("dark-theme")) {
        theme = "dark";
      }

      localStorage.setItem("theme", theme);
      return theme;
    },
    themeStatus: function themeStatus() {
      var currentTheme = localStorage.getItem("theme");

      if (currentTheme === "dark") {
        document.querySelector(DOMstrings.body).classList.add("dark-theme");
      }
    },
    noTodosMessage: function noTodosMessage(status) {
      document.querySelector(DOMstrings.parentList).insertAdjacentHTML("beforeend", "\n\t\t\t    <li class=\"todo-app__lists--msg\">\n\t              <p>No ".concat(status, " todos left</p>\n                </li>\n \t\t\t"));
    },
    removeAlert: function removeAlert() {
      var el = document.querySelector(DOMstrings.msg);
      el.parentNode.removeChild(el);
      return el;
    },
    returnAlert: function returnAlert() {
      return document.querySelector(DOMstrings.msg);
    }
  };
}(); //AppController


var appController = function (dataCtrl, UICtrl) {
  var setupEventlisteners = function setupEventlisteners() {
    document.querySelector(UICtrl.getDOMStrings().todoInput).addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        addTodos();
      }
    }); //To display the todos when button is clicked

    Array.from(document.querySelector(UICtrl.getDOMStrings().todoState).childNodes).forEach(function (el) {
      el.addEventListener("click", displayDynamicTodos);
    });
    document.querySelector(UICtrl.getDOMStrings().parentList).addEventListener('change', updateCompleted);
    document.querySelector(UICtrl.getDOMStrings().parentList).addEventListener('click', deleteTodos);
    document.querySelector(UICtrl.getDOMStrings().clearCompleted).addEventListener('click', clearCompletedItems);
    document.querySelector(UICtrl.getDOMStrings().themeBtn).addEventListener('click', toggleTheme);
  };

  var toggleTheme = function toggleTheme() {
    // let elements = UICtrl.selectElements();
    // elements.body.classList.toggle("dark-theme");
    UICtrl.updateThemeLogo();
  };

  var clearCompletedItems = function clearCompletedItems() {
    //delete from the datacontroller
    var completedTodos, completedIds;
    completedTodos = dataCtrl.filterCompleted();
    dataCtrl.clearCompleted(completedTodos); //delete from the UI

    completedIds = completedTodos.map(function (el) {
      return el.id;
    });
    console.log(completedIds);
    UICtrl.clearCompletedLists(completedIds);
  }; //Updates the completed todos


  var updateCompleted = function updateCompleted(e) {
    e.preventDefault();

    if (e.target.classList[1] === UICtrl.getDOMStrings().jsCheckbox.slice(1)) {
      var newCompletes, newCount;

      if (e.target.checked === true) {
        newCompletes = dataCtrl.addCompletedItems(e.target.dataset.id, true);
        newCount = dataCtrl.updateCount();
        UICtrl.updateCounter(newCount);
      } else {
        newCompletes = dataCtrl.addCompletedItems(e.target.dataset.id, false);
        newCount = dataCtrl.updateCount();
        UICtrl.updateCounter(newCount);
      }
    }
  }; //Add todos to data and ui


  var addTodos = function addTodos() {
    var newTodos, newCount;
    var getTitle = UICtrl.getInput();

    if (UICtrl.returnAlert()) {
      UICtrl.removeAlert();
    } //add data to the datacontroller


    newTodos = dataCtrl.createTodo(getTitle.title); //add todos to the ui

    UICtrl.addLists(newTodos.title, newTodos.id); //clear the input field

    UICtrl.clearInput(); //Stores no.of todos left

    newCount = dataCtrl.updateCount(); //Add items left in the UI

    UICtrl.updateCounter(newCount);
  }; //Display active todos


  var displayDynamicTodos = function displayDynamicTodos(e) {
    e.preventDefault();
    var stateElements, activeElements, state, completedElements;
    state = Array.from(e.target.classList[0]).join("");
    stateElements = Array.from(e.target.parentElement.children);
    stateElements.map(function (el) {
      return el.classList.remove("current");
    });
    e.target.classList.add("current"); //Removes all todos

    UICtrl.removeTodos();
    console.log(state);

    if (state === "todo-app__state-active") {
      //Adds the active datas to the lists
      activeElements = dataCtrl.filterActive();

      if (activeElements.length !== 0) {
        if (UICtrl.returnAlert()) {
          UICtrl.removeAlert();
        }

        activeElements.forEach(function (el) {
          return UICtrl.addLists(el.title, el.id);
        });
      } else {
        UICtrl.noTodosMessage("active");
      }
    } else if (state === "todo-app__state-completed") {
      completedElements = dataCtrl.filterCompleted();

      if (completedElements.length !== 0) {
        if (UICtrl.returnAlert()) {
          UICtrl.removeAlert();
        }

        completedElements.forEach(function (el) {
          return UICtrl.addLists(el.title, el.id, "checked");
        });
      } else {
        UICtrl.noTodosMessage("completed");
      }
    } else if (state === "todo-app__state-all") {
      if (dataCtrl.allTodos().length !== 0) {
        if (UICtrl.returnAlert()) {
          UICtrl.removeAlert();
        }

        dataCtrl.allTodos().forEach(function (el) {
          if (el.completed === false) {
            UICtrl.addLists(el.title, el.id);
          } else if (el.completed === true) {
            UICtrl.addLists(el.title, el.id, "checked");
          }
        });
      } else {
        UICtrl.noTodosMessage("any");
      }
    }
  }; //Delete todos


  var deleteTodos = function deleteTodos(e) {
    if (e.target.classList.contains(UICtrl.getDOMStrings().deleteBtnImg)) {
      //console.log(e.target.closest(UICtrl.getDOMStrings().listItem));
      var deletingEl;
      deletingEl = e.target.closest(UICtrl.getDOMStrings().listItem).id.split("-")[1];
      console.log(deletingEl);
      dataCtrl.deleteTodo(deletingEl); //deleting from the UI

      UICtrl.deleteLists(deletingEl);

      if (dataCtrl.allTodos().length === 0) {
        UICtrl.noTodosMessage("any");
      }
    }
  };

  return {
    init: function init() {
      UICtrl.defaultCount();
      UICtrl.themeStatus();
      UICtrl.noTodosMessage("any");
      setupEventlisteners();
    }
  };
}(dataController, UIController);

appController.init();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56602" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map