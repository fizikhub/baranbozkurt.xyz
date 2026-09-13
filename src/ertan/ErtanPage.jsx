import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const process = [
  {
    name: "Tanımak",
    text: "Konu yalnızca ölçü değil. Duruş, yaşam ritmi ve kıyafetin kullanılacağı an birlikte okunur.",
  },
  {
    name: "Biçimlemek",
    text: "Kumaş, yaka ve kalıp vücut proporsiyonuna göre tek bir siluette buluşur.",
  },
  {
    name: "Tamamlamak",
    text: "Binlerce ilmek, el işçiliği ve iki prova. Sonuç; sahibinden başkasına ait olamayacak kadar kişisel.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ErtanPage() {
  const pageRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(".ec-brand, .ec-menu-toggle", { y: -18, opacity: 0, duration: 0.75 }, 0.15)
          .from(".ec-hero-word span", { yPercent: 110, stagger: 0.065, duration: 1.05 }, 0.12)
          .from(".ec-hero-portrait", { scale: 1.08, opacity: 0, duration: 1.25 }, 0.08)
          .from(".ec-hero-meta > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.65 }, 0.62)
          .from(".ec-scroll-mark", { opacity: 0, duration: 0.5 }, 0.95);

        gsap.to(".ec-hero-portrait", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: ".ec-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        gsap.to(".ec-hero-title", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: ".ec-hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });

        gsap.utils.toArray(".ec-reveal").forEach((element) => {
          gsap.from(element, {
            y: 44,
            opacity: 0,
            immediateRender: false,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });

        gsap.from(".ec-process-item", {
          x: 54,
          opacity: 0,
          immediateRender: false,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ec-process-list", start: "top 78%", once: true },
        });

        return () => intro.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".ec-hero-word span", ".ec-hero-portrait", ".ec-hero-meta > *", ".ec-reveal", ".ec-process-item"], {
          clearProps: "all",
          opacity: 1,
        });
      });

      return () => mm.revert();
    }, page);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="ec-page" ref={pageRef}>
      <header className="ec-header">
        <a className="ec-brand" href="#top" aria-label="Ertan Çelik ana sayfa">
          <span>EC</span>
          <span>Ertan Çelik<br />Tailor Made</span>
        </a>
        <button
          className="ec-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="ec-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>{menuOpen ? "Kapat" : "Menü"}</span>
          <i aria-hidden="true"><b /><b /></i>
        </button>
        <nav id="ec-menu" className={`ec-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <a href="#hikaye" onClick={closeMenu}>Hikâye <small>01</small></a>
          <a href="#yaklasim" onClick={closeMenu}>Yaklaşım <small>02</small></a>
          <a href="#portre" onClick={closeMenu}>Portre <small>03</small></a>
          <a href="#iletisim" onClick={closeMenu}>İletişim <small>04</small></a>
        </nav>
      </header>

      <section id="top" className="ec-hero" aria-labelledby="ec-title">
        <div className="ec-hero-image" aria-hidden="true">
          <img className="ec-hero-portrait" src="/assets/ertancelik/ertan-suit.jpg" alt="" fetchPriority="high" />
        </div>
        <div className="ec-hero-shade" aria-hidden="true" />
        <h1 id="ec-title" className="ec-hero-title" aria-label="Ertan Çelik">
          <span className="ec-hero-word"><span>Ertan</span></span>
          <span className="ec-hero-word ec-hero-word--last"><span>Çelik</span></span>
        </h1>
        <div className="ec-hero-meta">
          <p>Terzi · Tasarımcı · Kurucu</p>
          <a href="#hikaye">Portreyi keşfet <Arrow /></a>
          <span>İstanbul · 2010’dan beri</span>
        </div>
        <a className="ec-scroll-mark" href="#hikaye" aria-label="Hikâyeye ilerle">
          <span>Kaydır</span><i aria-hidden="true" />
        </a>
      </section>

      <section id="hikaye" className="ec-statement">
        <p className="ec-statement-side ec-reveal">Ertan Çelik hakkında</p>
        <div className="ec-statement-copy ec-reveal">
          <h2>Hazır olanı giydirmez.<br /><em>Kişiyi</em> biçimlendirir.</h2>
          <p>
            Çocuklukta başlayan terzilik tutkusu, 2010’da kendi adını taşıyan bir markaya dönüştü.
            Bugün Ertan Çelik; ölçüyü, kumaşı ve karakteri aynı çizgide buluşturan kişiye özel
            erkek giyiminin seçkin isimlerinden biri.
          </p>
        </div>
        <div className="ec-measure" aria-hidden="true">
          <span>0</span><i /><i /><i /><i /><i /><i /><i /><i /><span>100</span>
        </div>
      </section>

      <section id="yaklasim" className="ec-craft">
        <div className="ec-craft-image ec-reveal">
          <img src="/assets/ertancelik/ertan-gallery.jpg" alt="Ertan Çelik, sanat eserlerinin sergilendiği bir mekânda" loading="lazy" />
          <p>Detaya bakan göz,<br />bütünü değiştirir.</p>
        </div>
        <div className="ec-craft-content">
          <div className="ec-craft-heading ec-reveal">
            <p>Bir kıyafetin anatomisi</p>
            <h2>Ölçüden önce<br />insan gelir.</h2>
          </div>
          <div className="ec-process-list">
            {process.map((item, index) => (
              <article className="ec-process-item" key={item.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ec-materials" aria-labelledby="materials-title">
        <div className="ec-materials-title ec-reveal">
          <p>Tailor Made</p>
          <h2 id="materials-title">Kalite, görünmeyen<br />yerde başlar.</h2>
        </div>
        <div className="ec-materials-grid">
          <p className="ec-reveal">İtalya’dan seçilen kumaş ve astarlar</p>
          <p className="ec-reveal">Kıl tela ile doğal ve dinamik form</p>
          <p className="ec-reveal">İplikten düğmeye titiz seçim</p>
          <p className="ec-reveal">Usta ellerde tamamlanan iki prova</p>
        </div>
        <blockquote className="ec-reveal">
          “Bir kıyafeti özel kılan<br /><em>kumaşı ve kalıbıdır.</em>”
          <cite>— Ertan Çelik</cite>
        </blockquote>
      </section>

      <section id="portre" className="ec-portrait">
        <div className="ec-portrait-copy ec-reveal">
          <p>Atölyenin dışında</p>
          <h2>Sakin bir güven.<br />Net bir duruş.</h2>
          <span>
            İşini tutkuyla yapan bir usta; sanat, mimari ve gündelik zarafetten beslenen bir estetik
            göz. Onun için stil, ses yükseltmeden iz bırakma biçimi.
          </span>
        </div>
        <figure className="ec-portrait-photo ec-reveal">
          <img src="/assets/ertancelik/ertan-residence.jpg" alt="Ertan Çelik modern bir iç mekânda" loading="lazy" />
          <figcaption>İstanbul, 2026</figcaption>
        </figure>
      </section>

      <section className="ec-press">
        <p className="ec-reveal">Basından</p>
        <a
          className="ec-press-link ec-reveal"
          href="https://www.klassmagazin.com/ertan-celik-ertan-celik-tailor-made-ile-erkek-modasinda-fark-yaratti"
          target="_blank"
          rel="noreferrer"
        >
          <span>Klass Magazin</span>
          <strong>“Erkek modasında fark yarattı.”</strong>
          <small>Aralık 2025 <Arrow /></small>
        </a>
      </section>

      <footer id="iletisim" className="ec-footer">
        <div className="ec-footer-main ec-reveal">
          <p>Kişiye özel bir başlangıç</p>
          <h2>Tanışalım.</h2>
          <span className="ec-contact-note">Randevu bilgileri yayına geçerken eklenecek <Arrow /></span>
        </div>
        <div className="ec-footer-bottom">
          <span>© {new Date().getFullYear()} Ertan Çelik</span>
          <span>Ertan Çelik Tailor Made</span>
          <a href="#top">Yukarı dön ↑</a>
        </div>
      </footer>
    </main>
  );
}
