(function () {
  "use strict";
  function init() {
    var form = document.querySelector("#project-form form");
    if (!form) return;
    var submit = form.querySelector('[type="submit"]'),
      status = form.querySelector(".form-status"),
      busy = false,
      c = window.SITE_CONFIG.forms;
    var source = form.querySelector('[name="source_page"]');
    if (source)
      source.value = location.pathname.split("/").pop() || "contact.html";
    function field(input) {
      return input.closest(".field") || input.closest(".checkbox-field");
    }
    function error(input, message) {
      var wrap = field(input),
        out = wrap && wrap.querySelector(".field-error");
      if (wrap) wrap.classList.toggle("is-invalid", !!message);
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (out) out.textContent = message || "";
    }
    function validate(input) {
      var message = "";
      if (input.required) {
        if (input.type === "checkbox" && !input.checked)
          message = c.consentError;
        else if (!String(input.value || "").trim()) message = c.requiredError;
      }
      if (
        !message &&
        input.type === "email" &&
        input.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      )
        message = c.emailError;
      error(input, message);
      return !message;
    }
    function validateAll() {
      var valid = true,
        first = null;
      [].slice
        .call(
          form.querySelectorAll("input:not(.honeypot input),select,textarea"),
        )
        .forEach(function (input) {
          if (!validate(input)) {
            valid = false;
            if (!first) first = input;
          }
        });
      if (first) {
        first.focus();
        first.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return valid;
    }
    function show(type, message) {
      status.className = "form-status is-visible is-" + type;
      status.textContent = message;
      status.focus();
    }
    form.querySelectorAll("input,select,textarea").forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.required || input.value) validate(input);
      });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validate(input);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy || !validateAll()) return;
      busy = true;
      submit.disabled = true;
      submit.dataset.original = submit.textContent;
      submit.textContent = c.submittingLabel;
      status.className = "form-status";
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          return response.text().then(function (text) {
            var data;
            try {
              data = JSON.parse(text);
            } catch (err) {
              throw new Error("invalid-json");
            }
            if (!response.ok || !data.success)
              throw new Error(data.message || c.serverError);
            return data;
          });
        })
        .then(function (data) {
          show("success", data.message || c.successMessage);
          form.reset();
          if (source)
            source.value = location.pathname.split("/").pop() || "contact.html";
        })
        .catch(function (err) {
          show(
            "error",
            err.message === "invalid-json"
              ? c.serverError
              : err.message || c.networkError,
          );
        })
        .finally(function () {
          busy = false;
          submit.disabled = false;
          submit.textContent = submit.dataset.original || c.submitLabel;
        });
    });
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
