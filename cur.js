/* BeFirst local-currency pricing.
   Payment zone: INR (India) or USD (everywhere else).
   Display: visitor's local currency, converted from USD base with live FX rates. */
window.BEFIRST_CUR = { code: "INR", display: "INR", rate: 0 };

window.BF_fmt = function (amount, cur) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: cur, maximumFractionDigits: 2 }).format(amount);
  } catch (e) {
    return "$" + amount.toFixed(2);
  }
};

window.BF_txt = function (usd) {
  var C = window.BEFIRST_CUR;
  if (!C || C.code === "INR") return usd === 5 ? "₹99" : usd === 15 ? "₹799" : "₹" + usd;
  if (C.display === "USD" || !C.rate) return "$" + usd;
  return window.BF_fmt(usd * C.rate, C.display);
};

window.BF_apply = function () {
  var C = window.BEFIRST_CUR;
  document.querySelectorAll(".pr").forEach(function (el) {
    var u = el.getAttribute("data-usd") || "";
    if (u === "USD" || u === "INR") { el.textContent = C.code === "INR" ? "INR" : "USD"; return; }
    var m = u.match(/(\d+(?:\.\d+)?)/);
    if (!m) return;
    var suffix = u.indexOf("month") > -1 ? "/month" : "";
    el.textContent = window.BF_txt(parseFloat(m[1])) + suffix;
  });
  if (typeof window.__recur === "function") window.__recur();
};

(function () {
  fetch("/geo").then(function (r) { return r.json(); }).then(function (g) {
    var cur = ((g && g.currency) || "").toUpperCase();
    var cc = ((g && g.country) || "").toUpperCase();
    if (cc === "IN" || cur === "INR") {
      window.BEFIRST_CUR = { code: "INR", display: "INR", rate: 0 };
      return;
    }
    if (cur === "USD") {
      window.BEFIRST_CUR = { code: "USD", display: "USD", rate: 1 };
      window.BF_apply();
      return;
    }
    if (!/^[A-Z]{3}$/.test(cur)) {
      window.BEFIRST_CUR = { code: "USD", display: "USD", rate: 1 };
      window.BF_apply();
      return;
    }
    window.BEFIRST_CUR = { code: "USD", display: cur, rate: 0 };
    fetch("https://open.er-api.com/v6/latest/USD").then(function (r) { return r.json(); }).then(function (fx) {
      var rate = fx && fx.rates && fx.rates[cur];
      if (typeof rate === "number" && rate > 0) {
        window.BEFIRST_CUR.rate = rate;
      } else {
        window.BEFIRST_CUR.display = "USD";
        window.BEFIRST_CUR.rate = 1;
      }
      window.BF_apply();
    }).catch(function () {
      window.BEFIRST_CUR.display = "USD";
      window.BEFIRST_CUR.rate = 1;
      window.BF_apply();
    });
  }).catch(function () {
    /* /geo failed: keep INR default (safe for India) */
  });
})();
