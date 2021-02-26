const linkHelp = document.querySelector('.help_nav');
const linkContacts = document.querySelector('.contacts');
const burger = document.querySelector('.burger__menu');
const ourNav = document.querySelector('.our');
const nav = document.querySelector('nav');
const headerBlock = document.querySelector('.header__block');
const header = document.querySelector('.header');
const wrapper = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

linkHelp.addEventListener('click', preventLink);
linkContacts.addEventListener('click', preventLink);
burger.addEventListener('click', activateBurger);
ourNav.addEventListener('click', activateBurger);
overlay.addEventListener('click', activateBurger);

function activateBurger() {
   burger.classList.toggle('active');
   headerBlock.classList.toggle('active');
   header.classList.toggle('active');
   wrapper.classList.toggle('active');
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