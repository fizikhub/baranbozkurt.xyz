const productCatalog = [
  { id: "gazel", title: "Gazel Traverten Yemek Takımı", category: "Yemek Takımları", price: 54900, image: "assets/products/gazel.jpg", badge: "Yeni", description: "Oval traverten masa ve kayın ağacı Gazel sandalyelerle altı kişilik dengeli bir yemek alanı.", features: ["Oval traverten tabla", "6 adet kayın ağacı sandalye", "Renk ve cila seçeneği", "2 yıl iskelet garantisi"] },
  { id: "joy", title: "Joy Seramik Bistro Takımı", category: "Masalar", price: 24900, image: "assets/products/joy.jpg", badge: "Yeni", description: "70 cm seramik tabla, heykelsi masif ayak ve iki adet hasır sırtlı Lizbon sandalye.", features: ["70 cm seramik tabla", "Masif ahşap ayak", "2 adet Lizbon sandalye", "Kumaş ve cila seçeneği"] },
  { id: "zen", title: "Zen Masa & Siena Sandalye", category: "Yemek Takımları", price: 44900, image: "assets/products/zen.jpg", badge: "Çok satan", description: "Koyu tonlu Zen masa ve dört adet açık döşemeli Siena sandalye ile net, zamansız bir takım.", features: ["Zen masa modeli", "4 adet Siena sandalye", "Kayın ağacı iskelet", "2 yıl iskelet garantisi"] },
  { id: "oval", title: "Oval PTT Ayak Yemek Takımı", category: "Yemek Takımları", price: 49900, image: "assets/products/oval.jpg", badge: "Yeni", description: "Akıcı oval tabla, yivli PTT ayak ve altı adet döşemeli sandalye ile güçlü bir sofra merkezi.", features: ["Oval tabla", "Yivli PTT ayak", "6 adet sandalye", "Renk ve kumaş seçeneği"] },
  { id: "bonita", title: "Bonita Köşe Koltuk", category: "Koltuklar", price: 42900, image: "assets/products/bonita.jpg", badge: "Yeni", description: "Geniş oturumu ve yalın modüler görünümüyle ferah yaşam alanları için açık renk köşe koltuk.", features: ["Geniş köşe oturum", "Yumuşak dokulu kumaş", "Dekoratif kırlentler", "Ölçü için danışmanlık"] },
  { id: "gazel-chair", title: "Gazel Hasır Sandalye", category: "Sandalyeler", price: 6250, image: "assets/products/gazel.jpg", badge: "Tekli satış", description: "Kavisli kol yapısı ve doğal hasır sırtıyla yemek masalarının çevresinde hafif ve rahat bir oturum.", features: ["Kayın ağacı iskelet", "Doğal hasır sırt", "Silinebilir kumaş seçeneği", "2 yıl iskelet garantisi"] },
  { id: "siena-chair", title: "Siena Kollu Sandalye", category: "Sandalyeler", price: 5950, image: "assets/products/zen.jpg", badge: "Tekli satış", description: "Koyu ahşap gövde, yumuşak döşeme ve çevreleyen kol yapısıyla uzun sofralar için konforlu sandalye.", features: ["Kayın ağacı iskelet", "Kollu tasarım", "Kumaş ve cila seçeneği", "2 yıl iskelet garantisi"] },
  { id: "joy-table", title: "Joy Seramik Masa", category: "Masalar", price: 16500, image: "assets/products/joy.jpg", badge: "70 cm", description: "Dar mutfaklar ve kahve köşeleri için seramik tablalı, heykelsi masif ayaklı kompakt masa.", features: ["70 cm seramik tabla", "Masif ahşap ayak", "İki kişilik kullanım", "Cila seçeneği"] }
];

const productId = new URLSearchParams(location.search).get("id");
const product = productCatalog.find(item => item.id === productId) || productCatalog[0];
const formatMoney = value => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(value);
const asset = path => `../${path}`;
let quantity = 1;
let selectedFinish = "Doğal meşe";
let cart = {};
let favorites = new Set();
try { cart = JSON.parse(localStorage.getItem("ahmet-cart") || "{}"); } catch { localStorage.removeItem("ahmet-cart"); }
try { favorites = new Set(JSON.parse(localStorage.getItem("ahmet-favorites") || "[]")); } catch { localStorage.removeItem("ahmet-favorites"); }

document.title = `${product.title} — Ahmet Ayazbey`;
document.querySelector('meta[name="description"]').content = product.description;
document.querySelectorAll("[data-category]").forEach(node => { node.textContent = product.category; });
document.querySelector("[data-title]").textContent = product.title;
document.querySelectorAll("[data-price]").forEach(node => { node.textContent = formatMoney(product.price); });
document.querySelector("[data-description]").textContent = product.description;
document.querySelector("[data-main-image]").src = asset(product.image);
document.querySelector("[data-main-image]").alt = product.title;
document.querySelectorAll("[data-detail-image]").forEach(image => { image.src = asset(product.image); image.alt = `${product.title} malzeme detayı`; });
document.querySelector("[data-badge]").textContent = product.badge;
document.querySelector("[data-features]").innerHTML = product.features.map((feature, index) => `<li><span>0${index + 1}</span>${feature}</li>`).join("");

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, itemQuantity) => sum + itemQuantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach(node => { node.textContent = count; });
}

function addToCart(goToCart = false) {
  cart[product.id] = (cart[product.id] || 0) + quantity;
  localStorage.setItem("ahmet-cart", JSON.stringify(cart));
  updateCartCount();
  const toast = document.querySelector("[data-toast]");
  toast.textContent = `${quantity} adet ${product.title} sepete eklendi`;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 1800);
  if (goToCart) setTimeout(() => { location.href = "../?cart=open"; }, 250);
}

document.querySelectorAll("[data-finish]").forEach(button => button.addEventListener("click", () => {
  selectedFinish = button.dataset.finish;
  document.querySelectorAll("[data-finish]").forEach(option => option.classList.toggle("is-active", option === button));
  document.querySelector("[data-selected-finish]").textContent = selectedFinish;
}));

document.querySelector("[data-decrease]").addEventListener("click", () => { quantity = Math.max(1, quantity - 1); document.querySelector("[data-quantity]").textContent = quantity; });
document.querySelector("[data-increase]").addEventListener("click", () => { quantity += 1; document.querySelector("[data-quantity]").textContent = quantity; });
document.querySelectorAll("[data-add-product]").forEach(button => button.addEventListener("click", () => addToCart(false)));
document.querySelectorAll("[data-buy-product]").forEach(button => button.addEventListener("click", () => addToCart(true)));

const favoriteButton = document.querySelector("[data-favorite-product]");
function renderFavorite() {
  const active = favorites.has(product.id);
  favoriteButton.classList.toggle("is-active", active);
  favoriteButton.setAttribute("aria-pressed", String(active));
  favoriteButton.querySelector("i").className = `${active ? "ph-fill" : "ph"} ph-heart`;
}
favoriteButton.addEventListener("click", () => {
  favorites.has(product.id) ? favorites.delete(product.id) : favorites.add(product.id);
  localStorage.setItem("ahmet-favorites", JSON.stringify([...favorites]));
  renderFavorite();
});

const related = [...productCatalog].filter(item => item.id !== product.id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 3);
document.querySelector("[data-related]").innerHTML = related.map(item => `<a class="related-card" href="?id=${item.id}"><img src="${asset(item.image)}" alt="${item.title}" loading="lazy"><span>${item.category}</span><strong>${item.title}</strong><b>${formatMoney(item.price)}</b></a>`).join("");

updateCartCount();
renderFavorite();
