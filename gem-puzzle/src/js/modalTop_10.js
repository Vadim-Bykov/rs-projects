function createListTop10(addZero,time) {
  // Создаем модальное окно со списком ТОП-10 реультатов
  const btnBestResults = document.querySelector('[data-game="best_results"]');

  btnBestResults.addEventListener('click', () => {
    modal.open();
  });

  // Сохранение лучших результатов
  let results = [];

  // Функция, которая вызывается при каждом удачном завершении игры
  function setBestResults(countMoves) {
    // Забираем список завершенных результатов
    if (localStorage.getItem('results') !== null) {
      results = JSON.parse(localStorage.getItem('results'))
    };
    // Создадим объект, в который помещаем параметры результа
    const result = {
      date: `${addZero(new Date().getHours())}:${addZero(new Date().getMinutes())} ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
      countMoves: countMoves,
      time: time.textContent,
    };
    // Помещаем результат в массив и оставляем 10 лучших
    results.push(result);
    results.sort((prevRes, nextRes) => prevRes.countMoves - nextRes.countMoves).splice(10, 10);
    // Передаем массив в localStorage
    localStorage.setItem('results', JSON.stringify(results));

    return results
  };

  // Создаем модальное окно
  function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
     <div class="modal-overlay" data-close = true>
       <div class="modal-window">
         <div class="modal-header">
           <span class="modal-title">Best results list</span>
           <span class="modal-close" data-close = true>&times;</span>
         </div>
         <div class="modal-body">
           <div class="list-title">
             <p class="item">Date</p>
             <p class="item">Number of moves</p>
             <p class="item">Time</p>
           </div>
           <div class="list">
           
           </div>
         </div>
       </div>
     </div>
   `);
    document.body.appendChild(modal);

    // Забираем массив ТОП-10 и прописываем их в модальном окне
    if (localStorage.getItem('results') !== null) {
      results = JSON.parse(localStorage.getItem('results'));
      const list = document.querySelector('.list');
      results.forEach(res => {
        const item = document.createElement('div');
        item.classList.add('list-item');
        item.innerHTML = `
         <p class="item">${res.date}</p>
         <p class="item">${res.countMoves}</p>
         <p class="item">${res.time}</p>
       `;
        list.appendChild(item);
      });
    };


    return modal
  };
  // console.log(createModal());

  // Функция открытия и закрытия модального окна
  function modalActions() {
    const $modalWindow = createModal();
    let closing = false; //защита при закрывании не вызвать open
    const body = document.querySelector('body');
    const actions = {
      open() {
        !closing && $modalWindow.classList.add('open');
        body.classList.add('lock');

      },
      close() {
        closing = true
        $modalWindow.classList.remove('open');
        body.classList.remove('lock');
        $modalWindow.classList.add('hide');
        setTimeout(() => { // делаем чтобы окно прятолось
          $modalWindow.classList.remove('hide');
          closing = false
        }, 300);
      }
    };

    function listener(event) {
      if (event.target.dataset.close) {
        actions.close()
      }
    };
    $modalWindow.addEventListener('click', listener);

    return actions
  };

  const modal = modalActions();
  return {
    setBestResults: setBestResults,
    modalActions: modalActions
  }
};
// const listTop10 = createListTop10();

export {
  createListTop10
}