(function () {
  "use strict";
  function initSlider(selector, prev, next, fraction, breakpoints) {
    var el = document.querySelector(selector);
    if (!el || !window.Swiper || el.dataset.swiperReady) return;
    el.dataset.swiperReady = "true";
    new Swiper(el, {
      slidesPerView: 1,
      navigation: { prevEl: prev, nextEl: next },
      pagination: { el: fraction },
      keyboard: { enabled: true },
      breakpoints: breakpoints || {},
    });
  }
  function init() {
    var options = [].slice.call(document.querySelectorAll(".scope-option"));
    var layers = [].slice.call(document.querySelectorAll(".blueprint-layer"));
    options.forEach(function (option, index) {
      option.addEventListener("click", function () {
        var active = option.classList.toggle("is-active");
        option.setAttribute("aria-pressed", String(active));
        if (layers[index]) layers[index].classList.toggle("is-active", active);
      });
    });
    initSlider(
      ".prototype-swiper",
      ".prototype-prev",
      ".prototype-next",
      ".prototype-fraction",
      { 720: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } },
    );
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
