/**
 * renderer.js
 * Populates all dynamic sections with content after the user submits their data.
 * Receives a unified state object from App.
 */
const Renderer = (() => {

  /* ──────────────────────────────
     SECTION 3: Birth night
  ────────────────────────────── */
  function renderBirth(state) {
    const { name, dob, birthplace } = state;
    const moon        = Data.getMoonPhase(dob);
    const decadeFacts = Data.getDecadeFacts(dob.getFullYear());
    const quote       = Data.getSeasonQuote(dob);

    // Headline
    document.getElementById('birthName').textContent =
      name ? `While ${name} took a first breath,` : 'While you took your first breath,';

    // Fact grid
    const grid = document.getElementById('birthGrid');
    grid.innerHTML = '';

    const facts = [
      { category: 'Moon',     value: `${moon.symbol} ${moon.name}`,          note: moon.description },
      { category: 'Year',     value: dob.getFullYear().toString(),             note: `${dob.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}` },
      { category: 'Event',    value: '🌍 That year',                          note: decadeFacts.event },
      { category: 'World',    value: '📊 Population',                         note: decadeFacts.world },
      { category: 'Culture',  value: '🎬 Culture',                            note: decadeFacts.culture },
      { category: 'Tech',     value: '💻 Technology',                         note: decadeFacts.tech },
    ];

    facts.forEach((f, i) => {
      const el = document.createElement('div');
      el.className = 'birth-fact fade-in-up';
      el.style.animationDelay = `${i * 0.1}s`;
      el.innerHTML = `
        <div class="birth-fact__category">${f.category}</div>
        <div class="birth-fact__value">${f.value}</div>
        <div class="birth-fact__note">${f.note}</div>
      `;
      grid.appendChild(el);
    });

    document.getElementById('birthQuote').textContent = quote;
  }

  /* ──────────────────────────────
     SECTION 4: Life counters
  ────────────────────────────── */
  function renderLife(state) {
    const stats     = Calculator.compute(state.dob);
    const cards     = Calculator.getCounterCards(stats);
    const tooltips  = Calculator.getCounterTooltips();
    const reflect   = Calculator.getLifeReflection(stats, state.name);

    const grid = document.getElementById('countersGrid');
    grid.innerHTML = '';

    cards.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'counter-card fade-in-up stagger-children';
      el.style.animationDelay = `${i * 0.1 + 0.2}s`;
      el.innerHTML = `
        <span class="counter-card__icon">${c.icon}</span>
        <span class="counter-card__value">${c.value}</span>
        <span class="counter-card__label">${c.label}</span>
        <div class="counter-tooltip">${tooltips[c.label] || ''}</div>
      `;
      grid.appendChild(el);
    });

    document.getElementById('lifeReflection').textContent = reflect;

    // Store stats on state for share card
    state._stats = stats;
  }

  /* ──────────────────────────────
     SECTION 5: Pivot
  ────────────────────────────── */
  function renderPivot(state) {
    const stats = state._stats || Calculator.compute(state.dob);
    document.getElementById('pivotNumber').textContent = stats.rawDays.toLocaleString();
  }

  /* ──────────────────────────────
     SECTION 6: Future day
  ────────────────────────────── */
  function renderFuture(state) {
    const city   = state.city || state.birthplace || 'Your city';
    const scenes = Data.getFutureScene(city);

    document.getElementById('futureCity').textContent =
      `${city.split(',')[0].trim()} wakes.`;

    const container = document.getElementById('futureScene');
    container.innerHTML = '';

    scenes.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = 'future__moment fade-in-up';
      el.style.animationDelay = `${i * 0.12}s`;
      el.innerHTML = `
        <span class="future__moment__time">${s.time}</span>
        <span class="future__moment__desc">${s.desc}</span>
      `;
      container.appendChild(el);
    });
  }

  /* ──────────────────────────────
     SECTION 7: What may still happen
  ────────────────────────────── */
  function renderStill(state) {
    const moments = Data.pickStillMoments(6);
    const grid    = document.getElementById('stillGrid');
    grid.innerHTML = '';

    moments.forEach((m, i) => {
      const el = document.createElement('div');
      el.className = 'still-card fade-in-up';
      el.style.animationDelay = `${i * 0.1}s`;
      el.innerHTML = `
        <div class="still-card__category">${m.category}</div>
        <div class="still-card__text">${m.text}</div>
      `;
      grid.appendChild(el);
    });
  }

  /* ──────────────────────────────
     SECTION 8: Ripple
  ────────────────────────────── */
  function renderRipple(state) {
    const name  = state.name ? state.name.trim() : 'you';
    document.getElementById('rippleHeadline').textContent =
      `If ${name} disappeared,`;

    const items     = Data.getRippleItems();
    const container = document.getElementById('rippleItems');
    container.innerHTML = '';

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'ripple-item fade-in-up';
      el.style.animationDelay = `${i * 0.12}s`;
      el.innerHTML = `
        <span class="ripple-item__glyph">${item.glyph}</span>
        <span class="ripple-item__text">${item.text}</span>
      `;
      container.appendChild(el);
    });
  }

  /* ──────────────────────────────
     SECTION 9: Share card
  ────────────────────────────── */
  function renderShare(state) {
    const stats     = state._stats || Calculator.compute(state.dob);
    const name      = state.name   || 'A life in time';
    const birthStr  = state.dob.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    document.getElementById('shareHeadline').textContent =
      `${name}'s life in time.`;

    const card = document.getElementById('shareCard');
    card.innerHTML = `
      <div class="share-card-inner" id="shareCardInner">
        <div class="share-card__name">${name}</div>
        <div class="share-card__born">Born ${birthStr} · ${state.birthplace || ''}</div>
        <div class="share-card__stats">
          <div>
            <div class="share-stat__value">${stats.rawYears}</div>
            <div class="share-stat__label">Years lived</div>
          </div>
          <div>
            <div class="share-stat__value">${stats.moonCycles}</div>
            <div class="share-stat__label">Moon cycles</div>
          </div>
          <div>
            <div class="share-stat__value">${stats.pctLived}%</div>
            <div class="share-stat__label">Of avg life</div>
          </div>
        </div>
        <div class="share-card__tagline">
          "Not every meaningful day announces itself beforehand."
        </div>
        <div class="share-card__watermark">✦ theworldwhenyoudie.com</div>
      </div>
    `;
  }

  /* ──────────────────────────────
     Public API
  ────────────────────────────── */
  return {
    renderBirth,
    renderLife,
    renderPivot,
    renderFuture,
    renderStill,
    renderRipple,
    renderShare,
  };
})();
