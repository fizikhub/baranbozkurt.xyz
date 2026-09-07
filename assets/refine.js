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

  /* --- Mobil için ayrı, içerik-öncelikli düzen ---
     Framer exportundaki kompozisyonlar masaüstünde mutlak konumlu. Aynı
     kompozisyonu telefona küçültmek yerine mobilde tek sütunlu, dokunmaya
     uygun bir okuma akışı oluşturuyoruz. Masaüstü DOM'una hiç dokunulmaz. */
  function escapeHTML(value) {
    return String(value || "").replace(/[&<>'"]/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[char];
    });
  }

  function imageFromSection(name) {
    var section = document.querySelector('[data-framer-name="' + name + '"]');
    if (!section) return "";
    var images = section.querySelectorAll("img[src]");
    if (!images.length) return "";
    return images[images.length - 1].currentSrc || images[images.length - 1].src;
  }

  function uniqueImages(limit) {
    var seen = {};
    var urls = [];
    var images = document.querySelectorAll("img[src]");
    for (var i = 0; i < images.length && urls.length < limit; i++) {
      var src = images[i].currentSrc || images[i].src;
      if (!src || seen[src] || src.indexOf("framerusercontent.com/images/") === -1) continue;
      seen[src] = true;
      urls.push(src);
    }
    return urls;
  }

  function projectCard(title, description, image, href) {
    var media = image
      ? '<img class="bb-mobile-card-media" src="' + escapeHTML(image) + '" alt="' + escapeHTML(title) + ' proje görünümü" loading="lazy">'
      : '<div class="bb-mobile-card-placeholder" aria-hidden="true">BB</div>';
    var opening = href ? '<a class="bb-mobile-card" href="' + escapeHTML(href) + '">' : '<article class="bb-mobile-card">';
    var closing = href ? "</a>" : "</article>";
    return opening + media + '<span class="bb-mobile-card-copy"><strong>' + escapeHTML(title) + '</strong><span>' + escapeHTML(description) + "</span></span>" + closing;
  }

  function mobileHeader(active) {
    return '<header class="bb-mobile-header">' +
      '<a class="bb-mobile-mark" href="/" aria-label="Ana sayfa">BB</a>' +
      '<nav aria-label="Ana navigasyon">' +
      '<a' + (active === "about" ? ' aria-current="page"' : "") + ' href="/about/">Hakkımda</a>' +
      '<a' + (active === "work" ? ' aria-current="page"' : "") + ' href="/work/">Çalışmalar</a>' +
      '<a href="mailto:fizikhub@gmail.com">İletişim</a>' +
      "</nav></header>";
  }

  function mobileHome() {
    var media = [
      imageFromSection("Tirelessly Pursue Clarity"),
      imageFromSection("Anlar için geliştirmek"),
      imageFromSection("Yazılım güç vermelidir"),
    ];
    return mobileHeader("home") +
      '<main class="bb-mobile-main">' +
      '<section class="bb-mobile-hero"><p class="bb-mobile-eyebrow">İstanbul · GMT +3:00</p><h1>Yazılım,<br>doğal hissettirmeli.</h1><p>Baran Bozkurt — web geliştirme, SEO/GEO ve kullanıcı odaklı dijital deneyimler.</p><a class="bb-mobile-button" href="/work/">Çalışmaları gör</a></section>' +
      '<section class="bb-mobile-section"><p class="bb-mobile-eyebrow">Seçili çalışmalar</p><h2>Netlik için tasarlıyorum.</h2><div class="bb-mobile-projects">' +
      projectCard("Dijital ürünler", "Yorulmadan netliğin peşinden gitmek.", media[0], "/work/") +
      projectCard("Web deneyimleri", "Anlar için geliştirmek.", media[1], "/work/") +
      projectCard("İşlevsel arayüzler", "Yazılım güç vermelidir.", media[2], "/work/") +
      "</div></section>" +
      '<section class="bb-mobile-note"><p>Ne yapıyorum</p><h2>Kurumsal ve içerik odaklı web projeleri; güçlü arama görünürlüğü ve sade, mobil uyumlu arayüzler.</h2><a href="mailto:fizikhub@gmail.com">Birlikte çalışalım →</a></section>' +
      "</main>" + mobileFooter();
  }

  function mobileWork() {
    var projects = [
      ["FizikHub", "Fizik odağında eğitim ve içerik platformu.", "Bash", "https://fizikhub.com/"],
      ["Tarihi Van Kahvaltı Evi", "Hızlı menü ve iletişim odaklı dijital deneyim.", "Pulse", "https://tarihivankahvaltievi.com/"],
      ["Atlas Diş", "Net bilgi ve kolay randevu akışı sunan kurumsal web sitesi.", "Heygo", "https://atlasdis.com/"],
      ["Kemal Güldüren", "Güven ve uzmanlık odaklı ortodonti deneyimi.", "Güldüren", "https://kemalguldurenortodonti.com/"],
    ];
    var cards = "";
    for (var i = 0; i < projects.length; i++) {
      cards += projectCard(projects[i][0], projects[i][1], imageFromSection(projects[i][2]), projects[i][3]);
    }
    return mobileHeader("work") +
      '<main class="bb-mobile-main"><section class="bb-mobile-hero bb-mobile-hero-compact"><p class="bb-mobile-eyebrow">Portfolyo</p><h1>Projeler ve öğrendiklerim.</h1><p>Her iş, insanların bilgiye daha rahat ulaşmasına yardımcı olmalı.</p></section>' +
      '<section class="bb-mobile-section"><div class="bb-mobile-projects">' + cards + '</div></section>' +
      '<section class="bb-mobile-note"><p>Yetkinlikler</p><h2>Web geliştirme, SEO & GEO, UX/UI ve AI destekli üretim.</h2><a href="mailto:fizikhub@gmail.com">Projenizi konuşalım →</a></section></main>' + mobileFooter();
  }

  function mobileAbout() {
    return mobileHeader("about") +
      '<main class="bb-mobile-main"><section class="bb-mobile-hero bb-mobile-hero-compact"><p class="bb-mobile-eyebrow">Baran Bozkurt</p><h1>Web için tasarım ve geliştirme yapıyorum.</h1><p>AI destekli ürün geliştirme, arama görünürlüğü ve erişilebilir arayüzler üzerine çalışıyorum.</p></section>' +
      '<section class="bb-mobile-section bb-mobile-reading"><h2>Nasıl çalışırım</h2><ul><li>İhtiyaç analiziyle başlayıp prototiple ilerlerim.</li><li>Kullanıcı akışını ve bilgi mimarisini sade tutarım.</li><li>AI agentlarıyla araştırır, kodlar ve test ederim.</li></ul><h2>Önceliklerim</h2><ul><li>Anlaşılır ve erişilebilir deneyimler üretmek.</li><li>Yayına alıp sürekli iyileştirmek.</li><li>Ölçülebilir ve işe yarayan sonuçlar çıkarmak.</li></ul></section>' +
      '<section class="bb-mobile-note"><p>Birlikte çalışalım</p><h2>Fikrinizi net, işlevsel ve görünür bir web deneyimine dönüştürelim.</h2><a href="mailto:fizikhub@gmail.com">İletişime geç →</a></section></main>' + mobileFooter();
  }

  function mobileCaseStudy() {
    var title = (document.querySelector("h1") || {}).textContent || document.title.replace(/\s*\|.*$/, "");
    var description = (document.querySelector('meta[name="description"]') || {}).content || "Projenin yaklaşımı, tasarım kararları ve sonuçları.";
    var images = uniqueImages(3);
    var gallery = "";
    for (var i = 0; i < images.length; i++) {
      gallery += '<img class="bb-mobile-case-image" src="' + escapeHTML(images[i]) + '" alt="' + escapeHTML(title.trim()) + ' proje görünümü" loading="lazy">';
    }
    return mobileHeader("work") + '<main class="bb-mobile-main"><section class="bb-mobile-hero bb-mobile-hero-compact"><p class="bb-mobile-eyebrow">Vaka çalışması</p><h1>' + escapeHTML(title.trim()) + '</h1><p>' + escapeHTML(description) + '</p><a class="bb-mobile-button" href="/work/">Tüm çalışmalara dön</a></section><section class="bb-mobile-section"><div class="bb-mobile-gallery">' + gallery + '</div></section></main>' + mobileFooter();
  }

  function mobileFooter() {
    return '<footer class="bb-mobile-footer"><span>Baran Bozkurt</span><a href="https://github.com/fizikhub" rel="noopener noreferrer" target="_blank">GitHub</a><a href="mailto:fizikhub@gmail.com">fizikhub@gmail.com</a></footer>';
  }

  function mobileExperience() {
    if (!window.matchMedia || !window.matchMedia("(max-width: 809.98px)").matches) return;
    if (document.getElementById("bb-mobile-site")) return;
    var shell = document.createElement("div");
    shell.id = "bb-mobile-site";
    shell.setAttribute("role", "document");
    if (path.indexOf("/work") === 0) {
      shell.innerHTML = mobileWork();
    } else if (path.indexOf("/about") === 0) {
      shell.innerHTML = mobileAbout();
    } else if (path.indexOf("/case-studies/") === 0) {
      shell.innerHTML = mobileCaseStudy();
    } else {
      shell.innerHTML = mobileHome();
    }
    document.body.appendChild(shell);
    document.body.classList.add("bb-mobile-ready");
  }

  // Mobil kabuk, Framer hydration'ını beklemez: mevcut DOM yalnızca medya
  // kaynaklarını okumak için kullanılır ve ana Framer ağacı değiştirilmez.
  // Böylece telefonda masaüstü düzeninin kısa süreliğine görünmesi engellenir.
  function startMobileExperience() {
    window.setTimeout(mobileExperience, 80);
  }
  if (window.matchMedia && window.matchMedia("(max-width: 809.98px)").matches) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startMobileExperience, { once: true });
    } else {
      startMobileExperience();
    }
  }

  function run() {
    try {
      autoAlt();
      activeNav();
      skipLink();
      mobileExperience();
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
