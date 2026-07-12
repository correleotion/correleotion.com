/* CMS runtime: pull content overrides from Supabase and apply them to any
   element tagged data-cms="key". Missing keys keep the text baked into the
   HTML, so the site works fine even if this fetch fails. Edited at /admin.

   "extra.*" rows hold items ADDED from the CMS (new jobs, awards, posts):
   the last matching row in that section is cloned and filled in, so added
   items inherit the exact styling of the built-in ones. */
(function () {
  "use strict";

  var cfg = window.SUPABASE_CFG || {};
  if (!cfg.url || !cfg.anonKey) return;

  var EXTRAS = {
    "extra.exp": {
      container: "#experience .timeline",
      row: ".timeline__row",
      map: { time: ".timeline__time", role: ".timeline__title", sub: ".timeline__sub", desc: ".timeline__desc" },
    },
    "extra.awards": {
      container: "#awards .timeline",
      row: ".timeline__row",
      map: { place: ".timeline__place span:last-child", name: ".timeline__title", sub: ".timeline__sub", desc: ".timeline__desc" },
    },
    "extra.writing": {
      container: "#writing .timeline",
      row: "a.writing-row",
      map: { date: ".writing-row__date", name: ".writing-row__title" },
    },
  };

  function renderExtras(def, items) {
    var container = document.querySelector(def.container);
    if (!container || !Array.isArray(items)) return;
    // template = first row that has every mapped element
    var tpl = null;
    container.querySelectorAll(def.row).forEach(function (r) {
      if (!tpl && Object.keys(def.map).every(function (f) { return r.querySelector(def.map[f]); })) tpl = r;
    });
    if (!tpl) return;
    // keep any "[ add ]" placeholder row at the very end
    var addNote = container.querySelector(".timeline__add");
    var anchor = addNote ? addNote.closest(def.row) : null;
    items.forEach(function (it) {
      var c = tpl.cloneNode(true);
      c.querySelectorAll("[data-cms]").forEach(function (el) { el.removeAttribute("data-cms"); });
      c.querySelectorAll("img").forEach(function (img) { img.remove(); }); // added items have no logo
      Object.keys(def.map).forEach(function (f) {
        var el = c.querySelector(def.map[f]);
        if (el) el.textContent = it[f] || "";
      });
      if (c.tagName === "A") c.setAttribute("href", it.href || "#");
      container.insertBefore(c, anchor);
    });
  }

  fetch(cfg.url + "/rest/v1/content?select=key,value", {
    headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey },
  })
    .then(function (r) { return r.json(); })
    .then(function (rows) {
      if (!Array.isArray(rows)) return;
      // text overrides first, then added items (clones pick up overridden styling)
      rows.forEach(function (row) {
        if (row.key.indexOf("extra.") === 0 || !row.value || typeof row.value.text !== "string") return;
        var el = document.querySelector('[data-cms="' + row.key + '"]');
        if (!el) return;
        el.textContent = row.value.text;
        if (row.value.href && el.tagName === "A") el.setAttribute("href", row.value.href);
      });
      rows.forEach(function (row) {
        if (EXTRAS[row.key] && row.value) renderExtras(EXTRAS[row.key], row.value.items);
      });
    })
    .catch(function () {});
})();
