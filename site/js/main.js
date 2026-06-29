/* Portfolio behaviour: language + theme toggles, with localStorage persistence.
   Translation strings live in i18n.js (window.I18N). */
(function () {
  "use strict";

  var root = document.documentElement;
  var dict = window.I18N || { en: {}, th: {} };

  function currentLang() {
    return root.getAttribute("lang") === "th" ? "th" : "en";
  }

  function applyLang(lang) {
    var table = dict[lang] || dict.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key in table) el.textContent = table[key];
    });
    root.setAttribute("lang", lang);
    // lang toggle button shows the language you would switch TO
    var langBtn = document.querySelector('[data-action="toggle-lang"]');
    if (langBtn) langBtn.textContent = lang === "en" ? "ไทย" : "EN";
  }

  function applyThemeLabels() {
    var dark = root.getAttribute("data-theme") === "dark";
    var icon = document.querySelector('[data-role="theme-icon"]');
    var label = document.querySelector('[data-role="theme-label"]');
    if (icon) icon.textContent = dark ? "○" : "●";
    if (label) label.textContent = dark ? "LIGHT" : "DARK";
  }

  function toggleLang() {
    var next = currentLang() === "en" ? "th" : "en";
    applyLang(next);
    try { localStorage.setItem("lang", next); } catch (e) {}
  }

  function toggleTheme() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    applyThemeLabels();
    try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.dataset.action === "toggle-lang") toggleLang();
    if (btn.dataset.action === "toggle-theme") toggleTheme();
  });

  // initial paint (the inline head script already set lang/theme attributes)
  applyLang(currentLang());
  applyThemeLabels();
})();
