// Runs before the page is drawn: applies the saved light/dark choice so there is no flash.
// (If nothing was saved, the CSS follows the system theme on its own.)
(function () {
  try {
    var saved = localStorage.getItem("ats-theme");
    if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);
  } catch (e) { }
})();
