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
})({"app.js":[function(require,module,exports) {
var endpoint = "https://kirchris.herokuapp.com/beertypes";
var endpoint2 = "https://frontend-8e4d.restdb.io/rest/pictures";
var endpoint3 = "https://frontend-8e4d.restdb.io/home/media";
var apiKey = "5e9961cb436377171a0c24cc";
var URL = "https://kirchris.herokuapp.com/";
var URL2 = "https://kirchris.herokuapp.com/order";
var time;
var allBeers = [];
var deletedBeers = [];
var Data = {
  name: "",
  amount: 0,
  selected: false
};
window.addEventListener("DOMContentLoaded", start); // window.addEventListener("load", (e) => {
//   document.querySelector("button").addEventListener("click", () => {
//     const Beer = {
//       name: beer.name,
//       amount: 1,
//     };
//     orders(Beer);
//   });
// });

function start() {
  document.querySelector(".basket_button").addEventListener("click", showBasket);
  document.querySelector(".order_button").addEventListener("click", post);
  document.querySelector("#addpic").addEventListener("click", function () {
    document.getElementById("picture").value = picture.value.substring(12);
    var pictureData = {
      picture: picture.value
    };
    postPicture(pictureData);
  });
  get();
}

function orders(beer) {
  // 1
  // find ud af om øllen findes i array'et
  var elementsIndex = allBeers.findIndex(function (element) {
    return element.name == beer.name;
  });
  console.log(elementsIndex);

  if (elementsIndex === -1) {
    // øllen findes ikke
    allBeers.push({
      name: beer.name,
      amount: 1
    });
  } else {
    allBeers[elementsIndex].amount += 1;
  }

  console.log(allBeers); // console.log("orders");
  // let data = Object.create(Data);
  // data.selected = true;
  // if (data.selected === true) {
  //   beer.amount = +1;
  // } else {
  //   beer.name = beer.name;
  //   beer.amount = 1;
  // }
  // if (allBeers.filter((allBeers) => allBeers.name === "El Hefe")) {
  //   console.log();
  // }
  // const elementsIndex = this.state.allBeers.findIndex((element) => element.name == name);
  // let newArray = [...this.state.allBeers];
  // const hefe = allBeers.filter((allBeers) => allBeers.name === "El Hefe");
  // console.log(elementsIndex);
  // allBeers.filter(allBeers => allBeers.name === "El Hefe")
  // const clicked = allBeers.filter((beer) => {
  //   return beer.amount === 1;
  // });
  // const clickedName = clicked.some((amount) => {
  //   return amount.name === clickedBeer.name;
  // });
  // if (clickedBeer.amount === 1) {
  //   clickedBeer.amount = +1;
  // } else if (clickedName) {
  //   clickedBeer.amount = +1;
  // } else {
  //   const beer = {
  //     name: clickedBeer.name,
  //     amount: 1,
  //   };
  // }
  // allBeers.push(data);
}

function get() {
  document.querySelector("main").innerHTML = "";
  fetch(endpoint, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charrset=utf-8"
    }
  }).then(function (e) {
    return e.json();
  }).then(showHeroes); //do stuff with the data
}

get();

function showHeroes(data) {
  data.forEach(showHero);
}

function showTheBasket(data2) {
  data2.forEach(showBasket);
}

function showHero(beer) {
  console.log(beer);
  var template = document.querySelector(".template_one").content;
  var copy = template.cloneNode(true);
  var parent = document.querySelector("main");
  copy.querySelector("article").dataset.id = beer._id;
  copy.querySelector("h1").textContent = beer.name;
  copy.querySelector("p").textContent = beer.category;
  copy.querySelector(".aroma").textContent = "Aroma: " + beer.description.aroma;
  copy.querySelector(".appearance").textContent = "Appearance: " + beer.description.appearance;
  copy.querySelector(".overall").textContent = "Overall Impression:" + beer.description.overallImpression;
  copy.querySelector(".alc").textContent = "Alchohol: " + beer.alc;
  copy.querySelector(".pour").textContent = "Puringspeed: " + beer.pouringSpeed;
  copy.querySelector("button").addEventListener("click", function (event) {
    orders(beer);
  });
  var ul = copy.querySelector("ul");
  parent.appendChild(copy);
}

function showBasket(beer) {
  var dest = document.querySelector("#liste");
  var temp = document.querySelector(".template_two");
  dest.textContent = "";
  allBeers.forEach(function (order) {
    var klon = temp.cloneNode(true).content;
    klon.querySelector(".beername").textContent = order.name;
    klon.querySelector(".amount").textContent = order.amount;
    klon.querySelector(".remove").addEventListener("click", function () {
      console.log("going to remove");
      removeBeer(order);
    }); // klon.querySelector(".tobasket").addEventListener("click", () => {
    //   console.log("wanna add one more");
    //   addBeer(order);
    // });

    document.querySelector(".order_button").addEventListener("click", function () {
      console.log("wanna pay and see ID");
      time = setTimeout(fetchData, 10);
    });
    dest.appendChild(klon);
  });
}

function removeBeer(order) {
  console.log("removing beer"); // order.deleted = true;

  deletedBeers.push(order);
  var deleteOrder = allBeers.indexOf(order);
  allBeers.splice(deleteOrder, 1);
  showBasket(allBeers);
}

function addBeer(order) {
  console.log("removing beer");
  deletedBeers.push(order);
  var deleteOrder = allBeers.indexOf(order);
  allBeers.push(order);
  showBasket(allBeers);
}

function post() {
  var Data = allBeers;
  var postData = JSON.stringify(Data);
  fetch("https://kirchris.herokuapp.com/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: postData
  }).then(function (res) {
    return res.json();
  }).then(function (Data) {
    return console.log(Data);
  });
}

function fetchData() {
  fetch(URL).then(function (res) {
    return res.json();
  }).then(showId);
}

function fetchOrders() {
  fetch(URL2).then(function (res) {
    return res.json();
  }).then(showOrders);
}

function showId(data) {
  var people = data.queue;
  var last = people[people.length - 1];
  var uno = people[0];
  document.querySelector(".showit").textContent = "Dit ordre nummer er: " + last.id;
  document.querySelector(".infront").textContent = "Der er " + people.length + " personer foran dig";
}

function showOrders() {
  var order = order;
  console.log(order);
} // function post(data) {
//   showHero(data);
//   const postData = JSON.stringify(data);
//   fetch(endpoint, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       "x-apikey": apiKey,
//       "cache-control": "no-cache",
//     },
//     body: postData,
//   })
//     .then((res) => res.json())
//     .then((data) => {});
// }
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60080" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map