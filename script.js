const loader = document.getElementById('loader');
const app = document.getElementById('app');
const pages = [...document.querySelectorAll('.page')];
const nextButtons = document.querySelectorAll('.next-btn');
const typingText = document.getElementById('typingText');
const bgMusic = document.getElementById('bgMusic');
const celebrationSound = document.getElementById('celebrationSound');
const musicToggle = document.getElementById('musicToggle');
const confettiCanvas = document.getElementById('confettiCanvas');
const fireworksCanvas = document.getElementById('fireworksCanvas');

const welcomeLine = 'Thank you for 5 years of beautiful friendship ❤️';

const photoData = [
  {
    src: 'https://picsum.photos/seed/friendship1/600/900',
    quote: 'Best friends are not perfect, but they are always real.'
  },
  {
    src: 'https://picsum.photos/seed/friendship2/600/900',
    quote: 'Some friendships are written by destiny.'
  },
  {
    src: 'https://picsum.photos/seed/friendship3/600/900',
    quote: '5 years… and still counting.'
  },
  {
    src: 'https://picsum.photos/seed/friendship4/600/900',
    quote: 'From crush to chaos partner.'
  },
  {
    src: 'https://picsum.photos/seed/friendship5/600/900',
    quote: 'Forever my favorite human.'
  }
];

function typeWriter(text, el, speed = 56) {
  let i = 0;
  const id = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i += 1;
    if (i >= text.length) clearInterval(id);
  }, speed);
}

function spawnParticles(containerId, symbols = ['❤', '✨', '💜'], count = 24) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i += 1) {
    const span = document.createElement('span');
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${6 + Math.random() * 9}s`;
    span.style.fontSize = `${12 + Math.random() * 22}px`;
    span.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(span);
  }
}

function spawnBalloons() {
  const container = document.getElementById('balloons');
  const colors = ['#f6a7d3', '#c5b3ff', '#ffe4f4', '#fcd2ff'];
  for (let i = 0; i < 16; i += 1) {
    const b = document.createElement('span');
    b.style.left = `${Math.random() * 100}%`;
    b.style.background = colors[Math.floor(Math.random() * colors.length)];
    b.style.animationDelay = `${Math.random() * 3}s`;
    b.style.animationDuration = `${7 + Math.random() * 5}s`;
    container.appendChild(b);
  }
}

function goToPage(pageNumber) {
  const current = document.querySelector('.page.active');
  const next = document.querySelector(`.page[data-page="${pageNumber}"]`);
  if (!next || current === next) return;

  current.classList.add('exit-left');
  setTimeout(() => {
    current.classList.remove('active', 'exit-left');
    next.classList.add('active');
    if (pageNumber === '3') launchConfettiBurst();
    if (pageNumber === '4') populateGallery();
    if (pageNumber === '6') {
      launchFireworks();
      celebrationSound.currentTime = 0;
      celebrationSound.play().catch(() => {});
    }
  }, 350);
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => goToPage(button.dataset.next));
});

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = '🎵 Music: On';
  } else {
    bgMusic.pause();
    musicToggle.textContent = '🎵 Music: Off';
  }
});

function populateGallery() {
  const grid = document.getElementById('galleryGrid');
  if (grid.childElementCount) return;

  photoData.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'gallery-item';
    card.innerHTML = `<img src="${item.src}" alt="Memory photo" /><div class="gallery-quote">${item.quote}</div>`;
    card.addEventListener('click', () => openLightbox(item));
    grid.appendChild(card);
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxQuote = document.getElementById('lightboxQuote');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(item) {
  lightboxImage.src = item.src;
  lightboxQuote.textContent = item.quote;
  lightbox.classList.remove('hidden');
}

lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.add('hidden');
});

function launchConfettiBurst() {
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const pieces = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * confettiCanvas.width,
    y: -10 - Math.random() * confettiCanvas.height,
    size: 4 + Math.random() * 6,
    speed: 2 + Math.random() * 4,
    color: ['#ff77b7', '#bfa4ff', '#fff', '#ffd6ef'][Math.floor(Math.random() * 4)]
  }));

  let frames = 0;
  function frame() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach((p) => {
      p.y += p.speed;
      if (p.y > confettiCanvas.height) p.y = -20;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
    });
    frames += 1;
    if (frames < 180) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
  frame();
}

function launchFireworks() {
  const ctx = fireworksCanvas.getContext('2d');
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
  const particles = [];

  for (let b = 0; b < 10; b += 1) {
    const centerX = Math.random() * fireworksCanvas.width;
    const centerY = 80 + Math.random() * (fireworksCanvas.height * 0.55);
    for (let i = 0; i < 70; i += 1) {
      const angle = (Math.PI * 2 * i) / 70;
      const speed = Math.random() * 3 + 1.5;
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 70 + Math.random() * 35,
        color: ['#ff8ec8', '#d3c0ff', '#fff0fa'][Math.floor(Math.random() * 3)]
      });
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(14, 7, 20, 0.18)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 1;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    });
    const alive = particles.filter((p) => p.life > 0);
    particles.length = 0;
    particles.push(...alive);
    if (particles.length) requestAnimationFrame(animate);
  }
  animate();
}

function startCountdown() {
  const node = document.getElementById('countdown');
  const target = new Date(new Date().getFullYear(), 11, 31);
  function tick() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      node.textContent = 'It\'s birthday season ✨';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    node.textContent = `Countdown to next birthday surprise: ${days}d ${hours}h`;
  }
  tick();
  setInterval(tick, 60000);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    app.classList.remove('hidden');
    typeWriter(welcomeLine, typingText, 58);
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      musicToggle.textContent = '🎵 Music: Tap to start';
    });
  }, 1400);

  spawnParticles('heartsPage1', ['❤', '💗', '✨'], 30);
  spawnParticles('sparklesPage2', ['✨', '✦', '💫'], 28);
  spawnParticles('heartsPage6', ['❤', '💜', '🤍'], 24);
  spawnBalloons();
  startCountdown();
});
