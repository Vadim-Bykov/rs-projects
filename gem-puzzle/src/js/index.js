import '../css/style.css';


// Содаем обвертку
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.appendChild(wrapper);
// Содаем игровое поле
const field = document.createElement('div');
field.className = 'field';
wrapper.appendChild(field);
// Содаем информационное поле
const info = document.createElement('div');
info.classList.add('info');
wrapper.appendChild(info);
const progress = document.createElement('div');
progress.classList.add('progress')
info.appendChild(progress);
const time = document.createElement('div');
time.classList.add('time')
time.innerHTML = `00:00`;
info.appendChild(time);

// Содаем панель кнопок для вызова дополнительных функций 
const menu = document.createElement('div');
menu.className = 'menu';
wrapper.appendChild(menu);
menu.innerHTML = `
                  <button data-game="new_game">New game</button>
                  <button data-game="save_game">Save game</button>
                  <button data-game="continue_game">Continue saved game</button>
                  <button data-game="best_results">Best results</button>
                  <button data-game="solution">Solution</button>
                  <button class="sound audioStop" data-game="sound">Sound</button>
                  <form name="form_field">
                    <select name="field_size" size="1">
                      <option value="3">3x3</option>
                      <option value="4" selected="selected">4x4</option>
                      <option value="5">5x5</option>
                      <option value="6">6x6</option>
                      <option value="7">7x7</option>
                      <option value="8">8x8</option>
                    </select>
                  </form>
                  <p>Для возврата к сохраненной игре выбирите размер поля, в котором была сохранена игра.</p>
                  <p>Реализовано автоматическое анимированное завершение игры всех размеров поля. Перед проверкой данного пункта просьба перезагрузить страницу.</p>
                  <p>Спасибо!</p>
                 `

// Содаем аудиоелемент
const div = document.createElement('div');
div.innerHTML = `<audio class="audioStop" data-audio="sound" src="assets/sounds/tink.wav"></audio>`;
document.body.appendChild(div);
const audio = document.querySelector('[data-audio="sound"]');

// Навешиваем события при клике
const btnNewGame = document.querySelector('[data-game="new_game"]');
const btnSaveGame = document.querySelector('[data-game="save_game"]');
const btnContinueGame = document.querySelector('[data-game="continue_game"]');
const btnSound = document.querySelector('[data-game="sound"]');

form_field.addEventListener('click', e => {
  const chosenFieldSize = e.target.value;
  size(chosenFieldSize);
});

btnSound.addEventListener('click', () => {
  audio.classList.toggle('audioStop');
  btnSound.classList.toggle('audioStop');
});


// Переменная, разрешающая запуск таймера (не получилось его корректное изменение при различных событиях при объявлении внутри функции)
let permitStartTimer = true;

// Устанавливаем размер поля
function size(s = 4) {
  // Устанавливаем размер клетки в % 
  let fieldSize = s; //4x4 ...
  let cellSize = 100 / fieldSize; //%
  let countCells = fieldSize * fieldSize; //длина будущего массива
  let empty = countCells - 1;

  // Массив для отслеживания шагов
  let countSteps = [];
  localStorage.setItem('countSteps', JSON.stringify([]));

  // Переменная дя подсчета ходов
  let countMoves = 0;
  progress.innerHTML = `Moves: ${countMoves}`;

  // Массив, в который будем складывать ячейки со значениями
  let cells = [];
  // let permitSetResults = false;


  // Функция передвижения клеток при клике
  function move(index) {
    const cell = cells[index];
    let empty = cells[cells.length - 1];

    // Вычисляем разницу положений в поле для разрешения передвижения
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if ((leftDiff + topDiff) > 1) {
      return
    } else {
      if (localStorage.getItem('countSteps') !== null) countSteps = JSON.parse(localStorage.getItem('countSteps'));

      countSteps.push(index);
      localStorage.setItem('countSteps', JSON.stringify(countSteps));

      // Считаем шаги
      countMoves++;
      progress.innerHTML = `Moves: ${countMoves}`;

      // Запускаем таймер при первом шаге
      if (permitStartTimer) {
        timer()
      };

      // Меняем местами ячейки
      cell.element.style.left = `${empty.left * cellSize}%`;
      cell.element.style.top = `${empty.top * cellSize}%`;
      empty.element.style.left = `${cell.left * cellSize}%`;
      empty.element.style.top = `${cell.top * cellSize}%`;

      const emptyLeft = empty.left;
      const emptyTop = empty.top;
      empty.left = cell.left;
      empty.top = cell.top;
      cell.left = emptyLeft;
      cell.top = emptyTop;
    };

    // Проверка на выйгрыш
    const isFinish = cells.every(cell => cell.value === (cell.top * fieldSize + cell.left) + 1);

    if (isFinish) {
      alert(`«Ура! Вы решили головоломку за ${time.textContent} и ${countMoves} ходов»`);

      // Сохранение лучших результатов
      // Очищаем старые результаты топ-10 для их обновления
      let prevTop10 = document.querySelectorAll('.list .item');
      prevTop10.forEach(item => item.parentElement.removeChild(item));
      // Формируем окно с обновленным результатом Топ-10 при последуещем его вызове
      listTop10.setBestResults(countMoves);
      listTop10.modalActions();

      // Добавляем фон пустой ячейке и убираем цифры
      empty.element.style.backgroundImage = `url(assets/images/${fieldSize}/image_part_${cells.length}.jpg)`;
      cells.forEach(cell => {
        cell.element.style.color = 'rgba(0, 0, 0, 0.0)';
        cell.element.style.textShadow = 'none';
      });
      // Убираем фон пустой ячейке и добавляем обратно цифры
      setTimeout(() => {
        empty.element.style.backgroundImage = `none`;
        cells.forEach(cell => {
          cell.element.style.color = 'white';
          cell.element.style.textShadow = '0px 0px 2px black';
        });
      }, 1000);

      // Обнуляем счетчики после выйгрыша
      time.innerHTML = `00:00`;
      second = 0;
      minute = 0;
      countMoves = 0;
      countSteps = [];
      localStorage.removeItem('countSteps');
    };

    // Если разрешено проигрываем звук клавиш
    if (!audio.classList.contains('audioStop')) audio.play();
  };

  // let cells = [];

  // Создаем поле
  function createAll() {
    const cellsDOM = document.querySelectorAll('.cell');
    cellsDOM.forEach(cell => cell.parentElement.removeChild(cell));

    // Создаем массив чилел
    const numbers = [...Array(countCells).keys()]
      .map(x => x + 1)

    for (let i = 0; i < numbers.length; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', `cell${i+1}`);
      cell.draggable = true;
      const value = numbers[i];
      cell.innerHTML = value;
      cell.style.backgroundImage = `url(assets/images/${fieldSize}/image_part_${i+1}.jpg)`;

      const left = i % fieldSize;
      const top = (i - left) / fieldSize;

      cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
      });

      cell.style.left = `${(left) * cellSize}%`;
      cell.style.top = `${top * cellSize}%`;

      field.append(cell);

      cell.addEventListener('click', () => {
        move(i);
      });

      if (i === numbers.length - 1) {
        cell.classList.add('empty');
        cell.innerHTML = '';
        cell.style.backgroundImage = ``;
      };
    };
    cells.forEach(cell => {
      cell.element.style.width = `${cellSize}%`
      cell.element.style.height = `${cellSize}%`
    });

    return cells
  };
  cells = createAll(fieldSize, cellSize, countCells)

  //Случайное перемешивание вначале игры на основе ходов клеткой
  function moveShuffle(index) {
    const cell = cells[index];
    let empty = cells[cells.length - 1];

    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (((leftDiff + topDiff) > 1) || index === countSteps[countSteps.length - 1]) {
      return
    };
    countSteps.push(index);
    localStorage.setItem('countSteps', JSON.stringify(countSteps));

    cell.element.style.left = `${empty.left * cellSize}%`;
    cell.element.style.top = `${empty.top * cellSize}%`;
    empty.element.style.left = `${cell.left * cellSize}%`;
    empty.element.style.top = `${cell.top * cellSize}%`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
  };

  // Количество шагов при перемешивании
  let amountShuffle = 200;
  if (fieldSize > 3) amountShuffle = 600;
  if (fieldSize > 4) amountShuffle = 1000;
  if (fieldSize > 5) amountShuffle = 2000;
  if (fieldSize > 6) amountShuffle = 3000;
  if (fieldSize > 7) amountShuffle = 5000;

  // Задаем случайные шаги для перемешивания
  function shuffle() {
    for (let i = 1; i < amountShuffle; i++) {
      moveShuffle(Math.abs(Math.floor(Math.random() * cells.length - 1)))
    };
    countMoves = 0;
  };

  // Перемешиваем поле после загрузки
  setTimeout(() => {
    shuffle();
  }, 500);

  // Обновление игры при клике
  btnNewGame.addEventListener('click', () => {
    // console.log(cells)
    shuffle();
    if (permitStartTimer) {
      timer()
    } else {
      minute = 0;
      second = 0;
      time.innerHTML = `${addZero(minute)}<span>:</span>${addZero(second)}`;
    };
    progress.innerHTML = `Moves: 0`;
  });

  // Создаем таймер времени
  let second = 0;
  let minute = 0;

  function timer() {
    permitStartTimer = false;
    second++;
    if (second === 60) {
      second = 0;
      minute++;
    };
    time.innerHTML = `${addZero(minute)}<span>:</span>${addZero(second)}`;
    setTimeout(timer, 1000);
  };

  // Добавление нуля в значения времени до 10
  function addZero(n) {
    return (n < 10 ? '0' + n : n)
  };

  // Сохранение данных для продолжения сохраненной игры
  function setData() {
    localStorage.setItem('countMoves', countMoves);
    localStorage.setItem('cells', JSON.stringify(cells));
    localStorage.setItem('minute', minute);
    localStorage.setItem('second', second);
  };

  // Получение данных для продолжения сохраненной игры
  function getData(e) {
    if (localStorage.getItem('countMoves') !== null) {
      countMoves = localStorage.getItem('countMoves');
      progress.innerHTML = `Moves: ${countMoves}`;
    }
    if (localStorage.getItem('cells') !== null) {
      let cellsNew = JSON.parse(localStorage.getItem('cells'));

      if (cells.length === cellsNew.length) {
        for (let i = 0; i < cells.length; i++) {
          cells[i].element.style.left = `${cellsNew[i].left * cellSize}%`;
          cells[i].element.style.top = `${cellsNew[i].top * cellSize}%`;
          cells[i].left = cellsNew[i].left;
          cells[i].top = cellsNew[i].top;
        };
      };
    } else {
      return
    };

    // Возвращаем значение времени при вызове сохраненной игры
    if (localStorage.getItem('second') !== null) {
      minute = localStorage.getItem('minute');
      second = localStorage.getItem('second');
      time.innerHTML = `${addZero(minute)}<span>:</span>${addZero(second)}`;
      if (permitStartTimer) timer();
    };
  };

  btnSaveGame.addEventListener('click', setData);
  btnContinueGame.addEventListener('click', getData);


  // Реализуем передаскивание ячеек мышкой
  const dragAndDrop = () => {
    // Забираем элементы поля для навешивания им событий
    const cells = document.querySelectorAll('.cell');
    const cellEmpty = document.querySelector('.empty');
    // Объявляем переменную для передачи в нее значения элемента который будет принят пустой ячейкой
    let index = '';

    // Создаем функции для соответствующих событий
    const dragStart = function (e) {
      index = e.target.innerHTML - 1;
      setTimeout(() => {
        // Прячем элемент в ячейке из которой его забираем
        this.classList.add('hidden');
      }, 0);
    };

    const dragEnd = function (e) {
      this.classList.remove('hidden');
    };

    const dragOver = function (evt) {
      evt.preventDefault();
    };

    // Добавим фон при попадании на пустую ячейку
    const dragEnter = function (evt) {
      evt.preventDefault();
      this.classList.add('hovered');
    };

    const dragLeave = function () {
      this.classList.remove('hovered');
    };

    const dragDrop = function (e) {
      // this.append();
      this.classList.remove('hovered');
      move(index)
    };
    cellEmpty.addEventListener('dragover', dragOver);
    cellEmpty.addEventListener('dragenter', dragEnter);
    cellEmpty.addEventListener('dragleave', dragLeave);
    cellEmpty.addEventListener('drop', dragDrop);

    cells.forEach(cell => {
      // console.log(cell)
      cell.addEventListener('dragstart', dragStart);
      cell.addEventListener('dragend', dragEnd);
    })

  };

  dragAndDrop();

  // console.log(cells);
  // Возвращем необходимые переменные для их дальнейшего использования
  return {
    fieldSize: fieldSize,
    cellSize: cellSize,
    countCells: countCells,
    empty: empty,
    addZero: addZero,
    // move: move,
  }
};

const objData = size();
// Получим переменные из объекта 
const {
  // fieldSize,
  // cellSize,
  // countCells,
  // empty,
  addZero,
  // move,
} = objData;

// completeGame()

import completeGame from './complete';
import * as createListTop10 from './modalTop_10';
completeGame();
const listTop10 = createListTop10.createListTop10(addZero,time);
// console.log('calc:', completeGame);
// console.log('calc:', top10);