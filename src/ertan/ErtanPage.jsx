export function ErtanPage() {
  return (
    <main className="profile-page" id="top">
      <header className="site-header">
        <a href="#top" className="site-name">Ertan Çelik</a>
        <nav aria-label="Ana navigasyon">
          <a href="#profil">Profil</a>
          <a href="#marka">Marka</a>
          <a href="#basin">Basın</a>
        </nav>
      </header>

      <section className="opening" aria-labelledby="page-title">
        <div className="opening-heading">
          <h1 id="page-title">Ertan Çelik</h1>
          <p>Kurucu, Ertan Çelik Tailor Made</p>
        </div>
        <figure className="opening-image">
          <img src="/assets/ertancelik/ertan-suit.jpg" alt="Ertan Çelik siyah takım elbisesiyle" fetchPriority="high" />
          <figcaption><span>Kurucu ve tasarımcı</span><span>İstanbul, Türkiye</span></figcaption>
        </figure>
      </section>

      <section className="biography" id="profil" aria-labelledby="biography-title">
        <p className="section-name">Profil</p>
        <div className="biography-content">
          <h2 id="biography-title">Kişiye özel erkek giyiminde on beş yılı aşan bir birikim.</h2>
          <div className="biography-copy">
            <p>Terziliğe çocukluk yıllarında ilgi duyan Ertan Çelik, aldığı eğitimin ardından 2010 yılında kendi adını taşıyan markasını kurdu.</p>
            <p>Bugün tasarım ve üretim sürecinin her aşamasında yer alıyor. Müşterinin vücut yapısı, yaşam biçimi ve beklentileri doğrultusunda; kumaştan kalıba, yakadan düğmeye kadar tüm detayları birlikte ele alıyor.</p>
          </div>
        </div>
      </section>

      <section className="business" id="marka" aria-labelledby="business-title">
        <div className="business-title">
          <p>2010 — İstanbul</p>
          <h2 id="business-title">Ertan Çelik<br />Tailor Made</h2>
        </div>
        <div className="business-body">
          <p>Dünyanın seçkin kumaşlarını usta el işçiliğiyle buluşturan marka, kişiye özel takım elbise ve erkek giyim tasarımları hazırlıyor.</p>
          <dl>
            <div><dt>Üretim</dt><dd>Tamamen kişiye özel</dd></div>
            <div><dt>Malzeme</dt><dd>İtalyan kumaş ve astarlar</dd></div>
            <div><dt>Yapı</dt><dd>Kıl tela uygulaması</dd></div>
            <div><dt>Süreç</dt><dd>İki prova</dd></div>
          </dl>
        </div>
      </section>

      <section className="perspective" aria-labelledby="perspective-title">
        <div className="perspective-images">
          <figure><img src="/assets/ertancelik/ertan-gallery.jpg" alt="Ertan Çelik bir sanat galerisinde" loading="lazy" /></figure>
          <figure><img src="/assets/ertancelik/ertan-residence.jpg" alt="Ertan Çelik modern bir iç mekânda" loading="lazy" /></figure>
        </div>
        <div className="perspective-copy">
          <h2 id="perspective-title">“Bir kıyafeti özel kılan kumaşı ve kalıbıdır.”</h2>
          <p>Ertan Çelik</p>
        </div>
      </section>

      <section className="press" id="basin" aria-labelledby="press-title">
        <h2 id="press-title">Basın</h2>
        <div className="press-list">
          <a href="https://www.klassmagazin.com/ertan-celik-ertan-celik-tailor-made-ile-erkek-modasinda-fark-yaratti" target="_blank" rel="noreferrer">
            <span>Klass Magazin</span>
            <strong>Ertan Çelik Tailor Made ile erkek modasında fark yarattı</strong>
            <span>02 Aralık 2025&nbsp; ↗</span>
          </a>
          <a href="https://www.klassmagazin.com/ertan-celik-kiyafetleri-hazirlarken-yuz-ve-vucut-yapisina-gore-en-iyi-kumas-ile-birlikte-en-dogru-modeli-tasarliyorum" target="_blank" rel="noreferrer">
            <span>Klass Magazin</span>
            <strong>En iyi kumaş ile en doğru modeli tasarlıyorum</strong>
            <span>01 Şubat 2025&nbsp; ↗</span>
          </a>
        </div>
      </section>

      <footer>
        <div><strong>Ertan Çelik</strong><span>Tailor Made</span></div>
        <p>İstanbul, Türkiye</p>
        <a href="#top">Yukarı ↑</a>
      </footer>
    </main>
  );
}
