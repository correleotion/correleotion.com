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

  var STOP_DELAY = 1000;      // ms of stillness before snapping
  var SNAP_RANGE = 0.5;       // only snap when within 50% of viewport height
  var NAV_OFFSET = 70;        // matches scroll-margin-top on .section

  var SNAP_DURATION = 700;    // ms of eased animation

  var timer = null;
  var snapping = false;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // hand-rolled animation: consistent easing everywhere, cancels on user input
  function animateTo(target) {
    var start = window.scrollY;
    var dist = target - start;
    var t0 = null;
    var cancelled = false;

    function cancel() { cancelled = true; }
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });

    snapping = true;
    function step(ts) {
      if (cancelled) { snapping = false; return; }
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / SNAP_DURATION);
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
})();
