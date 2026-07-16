/* ==========================================================
   SI FTI UNIBI — app.js
   Shared JavaScript for all pages
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar sticky & scrolled class ----
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // ---- Scroll to top ----
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Mobile hamburger ----
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // ---- Hero Slider ----
  const slides    = document.querySelectorAll('.slide');
  const dots      = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let sliderTimer  = null;

  function goToSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide])   dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startSlider() {
    sliderTimer = setInterval(nextSlide, 5000);
  }
  function resetTimer() {
    clearInterval(sliderTimer);
    startSlider();
  }

  if (slides.length > 0) {
    goToSlide(0);
    startSlider();

    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetTimer(); });
    });
  }

  // ---- Testimonial Slider ----
  const testSlides = document.querySelectorAll('.testimonial-slide');
  const testDots   = document.querySelectorAll('.testimonial-dot');
  let currentTest  = 0;

  function goToTestimonial(n) {
    testSlides.forEach(s => s.classList.remove('active'));
    testDots.forEach(d => d.classList.remove('active'));
    currentTest = (n + testSlides.length) % testSlides.length;
    if (testSlides[currentTest]) testSlides[currentTest].classList.add('active');
    if (testDots[currentTest])   testDots[currentTest].classList.add('active');
  }

  if (testSlides.length > 0) {
    goToTestimonial(0);
    setInterval(() => goToTestimonial(currentTest + 1), 6000);
    testDots.forEach((dot, i) => dot.addEventListener('click', () => goToTestimonial(i)));
  }

  // ---- Accordion ----
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body   = header.nextElementSibling;
      const isOpen = header.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('open');
        if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
      });
      // Open clicked
      if (!isOpen) {
        header.classList.add('open');
        if (body) body.classList.add('open');
      }
    });
  });

  // ---- Reveal on scroll ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- Animated counter ----
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step = target / 70;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 22);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  // ---- Table Search ----
  const searchInput = document.getElementById('tableSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      document.querySelectorAll('.searchable-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }

  // ---- News date badge color ----
  // Already handled in CSS

});
