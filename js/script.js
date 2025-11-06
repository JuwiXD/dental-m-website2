// Mobile menu toggle function (fixed selectors, pointer/touch support, close-on-link)
const mobileMenuToggle = () => {
  const menuButton = document.getElementById('mobileMenuBtn') || document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('nav') || document.querySelector('.nav');
  if (!menuButton || !nav) return;

  // a11y state
  menuButton.setAttribute('aria-controls', 'nav');
  menuButton.setAttribute('aria-expanded', 'false');

  const toggle = (e) => {
    if (e) e.preventDefault();
    nav.classList.toggle('active');
    menuButton.classList.toggle('active');
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', (!expanded).toString());
  };

  // Prefer pointer events; fallback to touch/click
  if (window.PointerEvent) {
    menuButton.addEventListener('pointerup', toggle);
  } else {
    menuButton.addEventListener('touchstart', toggle, { passive: false });
    menuButton.addEventListener('click', toggle);
  }

  // Close menu on link click (mobile UX)
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach((a) =>
    a.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuButton.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    })
  );
};

// Scroll to top button functionality (guarded)
const scrollToTop = () => {
  const scrollButton = document.querySelector('.scroll-top');
  if (!scrollButton) return;

  const onScroll = () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// Smooth scrolling for anchor links (guarded)
const smoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length === 1) return; // just '#'
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
};

// Form validation for contact form (guarded for pages without form)
const validateForm = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    let valid = true;
    if (name && !name.value.trim()) valid = false;
    if (email && !email.value.trim()) valid = false;
    if (message && !message.value.trim()) valid = false;

    if (!valid) {
      e.preventDefault();
      alert('Пожалуйста, заполните все обязательные поля.');
    }
  });
};

// Active navigation highlighting (current page)
const highlightActiveNav = () => {
  const navLinks = document.querySelectorAll('.nav-list a');
  if (!navLinks.length) return;

  const path = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

// Scroll animations (optional fade-in)
const scrollAnimations = () => {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight - 50;
  };

  const displayScrollElement = (el) => {
    el.classList.add('show');
  };

  const handleScrollAnimation = () => {
    elements.forEach((el) => {
      if (elementInView(el)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();
};

// Initialize functions on DOM load
document.addEventListener('DOMContentLoaded', () => {
  mobileMenuToggle();
  scrollToTop();
  smoothScroll();
  validateForm();
  highlightActiveNav();
  scrollAnimations();
});
