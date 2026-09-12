import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "hakkımda", href: "#about" },
  { label: "eğitim", href: "#education" },
  { label: "iletişim", href: "#connect" },
];

const milestones = [
  { year: "2024", body: <><strong>Fevzi Çakmak Anadolu Lisesinden</strong> mezun oldum.</>, image: "/assets/fevzi-cakmak-school.png", alt: "Fevzi Çakmak Anadolu Lisesi binası", className: "milestone--school" },
  { year: "2025", body: <><strong>İstanbul Üniversitesi Fizik</strong> bölümünü kazandım.</>, image: "/assets/istanbul-university-logo.png", alt: "İstanbul Üniversitesi amblemi", className: "milestone--logo" },
  { year: "Şu anda", body: <>Eğitimime <strong>İstanbul Üniversitesi Fizik</strong> bölümünde <strong>ikinci sınıf</strong> olarak devam ediyorum.</>, image: "/assets/istanbul-university-gate.png", alt: "İstanbul Üniversitesi tarihi kapısı", className: "milestone--gate" },
];

export function App() {
  const pageRef = useRef(null);
  const storyRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderParallax = () => {
      frameId = 0;
      page.style.setProperty("--pointer-x", pointerX.toFixed(3));
      page.style.setProperty("--pointer-y", pointerY.toFixed(3));
    };
    const handlePointerMove = (event) => {
      if (media.matches) return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
      if (!frameId) frameId = window.requestAnimationFrame(renderParallax);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const sections = [...page.querySelectorAll("section[id]")];
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id === "about" ? "eğitim" : visible.target.id === "connect" ? "iletişim" : "hakkımda");
    }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => sectionObserver.observe(section));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const select = gsap.utils.selector(page);
        const card = select(".story-card")[0];
        const aboutSheet = select(".paper-layer--about")[0];
        const educationSheet = select(".paper-layer--education")[0];
        const kraftSheet = select(".paper-layer--kraft")[0];
        const target = select(".story-card-target")[0];
        const stage = select(".story-stage")[0];
        const getCardTravel = () => {
          const stageBounds = stage.getBoundingClientRect();
          const targetBounds = target.getBoundingClientRect();
          return {
            x: targetBounds.left - (stageBounds.left + stageBounds.width * 0.55),
            y: targetBounds.top - (stageBounds.top + stageBounds.height * 0.5),
          };
        };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
            invalidateOnRefresh: true,
            onUpdate: (self) => page.style.setProperty("--story-progress", self.progress.toFixed(3)),
          },
        });

        tl.set(card, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: -4, scale: 1 }, 0)
          .set(kraftSheet, { xPercent: -3, yPercent: 2, rotation: -7, scale: 1.03, zIndex: 1 }, 0)
          .set(educationSheet, { xPercent: 3, yPercent: -1, rotation: 4.5, scale: 1.01, zIndex: 2 }, 0)
          .set(aboutSheet, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, zIndex: 3 }, 0)
          .to(card, {
            x: () => getCardTravel().x * 0.12,
            y: () => getCardTravel().y * 0.06 - 18,
            rotation: -5.2,
            scale: 1.025,
            duration: 0.075,
            ease: "power2.out",
          }, 0)
          .to(card, {
            x: () => getCardTravel().x * 0.56,
            y: () => getCardTravel().y * 0.48 - 10,
            rotation: 2.2,
            scale: 0.89,
            duration: 0.13,
            ease: "power1.inOut",
          }, 0.075)
          .to(educationSheet, {
            xPercent: -18,
            yPercent: -14,
            rotation: -9,
            scale: 1.035,
            duration: 0.085,
            ease: "power3.inOut",
          }, 0.08)
          .to(aboutSheet, {
            xPercent: 4,
            yPercent: 5,
            rotation: 3,
            scale: 0.985,
            duration: 0.09,
            ease: "power2.inOut",
          }, 0.105)
          .set(educationSheet, { zIndex: 5 }, 0.165)
          .to(educationSheet, {
            xPercent: 0,
            yPercent: 0,
            rotation: 0.8,
            scale: 1,
            duration: 0.13,
            ease: "power4.out",
          }, 0.165)
          .to(card, {
            x: () => getCardTravel().x,
            y: () => getCardTravel().y,
            rotation: 0.7,
            scale: 0.78,
            duration: 0.115,
            ease: "back.out(1.15)",
          }, 0.205)
          .fromTo(".card-title--education", { autoAlpha: 0, yPercent: 18, rotation: 1.5 }, { autoAlpha: 1, yPercent: 0, rotation: -2, duration: 0.1, ease: "power3.out" }, 0.205)
          .fromTo(".red-underline", { scaleX: 0, autoAlpha: 0, rotation: -5 }, { scaleX: 1, autoAlpha: 1, rotation: -3, duration: 0.085, ease: "power3.out" }, 0.295)
          .fromTo(".story-quote", { autoAlpha: 0, x: 16, y: 6 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.11, ease: "power3.out" }, 0.35)
          .fromTo(".quote-line", { autoAlpha: 0, yPercent: 55 }, { autoAlpha: 1, yPercent: 0, stagger: 0.035, duration: 0.09, ease: "power4.out" }, 0.365)
          .fromTo(".timeline-spine", { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 0.42, ease: "power1.inOut" }, 0.405)
          .fromTo(".milestone-copy", { autoAlpha: 0, x: -18, y: 16 }, { autoAlpha: 1, x: 0, y: 0, stagger: 0.125, duration: 0.145, ease: "power3.out" }, 0.45)
          .fromTo(".year-char", { autoAlpha: 0, yPercent: 70, rotation: 7 }, { autoAlpha: 1, yPercent: 0, rotation: 0, stagger: 0.012, duration: 0.075, ease: "power4.out" }, 0.455)
          .fromTo(".timeline-dot", { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, stagger: 0.125, duration: 0.1, ease: "back.out(2)" }, 0.445)
          .fromTo(".milestone-art", { autoAlpha: 0, x: 28, y: 12, scale: 0.9, rotation: -2.2 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, stagger: 0.125, duration: 0.18, ease: "power4.out" }, 0.49)
          .fromTo(".milestone-copy p", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.125, duration: 0.12, ease: "power3.out" }, 0.505)
          .fromTo(".final-note", { autoAlpha: 0, rotation: -4, y: 9 }, { autoAlpha: 1, rotation: -2, y: 0, duration: 0.1, ease: "power3.out" }, 0.9)
          .to(".scroll-cue", { autoAlpha: 0, duration: 0.05 }, 0.08);
        return () => tl.kill();
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".card-title--education", ".story-quote", ".quote-line", ".milestone", ".milestone-copy", ".year-char", ".milestone-art", ".timeline-dot", ".timeline-spine", ".final-note"], { autoAlpha: 1 });
        gsap.set(".paper-layer--education", { zIndex: 5, xPercent: 0, yPercent: 0, rotation: .8 });
        gsap.set(".paper-layer--about", { xPercent: 4, yPercent: 5, rotation: 3 });
      });
      return () => mm.revert();
    }, page);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      sectionObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, []);

  return (
    <main className="portfolio" ref={pageRef}>
      <aside className="motif-rail motif-rail--page" aria-hidden="true"><img src="/assets/motif-rail-long.png" alt="" /></aside>
      <section className="hero" aria-label="Baran'ın portfolyo girişi">
        <nav className="primary-navigation" aria-label="Ana navigasyon">
          {navItems.map((item) => <a className={activeSection === item.label ? "is-active" : undefined} href={item.href} key={item.label} onClick={() => setActiveSection(item.label)}>{item.label}</a>)}
        </nav>
        <article className="notebook-shell" aria-label="Baran'ın portfolyo defteri kapağı"><img className="notebook-art" src="/assets/notebook-hero.png" alt="Elinde tasarım panosu tutan Baran'ın çizildiği spiralli defter" /></article>
      </section>

      <section id="about" className="story-scroll" ref={storyRef} aria-labelledby="education-title">
        <div className="story-stage">
          <span className="story-card-target" aria-hidden="true" />
          <div className="story-card">
            <div className="paper-layer paper-layer--kraft" aria-hidden="true"><img src="/assets/torn-kraft-paperclip.png" alt="" /></div>
            <div className="paper-layer paper-layer--education">
              <img src="/assets/torn-grid-tape.png" alt="Bantla tutturulmuş yırtık kareli kâğıt" />
              <span id="education-title" className="card-title card-title--education"><span className="card-title-word">Eğitimim<span className="red-underline" /></span></span>
            </div>
            <div className="paper-layer paper-layer--about">
              <img src="/assets/torn-paper-card.png" alt="Yırtık çizgili kâğıt" />
              <span className="card-title card-title--about">Ben<br />Kimim?</span>
            </div>
          </div>
          <blockquote className="story-quote"><span className="quote-line">“Daha iyi sorular,</span><span className="quote-line">daha iyi yarınlar.”</span></blockquote>
          <div id="education" className="education-timeline">
            <span className="timeline-spine" aria-hidden="true" />
            {milestones.map((item) => (
              <article className={`milestone ${item.className}`} key={item.year}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="milestone-copy"><h2 aria-label={item.year}>{[...item.year].map((character, index) => <span className="year-char" aria-hidden="true" key={`${item.year}-${index}`}>{character === " " ? "\u00a0" : character}</span>)}</h2><p>{item.body}</p></div>
                <img className="milestone-art" src={item.image} alt={item.alt} />
              </article>
            ))}
          </div>
          <p className="final-note">Daha keşfedilecek<br />çok şey var. ↗</p>
          <p className="scroll-cue" aria-hidden="true"><span /> kaydır</p>
        </div>
      </section>
      <section id="connect" className="connect-section"><span>Bir sonraki sayfa?</span><p>Birlikte güzel bir şey tasarlayalım.</p><a href="mailto:merhaba@baran.design">merhaba@baran.design <i aria-hidden="true">↗</i></a></section>
      <p className="sr-only" aria-live="polite">{activeSection ? `${activeSection} bölümü seçildi.` : ""}</p>
    </main>
  );
}
