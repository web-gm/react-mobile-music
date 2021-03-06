"use strict";
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

!function (e, t) {
    var n = {
        list: [], ua: {}, cache: {}, guid: 0, getGUID: function () {
            return ++this.guid
        }
    };
    try {
        if (top.window._qqmusic_player) n = e._qqmusic_player = top.window._qqmusic_player; else {
            e._qqmusic_player = top.window._qqmusic_player = n;
            var i = n.ua, r = navigator.userAgent;
            i.userAgent = r, /QQMusic/i.test(r) ? i.music = !0 : /MicroMessenger\/(\d[\.\d]*)/i.test(r) ? i.weixin = !0 : /Qzone\//i.test(r) ? i.qzone = !0 : /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)|\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(r) && (i.mqq = !0), /Android/i.test(r) ? i.android = !0 : /iPhone/i.test(r) ? i.iphone = !0 : /iPad/i.test(r) ? i.ipad = !0 : /iPod/i.test(r) && (i.ipod = !0), i.ios = i.iphone || i.ipad || i.ipod
        }
    } catch (e) {
    }
    var a = {
        ua: n.ua,
        extend: function () {
            var e = void 0, t = void 0, n = void 0, i = void 0, r = void 0, o = void 0, s = arguments, u = s[0] || {},
                l = 1, c = s.length, d = !1;
            for (a.isBoolean(u) && (d = u, u = s[l] || {}, l++), l === c ? (u = {}, l--) : a.isObject(u) || a.isFunction(u) || (u = {}); l < c; l++) if (null != (e = s[l])) for (t in e) n = u[t], u !== (i = e[t]) && (d && i && ((r = Array.isArray(i)) || a.isObject(i)) ? (r ? (r = !1, o = n && Array.isArray(n) ? n : []) : o = n && a.isObject(n) ? n : {}, u[t] = a.extend(d, o, i)) : void 0 !== i && (u[t] = i));
            return u
        },
        getTarget: function (e) {
            return e !== l.MUSIC && e !== l.WEB && (e = a.ua.music ? l.MUSIC : l.WEB), e
        },
        report: function (e, t, n) {
            var i = function (e) {
                return null != e ? encodeURIComponent(e) : ""
            }, r = new Image;
            r.src = "//stat.y.qq.com/pc/fcgi-bin/fcg_h5_listen.fcg?optime=" + (new Date).getTime() + "&qq=" + i(a.user.uin) + "&mid=" + i(e) + "&int1=" + i(t || 0) + "&from=" + i(n) + "&g_tk=" + i(a.user.g_tk), r.onload = r.onerror = function () {
                r = null
            }
        },
        tcss: function (e) {
            e && setTimeout(function () {
                var t = {
                    dm: "y.qq.com.hot",
                    url: "/h5player.html",
                    hottag: "h5player." + e + "." + (a.ua.ios ? "ios" : "android"),
                    hotx: 9999,
                    hoty: 9999,
                    rand: Math.round(1e5 * Math.random())
                }, n = "//pingfore.qq.com/pingd";
                for (var i in t) n += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(t[i]);
                n = n.replace(/[&?]/, "?");
                var r = new Image;
                r.onload = r.onerror = r.onabort = function () {
                    r = r.onload = r.onerror = r.onabort = null
                }, r.src = n
            }, 1e3)
        },
        client: {
            map: {}, open: function () {
                for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                e.M && M.client && a.isFunction(M.client.invoke) ? M.client.invoke.apply(M.client, n) : this.invoke.apply(this, n)
            }, on: function (t, n) {
                if (a.ua.music) {
                    if (e.M && M.client && a.isFunction(M.client.on)) M.client.on(t, n); else {
                        var i = "evt-" + t;
                        this.map[i] ? this.map[i].push(n) : (this.map[i] = [n], this.invoke("event", "on", {event: t}))
                    }
                }
            }, invoke: function (e, t, i, r, o) {
                a.isFunction(i) && (o = r, r = i, i = null);
                var s = n.getGUID();
                this.map[s] = r;
                var u = "qqmusic://qq.com/";
                e && t && (u += encodeURIComponent(e) + "/" + encodeURIComponent(t), a.isObject(i) && (u += "?p=" + encodeURIComponent(JSON.stringify(i)))), u += "#" + s;
                var l = void 0;
                if (a.ua.ios) l = +new Date, location.href = u; else {
                    var c = document.createElement("iframe");
                    c.style.cssText = "display:none;width:0px;height:0px;", c.src = u, l = +new Date, document.body.appendChild(c)
                }
                !a.ua.music && a.isFunction(o) && setTimeout(function () {
                    +new Date - l < 1550 && o()
                }, 1500)
            }
        },
        cookie: {
            get: function (e) {
                var n = t.cookie.match(new RegExp("(\\b)" + e + "=([^;]*)(;|$)"));
                return n ? decodeURIComponent(n[2]) : ""
            }, set: function (e, n, i, r, a) {
                t.cookie = e + "=" + n + (a > 0 ? "; expires=" + new Date(Date.now() + 864e5 * a).toGMTString() : "") + "; path=" + (i || "/") + "; " + (r ? "domain=" + r + ";" : "")
            }
        },
        reg: {mid: /^\w{14}$/, list: /^[\w,]+$/, url: /^https?:\/\/./},
        user: {},
        getACSRFToken: function (e) {
            e = e || "skey";
            var t = a.cookie.get(e), n = 5381;
            if (t) for (var i = 0, r = t.length; i < r; ++i) n += (n << 5) + t.charCodeAt(i);
            return 2147483647 & n
        },
        jsonp: function (i) {
            if (i) {
                var r = "player_jsonp_" + n.getGUID(), o = {
                    g_tk: a.user.g_tk,
                    uin: a.user.uin || 0,
                    format: "json",
                    callback: r,
                    data: JSON.stringify(a.extend({comm: {ct: 23, cv: 0}}, i.data)),
                    _: +new Date
                }, s = "";
                for (var u in o) s += "&" + encodeURIComponent(u) + "=" + encodeURIComponent(o[u]);
                var l = ("" + i.url).split("#");
                l[0] = l[0] + s, l = l.join("#").replace(/[&?]/, "?");
                var c = void 0, d = t.createElement("script");
                d.onload = d.onerror = function (n) {
                    var o = void 0;
                    o = "error" !== n.type && c ? i.success : i.error, a.isFunction(o) && o.apply(e, c), t.head.removeChild(d), o = d = c = void 0, delete window[r]
                }, window[r] = function () {
                    c = arguments
                }, d.src = l, t.head.appendChild(d)
            }
        },
        cache: {
            get: function (e) {
                if (e) if (a.isNormSong(e)) {
                    var t = n.cache[e.type || 0];
                    if (t) return t[e.mid] || t[e.id] || t[e.songmid] || t[e.songid]
                } else if (e.url) return e
            }, set: function (e) {
                if (a.isNormSong(e)) {
                    var t = e.type || 0, i = n.cache[t];
                    i || (n.cache[t] = i = {}), i[e.mid] = i[e.id] = e
                }
            }
        },
        serializeSongData: function (e) {
            var t = [];
            return a.isString(e) && a.reg.list.test(e) ? e = e.split(",") : a.isArray(e) || (e = [e]), e.forEach(function (e) {
                e && (e = a.reg.mid.test(e) ? {mid: e} : e > 0 ? {id: e} : a.reg.url.test(e) ? {url: e} : a.isNormSong(e) || a.isObject(e) && e.url ? a.extend({}, e) : null) && (e.id && (e.id = parseInt(e.id)), null == e.type && (e.type = 0)), t.push(e)
            }), t
        },
        isSameList: function (e, t) {
            if (e == t) return !0;
            if (a.isArray(e) && a.isArray(t) && e.length == t.length) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n] || {}, r = t[n] || {};
                    if (i.mid != r.mid || i.id != r.id || i.url != r.url) return !1
                }
                return !0
            }
            return !1
        },
        canPlay: function (e) {
            return !(!e || !(e.url || e.action && e.action.play))
        },
        isNormSong: function (e) {
            return !(!e || !(a.reg.mid.test(e.mid) || e.id > 0))
        },
        createAudio: function (e) {
            var n = t.createElement("audio");
            n.style.cssText = "height:0;width:0;display:none", n.setAttribute("autoplay", "");
            for (var i in e) n.addEventListener(i, e[i]);
            return n
        },
        msginfo: {
            url: "//c.y.qq.com/musichall/fcgi-bin/fcg_alert_info?cid=486",
            def: "æŠ±æ­‰ï¼Œæš‚æ—¶å¬ä¸äº†è¿™é¦–æ­Œäº†",
            pay: "åº”ç‰ˆæƒæ–¹è¦æ±‚ä¸èƒ½å…è´¹æ’­æ”¾ï¼Œå¯ä»˜è´¹åŽç•…äº«",
            msginfo: null,
            get: function (e, t) {
                var n = this;
                e || (e = {});
                var i = (e.action || {}).msgid, r = function () {
                    var r = n.msginfo && n.msginfo[i], a = void 0;
                    r || (r = e.pay && e.pay.pay_play ? n.pay : n.def), !a && e.mid && (a = "https://i.y.qq.com/v8/playsong.html?songmid=" + e.mid), t(r, a)
                };
                !n.msginfo && i > 0 ? a.jsonp({
                    url: n.url, success: function (e) {
                        e = e && e.data || {}, n.msginfo = e.msginfo || {}, r()
                    }, error: r
                }) : r()
            }
        },
        series: function (e, t) {
            a.isFunction(e) ? e = [e] : e || (e = []), a.isFunction(t) || (t = null);
            !function n(i, r) {
                if (++i < e.length) {
                    var o = e[i];
                    a.isFunction(o) ? o.call({index: i, count: e.length}, r, function (e, a) {
                        e ? t && t(e, r) : n(i, a)
                    }) : n(i, r)
                } else t && t(null, r)
            }(-1)
        },
        convert: {
            rule: [[null, "type", null, "type"], [null, "id", null, "songid"], [null, "mid", null, "songmid"], [null, "name", null, "songname"], ["action", "alert", null, "alertid"], ["action", "msgid", null, "msgid"], ["action", "switch", null, "switch"], [null, "singer", null, "singer"], ["album", "id", null, "albumid"], ["album", "mid", null, "albummid"], ["album", "name", null, "albumname"], ["mv", "vid", null, "vid"], [null, "interval", null, "interval"], [null, "isonly", null, "isonly"], [null, "url", null, "songUrl"]],
            format: function (e, t) {
                var n = void 0;
                if (a.isObject(e)) {
                    n = {};
                    var i = void 0, r = void 0, o = void 0, s = void 0, u = void 0, l = void 0, c = void 0, d = void 0;
                    this.rule.forEach(function (a) {
                        t ? (u = 2, l = 0) : (u = 0, l = 2), i = a[u], r = a[u + 1], o = a[l], s = a[l + 1], (d = o ? e[o] : e) && null != d[s] && (c = n, i && (c[i] || (c[i] = {}), c = c[i]), c[r] = d[s])
                    })
                }
                return n
            },
            toClient: function (e) {
                return this.format(e, 1)
            },
            toWeb: function (e) {
                var t = this.format(e);
                return t && e.switch && a.extend(t.action, s.parseSwitch(e.switch)), t
            }
        }
    };
    Array.prototype.forEach.call(["Object", "Function", "String", "Number", "Array", "Boolean"], function (e) {
        a["is" + (e.type || e)] = function (t) {
            return Object.prototype.toString.call(t) === "[object " + (e.key || e) + "]"
        }
    }), a.user.isLogin = !!(a.cookie.get("wxopenid") || a.cookie.get("skey") || a.cookie.get("p_skey"));
    var o = void 0;
    o = 2 == a.cookie.get("login_type") ? a.cookie.get("wxuin") : a.cookie.get("p_uin") || a.cookie.get("uin"), /^o/.test(o) && (o = o.substring(1, o.length)), a.user.uin = o || 0, a.user.g_tk = a.getACSRFToken(), a.user.guid = a.cookie.get("pgv_pvid"), a.user.guid || (a.user.guid = (new Date).getUTCMilliseconds(), a.user.guid = "" + Math.round(2147483647 * Math.random()) * a.user.guid % 1e10), e.M || (e.M = {}), M.client || (M.client = {}), a.isFunction(M.client.execGlobalCallback) || (M.client.execGlobalCallback = function (e) {
        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
        var r = a.client.map[e];
        r && (a.isArray(r) || (r = [r]), r.forEach(function (e) {
            a.isFunction(e) && e.apply(void 0, n)
        }))
    }, M.client.execEventCallback = function (e) {
        for (var t, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
        (t = M.client).execGlobalCallback.apply(t, ["evt-" + e].concat(i))
    });
    var s = function () {
        function e(t) {
            _classCallCheck(this, e);
            var n = this,
                i = {state: u.READY, song: null, currentTime: 0, duration: NaN, songs: [], index: 0, params: {}}, r = {
                    opts: a.extend({}, e.defaultOptions),
                    audio: null,
                    eventHandler: {},
                    data: i,
                    version: {build: "Player", version: "1.0.0"}
                };
            if (n.__ = r, a.isObject(t)) for (var o in t) {
                var s = t[o];
                if (/^on\w/.test(o) && a.isFunction(s)) {
                    var l = o.toLowerCase().replace(/^on/, "");
                    n.on(l, s)
                } else r.opts[o] = s
            }
            if (n.target = r.opts.target, a.ua.music && "web" != n.target) {
                var c = 0, d = function () {
                    var e = ++c;
                    a.client.open("media", "getCurrentSong", {list: 1}, function (t) {
                        (t = e == c && t && t.data) && (i.state = "end" === t.state ? u.ENDED : t.state, i.index = parseInt(t.index), i.currentTime = parseInt(t.currentTime), a.isArray(t.list) ? i.songs = t.list.map(function (e) {
                            var t = a.cache.get(t);
                            return t || (t = a.convert.toWeb(e), a.cache.set(t)), t
                        }) : i.songs = [], i.song = i.songs[i.index], i.duration = i.song && i.song.interval, t.source && (i.params.source = t.source), n._trigger(i.state == u.PLAYING ? "play" : i.state))
                    })
                };
                a.client.on("playStateChange", d), setTimeout(d, 50)
            } else n._webPlay()
        }

        return _createClass(e, null, [{
            key: "getSongInfo", value: function (t, n, i) {
                n || (n = {}), a.isFunction(n) && (i = n, n = {});
                var r = [], o = [], s = [], u = [], l = [], c = [], d = n.needUrl,
                    g = "//u.y.qq.com/cgi-bin/musicu.fcg", p = function (e) {
                        a.isFunction(i) && (e || (t = t.map(a.cache.get)), i(e, t))
                    }, f = function (e) {
                        return {module: "track_info.UniformRuleCtrlServer", method: "GetTrackInfo", param: e}
                    }, h = function (e) {
                        return {
                            module: "vkey.GetVkeyServer",
                            method: "CgiGetVkey",
                            param: {
                                guid: "" + a.user.guid,
                                songmid: e.mids,
                                songtype: e.types,
                                uin: "" + a.user.uin,
                                loginflag: a.user.isLogin ? 1 : 0,
                                platform: "23"
                            }
                        }
                    }, v = function (e, t) {
                        if ((e = e && e.data) && a.isArray(e.midurlinfo)) {
                            var n = e.thirdip && e.thirdip[0] ? e.thirdip[0] : "http://dl.stream.qqmusic.qq.com/";
                            e.midurlinfo.forEach(function (e, i) {
                                if (e) {
                                    var r = a.cache.get({type: t[i] || 0, mid: e.songmid});
                                    if (r) {
                                        var o = e.purl;
                                        o && !/^https?:\/\//i.test(o) && (o = n + o), r.url = o, !o && r.action && (r.action.play = 0)
                                    }
                                }
                            })
                        }
                    };
                a.series([function (e, i) {
                    var g = function (e) {
                        return e > 0 ? parseInt(e) : 0
                    };
                    (t = a.serializeSongData(t)).forEach(function (e, t) {
                        if (a.isNormSong(e)) {
                            var i = a.cache.get(e);
                            n.force || !i ? e.mid ? (s.push(e.mid), u.push(g(e.type))) : (r.push(e.id), o.push(g(e.type))) : d && i && !i.url && a.canPlay(i) && (l.push(i.mid), c.push(g(i.type)))
                        }
                    }), d && (l = l.concat(s), c = c.concat(u)), s.length || r.length || l.length ? i() : p()
                }, function (e, t) {
                    var n = {};
                    s.length && (n.data_mid = f({mids: s, types: u})), r.length && (n.data_id = f({
                        ids: r,
                        types: o
                    })), l.length && (n.url_mid = h({mids: l, types: c})), a.jsonp({
                        url: g,
                        data: n,
                        success: function (e) {
                            t(null, e || {})
                        },
                        error: function () {
                            t("error")
                        }
                    })
                }, function (t, n) {
                    var i = [], r = function (t) {
                        if (t) {
                            if (0 != t.code) return !0;
                            t = t.data && t.data.tracks, a.isArray(t) && t.length && (t.forEach(function (t) {
                                t && (delete t.url, t.action && a.extend(t.action, e.parseSwitch(t.action.switch)), a.cache.set(t))
                            }), i = i.concat(t))
                        }
                    }, o = r(t.data_id) || r(t.data_mid);
                    o ? n(o) : (t.url_mid && v(t.url_mid, c), n(null, i))
                }, function (e, t) {
                    l.length = c.length = 0, d && e.forEach(function (e) {
                        !e.url && a.canPlay(e) && (l.push(e.mid), c.push(e.type))
                    }), l.length ? a.jsonp({
                        url: g, data: {url_mid: h({mids: l, types: c})}, success: function (e) {
                            v(e.url_mid, c), t()
                        }, error: function () {
                            t()
                        }
                    }) : t()
                }], p)
            }
        }, {
            key: "parseSwitch", value: function (e) {
                var t = {switch: e};
                (e = e > 0 ? e.toString(2).split("") : []).pop(), e.reverse();
                return ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso", "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"].forEach(function (n, i) {
                    t[n] = parseInt(e[i], 10) || 0
                }), t.play = t.play_lq || t.play_hq || t.play_sq, t.down = t.down_lq || t.down_hq || t.down_sq, t
            }
        }]), _createClass(e, [{
            key: "__playHandler", value: function (e) {
                var t = this.__, n = (t.opts, t.data);
                return n.state = u.PLAYING, a.extend(!0, e, n), this
            }
        }, {
            key: "__pauseHandler", value: function (e) {
                var t = this.__, n = (t.opts, t.data);
                return n.state = u.PAUSE, a.extend(!0, e, n), this
            }
        }, {
            key: "__endedHandler", value: function (e) {
                var t = this, n = t.__, i = n.opts, r = n.data;
                return r.state = u.ENDED, a.extend(!0, e, r), i.loop && r.songs && r.songs[r.index + 1] && setTimeout(function () {
                    t.playNext()
                }, 50), t
            }
        }, {
            key: "__timeupdateHandler", value: function (e) {
                return this.__.data.currentTime = e.currentTime, this
            }
        }, {
            key: "__waitingHandler", value: function (e) {
                var t = this.__, n = (t.opts, t.data);
                return a.extend(!0, e, n), this
            }
        }, {
            key: "__errorHandler", value: function (e) {
                var t = this.__, n = (t.opts, t.data);
                if (n.state = u.ERROR, e.song || a.extend(!0, e, n), !e.message) switch (parseInt(e.code)) {
                    case c.GET_SONG_INFO_FAIL:
                        e.message = "æŸ¥è¯¢æ­Œæ›²ä¿¡æ¯å¤±è´¥";
                        break;
                    case c.PLAY_SONG_FAIL:
                        e.message = "æ’­æ”¾æ­Œæ›²å¤±è´¥";
                        break;
                    case c.INVALID_SONG:
                        e.message = "æ’­æ”¾å—é˜»";
                        break;
                    default:
                        e.message = "æ’­æ”¾å¤±è´¥"
                }
                return this
            }
        }, {
            key: "__triggerSongInvalid", value: function (e, t) {
                var n = this, i = n.__.data;
                n.state === u.PLAYING && n.pause(), a.isArray(i.songs) || (i.songs = []), i.song = i.songs[i.index] || i.songs[0];
                var r = i.song || {};
                return i.duration = r.interval >= 0 ? r.interval : NaN, i.currentTime = 0, a.msginfo.get(r, function (e, t) {
                    n._trigger("error", {code: c.INVALID_SONG, message: e, page: t})
                }), n
            }
        }, {
            key: "__audioPlay", value: function () {
                var e = this.__.audio.play();
                e && e.catch && e.catch(function (e) {
                })
            }
        }, {
            key: "_trigger", value: function (e, t) {
                var n = this, i = n.__.eventHandler;
                if (e && a.isString(e)) {
                    e = e.toLowerCase(), t = a.extend(!0, {type: e}, t);
                    var r = function (e, i) {
                        if (a.isFunction(e)) {
                            var r = i ? a.extend(!0, {}, t) : t;
                            e.call(n, r)
                        }
                    };
                    r(n["__" + e + "Handler"]), r(n["_" + e + "Handler"]), a.isArray(i[e]) && i[e].forEach(function (e) {
                        return r(e, !0)
                    }), r(n["on" + e], !0)
                }
                return n
            }
        }, {
            key: "_webPlay", value: function (e) {
                var n = this, i = n.__, r = (i.opts, i.data), o = i.audio;
                return o || (o = a.createAudio({
                    playing: function () {
                        o.src && n._trigger("play")
                    }, pause: function () {
                        n._trigger("pause")
                    }, ended: function () {
                        n._trigger("ended")
                    }, timeupdate: function () {
                        n._trigger("timeupdate", {currentTime: o.currentTime})
                    }, error: function () {
                        o.src && n._trigger("error", {code: PLAY_SONG_FAIL})
                    }, durationchange: function () {
                        o.duration >= 0 && (r.duration = o.duration)
                    }
                }), t.body.appendChild(o), i.audio = o), e && (o.src = e, o.load()), a.ua.ios && n.__audioPlay(), n
            }
        }, {
            key: "_musicPlay", value: function (e, t) {
                this.__.opts;
                var n = e.songs, i = e.index;
                return n = n.map(function (e) {
                    if (e = a.convert.toClient(e), a.ua.android) {
                        var t = {};
                        ["type", "action", "songid", "songmid", "songUrl"].forEach(function (n) {
                            null != e[n] && (t[n] = e[n])
                        }), e = t
                    }
                    return e
                }), t = a.extend({hideLoading: 1}, t, {
                    song: n,
                    index: i
                }), a.client.open("media", "playSonglist", t), this
            }
        }, {
            key: "play", value: function (t, n) {
                var i = this, r = i.__, o = r.opts, s = r.data, d = r.audio;
                (n = a.extend({}, n)).index = parseInt(n.index), isNaN(n.index) && delete n.index;
                var g, p = n.target ? a.getTarget(n.target) : i.target, f = p !== l.MUSIC;
                return g = function (e) {
                    var t = e.length;
                    if (0 != t) {
                        var r = function (e) {
                            return e && (f ? a.canPlay(e) : a.isNormSong(e) || e.url)
                        }, l = 0, c = void 0, g = s.songs, h = s.index;
                        if (null != n.index && t > 0 && (c = e[l = (l = parseInt(n.index)) % t + (l < 0 ? t : 0)]), s.index = l, s.songs = e, s.params = n, f) {
                            if (c && !r(c)) return i.__triggerSongInvalid();
                            if (o.filter) {
                                var v = [];
                                if (e.forEach(function (e) {
                                    r(e) && v.push(e)
                                }), !v.length) return i.__triggerSongInvalid();
                                s.songs = e = v, c && (l = e.indexOf(c), s.index = l = l > 0 ? l : 0)
                            }
                        }
                        p != i.target || null != n.index && l != h || !a.isSameList(e, g) ? (i.pause(), s.song = c = e[l] || e[0] || {}, s.duration = c.interval >= 0 ? c.interval : NaN, s.currentTime = 0, s.target = p, f ? c && c.url ? (s.state = u.PLAYING, i._webPlay(c.url)) : i.__triggerSongInvalid() : i._musicPlay(s, n), n.report && c.mid && a.report(c.mid, c.type, n.report)) : s.state == u.PLAYING ? i.pause() : f ? d.src && (s.state = u.PLAYING, i.__audioPlay()) : (s.state = u.PLAYING, a.client.open("media", "resumeSong"))
                    }
                }, t ? (f && i._webPlay(), e.getSongInfo(t, {needUrl: f}, function (e, t) {
                    e ? i._trigger("error", {code: c.GET_SONG_INFO_FAIL}) : g(t)
                })) : (t = s.songs, null == n.index && (n.index = s.index), g(t)), a.tcss("play"), i
            }
        }, {
            key: "pause", value: function (e) {
                var t = this.__, n = t.audio;
                return t.data.state = u.PAUSE, e && e !== l.WEB || !n || n.pause(), e && e !== l.MUSIC || !a.ua.music || a.client.open("media", "pauseSong"), this
            }
        }, {
            key: "toggle", value: function (e) {
                var t = this.__, n = (t.opts, t.data);
                t.audio;
                return this._canPlay && (n.state == u.PLAYING ? !0 !== e && this.pause() : !1 !== e && this.play()), this
            }
        }, {
            key: "playPrev", value: function () {
                var e = this.__, t = e.opts, n = e.data, i = this.data.index - 1;
                return (t.loop || n.songs[i]) && this.play(null, {index: i}), this
            }
        }, {
            key: "playNext", value: function () {
                var e = this.__, t = e.opts, n = e.data, i = this.data.index + 1;
                return (t.loop || n.songs[i]) && this.play(null, {index: i}), this
            }
        }, {
            key: "playReady", value: function () {
                return this._webPlay()
            }
        }, {
            key: "on", value: function (e, t) {
                var n = this.__.eventHandler;
                if (e && a.isFunction(t)) {
                    var i = n[e = ("" + e).toLowerCase()];
                    i || (n[e] = i = []);
                    for (var r = 0, o = i.length; r < o; r++) if (i[r] === t) {
                        t = null;
                        break
                    }
                    t && i.push(t)
                }
                return this
            }
        }, {
            key: "off", value: function (e, t) {
                var n = this.__.eventHandler;
                if (e) {
                    var i = n[e = ("" + e).toLowerCase()];
                    if (i) if (t) {
                        if (a.isFunction(t)) for (var r = 0, o = i.length; r < o; r++) if (i[r] === t) {
                            i.splice(r, 1);
                            break
                        }
                    } else i.length = 0
                }
                return this
            }
        }, {
            key: "_canPlay", get: function () {
                var e = this.__.data.state;
                return e !== u.READY && e !== u.ERROR
            }
        }, {
            key: "state", get: function () {
                return this.__.data.state
            }
        }, {
            key: "currentTime", get: function () {
                return this.__.data.currentTime
            }, set: function (e) {
                var t = this.__, n = (t.opts, t.data, t.audio);
                this._canPlay && this.target !== l.MUSIC && e >= 0 && (n.currentTime = e)
            }
        }, {
            key: "duration", get: function () {
                return this.__.data.duration
            }
        }, {
            key: "data", get: function () {
                var e = this.__, t = (e.opts, e.data);
                return a.extend(!0, {}, t)
            }
        }, {
            key: "loop", get: function () {
                return this.__.opts.loop
            }, set: function (e) {
                this.__.opts.loop = !!e
            }
        }, {
            key: "target", get: function () {
                return this.__.data.target
            }, set: function (e) {
                this.__.data.target = a.getTarget(e)
            }
        }, {
            key: "report", get: function () {
                return this.__.opts.report
            }, set: function (e) {
                this.__.opts.report = e
            }
        }, {
            key: "version", get: function () {
                return a.extend({}, this.__.version)
            }
        }]), e
    }(), u = {READY: "ready", PLAYING: "playing", PAUSE: "pause", ENDED: "ended", ERROR: "error"};
    s.TARGET = l;
    var l = {AUTO: "auto", MUSIC: "music", WEB: "web"};
    s.TARGET = l;
    var c = {GET_SONG_INFO_FAIL: -1, PLAY_SONG_FAIL: -2, INVALID_SONG: 1};
    s.TARGET = l, s.defaultOptions = {
        target: s.TARGET.AUTO,
        loop: !0,
        filter: !0,
        report: null
    }, e.QMplayer = e.Player = s
}(window, document);