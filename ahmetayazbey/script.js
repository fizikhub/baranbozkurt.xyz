const products = [
  { id: "gazel", title: "Gazel Traverten Yemek Takımı", category: "Yemek Takımları", price: 54900, image: "assets/products/gazel.jpg", badge: "Yeni", description: "Oval traverten masa ve kayın ağacı Gazel sandalyelerle altı kişilik dengeli bir yemek alanı.", features: ["Oval traverten tabla", "6 adet kayın ağacı sandalye", "Renk ve cila seçeneği", "2 yıl iskelet garantisi"] },
  { id: "joy", title: "Joy Seramik Bistro Takımı", category: "Masalar", price: 24900, image: "assets/products/joy.jpg", badge: "Yeni", description: "70 cm seramik tabla, heykelsi masif ayak ve iki adet hasır sırtlı Lizbon sandalye.", features: ["70 cm seramik tabla", "Masif ahşap ayak", "2 adet Lizbon sandalye", "Kumaş ve cila seçeneği"] },
  { id: "zen", title: "Zen Masa & Siena Sandalye", category: "Yemek Takımları", price: 44900, image: "assets/products/zen.jpg", badge: "Çok satan", description: "Koyu tonlu Zen masa ve dört adet açık döşemeli Siena sandalye ile net, zamansız bir takım.", features: ["Zen masa modeli", "4 adet Siena sandalye", "Kayın ağacı iskelet", "2 yıl iskelet garantisi"] },
  { id: "oval", title: "Oval PTT Ayak Yemek Takımı", category: "Yemek Takımları", price: 49900, image: "assets/products/oval.jpg", badge: "Yeni", description: "Akıcı oval tabla, yivli PTT ayak ve altı adet döşemeli sandalye ile güçlü bir sofra merkezi.", features: ["Oval tabla", "Yivli PTT ayak", "6 adet sandalye", "Renk ve kumaş seçeneği"] },
  { id: "bonita", title: "Bonita Köşe Koltuk", category: "Koltuklar", price: 42900, image: "assets/products/bonita.jpg", badge: "Yeni", description: "Geniş oturumu ve yalın modüler görünümüyle ferah yaşam alanları için açık renk köşe koltuk.", features: ["Geniş köşe oturum", "Yumuşak dokulu kumaş", "Dekoratif kırlentler", "Ölçü için danışmanlık"] },
  { id: "gazel-chair", title: "Gazel Hasır Sandalye", category: "Sandalyeler", price: 6250, image: "assets/products/gazel.jpg", badge: "Tekli satış", description: "Kavisli kol yapısı ve doğal hasır sırtıyla yemek masalarının çevresinde hafif ve rahat bir oturum.", features: ["Kayın ağacı iskelet", "Doğal hasır sırt", "Silinebilir kumaş seçeneği", "2 yıl iskelet garantisi"] },
  { id: "siena-chair", title: "Siena Kollu Sandalye", category: "Sandalyeler", price: 5950, image: "assets/products/zen.jpg", badge: "Tekli satış", description: "Koyu ahşap gövde, yumuşak döşeme ve çevreleyen kol yapısıyla uzun sofralar için konforlu sandalye.", features: ["Kayın ağacı iskelet", "Kollu tasarım", "Kumaş ve cila seçeneği", "2 yıl iskelet garantisi"] },
  { id: "joy-table", title: "Joy Seramik Masa", category: "Masalar", price: 16500, image: "assets/products/joy.jpg", badge: "70 cm", description: "Dar mutfaklar ve kahve köşeleri için seramik tablalı, heykelsi masif ayaklı kompakt masa.", features: ["70 cm seramik tabla", "Masif ahşap ayak", "İki kişilik kullanım", "Cila seçeneği"] }
];

const money = value => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value);
const productById = id => products.find(product => product.id === id);
const grid = document.querySelector("[data-product-grid]");
const resultStatus = document.querySelector("[data-result-status]");
const cartCounts = document.querySelectorAll("[data-cart-count]");
const favoriteCounts = document.querySelectorAll("[data-favorite-count]");
const cartItems = document.querySelector("[data-cart-items]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartSummary = document.querySelector("[data-cart-summary]");
const toast = document.querySelector("[data-toast]");
const quickview = document.querySelector("[data-quickview-dialog]");
const checkout = document.querySelector("[data-checkout-dialog]");
let activeCategory = "Tümü";
let searchQuery = "";
let sortMode = "featured";
let showFavorites = false;
let activeSlide = 0;
let quickviewId = null;
let toastTimer;
let cart = {};
let favorites = new Set();
try { cart = JSON.parse(localStorage.getItem("ahmet-cart") || "{}"); } catch { localStorage.removeItem("ahmet-cart"); }
try { favorites = new Set(JSON.parse(localStorage.getItem("ahmet-favorites") || "[]")); } catch { localStorage.removeItem("ahmet-favorites"); }

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function getFilteredProducts() {
  const query = searchQuery.trim().toLocaleLowerCase("tr-TR");
  const list = products.filter(product => {
    const inCategory = activeCategory === "Tümü" || product.category === activeCategory;
    const inSearch = !query || `${product.title} ${product.category}`.toLocaleLowerCase("tr-TR").includes(query);
    const inFavorites = !showFavorites || favorites.has(product.id);
    return inCategory && inSearch && inFavorites;
  });
  if (sortMode === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sortMode === "price-desc") return list.sort((a, b) => b.price - a.price);
  return list;
}

function renderProducts() {
  const items = getFilteredProducts();
  resultStatus.textContent = showFavorites ? `${items.length} favori ürün gösteriliyor` : searchQuery || activeCategory !== "Tümü" ? `${items.length} ürün gösteriliyor` : "";
  if (!items.length) {
    grid.innerHTML = showFavorites
      ? `<div class="empty-products"><i class="ph ph-heart"></i><strong>Favori listeniz henüz boş</strong><span>Beğendiğiniz ürünlerdeki kalp simgesine dokunun.</span></div>`
      : `<div class="empty-products"><i class="ph ph-magnifying-glass"></i><strong>Aradığınız ürünü bulamadık</strong><span>Başka bir model veya kategori deneyin.</span></div>`;
    return;
  }
  grid.innerHTML = items.map(product => `
    <article class="product-card">
      <button class="favorite-button${favorites.has(product.id) ? " is-active" : ""}" type="button" aria-label="${product.title} ürününü favorilere ${favorites.has(product.id) ? "çıkar" : "ekle"}" aria-pressed="${favorites.has(product.id)}" data-favorite="${product.id}"><i class="${favorites.has(product.id) ? "ph-fill" : "ph"} ph-heart"></i></button>
      <button class="product-visual" type="button" aria-label="${product.title} detaylarını aç" data-quickview="${product.id}">
        <img src="${product.image}" alt="${product.title}" width="1179" height="900" loading="lazy">
        <span class="product-badge">${product.badge}</span>
      </button>
      <div class="product-copy">
        <span class="product-category">${product.category}</span>
        <h3>${product.title}</h3>
        <div class="product-price"><strong>${money(product.price)}</strong><small>Demo satış fiyatı</small></div>
        <p class="product-meta"><i class="ph ph-check-circle"></i> Siparişe özel hazırlanır</p>
        <button class="add-button" type="button" data-add="${product.id}">Sepete ekle</button>
      </div>
    </article>`).join("");
}

function saveCart() {
  localStorage.setItem("ahmet-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  showToast(`${productById(id).title} sepete eklendi`);
}

function renderCart() {
  const entries = Object.entries(cart).filter(([id, quantity]) => productById(id) && quantity > 0);
  const totalQuantity = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + productById(id).price * quantity, 0);
  cartCounts.forEach(count => { count.textContent = totalQuantity; });
  cartTotal.textContent = money(total);
  cartSummary.querySelector("button").disabled = !entries.length;
  if (!entries.length) {
    cartItems.innerHTML = `<div class="cart-empty"><i class="ph ph-shopping-bag-open"></i><strong>Sepetiniz henüz boş</strong><span>Beğendiğiniz ürünleri buraya ekleyin.</span></div>`;
    return;
  }
  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = productById(id);
    return `<article class="cart-item">
      <img src="${product.image}" alt="" width="80" height="96">
      <div><h3>${product.title}</h3><p>${money(product.price * quantity)}</p>
        <div class="cart-quantity"><button type="button" aria-label="Adedi azalt" data-decrease="${id}">−</button><span>${quantity}</span><button type="button" aria-label="Adedi artır" data-increase="${id}">+</button></div>
      </div>
      <button class="remove-item" type="button" aria-label="${product.title} ürününü sepetten çıkar" data-remove="${id}"><i class="ph ph-trash"></i></button>
    </article>`;
  }).join("");
}

function saveFavorites() {
  localStorage.setItem("ahmet-favorites", JSON.stringify([...favorites]));
  favoriteCounts.forEach(count => { count.textContent = favorites.size; });
  renderProducts();
}

function showFavoriteProducts() {
  showFavorites = true;
  activeCategory = "Tümü";
  searchQuery = "";
  document.querySelectorAll("[data-search-input]").forEach(input => { input.value = ""; });
  syncFilterChips();
  renderProducts();
  closeDrawers();
  document.querySelector("#products").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function openDrawer(drawer) {
  closeDrawers();
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.querySelector("[data-overlay]").classList.add("is-active");
  document.body.classList.add("drawer-open");
}

function closeDrawers() {
  document.querySelectorAll(".drawer").forEach(drawer => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); });
  document.querySelector("[data-overlay]").classList.remove("is-active");
  document.body.classList.remove("drawer-open");
}

function selectCategory(category) {
  activeCategory = category;
  showFavorites = false;
  searchQuery = "";
  document.querySelectorAll("[data-search-input]").forEach(input => { input.value = ""; });
  document.querySelectorAll(".filter-chips [data-category]").forEach(button => button.classList.toggle("is-active", button.dataset.category === category));
  renderProducts();
  closeDrawers();
  document.querySelector("#products").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function getOrderSummary() {
  const entries = Object.entries(cart).filter(([id, quantity]) => productById(id) && quantity > 0);
  const total = entries.reduce((sum, [id, quantity]) => sum + productById(id).price * quantity, 0);
  return { entries, total };
}

function renderCheckoutOrder() {
  const { entries, total } = getOrderSummary();
  checkout.querySelector("[data-checkout-order]").innerHTML = entries.map(([id, quantity]) => `<div><span>${quantity} × ${productById(id).title}</span><strong>${money(productById(id).price * quantity)}</strong></div>`).join("") + `<div><span>Demo ara toplam</span><strong>${money(total)}</strong></div>`;
}

function openCheckout() {
  if (!getOrderSummary().entries.length) return;
  closeDrawers();
  renderCheckoutOrder();
  checkout.querySelector("[data-checkout-form]").hidden = false;
  checkout.querySelector("[data-checkout-success]").hidden = true;
  checkout.showModal();
}

function buildOrderText(form) {
  const values = new FormData(form);
  const { entries, total } = getOrderSummary();
  const lines = entries.map(([id, quantity]) => `• ${quantity} × ${productById(id).title} — ${money(productById(id).price * quantity)}`);
  return `Ahmet Ayazbey sipariş talebi\n\n${lines.join("\n")}\n\nDemo ara toplam: ${money(total)}\nAd Soyad: ${values.get("name")}\nTelefon: ${values.get("phone")}\nTeslimat şehri: ${values.get("city")}\nNot: ${values.get("note") || "—"}`;
}

async function copyOrder(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

function syncFilterChips() {
  document.querySelectorAll(".filter-chips [data-category]").forEach(button => button.classList.toggle("is-active", button.dataset.category === activeCategory));
}

function showSlide(index) {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll("[data-slide]")];
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === activeSlide));
  dots.forEach((dot, i) => { dot.classList.toggle("is-active", i === activeSlide); dot.setAttribute("aria-selected", String(i === activeSlide)); });
}

function openQuickview(id) {
  const product = productById(id);
  quickviewId = id;
  const image = quickview.querySelector("[data-quickview-image]");
  image.src = product.image;
  image.alt = product.title;
  quickview.querySelector("[data-quickview-category]").textContent = product.category;
  quickview.querySelector("[data-quickview-title]").textContent = product.title;
  quickview.querySelector("[data-quickview-price]").textContent = money(product.price);
  quickview.querySelector("[data-quickview-description]").textContent = product.description;
  quickview.querySelector("[data-quickview-features]").innerHTML = product.features.map(feature => `<li>${feature}</li>`).join("");
  quickview.showModal();
}

document.addEventListener("click", event => {
  const category = event.target.closest("[data-category]");
  const add = event.target.closest("[data-add]");
  const view = event.target.closest("[data-quickview]");
  const favorite = event.target.closest("[data-favorite]");
  if (category) selectCategory(category.dataset.category);
  if (add) addToCart(add.dataset.add);
  if (view) openQuickview(view.dataset.quickview);
  if (favorite) {
    const id = favorite.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    saveFavorites();
    showToast(favorites.has(id) ? "Favorilere eklendi" : "Favorilerden çıkarıldı");
  }
  if (event.target.closest("[data-show-favorites]")) showFavoriteProducts();
  if (event.target.closest("[data-open-menu]")) openDrawer(document.querySelector("[data-menu-drawer]"));
  if (event.target.closest("[data-open-cart]")) openDrawer(document.querySelector("[data-cart-drawer]"));
  if (event.target.closest("[data-close-drawers]") || event.target.matches("[data-overlay]")) closeDrawers();
  if (event.target.closest("[data-hero-prev]")) showSlide(activeSlide - 1);
  if (event.target.closest("[data-hero-next]")) showSlide(activeSlide + 1);
  const dot = event.target.closest("[data-slide]");
  if (dot) showSlide(Number(dot.dataset.slide));
  const decrease = event.target.closest("[data-decrease]");
  const increase = event.target.closest("[data-increase]");
  const remove = event.target.closest("[data-remove]");
  if (decrease) { cart[decrease.dataset.decrease] -= 1; if (cart[decrease.dataset.decrease] <= 0) delete cart[decrease.dataset.decrease]; saveCart(); }
  if (increase) { cart[increase.dataset.increase] += 1; saveCart(); }
  if (remove) { delete cart[remove.dataset.remove]; saveCart(); }
  if (event.target.closest("[data-search-trigger]")) document.querySelector(".mobile-search input").focus();
});

document.querySelectorAll(".search-form").forEach(form => {
  form.addEventListener("submit", event => { event.preventDefault(); searchQuery = form.querySelector("input").value; activeCategory = "Tümü"; showFavorites = false; renderProducts(); document.querySelector("#products").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); });
});
document.querySelectorAll("[data-search-input]").forEach(input => input.addEventListener("input", () => { searchQuery = input.value; activeCategory = "Tümü"; showFavorites = false; syncFilterChips(); renderProducts(); }));
document.querySelector("[data-sort]").addEventListener("change", event => { sortMode = event.target.value; renderProducts(); });
document.querySelector("[data-close-quickview]").addEventListener("click", () => quickview.close());
quickview.querySelector("[data-quickview-add]").addEventListener("click", () => { addToCart(quickviewId); quickview.close(); openDrawer(document.querySelector("[data-cart-drawer]")); });
quickview.addEventListener("click", event => { if (event.target === quickview) quickview.close(); });
document.querySelector("[data-create-order]").addEventListener("click", openCheckout);
document.querySelector("[data-close-checkout]").addEventListener("click", () => checkout.close());
checkout.addEventListener("click", event => { if (event.target === checkout) checkout.close(); });
checkout.querySelector("[data-checkout-form]").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const orderText = buildOrderText(form);
  checkout.dataset.orderText = orderText;
  await copyOrder(orderText);
  form.hidden = true;
  checkout.querySelector("[data-checkout-success]").hidden = false;
  showToast("Sipariş özeti kopyalandı");
});
checkout.querySelector("[data-copy-order]").addEventListener("click", async () => { await copyOrder(checkout.dataset.orderText || ""); showToast("Sipariş özeti yeniden kopyalandı"); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeDrawers(); });

renderProducts();
renderCart();
favoriteCounts.forEach(count => { count.textContent = favorites.size; });
