(function () {
  "use strict";
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
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
