/**
 * stars.js
 * Animated starfield rendered on a canvas behind all sections.
 */
const Stars = (() => {
  const canvas = document.getElementById('starsCanvas');
  const ctx    = canvas.getContext('2d');

  let stars = [];
  let raf;
  const COUNT = 180;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }

  function randBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function init() {
    stars = Array.from({ length: COUNT }, () => ({
      x:     randBetween(0, canvas.width),
      y:     randBetween(0, canvas.height),
      r:     randBetween(0.3, 1.4),
      alpha: randBetween(0.2, 0.9),
      speed: randBetween(0.0002, 0.0012),
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(ts) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      const a = s.alpha * (0.5 + 0.5 * Math.sin(ts * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 180, 150, ${a})`;
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
  }

  function stop() {
    cancelAnimationFrame(raf);
  }

  return { start, stop };
})();

// Auto-start
Stars.start();
