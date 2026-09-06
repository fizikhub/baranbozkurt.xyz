# baranbozkurt.xyz

Baran Bozkurt — Web Geliştirici · AI Destekli Ürün Geliştirme. Kişisel site.

- **Alan Adı:** [baranbozkurt.xyz](https://baranbozkurt.xyz)
- **Hosting:** GitHub Pages (main dalından yayın)

## Yapı

Bağımlılıksız, el yapımı statik site. Build adımı yok — dosyalar doğrudan yayınlanır.

```
index.html                  Ana sayfa
about/index.html            Hakkımda
work/index.html             Çalışmalar
case-studies/*/index.html   5 gerçek proje sayfası
assets/styles.css           Tasarım sistemi (mobil-first)
assets/script.js            Menü + reveal + header (vanilla JS)
404.html · robots.txt · sitemap.xml
CNAME · .nojekyll
```

## İlkeler

- Mobil-first, `clamp()` akışkan tipografi, taşma yok (`overflow-x: clip`)
- Animasyonlar sadece `transform`/`opacity`, `prefers-reduced-motion` destekli
- Erişilebilirlik: skip-link, tek `h1`, odak halkaları, ≥44px dokunma hedefleri
- SEO + GEO: canonical, OG/Twitter, JSON-LD (Person/WebSite), sitemap, robots

## Yayın

```bash
git add -A && git commit -m "mesaj" && git push origin main
```
