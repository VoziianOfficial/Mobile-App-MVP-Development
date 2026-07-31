(function () {
  function Swiper(el, opts) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    if (!this.el) return;
    this.opts = opts || {};
    this.wrapper = this.el.querySelector(".swiper-wrapper");
    this.slides = [].slice.call(this.el.querySelectorAll(".swiper-slide"));
    this.index = this.opts.initialSlide || 0;
    this.prev = resolve(
      this.opts.navigation && this.opts.navigation.prevEl,
      this.el,
    );
    this.next = resolve(
      this.opts.navigation && this.opts.navigation.nextEl,
      this.el,
    );
    this.pagination = resolve(
      this.opts.pagination && this.opts.pagination.el,
      this.el,
    );
    this.bind();
    this.update();
  }
  function resolve(value, root) {
    if (!value) return null;
    if (value.nodeType) return value;
    return (
      root.closest("section")?.querySelector(value) ||
      document.querySelector(value)
    );
  }
  Swiper.prototype.bind = function () {
    var self = this;
    if (this.prev)
      this.prev.addEventListener("click", function () {
        self.slidePrev();
      });
    if (this.next)
      this.next.addEventListener("click", function () {
        self.slideNext();
      });
    this.el.tabIndex = this.el.tabIndex || 0;
    this.el.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") self.slidePrev();
      if (e.key === "ArrowRight") self.slideNext();
    });
    var start = 0;
    this.el.addEventListener("pointerdown", function (e) {
      start = e.clientX;
      self.el.setPointerCapture && self.el.setPointerCapture(e.pointerId);
    });
    this.el.addEventListener("pointerup", function (e) {
      var d = e.clientX - start;
      if (Math.abs(d) > 40) d < 0 ? self.slideNext() : self.slidePrev();
    });
  };
  Swiper.prototype.perView = function () {
    var p = this.opts.slidesPerView || 1,
      points = this.opts.breakpoints || {},
      w = innerWidth;
    Object.keys(points)
      .map(Number)
      .sort(function (a, b) {
        return a - b;
      })
      .forEach(function (bp) {
        if (w >= bp && points[bp].slidesPerView) p = points[bp].slidesPerView;
      });
    return p === "auto" ? 1 : Number(p);
  };
  Swiper.prototype.update = function () {
    if (!this.wrapper) return;
    var self = this,
      p = this.perView(),
      max = Math.max(0, Math.ceil(this.slides.length - p));
    this.index = Math.max(0, Math.min(this.index, max));
    this.slides.forEach(function (s, i) {
      s.style.flexBasis = 100 / p + "%";
      s.classList.toggle("is-active", i === self.index);
      s.classList.toggle("swiper-slide-active", i === self.index);
      s.setAttribute("aria-hidden", String(i !== self.index));
    });
    this.wrapper.style.transform =
      "translate3d(-" + this.index * (100 / p) + "%,0,0)";
    if (this.prev)
      this.prev.classList.toggle("swiper-button-disabled", this.index === 0);
    if (this.next)
      this.next.classList.toggle("swiper-button-disabled", this.index === max);
    if (this.pagination)
      this.pagination.textContent =
        String(this.index + 1).padStart(2, "0") +
        " / " +
        String(this.slides.length).padStart(2, "0");
    if (typeof this.opts.onChange === "function")
      this.opts.onChange(this.index, this);
  };
  Swiper.prototype.slideNext = function () {
    this.index++;
    this.update();
  };
  Swiper.prototype.slidePrev = function () {
    this.index--;
    this.update();
  };
  Swiper.prototype.slideTo = function (index) {
    this.index = Number(index) || 0;
    this.update();
  };
  window.Swiper = Swiper;
})();
