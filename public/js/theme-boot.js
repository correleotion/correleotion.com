/* Applies the saved theme before first paint (loaded synchronously in <head>). */
(function () {
  try {
    var t = localStorage.getItem("theme");
    var a = localStorage.getItem("accent");
    var el = document.documentElement;
    if (t) el.setAttribute("data-theme", t);
    if (a) el.setAttribute("data-accent", a);
  } catch (e) {}
})();
