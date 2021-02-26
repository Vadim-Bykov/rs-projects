// console.log(window.onresize)

window.addEventListener('resize', function (event) {
   // do stuff here
   const pets = [{
         "name": "Katrine",
         "img": "../../assets/images/pets-katrine_new.png",
         "type": "Cat",
         "breed": "British Shorthair",
         "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
         "age": "6 months",
         "inoculations": ["panleukopenia"],
         "diseases": ["none"],
         "parasites": ["none"]
      },
      {
         "name": "Jennifer",
         "img": "../../assets/images/pets-jennifer_new.png",
         "type": "Dog",
         "breed": "Labrador",
         "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
         "age": "2 months",
         "inoculations": ["none"],
         "diseases": ["none"],
         "parasites": ["none"]
      },
      {
         "name": "Woody",
         "img": "../../assets/images/pets-woody_new.png",
         "type": "Dog",
         "breed": "Golden Retriever",
         "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
         "age": "3 years 6 months",
         "inoculations": ["adenovirus", "distemper"],
         "diseases": ["right back leg mobility reduced"],
         "parasites": ["none"]
      },
      {
         "name": "Sophia",
         "img": "../../assets/images/pets-sophia.png",
         "type": "Dog",
         "breed": "Shih tzu",
         "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
         "age": "1 month",
         "inoculations": ["parvovirus"],
         "diseases": ["none"],
         "parasites": ["none"]
      },
      {
         "name": "Timmy",
         "img": "../../assets/images/pets-timmy.png",
         "type": "Cat",
         "breed": "British Shorthair",
         "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
         "age": "2 years 3 months",
         "inoculations": ["calicivirus", "viral rhinotracheitis"],
         "diseases": ["kidney stones"],
         "parasites": ["none"]
      },
      {
         "name": "Charly",
         "img": "../../assets/images/pets-charly.png",
         "type": "Dog",
         "breed": "Jack Russell Terrier",
         "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
         "age": "8 years",
         "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
         "diseases": ["deafness", "blindness"],
         "parasites": ["lice", "fleas"]
      },
      {
         "name": "Scarlett",
         "img": "../../assets/images/pets-scarlet.png",
         "type": "Dog",
         "breed": "Jack Russell Terrier",
         "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
         "age": "3 months",
         "inoculations": ["parainfluenza"],
         "diseases": ["none"],
         "parasites": ["none"]
      },
      {
         "name": "Freddie",
         "img": "../../assets/images/pets-freddie.png",
         "type": "Cat",
         "breed": "British Shorthair",
         "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
         "age": "2 months",
         "inoculations": ["rabies"],
         "diseases": ["none"],
         "parasites": ["none"]
      }
   ];

   function createModal() {
      const modal = document.createElement('div');
      modal.classList.add('vmodal');
      modal.insertAdjacentHTML('afterbegin', `
         <div class="modal-overlay" data-close = true>
            <div class="modal-window" data-close = true>
               <div class="close-container" data-close = true>
                  <div class="modal-close" data-close = true>
                     <img src="../../assets/icon/Vector.png" alt="close" data-close = true>
                  </div>
               </div>
               <div class="modal-container" data-content>

               </div>
            </div>
         </div>
   `);
      document.body.appendChild(modal)
      return modal
   }

   function modalActions(options) {
      const ANIMATION_SPEED = 300
      const $modalWindow = createModal(options)
      let closing = false //защита при закрывании не вызвать open
      const body = document.querySelector('body');

      const actions = {
         open() {
            !closing && $modalWindow.classList.add('open')
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
            }, ANIMATION_SPEED);
         },
         setContent(content) {
            $modalWindow.querySelector('[data-content]').innerHTML = content;
         }
      }

      function listener(event) {
         if (event.target.dataset.close) {
            actions.close()
         }
      };
      $modalWindow.addEventListener('click', listener)

      return actions
   }

   const modal = modalActions();

   const toHtml = pets => `
   <div class="card ${pets.name}" data-btn="petInfo" data-name="${pets.name}">
      <img src="${pets.img}" alt="${pets.type}"  data-btn="petInfo" data-name="${pets.name}">
      <p  data-btn="petInfo" data-name="${pets.name}">${pets.name}</p>
      <button  data-btn="petInfo" data-name="${pets.name}">Learn more</button>
   </div>
`

   // function render() {
   //    const html = pets.map(pet => toHtml(pet)).join('')
   //    document.querySelector('.container').innerHTML = html
   // }
   // render();

   // function renderSlides(array) {
   //    let modArr = array.map(arr => arr.map(pet => toHtml(pet)).join(''))
   //    // console.log(modArr)
   //    document.querySelectorAll('.container').forEach((container, index) => container.innerHTML = modArr[index])
   // }

   // function renderModalWindow(event) {
   //    event.preventDefault();
   //    const id = event.target.dataset.name;
   //    if (id) {
   //       const pet = pets.find(pet => pet.name === id);
   //       // console.log(pet);
   //       modal.setContent(
   //          `<div class="modal-container">
   //       <img src="${pet.img}" class="modal-image"></img>
   //      <div class="modal-content">
   //         <div class="content-top">
   //            <h3>${pet.name}</h3>
   //            <p>${pet.type} - ${pet.breed}</p>
   //         </div>
   //         <div class="content-middle">
   //             <p>${pet.description}</p>
   //         </div>
   //         <ul class="content-bottom">
   //               <li class="item">
   //                  <span class="name-item">Age: </span>
   //                  <span>${pet.age}</span>
   //               </li>
   //               <li class="item">
   //                  <span class="name-item">Inoculations: </span>
   //                  <span>${pet.inoculations}</span>
   //               </li>
   //               <li class="item">
   //                  <span class="name-item">Diseases: </span>
   //                  <span>${pet.diseases}</span>
   //               </li>
   //               <li class="item">
   //                  <span class="name-item">Parasites: </span>
   //                  <span>${pet.parasites}</span>
   //               </li>
   //         </ul>
   //      </div>
   //   </div>`
   //       )

   //       modal.open()
   //    }

   // }
   // document.querySelectorAll('.container').forEach(container => container.addEventListener('click', renderModalWindow));





   const initialCountArrayPets = 6;
   let position = 0;
   const slidesToShow = 1;
   let slidesToScroll = 1;
   const container = document.querySelector('.slider-container');
   const track = document.querySelector('.slider-track');
   const items = document.querySelectorAll('.slider-item');
   // let itemsCount = items.length;
   let itemsCount;
   // console.log(window.innerWidth)
   if (window.innerWidth >= 1280) {
      itemsCount = 6;
   } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
      itemsCount = 8;
   } else if (window.innerWidth < 768) {
      itemsCount = 16;
   }

   const btnNext = document.querySelector('[data-btnNext]');
   const btnPrev = document.querySelector('[data-btnPrev]');
   const btnStart = document.querySelector('[data-btnStart]');
   const btnEnd = document.querySelector('[data-btnEnd]');
   let numberPage = document.querySelector('[data-numberPage]');

   const itemWidth = container.clientWidth / slidesToShow;
   const movePosition = slidesToScroll * itemWidth;
   items.forEach(item => item.style.minWidth = `${itemWidth}px`);


   btnNext.addEventListener('click', () => {
      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth; // чтобы не перепрыгнуть на пустую область
      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      // position -= movePosition;
      setPosition()
      checkBtn()
   });

   btnPrev.addEventListener('click', () => {
      const itemsLeft = Math.abs(position) / itemWidth;
      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      // position += movePosition;
      setPosition()
      checkBtn()
   });

   btnEnd.addEventListener('click', () => {
      let slidesToScroll = 16;
      const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth; // чтобы не перепрыгнуть на пустую область
      position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      // position -= movePosition;
      setPosition()
      checkBtn()
   });

   btnStart.addEventListener('click', () => {
      let slidesToScroll = 16;
      const itemsLeft = Math.abs(position) / itemWidth;
      position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
      // position += movePosition;
      setPosition()
      checkBtn()
   });

   const setPosition = () => {
      track.style.transform = `translateX(${position}px)`;
      numberPage.textContent = (Math.abs(position) / itemWidth) + 1
      // console.log((Math.abs(position)/itemWidth)+1)
   };

   setPosition();

   const checkBtn = () => {
      if (position === 0) {
         btnPrev.disabled = true;
         btnStart.disabled = true;
      } else {
         btnPrev.disabled = false;
         btnStart.disabled = false;
      }

      // if (position <= -(itemsCount - slidesToShow) * itemWidth) {
      //    btnNext.disabled = true;
      //    btnEnd.disabled = true;
      // } else {
      //    btnNext.disabled = false;
      //    btnEnd.disabled = false;
      // }

      if (Math.abs(position) === (itemsCount - 1) * itemWidth) {
         btnNext.disabled = true;
         btnEnd.disabled = true;
      } else {
         btnNext.disabled = false;
         btnEnd.disabled = false;
      }

      // btnPrev.disabled = position === 0;
      // btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
   }

   checkBtn()


   function shuffle(array) { // рандомно перемешивает массив
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;

         // And swap it with the current element.
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
      }

      return array;
   };


   let overallArray = [];

   if (window.innerWidth >= 1280) {
      for (let i = 0; i < initialCountArrayPets; i++) {
         if (i === 0) {
            overallArray.push(pets)
         } else {
            let clonePets = [...pets]
            overallArray.push(shuffle(clonePets))
         }
      }

      renderSlides(overallArray)

   } else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
      for (let i = 0; i < initialCountArrayPets; i++) {
         overallArray.push(pets)
      }
      overallArray = overallArray.flat(Infinity)
      // console.log(overallArray)

      let size = 6; //размер подмассива

      let resArray = []; //массив в который будет выведен результат.
      for (let i = 0; i < Math.ceil(overallArray.length / size); i++) {
         resArray[i] = overallArray.slice((i * size), (i * size) + size);
      }

      renderSlides(resArray)

   } else if (window.innerWidth < 768) {
      for (let i = 0; i < initialCountArrayPets; i++) {
         overallArray.push(pets)
      }
      overallArray = overallArray.flat(Infinity)

      let size = 3; //размер подмассива

      let resArray = []; //массив в который будет выведен результат.
      for (let i = 0; i < Math.ceil(overallArray.length / size); i++) {
         resArray[i] = overallArray.slice((i * size), (i * size) + size);
      }

      renderSlides(resArray)
   }


});
const pets = [{
      "name": "Katrine",
      "img": "../../assets/images/pets-katrine_new.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
   },
   {
      "name": "Jennifer",
      "img": "../../assets/images/pets-jennifer_new.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
   },
   {
      "name": "Woody",
      "img": "../../assets/images/pets-woody_new.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
   },
   {
      "name": "Sophia",
      "img": "../../assets/images/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
   },
   {
      "name": "Timmy",
      "img": "../../assets/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
   },
   {
      "name": "Charly",
      "img": "../../assets/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
   },
   {
      "name": "Scarlett",
      "img": "../../assets/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
   },
   {
      "name": "Freddie",
      "img": "../../assets/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
   }
];

function createModal() {
   const modal = document.createElement('div');
   modal.classList.add('vmodal');
   modal.insertAdjacentHTML('afterbegin', `
         <div class="modal-overlay" data-close = true>
            <div class="modal-window" data-close = true>
               <div class="close-container" data-close = true>
                  <div class="modal-close" data-close = true>
                     <img src="../../assets/icon/Vector.png" alt="close" data-close = true>
                  </div>
               </div>
               <div class="modal-container" data-content>

               </div>
            </div>
         </div>
   `);
   document.body.appendChild(modal)
   return modal
}

function modalActions(options) {
   const ANIMATION_SPEED = 300
   const $modalWindow = createModal(options)
   let closing = false //защита при закрывании не вызвать open
   const body = document.querySelector('body');

   const actions = {
      open() {
         !closing && $modalWindow.classList.add('open')
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
         }, ANIMATION_SPEED);
      },
      setContent(content) {
         $modalWindow.querySelector('[data-content]').innerHTML = content;
      }
   }

   function listener(event) {
      if (event.target.dataset.close) {
         actions.close()
      }
   };
   $modalWindow.addEventListener('click', listener)

   return actions
}

const modal = modalActions();

const toHtml = pets => `
   <div class="card ${pets.name}" data-btn="petInfo" data-name="${pets.name}">
      <img src="${pets.img}" alt="${pets.type}"  data-btn="petInfo" data-name="${pets.name}">
      <p  data-btn="petInfo" data-name="${pets.name}">${pets.name}</p>
      <button  data-btn="petInfo" data-name="${pets.name}">Learn more</button>
   </div>
`

// function render() {
//    const html = pets.map(pet => toHtml(pet)).join('')
//    document.querySelector('.container').innerHTML = html
// }
// render();

function renderSlides(array) {
   let modArr = array.map(arr => arr.map(pet => toHtml(pet)).join(''))
   // console.log(modArr)
   document.querySelectorAll('.container').forEach((container, index) => container.innerHTML = modArr[index])
}

function renderModalWindow(event) {
   event.preventDefault();
   const id = event.target.dataset.name;
   if (id) {
      const pet = pets.find(pet => pet.name === id);
      // console.log(pet);
      modal.setContent(
         `<div class="modal-container">
         <img src="${pet.img}" class="modal-image"></img>
        <div class="modal-content">
           <div class="content-top">
              <h3>${pet.name}</h3>
              <p>${pet.type} - ${pet.breed}</p>
           </div>
           <div class="content-middle">
               <p>${pet.description}</p>
           </div>
           <ul class="content-bottom">
                 <li class="item">
                    <span class="name-item">Age: </span>
                    <span>${pet.age}</span>
                 </li>
                 <li class="item">
                    <span class="name-item">Inoculations: </span>
                    <span>${pet.inoculations}</span>
                 </li>
                 <li class="item">
                    <span class="name-item">Diseases: </span>
                    <span>${pet.diseases}</span>
                 </li>
                 <li class="item">
                    <span class="name-item">Parasites: </span>
                    <span>${pet.parasites}</span>
                 </li>
           </ul>
        </div>
     </div>`
      )

      modal.open()
   }

}
document.querySelectorAll('.container').forEach(container => container.addEventListener('click', renderModalWindow));





const initialCountArrayPets = 6;
let position = 0;
const slidesToShow = 1;
let slidesToScroll = 1;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
// let itemsCount = items.length;
let itemsCount;
// console.log(window.innerWidth)
if (window.innerWidth >= 1280) {
   itemsCount = 6;
} else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
   itemsCount = 8;
} else if (window.innerWidth < 768) {
   itemsCount = 16;
}

const btnNext = document.querySelector('[data-btnNext]');
const btnPrev = document.querySelector('[data-btnPrev]');
const btnStart = document.querySelector('[data-btnStart]');
const btnEnd = document.querySelector('[data-btnEnd]');
let numberPage = document.querySelector('[data-numberPage]');

const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
items.forEach(item => item.style.minWidth = `${itemWidth}px`);


btnNext.addEventListener('click', () => {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth; // чтобы не перепрыгнуть на пустую область
   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   // position -= movePosition;
   setPosition()
   checkBtn()
});

btnPrev.addEventListener('click', () => {
   const itemsLeft = Math.abs(position) / itemWidth;
   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   // position += movePosition;
   setPosition()
   checkBtn()
});

btnEnd.addEventListener('click', () => {
   let slidesToScroll = 16;
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth; // чтобы не перепрыгнуть на пустую область
   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   // position -= movePosition;
   setPosition()
   checkBtn()
});

btnStart.addEventListener('click', () => {
   let slidesToScroll = 16;
   const itemsLeft = Math.abs(position) / itemWidth;
   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
   // position += movePosition;
   setPosition()
   checkBtn()
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
   numberPage.textContent = (Math.abs(position) / itemWidth) + 1
   // console.log((Math.abs(position)/itemWidth)+1)
};

setPosition();

const checkBtn = () => {
   if (position === 0) {
      btnPrev.disabled = true;
      btnStart.disabled = true;
   } else {
      btnPrev.disabled = false;
      btnStart.disabled = false;
   }

   // if (position <= -(itemsCount - slidesToShow) * itemWidth) {
   //    btnNext.disabled = true;
   //    btnEnd.disabled = true;
   // } else {
   //    btnNext.disabled = false;
   //    btnEnd.disabled = false;
   // }

   if (Math.abs(position) === (itemsCount - 1) * itemWidth) {
      btnNext.disabled = true;
      btnEnd.disabled = true;
   } else {
      btnNext.disabled = false;
      btnEnd.disabled = false;
   }

   // btnPrev.disabled = position === 0;
   // btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

checkBtn()


function shuffle(array) { // рандомно перемешивает массив
   let currentIndex = array.length;
   let temporaryValue;
   let randomIndex;
   // While there remain elements to shuffle...
   while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
};


let overallArray = [];

if (window.innerWidth >= 1280) {
   for (let i = 0; i < initialCountArrayPets; i++) {
      // if (i === 0) {
      // overallArray.push(pets)
      // } else {
      let clonePets = [...pets]
      overallArray.push(shuffle(clonePets))
      // }
   }

   renderSlides(overallArray)

} else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
   for (let i = 0; i < initialCountArrayPets; i++) {
      overallArray.push(pets)
   }
   overallArray = overallArray.flat(Infinity)
   // console.log(overallArray)

   let size = 6; //размер подмассива

   let resArray = []; //массив в который будет выведен результат.
   for (let i = 0; i < Math.ceil(overallArray.length / size); i++) {
      tempArr = overallArray.slice((i * size), (i * size) + size);
      resArray[i] = shuffle(tempArr);
   }

   renderSlides(resArray)

} else if (window.innerWidth < 768) {
   for (let i = 0; i < initialCountArrayPets; i++) {
      overallArray.push(pets)
   }
   overallArray = overallArray.flat(Infinity)

   let size = 3; //размер подмассива

   let resArray = []; //массив в который будет выведен результат.
   for (let i = 0; i < Math.ceil(overallArray.length / size); i++) {
      tempArr = overallArray.slice((i * size), (i * size) + size);
      resArray[i] = shuffle(tempArr);
   }

   renderSlides(resArray)
}



// renderSlides()