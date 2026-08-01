(function () {
  "use strict";
  var c = window.SITE_CONFIG;
  var configTools = window.SiteConfigTools;
  function safe(value) {
    return configTools.escapeHTML(value || "");
  }
  function brandLogo(theme) {
    return configTools.logoHTML(theme);
  }
  var services = [
    ["Mobile Application Development", "mobile-app-development.html"],
    ["MVP Development for Startups", "mvp-development.html"],
    ["iOS and Android Applications", "ios-android-applications.html"],
    ["Cross-Platform Development", "cross-platform-development.html"],
    ["UI/UX Design and Prototyping", "ui-ux-design-prototyping.html"],
    ["Business Process Automation", "business-process-automation.html"],
    ["API and Third-Party Integrations", "api-integrations.html"],
    ["Application Maintenance and Support", "app-maintenance-support.html"],
  ];
  function icon(name) {
    return '<i data-lucide="' + name + '"></i>';
  }
  function current() {
    var file = location.pathname.split("/").pop() || "index.html";
    if (file === "") file = "index.html";
    return file;
  }
  function header() {
    return (
      '<header class="site-header site-header--premium" aria-label="Site header">' +
      '<div class="header-inner">' +
      '<a class="site-logo" href="' +
      safe(c.navigation.homeLink) +
      '" aria-label="' +
      safe(c.brand.name) +
      " — " +
      safe(c.navigation.homeLabel) +
      '">' +
      brandLogo("dark") +
      "</a>" +
      '<div class="header-actions">' +
      '<span class="header-status"><i></i>' +
      safe(c.brand.status) +
      "</span>" +
      '<a class="header-cta" href="' +
      safe(c.navigation.contactLink) +
      '"><span>' +
      safe(c.cta.start) +
      "</span><b>" +
      icon("arrow-up-right") +
      "</b></a>" +
      '<button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu">' +
      '<span class="menu-button-lines"><i></i><i></i><i></i></span>' +
      '<span class="sr-only">Menu</span>' +
      icon("menu") +
      "</button>" +
      "</div>" +
      "</div>" +
      "</header>"
    );
  }
  function menu() {
    var nav = [
      [c.navigation.homeLabel, c.navigation.homeLink, "01"],
      [c.navigation.aboutLabel, c.navigation.aboutLink, "02"],
      [c.navigation.servicesLabel, c.navigation.servicesLink, "03"],
      [c.navigation.processLabel, c.navigation.processLink, "04"],
      [c.navigation.contactLabel, c.navigation.contactLink, "05"],
    ];
    var file = current();
    return (
      '<div class="menu-overlay" id="site-menu" aria-hidden="true">' +
      '<aside class="menu-panel" role="dialog" aria-modal="true" aria-label="Site menu">' +
      '<div class="menu-panel-accent" aria-hidden="true"><span>' +
      safe(c.brand.shortName).toUpperCase() +
      "</span><i></i></div>" +
      '<div class="menu-panel-inner">' +
      '<div class="menu-top"><a href="' +
      safe(c.navigation.homeLink) +
      '" aria-label="' +
      safe(c.brand.name) +
      '">' +
      brandLogo("light") +
      '</a><button class="icon-btn menu-close" type="button" aria-label="Close menu">' +
      icon("x") +
      "</button></div>" +
      '<div class="menu-kicker"><span>Navigation</span><span>' +
      safe(c.brand.tagline) +
      '</span></div><nav class="primary-menu" aria-label="Primary">' +
      nav
        .map(function (n) {
          var active =
            file === n[1].split("#")[0] ? ' aria-current="page"' : "";
          return (
            '<a href="' +
            safe(n[1]) +
            '"' +
            active +
            "><small>" +
            safe(n[2]) +
            "</small>" +
            safe(n[0]) +
            "</a>"
          );
        })
        .join("") +
      '</nav><div class="menu-lower"><div class="menu-services"><h2>What We Build</h2><div class="menu-service-list">' +
      services
        .map(function (s) {
          return '<a href="' + safe(s[1]) + '">' + safe(s[0]) + "</a>";
        })
        .join("") +
      '</div></div><div class="menu-contact"><span class="menu-contact-label">Start a useful conversation</span><a class="menu-email" href="mailto:' +
      safe(c.contact.email) +
      '">' +
      safe(c.contact.email) +
      "</a><address>" +
      safe(c.contact.address) +
      '</address><a class="menu-project-link" href="' +
      safe(c.navigation.contactLink) +
      '"><span>' +
      safe(c.cta.start) +
      "</span><b>" +
      icon("arrow-up-right") +
      '</b></a></div></div><div class="menu-legal"><a href="' +
      safe(c.legal.privacyLink) +
      '">' +
      safe(c.legal.privacyLabel) +
      '</a><a href="' +
      safe(c.legal.termsLink) +
      '">' +
      safe(c.legal.termsLabel) +
      '</a><a href="' +
      safe(c.legal.cookiesLink) +
      '">' +
      safe(c.legal.cookiesLabel) +
      "</a></div></div></aside></div>"
    );
  }
  function footer() {
    var currentYear = new Date().getFullYear();
    var copyright =
      "© " +
      currentYear +
      " " +
      c.brand.legalName +
      ". " +
      c.footer.copyrightSuffix;

    return (
      '<footer class="site-footer site-footer--premium"><div class="footer-curve" aria-hidden="true"></div><div class="container"><div class="footer-opening"><span>' +
      safe(c.brand.shortName).toUpperCase() +
      " / " +
      safe(c.brand.status).toUpperCase() +
      "</span><h2>" +
      c.footer.headline +
      '</h2><a class="footer-project-cta" href="' +
      safe(c.navigation.contactLink) +
      '"><span>' +
      safe(c.cta.start) +
      "</span><b>" +
      icon("arrow-up-right") +
      '</b></a></div><div class="footer-lime-line" aria-hidden="true"><i></i></div><div class="footer-top"><div class="footer-brand"><a href="' +
      safe(c.navigation.homeLink) +
      '" aria-label="' +
      safe(c.brand.name) +
      '">' +
      brandLogo("light") +
      "</a><p>" +
      safe(c.footer.description) +
      '</p><span class="footer-kicker">' +
      safe(c.brand.tagline) +
      '</span><a class="footer-email" href="mailto:' +
      safe(c.contact.email) +
      '">' +
      safe(c.contact.email) +
      '</a></div><div class="footer-column"><h2>Navigate</h2><ul><li><a href="' +
      safe(c.navigation.homeLink) +
      '">' +
      safe(c.navigation.homeLabel) +
      '</a></li><li><a href="' +
      safe(c.navigation.aboutLink) +
      '">' +
      safe(c.navigation.aboutLabel) +
      '</a></li><li><a href="' +
      safe(c.navigation.servicesLink) +
      '">' +
      safe(c.navigation.servicesLabel) +
      '</a></li><li><a href="' +
      safe(c.navigation.processLink) +
      '">' +
      safe(c.navigation.processLabel) +
      '</a></li><li><a href="' +
      safe(c.navigation.contactLink) +
      '">' +
      safe(c.navigation.contactLabel) +
      '</a></li></ul></div><div class="footer-column"><h2>Capabilities</h2><ul>' +
      services
        .map(function (s) {
          return (
            '<li><a href="' + safe(s[1]) + '">' + safe(s[0]) + "</a></li>"
          );
        })
        .join("") +
      '</ul></div><div class="footer-address"><span>Studio correspondence</span><address>' +
      safe(c.contact.address) +
      '</address><a href="' +
      safe(c.navigation.contactLink) +
      '">Open the project brief ' +
      icon("arrow-up-right") +
      '</a></div></div><div class="footer-disclaimer" role="note"><span aria-hidden="true"></span><p>' +
      safe(c.brand.name) +
      " " +
      safe(c.footer.disclaimer) +
      '</p></div><div class="footer-bottom"><span>' +
      safe(copyright) +
      '</span><div class="footer-legal"><a href="' +
      safe(c.legal.privacyLink) +
      '">' +
      safe(c.legal.privacyLabel) +
      '</a><a href="' +
      safe(c.legal.termsLink) +
      '">' +
      safe(c.legal.termsLabel) +
      '</a><a href="' +
      safe(c.legal.cookiesLink) +
      '">' +
      safe(c.legal.cookiesLabel) +
      '</a></div><span class="footer-signature">' +
      safe(c.brand.shortName).toUpperCase() +
      "</span></div></div></footer>"
    );
  }
  function shell() {
    document.querySelectorAll("[data-site-header]").forEach(function (el) {
      el.innerHTML = header();
    });
    document.body.insertAdjacentHTML(
      "beforeend",
      menu() +
        '<button class="back-top" type="button" aria-label="Back to top">' +
        icon("chevron-up") +
        "</button>",
    );
    document.querySelectorAll("[data-site-footer]").forEach(function (el) {
      el.innerHTML = footer();
    });
    var loader = document.querySelector(".initial-loader");
    if (!loader) {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div class="initial-loader" aria-hidden="true"><div class="loader-mark"><img src="' +
          safe(c.brand.favicon) +
          '" width="58" height="58" alt=""><span class="loader-label">' +
          safe(c.brand.shortName) +
          " / " +
          safe(c.brand.status) +
          '</span><div class="loader-line"></div></div></div><div class="transition-layer" aria-hidden="true"></div>',
      );
    }
    bindMenu();
    bindBackTop();
    document.dispatchEvent(new CustomEvent("site:shell-ready"));
  }
  function bindMenu() {
    var button = document.querySelector(".menu-button"),
      overlay = document.querySelector(".menu-overlay"),
      panel = document.querySelector(".menu-panel"),
      close = document.querySelector(".menu-close"),
      previous,
      main = document.querySelector("main");
    if (!button || !overlay) return;
    function focusables() {
      return [].slice.call(
        panel.querySelectorAll("a[href],button:not([disabled])"),
      );
    }
    function open() {
      previous = document.activeElement;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
      document.body.classList.add("menu-open");
      if (main) main.inert = true;
      setTimeout(function () {
        close.focus();
      }, 80);
    }
    function shut() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("menu-open");
      if (main) main.inert = false;
      (previous || button).focus();
    }
    button.addEventListener("click", open);
    close.addEventListener("click", shut);
    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) shut();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") shut();
      if (e.key === "Tab") {
        var f = focusables(),
          first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
  function bindBackTop() {
    var b = document.querySelector(".back-top");
    if (!b) return;
    window.addEventListener(
      "scroll",
      function () {
        b.classList.toggle("is-visible", scrollY > 500);
      },
      { passive: true },
    );
    b.addEventListener("click", function () {
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  function accordions() {
    document.querySelectorAll("[data-accordion]").forEach(function (group) {
      group
        .querySelectorAll(".accordion-trigger")
        .forEach(function (button, i) {
          var panel = button.nextElementSibling;
          if (!button.id)
            button.id =
              "accordion-button-" + Math.random().toString(36).slice(2);
          if (!panel.id)
            panel.id = "accordion-panel-" + Math.random().toString(36).slice(2);
          button.setAttribute("aria-controls", panel.id);
          panel.setAttribute("role", "region");
          panel.setAttribute("aria-labelledby", button.id);
          button.addEventListener("click", function () {
            var open = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!open));
            panel.classList.toggle("is-open", !open);
          });
          if (i === 0 && group.dataset.openFirst === "true") {
            button.setAttribute("aria-expanded", "true");
            panel.classList.add("is-open");
          }
        });
    });
  }
  function tabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (root) {
      var buttons = [].slice.call(root.querySelectorAll('[role="tab"]')),
        panels = [].slice.call(root.querySelectorAll('[role="tabpanel"]'));
      buttons.forEach(function (button, i) {
        button.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.setAttribute("aria-selected", "false");
            b.classList.remove("is-active");
          });
          panels.forEach(function (p) {
            p.hidden = true;
          });
          button.setAttribute("aria-selected", "true");
          button.classList.add("is-active");
          var panel = root.querySelector(
            "#" + button.getAttribute("aria-controls"),
          );
          if (panel) panel.hidden = false;
        });
        button.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var next =
              (i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) %
              buttons.length;
            buttons[next].focus();
            buttons[next].click();
          }
        });
      });
    });
  }
  function reveal() {
    requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
      var loader = document.querySelector(".initial-loader");
      if (loader)
        setTimeout(function () {
          loader.classList.add("is-hidden");
        }, 180);
    });
  }
  function panelSelectors() {
    document.querySelectorAll("[data-panel-select]").forEach(function (root) {
      var options = [].slice.call(root.querySelectorAll(".panel-option"));
      function activate(option) {
        options.forEach(function (item) {
          var active = item === option;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
      }
      options.forEach(function (option, i) {
        option.setAttribute(
          "aria-pressed",
          String(option.classList.contains("is-active")),
        );
        option.addEventListener("click", function () {
          activate(option);
        });
        option.addEventListener("keydown", function (e) {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          var next =
            (i + (e.key === "ArrowRight" ? 1 : -1) + options.length) %
            options.length;
          options[next].focus();
          options[next].click();
        });
      });
    });
  }
  function spotlightGroups() {
    var reduced = matchMedia("(prefers-reduced-motion: reduce)");
    document.querySelectorAll("[data-spotlight]").forEach(function (root) {
      var items = [].slice.call(root.querySelectorAll(".spotlight-list li"));
      var visual = root.querySelector(".spotlight-visual");
      var img = visual && visual.querySelector("img");
      if (!items.length || !img) return;
      var timer;
      function activate(item) {
        if (!item || item.classList.contains("is-active")) return;
        var src = item.dataset.image;
        if (!src) return;
        items.forEach(function (el) {
          el.classList.toggle("is-active", el === item);
        });
        window.clearTimeout(timer);
        visual.classList.add("is-changing");
        timer = window.setTimeout(
          function () {
            img.src = src;
            if (item.dataset.alt) img.alt = item.dataset.alt;
            visual.classList.remove("is-changing");
          },
          reduced.matches ? 0 : 200,
        );
      }
      items.forEach(function (item) {
        item.addEventListener("mouseenter", function () {
          activate(item);
        });
        item.addEventListener("focusin", function () {
          activate(item);
        });
        var trigger = item.querySelector("button");
        if (trigger)
          trigger.addEventListener("click", function (e) {
            e.preventDefault();
            activate(item);
          });
      });
    });
  }
  function siteParallax() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var sections = [].slice.call(
      document.querySelectorAll("[data-parallax-section]"),
    );
    if (!sections.length) return;
    var frame = 0;
    function paint() {
      frame = 0;
      sections.forEach(function (section) {
        var image = section.querySelector("[data-parallax-image]");
        if (!image) return;
        var rect = section.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
        var progress =
          (innerHeight - rect.top) / (innerHeight + rect.height) - 0.5;
        image.style.translate = "0 " + (progress * 46).toFixed(1) + "px";
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    schedule();
  }
  function highlightSliders() {
    if (!window.Swiper) return;
    document.querySelectorAll("[data-highlight-slider]").forEach(function (el) {
      if (el.dataset.swiperReady) return;
      el.dataset.swiperReady = "true";
      var pagination = el.querySelector(".service-highlight-pagination");
      var slides = [].slice.call(el.querySelectorAll(".swiper-slide"));
      if (pagination) {
        pagination.innerHTML = slides
          .map(function (_, index) {
            return (
              '<button class="swiper-pagination-bullet" type="button" aria-label="Go to slide ' +
              (index + 1) +
              '"></button>'
            );
          })
          .join("");
      }
      var dots = pagination
        ? [].slice.call(pagination.querySelectorAll("button"))
        : [];
      var swiper = new Swiper(el, {
        loop: true,
        slidesPerView: 1,
        touchThreshold: 18,
        onChange: function (index) {
          dots.forEach(function (dot, i) {
            var active = i === index;
            dot.classList.toggle("swiper-pagination-bullet-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
          });
        },
      });
      swiper.slideNext = function () {
        swiper.index = (swiper.index + 1) % slides.length;
        swiper.update();
      };
      swiper.slidePrev = function () {
        swiper.index = (swiper.index - 1 + slides.length) % slides.length;
        swiper.update();
      };
      var verticalStart = { x: 0, y: 0 };
      var wheelLocked = false;
      el.addEventListener("pointerdown", function (e) {
        verticalStart.x = e.clientX;
        verticalStart.y = e.clientY;
        el.classList.add("is-dragging");
      });
      el.addEventListener("pointerup", function (e) {
        var dx = e.clientX - verticalStart.x;
        var dy = e.clientY - verticalStart.y;
        var mainDelta = Math.abs(dy) > Math.abs(dx) ? dy : dx;
        el.classList.remove("is-dragging");
        if (Math.abs(mainDelta) > 18) {
          mainDelta < 0 ? swiper.slideNext() : swiper.slidePrev();
        }
      });
      el.addEventListener("pointercancel", function () {
        el.classList.remove("is-dragging");
      });
      el.addEventListener(
        "wheel",
        function (e) {
          if (Math.abs(e.deltaY) < 10 || wheelLocked) return;
          e.preventDefault();
          wheelLocked = true;
          e.deltaY > 0 ? swiper.slideNext() : swiper.slidePrev();
          window.setTimeout(function () {
            wheelLocked = false;
          }, 520);
        },
        { passive: false },
      );
      el.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          e.key === "ArrowDown" ? swiper.slideNext() : swiper.slidePrev();
        }
      });
      dots.forEach(function (dot, index) {
        dot.addEventListener("pointerdown", function (e) {
          e.stopPropagation();
        });
        dot.addEventListener("click", function () {
          swiper.slideTo(index);
        });
      });
    });
  }
  function storySwipers() {
    if (!window.Swiper) return;
    document.querySelectorAll("[data-story-swiper]").forEach(function (el) {
      if (el.dataset.swiperReady) return;
      el.dataset.swiperReady = "true";
      var pagination = el.querySelector(".story-swipe-pagination");
      var slides = [].slice.call(el.querySelectorAll(".swiper-slide"));
      if (pagination) {
        pagination.innerHTML = slides
          .map(function (_, index) {
            return (
              '<button class="swiper-pagination-bullet" type="button" aria-label="Go to slide ' +
              (index + 1) +
              '"></button>'
            );
          })
          .join("");
      }
      var dots = pagination
        ? [].slice.call(pagination.querySelectorAll("button"))
        : [];
      var previousIndex = 0;
      var storyTimer;
      var swiper = new Swiper(el, {
        loop: true,
        slidesPerView: 1,
        touchThreshold: 14,
        onChange: function (index) {
          var direction =
            index === previousIndex
              ? "next"
              : index > previousIndex || (previousIndex === slides.length - 1 && index === 0)
                ? "next"
                : "prev";
          if (index !== previousIndex && slides[previousIndex]) {
            slides[previousIndex].classList.remove(
              "is-story-leaving",
              "is-story-leaving-next",
              "is-story-leaving-prev",
            );
            slides[previousIndex].classList.add(
              "is-story-leaving",
              "is-story-leaving-" + direction,
            );
          }
          el.classList.remove("is-story-next", "is-story-prev");
          void el.offsetWidth;
          el.classList.add("is-story-" + direction);
          window.clearTimeout(storyTimer);
          storyTimer = window.setTimeout(function () {
            el.classList.remove("is-story-next", "is-story-prev");
            slides.forEach(function (slide) {
              slide.classList.remove(
                "is-story-leaving",
                "is-story-leaving-next",
                "is-story-leaving-prev",
              );
            });
          }, 920);
          dots.forEach(function (dot, dotIndex) {
            var active = dotIndex === index;
            dot.classList.toggle("swiper-pagination-bullet-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
          });
          previousIndex = index;
        },
      });
      swiper.slideNext = function () {
        swiper.index = (swiper.index + 1) % slides.length;
        swiper.update();
      };
      swiper.slidePrev = function () {
        swiper.index = (swiper.index - 1 + slides.length) % slides.length;
        swiper.update();
      };
      dots.forEach(function (dot, index) {
        dot.addEventListener("pointerdown", function (e) {
          e.stopPropagation();
        });
        dot.addEventListener("click", function () {
          swiper.slideTo(index);
        });
      });
      if (dots[0]) dots[0].classList.add("swiper-pagination-bullet-active");
    });
  }
  function menuInert() {
    var overlay = document.querySelector(".menu-overlay");
    if (!overlay) return;
    overlay.inert = true;
    new MutationObserver(function () {
      overlay.inert = !overlay.classList.contains("is-open");
    }).observe(overlay, { attributes: true, attributeFilter: ["class"] });
  }
  function init() {
    shell();
    menuInert();
    if (window.SiteConfigTools) SiteConfigTools.render(document);
    accordions();
    tabs();
    panelSelectors();
    spotlightGroups();
    siteParallax();
    storySwipers();
    highlightSliders();
    if (window.lucide) lucide.createIcons();
    if (window.AOS)
      AOS.init({
        once: true,
        duration: 700,
        offset: 60,
        easing: "ease-out-cubic",
      });
    if (window.PageTransition) PageTransition.init();
    reveal();
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();

function initGlobalStickySystem() {
  const root = document.documentElement;
  const headerHost = document.querySelector("[data-site-header]");

  let observedHeader = null;
  let headerResizeObserver = null;
  let mutationObserver = null;

  const getStickyGap = () => {
    return window.matchMedia("(max-width: 900px)").matches ? 18 : 24;
  };

  const updateStickyOffset = () => {
    const header = document.querySelector(".site-header");

    if (!header) {
      return false;
    }

    const rect = header.getBoundingClientRect();
    const stickyTop = Math.ceil(rect.bottom + getStickyGap());

    root.style.setProperty("--header-h", `${Math.ceil(rect.height)}px`);
    root.style.setProperty("--sticky-top", `${stickyTop}px`);

    return true;
  };

  const observeHeader = () => {
    const header = document.querySelector(".site-header");

    if (!header || header === observedHeader) {
      return Boolean(header);
    }

    observedHeader = header;

    if (headerResizeObserver) {
      headerResizeObserver.disconnect();
    }

    if ("ResizeObserver" in window) {
      headerResizeObserver = new ResizeObserver(() => {
        updateStickyOffset();
      });

      headerResizeObserver.observe(header);
    }

    updateStickyOffset();

    return true;
  };

  const start = () => {
    if (!observeHeader() && headerHost) {
      mutationObserver = new MutationObserver(() => {
        if (observeHeader()) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(headerHost, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener(
      "resize",
      () => {
        window.requestAnimationFrame(updateStickyOffset);
      },
      { passive: true },
    );

    window.addEventListener("load", updateStickyOffset, { once: true });
  };

  start();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalStickySystem);
} else {
  initGlobalStickySystem();
}
