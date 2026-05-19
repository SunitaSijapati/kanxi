/* ═══════════════════════════════════════════════════════════
   SUNITA SIJAPATI PORTFOLIO — SCRIPT.JS
   Premium Dark Luxury Portfolio — All Interactions
═══════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────── */
/* PRELOADER                                                 */
/* ───────────────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const MIN_DISPLAY = 500; // ms
  const start = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_DISPLAY - elapsed);
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.style.overflow = 'auto';
    }, remaining);
  });

  // Fallback
  document.body.style.overflow = 'hidden';
})();


/* ───────────────────────────────────────────────────────── */
/* CUSTOM CURSOR                                             */
/* ───────────────────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = -200, mouseY = -200;
  let ringX  = -200, ringY  = -200;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state
  const hoverEls = document.querySelectorAll(
    'a, button, .project-card, .skill-card, .stat-card, .cert-card, .blog-card, .filter-btn, .timeline-card'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor on leave/enter
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();


/* ───────────────────────────────────────────────────────── */
/* PARTICLE CANVAS                                           */
/* ───────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;
  const COUNT = 60;

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201, 169, 110, ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', init);
})();


/* ───────────────────────────────────────────────────────── */
/* TYPING EFFECT                                             */
/* ───────────────────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = [
    'Sunita Sijapati',
    'a Frontend Developer',
    'a UI/UX Enthusiast',
    'a Creative Technologist',
    'a BCA Student',
  ];

  let wordIdx = 0, charIdx = 0, deleting = false;
  const DELAY_TYPE = 80, DELAY_DELETE = 45, DELAY_PAUSE = 2000, DELAY_WORD = 400;

  function type() {
    const word = words[wordIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        deleting = true;
        setTimeout(type, DELAY_PAUSE);
        return;
      }
    } else {
      el.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(type, DELAY_WORD);
        return;
      }
    }
    setTimeout(type, deleting ? DELAY_DELETE : DELAY_TYPE);
  }

  setTimeout(type, 1000);
})();


/* ───────────────────────────────────────────────────────── */
/* NAVBAR                                                    */
/* ───────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const allLinks = document.querySelectorAll('.nav-link[data-section]');

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click (mobile)
  allLinks.forEach(a => {
    a.addEventListener('click', () => {
      toggle?.classList.remove('open');
      links?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.section === entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ───────────────────────────────────────────────────────── */
/* SCROLL PROGRESS                                           */
/* ───────────────────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();


/* ───────────────────────────────────────────────────────── */
/* REVEAL ON SCROLL                                          */
/* ───────────────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal-fade');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ───────────────────────────────────────────────────────── */
/* ANIMATED COUNTERS                                         */
/* ───────────────────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const start  = Date.now();
      const dur    = 1600;

      function tick() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
})();


/* ───────────────────────────────────────────────────────── */
/* SKILL BAR ANIMATION                                       */
/* ───────────────────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Small delay for staggered feel
      const idx = [...fills].indexOf(el);
      setTimeout(() => {
        el.style.width = el.dataset.width + '%';
      }, idx * 80);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  fills.forEach(f => observer.observe(f));
})();


/* ───────────────────────────────────────────────────────── */
/* PROJECT FILTER                                            */
/* ───────────────────────────────────────────────────────── */
(function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active btn
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          // Force reflow
          void card.offsetHeight;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ───────────────────────────────────────────────────────── */
/* TESTIMONIALS CAROUSEL                                     */
/* ───────────────────────────────────────────────────────── */
(function initCarousel() {
  const track   = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoInterval;

  // Determine cards per view
  function perView() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  // Build dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const pages = Math.ceil(total / perView());
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    const pages = Math.ceil(total / perView());
    current = ((idx % pages) + pages) % pages;
    const cardWidth = cards[0]?.offsetWidth + 24 || 0; // gap = 24px
    track.style.transform = `translateX(-${current * perView() * cardWidth}px)`;
    updateDots();
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 5000);
  }
  function resetAuto() {
    clearInterval(autoInterval);
    startAuto();
  }

  buildDots();
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
  });
})();


/* ───────────────────────────────────────────────────────── */
/* CONTACT FORM                                              */
/* ───────────────────────────────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"] span');
    if (btn) btn.textContent = 'Sending…';

    // Simulate async send
    setTimeout(() => {
      form.querySelectorAll('.form-input').forEach(i => i.value = '');
      if (btn) btn.textContent = 'Send Message';
      success?.classList.add('show');
      setTimeout(() => success?.classList.remove('show'), 5000);
    }, 1500);
  });
})();


/* ───────────────────────────────────────────────────────── */
/* BACK TO TOP                                               */
/* ───────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ───────────────────────────────────────────────────────── */
/* MAGNETIC BUTTONS                                          */
/* ───────────────────────────────────────────────────────── */
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();


/* ───────────────────────────────────────────────────────── */
/* MOUSE REACTIVE GRADIENT (Hero)                            */
/* ───────────────────────────────────────────────────────── */
(function initMouseGradient() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    hero.style.setProperty('--mx', x + '%');
    hero.style.setProperty('--my', y + '%');
  });
})();


/* ───────────────────────────────────────────────────────── */
/* SMOOTH ANCHOR SCROLL                                      */
/* ───────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ───────────────────────────────────────────────────────── */
/* CURSOR HOVER — RE-BIND AFTER DOM READY                    */
/* ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Re-observe any interactives that were added after cursor init
  const allInteractive = document.querySelectorAll('a, button, .glass-card');
  allInteractive.forEach(el => {
    if (!el.dataset.cursorBound) {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      el.dataset.cursorBound = '1';
    }
  });
});


/* ───────────────────────────────────────────────────────── */
/* CARD TILT EFFECT (Subtle 3D on project cards)            */
/* ───────────────────────────────────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll('.project-card');
  const MAX   = 8; // max degrees

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      const rx =  y * MAX;
      const ry = -x * MAX;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
})();


/* ───────────────────────────────────────────────────────── */
/* STAGGER HERO ELEMENTS ON LOAD                             */
/* ───────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-fade').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120 + 300);
    });
  }, 2000); // After preloader
});
