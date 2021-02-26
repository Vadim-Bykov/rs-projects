// Значок бургер
const burger = document.querySelector('.burger__menu');
// Навигация бургер меню
const nav = document.querySelector('nav');
// Затемнение крана (обложка)
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

//Возьмем пункты навигации бургер меню и навесим им событие для открытия нужной темы 
const navItems = document.querySelectorAll('.item_nav');
navItems.forEach(item => {
   item.addEventListener('click', () => {
      navItems.forEach(item => {
         item.classList.remove('active');
      });
      activateBurger();
      item.classList.add('active');
   })
});

burger.addEventListener('click', activateBurger);
burger.addEventListener('click', markerActiveItem);
overlay.addEventListener('click', activateBurger);

// Функция открытия-закрытия бургер меню
function activateBurger() {
   // делаем крестик
   burger.classList.toggle('active');
   // показываем серую обложку
   overlay.classList.toggle('active');
   // блокируем body
   body.classList.toggle('lock');
   closeNav();
};

// Закрываем-открываем навигацию бургер меню
function closeNav() {
   if (!nav.classList.contains('active')) {
      nav.classList.add('active');
   } else {
      nav.classList.remove('active');
      nav.classList.add('delayActive');
      setTimeout(() => {
         nav.classList.remove('delayActive');
      }, 300);
   }
};

// Выделяем активный пункт навигации, если он был выбран не через burger
function markerActiveItem() {
   const pageName = document.querySelector('.topic h2');
   navItems.forEach(item => item.classList.remove('active'));
   const activeItem = [...navItems].find(item => item.textContent === pageName.textContent);
   if (!activeItem) return
   activeItem.classList.add('active');
};