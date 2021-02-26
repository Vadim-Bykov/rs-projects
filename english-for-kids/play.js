const btnStartGame = document.querySelector('.button_start');
// span с надписью занимает всю кнопку поэтому на него вешаем событие
const spanStartGame = document.querySelector('.start_span');
spanStartGame.addEventListener('click', switchModePlay);


// Функция включает звук и прослушку события при клике по карточке в режиме игры
function switchModePlay() {
   //Счетчик правильных кликов по карточке
   let countClick = 0;
   let countIncorrectClick = 0;
   // Превращаем кнопку старт в кнопку повтор
   btnStartGame.classList.add('repeat');

   // Получим все аудио файлы слов на странице, перемешаем и воспроизведем 1-й
   const audioFiles = document.querySelectorAll('.audio_word');
   const arrayAudioFiles = [...audioFiles];
   arrayAudioFiles.sort(() => Math.random() - 0.5);
   arrayAudioFiles[countClick].play();

   // Вешаем событие 
   document.addEventListener('click', handler);

   function handler(e) {
      // Звуки при правильном и неправильном ответе
      audioCorrect = document.querySelector('[data-audio="correct"]');
      audioError = document.querySelector('[data-audio="error"]');
      // Общий контейнер для блоков со звездами
      const starContainer = document.querySelector('.star_container');
      starContainer.classList.add('play');
      // Контейнеры для звезд при правильном и неправильном ответе
      goldContainer = document.querySelector('.gold_container');
      emptyContainer = document.querySelector('.empty_container');

      const toggleMode = document.querySelector('label');
      // Если ранее во время игры был выключен режим play
      if (!toggleMode.classList.contains('play')) {
         // Удаляем слушатель и обнуляем счетчики
         document.removeEventListener('click', handler);
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

      // Если клик произошел по карточке
      if (e.target.dataset.word && countClick < arrayAudioFiles.length) {
         // Если клик произошел по правильной карточке
         if (e.target.dataset.word === arrayAudioFiles[countClick].dataset.audio) {
            // Создадим и добавим звездочку (изначально невидна, потом появляется)
            const goldStar = document.createElement('span');
            goldStar.innerHTML = `<img class="star gold" src="assets/img/gold_star.png" alt="star">`;
            // goldContainer.appendChild(goldStar);
            goldContainer.insertAdjacentElement('beforeend', goldStar);
            setTimeout(() => {
               goldStar.classList.add('show');
            }, 100);
            audioCorrect.play();

            // Создаем обвертку которая закроет правильно выбранные карточки и не даст по ним кликать
            wrapCheckedCard = document.createElement('div');
            wrapCheckedCard.classList.add('checked_wrap');
            e.target.parentElement.appendChild(wrapCheckedCard);
            setTimeout(() => {
               countClick += 1;
               if (countClick < arrayAudioFiles.length) arrayAudioFiles[countClick].play();
               // handler(e);
            }, 500);

            // Возвращаемся на main page когда получили все правильные ответы
            setTimeout(() => {
               const arrayLength = cards[e.target.dataset.id].length;
               if (countClick === arrayLength) {
                  // Удаляем карточки для корректного отображения смайлика на экране
                  methodsCreatePages.remove();
                  const winSmile = document.querySelector('.win');
                  const loseSmile = document.querySelector('.lose');
                  if (countIncorrectClick === 0) winSmile.classList.add('show');
                  if (countIncorrectClick > 0) {
                     const textForSmile = document.querySelector('.lose p');
                     textForSmile.textContent = `Количество ошибок: ${countIncorrectClick}`;
                     loseSmile.classList.add('show');
                  };
                  setTimeout(() => {
                     methodsCreatePages.renderMainPage();
                     if (countIncorrectClick === 0) {
                        winSmile.classList.remove('show');
                     } else if (countIncorrectClick > 0) {
                        loseSmile.classList.remove('show');
                        countIncorrectClick = 0;
                     };
                     const stars = document.querySelectorAll('.star_container span');
                     stars.forEach(star => star.parentElement.removeChild(star));
                     starContainer.classList.remove('play');
                  }, 3000);
                  countClick = 0;
                  document.removeEventListener('click', handler);
               }
               // mainPage.click()
            }, 500);

            // Добавим в статистику количество правильных кликов по карточке в режиме игры
            function changeCorrectCountPlayStatistics() {
               let statistics = JSON.parse(localStorage.getItem('statistics'));
               let objectWithWord = statistics.find(obj => obj.word === e.target.dataset.word);
               objectWithWord.correct += 1;
               localStorage.setItem('statistics', JSON.stringify(statistics));
            };
            changeCorrectCountPlayStatistics();
            // Если клик произошел по неправильной карточке
         } else if (e.target.dataset.word !== arrayAudioFiles[countClick].dataset.audio) {
            countIncorrectClick += 1;
            const emptyStar = document.createElement('span');
            emptyStar.innerHTML = `<img class="star empty" src="assets/img/empty_star.png" alt="star">`;
            emptyContainer.insertAdjacentElement('afterbegin', emptyStar);
            setTimeout(() => {
               emptyStar.classList.add('show');
            }, 100);
            // console.log('Error');
            audioError.play();

            // Добавим в статистику количество неправильных кликов по карточке в режиме игры
            function changeIncorrectCountPlayStatistics() {
               let statistics = JSON.parse(localStorage.getItem('statistics'));
               let objectWithWord = statistics.find(obj => obj.word === arrayAudioFiles[countClick].dataset.audio);
               objectWithWord.incorrect += 1;
               localStorage.setItem('statistics', JSON.stringify(statistics));
            };
            changeIncorrectCountPlayStatistics();
         };
      };
      // Если клик произошел по кнопке повтора
      if (e.target.dataset.repeat) {
         arrayAudioFiles[countClick].play();
      }
   };
};