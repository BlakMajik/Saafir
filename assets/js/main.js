/**
 * SAAFIR — Marcus Saafir Editorial Website
 * Client-Side Interaction & Micro-Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initHeaderScroll();
  initNavSpy();
  initMobileDrawer();
  initLightbox();
  initDynamicYear();
});

/**
 * 1. Live Los Angeles Local Time
 */
function initLiveClock() {
  const timeElem = document.getElementById('la-time');
  if (!timeElem) return;

  function updateTime() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      timeElem.textContent = formatter.format(now);
    } catch (e) {
      // Fallback
      const now = new Date();
      timeElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  updateTime();
  setInterval(updateTime, 30000);
}

/**
 * 2. Sticky Header Scrolled State
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 3. Active Navigation Spy
 */
function initNavSpy() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  function highlightNav() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
}

/**
 * 4. Mobile Menu Drawer
 */
function initMobileDrawer() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openDrawer);
  if (menuClose) menuClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 5. Lightbox Modal for Visual Journal
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('lightbox-caption-text');
  const closeBtn = document.querySelector('.lightbox-close');
  const backdrop = document.querySelector('.lightbox-backdrop');

  if (!modal || !modalImg || !captionText) return;

  const galleryImages = document.querySelectorAll('.journal-img, .btn-expand');

  galleryImages.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetImg = trigger.classList.contains('journal-img')
        ? trigger
        : trigger.closest('.journal-card')?.querySelector('.journal-img');

      if (!targetImg) return;

      const src = targetImg.getAttribute('data-lightbox-src') || targetImg.src;
      const caption = targetImg.getAttribute('data-lightbox-caption') || targetImg.alt;

      modalImg.src = src;
      modalImg.alt = targetImg.alt;
      captionText.textContent = caption;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalImg.src = '';
      captionText.textContent = '';
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 6. Dynamic Year
 */
function initDynamicYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}
