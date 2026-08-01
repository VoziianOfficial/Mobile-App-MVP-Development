(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function developmentPath() {
    var section = document.querySelector(".idea-editorial");
    var root = section && section.querySelector(".idea-media");
    if (!section || !root) return;

    var stages = [].slice.call(root.querySelectorAll(".path-stage"));
    var title = root.querySelector("#path-visual-title");
    var copy = root.querySelector("#path-visual-state");
    var progress = root.querySelector("#path-progress");
    var ideaCopy = section.querySelector(".idea-copy");
    var ideaHeading = ideaCopy && ideaCopy.querySelector("h2");
    var ideaText = ideaCopy && ideaCopy.querySelector("p");
    var photo = root.querySelector(".idea-photo");
    var photoImage = photo && photo.querySelector("img");
    var timer;
    var copyTimer;
    var imageTimer;

    function activate(stage, moveFocus) {
      if (!stage || stage.classList.contains("is-active")) return;
      window.clearTimeout(timer);
      window.clearTimeout(copyTimer);
      window.clearTimeout(imageTimer);
      stages.forEach(function (item) {
        var active = item === stage;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
      });

      if (copy && title && progress) {
        copy.classList.add("is-changing");
        title.classList.add("is-changing");
        timer = window.setTimeout(
          function () {
            title.textContent = stage.dataset.title;
            copy.textContent = stage.dataset.copy;
            progress.textContent = stage.dataset.progress;
            copy.classList.remove("is-changing");
            title.classList.remove("is-changing");
          },
          reducedMotion.matches ? 0 : 130,
        );
      }

      if (ideaCopy && ideaHeading && ideaText) {
        ideaCopy.classList.add("is-changing");
        copyTimer = window.setTimeout(
          function () {
            ideaHeading.innerHTML = stage.dataset.copyTitle || stage.dataset.title;
            ideaText.textContent = stage.dataset.copyText || stage.dataset.copy;
            ideaCopy.classList.remove("is-changing");
          },
          reducedMotion.matches ? 0 : 150,
        );
      }

      if (photo && photoImage && stage.dataset.image) {
        photo.classList.add("is-changing");
        imageTimer = window.setTimeout(
          function () {
            photoImage.src = stage.dataset.image;
            photoImage.alt = stage.dataset.imageAlt || "";
            photo.classList.remove("is-changing");
          },
          reducedMotion.matches ? 0 : 150,
        );
      }
      if (moveFocus) stage.focus();
    }

    stages.forEach(function (stage, index) {
      stage.tabIndex = index === 0 ? 0 : -1;
      stage.addEventListener("click", function () {
        activate(stage, false);
      });
      stage.addEventListener("pointerenter", function (event) {
        if (event.pointerType !== "touch") activate(stage, false);
      });
      stage.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        var direction = event.key === "ArrowRight" ? 1 : -1;
        var next = (index + direction + stages.length) % stages.length;
        activate(stages[next], true);
      });
    });
  }

  function additionalSwipers() {
    if (!window.Swiper) return;
    var media = document.querySelector(".service-media-swiper");
    if (media && !media.dataset.swiperReady) {
      media.dataset.swiperReady = "true";
      var mediaTabs = [].slice.call(
        document.querySelectorAll(".service-media-tabs button"),
      );
      var mediaSwiper = new Swiper(media, {
        slidesPerView: 1,
        navigation: {
          prevEl: ".service-media-prev",
          nextEl: ".service-media-next",
        },
        pagination: { el: ".service-media-fraction" },
        keyboard: { enabled: true },
        onChange: function (index) {
          mediaTabs.forEach(function (tab, tabIndex) {
            tab.classList.toggle("is-active", tabIndex === index);
          });
        },
      });
      mediaTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          mediaSwiper.slideTo(tab.dataset.slide);
        });
      });
    }

    var stories = document.querySelector(".product-story-swiper");
    if (stories && !stories.dataset.swiperReady) {
      stories.dataset.swiperReady = "true";
      new Swiper(stories, {
        slidesPerView: 1.08,
        navigation: {
          prevEl: ".product-story-prev",
          nextEl: ".product-story-next",
        },
        pagination: { el: ".product-story-fraction" },
        keyboard: { enabled: true },
        breakpoints: {
          700: { slidesPerView: 1.35 },
          1100: { slidesPerView: 1.6 },
        },
      });
    }

    [
      [
        ".project-model-swiper",
        ".project-model-prev",
        ".project-model-next",
        ".project-model-fraction",
        1,
      ],
    ].forEach(function (settings) {
      var el = document.querySelector(settings[0]);
      if (!el || el.dataset.swiperReady) return;
      el.dataset.swiperReady = "true";
      new Swiper(el, {
        slidesPerView: settings[4],
        navigation: { prevEl: settings[1], nextEl: settings[2] },
        pagination: { el: settings[3] },
        keyboard: { enabled: true },
      });
    });
  }

  function tiltedStages() {
    var button = document.querySelector(".tilted-more button");
    if (!button) return;
    button.addEventListener("click", function () {
      var card = button.closest(".tilted-more");
      var open = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    });
  }

  function factEntrance() {
    var section = document.querySelector(".home-facts");
    if (
      !section ||
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    )
      return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
  }

  function maskReveals() {
    var masks = [].slice.call(document.querySelectorAll(".mask-reveal"));
    if (!masks.length) return;
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      masks.forEach(function (mask) {
        mask.classList.add("is-revealed");
      });
      return;
    }
    function revealVisible() {
      masks.forEach(function (mask) {
        var rect = mask.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
          mask.classList.add("is-revealed");
        }
      });
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.22 },
    );
    masks.forEach(function (mask) {
      observer.observe(mask);
    });
    window.addEventListener("scroll", revealVisible, { passive: true });
    requestAnimationFrame(revealVisible);
  }

  function heroParallax() {
    var hero = document.querySelector("[data-hero-parallax]");
    if (!hero || reducedMotion.matches) return;
    var layers = [].slice.call(
      hero.querySelectorAll(".hero-layer[data-depth]"),
    );
    var pointerX = 0;
    var pointerY = 0;
    var scrollShift = 0;
    var frame = 0;

    function paint() {
      frame = 0;
      layers.forEach(function (layer) {
        var depth = Number(layer.dataset.depth || 0);
        var x = pointerX * depth * 15;
        var y = pointerY * depth * 10 + scrollShift * depth;
        layer.style.translate = x.toFixed(2) + "px " + y.toFixed(2) + "px";
      });
    }
    function requestPaint() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    hero.addEventListener("pointermove", function (event) {
      var rect = hero.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      requestPaint();
    });
    hero.addEventListener("pointerleave", function () {
      pointerX = 0;
      pointerY = 0;
      requestPaint();
    });
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY < hero.offsetHeight + 180) {
          scrollShift = Math.min(window.scrollY * 0.075, 65);
          requestPaint();
        }
      },
      { passive: true },
    );
  }

  function heroPageSearch() {
    var root = document.querySelector("[data-page-search]");
    if (!root) return;
    var input = root.querySelector("[data-page-search-input]");
    var results = root.querySelector("[data-page-search-results]");
    var pages = [
      ["Home", "index.html"],
      ["About Kovexa Studio", "about.html"],
      ["Services overview", "services.html"],
      ["Contact & project brief", "contact.html"],
      ["Mobile Application Development", "mobile-app-development.html"],
      ["MVP Development for Startups", "mvp-development.html"],
      ["iOS and Android Applications", "ios-android-applications.html"],
      ["Cross-Platform Development", "cross-platform-development.html"],
      ["UI/UX Design and Prototyping", "ui-ux-design-prototyping.html"],
      ["Business Process Automation", "business-process-automation.html"],
      ["API and Third-Party Integrations", "api-integrations.html"],
      [
        "Application Maintenance and Support",
        "app-maintenance-support.html",
      ],
    ];

    function render(query) {
      var q = query.trim().toLowerCase();
      if (!q) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }
      var matches = pages.filter(function (page) {
        return page[0].toLowerCase().indexOf(q) !== -1;
      });
      var limit = window.matchMedia("(max-width: 560px)").matches ? 4 : 3;
      results.innerHTML = matches.length
        ? matches
            .slice(0, limit)
            .map(function (page) {
              return (
                '<a href="' +
                page[1] +
                '">' +
                page[0] +
                '<i data-lucide="arrow-up-right"></i></a>'
              );
            })
            .join("")
        : '<span class="hero-page-search-empty">No pages found</span>';
      results.hidden = false;
      if (window.lucide) lucide.createIcons();
    }

    input.addEventListener("input", function () {
      render(input.value);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) render(input.value);
    });
    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) results.hidden = true;
    });
    root.addEventListener("submit", function (event) {
      event.preventDefault();
      var first = results.querySelector("a");
      if (first) window.location.href = first.getAttribute("href");
    });
  }

  function init() {
    developmentPath();
    additionalSwipers();
    tiltedStages();
    factEntrance();
    maskReveals();
    heroParallax();
    heroPageSearch();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
