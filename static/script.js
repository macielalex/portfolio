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
  initProjectTilt();
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

  elements.forEach((el) => {
    requestAnimationFrame(() => {
      el.classList.add('visible');
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
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ============================================================
   CONTADOR — animação numérica com setInterval (16ms / 1500ms)
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
    const duration = 1500;
    const interval = 16;
    const totalSteps = Math.ceil(duration / interval);
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(step / totalSteps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress >= 1) {
        clearInterval(timer);
        el.textContent = `${prefix}${target}${suffix}`;
      }
    }, interval);
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
    { threshold: 0.15 }
  );

  observer.observe(section);
}

/* ============================================================
   TILT 3D — cards de projeto com rotação proporcional ao cursor
   ============================================================ */
function initProjectTilt() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (prefersReduced || !hasFinePointer) return;

  const maxTilt = 10;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('is-tilting');
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-tilting');
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
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
