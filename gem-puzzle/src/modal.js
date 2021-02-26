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

   if (localStorage.getItem('results') !== null) {
      // console.log(JSON.parse(localStorage.getItem('results')))
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
      },
      // setContent(content) {
      //   $modalWindow.querySelector('[data-content]').innerHTML = content;
      // }
   }

   function listener(event) {
      if (event.target.dataset.close) {
         actions.close()
      }
   };
   $modalWindow.addEventListener('click', listener)

   return actions
}

const modal = modalActions()
// modal.open();