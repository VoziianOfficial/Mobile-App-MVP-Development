(function () {
  "use strict";

  var config = window.SITE_CONFIG;

  if (!config || typeof config !== "object") {
    console.error("SITE_CONFIG is not available.");
    return;
  }

  function getValue(path, fallback) {
    if (!path) {
      return fallback;
    }

    var value = path.split(".").reduce(function (current, key) {
      if (
        current &&
        typeof current === "object" &&
        Object.prototype.hasOwnProperty.call(current, key)
      ) {
        return current[key];
      }

      return undefined;
    }, config);

    return value === undefined || value === null ? fallback : value;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getElements(root, selector) {
    var elements = [];

    if (root instanceof Element && root.matches(selector)) {
      elements.push(root);
    }

    if (root.querySelectorAll) {
      elements = elements.concat(
        Array.prototype.slice.call(root.querySelectorAll(selector)),
      );
    }

    return elements;
  }

  function logoHTML(theme) {
    var brand = config.brand || {};
    var logo = brand.logo || {};

    var tone = theme === "light" ? "light" : "dark";
    var type = logo.type || "icon-text";

    var word = logo.word || brand.shortName || brand.name || "";

    var label = logo.label || "";

    var iconSource = tone === "light" ? logo.iconLight : logo.iconDark;

    var className =
      "brand-lockup brand-lockup--" +
      tone +
      " brand-lockup--" +
      type;

    if (type === "text") {
      return (
        '<span class="' +
        className +
        '">' +
        '<span class="brand-lockup__word">' +
        escapeHTML(word) +
        "</span>" +
        "</span>"
      );
    }

    return (
      '<span class="' +
      className +
      '">' +
      '<span class="brand-lockup__mark">' +
      (iconSource
        ? '<img src="' +
          escapeHTML(iconSource) +
          '" alt="" width="58" height="58" aria-hidden="true">'
        : "") +
      "</span>" +
      '<span class="brand-lockup__word">' +
      escapeHTML(word) +
      "</span>" +
      (label
        ? '<span class="brand-lockup__label"><span>' +
          escapeHTML(label) +
          "</span></span>"
        : "") +
      (logo.showBadge === false
        ? ""
        : '<span class="brand-lockup__badge" aria-hidden="true"><i></i><i></i></span>') +
      "</span>"
    );
  }

  function renderTextValues(root) {
    getElements(root, "[data-config]").forEach(function (element) {
      var path = element.getAttribute("data-config");
      var value = getValue(path, "");

      element.textContent = String(value);
    });

    getElements(root, "[data-config-html]").forEach(function (element) {
      var path = element.getAttribute("data-config-html");
      var value = getValue(path, "");

      element.innerHTML = String(value);
    });
  }

  function renderLinks(root) {
    getElements(root, "[data-config-href]").forEach(function (element) {
      var path = element.getAttribute("data-config-href");
      var value = String(getValue(path, "")).trim();

      if (!value) {
        return;
      }

      var type = element.getAttribute("data-config-href-type");

      if (!type && path.toLowerCase().includes("email")) {
        type = "email";
      }

      if (type === "email") {
        element.href = "mailto:" + value;
        return;
      }

      if (type === "phone") {
        element.href = "tel:" + value.replace(/[^\d+]/g, "");
        return;
      }

      element.href = value;
    });
  }

  function renderSources(root) {
    getElements(root, "[data-config-src]").forEach(function (element) {
      var path = element.getAttribute("data-config-src");
      var value = String(getValue(path, "")).trim();

      if (value) {
        element.src = value;
      }
    });
  }

  function renderAttributes(root) {
    getElements(root, "[data-config-content]").forEach(function (element) {
      var path = element.getAttribute("data-config-content");
      element.setAttribute("content", String(getValue(path, "")));
    });

    getElements(root, "[data-config-placeholder]").forEach(function (element) {
      var path = element.getAttribute("data-config-placeholder");
      element.setAttribute("placeholder", String(getValue(path, "")));
    });

    getElements(root, "[data-config-aria-label]").forEach(function (element) {
      var path = element.getAttribute("data-config-aria-label");
      element.setAttribute("aria-label", String(getValue(path, "")));
    });
  }

  function fillSelects(root) {
    [
      ["[name=\"inquiry_type\"]", "forms.inquiryOptions", "Select an inquiry type"],
      ["[name=\"service\"]", "forms.serviceOptions", "Select a service"],
      [
        "[name=\"product_stage\"]",
        "forms.stageOptions",
        "Select a stage (optional)",
      ],
      [
        "[name=\"timeline\"]",
        "forms.timelineOptions",
        "Select a timeline (optional)",
      ],
    ].forEach(function (settings) {
      var items = getValue(settings[1], []);

      if (!Array.isArray(items)) {
        return;
      }

      getElements(root, settings[0]).forEach(function (select) {
        if (select.options.length > 1) {
          return;
        }

        if (select.options[0]) {
          select.options[0].textContent = settings[2];
        }

        items.forEach(function (item) {
          var option = document.createElement("option");
          option.value = item;
          option.textContent = item;
          select.appendChild(option);
        });
      });
    });
  }

  function renderLogos(root) {
    getElements(root, "[data-brand-logo]").forEach(function (element) {
      var theme = element.getAttribute("data-brand-logo") || "dark";
      element.innerHTML = logoHTML(theme);
    });
  }

  function renderFavicon() {
    var favicon = getValue("brand.favicon", "");

    if (!favicon) {
      return;
    }

    document
      .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
      .forEach(function (element) {
        element.href = favicon;
      });
  }

  function replaceString(value, replacements) {
    var result = String(value);

    replacements.forEach(function (replacement) {
      if (!replacement.from || replacement.from === replacement.to) {
        return;
      }

      result = result.split(replacement.from).join(replacement.to);
    });

    return result;
  }

  function brandReplacements() {
    var brand = config.brand || {};
    var legacy = brand.legacy || {};

    var oldLegal = legacy.legalName || "";
    var oldName = legacy.name || "";
    var oldShort = legacy.shortName || "";

    var newLegal = brand.legalName || brand.name || "";
    var newName = brand.name || "";
    var newShort = brand.shortName || brand.name || "";

    return [
      {
        from: oldLegal,
        to: newLegal,
      },
      {
        from: oldName,
        to: newName,
      },
      {
        from: oldShort.toUpperCase(),
        to: newShort.toUpperCase(),
      },
      {
        from: oldShort,
        to: newShort,
      },
    ].sort(function (a, b) {
      return b.from.length - a.from.length;
    });
  }

  function replaceStaticBrandText(root) {
    var replacements = brandReplacements();

    if (!replacements.length) {
      return;
    }

    var walker = document.createTreeWalker(
      root === document ? document.documentElement : root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          var parent = node.parentElement;

          if (!parent) {
            return NodeFilter.FILTER_REJECT;
          }

          if (
            parent.closest(
              "script, style, noscript, template, [data-config], [data-config-html]",
            )
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    var textNodes = [];
    var currentNode;

    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    textNodes.forEach(function (node) {
      var updated = replaceString(node.nodeValue, replacements);

      if (updated !== node.nodeValue) {
        node.nodeValue = updated;
      }
    });

    var attributeSelectors = [
      "[title]",
      "[aria-label]",
      "[alt]",
      "[placeholder]",
      "meta[content]",
    ].join(",");

    getElements(root, attributeSelectors).forEach(function (element) {
      ["title", "aria-label", "alt", "placeholder", "content"].forEach(
        function (attributeName) {
          if (!element.hasAttribute(attributeName)) {
            return;
          }

          var original = element.getAttribute(attributeName);
          var updated = replaceString(original, replacements);

          if (original !== updated) {
            element.setAttribute(attributeName, updated);
          }
        },
      );
    });
  }

  function renderStructuredData() {
    var schemaElements = document.querySelectorAll(
      'script[type="application/ld+json"][data-site-schema]',
    );

    schemaElements.forEach(function (element) {
      try {
        var schema = JSON.parse(element.textContent);

        schema.name =
          getValue("brand.legalName", "") ||
          getValue("brand.name", schema.name);

        schema.url = getValue("site.url", schema.url);
        schema.email = getValue("contact.email", schema.email);

        schema.address = {
          "@type": "PostalAddress",
          streetAddress: getValue(
            "contact.address",
            schema.address && schema.address.streetAddress,
          ),
        };

        element.textContent = JSON.stringify(schema, null, 2);
      } catch (error) {
        console.warn("Could not update structured data:", error);
      }
    });
  }

  function render(root) {
    var renderRoot = root || document;

    renderTextValues(renderRoot);
    renderLinks(renderRoot);
    renderSources(renderRoot);
    renderAttributes(renderRoot);
    fillSelects(renderRoot);
    renderLogos(renderRoot);
    replaceStaticBrandText(renderRoot);

    if (renderRoot === document) {
      renderFavicon();
      renderStructuredData();
    }
  }

  window.SiteConfigTools = {
    get: getValue,
    escapeHTML: escapeHTML,
    logoHTML: logoHTML,
    render: render,
  };

  render(document);

  document.addEventListener("site:shell-ready", function () {
    render(document);
  });
})();
