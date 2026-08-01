(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var refreshTimer = 0;

  function refreshHardDebounced() {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(function () {
      if (window.AOS && typeof window.AOS.refreshHard === "function") {
        window.AOS.refreshHard();
      }
    }, 120);
  }

  function revealImmediately() {
    document.querySelectorAll("[data-aos]").forEach(function (element) {
      element.classList.add("aos-animate");
    });
  }

  function init() {
    if (reducedMotion || !window.AOS) {
      revealImmediately();
      return;
    }

    document.documentElement.classList.add("aos-enabled");

    window.AOS.init({
      once: true,
      duration: 750,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      offset: 70,
      delay: 0,
      anchorPlacement: "top-bottom",
    });

    document.addEventListener("site:shell-ready", refreshHardDebounced, {
      once: true,
    });
    document.addEventListener("service:content-ready", refreshHardDebounced, {
      once: true,
    });

    window.addEventListener(
      "pageshow",
      function () {
        refreshHardDebounced();
      },
      { once: true },
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
