const products = {
  gazel: {
    title: "Gazel",
    type: "Oval traverten masa · Yemek takımı",
    image: "assets/products/gazel.jpg",
    alt: "Oval traverten masa ve altı adet hasır detaylı Gazel sandalye",
    description: "Yumuşak oval formu, doğal taş görünümü ve hasır sırt detaylarıyla kalabalık sofralara ferah bir çevre kurar.",
    features: ["Oval traverten masa", "Kayın ağacı Gazel sandalye", "Renk ve cila seçenekleri", "2 yıl iskelet garantisi"]
  },
  joy: {
    title: "Joy",
    type: "70 cm seramik masa · Bistro takımı",
    image: "assets/products/joy.jpg",
    alt: "Seramik yuvarlak Joy masa ve iki adet hasır sırtlı Lizbon sandalye",
    description: "Küçük yemek alanları ve mutfak köşeleri için heykelsi ayak formuyla ölçülü ama karakterli bir çözüm.",
    features: ["70 cm seramik tabla", "Heykelsi masif ayak", "Kayın ağacı Lizbon sandalye", "Kumaş ve cila seçimi"]
  },
  zen: {
    title: "Zen",
    type: "Masa · Siena sandalye",
    image: "assets/products/zen.jpg",
    alt: "Siyah Zen masa ve dört adet Siena sandalye",
    description: "Net çizgiler, koyu ahşap ve açık döşemeyi bir araya getiren dengeli bir günlük yemek alanı.",
    features: ["Zen masa modeli", "Kayın ağacı Siena sandalye", "Farklı renk ve cila seçenekleri", "2 yıl iskelet garantisi"]
  },
  oval: {
    title: "Oval",
    type: "PTT ayak masa · Yemek takımı",
    image: "assets/products/oval.jpg",
    alt: "Oval koyu ahşap masa ve altı adet döşemeli sandalye",
    description: "Akıcı tabla formu ve dikey yivli ayakları, altı kişilik sofraya güçlü ve sakin bir merkez kazandırır.",
    features: ["Oval PTT ayak masa", "Kayın ağacı sandalye", "Altı kişilik yerleşim", "Renk ve cila seçenekleri"]
  },
  bonita: {
    title: "Bonita",
    type: "Köşe koltuk",
    image: "assets/products/bonita.jpg",
    alt: "Açık renk Bonita köşe koltuk ve yemek alanı",
    description: "Derin oturumu ve yalın modüler görünümüyle yaşam alanını ağırlaştırmadan geniş bir dinlenme yüzeyi sunar.",
    features: ["Geniş köşe oturum", "Yumuşak dokulu döşeme", "Dekoratif kırlentler", "Mekâna göre bilgi ve fiyat"]
  }
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const dialog = document.querySelector("[data-dialog]");

const setHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
setHeader();
window.addEventListener("scroll", () => {
  setHeader();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelector(".hero").style.setProperty("--hero-shift", Math.min(window.scrollY / innerHeight, 1));
  }
}, { passive: true });

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
  menuPanel.classList.remove("is-open");
  menuPanel.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menüyü aç");
};

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "false";
  if (!open) return closeMenu();
  document.body.classList.add("menu-open");
  header.classList.add("menu-active");
  menuPanel.classList.add("is-open");
  menuPanel.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Menüyü kapat");
});

menuPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

document.querySelectorAll("[data-product]").forEach(card => {
  card.querySelector("button").addEventListener("click", () => {
    const item = products[card.dataset.product];
    dialog.querySelector("[data-dialog-title]").textContent = item.title;
    dialog.querySelector("[data-dialog-type]").textContent = item.type;
    dialog.querySelector("[data-dialog-description]").textContent = item.description;
    const image = dialog.querySelector("[data-dialog-image]");
    image.src = item.image;
    image.alt = item.alt;
    const features = dialog.querySelector("[data-dialog-features]");
    features.replaceChildren(...item.features.map(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      return li;
    }));
    dialog.showModal();
    document.body.style.overflow = "hidden";
  });
});

const closeDialog = () => {
  dialog.close();
  document.body.style.overflow = "";
};
dialog.querySelector("[data-dialog-close]").addEventListener("click", closeDialog);
dialog.addEventListener("click", event => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => { document.body.style.overflow = ""; });
