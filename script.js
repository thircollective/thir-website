/* ============================================================
   THIR COLLECTIVE — script.js
   Scroll Reveal · Navbar · Mobile Menu · Modals · Parallax
   ============================================================ */

/* ── Wait for DOM ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     NAVBAR: scroll behaviour
  =========================== */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  /* ===========================
     MOBILE MENU
  =========================== */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    hamburger.classList.add('active');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMenu();
  });


  /* ===========================
     SCROLL REVEAL
  =========================== */
  const revealEls = document.querySelectorAll('.reveal-fade, .reveal-up');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ===========================
     WORKSHOP MODALS
  =========================== */
  const workshopData = {
    rahao: {
      num: '01',
      title: 'Rahao',
      description: 'Helps you pause, step out of autopilot, and understand what is happening within you — so you can respond consciously instead of reacting impulsively. Rahao creates the conditions for genuine inner observation.',
      outcomeLabel: 'What you take away',
      outcome: 'Mental clarity, emotional grounding, and relief from constant overwhelm.'
    },
    vichaar: {
      num: '02',
      title: 'Vichaar',
      description: 'Helps you identify patterns, reflect deeply, and understand what you are truly feeling, why you are feeling it, and what lies beneath the surface. A guided journey into self-understanding.',
      outcomeLabel: 'What you take away',
      outcome: 'Clarity, self-awareness, and thoughtful decision-making.'
    },
    agami: {
      num: '03',
      title: 'Agami',
      description: 'Helps you turn reflection into action by guiding you through the first practical steps toward meaningful change. Agami bridges the inner and the outer — thought becomes movement.',
      outcomeLabel: 'What you take away',
      outcome: 'Direction, confidence, and consistent forward movement.'
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const workshopBtns = document.querySelectorAll('[data-open]');

  function openWorkshopModal(key) {
    const data = workshopData[key];
    if (!data) return;

    modalContent.innerHTML = `
      <p class="modal-num">${data.num}</p>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.description}</p>
      <p class="modal-outcome-label">${data.outcomeLabel}</p>
      <p class="modal-outcome">${data.outcome}</p>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => modalClose.focus(), 100);
  }

  function closeWorkshopModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  workshopBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openWorkshopModal(btn.getAttribute('data-open'));
    });
  });

  // Also allow clicking the card
  document.querySelectorAll('.workshop-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.workshop-btn')) {
        openWorkshopModal(card.getAttribute('data-workshop'));
      }
    });
  });

  modalClose.addEventListener('click', closeWorkshopModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeWorkshopModal();
  });


  /* ===========================
     INQUIRY MODAL
  =========================== */
  const inquiryOverlay = document.getElementById('inquiryOverlay');
  const inquiryBox = document.getElementById('inquiryBox');
  const openInquiry = document.getElementById('openInquiry');
  const inquiryClose = document.getElementById('inquiryClose');

  function openInquiryModal() {
    inquiryOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeInquiryModal() {
    inquiryOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openInquiry) {
    openInquiry.addEventListener('click', openInquiryModal);
  }

  // Also trigger on "Raise Inquiry" links in guided section
  document.querySelectorAll('a[href="#inquiry"]').forEach(link => {
    // Only for buttons, not footer nav
    if (link.classList.contains('btn-primary')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openInquiryModal();
      });
    }
  });

  inquiryClose.addEventListener('click', closeInquiryModal);

  inquiryOverlay.addEventListener('click', (e) => {
    if (e.target === inquiryOverlay) closeInquiryModal();
  });


  /* ===========================
     KEYBOARD: ESC closes modals
  =========================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay.classList.contains('open')) closeWorkshopModal();
      if (inquiryOverlay.classList.contains('open')) closeInquiryModal();
      if (mobileOverlay.classList.contains('open')) closeMenu();
    }
  });


  /* ===========================
     HERO PARALLAX
  =========================== */
  const heroGlow = document.querySelector('.hero-glow');

  function handleHeroParallax() {
    const scrollY = window.scrollY;
    if (heroGlow && scrollY < window.innerHeight) {
      const offset = scrollY * 0.3;
      heroGlow.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    }
  }

  window.addEventListener('scroll', handleHeroParallax, { passive: true });


  /* ===========================
     SMOOTH SCROLL for nav links
  =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target && !this.classList.contains('btn-primary')) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===========================
     BRAND STORY VIDEO: slow down playback
  =========================== */
  const brandStoryVideo = document.querySelector('.brand-story-video');
  if (brandStoryVideo) {
    brandStoryVideo.playbackRate = 1.0;
  }

  /* ===========================
     ECOSYSTEM: subtle node pulse
  =========================== */
  const ecoNodes = document.querySelectorAll('.eco-node');
  const ecoSvg = document.querySelector('.eco-svg');
  const ecoCenter = document.querySelector('.eco-center');
  const ecoLines = document.querySelectorAll('.eco-line');

  ecoNodes.forEach((node, i) => {
    node.style.animationDelay = `${i * 0.5}s`;
  });

  function updateEcoLines() {
    if (!ecoSvg || !ecoCenter || !ecoLines.length) return;

    const svgRect = ecoSvg.getBoundingClientRect();
    const centerRect = ecoCenter.getBoundingClientRect();
    const centerPoint = {
      x: centerRect.left + centerRect.width / 2,
      y: centerRect.top + centerRect.height / 2,
    };

    const svgToViewBox = (clientX, clientY) => {
      return {
        x: ((clientX - svgRect.left) / svgRect.width) * 600,
        y: ((clientY - svgRect.top) / svgRect.height) * 600,
      };
    };

    const centerView = svgToViewBox(centerPoint.x, centerPoint.y);

    ecoLines.forEach(line => {
      const nodeKey = line.dataset.node;
      const node = document.querySelector(`.eco-node--${nodeKey}`);
      if (!node) return;

      const nodeRect = node.getBoundingClientRect();
      const nodePoint = {
        x: nodeRect.left + nodeRect.width / 2,
        y: nodeRect.top + nodeRect.height / 2,
      };

      const nodeView = svgToViewBox(nodePoint.x, nodePoint.y);
      line.setAttribute('x1', nodeView.x);
      line.setAttribute('y1', nodeView.y);
      line.setAttribute('x2', centerView.x);
      line.setAttribute('y2', centerView.y);
    });
  }

  function animateEcoLines() {
    updateEcoLines();
    requestAnimationFrame(animateEcoLines);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animateEcoLines();
  } else {
    updateEcoLines();
  }


  /* ===========================
     BRAND STORY: slight parallax
     on large typography
  =========================== */
  const storyBlocks = document.querySelectorAll('.story-block');

  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  storyBlocks.forEach((block, i) => {
    block.style.transition = `opacity 0.9s ${i * 0.12}s ease, transform 0.9s ${i * 0.12}s ease`;
    storyObserver.observe(block);
  });


  /* ===========================
     PHILOSOPHY: stagger reveal
  =========================== */
  const philLines = document.querySelectorAll('.phil-line');

  philLines.forEach((line, i) => {
    line.style.setProperty('--delay', `${i * 0.15}s`);
  });


  /* ===========================
     WORKSHOP CAROUSEL
  =========================== */
  const carouselTrack = document.querySelector('.workshop-cards');
  const prevArrow = document.querySelector('.workshop-arrow--prev');
  const nextArrow = document.querySelector('.workshop-arrow--next');
  const carouselDots = document.querySelectorAll('.workshop-dot');
  const carouselCards = document.querySelectorAll('.workshop-card');
  let activeCard = 0;

  function goToCard(index) {
    index = Math.max(0, Math.min(carouselCards.length - 1, index));
    carouselTrack.scrollTo({ left: carouselCards[index].offsetLeft, behavior: 'smooth' });
    activeCard = index;
    carouselDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  if (prevArrow) prevArrow.addEventListener('click', () => goToCard(activeCard - 1));
  if (nextArrow) nextArrow.addEventListener('click', () => goToCard(activeCard + 1));

  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => goToCard(+dot.dataset.index));
  });

  if (carouselTrack) {
    carouselTrack.addEventListener('scroll', () => {
      let closest = 0;
      let minDiff = Infinity;
      carouselCards.forEach((card, i) => {
        const diff = Math.abs(card.offsetLeft - carouselTrack.scrollLeft);
        if (diff < minDiff) { minDiff = diff; closest = i; }
      });
      if (closest !== activeCard) {
        activeCard = closest;
        carouselDots.forEach((dot, i) => dot.classList.toggle('active', i === activeCard));
      }
    }, { passive: true });
  }


  /* ===========================
     INIT COMPLETE
  =========================== */
  console.log('THIR Collective — stillness begins here.');

});
