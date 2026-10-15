const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    menuButton.focus();
  }
});

const serviceCards = [...document.querySelectorAll('.service-card')];
const selectionNote = document.querySelector('#selection-note');
const contactChoice = document.querySelector('#contact-choice');
const emailLink = document.querySelector('#email-link');

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    serviceCards.forEach((item) => item.setAttribute('aria-pressed', String(item === card)));
    const service = card.dataset.service;
    const subject = `Contato pelo portfólio — ${service}`;
    emailLink.href = `mailto:danielgoncxz@gmail.com?subject=${encodeURIComponent(subject)}`;
    selectionNote.textContent = `${service} selecionado. Use o botão de e-mail na seção Contato.`;
    contactChoice.textContent = `Assunto: ${subject}`;
  });
});

const year = document.querySelector('#year');
year.textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const header = document.querySelector('.site-header');
let scrollUpdatePending = false;

function updateActiveSection() {
  const focusLine = header.getBoundingClientRect().height + Math.min(window.innerHeight * 0.28, 180);
  let currentSection = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= focusLine) currentSection = section;
  }

  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${currentSection.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollUpdatePending = false;
}

function scheduleActiveSectionUpdate() {
  if (scrollUpdatePending) return;
  scrollUpdatePending = true;
  window.requestAnimationFrame(updateActiveSection);
}

window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
window.addEventListener('resize', scheduleActiveSectionUpdate);
window.addEventListener('load', scheduleActiveSectionUpdate);
scheduleActiveSectionUpdate();
