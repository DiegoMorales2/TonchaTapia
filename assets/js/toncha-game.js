(function tonchaGame() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('game-score');
  const livesEl = document.getElementById('game-lives');
  const startBtn = document.getElementById('game-start');

  const W = canvas.width, H = canvas.height;

  let player = { x: W / 2, w: 70, h: 46, speed: 9 };
  let items = [];
  let score = 0, lives = 3;
  let running = false;
  let spawnTimer = 0;
  let frame = 0;
  const keys = {};

  function resetState() {
    player.x = W / 2;
    items = [];
    score = 0;
    lives = 3;
    spawnTimer = 0;
    frame = 0;
    scoreEl.textContent = score;
    livesEl.textContent = lives;
  }

  function spawnItem() {
    const isCat = Math.random() < 0.32;
    items.push({
      x: 30 + Math.random() * (W - 60),
      y: -20,
      emoji: isCat ? '🐈' : '🍗',
      isCat,
      speed: 2.4 + Math.random() * 2.4 + Math.min(frame / 1800, 2),
      size: 30,
    });
  }

  function drawBackground() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,58,245,0.04)';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc((i * 137) % W, (frame * 0.3 + i * 90) % H, 40, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawPlayer() {
    ctx.font = '46px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐶', player.x, H - 40);
  }

  function drawItems() {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    items.forEach(it => ctx.fillText(it.emoji, it.x, it.y));
  }

  function drawHUD() {
    scoreEl.textContent = score;
    livesEl.textContent = lives;
  }

  function update() {
    frame++;
    if (keys.ArrowLeft) player.x -= player.speed;
    if (keys.ArrowRight) player.x += player.speed;
    player.x = Math.max(30, Math.min(W - 30, player.x));

    spawnTimer++;
    const spawnRate = Math.max(24, 55 - Math.floor(frame / 200));
    if (spawnTimer > spawnRate) {
      spawnItem();
      spawnTimer = 0;
    }

    items.forEach(it => (it.y += it.speed));

    // collisions
    items.forEach(it => {
      if (it.caught) return;
      const dx = Math.abs(it.x - player.x);
      const dy = Math.abs(it.y - (H - 40));
      if (dx < 40 && dy < 34) {
        it.caught = true;
        if (it.isCat) {
          lives--;
          if (lives <= 0) endGame();
        } else {
          score += 10;
        }
      }
    });

    items = items.filter(it => !it.caught && it.y < H + 30);
  }

  function loop() {
    if (!running) return;
    update();
    drawBackground();
    drawItems();
    drawPlayer();
    drawHUD();
    requestAnimationFrame(loop);
  }

  function endGame() {
    running = false;
    ctx.fillStyle = 'rgba(26,20,32,0.55)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 34px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', W / 2, H / 2 - 16);
    ctx.font = '18px sans-serif';
    ctx.fillText(`Final Score: ${score}`, W / 2, H / 2 + 18);
    startBtn.textContent = 'Play Again';
  }

  function startGame() {
    resetState();
    running = true;
    startBtn.textContent = 'Restart';
    loop();
  }

  startBtn.addEventListener('click', startGame);

  window.addEventListener('keydown', e => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      keys[e.key] = true;
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', e => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) keys[e.key] = false;
  });

  // touch / drag controls
  function pointerToPlayer(clientX) {
    const rect = canvas.getBoundingClientRect();
    const scale = W / rect.width;
    player.x = (clientX - rect.left) * scale;
  }
  canvas.addEventListener('touchmove', e => {
    if (!running) return;
    pointerToPlayer(e.touches[0].clientX);
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('mousemove', e => {
    if (!running) return;
    pointerToPlayer(e.clientX);
  });

  // idle preview frame before game starts
  drawBackground();
  ctx.font = '46px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🐶', W / 2, H - 40);
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = '#b913da';
  ctx.fillText('Press Start Game', W / 2, H / 2);
})();
