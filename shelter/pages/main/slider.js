let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
   currentItem = (n + items.length) % items.length; // позволяет прокручивать эементы заново после последнего
   // currentItem = n
}

function hideItem(direction) {
   renderShuffle()
   isEnabled = false;
   items[currentItem].classList.add(direction);
   items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('active', direction)
   })
}

function showItem(direction) {
   // renderShuffle()
   items[currentItem].classList.add('next', direction);
   items[currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction)
      this.classList.add('active')
      isEnabled = true;
   })
}


function previousItem(n) {
   hideItem('to-right');
   changeCurrentItem(n - 1);
   showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function (e) {
   if (isEnabled) {
      // renderShuffle()
      previousItem(currentItem)
   }
})

function nextItem(n) {
   hideItem('to-left');
   changeCurrentItem(n + 1);
   showItem('from-right');
}

document.querySelector('.control.right').addEventListener('click', function (e) {
   if (isEnabled) {
      // renderShuffle()
      nextItem(currentItem)
   }
});


const swipedetect = (el) => {
   let surface = el;
   let startX = 0;
   let startY = 0;
   let distX = 0;
   let distY = 0;

   let startTime = 0;
   let elapsedTime = 0;

   let threshold = 150; // дистанция  ограничили движение по X
   let restraint = 100; // ограничили движение по Y
   let allowedTime = 300; // ограничили движение по времени

   surface.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
   })

   surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime >= allowedTime) {
         if ((Math.abs(distX) >= threshold) && (Math.abs(distY) <= restraint)) {
            if (distX > 0) {
               if (isEnabled) {
                  previousItem(currentItem)
               }
            } else {
               if (isEnabled) {
                  nextItem(currentItem)
               }
            }
         }
      }

      e.preventDefault();
   })



   surface.addEventListener('touchstart', function (e) {
      if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
         if (e.target.classList.contains('left')) {
            if (isEnabled) {
               previousItem(currentItem)
            }
         } else if (e.target.classList.contains('right')) {
            if (isEnabled) {
               nextItem(currentItem)
            }
         }
      }
      let touchObj = e.changedTouches[0]
      // console.log(e.changedTouches[0])
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
   })

   surface.addEventListener('touchmmove', function (e) {
      e.preventDefault(); // чтобы не сползала страница при косании
   })

   surface.addEventListener('touchend', function (e) {
      let touchObj = e.changedTouches[0]
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime >= allowedTime) {
         if ((Math.abs(distX) >= threshold) && (Math.abs(distY) <= restraint)) {
            if (distX > 0) {
               if (isEnabled) {
                  previousItem(currentItem)
                  modal.close()

               }
            } else {
               if (isEnabled) {
                  nextItem(currentItem)
                  modal.close()

               }
            }
         }
      }

      e.preventDefault();
   })
}

let el = document.querySelector('.carousel');

swipedetect(el)