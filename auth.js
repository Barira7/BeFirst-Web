/* BeFirst shared auth helper. Token in localStorage, backend JWT. */
(function () {
  var API = window.BEFIRST_API || "https://befirst-backend.onrender.com";
  function getToken() { try { return localStorage.getItem("befirst_token") || ""; } catch (e) { return ""; } }
  function setToken(t) { try { localStorage.setItem("befirst_token", t); } catch (e) {} }
  function clearToken() { try { localStorage.removeItem("befirst_token"); } catch (e) {} }
  function headers(extra) {
    var h = { "Content-Type": "application/json" };
    var t = getToken();
    if (t) h["Authorization"] = "Bearer " + t;
    if (extra) for (var k in extra) h[k] = extra[k];
    return h;
  }
  function api(path, opts) {
    opts = opts || {};
    opts.headers = headers(opts.headers);
    return fetch(API + path, opts).then(function (r) { return r.json(); });
  }
  function logout() { clearToken(); location.href = "/"; }
  window.BeFirst = { API: API, getToken: getToken, setToken: setToken, clearToken: clearToken, headers: headers, api: api, logout: logout };
})();
