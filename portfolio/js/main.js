// Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});

// Close mobile menu on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    links.classList.remove('open');
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('.section, #hero');
const navAnchors = links.querySelectorAll('a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Modal
const modal = document.getElementById('modal');
const modalImg = modal.querySelector('.modal-img');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');

function openModal(card) {
  modalImg.src = card.dataset.img;
  modalImg.alt = card.dataset.title;
  modalTitle.textContent = card.dataset.title;
  modalDesc.textContent = card.dataset.desc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});
