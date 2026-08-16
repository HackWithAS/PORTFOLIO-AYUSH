/* ─── Splash → Home ─── */
const splash = document.getElementById('splash');
const home = document.getElementById('home');
document.getElementById('enterBtn').addEventListener('click', () => {
  splash.classList.add('hide');
  home.classList.add('show');
  document.body.style.overflow = '';
});

/* ─── Theme Toggle (default: light, set in HTML. Dark is opt-in, in-memory only) ─── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
themeBtn.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
themeBtn.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark-theme');
  html.classList.toggle('light-theme', !isDark);
  themeBtn.innerHTML = isDark
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>';
});

/* ─── Live clock (with seconds) on splash ─── */
const splashClock = document.getElementById('splashClock');
function tickClock() {
  if (!splashClock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  splashClock.textContent = `${h}:${m}:${s}`;
}
tickClock();
setInterval(tickClock, 1000);

/* ─── Visit counter ───
   Uses a free public counter (countapi.xyz) so the number reflects
   everyone who has opened the site, not just this one browser.
   Falls back to a local (this-device-only) count if the request fails
   (e.g. offline, or the API is unreachable). */
(function trackVisits() {
  const visitEl = document.getElementById('visitCount');
  if (!visitEl) return;

  function showLocalFallback() {
    let n = parseInt(localStorage.getItem('hwas_local_visits') || '0', 10) + 1;
    localStorage.setItem('hwas_local_visits', String(n));
    visitEl.textContent = n.toLocaleString();
  }

  fetch('https://api.countapi.xyz/hit/hackwithas.in/site-visits')
    .then(res => {
      if (!res.ok) throw new Error('counter unavailable');
      return res.json();
    })
    .then(data => {
      if (data && typeof data.value === 'number') {
        visitEl.textContent = data.value.toLocaleString();
      } else {
        showLocalFallback();
      }
    })
    .catch(showLocalFallback);
})();

/* ─── Age (from DOB) ─── */
function calcAge(day, month, year) {
  const today = new Date();
  const dob = new Date(year, month - 1, day);
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
}
const ageStat = document.getElementById('ageStat');
if (ageStat) {
  ageStat.textContent = calcAge(1, 1, 2007); // DOB: 1 Jan 2007
}

/* ─── Tab / Filter Navigation ─── */
const sections = document.querySelectorAll('.tab-section');
const ftabs = document.querySelectorAll('.ftab');
const mobTabs = document.querySelectorAll('.mob-ftab');

function showSection(id) {
  sections.forEach(s => s.classList.toggle('active', s.dataset.section === id));
  ftabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
  mobTabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
  document.getElementById('content').scrollTo({ top: 0 });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

ftabs.forEach(t => t.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(t.dataset.section);
}));
mobTabs.forEach(t => t.addEventListener('click', () => {
  showSection(t.dataset.section);
  closeMobileMenu();
}));

/* Any element with data-goto jumps to a section (e.g. hero "View Projects") */
document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', () => showSection(el.dataset.goto));
});

document.getElementById('brandHome').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('about');
});

/* ─── Mobile Nav ─── */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
function closeMobileMenu() {
  hbg.classList.remove('on');
  mob.classList.remove('on');
  hbg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hbg.addEventListener('click', () => {
  const isOpen = mob.classList.toggle('on');
  hbg.classList.toggle('on', isOpen);
  hbg.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* ─── Back to top ─── */
window.addEventListener('scroll', () => {
  document.getElementById('btt').classList.toggle('on', window.scrollY > 400);
});
document.getElementById('btt').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Project Filter (within Projects tab) ─── */
const ptabs = document.querySelectorAll('.ptab');
const cards = document.querySelectorAll('.proj-card');
ptabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ptabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', !(filter === 'all' || card.dataset.cat === filter));
    });
  });
});

/* ─── Contact Form (WhatsApp) ─── */
function sendMsg() {
  const n = document.getElementById('nm').value.trim();
  const e = document.getElementById('em').value.trim();
  const m = document.getElementById('ms').value.trim();
  if (!n || !e || !m) { alert('Please fill all fields.'); return; }
  const txt = `Hi Ayush!\n\nName: ${n}\nEmail: ${e}\n\nMessage:\n${m}`;
  const link = `https://wa.me/919627898972?text=${encodeURIComponent(txt)}`;
  const fs = document.getElementById('fs');
  fs.style.display = 'block';
  setTimeout(() => window.open(link, '_blank'), 500);
  document.getElementById('nm').value = '';
  document.getElementById('em').value = '';
  document.getElementById('ms').value = '';
  setTimeout(() => { fs.style.display = 'none'; }, 4000);
}
