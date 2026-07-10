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

/* Hero art: drifting scatter points with a live least-squares fit line.
   Monochrome, theme-aware, pauses off-screen, static under reduced motion. */
(function () {
  "use strict";

  var canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // point cloud: fixed bases along a downward trend, gently wobbling
  var N = 64;
  var pts = [];
  (function seed() {
    // deterministic-ish spread using a simple LCG so reloads look similar
    var s = 42;
    function rnd() { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }
    for (var i = 0; i < N; i++) {
      var bx = 0.06 + 0.88 * rnd();
      var by = 0.78 - 0.52 * bx + (rnd() - 0.5) * 0.28;
      pts.push({
        bx: bx,
        by: Math.min(0.92, Math.max(0.08, by)),
        ax: 0.008 + 0.014 * rnd(),
        ay: 0.008 + 0.014 * rnd(),
        wx: 0.4 + 1.1 * rnd(),
        wy: 0.4 + 1.1 * rnd(),
        px: rnd() * Math.PI * 2,
        py: rnd() * Math.PI * 2,
        r: 1.4 + rnd() * 1.3,
      });
    }
  })();

  var colors = {};
  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors.fg = cs.getPropertyValue("--fg").trim() || "#14110f";
    colors.line = cs.getPropertyValue("--line").trim() || "#d9d8d3";
    colors.accent = cs.getPropertyValue("--accent").trim() || "#14110f";
  }
  readColors();
  new MutationObserver(readColors).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-accent"],
  });

  var W = 0, H = 0;
  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    if (!W || !H) return;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", function () { resize(); if (reduceMotion) draw(0); });

  var PAD = 26;
  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, 8);
    ctx.lineTo(PAD, H - PAD);
    ctx.lineTo(W - 8, H - PAD);
    ctx.stroke();
    // ticks
    ctx.beginPath();
    for (var i = 1; i <= 4; i++) {
      var ty = 8 + (H - PAD - 8) * (i / 4);
      ctx.moveTo(PAD - 4, ty); ctx.lineTo(PAD, ty);
      var tx = PAD + (W - 8 - PAD) * (i / 4);
      ctx.moveTo(tx, H - PAD); ctx.lineTo(tx, H - PAD + 4);
    }
    ctx.stroke();

    // points + running sums for the fit
    var sx = 0, sy = 0, sxx = 0, sxy = 0;
    ctx.fillStyle = colors.fg;
    for (var j = 0; j < N; j++) {
      var p = pts[j];
      var x = p.bx + p.ax * Math.sin(t * 0.001 * p.wx + p.px);
      var y = p.by + p.ay * Math.sin(t * 0.001 * p.wy + p.py);
      sx += x; sy += y; sxx += x * x; sxy += x * y;
      var cx = PAD + x * (W - 8 - PAD);
      var cy = 8 + y * (H - PAD - 8);
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // least-squares fit across the visible x range
    var mx = sx / N, my = sy / N;
    var slope = (sxy - N * mx * my) / (sxx - N * mx * mx);
    var icept = my - slope * mx;
    var x0 = 0.03, x1 = 0.97;
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(PAD + x0 * (W - 8 - PAD), 8 + (icept + slope * x0) * (H - PAD - 8));
    ctx.lineTo(PAD + x1 * (W - 8 - PAD), 8 + (icept + slope * x1) * (H - PAD - 8));
    ctx.stroke();
  }

  var running = false;
  function loop(ts) {
    if (!running) return;
    draw(ts);
    requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; requestAnimationFrame(loop); } }
  function stop() { running = false; }

  resize();
  if (reduceMotion) {
    draw(0); // calm single frame
  } else {
    // animate only while the hero is on screen
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    document.hidden ? stop() : start();
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
