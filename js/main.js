/* ════════════════════════════════════
   BRA SAX — main.js
   ════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Scroll-reveal (IntersectionObserver) ──
const revealTargets = document.querySelectorAll(
  '.service-card, .about-inner, .gallery-item, .location-inner, .stat, .section-header'
);
revealTargets.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// ── Google Reviews (5 stjärnor, blandade namn) ──
// Riktiga Google-recensioner för Bra Sax (4–5 stjärnor, med recensionstext)
const reviews = [
  { name: 'Zijad Zekic',       initials: 'ZZ', rating: 5, text: 'Duktiga barberare som klipper håret på mindre än en halvtimme. Oslagbar kombination av pris, professionellt bemötande samt bra barberare! Rekommenderas starkt!' },
  { name: 'Swapnil Sur',        initials: 'SS', rating: 5, text: 'I had my best haircut from Mr. Haitham here. Highly recommended for everyone in the Hisingen region.' },
  { name: 'Bastian Rojas',      initials: 'BR', rating: 5, text: 'Ska man klippa sig någonstans, så ska man besöka Bra Sax på Herkulesgatan. Personalen är mycket pålitlig och kan sin sak.' },
  { name: 'Hans Johansson',     initials: 'HJ', rating: 5, text: 'Dom är duktiga, noga och trevliga.' },
  { name: 'Maxime Koitsalu',    initials: 'MK', rating: 5, text: 'One of the best hair saloons on Hisingen/Backaplan region. They do the job fast and quick.' },
  { name: 'nour alhajji',       initials: 'NA', rating: 5, text: 'Mohammad bästa frisören, utmärkt service med lång erfarenhet och utmärkt bemötande. Jag rekommenderar starkt denna salong.' },
  { name: 'Jens Jardving',      initials: 'JJ', rating: 4, text: 'Rakning och klippningen är perfekt. Drop-in. Det går fort också.' },
  { name: 'Giovanni Salaris',   initials: 'GS', rating: 5, text: 'Alltid ett gott bemötande. Alltid nöjd efter jag klippt mig.' },
  { name: 'Justin George',      initials: 'JG', rating: 5, text: 'Friendly staff, good service, not very costly.' },
  { name: 'Jaydn Sjöstrand',    initials: 'JS', rating: 5, text: 'Duktiga frisörer som klipper för en billig peng!' },
  { name: 'Borgbör Åsgeirsson', initials: 'BÅ', rating: 5, text: 'Professional and great service! Highly recommend Bra Sax.' },
  { name: 'Henrik Olsson',      initials: 'HO', rating: 5, text: 'Trevliga och duktiga frisörer.' },
  { name: 'Petar Sindija',      initials: 'PS', rating: 5, text: 'My favorite barbers of them all.' },
  { name: 'Jonas Fallenius',    initials: 'JF', rating: 5, text: 'Professionellt och toppenresultat.' },
  { name: 'Wojtek Es',          initials: 'WE', rating: 5, text: 'Very very nice guy. Professional.' },
  { name: 'Anders Ekholm',      initials: 'AE', rating: 5, text: 'Ett riktigt klipp helt enkelt.' },
  { name: 'Mohammed Alhajar',   initials: 'MA', rating: 5, text: 'Nice staff and good price.' },
  { name: 'Mostafa Ahmadi',     initials: 'MA', rating: 5, text: 'Väldigt bra frisör, trevligt bemötande.' },
];

const GOOGLE_LOGO_SVG = `<svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
  <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.59.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/>
</svg>`;

function buildCard(r) {
  const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
  return `<article class="review-card">
    <div class="review-header">
      <div class="review-avatar">${r.initials}</div>
      <div class="review-author">
        <strong>${r.name}</strong>
      </div>
    </div>
    <div class="review-stars">${stars}</div>
    <p class="review-text">"${r.text}"</p>
    <div class="review-source">${GOOGLE_LOGO_SVG} Google recension</div>
  </article>`;
}

function renderMarquee() {
  const row1 = document.getElementById('marqueeRow1');
  if (!row1) return;
  // Duplicera för sömlös loop
  row1.innerHTML = [...reviews, ...reviews].map(buildCard).join('');
}

renderMarquee();

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Flytande Ring/Boka-knapp (FAB) ──
const fabBtn    = document.getElementById('fabBtn');
const fabPopup  = document.getElementById('fabPopup');

fabBtn.addEventListener('click', () => {
  const isOpen = fabPopup.classList.toggle('open');
  fabBtn.classList.toggle('open', isOpen);
  fabPopup.setAttribute('aria-hidden', String(!isOpen));
});

// Stäng popup vid klick utanför
document.addEventListener('click', (e) => {
  if (!fabBtn.contains(e.target) && !fabPopup.contains(e.target)) {
    fabPopup.classList.remove('open');
    fabBtn.classList.remove('open');
    fabPopup.setAttribute('aria-hidden', 'true');
  }
});

// Stäng popup vid scroll (valfritt — bra UX på mobil)
window.addEventListener('scroll', () => {
  fabPopup.classList.remove('open');
  fabBtn.classList.remove('open');
  fabPopup.setAttribute('aria-hidden', 'true');
}, { passive: true });

// ── Gallery swipe dots ──
const galleryGrid = document.querySelector('.gallery-grid');
const galleryDots = document.querySelectorAll('.gallery-dot');
if (galleryGrid && galleryDots.length) {
  galleryGrid.addEventListener('scroll', () => {
    const center = galleryGrid.scrollLeft + galleryGrid.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    galleryGrid.querySelectorAll('.gallery-item').forEach((item, i) => {
      const dist = Math.abs((item.offsetLeft + item.offsetWidth / 2) - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    galleryDots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }, { passive: true });
}

// ── Öppet/Stängt-pill + today-row ──
function updateHoursUI() {
  const now  = new Date();
  const day  = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();

  // Mån–Fre 10–18, Lör 10–15, Sön stängt
  let isOpen = false;
  if (day >= 1 && day <= 5) isOpen = time >= 600 && time < 1080;
  if (day === 6)             isOpen = time >= 600 && time < 900;

  const pill = document.getElementById('statusPill');
  const txt  = document.getElementById('statusTxt');
  if (pill && txt) {
    txt.textContent = isOpen ? 'Nu öppet' : 'Stängt nu';
    pill.classList.toggle('closed-pill', !isOpen);
  }

  // Markera dagens rad
  document.querySelectorAll('#hoursTable tr[data-day]').forEach(row => {
    row.classList.toggle('today-row', Number(row.dataset.day) === day);
  });
}
updateHoursUI();
