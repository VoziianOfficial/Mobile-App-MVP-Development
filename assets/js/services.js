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
    var buttons = [].slice.call(document.querySelectorAll(".selector-button"));
    var title = document.querySelector(".selector-display h3");
    var copy = document.querySelector(".selector-display p");
    var data = [
      [
        "Booking applications",
        "Guide customers from service selection to a confirmed appointment.",
      ],
      [
        "Internal tools",
        "Give teams a clear operational view of requests, ownership, and status.",
      ],
      [
        "Client portals",
        "Provide secure access to documents, progress, and communication.",
      ],
      [
        "Subscription products",
        "Connect plan selection, access state, payments, and account controls.",
      ],
      [
        "Service management",
        "Coordinate requests, field work, status, and customer visibility.",
      ],
      [
        "E-commerce applications",
        "Bring discovery, checkout, order state, and account access together.",
      ],
    ];
    buttons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        buttons.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        title.textContent = data[index][0];
        copy.textContent = data[index][1];
      });
    });
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
      ".capability-swiper",
      ".capability-prev",
      ".capability-next",
      ".capability-fraction",
    );
    initSlider(
      ".prototype-swiper",
      ".prototype-prev",
      ".prototype-next",
      ".prototype-fraction",
      { 720: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } },
    );
    initSlider(
      ".services-related-swiper",
      ".services-related-prev",
      ".services-related-next",
      ".services-related-fraction",
    );
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
