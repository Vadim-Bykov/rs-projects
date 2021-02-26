const backgroundCollection = [
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/night/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/morning/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/day/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
  `assets/images/evening/1${Math.floor(Math.random()*10)}.jpg`,
];

const quoteArray = [
  'Всё самое лучшее случается неожиданно.',
  'Если проигравший улыбается, победитель теряет вкус победы.',
  'То, что вы ищете, тоже ищет вас.',
  'Где нет опасности, не может быть и славы.',
  'Никто не ценит того, чего слишком много.',
  'Сердце можно лечить только сердцем.',
  'Миллионы людей не заменят тебя. Никогда',
  'Красотой спасётся мир.',
  'Самые светлые моменты уходят так быстро и безвозвратно.',
  'Можно любить всю жизнь. А разлюбить в четверг.'
];

let time = document.querySelector('.time');
let greeting = document.querySelector('.greeting');
let name = document.querySelector('.name');
let focus = document.querySelector('.focus');
let day = document.querySelector('.day');
let quote = document.querySelector('.quote');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const quoteBtn = document.querySelector('.quote_next');

// Установка фонового изображения
const body = document.querySelector('body');
let hour = new Date().getHours();
const img = document.createElement('img');
img.src = backgroundCollection[hour];
img.onload = () => {
  body.style.backgroundImage = `url(${backgroundCollection[hour]})`;
};

let i = hour + 1;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const img = document.createElement('img');
  img.src = data;
  img.onload = () => {
    body.style.backgroundImage = `url(${data})`;
  };
};

function getImage() {
  const index = i % backgroundCollection.length;
  const imageSrc = backgroundCollection[index];
  viewBgImage(imageSrc);
  i++;
  nextBtn.disabled = true;
  setTimeout(function () {
    nextBtn.disabled = false
  }, 500);
}
nextBtn.addEventListener('click', getImage);


// Отображение времени
// const showAmPm = true;
function showTimeDate() {

  let today = new Date(),
    hour = today.getHours(),
    minute = today.getMinutes(),
    second = today.getSeconds(),
    dayWeek = today.getDay();

  // const amPm = hour < 12 ? 'AM' : 'PM';
  // hour = hour % 12 || 12;

  const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  day.innerHTML = `${daysWeek[dayWeek]}, ${today.getDate()} ${daysMonth[today.getMonth()]}`;

  time.innerHTML = `${hour}<span>:</span>${addZero(minute)}<span>:</span>${addZero(second)}`;

  setTimeout(showTimeDate, 1000)
};

function addZero(n) {
  return (n < 10 ? '0' + n : n)
}

// Установка фонового изображения

function setBgGreet() {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();

  if (hour < 6) {
    greeting.textContent = 'Good night,';
  } else if (hour < 12) {
    greeting.textContent = 'Good morning,';
  } else if (hour < 18) {
    greeting.textContent = 'Good day,';
  } else {
    greeting.textContent = 'Good evening,';
  }
  if (minute === 0 && second === 0) {
    const img = document.createElement('img');
    img.src = backgroundCollection[hour];
    img.onload = () => {
      body.style.backgroundImage = `url(${backgroundCollection[hour]})`;
    };
  }
  setTimeout(setBgGreet, 1000)
};

// Get Name
function getName() {
  if (localStorage.getItem('name') == null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
};

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      name.blur();
      if (e.target.innerText != '' && e.target.innerText != '[Enter Name]') {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    if (e.target.innerText == '') {
      name.textContent = localStorage.getItem('name') || '[Enter Name]';

    } else {
      localStorage.setItem('name', e.target.innerText);
    }
  }
};

//очистка поля ввода
name.addEventListener('click', (e) => name.textContent = '')


// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      focus.blur();
      if (e.target.innerText != '' && e.target.innerText != '[Enter Focus]') {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    if (e.target.innerText == '') {
      focus.textContent = localStorage.getItem('focus') || '[Enter Focus]';

    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  }
};
// if focus null
focus.addEventListener('click', (e) => focus.textContent = '');

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTimeDate();
setBgGreet();
getName();
getFocus();


function showQuote() {
  quote.textContent = quoteArray[Math.floor(Math.random() * 10)];
}
showQuote();

let iterQuote = 0;
quoteBtn.addEventListener('click', () => {
  iterQuote++;
  quote.textContent = quoteArray[iterQuote % quoteArray.length];
})


// Погода
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');


async function getWeather(e) {
  try {
    if (localStorage.getItem('city') === null) {
      city.textContent = 'Минск';
    } else {
      city.textContent = localStorage.getItem('city');
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=543c9bb3c115ee39476506208d454b41&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    humidity.textContent = `Влажность воздуха ${data.main.humidity} %`;
    wind.textContent = `Скорость ветра ${data.wind.speed} м/с`;
    weatherDescription.textContent = data.weather[0].description;

    return data
  } catch (error) {
    city.textContent = 'Введите правильно город'
  }

};

function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      city.blur();
      if (e.target.innerText != '' && e.target.innerText != 'Минск') {
        localStorage.setItem('city', e.target.innerText);
        city.blur();
        getWeather();
      }
    }
  } else {
    if (e.target.innerText == '') {
      city.textContent = localStorage.getItem('city') || 'Минск';

    } else {
      localStorage.setItem('city', e.target.innerText);
      getWeather();

    }
  }
};


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', () => city.textContent = '');