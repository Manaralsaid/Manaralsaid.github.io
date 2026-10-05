(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persisted + respects system preference)
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");
  applyTheme(initial);

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeToggle) {
      var icon = themeToggle.querySelector(".theme-icon");
      if (icon) icon.textContent = mode === "dark" ? "☀" : "☾";
      themeToggle.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Mobile nav toggle
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu when a link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Publication filter
  var chips = document.querySelectorAll(".filter-chip");
  var pubItems = document.querySelectorAll("#pub-list li");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      pubItems.forEach(function (item) {
        var show = filter === "all" || item.getAttribute("data-type") === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
})();
