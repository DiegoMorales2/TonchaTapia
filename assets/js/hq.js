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

// ---------- Toncha fun-fact popup ----------
(function factToast() {
  const facts = [
    { img: 'assets/images/toncha-snack-time.jpg', text: 'She always went for boiled or pan-seared chicken over fried. A dog of refined taste.' },
    { img: 'assets/images/toncha-diego-diana-car1.jpg', text: 'Toncha was skeptical of Diego at first — she once spit out chicken he offered her, sure it was poisoned.' },
    { img: 'assets/images/toncha-vela-christmas1.jpg', text: 'Toncha and her daughter Vela led with tough love and fought like family — because they were.' },
    { img: 'assets/images/toncha-pink-sweater.jpg', text: 'She never missed a chance to sneak out at night with Vela and Carmen for a club run.' },
    { img: 'assets/images/IMG_1610.jpg', text: 'She hated cats. Truly, deeply, unwaveringly, on principle.' },
    { img: 'assets/images/toncha-yard-lookup.jpg', text: 'Twelve years at TJ Maxx, working her way from stocker all the way up to manager.' },
    { img: 'assets/images/toncha-family-portrait.jpg', text: 'She graduated UNT Denton in 2021 with both a Bachelor\'s and a Master\'s degree.' },
    { img: 'assets/images/toncha-diana-lap.jpg', text: 'She loved to borrow money from Diana and rarely paid it back. Diana never minded — she loved her too much.' },
    { img: 'assets/images/lp_image_4.jpg', text: 'Never met a slot machine she didn\'t like. The casino was basically her second home.' },
    { img: 'assets/images/toncha-belly-up.jpg', text: 'Grill days were sacred. Diana\'s parents always slipped her a piece, and she never once turned it down.' },
    { img: 'assets/images/toncha-two-dogs-yard.jpg', text: 'Mr. G, Maribel\'s husband, once watched Toncha for a full week — and passed the test.' },
    { img: 'assets/images/lp_image_5.jpg', text: 'She led the fight for fair dog wages, rallying dogs and people alike for equal treatment.' },
  ];

  const toast = document.getElementById('fact-toast');
  const closeBtn = document.getElementById('fact-close');
  const imgEl = document.getElementById('fact-img');
  const textEl = document.getElementById('fact-text');

  let order = [];
  function nextFact() {
    if (order.length === 0) {
      order = facts.map((_, i) => i).sort(() => Math.random() - 0.5);
    }
    return facts[order.pop()];
  }

  let hideTimer = null;
  function showFact() {
    const fact = nextFact();
    imgEl.src = fact.img;
    textEl.textContent = fact.text;
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('show'), 12000);
  }

  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    clearTimeout(hideTimer);
  });

  setTimeout(showFact, 20000);
  setInterval(showFact, 5 * 60 * 1000);
})();
