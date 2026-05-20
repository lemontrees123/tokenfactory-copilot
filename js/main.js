(function () {
  "use strict";

  function now() {
    var d = new Date();
    return d.toLocaleString("zh-CN", { hour12: false });
  }

  function setupClickLog() {
    var log = document.getElementById("activity-log");
    if (!log) return;
    document.addEventListener("click", function (event) {
      var link = event.target.closest("[data-log]");
      if (!link) return;
      var item = document.createElement("li");
      item.textContent = now() + " - " + link.getAttribute("data-log");
      log.prepend(item);
      while (log.children.length > 8) {
        log.removeChild(log.lastChild);
      }
    });
  }

  function setupActiveNav() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    var links = document.querySelectorAll("[data-page-link]");
    links.forEach(function (node) {
      if (node.getAttribute("data-page-link") === page) {
        node.classList.add("btn-primary");
      }
    });
  }

  setupClickLog();
  setupActiveNav();
})();
