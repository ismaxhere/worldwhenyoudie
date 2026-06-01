/**
 * data.js
 * Static lookup tables and content pools used across the app.
 * No API calls — everything is deterministic from the user's input.
 */
const Data = (() => {

  /* ── Moon phases ── */
  const MOON_PHASES = [
    { name: 'New Moon',        symbol: '🌑', description: 'The sky held no moon the night you arrived.' },
    { name: 'Waxing Crescent', symbol: '🌒', description: 'A thin crescent was beginning its arc.' },
    { name: 'First Quarter',   symbol: '🌓', description: 'Half the moon watched over your first breath.' },
    { name: 'Waxing Gibbous',  symbol: '🌔', description: 'The moon was nearly full and bright.' },
    { name: 'Full Moon',       symbol: '🌕', description: 'A full moon lit the world the night you were born.' },
    { name: 'Waning Gibbous',  symbol: '🌖', description: 'The moon was just beginning to pull away.' },
    { name: 'Last Quarter',    symbol: '🌗', description: 'Half the moon remained, watchful and quiet.' },
    { name: 'Waning Crescent', symbol: '🌘', description: 'A fading crescent closed the night around you.' },
  ];

  /* ── Birth decade factual information ── */
  const DECADE_FACTS = {
    1970: {
      event:    'Apollo 13 was launched. The Beatles disbanded.',
      world:    'World population: 3.7 billion.',
      culture:  'The first Earth Day was celebrated. Pink Floyd released "The Wall".',
      tech:     'The first microprocessor, Intel 4004, was invented.',
    },
    1980: {
      event:    'Mount St. Helens erupted. India launched its first satellite.',
      world:    'World population: 4.4 billion.',
      culture:  'The Rubik\'s Cube craze swept the world. MTV launched.',
      tech:     'Personal computers like the Commodore 64 entered homes.',
    },
    1990: {
      event:    'Nelson Mandela was released from prison. Germany reunified.',
      world:    'World population: 5.3 billion.',
      culture:  'The Human Genome Project began. The first webcam was created.',
      tech:     'The World Wide Web was released to the public.',
    },
    2000: {
      event:    'Sydney hosted the Olympic Games. The dotcom bubble burst.',
      world:    'World population: 6.1 billion. Millennium celebrations.',
      culture:  'The Matrix was a cultural phenomenon. Napster revolutionized music.',
      tech:     'Mobile phones were becoming ubiquitous. The Internet was accelerating.',
    },
    2010: {
      event:    'The iPad was released. Chile earthquake killed 500 people.',
      world:    'World population: 6.8 billion.',
      culture:  'Instagram launched. Avatar became highest-grossing film.',
      tech:     'Smartphones were reshaping communication. Cloud computing emerged.',
    },
    2020: {
      event:    'COVID-19 pandemic began. Black Lives Matter protests erupted.',
      world:    'World population: 7.8 billion.',
      culture:  'Streaming became the dominant form of media consumption.',
      tech:     'Remote work and AI accelerated into mainstream use.',
    },
  };

  /* ── Future city scene moments (keyed by city keyword or default) ── */
  const FUTURE_SCENES = {
    kolkata: [
      { time: '05:42', desc: 'The first buses move through old streets, still mostly empty.' },
      { time: '06:15', desc: 'Chai stalls light their burners. Steam rises into the morning.' },
      { time: '07:30', desc: 'The Hooghly catches the sun in long copper ribbons.' },
      { time: '12:00', desc: 'The city eats — all at once, everywhere.' },
      { time: '17:45', desc: 'Yellow taxis inch through streets, unhurried.' },
      { time: '21:00', desc: 'Someone reads by a window they\'ve never noticed before.' },
    ],
    mumbai: [
      { time: '05:30', desc: 'The local trains begin filling before the sun appears.' },
      { time: '07:00', desc: 'Dabbawalas carry tiffins across the still-cool streets.' },
      { time: '12:30', desc: 'Marine Drive holds the sea, indifferent and vast.' },
      { time: '18:00', desc: 'The city shifts gears—office towers to street food.' },
      { time: '22:00', desc: 'A film ends in a quiet hall. Someone sighs.' },
    ],
    delhi: [
      { time: '06:00', desc: 'Fog lifts slowly from the Yamuna.' },
      { time: '08:30', desc: 'Metro trains move like slow rivers underground.' },
      { time: '13:00', desc: 'Old Delhi\'s lanes smell of spices and cooking oil.' },
      { time: '19:00', desc: 'The Red Fort lights up without ceremony.' },
      { time: '23:00', desc: 'The city stays awake—arguing, laughing, building.' },
    ],
    default: [
      { time: '05:50', desc: 'The city stirs before the light does.' },
      { time: '07:20', desc: 'Morning routines unfold in a thousand kitchens.' },
      { time: '12:00', desc: 'The world pauses, briefly, to eat.' },
      { time: '17:30', desc: 'Evening slants in through windows no one notices.' },
      { time: '20:00', desc: 'Someone somewhere laughs at something unexpected.' },
      { time: '23:15', desc: 'The city breathes more slowly. Not yet asleep.' },
    ],
  };

  /* ── "What may still happen" moments ── */
  const STILL_MOMENTS = {
    human: [
      { category: 'Human', text: 'A future friendship that hasn\'t introduced itself yet.' },
      { category: 'Human', text: 'Someone saying your name in a room you\'ve never entered.' },
      { category: 'Human', text: 'A conversation that changes the direction of a year.' },
      { category: 'Human', text: 'The feeling of being understood, completely, by someone new.' },
    ],
    joy: [
      { category: 'Joy', text: 'An unexpected laugh—the kind that bends you double.' },
      { category: 'Joy', text: 'Food that will become a memory before it\'s finished.' },
      { category: 'Joy', text: 'Music you haven\'t heard yet that feels written for you.' },
      { category: 'Joy', text: 'A night so perfect you only recognise it leaving.' },
    ],
    achievement: [
      { category: 'Achievement', text: 'Work that surprises even you when it\'s done.' },
      { category: 'Achievement', text: 'A version of love you haven\'t been capable of yet.' },
      { category: 'Achievement', text: 'An idea that solves something no one else has named.' },
      { category: 'Achievement', text: 'The day something you built outlives the moment.' },
    ],
    beauty: [
      { category: 'Random Beauty', text: 'A monsoon evening that silences everything.' },
      { category: 'Random Beauty', text: 'A winter sunrise on a window you almost didn\'t look through.' },
      { category: 'Random Beauty', text: 'The exact blue of the sky on a forgettable Tuesday.' },
      { category: 'Random Beauty', text: 'An animal that looks at you like it knows something.' },
    ],
  };

  /* ── Ripple effect lines ── */
  const RIPPLE_ITEMS = [
    { glyph: '◦', text: 'A future conversation never happens—one that would have changed someone\'s day.' },
    { glyph: '◦', text: 'Someone never receives a particular kindness, because only you would have thought to offer it.' },
    { glyph: '◦', text: 'A creative idea remains unbuilt. The world is slightly smaller for it.' },
    { glyph: '◦', text: 'A stranger whose name you\'d never know keeps walking past the moment you would have changed.' },
    { glyph: '◦', text: 'The specific way you notice things—gone. No one else will notice them quite that way.' },
  ];

  /* ── Birth quotes by season ── */
  const SEASON_QUOTES = {
    spring: '"You arrived when the world was relearning how to begin."',
    summer: '"You were born into the longest light of the year."',
    autumn: '"You arrived when the world was letting go of what it no longer needed."',
    winter: '"You were born into the quietest season—when the earth was learning patience."',
  };

  /* ── Helpers ── */
  function getMoonPhase(dob) {
    // Approximate synodic cycle from known new moon (Jan 6, 2000)
    const knownNewMoon = new Date(2000, 0, 6).getTime();
    const synodicMs    = 29.53058867 * 24 * 60 * 60 * 1000;
    const diff         = dob.getTime() - knownNewMoon;
    const cycles       = ((diff % synodicMs) + synodicMs) % synodicMs;
    const index        = Math.floor((cycles / synodicMs) * 8);
    return MOON_PHASES[index % 8];
  }

  function getDecadeFacts(year) {
    const decade = Math.floor(year / 10) * 10;
    return DECADE_FACTS[decade] || DECADE_FACTS[2000];
  }

  function getSeasonQuote(dob) {
    const m = dob.getMonth(); // 0-indexed
    // Northern hemisphere seasons (approximation)
    if (m >= 2 && m <= 4) return SEASON_QUOTES.spring;
    if (m >= 5 && m <= 7) return SEASON_QUOTES.summer;
    if (m >= 8 && m <= 10) return SEASON_QUOTES.autumn;
    return SEASON_QUOTES.winter;
  }

  function getFutureScene(city) {
    if (!city) return FUTURE_SCENES.default;
    const key = city.toLowerCase();
    for (const k of Object.keys(FUTURE_SCENES)) {
      if (k !== 'default' && key.includes(k)) return FUTURE_SCENES[k];
    }
    return FUTURE_SCENES.default;
  }

  function pickStillMoments(count = 6) {
    const all = [
      ...shuffle(STILL_MOMENTS.human).slice(0, 2),
      ...shuffle(STILL_MOMENTS.joy).slice(0, 2),
      ...shuffle(STILL_MOMENTS.achievement).slice(0, 1),
      ...shuffle(STILL_MOMENTS.beauty).slice(0, 1),
    ];
    return all.slice(0, count);
  }

  function getRippleItems() {
    return shuffle(RIPPLE_ITEMS).slice(0, 4);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  return {
    getMoonPhase,
    getDecadeFacts,
    getSeasonQuote,
    getFutureScene,
    pickStillMoments,
    getRippleItems,
    shuffle,
  };
})();
