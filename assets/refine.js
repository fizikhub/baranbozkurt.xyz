/* refine.js — Baran Bozkurt sitesi istemci iyileştirmeleri (v2).
   Vanilla JS, bağımlılık yok. Bilinçli olarak SADECE hydration
   sonrasına bırakılır: erken DOM değişikliği React #418 uyarısı verir.
   Yaptıkları:
   1) heroFix — harf harf "Product/Designer" kutularını gizleyip yerine
      gerçek "Baran / Web Geliştirici" düğümü koyar (pseudo değil, akışa uygun)
   2) calmMotion — mobil / reduced-motion / save-data'da Lenis smooth'u
      kapatır, ağır transform'ları sadeleştirir (takılma gider)
   3) overflowGuard — viewport dışına taşan elemanı bulup kilitler
   4) autoAlt / activeNav / skipLink / externalRel — erişilebilirlik */
(function () {
  "use strict";

  var path = window.location.pathname;
  var isMobileMQ = window.matchMedia("(max-width: 809.98px)");
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var saveData =
    (navigator.connection && navigator.connection.saveData) === true;

  /* --- 1) Hero: gerçek metin düğümü (pseudo çakışması yok) --- */
  function heroFix() {
    var holders = document.querySelectorAll('[aria-label="Web Geliştirici"]');
    for (var h = 0; h < holders.length; h++) {
      var holder = holders[h];
      holder.classList.add("bb-hero-done");
      if (holder.querySelector(".bb-hero-real")) continue;
      // Harf kutularını gizle (CSS de gizler; JS yedek)
      var letters = holder.querySelectorAll(
        '[data-framer-name="Product"], [data-framer-name="Designer"]'
      );
      for (var i = 0; i < letters.length; i++) {
        letters[i].style.display = "none";
      }
      holder.style.height = "auto";
      holder.style.overflow = "visible";
      var wrap = document.createElement("div");
      wrap.className = "bb-hero-real";
      var name = document.createElement("p");
      name.className = "bb-hero-name";
      name.textContent = "Baran";
      var role = document.createElement("p");
      role.className = "bb-hero-role";
      role.textContent = "Web Geliştirici";
      wrap.appendChild(name);
      wrap.appendChild(role);
      holder.insertBefore(wrap, holder.firstChild);
    }
  }

  /* --- 2) Animasyon sakinleştirme --- */
  function calmMotion() {
    var calm = isMobileMQ.matches || reduceMQ.matches || saveData;
    // Lenis smooth-scroll mobilde jank yapıyor: native'e bırak
    if (calm) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      try {
        if (window.__lenis && window.__lenis.stop) window.__lenis.stop();
      } catch (e) {}
      // Framer'in scroll listener'larını tetiklemeden sadece sınıf temizliği
      document.querySelectorAll(".lenis-stopped").forEach(function (el) {
        el.classList.remove("lenis-stopped");
      });
    }
    // Mobilde kartlardaki scale(1.5) inline transform'u nötrle (CSS !important
    // zaten kazanır; bu yedek: Framer Motion style'ı yeniden yazarsa da tutar)
    if (isMobileMQ.matches) {
      document
        .querySelectorAll(
          '[data-framer-name="Card 1"], [data-framer-name="Card 2"], [data-framer-name="Card 3"]'
        )
        .forEach(function (el) {
          el.style.transform = "none";
          el.style.scale = "1";
          el.style.rotate = "none";
        });
    }
  }

  /* --- 3) Taşma bekçisi: sadece mobilde, sadece ilk yüklemede --- */
  function overflowGuard() {
    if (!isMobileMQ.matches) return;
    var vw = document.documentElement.clientWidth;
    var bad = [];
    var els = document.querySelectorAll("body *");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.closest("#svg-templates")) continue;
      try {
        var r = el.getBoundingClientRect();
        if (r.width > vw + 24 && r.width < vw * 3) {
          // Sabit kök (390px) ve sticky sahneler bilinçli olarak atlanır:
          // onlar CSS ile zaten akışkan yapıldı.
          bad.push(el);
          if (bad.length > 40) break;
        }
      } catch (e) {}
    }
    for (var j = 0; j < bad.length; j++) {
      var b = bad[j];
      // Asla gizleme: sadece kırp. İçerik kaybolmaz, kayma biter.
      if (!b.style.maxWidth) b.style.maxWidth = "100vw";
      if (getComputedStyle(b).overflowX === "visible") {
        b.style.overflowX = "clip";
      }
    }
  }

  /* --- Bağlantısız görsellere anlamlı alt metin --- */
  function autoAlt() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.hasAttribute("alt") && img.getAttribute("alt") !== "") continue;
      var card = img.closest("a") || img.closest('[data-framer-name="Card"]');
      var label = "";
      if (card) {
        label = (card.textContent || "").trim().replace(/\s+/g, " ");
        if (label.length > 90) label = label.slice(0, 90);
      }
      img.setAttribute("alt", label ? "Proje görseli: " + label : "");
      if (!img.hasAttribute("loading") && img.getBoundingClientRect().top > 900) {
        img.setAttribute("loading", "lazy");
      }
    }
  }

  /* --- Aktif menü öğesini işaretle --- */
  function activeNav() {
    var links = document.querySelectorAll('[data-framer-name="Texts"] a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      var here =
        (href.indexOf("work") !== -1 && path.indexOf("/work") !== -1) ||
        (href.indexOf("about") !== -1 && path.indexOf("/about") !== -1);
      if (here) links[i].setAttribute("aria-current", "page");
    }
  }

  /* --- Dış bağlantı güvenliği --- */
  function externalRel() {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      try {
        if (new URL(a.href).origin !== window.location.origin) {
          if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener");
          if (!a.getAttribute("target")) return; // aynı sekmede tut
        }
      } catch (e) {}
    });
  }

  /* --- İçeriğe atla bağlantısı --- */
  function skipLink() {
    if (document.querySelector(".bb-skip")) return;
    var target =
      document.querySelector("h1") ||
      document.querySelector("main") ||
      document.body;
    if (!target) return;
    if (!target.id) target.id = "bb-icerik";
    target.setAttribute("tabindex", "-1");
    var a = document.createElement("a");
    a.className = "bb-skip";
    a.href = "#" + target.id;
    a.textContent = "İçeriğe atla";
    document.body.insertBefore(a, document.body.firstChild);
  }

  function run() {
    try {
      heroFix();
      calmMotion();
      autoAlt();
      activeNav();
      externalRel();
      skipLink();
      // Fontlar + Framer Motion ilk yerleşimi bitirsin, sonra ölç
      window.setTimeout(overflowGuard, 600);
    } catch (e) {
      /* Sessiz geç: site JS'siz de çalışmalı */
    }
  }

  // Hydration bitene kadar bekle: erken DOM değişikliği React #418
  // uyarılarına yol açıyordu. Framer hydrate edilen bağlantılara
  // data-hydrated yazar; onu gözle, olmazsa yedek zamanlayıcı.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    window.setTimeout(run, 1200);
  }
  function waitHydrated(tries) {
    if (
      document.querySelector("a[data-hydrated]") ||
      document.querySelector("[data-framer-hydrated]") ||
      tries <= 0
    ) {
      start();
    } else {
      window.setTimeout(function () {
        waitHydrated(tries - 1);
      }, 400);
    }
  }
  if (document.readyState === "complete") {
    waitHydrated(12);
  } else {
    window.addEventListener("load", function () {
      waitHydrated(12);
    });
    window.setTimeout(start, 8000); // yedek: load gecikirse
  }
  // Yön değişimi / yeniden boyut: sakinleştir + taşma bekçisi
  var rT;
  window.addEventListener(
    "resize",
    function () {
      window.clearTimeout(rT);
      rT = window.setTimeout(function () {
        try {
          calmMotion();
          overflowGuard();
        } catch (e) {}
      }, 300);
    },
    { passive: true }
  );
  window.addEventListener("orientationchange", function () {
    window.setTimeout(function () {
      try {
        calmMotion();
        overflowGuard();
      } catch (e) {}
    }, 500);
  });
})();
