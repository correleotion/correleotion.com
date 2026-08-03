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

/* Hero ASCII art: a live scatter plot that moves between negative, neutral,
   and positive correlation. Pauses off-screen / in hidden tabs. */
(function () {
  "use strict";

  var el = document.getElementById("hero-ascii");
  if (!el) return;

  var COLS = 64, ROWS = 32;
  var LEFT = 2, RIGHT = COLS - 2, TOP = 4, BOTTOM = ROWS - 3;
  var xs = [], noise = [], seed = 42;

  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  for (var p = 0; p < 110; p++) {
    xs.push(random() * 2 - 1);
    noise.push((random() + random() + random()) / 1.5 - 1);
  }

  function frame() {
    var b = new Array(COLS * ROWS).fill(" ");
    var r = Math.sin(performance.now() * 0.00045) * 0.92;
    var spread = Math.sqrt(1 - r * r) * 0.72;
    var cx = Math.round((LEFT + RIGHT) / 2);
    var cy = Math.round((TOP + BOTTOM) / 2);

    function put(x, y, char) {
      if (x >= 0 && x < COLS && y >= 0 && y < ROWS) b[x + COLS * y] = char;
    }
    function plotX(x) { return Math.round(LEFT + (x + 1) * 0.5 * (RIGHT - LEFT)); }
    function plotY(y) { return Math.round(BOTTOM - (y + 1) * 0.5 * (BOTTOM - TOP)); }

    for (var x = LEFT; x <= RIGHT; x++) put(x, cy, "-");
    for (var y = TOP; y <= BOTTOM; y++) put(cx, y, "|");
    put(cx, cy, "+");

    for (var col = LEFT; col <= RIGHT; col++) {
      var lineX = (col - LEFT) / (RIGHT - LEFT) * 2 - 1;
      put(col, plotY(r * lineX), ".");
    }

    for (var i = 0; i < xs.length; i++) {
      var px = plotX(xs[i]);
      var py = plotY(Math.max(-1, Math.min(1, r * xs[i] + spread * noise[i])));
      put(px, py, b[px + COLS * py] === " " ? "*" : "#");
    }

    var label = "r = " + (r >= 0 ? "+" : "") + r.toFixed(2) + "  " +
      (r > 0.15 ? "positive" : r < -0.15 ? "negative" : "no") + " correlation";
    for (var q = 0; q < label.length; q++) put(LEFT + q, 1, label[q]);

    var out = "";
    for (var k = 0; k < b.length; k++) {
      out += b[k] + (k % COLS === COLS - 1 ? "\n" : "");
    }
    el.textContent = out;
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
