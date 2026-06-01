/**
 * share.js
 * Handles card download (canvas screenshot) and link copy.
 */
const Share = (() => {

  /**
   * Renders the share card to a canvas and triggers download.
   * Uses the DOM card element painted onto a 2D canvas.
   */
  function downloadCard() {
    const card = document.getElementById('shareCardInner');
    if (!card) return;

    // We use a simple HTML-to-canvas approach via inline SVG foreignObject.
    // This works in modern browsers without external libraries.
    const w = card.offsetWidth;
    const h = card.offsetHeight;

    const data = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml"
               style="width:${w}px;height:${h}px;background:#0e0e18;padding:40px;
                      font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;color:#e8e4dc;box-sizing:border-box;">
            ${card.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'my-timeline.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Copies a pseudo-share link to clipboard.
   */
  function copy() {
    const url = window.location.href.split('?')[0];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url + ' — ✦ theworldwhenyoudie.com').then(() => {
        showToast('Link copied ✦');
      });
    } else {
      showToast('Copy: ' + url);
    }
  }

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.style.cssText = `
        position:fixed;bottom:40px;left:50%;transform:translateX(-50%) translateY(10px);
        background:rgba(200,169,110,0.15);border:1px solid rgba(200,169,110,0.3);
        color:#e2c98a;font-family:'Inconsolata',monospace;font-size:12px;
        letter-spacing:0.15em;padding:12px 28px;z-index:200;
        opacity:0;transition:all 0.4s;pointer-events:none;
      `;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(10px)';
    }, 2800);
  }

  return { downloadCard, copy };
})();
