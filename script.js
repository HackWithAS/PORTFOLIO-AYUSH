/* ─── Scroll Progress + Sticky Nav + Back-to-top ─── */
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('sp').style.width = (dh > 0 ? st / dh * 100 : 0) + '%';
  document.getElementById('nb').classList.toggle('sh', st > 40);
  document.getElementById('btt').classList.toggle('on', st > 400);
});

document.getElementById('btt').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Reveal on Scroll ─── */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

/* ─── Mobile Nav ─── */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
hbg.addEventListener('click', () => {
  const isOpen = mob.classList.toggle('on');
  hbg.classList.toggle('on', isOpen);
  hbg.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('#mob a').forEach(a => {
  a.addEventListener('click', () => {
    hbg.classList.remove('on');
    mob.classList.remove('on');
    hbg.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ─── Project Filter ─── */
const tabs = document.querySelectorAll('.ptab');
const cards = document.querySelectorAll('.proj-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const cat = card.dataset.cat;
      card.classList.toggle('hidden', !(filter === 'all' || cat === filter));
    });
  });
});

/* ─── Active Nav Link on Scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
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

/* ─── Smooth Anchor Scroll ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
