      ! function (n) {
        var o = {};

        function r(e) {
          if (o[e]) return o[e].exports;
          var t = o[e] = {
            i: e,
            l: !1,
            exports: {}
          };
          return n[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
        }
        r.m = n, r.c = o, r.d = function (e, t, n) {
          r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
          })
        }, r.r = function (e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          })
        }, r.t = function (t, e) {
          if (1 & e && (t = r(t)), 8 & e) return t;
          if (4 & e && "object" == typeof t && t && t.__esModule) return t;
          var n = Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", {
              enumerable: !0,
              value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) r.d(n, o, function (e) {
              return t[e]
            }.bind(null, o));
          return n
        }, r.n = function (e) {
          var t = e && e.__esModule ? function () {
            return e.default
          } : function () {
            return e
          };
          return r.d(t, "a", t), t
        }, r.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 0)
      }([function (e, t, n) {
        n(1), e.exports = n(2)
      }, function (e, t, n) {
        var m, o, r, i;
        ! function (g) {
          sessionStorage || (g.sessionStorage = {}), localStorage || (g.localStorage = {}), g.webfunnyRequests || (g.webfunnyRequests = []);
          var l = g.localStorage,
            m = l.WF_CONFIG ? JSON.parse(l.WF_CONFIG) : {
              s: !0,
              ia: [""],
              wc: 40,
              pv: {
                s: !0,
                ia: [""]
              },
              je: {
                s: !0,
                ia: [""]
              },
              hl: {
                s: !0,
                ia: [""],
                uh: !1,
                rl: 500,
                sl: 500
              },
              rl: {
                s: !0,
                ia: [""]
              },
              bl: {
                s: !0
              }
            },
            d = g.location.href.split("?")[0],
            p = performance && performance.timing,
            v = performance && "function" == typeof performance.getEntries ? performance.getEntries() : null,
            i = sessionStorage.CUSTOMER_WEB_MONITOR_ID || "webfunny86916",
            t = "2.6.1",
            e = -1 === g.location.href.indexOf("https") ? "http://" : "https://",
            o = (g.location.href, ""),
            w = "/server/upLog",
            b = "/server/upDLog",
            S = (e = e + "localhost:8011") + w,
            r = e + b,
            y = "CUSTOMER_PV",
            n = "STAY_TIME",
            s = "CUS_LEAVE",
            x = "LOAD_PAGE",
            O = "HTTP_LOG",
            a = "JS_ERROR",
            c = "SCREEN_SHOT",
            E = "ELE_BEHAVIOR",
            T = "RESOURCE_LOAD",
            u = "CUSTOMIZE_BEHAVIOR",
            h = "VIDEOS_EVENT",
            _ = "LAST_BROWSE_DATE",
            I = "WM_PAGE_ENTRY_TIME",
            C = "WM_VISIT_PAGE_COUNT",
            k = new function () {
              this.checkIgnore = function (e, t) {
                for (var n = t.replace(/ /g, ""), o = m[e].ia || [], r = !0, i = 0; i < o.length; i++) {
                  var s = o[i].replace(/ /g, "");
                  if (s && -1 != n.indexOf(s)) {
                    r = !1;
                    break
                  }
                }
                return r
              }, this.getUuid = function () {
                var e = k.formatDate((new Date).getTime(), "yMdhms");
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                  var t = 16 * Math.random() | 0;
                  return ("x" == e ? t : 3 & t | 8).toString(16)
                }) + "-" + e
              }, this.getCustomerKey = function () {
                var e, t = this.getUuid(),
                  n = k.getCookie("monitorCustomerKey");
                return n || ((e = new Date).setTime(e.getTime() + 15552e7), document.cookie = "monitorCustomerKey=" + t + ";Path=/;domain=" + o + ";expires=" + e.toGMTString(), n = t), n
              }, this.getCookie = function (e) {
                var e = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                return document.cookie.match(e) ? (e = document.cookie.match(e), unescape(e[2])) : ""
              }, this.isTodayBrowse = function (e) {
                var t = l[e],
                  n = (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1) + "-" + (new Date).getDate();
                return t && n == t ? !(!t || n != t) : (l[e] = n, !1)
              }, this.formatDate = function (e, t) {
                var n = new Date(e).getFullYear(),
                  o = 9 < (o = new Date(e).getMonth() + 1) ? o : "0" + o,
                  r = 9 < (r = new Date(e).getDate()) ? r : "0" + r,
                  i = 9 < (i = new Date(e).getHours()) ? i : "0" + i,
                  s = 9 < (s = new Date(e).getMinutes()) ? s : "0" + s,
                  e = 9 < (e = new Date(e).getSeconds()) ? e : "0" + e;
                return t.replace("y", n).replace("M", o).replace("d", r).replace("h", i).replace("m", s).replace("s", e)
              }, this.getPageKey = function () {
                var e = this.getUuid();
                return l.monitorPageKey && /^[0-9a-z]{8}(-[0-9a-z]{4}){3}-[0-9a-z]{12}-\d{13}$/.test(l.monitorPageKey) || (l.monitorPageKey = e), l.monitorPageKey
              }, this.setPageKey = function () {
                l.monitorPageKey = this.getUuid()
              }, this.addLoadEvent = function (e) {
                var t = g.onload;
                "function" != typeof g.onload ? g.onload = e : g.onload = function () {
                  t(), e()
                }
              }, this.addOnBeforeUnloadEvent = function (e) {
                var t = g.onbeforeunload;
                "function" != typeof g.onbeforeunload ? g.onbeforeunload = e : g.onbeforeunload = function () {
                  t(), e()
                }
              }, this.addOnclickForDocument = function (e) {
                var t = document.onclick;
                "function" != typeof document.onclick ? document.onclick = e : document.onclick = function () {
                  t(), e()
                }
              }, this.ajax = function (e, t, n, o, r) {
                try {
                  var i = g.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                  i.open(e, t, !0), i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.onreadystatechange = function () {
                    if (4 == i.readyState) {
                      var t = {};
                      try {
                        t = i.responseText ? JSON.parse(i.responseText) : {}
                      } catch (e) {
                        t = {}
                      }
                      "function" == typeof o && o(t)
                    }
                  }, i.onerror = function () {
                    "function" == typeof r && r()
                  };
                  var s = JSON.stringify(n || {});
                  i.send("data=" + s)
                } catch (e) {}
              }, this.upLog = function (e, o) {
                e && "undefined" != e && k.ajax("POST", S, {
                  logInfo: e
                }, function (e) {
                  var t;
                  if (e && e.data && e.data.d && (l.ds = "c" == e.data.d ? "connected" : "disconnect", (t = e.data.c) && (l.setItem("WF_CONFIG", e.data.c), t = JSON.parse(t), 0 == (m = t).s && ((t = new Date).setTime(t.getTime() + 6e5), document.cookie = "webfunnyStart=p;Path=/;domain=;expires=" + t.toGMTString()))), !0 === o)
                    for (var n = 0; n < N.length; n++) l[N[n]] = ""
                }, function () {
                  if (!0 === o)
                    for (var e = 0; e < N.length; e++) l[N[e]] = ""
                })
              }, this.initDebugTool = function () {
                var s = (l.wmUserInfo ? JSON.parse(l.wmUserInfo) : {}).userId;

                function t(e) {
                  for (var t = [], n = e.length, o = 0; o < n; o++) t.push(e[o]);
                  var r = {};
                  r.log = t, r.userId = s, r.happenTime = (new Date).getTime();
                  var i = "";
                  try {
                    i = k.b64Code(JSON.stringify(r))
                  } catch (e) {
                    i = "convert fail"
                  }
                  return i
                }
                var n = console.log,
                  o = console.warn;
                console.log = function () {
                  var e = t(arguments);
                  return "connected" === l.ds && k.ajax("POST", r, {
                    consoleInfo: e
                  }, function () {}), n.apply(console, arguments)
                }, console.warn = function () {
                  var e = t(arguments);
                  return "connected" === l.ds && k.ajax("POST", r, {
                    warnInfo: e
                  }, function () {}), o.apply(console, arguments)
                }
              }, this.uploadLocalInfo = function () {
                var e = (l.wmUserInfo ? JSON.parse(l.wmUserInfo) : {}).userId,
                  t = {};
                for (key in l) "function" == typeof l[key] || -1 != N.indexOf(key) || 1e3 < l[key].length || (t[key] = l[key]);
                try {
                  t = k.b64Code(JSON.stringify(t))
                } catch (e) {
                  t = ""
                }
                var n = {};
                for (key in sessionStorage) "function" == typeof sessionStorage[key] || -1 != N.indexOf(key) || 1e3 < sessionStorage[key].length || (n[key] = sessionStorage[key]);
                try {
                  n = k.b64Code(JSON.stringify(n))
                } catch (e) {
                  n = ""
                }
                var o = k.b64Code(document.cookie);
                k.ajax("POST", r, {
                  localInfo: t,
                  sessionInfo: n,
                  cookieInfo: o,
                  userId: e
                }, function (e) {
                  if ((setTimeout(function () {
                      k.uploadLocalInfo()
                    }, 2e4), e.data) && 1 == e.data.clear) {
                    e = l.wmUserInfo;
                    localStorage.clear(), localStorage.wmUserInfo = e, sessionStorage.clear();
                    var t = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (t)
                      for (var n = t.length; n--;) document.cookie = t[n] + "=0;path=/;expires=" + new Date(0).toUTCString()
                  }
                })
              }, this.encryptObj = function (e) {
                if (e instanceof Array) {
                  for (var t = [], n = 0; n < e.length; ++n) t[n] = this.encryptObj(e[n]);
                  return t
                }
                if (e instanceof Object) {
                  t = {};
                  for (n in e) t[n] = this.encryptObj(e[n]);
                  return t
                }
                return e = 50 < (e += "").length ? e.substring(0, 10) + "****" + e.substring(e.length - 9, e.length) : e
              }, this.getDevice = function () {
                var e, t, n, o = {},
                  r = navigator.userAgent,
                  i = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                  s = r.match(/(iPad).*OS\s([\d_]+)/),
                  a = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                  c = !s && r.match(/(iPhone\sOS)\s([\d_]+)/),
                  u = r.match(/Android\s[\S\s]+Build\//);
                return o.ios = o.android = o.iphone = o.ipad = o.androidChrome = !1, o.isWeixin = /MicroMessenger/i.test(r), o.os = "web", o.deviceName = "PC", i && (o.os = "android", o.osVersion = i[2], o.android = !0, o.androidChrome = 0 <= r.toLowerCase().indexOf("chrome")), (s || c || a) && (o.os = "ios", o.ios = !0), c && !a && (o.osVersion = c[2].replace(/_/g, "."), o.iphone = !0), s && (o.osVersion = s[2].replace(/_/g, "."), o.ipad = !0), a && (o.osVersion = a[3] ? a[3].replace(/_/g, ".") : null, o.iphone = !0), o.ios && o.osVersion && 0 <= r.indexOf("Version/") && "10" === o.osVersion.split(".")[0] && (o.osVersion = r.toLowerCase().split("version/")[1].split(" ")[0]), o.iphone ? (o.deviceName = "iphone", e = g.screen.width, i = g.screen.height, 320 === e && 480 === i ? o.deviceName = "iphone 4" : 320 === e && 568 === i ? o.deviceName = "iphone 5/SE" : 375 === e && 667 === i ? o.deviceName = "iphone 6/7/8" : 414 === e && 736 === i ? o.deviceName = "iphone 6/7/8 Plus" : 375 === e && 812 === i && (o.deviceName = "iphone X/S/Max")) : o.ipad ? o.deviceName = "ipad" : u && (t = u[0].split(";")[1].replace(/Build\//g, ""), o.deviceName = t.replace(/(^\s*)|(\s*$)/g, "")), -1 == r.indexOf("Mobile") && (t = navigator.userAgent.toLowerCase(), o.browserName = "未知", 0 < t.indexOf("msie") && (n = t.match(/msie [\d.]+;/gi)[0], o.browserName = n.split("/")[0], o.browserVersion = n.split("/")[1]), 0 < t.indexOf("firefox") && (n = t.match(/firefox\/[\d.]+/gi)[0], o.browserName = n.split("/")[0], o.browserVersion = n.split("/")[1]), 0 < t.indexOf("safari") && t.indexOf("chrome") < 0 && (n = t.match(/safari\/[\d.]+/gi)[0], o.browserName = n.split("/")[0], o.browserVersion = n.split("/")[1]), 0 < t.indexOf("chrome") && (n = t.match(/chrome\/[\d.]+/gi)[0], o.browserName = n.split("/")[0], o.browserVersion = n.split("/")[1])), o.webView = (c || s || a) && r.match(/.*AppleWebKit(?!.*Safari)/i), o
              }, this.loadJs = function (e, t, n) {
                var o = document.createElement("script");
                o.async = 1, o.src = e, o.onload = t, "function" == typeof n && (o.onerror = n);
                n = document.getElementsByTagName("script")[0];
                return n.parentNode.insertBefore(o, n), n
              }, this.b64Code = function (t) {
                var n = "";
                try {
                  n = g.btoa(encodeURIComponent(t))
                } catch (e) {
                  n = t
                }
                return n
              }
            },
            f = k.getDevice(),
            A = l.wmUserInfo ? JSON.parse(l.wmUserInfo) : {},
            N = [E, a, O, c, y, x, T, u, h],
            L = [];

          function $() {
            this.handleLogInfo = function (e, t) {
              var n = l[e] || "";
              switch (e) {
                case E:
                  l[E] = n + JSON.stringify(t) + "$$$";
                  break;
                case a:
                  l[a] = n + JSON.stringify(t) + "$$$";
                  break;
                case O:
                  l[O] = n + JSON.stringify(t) + "$$$";
                  break;
                case c:
                  l[c] = n + JSON.stringify(t) + "$$$";
                  break;
                case y:
                  l[y] = n + JSON.stringify(t) + "$$$";
                  break;
                case x:
                  l[x] = n + JSON.stringify(t) + "$$$";
                  break;
                case T:
                  l[T] = n + JSON.stringify(t) + "$$$";
                  break;
                case u:
                  l[u] = n + JSON.stringify(t) + "$$$";
                  break;
                case h:
                  l[h] = n + JSON.stringify(t) + "$$$"
              }
            }
          }

          function P() {
            this.wmVersion = t, this.h = (new Date).getTime(), this.a = i, this.g = g.location.href.split("?")[0], this.f = k.b64Code(g.location.href), this.b = k.getCustomerKey();
            var e = l.wmUserInfo ? JSON.parse(l.wmUserInfo) : {};
            this.c = e.userId, this.d = k.b64Code(e.userTag || ""), this.e = k.b64Code(e.secondUserParam || "")
          }

          function U(e, t, n, o, r) {
            P.apply(this), this.i = e, this.j = k.b64Code(A.projectVersion || ""), this.k = k.getPageKey(), this.l = f.deviceName, this.m = f.os + (f.osVersion ? " " + f.osVersion : ""), this.n = f.browserName, this.o = f.browserVersion, this.p = "", this.q = "", this.r = "", this.s = "", this.t = t, this.u = n, this.newStatus = o, this.referrer = (r || "").split("?")[0]
          }

          function j(e) {
            this.i = s, this.a = i, this.leaveType = e, this.h = (new Date).getTime(), this.g = g.location.href.split("?")[0], this.b = k.getCustomerKey()
          }

          function D(e) {
            this.i = n, this.h = (new Date).getTime(), this.a = i, this.g = g.location.href.split("?")[0], this.b = k.getCustomerKey(), this.stayTime = e
          }

          function R(e, t, n, o, r, i, s, a, c, u, h, f) {
            P.apply(this), this.i = e, this.t = t, this.v = n, this.w = o, this.x = r, this.y = i, this.z = s, this.A = a, this.B = c, this.C = u, this.D = h, this.E = f
          }

          function B(e, t, n, o, r, i, s) {
            P.apply(this), this.i = e, this.da = t, this.G = k.b64Code(n), this.H = k.b64Code(o), this.I = k.b64Code(r), this.L = i, this.M = k.b64Code(s)
          }

          function M(e, t, n, o) {
            P.apply(this), this.i = e, this.O = t, this.k = k.getPageKey(), this.l = f.deviceName, this.m = f.os + (f.osVersion ? " " + f.osVersion : ""), this.n = f.browserName, this.o = f.browserVersion, this.p = "", this.q = "china", this.r = "", this.s = "", this.P = k.b64Code(n), this.Q = k.b64Code(o), this.R = ""
          }

          function F(e, t, n, o, r, i, s, a, c, u, h) {
            P.apply(this), this.i = e, this.method = t, this.g = n, this.S = k.b64Code(o), this.T = r, this.U = i, this.V = s, this.W = k.b64Code(a), this.X = k.b64Code(c), this.h = u, this.u = h
          }

          function J(e, t, n, o) {
            P.apply(this), this.i = e, this.Y = k.b64Code(t), this.Z = n, this.aa = o || "jpeg"
          }

          function V(e, t, n, o) {
            P.apply(this), this.i = e, this.ba = n, this.ca = k.b64Code(t), this.T = o
          }

          function q(e, t, n, o, r) {
            this.c = e, this.a = i, this.da = t, this.ea = n, this.i = o, this.Y = r, this.h = (new Date).getTime()
          }

          function H(e) {
            k.setPageKey();
            var t = k.isTodayBrowse(_),
              n = (new Date).getTime();
            l[I] = n;
            var o, r = null,
              i = k.formatDate(n, "y-M-d"),
              s = encodeURIComponent(g.location.href.split("?")[0]),
              a = l[C];
            a ? (n = (o = a.split("$$$"))[0], a = o[1], o = parseInt(o[2], 10), i == a ? s != n && 1 == o && (l[C] = s + "$$$" + i + "$$$2", r = new j(2)) : (l[C] = s + "$$$" + i + "$$$1", r = new j(1))) : (l[C] = s + "$$$" + i + "$$$1", r = new j(1));
            var c = "";
            v && (c = v[0] && "navigate" === v[0].type ? "load" : "reload");
            var u, i = k.getCookie("monitorCustomerKey");
            i ? (u = "", (i = i ? i.match(/\d{14}/g) : []) && 0 < i.length && (i = (i = i[0].match(/\d{2}/g))[0] + i[1] + "-" + i[2] + "-" + i[3] + " " + i[4] + ":" + i[5] + ":" + i[6], i = new Date(i).getTime(), u = 2e3 < (new Date).getTime() - i ? 0 == t ? "o_uv" : "o" : "n_uv")) : u = "n_uv";
            var h = document.referrer;

            function f(n) {
              var e = g.location.href;

              function t() {
                var e = new U(y, c, 0, u, h),
                  t = JSON.stringify(e) + "$$$";
                r && (t += JSON.stringify(r) + "$$$"), n ? e.handleLogInfo(y, e) : k.upLog(t, !1)
              }
              k.checkIgnore("pv", e) && ((l.wmUserInfo ? JSON.parse(l.wmUserInfo) : {}).userId ? t() : setTimeout(function () {
                t()
              }, 2e3))
            }
            var d = l.ds;
            d ? ("connected" === d && k.initDebugTool(), setTimeout(function () {
              "connected" === d && k.uploadLocalInfo()
            }, 2e3), f(e)) : f()
          }

          function K(e, t, n, o, r, i) {
            var s = t || "",
              t = i || "",
              i = "";
            k.checkIgnore("je", s) && (s && (i = ("string" == typeof t ? t : JSON.stringify(t)).split(": ")[0].replace('"', "")), (t = new M(a, e, i + ": " + s, t)).handleLogInfo(a, t))
          }
          U.prototype = new $, j.prototype = new $, D.prototype = new $, R.prototype = new $, B.prototype = new $, M.prototype = new $, F.prototype = new $, J.prototype = new $, V.prototype = new $, q.prototype = new $;
          for (var G = m.ia, W = !1, X = 0; X < G.length; X++) {
            var z = G[X].replace(/ /g, "");
            if (z && -1 != (g.location.href + g.location.hash).indexOf(z)) {
              W = !0;
              break
            }
          }

          function Y(e, t) {
            t = t || {
              bubbles: !1,
              cancelable: !1,
              detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
          }
          "p" == k.getCookie("webfunnyStart") || W || function () {
            try {
              var e = m.pv,
                t = m.je,
                n = m.hl,
                o = m.rl,
                r = m.bl;
              e.s && (H(), k.addLoadEvent(function () {
                setTimeout(function () {
                  var e, t, n;
                  v && (e = "load", e = v[0] && "navigate" === v[0].type ? "load" : "reload", t = p, (n = new R(x)).loadType = e, n.lookupDomain = t.domainLookupEnd - t.domainLookupStart, n.connect = t.connectEnd - t.connectStart, n.request = t.responseEnd - t.requestStart, n.ttfb = t.responseStart - t.navigationStart, n.domReady = t.domComplete - t.responseEnd, n.loadPage = t.loadEventEnd - t.navigationStart, n.redirect = t.redirectEnd - t.redirectStart, n.loadEvent = t.loadEventEnd - t.loadEventStart, n.appcache = t.domainLookupStart - t.fetchStart, n.unloadEvent = t.unloadEventEnd - t.unloadEventStart, n.handleLogInfo(x, n))
                }, 1e3)
              }), history.pushState = f("pushState"), history.replaceState = f("replaceState"), g.addEventListener("hashchange", function () {
                H(1)
              }), g.addEventListener("popstate", function () {
                var e = g.location.href.split("?")[0].split("#")[0];
                d != e && (H(0), d = e)
              }), g.addEventListener("pushState", function (e) {
                H(0)
              }), g.addEventListener("replaceState", function (e) {
                H(0)
              })), t.s && (h = console.error, console.error = function (e) {
                var t = e && e.message || e,
                  n = e && e.stack;
                if (n) K("on_error", t, 0, 0, 0, n);
                else {
                  if ("object" == typeof t) try {
                    t = JSON.stringify(t)
                  } catch (e) {
                    t = "错误无法解析"
                  }
                  K("console_error", t, 0, 0, 0, "CustomizeError: " + t)
                }
                return h.apply(console, arguments)
              }, g.onerror = function (e, t, n, o, r) {
                K("on_error", e, 0, 0, 0, r ? r.stack : null)
              }, g.onunhandledrejection = function (e) {
                var t = "",
                  n = "",
                  n = "object" == typeof e.reason ? (t = e.reason.message, e.reason.stack) : (t = e.reason, "");
                K("on_error", t, 0, 0, 0, "UncaughtInPromiseError: " + n)
              }), n.s && (u = g.XMLHttpRequest, y = [], g.XMLHttpRequest = function () {
                var e = new u;
                return e.addEventListener("loadstart", function () {
                  i.call(this, "ajaxLoadStart")
                }, !1), e.addEventListener("loadend", function () {
                  i.call(this, "ajaxLoadEnd")
                }, !1), e
              }, g.addEventListener("ajaxLoadStart", function (e) {
                e = {
                  timeStamp: (new Date).getTime(),
                  event: e,
                  simpleUrl: g.location.href.split("?")[0],
                  uploadFlag: !1
                };
                y.push(e)
              }), g.addEventListener("ajaxLoadEnd", function () {
                for (var o = 0; o < y.length; o++)
                  if (!0 !== y[o].uploadFlag)
                    if (0 < y[o].event.detail.status)
                      if ("blob" === (y[o].event.detail.responseType + "").toLowerCase()) ! function (t) {
                        var n = new FileReader;
                        n.onload = function () {
                          var e = n.result;
                          s(t, e)
                        };
                        try {
                          n.readAsText(y[o].event.detail.response, "utf-8")
                        } catch (e) {
                          s(t, y[o].event.detail.response + "")
                        }
                      }(o);
                      else try {
                        var e = y[o] && y[o].event && y[o].event.detail;
                        if (!e) return;
                        var t = e.responseType,
                          n = "";
                        "" !== t && "text" !== t || (n = e.responseText), "json" === t && (n = JSON.stringify(e.response)), s(o, n)
                      } catch (e) {}
              })), o.s && g.addEventListener("error", function (e) {
                var t = e.target.localName,
                  n = "";
                "link" === t ? n = e.target.href : "script" === t && (n = e.target.src), n = n ? n.split("?")[0] : "", k.checkIgnore("rl", n) && -1 == n.indexOf("pv.sohu.com/cityjson") && (t = new V(T, n, t, "0")).handleLogInfo(T, t)
              }, !0), r.s && k.addOnclickForDocument(function (e) {
                var t, n, o, r, i;
                e && (o = n = t = "", r = e.target.tagName, i = "", "svg" != e.target.tagName && "use" != e.target.tagName && (t = e.target.className, n = e.target.placeholder || "", o = e.target.value || "", i = (i = 200 < (i = e.target.innerText ? e.target.innerText.replace(/\s*/g, "") : "").length ? i.substring(0, 100) + "... ..." + i.substring(i.length - 99, i.length - 1) : i).replace(/\s/g, "")), (i = new B(E, "click", t, n, o, r, i)).handleLogInfo(E, i))
              }), k.addOnBeforeUnloadEvent(function () {
                var e = parseInt(l[I], 10),
                  e = (new Date).getTime() - e,
                  e = JSON.stringify(new D(e));
                navigator && "function" == typeof navigator.sendBeacon && navigator.sendBeacon(S, e)
              });
              var a = 0,
                c = N;
              setInterval(function () {
                var e = parseInt(m.wc || "40", 10),
                  e = "connected" == l.ds ? 5 : e;
                if (0 < a && a % 5 == 0) {
                  if (10 <= L.length) {
                    for (var t = "", n = 0; n < L.length; n++) {
                      var o = L[n];
                      o && (t += JSON.stringify(o) + "$$$")
                    }
                    k.upLog(t, !1)
                  } else {
                    for (var r = "", n = 0; n < L.length; n++) {
                      var i = L[n];
                      i && (r += JSON.stringify(i) + "$$$")
                    }
                    l[O] += r, 3e4 <= l[O].length && (k.upLog(l[O], !1), l[O] = "")
                  }
                  L = []
                }
                if (e <= a) {
                  for (var s = "", n = 0; n < c.length; n++) s += l[c[n]] || "";
                  0 < s.length && k.upLog(s, !0), a = 0
                }
                a++
              }, 200)
            } catch (e) {
              console.error("监控代码异常，捕获", e)
            }

            function i(e) {
              e = new CustomEvent(e, {
                detail: this
              });
              g.dispatchEvent(e)
            }

            function s(e, t) {
              if (y[e] && !0 !== y[e].uploadFlag) {
                var n = m.hl,
                  o = parseInt(n.rl, 10) || 500,
                  r = parseInt(n.sl, 10) || 500,
                  i = "";
                if (t && t.length < r) try {
                  i = t
                } catch (e) {
                  i = ""
                } else i = "内容太长";
                var s = y[e].simpleUrl,
                  a = (new Date).getTime(),
                  c = y[e].event.detail.responseURL,
                  u = y[e].event.detail.status,
                  h = y[e].event.detail.statusText,
                  n = a - y[e].timeStamp;
                if (c && -1 == c.indexOf(w) && -1 == c.indexOf(b) && k.checkIgnore("hl", c)) {
                  for (var f = "", d = "", l = g.webfunnyRequests || [], p = 0; p < l.length; p++)
                    if (l[p].url == c) {
                      (f = l[p].params || "") && f.length > o && (f = "内容太长"), d = l[p].method || "", l.splice(p, 1);
                      break
                    } r = new F(O, d, s, c, u, h, "发起请求", "", "", y[e].timeStamp, 0), n = new F(O, d, s, c, u, h, "请求返回", f, i, a, n);
                  L.push(r, n), y[e].uploadFlag = !0
                }
              }
            }
            var u, y, h;

            function f(e) {
              var t = history[e],
                n = new Event(e);
              return function () {
                var e = t.apply(this, arguments);
                return n.arguments = arguments, g.dispatchEvent(n), e
              }
            }
          }(), g.webfunny = {
            wm_upload_picture: function (e, t, n) {
              n = new J(c, t, e, n || "jpeg");
              n.handleLogInfo(c, n)
            },
            wm_upload_extend_log: function (e, t, n, o, r) {
              r = new q(e, t, n, o, r);
              r.handleLogInfo(u, r)
            }
          }, "function" != typeof g.CustomEvent && (Y.prototype = g.Event.prototype, g.CustomEvent = Y)
        }(window), window.LZString = (m = String.fromCharCode, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", r = {}, i = {
          compressToEncodedURIComponent: function (e) {
            return null == e ? "" : i._compress(e, 6, function (e) {
              return o.charAt(e)
            })
          },
          decompressFromEncodedURIComponent: function (t) {
            return null == t ? "" : "" == t ? null : (t = t.replace(/ /g, "+"), i._decompress(t.length, 32, function (e) {
              return function (e, t) {
                if (!r[e]) {
                  r[e] = {};
                  for (var n = 0; n < e.length; n++) r[e][e.charAt(n)] = n
                }
                return r[e][t]
              }(o, t.charAt(e))
            }))
          },
          _compress: function (e, t, n) {
            if (null == e) return "";
            for (var o, r, i, s, a = {}, c = {}, u = "", h = 2, f = 3, d = 2, l = [], p = 0, y = 0, g = 0; g < e.length; g += 1)
              if (i = e.charAt(g), Object.prototype.hasOwnProperty.call(a, i) || (a[i] = f++, c[i] = !0), s = u + i, Object.prototype.hasOwnProperty.call(a, s)) u = s;
              else {
                if (Object.prototype.hasOwnProperty.call(c, u)) {
                  if (u.charCodeAt(0) < 256) {
                    for (o = 0; o < d; o++) p <<= 1, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++;
                    for (r = u.charCodeAt(0), o = 0; o < 8; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1
                  } else {
                    for (r = 1, o = 0; o < d; o++) p = p << 1 | r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r = 0;
                    for (r = u.charCodeAt(0), o = 0; o < 16; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1
                  }
                  0 == --h && (h = Math.pow(2, d), d++), delete c[u]
                } else
                  for (r = a[u], o = 0; o < d; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1;
                0 == --h && (h = Math.pow(2, d), d++), a[s] = f++, u = String(i)
              } if ("" !== u) {
              if (Object.prototype.hasOwnProperty.call(c, u)) {
                if (u.charCodeAt(0) < 256) {
                  for (o = 0; o < d; o++) p <<= 1, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++;
                  for (r = u.charCodeAt(0), o = 0; o < 8; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1
                } else {
                  for (r = 1, o = 0; o < d; o++) p = p << 1 | r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r = 0;
                  for (r = u.charCodeAt(0), o = 0; o < 16; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1
                }
                0 == --h && (h = Math.pow(2, d), d++), delete c[u]
              } else
                for (r = a[u], o = 0; o < d; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1;
              0 == --h && (h = Math.pow(2, d), d++)
            }
            for (r = 2, o = 0; o < d; o++) p = p << 1 | 1 & r, y == t - 1 ? (y = 0, l.push(n(p)), p = 0) : y++, r >>= 1;
            for (;;) {
              if (p <<= 1, y == t - 1) {
                l.push(n(p));
                break
              }
              y++
            }
            return l.join("")
          },
          _decompress: function (e, t, n) {
            for (var o, r, i, s, a, c, u = [], h = 4, f = 4, d = 3, l = "", p = [], y = {
                val: n(0),
                position: t,
                index: 1
              }, g = 0; g < 3; g += 1) u[g] = g;
            for (r = 0, s = Math.pow(2, 2), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
            switch (r) {
              case 0:
                for (r = 0, s = Math.pow(2, 8), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
                c = m(r);
                break;
              case 1:
                for (r = 0, s = Math.pow(2, 16), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
                c = m(r);
                break;
              case 2:
                return ""
            }
            for (o = u[3] = c, p.push(c);;) {
              if (y.index > e) return "";
              for (r = 0, s = Math.pow(2, d), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
              switch (c = r) {
                case 0:
                  for (r = 0, s = Math.pow(2, 8), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
                  u[f++] = m(r), c = f - 1, h--;
                  break;
                case 1:
                  for (r = 0, s = Math.pow(2, 16), a = 1; a != s;) i = y.val & y.position, y.position >>= 1, 0 == y.position && (y.position = t, y.val = n(y.index++)), r |= (0 < i ? 1 : 0) * a, a <<= 1;
                  u[f++] = m(r), c = f - 1, h--;
                  break;
                case 2:
                  return p.join("")
              }
              if (0 == h && (h = Math.pow(2, d), d++), u[c]) l = u[c];
              else {
                if (c !== f) return null;
                l = o + o.charAt(0)
              }
              p.push(l), u[f++] = o + l.charAt(0), o = l, 0 == --h && (h = Math.pow(2, d), d++)
            }
          }
        }), void 0 === (t = function () {
          return window.LZString
        }.call(t, n, t, e)) || (e.exports = t)
      }, function (e, t) {
        ! function (e) {
          var t, n, o, s, r, i, a, c, u, h, f;

          function d(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
          }

          function l(e) {
            return e = "string" != typeof e ? String(e) : e
          }

          function p(t) {
            var e = {
              next: function () {
                var e = t.shift();
                return {
                  done: void 0 === e,
                  value: e
                }
              }
            };
            return o && (e[Symbol.iterator] = function () {
              return e
            }), e
          }

          function y(t) {
            this.map = {}, t instanceof y ? t.forEach(function (e, t) {
              this.append(t, e)
            }, this) : Array.isArray(t) ? t.forEach(function (e) {
              this.append(e[0], e[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
              this.append(e, t[e])
            }, this)
          }

          function g(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
          }

          function m(n) {
            return new Promise(function (e, t) {
              n.onload = function () {
                e(n.result)
              }, n.onerror = function () {
                t(n.error)
              }
            })
          }

          function v(e) {
            var t = new FileReader,
              n = m(t);
            return t.readAsArrayBuffer(e), n
          }

          function w(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
          }

          function b() {
            return this.bodyUsed = !1, this._initBody = function (e) {
              if (this._bodyInit = e)
                if ("string" == typeof e) this._bodyText = e;
                else if (s && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
              else if (r && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
              else if (n && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
              else if (i && s && c(e)) this._bodyArrayBuffer = w(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
              else {
                if (!i || !ArrayBuffer.prototype.isPrototypeOf(e) && !u(e)) throw new Error("unsupported BodyInit type");
                this._bodyArrayBuffer = w(e)
              } else this._bodyText = "";
              this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, s && (this.blob = function () {
              var e = g(this);
              if (e) return e;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData) throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function () {
              return this._bodyArrayBuffer ? g(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(v)
            }), this.text = function () {
              var e, t, n = g(this);
              if (n) return n;
              if (this._bodyBlob) return e = this._bodyBlob, t = new FileReader, n = m(t), t.readAsText(e), n;
              if (this._bodyArrayBuffer) return Promise.resolve(function (e) {
                for (var t = new Uint8Array(e), n = new Array(t.length), o = 0; o < t.length; o++) n[o] = String.fromCharCode(t[o]);
                return n.join("")
              }(this._bodyArrayBuffer));
              if (this._bodyFormData) throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText)
            }, r && (this.formData = function () {
              return this.text().then(x)
            }), this.json = function () {
              return this.text().then(JSON.parse)
            }, this
          }

          function S(e, t) {
            var n = {
              url: e,
              method: t && t.method ? t.method : "",
              params: t && t.body ? t.body : ""
            };
            window.webfunnyRequests ? window.webfunnyRequests.push(n) : window.webfunnyRequests = [n];
            var o = (t = t || {}).body;
            if (e instanceof S) {
              if (e.bodyUsed) throw new TypeError("Already read");
              this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new y(e.headers)), this.method = e.method, this.mode = e.mode, o || null == e._bodyInit || (o = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new y(t.headers)), this.method = (n = t.method || this.method || "GET", e = n.toUpperCase(), -1 < h.indexOf(e) ? e : n), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
          }

          function x(e) {
            var n = new FormData;
            return e.trim().split("&").forEach(function (e) {
              var t;
              e && (e = (t = e.split("=")).shift().replace(/\+/g, " "), t = t.join("=").replace(/\+/g, " "), n.append(decodeURIComponent(e), decodeURIComponent(t)))
            }), n
          }

          function O(e, t) {
            t = t || {}, this.type = "default", this.status = "status" in t ? t.status : 200, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new y(t.headers), this.url = t.url || "", this._initBody(e)
          }
          "p" != (t = "webfunnyStart", t = new RegExp("(^| )" + t + "=([^;]*)(;|$)"), document.cookie.match(t) ? (t = document.cookie.match(t), unescape(t[2])) : "") && (n = "URLSearchParams" in e, o = "Symbol" in e && "iterator" in Symbol, s = "FileReader" in e && "Blob" in e && function () {
            try {
              return new Blob, !0
            } catch (e) {
              return !1
            }
          }(), r = "FormData" in e, (i = "ArrayBuffer" in e) && (a = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"], c = function (e) {
            return e && DataView.prototype.isPrototypeOf(e)
          }, u = ArrayBuffer.isView || function (e) {
            return e && -1 < a.indexOf(Object.prototype.toString.call(e))
          }), y.prototype.append = function (e, t) {
            e = d(e), t = l(t);
            var n = this.map[e];
            this.map[e] = n ? n + "," + t : t
          }, y.prototype.delete = function (e) {
            delete this.map[d(e)]
          }, y.prototype.get = function (e) {
            return e = d(e), this.has(e) ? this.map[e] : null
          }, y.prototype.has = function (e) {
            return this.map.hasOwnProperty(d(e))
          }, y.prototype.set = function (e, t) {
            this.map[d(e)] = l(t)
          }, y.prototype.forEach = function (e, t) {
            for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
          }, y.prototype.keys = function () {
            var n = [];
            return this.forEach(function (e, t) {
              n.push(t)
            }), p(n)
          }, y.prototype.values = function () {
            var t = [];
            return this.forEach(function (e) {
              t.push(e)
            }), p(t)
          }, y.prototype.entries = function () {
            var n = [];
            return this.forEach(function (e, t) {
              n.push([t, e])
            }), p(n)
          }, o && (y.prototype[Symbol.iterator] = y.prototype.entries), h = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"], S.prototype.clone = function () {
            return new S(this, {
              body: this._bodyInit
            })
          }, b.call(S.prototype), b.call(O.prototype), O.prototype.clone = function () {
            return new O(this._bodyInit, {
              status: this.status,
              statusText: this.statusText,
              headers: new y(this.headers),
              url: this.url
            })
          }, O.error = function () {
            var e = new O(null, {
              status: 0,
              statusText: ""
            });
            return e.type = "error", e
          }, f = [301, 302, 303, 307, 308], O.redirect = function (e, t) {
            if (-1 === f.indexOf(t)) throw new RangeError("Invalid status code");
            return new O(null, {
              status: t,
              headers: {
                location: e
              }
            })
          }, e.Headers = y, e.Request = S, e.Response = O, e.fetch = function (n, o) {
            return new Promise(function (r, e) {
              var t = new S(n, o),
                i = new XMLHttpRequest;
              i.onload = function () {
                var e, n, t = i.responseType,
                  o = "",
                  e = {
                    status: i.status,
                    statusText: i.statusText,
                    headers: (e = i.getAllResponseHeaders() || "", n = new y, e.split(/\r?\n/).forEach(function (e) {
                      var t = e.split(":"),
                        e = t.shift().trim();
                      e && (t = t.join(":").trim(), n.append(e, t))
                    }), n)
                  };
                e.url = "responseURL" in i ? i.responseURL : e.headers.get("X-Request-URL"), "" !== t && "text" !== t || (o = i.responseText), "json" === t && (o = i.response);
                o = "response" in i ? i.response : o;
                r(new O(o, e))
              }, i.onerror = function () {
                console.error("Network request failed"), e(new TypeError("Network request failed"))
              }, i.ontimeout = function () {
                e(new TypeError("Network request failed"))
              }, i.open(t.method, t.url, !0), "include" === t.credentials && (i.withCredentials = !0), "responseType" in i && s && (i.responseType = "blob"), t.headers.forEach(function (e, t) {
                i.setRequestHeader(t, e)
              }), i.send(void 0 === t._bodyInit ? null : t._bodyInit)
            })
          }, e.fetch.polyfill = !0)
        }("undefined" != typeof self ? self : window)
      }]);