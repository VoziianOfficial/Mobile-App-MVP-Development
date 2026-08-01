(function () {
  "use strict";
  function initProductDiagram() {
    var diagram = document.querySelector(".product-diagram");
    var output = document.querySelector("[data-intro-dynamic]");
    if (!diagram || !output) return;
    var buttons = [].slice.call(diagram.querySelectorAll("button[data-intro-text]"));
    if (!buttons.length) return;
    var timer = 0;
    function activate(button) {
      var text = button.getAttribute("data-intro-text");
      if (!text || output.textContent.trim() === text.trim()) return;
      buttons.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      output.classList.add("is-changing");
      clearTimeout(timer);
      timer = setTimeout(function () {
        output.textContent = text;
        output.classList.remove("is-changing");
      }, 120);
    }
    buttons.forEach(function (button) {
      button.addEventListener("mouseenter", function () {
        activate(button);
      });
      button.addEventListener("focus", function () {
        activate(button);
      });
      button.addEventListener("click", function () {
        activate(button);
      });
    });
  }
  function initCollabSwiper() {
    var el = document.querySelector("[data-collab-swiper]");
    if (!el || !window.Swiper || el.dataset.swiperReady) return;
    el.dataset.swiperReady = "true";
    var section = el.closest(".collab-testimonials-section");
    var dotsWrap = section && section.querySelector(".collab-swiper-dots");
    var dots = [];
    var buttons = section
      ? [].slice.call(section.querySelectorAll(".collab-swiper-btn"))
      : [];
    function maxIndex(swiper) {
      return Math.max(0, Math.ceil(swiper.slides.length - swiper.perView()));
    }
    function syncControls(swiper) {
      buttons.forEach(function (button) {
        button.classList.remove("swiper-button-disabled");
      });
      dots.forEach(function (dot, dotIndex) {
        var active = dotIndex === swiper.index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    }
    var swiper = new Swiper(el, {
      slidesPerView: 1,
      navigation: {
        prevEl: ".collab-swiper-prev",
        nextEl: ".collab-swiper-next",
      },
      keyboard: { enabled: true },
      breakpoints: {
        700: { slidesPerView: 2 },
      },
      onChange: function (index, instance) {
        if (instance) syncControls(instance);
      },
    });
    var update = swiper.update.bind(swiper);
    swiper.update = function () {
      update();
      syncControls(swiper);
    };
    swiper.slideNext = function () {
      var max = maxIndex(swiper);
      swiper.index = swiper.index >= max ? 0 : swiper.index + 1;
      swiper.update();
    };
    swiper.slidePrev = function () {
      var max = maxIndex(swiper);
      swiper.index = swiper.index <= 0 ? max : swiper.index - 1;
      swiper.update();
    };
    function buildDots() {
      if (!dotsWrap) return;
      var total = maxIndex(swiper) + 1;
      dotsWrap.innerHTML = Array(total + 1)
        .join("x")
        .split("")
        .map(function (_, index) {
          return (
            '<button class="collab-dot" type="button" aria-label="Go to feedback group ' +
            (index + 1) +
            '"></button>'
          );
        })
        .join("");
      dots = [].slice.call(dotsWrap.querySelectorAll(".collab-dot"));
      dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          swiper.slideTo(index);
          syncControls(swiper);
        });
      });
      syncControls(swiper);
    }
    buildDots();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        swiper.index = Math.min(swiper.index, maxIndex(swiper));
        swiper.update();
        buildDots();
      }, 120);
    });
  }
  function init() {
    initProductDiagram();
    initCollabSwiper();
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
