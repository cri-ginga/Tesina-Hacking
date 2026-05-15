
(function matrixRain() {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = 'アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン0123456789ABCDEF{}[]<>$#@/\\|';
  let w, h, cols, drops, fontSize = 16;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / fontSize);
    drops = Array(cols).fill(0).map(() => Math.random() * -100);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    // Trail fade
    ctx.fillStyle = 'rgba(5, 7, 10, 0.08)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const y = drops[i] * fontSize;

      // Head of the drop = bright white-green
      if (Math.random() > 0.975) {
        ctx.fillStyle = '#d6ffe8';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#00ff88';
        ctx.shadowBlur = 0;
      }
      ctx.fillText(text, i * fontSize, y);

      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.45 + Math.random() * 0.3;
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ===========================
   MOBILE MENU
=========================== */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => menu.classList.remove('open'));
});

/* ===========================
   YEAR
=========================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===========================
   TERMINAL TYPEWRITER
=========================== */
const lines = [
  { el: 'line1', text: '$ whoami', cls: 'prompt' },
  { el: 'line1', text: ' cristiano_ginga', cls: '', append: true },
  { el: 'line2', text: '$ cat tesina.md', cls: 'prompt' },
  { el: 'line3', text: '# Hacking & Cybersecurity', cls: 'comment' },
  { el: 'line4', text: '> loading sections... [OK]', cls: '' }
];

async function typeLine(targetId, text, cls, append = false) {
  const el = document.getElementById(targetId);
  const span = document.createElement('span');
  if (cls) span.className = cls;
  if (!append) el.innerHTML = '';
  el.appendChild(span);
  for (let i = 0; i < text.length; i++) {
    span.textContent += text[i];
    await new Promise(r => setTimeout(r, 28 + Math.random() * 30));
  }
}

async function runTerminal() {
  await new Promise(r => setTimeout(r, 600));
  for (const l of lines) {
    await typeLine(l.el, l.text, l.cls, l.append);
    await new Promise(r => setTimeout(r, 220));
  }
}
runTerminal();

/* ===========================
   SCROLL REVEAL
=========================== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===========================
   NAV ACTIVE LINK
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a.link');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      const id = sec.getAttribute('id');
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id ? 'var(--green)' : '';
        a.style.textShadow = a.getAttribute('href') === '#' + id ? '0 0 8px var(--green-glow)' : '';
      });
    }
  });
}, { passive: true });
