(function () {
  "use strict";
  function slider(selector, prev, next, pagination, breakpoints) {
    var el = document.querySelector(selector);
    if (!el || !window.Swiper || el.dataset.swiperReady) return;
    el.dataset.swiperReady = "true";
    new Swiper(el, {
      slidesPerView: 1,
      navigation: { prevEl: prev, nextEl: next },
      pagination: { el: pagination },
      keyboard: { enabled: true },
      breakpoints: breakpoints || {},
    });
  }
  function init() {
    var buttons = [].slice.call(
      document.querySelectorAll(".diagnostic-button"),
    );
    var answer = document.querySelector(".diagnostic-answer p");
    var copy = [
      "Identify the people who experience the problem often enough to need a dedicated product.",
      "Separate a repeated operational or customer problem from a one-off inconvenience.",
      "Find the one journey that must work clearly before secondary features are considered.",
      "Define the minimum complete experience rather than disconnected functions.",
      "Map external systems early because they affect scope, states, security, and testing.",
    ];
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        buttons.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        if (answer) answer.textContent = copy[index];
      });
    });
    slider(
      ".timeline-swiper",
      ".timeline-prev",
      ".timeline-next",
      ".timeline-fraction",
      { 700: { slidesPerView: 2 }, 1100: { slidesPerView: 4 } },
    );
    slider(
      ".expertise-swiper",
      ".expertise-prev",
      ".expertise-next",
      ".expertise-fraction",
      { 700: { slidesPerView: 1.5 }, 1100: { slidesPerView: 2.35 } },
    );
    slider(
      ".collab-swiper",
      ".collab-prev",
      ".collab-next",
      ".collab-fraction",
      { 760: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } },
    );
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
