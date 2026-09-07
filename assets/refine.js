/* refine.js — Baran Bozkurt sitesi için küçük istemci iyileştirmeleri.
   Bilinçli olarak SADECE hydration sonrasına bırakılan işler burada:
   DOM metni değiştirilmez, bu yüzden React uyumsuzluğu yaratmaz.
   Vanilla JS, bağımlılık yok. */
(function () {
  "use strict";

  var path = window.location.pathname;

  /* --- Bağlantısız/kartsız görsellere anlamlı alt metin --- */
  function autoAlt() {
    var imgs = document.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.hasAttribute("alt") && img.getAttribute("alt") !== "") continue;
      var card =
        img.closest("a") || img.closest('[data-framer-name="Card"]');
      var label = "";
      if (card) {
        label = (card.textContent || "").trim().replace(/\s+/g, " ");
        if (label.length > 90) label = label.slice(0, 90);
      }
      img.setAttribute("alt", label ? "Proje görseli: " + label : "");
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
      autoAlt();
      activeNav();
      skipLink();
    } catch (e) {
      /* Sessiz geç: site JS'siz de çalışmalı */
    }
  }

  // Hydration bitene kadar bekle: erken DOM değişikliği React #418
  // uyarılarına yol açıyordu. Framer, hydrate edilen bağlantılara
  // data-hydrated yazar; onu gözle, olmazsa yedek zamanlayıcı.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    window.setTimeout(run, 1500);
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
})();
