export default function completeGame() {
   // Собираем пятнашки при клике на кнопку
   const btnSolution = document.querySelector('[data-game="solution"]');
   btnSolution.addEventListener('click', solution);

   // Задаем тайммаут для отображения поочередного перемещения ячеек
   let timeout = 100;
   // let cells = JSON.parse(localStorage.getItem('moveCells'));

   // Бокируем кнопку при выполнении автосборки пазла
   let btnPermit = true;

   // Функция, которая передает событие клик необходимой ячейке для ее перемещения
   function solution() {
      if (btnPermit === false) return;
      btnPermit = false;
      let cellsElem = document.querySelectorAll('.cell');
      // Делаем массив из полученных элементов
      cellsElem = [...cellsElem];
      const cells = JSON.parse(localStorage.getItem('countSteps'));
      // console.log(cells);
      if (cells === null) return;
      cells.reverse().forEach(step => {
         setTimeout(() => {
            // move(step)
            const cell = cellsElem.find(elem => elem.classList.contains(`cell${step + 1}`));
            cell.click()
         }, timeout += 100);
      });
      // Возвращаем тайммаут в изходное значение для повторных вызовов
      setTimeout(() => {
         btnPermit = true;
      }, timeout);
      timeout = 100;
   };
}
// completeGame();

// export {
//    completeGame
// }