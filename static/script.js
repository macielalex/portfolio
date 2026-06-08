/**
 * Portfólio Single-Page — JavaScript
 * Header scroll, sidebar, reveal animations, contador, FAQ e formulário.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initSidebar();
  initHeroEntrance();
  initRevealOnScroll();
  initCounters();
  initFaq();
  initContactForm();
});

/* ============================================================
   HEADER — transparente → sólido ao scrollar
   ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();
}

/* ============================================================
   SIDEBAR — menu hamburguer
   ============================================================ */
function initSidebar() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const links = document.querySelectorAll('.sidebar__link');

  if (!menuBtn || !sidebar || !overlay) return;

  const openSidebar = () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('sidebar-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    links[0]?.focus();
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.focus();
  };

  menuBtn.addEventListener('click', () => {
    sidebar.classList.contains('active') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  links.forEach((link) => {
    link.addEventListener('click', closeSidebar);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });
}

/* ============================================================
   HERO — animação de entrada escalonada ao carregar
   ============================================================ */
function initHeroEntrance() {
  const elements = document.querySelectorAll('.hero-animate');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach((el, index) => {
    if (!prefersReduced) {
      el.style.transitionDelay = `${index * 0.12}s`;
    }
    requestAnimationFrame(() => {
      el.classList.add('revealed');
    });
  });
}

/* ============================================================
   REVEAL — fade-in + slide-up ao entrar na viewport
   ============================================================ */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ============================================================
   CONTADOR — animação numérica com Intersection Observer
   ============================================================ */
function initCounters() {
  const section = document.getElementById('numeros');
  if (!section) return;

  const counters = section.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    counters.forEach((el) => {
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      el.textContent = `${prefix}${el.dataset.target}${suffix}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}

/* ============================================================
   FAQ — accordion exclusivo com transição suave
   ============================================================ */
function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    const answerId = `faq-answer-${index}`;

    answer.id = answerId;
    question.setAttribute('aria-controls', answerId);

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

/* ============================================================
   FORMULÁRIO — validação básica com feedback visual
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    nome: {
      el: form.querySelector('#nome'),
      validate: (v) => v.trim().length >= 2,
      message: 'Informe seu nome (mínimo 2 caracteres).',
    },
    email: {
      el: form.querySelector('#email'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Informe um e-mail válido.',
    },
    mensagem: {
      el: form.querySelector('#mensagem'),
      validate: (v) => v.trim().length >= 10,
      message: 'A mensagem deve ter pelo menos 10 caracteres.',
    },
  };

  const showError = (field, message) => {
    field.el.classList.remove('is-valid');
    field.el.classList.add('is-invalid');
    const errorEl = field.el.parentElement.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = message;
  };

  const showValid = (field) => {
    field.el.classList.remove('is-invalid');
    field.el.classList.add('is-valid');
    const errorEl = field.el.parentElement.querySelector('.error-msg');
    if (errorEl) errorEl.textContent = '';
  };

  Object.values(fields).forEach((field) => {
    field.el.addEventListener('blur', () => {
      if (field.validate(field.el.value)) {
        showValid(field);
      } else if (field.el.value.trim()) {
        showError(field, field.message);
      }
    });

    field.el.addEventListener('input', () => {
      if (field.el.classList.contains('is-invalid') && field.validate(field.el.value)) {
        showValid(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    Object.values(fields).forEach((field) => {
      if (!field.validate(field.el.value)) {
        showError(field, field.message);
        isValid = false;
      } else {
        showValid(field);
      }
    });

    if (!isValid) return;

    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
      successMsg.hidden = false;
    }

    form.reset();
    Object.values(fields).forEach((field) => {
      field.el.classList.remove('is-valid', 'is-invalid');
    });

    setTimeout(() => {
      if (successMsg) successMsg.hidden = true;
    }, 5000);
  });
}
