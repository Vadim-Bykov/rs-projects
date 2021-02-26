// Создадим статистику
function createStatistics() {
   //Заполняем массив объектами с данными карточек
   let statistics = [];
   if (localStorage.getItem('statistics')) {
      statistics = JSON.parse(localStorage.getItem('statistics'));
   } else {
      for (let i = 0; i < cards[0].length; i++) {
         for (j = 0; j < cards[i + 1].length; j++) {
            let word = {};
            word.category = cards[0][i];
            word.word = cards[i + 1][j].word;
            word.translation = cards[i + 1][j].translation;
            word.train = 0;
            word.correct = 0;
            word.incorrect = 0;
            word.percent = 0;
            word.image = cards[i + 1][j].image;
            word.audioSrc = cards[i + 1][j].audioSrc;
            word.id = i + 1;
            statistics.push(word);
         };
      };
   };

   // Заполняем таблицу статистики
   const statisticTable = document.querySelector('.table');
   statistics.forEach((word, i) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.dataset.row = statistics[i].word;
      statistics[i].percent = (statistics[i].correct === 0 && statistics[i].incorrect === 0) ? 0 : Math.round((statistics[i].correct / (statistics[i].correct + statistics[i].incorrect)) * 100);

      row.innerHTML = `
                     <p class="cell category" data-category="${i+1}">${statistics[i].category}</p>
                     <p class="cell word">${statistics[i].word}</p>
                     <p class="cell translation">${statistics[i].translation}</p>
                     <p class="cell train">${statistics[i].train}</p>
                     <p class="cell correct">${statistics[i].correct}</p>
                     <p class="cell incorrect">${statistics[i].incorrect}</p>
                     <p class="cell percent">${statistics[i].percent}</p>
                     `
      statisticTable.appendChild(row);
   });


   localStorage.setItem('statistics', JSON.stringify(statistics));
   // console.log(statistics);

   // Навешиваем событие на пункты заголовка таблицы
   const headCells = document.querySelectorAll('.cell-head');
   headCells.forEach(headCell => {
      if (!headCell.classList.contains('click')) {
         headCell.classList.add('click');
         headCell.addEventListener('click', sortListener);
      }

      // Добавим класс для индикации обратной сортировки
      headCell.classList.toggle('reverse');

      // Создадим функцию сортировки при клике по заголовку
      function sortListener() {
         const itemName = headCell.dataset.item;
         // console.log(statistics)
         const statistics = JSON.parse(localStorage.getItem('statistics'));

         if (headCell.classList.contains('reverse')) {
            statistics.sort((prev, next) => prev[itemName] > next[itemName] ? -1 : 1);
         } else {
            statistics.sort((prev, next) => prev[itemName] > next[itemName] ? 1 : -1);
         }

         localStorage.setItem('statistics', JSON.stringify(statistics));
         methodsCreatePages.renderStatistics();
      }
   });

   // Сброс статистики
   const btnReset = document.querySelector('.reset');
   btnReset.addEventListener('click', resetStatistics);

   function resetStatistics() {
      localStorage.removeItem('statistics');
      // console.log(headCells)
      methodsCreatePages.renderMainPage();
   };

   // Повтор сложных слов
   const btnRepeat = document.querySelector('.repeat');
   btnRepeat.addEventListener('click', repeatWords);

   function repeatWords() {
      if (cards.length > 9) cards.pop();
      let statistics = JSON.parse(localStorage.getItem('statistics'));
      statistics.sort((prev, next) => prev.incorrect > next.incorrect ? -1 : 1);
      statistics = statistics.slice(0, 8).filter(word => word.incorrect > 0)
      cards.push(statistics);
      methodsCreatePages.renderPages(statistics, statistics.length, cards.length - 1);
      const pageName = document.querySelector('.topic h2');
      pageName.textContent = 'Difficult words';
   };
};

createStatistics();