// ---------- floating paw background ----------
(function pawField() {
  const field = document.getElementById('paw-field');
  const symbols = ['🐾', '🌸', '💐', '🌷', '✨'];
  const count = window.innerWidth < 700 ? 10 : 20;
  for (let i = 0; i < count; i++) {
    const paw = document.createElement('span');
    paw.className = 'paw';
    paw.textContent = symbols[i % symbols.length];
    paw.style.left = Math.random() * 100 + 'vw';
    paw.style.fontSize = (1 + Math.random() * 1.6) + 'rem';
    const duration = 14 + Math.random() * 16;
    paw.style.animationDuration = duration + 's';
    paw.style.animationDelay = -(Math.random() * duration) + 's';
    field.appendChild(paw);
  }
})();

// ---------- nav toggle ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ---------- typewriter hero title ----------
const titles = [
  'Founder & Chief Vibes Officer',
  '12-Year Retail Veteran',
  'Two-Time UNT Graduate',
  'Fair Dog Wages Advocate',
  'Casino Regular',
  'Diana’s #1',
];
const typeEl = document.getElementById('typewriter');
let tIndex = 0, cIndex = 0, deleting = false;
function typeLoop() {
  const current = titles[tIndex];
  if (!deleting) {
    cIndex++;
    typeEl.textContent = current.slice(0, cIndex);
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    cIndex--;
    typeEl.textContent = current.slice(0, cIndex);
    if (cIndex === 0) {
      deleting = false;
      tIndex = (tIndex + 1) % titles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ---------- reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- animated stat counters ----------
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => statObserver.observe(el));

// ---------- gallery grid (auto-populated from repo images) ----------
const galleryImages = [
  'assets/images/toncha-diego-diana-car2.jpg',
  'assets/images/toncha-diana-backyard.jpg',
  'assets/images/toncha-vela-christmas1.jpg',
  'assets/images/toncha-pink-sweater.jpg',
  'assets/images/toncha-birthday-candle.jpg',
  'assets/images/toncha-family-portrait.jpg',
  'assets/images/toncha-diana-kiss.jpg',
  'assets/images/toncha-diana-lap.jpg',
  'assets/images/toncha-christmas-lap.jpg',
  'assets/images/toncha-vela-christmas2.jpg',
  'assets/images/toncha-two-dogs-yard.jpg',
  'assets/images/toncha-snack-time.jpg',
  'assets/images/toncha-yard-lookup.jpg',
  'assets/images/toncha-belly-up.jpg',
  'assets/images/toncha-belly-closeup.jpg',
  'assets/images/toncha-nose-closeup.jpg',
  'assets/images/toncha-tapia-face.jpg',
  'assets/images/toncha-tapia-carpet.jpg',
  'assets/images/toncha-diego-diana-car1.jpg',
  'assets/images/toncha-diego-diana-car3.jpg',
  'assets/images/IMG_1610.jpg',
  'assets/images/IMG_1611.jpg',
  'assets/images/IMG_1614.jpg',
  'assets/images/lp_image.jpg',
  'assets/images/lp_image_2.jpg',
  'assets/images/lp_image_3.jpg',
  'assets/images/lp_image_4.jpg',
  'assets/images/lp_image_5.jpg',
];
const galleryGrid = document.getElementById('gallery-grid');
galleryImages.forEach((src, i) => {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = src;
  img.loading = 'lazy';
  img.alt = 'Toncha Tapia memory';
  fig.appendChild(img);
  galleryGrid.appendChild(fig);
});
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('shown'), i * 60);
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
galleryGrid.querySelectorAll('figure').forEach(f => galleryObserver.observe(f));

// ---------- 3D cube drag-to-rotate ----------
(function cubeDrag() {
  const cube = document.getElementById('photo-cube');
  let dragging = false;
  let startX = 0, startY = 0;
  let rotX = -18, rotY = 28;

  function pointerDown(e) {
    dragging = true;
    cube.classList.add('dragging');
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX;
    startY = p.clientY;
  }
  function pointerMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - startX;
    const dy = p.clientY - startY;
    rotY += dx * 0.4;
    rotX -= dy * 0.4;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    startX = p.clientX;
    startY = p.clientY;
  }
  function pointerUp() {
    dragging = false;
    cube.classList.remove('dragging');
  }

  cube.addEventListener('mousedown', pointerDown);
  window.addEventListener('mousemove', pointerMove);
  window.addEventListener('mouseup', pointerUp);
  cube.addEventListener('touchstart', pointerDown, { passive: true });
  window.addEventListener('touchmove', pointerMove, { passive: true });
  window.addEventListener('touchend', pointerUp);
})();
