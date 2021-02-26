const cards = [
  ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Transport', 'Fruits'],
  [{
      word: 'cry',
      translation: 'плакать',
      image: 'assets/img/cry.jpg',
      audioSrc: 'assets/audio/cry.mp3'
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'assets/img/dance.jpg',
      audioSrc: 'assets/audio/dance.mp3'
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'assets/img/dive.jpg',
      audioSrc: 'assets/audio/dive.mp3'
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'assets/img/draw.jpg',
      audioSrc: 'assets/audio/draw.mp3'
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'assets/img/fish.jpg',
      audioSrc: 'assets/audio/fish.mp3'
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'assets/img/fly.jpg',
      audioSrc: 'assets/audio/fly.mp3'
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'assets/img/hug.jpg',
      audioSrc: 'assets/audio/hug.mp3'
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'assets/img/jump.jpg',
      audioSrc: 'assets/audio/jump.mp3'
    }
  ],
  [{
      word: 'open',
      translation: 'открывать',
      image: 'assets/img/open.jpg',
      audioSrc: 'assets/audio/open.mp3'
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'assets/img/play.jpg',
      audioSrc: 'assets/audio/play.mp3'
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'assets/img/point.jpg',
      audioSrc: 'assets/audio/point.mp3'
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'assets/img/ride.jpg',
      audioSrc: 'assets/audio/ride.mp3'
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'assets/img/run.jpg',
      audioSrc: 'assets/audio/run.mp3'
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'assets/img/sing.jpg',
      audioSrc: 'assets/audio/sing.mp3'
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'assets/img/skip.jpg',
      audioSrc: 'assets/audio/skip.mp3'
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'assets/img/swim.jpg',
      audioSrc: 'assets/audio/swim.mp3'
    }
  ],
  [{
      word: 'cat',
      translation: 'кот',
      image: 'assets/img/cat.jpg',
      audioSrc: 'assets/audio/cat.mp3'
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'assets/img/chick.jpg',
      audioSrc: 'assets/audio/chick.mp3'
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'assets/img/chicken.jpg',
      audioSrc: 'assets/audio/chicken.mp3'
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'assets/img/dog.jpg',
      audioSrc: 'assets/audio/dog.mp3'
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'assets/img/horse.jpg',
      audioSrc: 'assets/audio/horse.mp3'
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'assets/img/pig.jpg',
      audioSrc: 'assets/audio/pig.mp3'
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'assets/img/rabbit.jpg',
      audioSrc: 'assets/audio/rabbit.mp3'
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'assets/img/sheep.jpg',
      audioSrc: 'assets/audio/sheep.mp3'
    }
  ],
  [{
      word: 'bird',
      translation: 'птица',
      image: 'assets/img/bird.jpg',
      audioSrc: 'assets/audio/bird.mp3'
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'assets/img/fish1.jpg',
      audioSrc: 'assets/audio/fish.mp3'
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'assets/img/frog.jpg',
      audioSrc: 'assets/audio/frog.mp3'
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'assets/img/giraffe.jpg',
      audioSrc: 'assets/audio/giraffe.mp3'
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'assets/img/lion.jpg',
      audioSrc: 'assets/audio/lion.mp3'
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'assets/img/mouse.jpg',
      audioSrc: 'assets/audio/mouse.mp3'
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'assets/img/turtle.jpg',
      audioSrc: 'assets/audio/turtle.mp3'
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'assets/img/dolphin.jpg',
      audioSrc: 'assets/audio/dolphin.mp3'
    }
  ],
  [{
      word: 'skirt',
      translation: 'юбка',
      image: 'assets/img/skirt.jpg',
      audioSrc: 'assets/audio/skirt.mp3'
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'assets/img/pants.jpg',
      audioSrc: 'assets/audio/pants.mp3'
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'assets/img/blouse.jpg',
      audioSrc: 'assets/audio/blouse.mp3'
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'assets/img/dress.jpg',
      audioSrc: 'assets/audio/dress.mp3'
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'assets/img/boot.jpg',
      audioSrc: 'assets/audio/boot.mp3'
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'assets/img/shirt.jpg',
      audioSrc: 'assets/audio/shirt.mp3'
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'assets/img/coat.jpg',
      audioSrc: 'assets/audio/coat.mp3'
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'assets/img/shoe.jpg',
      audioSrc: 'assets/audio/shoe.mp3'
    }
  ],
  [{
      word: 'sad',
      translation: 'грустный',
      image: 'assets/img/sad.jpg',
      audioSrc: 'assets/audio/sad.mp3'
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'assets/img/angry.jpg',
      audioSrc: 'assets/audio/angry.mp3'
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'assets/img/happy.jpg',
      audioSrc: 'assets/audio/happy.mp3'
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'assets/img/tired.jpg',
      audioSrc: 'assets/audio/tired.mp3'
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'assets/img/surprised.jpg',
      audioSrc: 'assets/audio/surprised.mp3'
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'assets/img/scared.jpg',
      audioSrc: 'assets/audio/scared.mp3'
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'assets/img/smile.jpg',
      audioSrc: 'assets/audio/smile.mp3'
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'assets/img/laugh.jpg',
      audioSrc: 'assets/audio/laugh.mp3'
    }
  ],
  [{
      word: 'airplane',
      translation: 'самолёт',
      image: 'assets/img/airplane.jpg',
      audioSrc: 'assets/audio/airplane.m4a'
    },
    {
      word: 'bus',
      translation: 'автобус',
      image: 'assets/img/bus.jpg',
      audioSrc: 'assets/audio/bus.m4a'
    },
    {
      word: 'car',
      translation: 'машина',
      image: 'assets/img/car.jpg',
      audioSrc: 'assets/audio/car.m4a'
    },
    {
      word: 'helicopter',
      translation: 'вертолет',
      image: 'assets/img/helicopter.jpg',
      audioSrc: 'assets/audio/helicopter.m4a'
    },
    {
      word: 'motorbike',
      translation: 'мотоцикл',
      image: 'assets/img/motorbike.jpg',
      audioSrc: 'assets/audio/motorbike.m4a'
    },
    {
      word: 'taxi',
      translation: 'такси',
      image: 'assets/img/taxi.jpg',
      audioSrc: 'assets/audio/taxi.m4a'
    },
    {
      word: 'trolleybus',
      translation: 'троллейбус',
      image: 'assets/img/trolleybus.jpg',
      audioSrc: 'assets/audio/trolleybus.m4a'
    },
    {
      word: 'truck',
      translation: 'грузовик',
      image: 'assets/img/truck.jpg',
      audioSrc: 'assets/audio/truck.m4a'
    }
  ],
  [{
      word: 'ananas',
      translation: 'ананас',
      image: 'assets/img/ananas.jpg',
      audioSrc: 'assets/audio/ananas.m4a'
    },
    {
      word: 'apple',
      translation: 'яблоко',
      image: 'assets/img/apple.jpg',
      audioSrc: 'assets/audio/apple.m4a'
    },
    {
      word: 'banana',
      translation: 'банан',
      image: 'assets/img/banana.jpg',
      audioSrc: 'assets/audio/banana.m4a'
    },
    {
      word: 'garnet',
      translation: 'гранат',
      image: 'assets/img/garnet.jpg',
      audioSrc: 'assets/audio/garnet.m4a'
    },
    {
      word: 'lemon',
      translation: 'лимон',
      image: 'assets/img/lemon.jpg',
      audioSrc: 'assets/audio/lemon.m4a'
    },
    {
      word: 'orange',
      translation: 'апельсин',
      image: 'assets/img/orange.jpg',
      audioSrc: 'assets/audio/orange.m4a'
    },
    {
      word: 'peach',
      translation: 'персик',
      image: 'assets/img/peach.jpg',
      audioSrc: 'assets/audio/peach.m4a'
    },
    {
      word: 'pear',
      translation: 'груша',
      image: 'assets/img/pear.jpg',
      audioSrc: 'assets/audio/pear.m4a'
    }
  ]
];

// 
function createPages() {
  // Переменные для наполнения контентом блоков
  let html = '';
  // Кнопка start в режиме игры
  const btnStartGame = document.querySelector('.button_start');
  // const btnRepeatWord = document.querySelector('.button_repeat');
  // Блок статистики
  const blockStatistic = document.querySelector('.statistics');


  // Создаем наполнение для nav в Burger Menu
  function addContentBurgerMenu() {
    const navBurger = document.querySelector('.nav');
    for (let i = 0; i < cards[0].length; i++) {
      const p = document.createElement('p');
      p.classList.add(`item_nav`);
      p.dataset.topic = `${i+1}`;
      p.textContent = `${cards[0][i]}`;
      navBurger.appendChild(p);
    };

    // Создадим пункт статистики
    const p = document.createElement('p');
    p.classList.add(`item_nav`);
    p.dataset.statistics = 'statistics';
    p.textContent = 'Statistics';
    navBurger.appendChild(p);
  };
  addContentBurgerMenu();

  // Создаем наполнение для карточек Main Page
  function createMainPage() {
    const container = document.querySelector('.container');
    for (let i = 0; i < cards[0].length; i++) {
      const card = document.createElement('div');
      card.classList.add(`card`);
      card.dataset.topic = `${i+1}`;
      html = `
            <img class="photo" src="${cards[i+1][0].image}" alt="${cards[0][i]}" data-topic="${i+1}">
            <p data-topic="${i+1}">${cards[0][i]}</p>
        `
      card.innerHTML = html;
      container.appendChild(card);

    };
    // return container
  };

  // Переменная для смены заголовка страницы
  const titlePage = document.querySelector('.title_page');

  // Заполняем карточки Main Page
  function renderMainPage() {
    // Еси уже есть карточки удаляем их
    remove();
    createMainPage();
    titlePage.textContent = `Main page`;
    // Убираем кнопку, если включен режим игры
    btnStartGame.classList.remove('play', 'repeat');
  }
  renderMainPage();


  // Создаем наполнение для карточек по темам
  function createRestPages(array, length, id) {
    const container = document.querySelector('.container');
    for (let i = 0; i < length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      if (toggleMode.classList.contains('play')) card.classList.add('play');
      card.dataset.word = `${array[i].word}`;
      html = `
            <img class="photo" src="${array[i].image}" alt="${array[i].word}" data-word="${array[i].word}" data-id="${id}">
            <p data-word="${array[i].word}">${array[i].word}</p>
            <img class="arrow" src="assets/img/arrow1.png" alt="arrow" width="50" data-word="${array[i].word}" data-id="${id}" data-text="${[i]}" data-arrow="true">
            <audio class="audio_word" data-audio="${array[i].word}" src="${array[i].audioSrc}"></audio>
            <div class="cover"></div>
        `
      card.innerHTML = html;

      container.appendChild(card)
    };

  };

  // Функция очистки карточек
  function remove() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.parentElement.removeChild(card);
    });
    removeStatistics();
    removeStars();
  };

  // создадим функцию, удаляющую звезды при переходе на др. тему в режиме игры (если игра не закончена)
  function removeStars() {
    const starContainer = document.querySelector('.star_container');
    if (starContainer.classList.contains('play')) {
      // Удаляем слушатель и обнуляем счетчики
      // document.removeEventListener('click', handler);
      countClick = 0;
      countIncorrectClick = 0;
      // Удаляем обвертки правильно отвеченных карточек
      const wrapCheckedCards = document.querySelectorAll('.checked_wrap');
      wrapCheckedCards.forEach(wrap => wrap.parentElement.removeChild(wrap));
      // Удаляем звезды
      const stars = document.querySelectorAll('.star_container span');
      stars.forEach(star => star.parentElement.removeChild(star));
      // Убираем контейнер для звезд
      starContainer.classList.remove('play');
    };
  };

  // Заполняем карточки по темам
  function renderPages(array, length, id) {
    // Если уже есть карточки удаляем их
    remove();
    createRestPages(array, length, id);
    // Устанавливаем заголовок страницы
    titlePage.textContent = `${cards[0][id - 1]}`;

    // Если включен режим игры добавим класс для отображения страницы в режиме игры  
    if (toggleMode.classList.contains('play')) {
      // убираем текст и стрелку
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.classList.add('play');
      });
      // Делаем фото на всю карточку
      const photos = document.querySelectorAll('.photo');
      photos.forEach(photo => {
        photo.classList.add('play');
      });

      // Появляется кнопка Start game
      btnStartGame.classList.add('play');
      // Если кнопка Start game уже была нажата ранее (в другой игре) и отображалась как повтор убираем класс
      if (btnStartGame.classList.contains('repeat')) btnStartGame.classList.remove('repeat');

    };
  };
  // renderPages();

  function removeStatistics() {
    blockStatistic.classList.add('inactive');
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.parentElement.removeChild(cell))

  };

  function renderStatistics() {
    remove();
    blockStatistic.classList.remove('inactive');
    titlePage.textContent = 'Statistics';
    // Убираем кнопку, если включен режим игры
    btnStartGame.classList.remove('play', 'repeat');
    createStatistics();
  };

  // вешаем событие на документ для определения кликов
  document.addEventListener('click', (e) => {
    // Определяем номер темы
    const id = e.target.dataset.topic;
    // Если кликнули в burger menu на Main
    if (e.target.dataset.main) renderMainPage();
    // Если кликнули в burger menu или в поле на карточку с темой
    if (e.target.dataset.topic) renderPages(cards[id], cards[1].length, id);
    // Если кликнули в burger menu на statistics
    if (e.target.dataset.statistics) renderStatistics();
    // если кликнули на карточку в уже открытой теме
    if (e.target.dataset.word && !e.target.dataset.arrow && !e.target.classList.contains('play')) {
      const audio = document.querySelector(`audio[data-audio="${e.target.dataset.word}"]`);
      const card = document.querySelector(`[data-word="${e.target.dataset.word}"]`);
      // если карточка не повернута включаем голос
      if (!card.classList.contains('rotate')) audio.play();

      // Добавим в статистику количество кликов по карточке в режиме тренировки
      changeCountTrainStatistics();
    };

    // Если клик по стрелке разворачиваем карточку
    if (e.target.dataset.arrow) {
      const card = document.querySelectorAll(`[data-word="${e.target.dataset.word}"]`);
      // Будем менять текст в карточке на русский
      const cardText = document.querySelector(`p[data-word="${e.target.dataset.word}"]`);
      // Заберем индекс темы с карточками и индекс карточки в теме из входного массива
      const arrayId = e.target.dataset.id;
      const arrayItem = e.target.dataset.text;
      // Во время разворота карточки текст поменяется
      setTimeout(() => {
        cardText.textContent = `${cards[arrayId][arrayItem].translation}`
      }, 300);
      // При уходе курсора с развернутой карточки возвращаем ее прежний вид (почему-то не получилось просто забрать одну карточку и навесить на нее событие без forEach)
      card.forEach(card => {
        // console.log(card)
        card.classList.toggle('rotate');
        setTimeout(() => {
          document.addEventListener('mouseover', mouseoverHandler)
        }, 500);

        // Функция возврата карточке ее прежнего вида
        function mouseoverHandler(e) {
          if (e.target.dataset.word !== cards[arrayId][arrayItem].word) {
            card.classList.toggle('rotate');
            cardText.textContent = `${cards[arrayId][arrayItem].word}`
            document.removeEventListener('mouseover', mouseoverHandler);
          }
        }
      });
    };

    // Добавим в статистику количество кликов по карточке в режиме тренировки
    function changeCountTrainStatistics() {
      let statistics = JSON.parse(localStorage.getItem('statistics'));
      let objectWithWord = statistics.find(obj => obj.word === e.target.dataset.word);
      objectWithWord.train += 1;
      localStorage.setItem('statistics', JSON.stringify(statistics));
    }
  });

  // Переключатель режимов
  const toggleMode = document.querySelector('label');
  // console.log(toggleMode)

  toggleMode.addEventListener('click', toggle);

  // Функция, дающая необходимые классы для корректного отображения в режиме игры
  function toggle(e) {
    toggleMode.classList.toggle('play');
    // На главной странице ничего не меняется в режиме игры
    const pageName = document.querySelector('.topic h2');
    if (pageName.textContent === 'Main page') return;
    if (pageName.textContent === 'Statistics') return;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.toggle('play');
    });

    // Фото на всю карточку
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
      photo.classList.toggle('play');
    });

    // Появляется кнопка старт  
    btnStartGame.classList.toggle('play');
    // Если кнопка btnStartGame уже ыла кликнута возвращаем ее в исходный вид
    if (btnStartGame.classList.contains('repeat')) btnStartGame.classList.remove('repeat');
  };


  return {
    remove: remove,
    renderPages: renderPages,
    renderMainPage: renderMainPage,
    renderStatistics: renderStatistics
  }
}
const methodsCreatePages = createPages();








// export default cards;