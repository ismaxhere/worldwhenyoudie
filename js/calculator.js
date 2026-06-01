/**
 * calculator.js
 * Derives all numeric life statistics from the user's date of birth.
 * Pure functions — no DOM or side effects.
 */
const Calculator = (() => {

  /**
   * Returns the full stats object given a JS Date.
   */
  function compute(dob) {
    const now     = new Date();
    const diffMs  = now.getTime() - dob.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const years   = now.getFullYear() - dob.getFullYear()
                  - (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);

    const sunsets    = Math.floor(diffDays);
    const moonCycles = Math.floor(diffDays / 29.53);
    const heartbeats = Math.floor(diffMs / 1000 * 1.1); // ~66 bpm avg
    const breaths    = Math.floor(diffMs / 1000 / 3.5);  // ~17 breaths/min
    const sleepNights = Math.floor(diffDays * 0.33);
    const meals      = Math.floor(diffDays * 3);

    // Total eclipses visible on Earth since birth (rough: ~1.5/year lunar, 2/year solar somewhere)
    const solarEclipses = Math.floor(years * 2);
    const lunarEclipses = Math.floor(years * 1.5);

    // Life percentage (assume 82-year average)
    const lifeExpectancy = 82;
    const pctLived = Math.min(100, ((years / lifeExpectancy) * 100)).toFixed(1);

    return {
      years,
      sunsets:     formatLarge(sunsets),
      moonCycles:  formatLarge(moonCycles),
      heartbeats:  formatLarge(heartbeats),
      breaths:     formatLarge(breaths),
      sleepNights: formatLarge(sleepNights),
      meals:       formatLarge(meals),
      solarEclipses,
      lunarEclipses,
      pctLived,
      rawDays:     sunsets,
      rawYears:    years,
    };
  }

  function formatLarge(n) {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000)         return (n / 1_000).toFixed(1) + 'k';
    return n.toLocaleString();
  }

  /**
   * Builds the counter cards array for the life section.
   */
  function getCounterCards(stats) {
    return [
      { icon: '☀', value: stats.sunsets,     label: 'Sunsets' },
      { icon: '◑', value: stats.moonCycles,  label: 'Moon cycles' },
      { icon: '♡', value: stats.heartbeats,  label: 'Heartbeats' },
      { icon: '◇', value: stats.breaths,     label: 'Breaths taken' },
      { icon: '☽', value: stats.sleepNights, label: 'Nights slept' },
      { icon: '▿', value: stats.meals,       label: 'Meals eaten' },
    ];
  }

  /**
   * Gets approximation tooltips for counter cards.
   */
  function getCounterTooltips() {
    return {
      'Heartbeats': '~66 bpm avg',
      'Breaths taken': '~17 per minute',
      'Sunsets': '1 per day',
      'Moon cycles': '29.53 days',
      'Nights slept': '~8 hours/day',
      'Meals eaten': '~3 per day',
    };
  }

  /**
   * Generates the reflective sentence for the life section.
   */
  function getLifeReflection(stats, name) {
    const n = name ? name.trim() : 'You';
    return `${n} has lived through ${stats.rawDays.toLocaleString()} ordinary days. `
         + `${stats.pctLived}% of an average life—every moment of it already yours.`;
  }

  return { compute, getCounterCards, getCounterTooltips, getLifeReflection, formatLarge };
})();
