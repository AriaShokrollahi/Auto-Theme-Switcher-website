// =====================================================================
// Put your own GitHub repository link here (used by every Download / GitHub button)
// =====================================================================
var REPO = "https://github.com/AriaShokrollahi/Auto-Theme-Switcher";

(function () {
  var d = document, r = d.documentElement, $ = function (s) { return d.querySelector(s); };
  [].forEach.call(d.querySelectorAll("[data-dl]"), function (a) { a.href = REPO + "/releases/latest"; });
  [].forEach.call(d.querySelectorAll("[data-repo]"), function (a) { a.href = REPO; });

  // The site follows the demo schedule: light 07:00-19:00, dark otherwise.
  function scheduledTheme() {
    var hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? "light" : "dark";
  }
  var activeSchedule = scheduledTheme();
  r.dataset.theme = activeSchedule;
  $("#th").onclick = function () {
    var n = r.dataset.theme === "dark" ? "light" : "dark";
    r.dataset.theme = n;
  };
  setInterval(function () {
    var next = scheduledTheme();
    if (next !== activeSchedule) {
      activeSchedule = next;
      r.dataset.theme = next;
    }
  }, 30000);

  function ticks(n, r1, r2, cls, big) {
    var o = "", i, a;
    for (i = 0; i < n; i++) {
      a = i * 2 * Math.PI / n;
      o += '<line class="' + cls + (i % 5 ? "" : " " + big) + '" x1="' + (100 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (100 - r1 * Math.cos(a)).toFixed(1) +
           '" x2="' + (100 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (100 - r2 * Math.cos(a)).toFixed(1) + '"/>';
    }
    return o;
  }
  $("#rg").innerHTML = ticks(60, 86, 96, "rt", "") + '<text id="dg" x="100" y="118" text-anchor="middle"></text>';
  $("#an").innerHTML = ticks(60, 88, 96, "tk2", "b") +
    '<line id="hh" class="hd" x1="100" y1="106" x2="100" y2="58" stroke-width="7"/><line id="mm" class="hd" x1="100" y1="108" x2="100" y2="30" stroke-width="5"/>' +
    '<line id="ss" x1="100" y1="122" x2="100" y2="16" stroke="#ff9500" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="#ff9500"/>';
  var rt = d.querySelectorAll(".rt"), days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      mons = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function rot(id, deg) { $(id).setAttribute("transform", "rotate(" + deg + " 100 100)"); }
  function tick() {
    var t = new Date(), h = t.getHours() % 12 || 12, m = t.getMinutes(), sec = t.getSeconds(), i,
        txt = h + ":" + (m < 10 ? "0" : "") + m;
    $("#dg").textContent = txt; $("#t3t").textContent = txt;
    $("#t3d").textContent = days[t.getDay()] + ", " + mons[t.getMonth()] + " " + t.getDate();
    for (i = 0; i < rt.length; i++) rt[i].setAttribute("class", i <= sec ? "rt on" : "rt");
    rot("#hh", ((t.getHours() % 12) + m / 60) * 30); rot("#mm", (m + sec / 60) * 6); rot("#ss", sec * 6);
  }
  tick(); setInterval(tick, 1000);

  // demo: light from 07:00 to 19:00
  var sl = $("#sl"), desk = $("#desk");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function demo() {
    var v = +sl.value, light = v >= 420 && v < 1140, h = Math.floor(v / 60), m = v % 60;
    desk.dataset.m = light ? "l" : "d";
    $("#dt").textContent = pad(h) + ":" + pad(m);
    $("#dd").textContent = light ? "Light mode · wallpaper: light" : "Dark mode · wallpaper: dark";
    $("#so").textContent = light ? "Switching to Dark at 19:00" : "Switching to Light at 07:00";
  }
  sl.oninput = demo; demo();

  // interactive app window: sections, switches and picture fit
  var tabs = d.querySelectorAll(".wb [role=tab]"), pgs = d.querySelectorAll(".pg");
  function show(i, focus) {
    [].forEach.call(tabs, function (t, k) { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; if (k === i && focus) t.focus(); });
    [].forEach.call(pgs, function (p, k) { p.hidden = k !== i; });
  }
  [].forEach.call(tabs, function (t, k) {
    t.onclick = function () { show(k); };
    t.onkeydown = function (e) {
      var n = e.key === "ArrowDown" ? k + 1 : (e.key === "ArrowUp" ? k - 1 : -1);
      if (n >= 0 && n < tabs.length) { e.preventDefault(); show(n, true); }
    };
  });
  [].forEach.call(d.querySelectorAll(".tg"), function (b) {
    b.onclick = function () {
      var on = b.classList.toggle("on");
      b.setAttribute("aria-checked", on);
      if (b.dataset.dim) $("#" + b.dataset.dim).classList.toggle("off", !on);
    };
  });
  [].forEach.call(d.querySelectorAll(".sgm button"), function (b) {
    b.onclick = function () { [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle("on", x === b); }); };
  });

  // gentle reveal on scroll
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 }) : null;
  [].forEach.call(d.querySelectorAll(".rv"), function (n) { if (io) io.observe(n); else n.classList.add("in"); });
})();
