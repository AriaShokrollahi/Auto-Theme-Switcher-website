// Apply the scheduled theme before the page is drawn to avoid a flash.
(function () {
  var hour = new Date().getHours();
  document.documentElement.setAttribute("data-theme", hour >= 7 && hour < 19 ? "light" : "dark");
})();
