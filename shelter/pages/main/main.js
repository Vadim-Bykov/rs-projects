const linkHelp = document.querySelector('.help_nav');
const linkContacts = document.querySelector('.contacts');
const aboutNav = document.querySelector('.about');
const burger = document.querySelector('.burger__menu');
const nav = document.querySelector('nav');
const wrapper = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');


linkHelp.addEventListener('click', preventLink);
linkContacts.addEventListener('click', preventLink);
burger.addEventListener('click', activateBurger);
aboutNav.addEventListener('click', activateBurger);
overlay.addEventListener('click', activateBurger);

function activateBurger() {
   burger.classList.toggle('active');
   wrapper.classList.toggle('active');
   header.classList.toggle('active');
   overlay.classList.toggle('active');
   body.classList.toggle('lock');
   if (!nav.classList.contains('active')) {
      nav.classList.add('active');
   } else {
      nav.classList.remove('active');
      nav.classList.add('delayActive');
      setTimeout(() => {
         nav.classList.remove('delayActive');
      }, 300);
   }
}

function preventLink(event) {
   event.preventDefault();
}