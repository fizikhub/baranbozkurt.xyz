/* Baran Bozkurt — küçük, bağımlılıksız etkileşimler
   - Mobil menü (erişilebilir)
   - Scroll reveal (IntersectionObserver, tek seferlik)
   - Sticky header gölgesi
   - Yıl + aktif nav
   - prefers-reduced-motion saygısı
*/
(function () {
  "use strict";
  var body = document.body;

  // Yıl
  var y = document.getElementById("yil");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobil menü
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.getElementById("mobil-menu");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });
    panel.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        toggle.focus();
      }
    });
  }

  // Header gölgesi (rAF throttle — jank yok)
  var header = document.querySelector(".site-header");
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hero giriş: font/paint sonrası tek sefer
  var hero = document.querySelector(".hero");
  if (hero) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        hero.classList.add("is-ready");
      });
    });
    // Güvenlik: 1.2sn içinde mutlaka göster (gözlemci/JS takılırsa)
    setTimeout(function () { hero.classList.add("is-ready"); }, 1200);
  }

  // Reveal: reduced-motion'da direkt göster
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  els.forEach(function (el) { io.observe(el); });
})();
