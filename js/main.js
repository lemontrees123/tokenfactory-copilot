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

  function setupDaoCloudShell() {
    if (document.body.getAttribute("data-page") !== "daocloud-shell") return;

    var layout = document.querySelector(".shell-layout");
    var toggle = document.querySelector(".shell-menu-toggle");
    var searches = Array.prototype.slice.call(
      document.querySelectorAll(".directory-search input")
    );
    var rows = Array.prototype.slice.call(
      document.querySelectorAll(".directory-row:not(.directory-head), .model-row:not(.model-row-head)")
    );

    if (layout && toggle) {
      toggle.addEventListener("click", function () {
        var collapsed = layout.classList.toggle("is-collapsed");
        toggle.setAttribute("aria-label", collapsed ? "展开侧边栏" : "收起侧边栏");
        toggle.setAttribute("title", collapsed ? "展开侧边栏" : "收起侧边栏");
      });
    }

    if (searches.length && rows.length) {
      searches.forEach(function (search) {
        search.addEventListener("input", function () {
          var keyword = search.value.trim().toLowerCase();
          searches.forEach(function (otherSearch) {
            if (otherSearch !== search) {
              otherSearch.value = search.value;
            }
          });
          rows.forEach(function (row) {
            row.hidden = keyword && row.textContent.toLowerCase().indexOf(keyword) === -1;
          });
        });
      });
    }
  }

  setupClickLog();
  setupActiveNav();
  setupDaoCloudShell();
})();
