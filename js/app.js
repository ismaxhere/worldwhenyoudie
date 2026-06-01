/**
 * app.js
 * Main application controller.
 * Manages: section navigation, state, cursor, nav dots, progress bar.
 */
const App = (() => {

  /* ──────────────────────────────
     SECTION REGISTRY
  ────────────────────────────── */
  const SECTIONS = [
    'section-landing',
    'section-input',
    'section-birth',
    'section-life',
    'section-pivot',
    'section-future',
    'section-still',
    'section-ripple',
    'section-share',
  ];

  let currentIndex = 0;
  let state        = {};   // user data + computed stats

  /* ──────────────────────────────
     NAVIGATION
  ────────────────────────────── */
  function goTo(id) {
    const idx = SECTIONS.indexOf(id);
    if (idx === -1 || idx === currentIndex) return;

    const prev = document.getElementById(SECTIONS[currentIndex]);
    const next = document.getElementById(id);

    prev.classList.add('exiting');
    setTimeout(() => {
      prev.classList.remove('active', 'exiting');
    }, 700);

    next.classList.add('active');
    currentIndex = idx;

    updateProgress();
    updateNavDots();
    scrollSectionToTop(next);
  }

  function scrollSectionToTop(el) {
    el.scrollTop = 0;
  }

  /* ──────────────────────────────
     CALCULATE (from input form)
  ────────────────────────────── */
  function calculate() {
    const name       = document.getElementById('userName').value.trim();
    const dobRaw     = document.getElementById('userDOB').value;
    const birthplace = document.getElementById('userBirthplace').value.trim();
    const city       = document.getElementById('userCity').value.trim();

    if (!dobRaw) {
      flashInput('userDOB');
      return;
    }

    const dob = new Date(dobRaw + 'T12:00:00'); // noon to avoid timezone edge cases
    if (isNaN(dob.getTime())) {
      flashInput('userDOB');
      return;
    }

    state = { name, dob, birthplace, city };

    // Render all sections from state
    Renderer.renderBirth(state);
    Renderer.renderLife(state);
    Renderer.renderPivot(state);
    Renderer.renderFuture(state);
    Renderer.renderStill(state);
    Renderer.renderRipple(state);
    Renderer.renderShare(state);

    goTo('section-birth');
  }

  function flashInput(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = 'rgba(194,107,107,0.8)';
    setTimeout(() => { el.style.borderColor = ''; }, 1500);
  }

  /* ──────────────────────────────
     RESTART
  ────────────────────────────── */
  function restart() {
    state = {};
    document.getElementById('userName').value      = '';
    document.getElementById('userDOB').value       = '';
    document.getElementById('userTime').value      = '';
    document.getElementById('userBirthplace').value = '';
    document.getElementById('userCity').value      = '';
    goTo('section-landing');
  }

  /* ──────────────────────────────
     PROGRESS BAR
  ────────────────────────────── */
  function updateProgress() {
    const fill = document.getElementById('progressFill');
    const pct  = (currentIndex / (SECTIONS.length - 1)) * 100;
    fill.style.width = pct + '%';
  }

  /* ──────────────────────────────
     NAV DOTS
  ────────────────────────────── */
  function buildNavDots() {
    const nav = document.getElementById('navDots');
    SECTIONS.forEach((id, i) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
      dot.title     = id.replace('section-', '');
      dot.addEventListener('click', () => {
        if (i === 0 || i === 1) { goTo(id); return; }
        // Only allow nav forward if state is set
        if (state.dob) goTo(id);
      });
      nav.appendChild(dot);
    });
  }

  function updateNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  /* ──────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────── */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail  = document.getElementById('cursorTrail');

    let tx = 0, ty = 0;
    let cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      tx = e.clientX;
      ty = e.clientY;
      cursor.style.left = tx + 'px';
      cursor.style.top  = ty + 'px';
    });

    // Smooth trailing cursor
    function animateTrail() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      trail.style.left = cx + 'px';
      trail.style.top  = cy + 'py';
      trail.style.left = cx + 'px';
      trail.style.top  = cy + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover states on interactive elements
    const interactables = 'button, input, a, .nav-dot, .birth-fact, .still-card, .counter-card';
    document.addEventListener('mouseover', e => {
      if (e.target.matches(interactables) || e.target.closest(interactables)) {
        cursor.style.width    = '14px';
        cursor.style.height   = '14px';
        trail.style.width     = '48px';
        trail.style.height    = '48px';
        cursor.style.background = '#e2c98a';
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.matches(interactables) || e.target.closest(interactables)) {
        cursor.style.width    = '8px';
        cursor.style.height   = '8px';
        trail.style.width     = '32px';
        trail.style.height    = '32px';
        cursor.style.background = 'var(--gold)';
      }
    });
  }

  /* ──────────────────────────────
     KEYBOARD NAVIGATION
  ────────────────────────────── */
  function initKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = SECTIONS[currentIndex + 1];
        if (next && (currentIndex >= 2 || next === 'section-input')) goTo(next);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = SECTIONS[currentIndex - 1];
        if (prev) goTo(prev);
      }
      if (e.key === 'Enter' && currentIndex === 0) {
        goTo('section-input');
      }
    });
  }

  /* ──────────────────────────────
     LANDING CLICK
  ────────────────────────────── */
  function initLandingClick() {
    document.getElementById('section-landing').addEventListener('click', (e) => {
      if (e.target.closest('.btn-begin')) return;
      goTo('section-input');
    });
  }

  /* ──────────────────────────────
     INIT
  ────────────────────────────── */
  function init() {
    buildNavDots();
    initCursor();
    initKeyboard();
    initLandingClick();
    updateProgress();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { goTo, calculate, restart };
})();
