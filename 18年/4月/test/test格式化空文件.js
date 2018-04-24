"use strict";
define("common-ipr-api:/api/index.js", ["common-ipr-api:/tool/ajax.js", "common-ipr-api:/tool/util.js", "common-ipr-api:/tool/cookie.js", "common-ipr-api:/data-statistic/data-bind.js", "common-ipr-api:/data-statistic/data-select.js"], function (n, a, o) {
    var t = n("common-ipr-api:/tool/ajax.js"), i = n("common-ipr-api:/tool/util.js"),
        e = n("common-ipr-api:/tool/cookie.js"), r = n("common-ipr-api:/data-statistic/data-bind.js"),
        s = n("common-ipr-api:/data-statistic/data-select.js");
    o.exports = {
        getInfo: function (n) {
            if (window.IPRInfo.info) return window.IPRInfo.info;
            t.send({
                url: "//ipr." + window.IPRInfo.baseURI + "/ajax/gettel?json=1", success: function (a) {
                    a.state >= 0 ? (window.IPRInfo.info = a.data, n && "function" == typeof n && n(a.data)) : window.console.warn("未获取到用户数据......")
                }
            })
        }, addChance: function (n) {
            var a = i.referStatistics(), o = e.get("track"), r = {
                lastPage: document.referrer,
                current_page: document.location.href,
                userPoints: o ? JSON.parse(o).join(",") : "",
                port: 2
            };
            "string" == typeof n.data ? n.data = n.data + "&" + $.param(r) : Array.isArray(n.data) ? Object.keys(r).forEach(function (a) {
                n.data.push({name: a, value: r[a]})
            }) : $.extend(!0, n.data, r), n.chanceUrl && "" !== n.chanceUrl ? $.extend(!0, n, {url: n.chanceUrl}) : $.extend(!0, n, {url: "//ipr." + window.IPRInfo.baseURI + "/mark/addchance?json=1" + (a ? "&" + a : "")}), t.send(n)
        }, unionCount: function () {
            var n = i.getUrlParam("_union_uid"), a = i.getUrlParam("_union_itemid"),
                o = i.getUrlParam("_union_identify"), r = i.getUrlParam("_bja_spread_code"),
                s = i.getUrlParam("source");
            (null != n && null != a || null != r) && t.send({
                url: "//ipr." + window.IPRInfo.baseURI + "/main/unionencrypt?json=1",
                data: {_union_uid: n, _union_itemid: a, _union_identify: o, _agent_spread_code: r}
            }), null != s && e.set("source", s, window.IPRInfo.cookieDomain)
        }, getAdJsonp: function (n, a, o) {
            t.getAdJsonp("//ipr." + window.IPRInfo.baseURI + "/ipr?json=1", {holder_id: n}, function (n) {
                n.state >= 0 ? a(n) : o(n)
            })
        }, ga: function (n) {
            _gaq.push(["_trackEvent", "pop-up", n])
        }, iprCount: function () {
            new r({tag: "a, li, button"}), i.getUrlParam("datashowtag") && new s
        }, baiduCount: function () {
            seajs.use("common-ipr-api:/tool/baidu-count.js", function (n) {
                new n
            })
        }
    }
});