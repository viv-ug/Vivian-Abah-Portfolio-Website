// ============================
// Global Selectors
// ============================
const navLinks = document.querySelectorAll('.nav-links a'); // updated for edge

// ============================
// Loader — dismiss after 2s max (with bulletproof Edge fallback)
// ============================
const loader = document.getElementById('loader');

function dismissLoader() {
  if (!loader || loader.classList.contains('hide')) return;
  loader.classList.add('hide');
  
  // Fallback timeout guarantees removal even if transitionend hiccups in Edge
  setTimeout(() => {
    if (loader && loader.parentNode) {
      loader.remove();
    }
  }, 800); // Slightly longer than the 0.7s CSS transition
}

// Start timer immediately when script runs — don't wait for images
setTimeout(dismissLoader, 2000);

// ============================
// Scroll reveal animation
// ============================
const revealElements = document.querySelectorAll(
  '.project-card, .ticket, .letter-card, .notebook, .skill-badge, .exp-item, .work-category'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// ============================
// Active nav link highlight
// ============================
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--crimson)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ============================
// Subtle parallax on hero
// ============================
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (hero) {
    hero.style.backgroundPositionY = `${scrollY * 0.3}px`;
  }
});

// ============================
// Ticket hover tilt
// ============================
document.querySelectorAll('.ticket').forEach(ticket => {
  ticket.addEventListener('mousemove', (e) => {
    const rect = ticket.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ticket.style.transform = `
      translateY(-6px)
      rotateX(${-(y / rect.height) * 10}deg)
      rotateY(${(x / rect.width) * 10}deg)
    `;
  });

  ticket.addEventListener('mouseleave', () => {
    ticket.style.transform = '';
  });
});

// ============================
// Hamburger menu toggle
// ============================
const hamburger = document.querySelector('.nav-hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}