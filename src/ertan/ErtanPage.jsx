const details = [
  ["Kuruluş", "2010"],
  ["Alan", "Kişiye özel erkek giyim"],
  ["Merkez", "İstanbul"],
];

export function ErtanPage() {
  return (
    <main className="ertan-page" id="top">
      <header className="ertan-header">
        <a className="ertan-wordmark" href="#top" aria-label="Ertan Çelik ana sayfa">Ertan Çelik</a>
        <nav aria-label="Ana navigasyon">
          <a href="#hakkinda">Hakkında</a>
          <a href="#calismalari">Çalışmaları</a>
          <a href="#basin">Basın</a>
        </nav>
      </header>

      <section className="ertan-hero" aria-labelledby="ertan-title">
        <div className="ertan-hero-copy">
          <p className="ertan-role">Kurucu · Ertan Çelik Tailor Made</p>
          <h1 id="ertan-title">Ertan<br />Çelik</h1>
          <p className="ertan-intro">Kişiye özel erkek giyiminde ölçü, malzeme ve el işçiliğini tek bir çizgide buluşturuyor.</p>
          <a className="ertan-text-link" href="#hakkinda">Profili inceleyin <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="ertan-hero-photo">
          <img src="/assets/ertancelik/ertan-suit.jpg" alt="Ertan Çelik koyu renk takım elbisesiyle" fetchPriority="high" />
        </figure>
      </section>

      <section className="ertan-profile" id="hakkinda" aria-labelledby="profile-title">
        <h2 id="profile-title">Terziliği bir meslekten önce, insanı anlama işi olarak görüyor.</h2>
        <div className="ertan-profile-body">
          <p>Çocukluk yıllarında başlayan terzilik ilgisini mesleki eğitimle geliştiren Ertan Çelik, 2010 yılında kendi adını taşıyan Ertan Çelik Tailor Made markasını kurdu.</p>
          <p>Tasarım sürecini müşterinin yaşam biçimi, vücut proporsiyonu ve kişisel zevki üzerinden ele alıyor. Kumaştan yakaya, düğmeden astara kadar her karar aynı bütünün parçası.</p>
        </div>
        <dl className="ertan-details">
          {details.map(([term, description]) => (
            <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
          ))}
        </dl>
      </section>

      <section className="ertan-work" id="calismalari" aria-labelledby="work-title">
        <div className="ertan-work-copy">
          <h2 id="work-title">Ertan Çelik<br />Tailor Made</h2>
          <p>Dünyanın seçkin kumaşlarını geleneksel el işçiliğiyle bir araya getiren marka; iş, siyaset ve spor dünyasından isimler için kişiye özel tasarımlar hazırlıyor.</p>
          <p>Her parça müşteriye göre oluşturulan kalıp, kıl tela uygulaması, özel astar ve düğme seçimleriyle tamamlanıyor. Süreç iki prova ile sonuca ulaşıyor.</p>
        </div>
        <figure className="ertan-work-photo">
          <img src="/assets/ertancelik/ertan-gallery.jpg" alt="Ertan Çelik bir sanat galerisinde" loading="lazy" />
        </figure>
      </section>

      <section className="ertan-principle" aria-label="Çalışma yaklaşımı">
        <blockquote>“Bir kıyafeti özel kılan kumaşı ve kalıbıdır.”</blockquote>
        <p>— Ertan Çelik</p>
      </section>

      <section className="ertan-personal" aria-labelledby="personal-title">
        <figure><img src="/assets/ertancelik/ertan-residence.jpg" alt="Ertan Çelik modern bir iç mekânda" loading="lazy" /></figure>
        <div>
          <h2 id="personal-title">Sade, ölçülü ve kendine özgü.</h2>
          <p>Ertan Çelik’in yaklaşımında stil, dikkat çekmek için değil; kişinin karakterini doğru biçimde ifade etmek için var. Aynı anlayış hem işine hem günlük yaşamına yön veriyor.</p>
        </div>
      </section>

      <section className="ertan-press" id="basin" aria-labelledby="press-title">
        <h2 id="press-title">Basında</h2>
        <a href="https://www.klassmagazin.com/ertan-celik-ertan-celik-tailor-made-ile-erkek-modasinda-fark-yaratti" target="_blank" rel="noreferrer">
          <span>Klass Magazin</span>
          <strong>Ertan Çelik Tailor Made ile erkek modasında fark yarattı</strong>
          <span>Aralık 2025&nbsp; ↗</span>
        </a>
      </section>

      <footer className="ertan-footer">
        <div><a className="ertan-wordmark" href="#top">Ertan Çelik</a><p>Tailor Made</p></div>
        <p>İletişim bilgileri yayına geçişte eklenecektir.</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
