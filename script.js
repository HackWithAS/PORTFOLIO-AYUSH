/* ─── Intro Loader ─── */
(function () {
  const loader = document.getElementById('intro-loader');
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.display = 'none';
      document.querySelector('nav').style.pointerEvents = 'auto';
    }, 700);
  }, 2400);
})();

/* ─── Scroll Progress + Nav + BTT ─── */
window.addEventListener('scroll', () => {
  const st = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('sp').style.width = (st / dh * 100) + '%';
  document.getElementById('nb').classList.toggle('sh', st > 50);
  document.getElementById('btt').classList.toggle('on', st > 400);
});

/* ─── Typing Animation ─── */
const lines = [
  'Cybersecurity Enthusiast',
  'Web Developer',
  'Ethical Hacker in Training',
  'Secure Development Learner',
  'B.Tech CSE @ Invertis University'
];
let li = 0, ci = 0, del = false;
const te = document.getElementById('ty');
function loop() {
  const cur = lines[li];
  if (!del) {
    te.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { del = true; setTimeout(loop, 2000); return; }
    setTimeout(loop, 65);
  } else {
    te.textContent = cur.slice(0, --ci);
    if (ci === 0) { del = false; li = (li + 1) % lines.length; setTimeout(loop, 400); return; }
    setTimeout(loop, 32);
  }
}
loop();

/* ─── Reveal on Scroll ─── */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

/* ─── Counter Animation ─── */
function animCounter(el) {
  const t = +el.dataset.t;
  const dur = t > 1000 ? 2000 : 1200;
  const step = t / (dur / 16);
  let c = 0;
  const tmr = setInterval(() => {
    c = Math.min(c + step, t);
    el.textContent = t > 100 ? Math.floor(c) : (c < t ? c.toFixed(1) : t);
    if (c >= t) clearInterval(tmr);
  }, 16);
}
const so = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animCounter(e.target); so.unobserve(e.target); }
  });
}, { threshold: .5 });
document.querySelectorAll('.sn[data-t]').forEach(el => so.observe(el));

/* ─── Skill Bar Animation ─── */
const sbObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sb-fill').forEach(bar => {
        const w = bar.dataset.w;
        setTimeout(() => { bar.style.width = w + '%'; }, 100);
      });
      sbObs.unobserve(e.target);
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-bars').forEach(el => sbObs.observe(el));

/* ─── Mobile Nav ─── */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('on');
  mob.classList.toggle('on');
  document.body.style.overflow = mob.classList.contains('on') ? 'hidden' : '';
});
function closeM() {
  hbg.classList.remove('on');
  mob.classList.remove('on');
  document.body.style.overflow = '';
}

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
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.opacity = '';
          card.style.transform = '';
          card.style.transition = 'opacity .4s ease, transform .4s ease';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─── Active Nav Link on Scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-ul a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent)';
    }
  });
});

/* ─── Contact Form (WhatsApp) ─── */
function sendMsg() {
  const n = document.getElementById('nm').value.trim();
  const e = document.getElementById('em').value.trim();
  const m = document.getElementById('ms').value.trim();
  if (!n || !e || !m) { alert('Please fill all fields.'); return; }
  const txt = `Hi Ayush! 👋\n\nName: ${n}\nEmail: ${e}\n\nMessage:\n${m}`;
  const link = `https://wa.me/919627898972?text=${encodeURIComponent(txt)}`;
  const fs = document.getElementById('fs');
  fs.style.display = 'block';
  setTimeout(() => window.open(link, '_blank'), 600);
  document.getElementById('nm').value = '';
  document.getElementById('em').value = '';
  document.getElementById('ms').value = '';
  setTimeout(() => { fs.style.display = 'none'; }, 4000);
}

/* ─── Smooth Anchor for Mobile ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ─── Cursor glow effect (desktop only) ─── */
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;border-radius:50%;pointer-events:none;z-index:0;
    background:radial-gradient(circle,rgba(0,255,179,.025),transparent 70%);
    transform:translate(-50%,-50%);transition:left .12s ease,top .12s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
