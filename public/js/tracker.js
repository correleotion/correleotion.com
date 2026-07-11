/* Lightweight analytics tracker → Supabase.
   Captures pageviews, clicks, text copies, and which sections get seen.
   Fire-and-forget writes via PostgREST; RLS allows insert-only for visitors.
   No-ops when supabase-config.js is unfilled or on the /admin page. */
(function () {
  "use strict";

  var cfg = window.SUPABASE_CFG || {};
  if (!cfg.url || !cfg.anonKey) return;
  if (location.pathname.indexOf("/admin") === 0) return; // don't track yourself

  function uid() {
    try { return crypto.randomUUID(); }
    catch (e) { return "v-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10); }
  }
  function stored(store, key) {
    try {
      var v = store.getItem(key);
      if (!v) { v = uid(); store.setItem(key, v); }
      return v;
    } catch (e) { return "no-storage"; }
  }

  var visitorId = stored(localStorage, "corr_vid");
  var sessionId = stored(sessionStorage, "corr_sid");

  function send(type, data) {
    var body = {
      type: type,
      visitor_id: visitorId,
      session_id: sessionId,
      path: location.pathname,
      referrer: document.referrer.slice(0, 300) || null,
      ua: navigator.userAgent.slice(0, 300),
      lang: navigator.language,
      screen: window.screen.width + "x" + window.screen.height,
      theme: document.documentElement.getAttribute("data-theme") || "light",
      data: data || {},
    };
    try {
      fetch(cfg.url + "/rest/v1/events", {
        method: "POST",
        keepalive: true, // survives page unload
        headers: {
          "Content-Type": "application/json",
          apikey: cfg.anonKey,
          Authorization: "Bearer " + cfg.anonKey,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(body),
      }).catch(function () {});
    } catch (e) {}
  }

  // -- pageview ------------------------------------------------------------
  send("pageview");

  // -- clicks on links and buttons ------------------------------------------
  document.addEventListener("click", function (e) {
    var el = e.target.closest("a, button");
    if (!el) return;
    var section = el.closest("section[id], header, nav, footer");
    send("click", {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
      href: el.getAttribute("href") || null,
      section: section ? (section.id || section.tagName.toLowerCase()) : null,
    });
  }, true);

  // -- copied text -----------------------------------------------------------
  document.addEventListener("copy", function () {
    var sel = String(window.getSelection() || "").trim().replace(/\s+/g, " ");
    if (!sel) return;
    send("copy", { text: sel.slice(0, 200), length: sel.length });
  });

  // -- which sections actually get seen (once per pageload) ------------------
  if ("IntersectionObserver" in window) {
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var id = en.target.id;
        if (en.isIntersecting && !seen[id]) {
          seen[id] = true;
          send("section_view", { section: id });
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
