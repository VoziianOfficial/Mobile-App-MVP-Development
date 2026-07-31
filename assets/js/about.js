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
