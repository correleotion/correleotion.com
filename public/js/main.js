/* Theme toggle with localStorage persistence. */
(function () {
  "use strict";

  var root = document.documentElement;

  function applyThemeLabels() {
    var dark = root.getAttribute("data-theme") === "dark";
    var icon = document.querySelector('[data-role="theme-icon"]');
    var label = document.querySelector('[data-role="theme-label"]');
    if (icon) icon.textContent = dark ? "○" : "●";
    if (label) label.textContent = dark ? "LIGHT" : "DARK";
  }

  function toggleTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    applyThemeLabels();
    try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest('[data-action="toggle-theme"]');
    if (btn) toggleTheme();
  });

  // initial paint (the inline head script already set the theme attribute)
  applyThemeLabels();
})();

/* Gentle section snapping: after the user stops scrolling for a moment,
   ease to the nearest section top so sections are seen in full. */
(function () {
  "use strict";

  var STOP_DELAY = 3000;      // ms of stillness before snapping
  var SNAP_RANGE = 0.5;       // only snap when within 50% of viewport height
  var NAV_OFFSET = 70;        // matches scroll-margin-top on .section

  var SNAP_DURATION = 700;    // ms of eased animation

  var timer = null;
  var snapping = false;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // hand-rolled animation: consistent easing everywhere, cancels on user input
  function animateTo(target, duration) {
    var start = window.scrollY;
    var dist = target - start;
    duration = duration || SNAP_DURATION;
    var t0 = null;
    var cancelled = false;

    function cancel() { cancelled = true; }
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });

    snapping = true;
    function step(ts) {
      if (cancelled) { snapping = false; return; }
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, start + dist * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(function () { snapping = false; }, 50);
    }
    requestAnimationFrame(step);
  }

  function snapTargets() {
    var tops = [0];
    document.querySelectorAll("main .hero, main .section").forEach(function (el) {
      tops.push(Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET));
    });
    return tops;
  }

  function onScrollStop() {
    var y = window.scrollY;
    var maxY = document.documentElement.scrollHeight - window.innerHeight;
    if (y <= 2 || y >= maxY - 4) return; // let the user rest at the very top/bottom

    var best = null;
    var bestDist = Infinity;
    snapTargets().forEach(function (t) {
      var d = Math.abs(t - y);
      if (d < bestDist) { bestDist = d; best = t; }
    });

    if (best === null || bestDist < 2) return;                 // already there
    if (bestDist > window.innerHeight * SNAP_RANGE) return;    // mid-section: don't yank

    animateTo(best);
  }

  window.addEventListener("scroll", function () {
    if (snapping) return;
    clearTimeout(timer);
    timer = setTimeout(onScrollStop, STOP_DELAY);
  }, { passive: true });

  // in-page anchor links (nav, "View work") glide with the same easing
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return; // bare "#" placeholders keep default behavior
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    clearTimeout(timer); // don't let the idle snap fight this scroll
    var target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
    var dist = Math.abs(target - window.scrollY);
    // longer trips get a bit more time, capped so it never drags
    animateTo(target, Math.min(1100, Math.max(500, dist * 0.3)));
    history.pushState(null, "", "#" + id);
  });
})();

/* Contact form: returning from FormSubmit with ?sent=1 shows the thank-you note. */
(function () {
  "use strict";
  if (new URLSearchParams(location.search).get("sent") !== "1") return;
  var note = document.querySelector('[data-role="form-sent"]');
  if (note) note.hidden = false;
  // clean the query string but keep the #contact anchor position
  history.replaceState(null, "", location.pathname + location.hash);
})();

/* Hero ASCII art: the classic spinning 3D torus (a la donut.c) —
   real 3D projection with a z-buffer and luminance-shaded characters.
   Pauses off-screen / in hidden tabs. */
(function () {
  "use strict";

  var el = document.getElementById("hero-ascii");
  if (!el) return;

  var COLS = 52, ROWS = 26;
  var XS = COLS * 0.375, YS = ROWS * 0.60; // projection scales (chars are ~2x taller than wide)
  var SHADE = ".,-~:;=!*#$@";
  var A = 1.0, B = 0.4; // rotation angles around two axes

  function frame() {
    var b = new Array(COLS * ROWS).fill(" ");
    var z = new Float32Array(COLS * ROWS);
    var e = Math.sin(A), g = Math.cos(A);
    var m = Math.cos(B), n = Math.sin(B);
    for (var j = 0; j < 6.28; j += 0.07) {       // around the tube's big circle
      var d = Math.cos(j), f = Math.sin(j), h = d + 2;
      for (var i = 0; i < 6.28; i += 0.02) {     // around the tube itself
        var c = Math.sin(i), l = Math.cos(i);
        var D = 1 / (c * h * e + f * g + 5);     // inverse depth
        var t = c * h * g - f * e;
        var x = (COLS / 2 + XS * D * (l * h * m - t * n)) | 0;
        var y = (ROWS / 2 + YS * D * (l * h * n + t * m)) | 0;
        var o = x + COLS * y;
        var N = (8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n)) | 0;
        if (y >= 0 && y < ROWS && x >= 0 && x < COLS && D > z[o]) {
          z[o] = D;
          b[o] = SHADE[N > 0 ? N : 0];
        }
      }
    }
    var out = "";
    for (var k = 0; k < b.length; k++) out += b[k] + (k % COLS === COLS - 1 ? "\n" : "");
    el.textContent = out;
    A += 0.05;
    B += 0.023;
  }

  var running = false;
  var timer = null;
  function start() {
    if (running) return;
    running = true;
    timer = setInterval(frame, 55);
  }
  function stop() { running = false; clearInterval(timer); }

  new IntersectionObserver(function (entries) {
    entries[0].isIntersecting ? start() : stop();
  }).observe(el);
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });
})();

/* ASCII portrait shimmer: a soft scanline sweeps down the silhouette,
   momentarily dissolving characters in its path. */
(function () {
  "use strict";

  var el = document.querySelector(".ascii-portrait__art");
  if (!el) return;

  var base = el.textContent.split("\n");
  var ROWS = base.length;
  var NOISE = ".:-=+*";

  function frame(t) {
    var scan = (t * 6) % (ROWS + 14) - 7; // sweeps past both edges
    var out = [];
    for (var y = 0; y < ROWS; y++) {
      var line = base[y];
      var d = Math.abs(y - scan);
      if (d < 2.2) {
        var p = 1 - d / 2.2; // strongest at the scan center
        var chars = "";
        for (var x = 0; x < line.length; x++) {
          var c = line[x];
          chars += (c !== " " && Math.random() < p * 0.8)
            ? NOISE[(Math.random() * NOISE.length) | 0]
            : c;
        }
        out.push(chars);
      } else {
        out.push(line);
      }
    }
    el.textContent = out.join("\n");
  }

  var running = false;
  var timer = null;
  function start() {
    if (running) return;
    running = true;
    timer = setInterval(function () { frame(performance.now() * 0.001); }, 90);
  }
  function stop() { running = false; clearInterval(timer); }

  new IntersectionObserver(function (entries) {
    entries[0].isIntersecting ? start() : stop();
  }).observe(el);
  document.addEventListener("visibilitychange", function () {
    document.hidden ? stop() : start();
  });
})();
