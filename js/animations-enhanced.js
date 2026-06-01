/**
 * animations-enhanced.js
 * Advanced animations: scroll-triggered effects, number counters, scroll parallax
 */
const AnimationsEnhanced = (() => {

  /* ──────────────────────────────
     Intersection Observer for scroll-triggered animations
  ────────────────────────────── */
  function initScrollTriggers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve - keep it animated once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    });

    // Observe all elements with data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  /* ──────────────────────────────
     Number counter animation
  ────────────────────────────── */
  function animateCounter(element, target, duration = 1500) {
    const isVisible = element.offsetParent !== null;
    if (!isVisible) return;

    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  /* ──────────────────────────────
     Stagger animation for grid items
  ────────────────────────────── */
  function addStaggerAnimation(container, delay = 100) {
    const items = container.querySelectorAll('[data-stagger]');
    items.forEach((item, index) => {
      item.style.animation = `fadeInUp 0.8s var(--ease-out) ${index * delay}ms forwards`;
      item.style.opacity = '0';
    });
  }

  /* ──────────────────────────────
     Parallax effect on scroll
  ────────────────────────────── */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach((el) => {
        const speed = el.getAttribute('data-parallax') || 0.5;
        const yPos = scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
    }, { passive: true });
  }

  /* ──────────────────────────────
     Button ripple effect on click
  ────────────────────────────── */
  function initRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn-begin, .btn-primary, .btn-next, .btn-action');
    
    buttons.forEach((button) => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ──────────────────────────────
     Add ripple animation keyframe
  ────────────────────────────── */
  function addRippleKeyframe() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ──────────────────────────────
     Smooth page transitions
  ────────────────────────────── */
  function initSmoothTransitions() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      // Add fade-in animation to section content on entry
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(section);
    });
  }

  /* ──────────────────────────────
     Initialize all animations
  ────────────────────────────── */
  function init() {
    addRippleKeyframe();
    initScrollTriggers();
    initRippleEffect();
    initParallax();
    initSmoothTransitions();
  }

  return {
    init,
    animateCounter,
    addStaggerAnimation,
  };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AnimationsEnhanced.init());
} else {
  AnimationsEnhanced.init();
}
