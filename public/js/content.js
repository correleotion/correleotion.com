/* CMS runtime: pull content overrides from Supabase and apply them to any
   element tagged data-cms="key". Missing keys keep the text baked into the
   HTML, so the site works fine even if this fetch fails. Edited at /admin. */
(function () {
  "use strict";

  var cfg = window.SUPABASE_CFG || {};
  if (!cfg.url || !cfg.anonKey) return;

  fetch(cfg.url + "/rest/v1/content?select=key,value", {
    headers: { apikey: cfg.anonKey, Authorization: "Bearer " + cfg.anonKey },
  })
    .then(function (r) { return r.json(); })
    .then(function (rows) {
      if (!Array.isArray(rows)) return;
      rows.forEach(function (row) {
        if (!row.value || typeof row.value.text !== "string") return;
        var el = document.querySelector('[data-cms="' + row.key + '"]');
        if (!el) return;
        el.textContent = row.value.text;
        if (row.value.href && el.tagName === "A") el.setAttribute("href", row.value.href);
      });
    })
    .catch(function () {});
})();
