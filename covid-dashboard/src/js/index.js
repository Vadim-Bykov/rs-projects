import '../css/style.css'
import {
   createTable
} from './table.js';

import {
   Keyboard
} from './keyboard.js'


// Create a country list 
async function createCountryList() {
   const countryList = document.querySelector('.country-list');
   const btnList = document.querySelector('.btn-list');
   const btnMap = document.querySelector('.btn-map');

   // Sort country List by different items
   btnList.addEventListener('click', () => {
      changeItemCountryList();
      addListenerToCountryList();
      // sync data and markers in the map
      if (btnMap.classList.contains('inactive')) {
         btnMap.classList.remove('inactive');
      } else {
         btnList.classList.add('inactive');
         btnMap.click();
      }
   });

   // Get necessary data from module
   const table = await createTable();
   const {
      fillDataAsideRight,
      changeDataAsideRight,
      arrWithFlags,
      updateCart,
      // changeChartData
   } = table;


   let indicate = 1;

   // Show necessary items for countries and hide others
   function changeItemCountryList() {
      if (indicate === 12) indicate = 0;

      const arr = ['Total confirmed', 'Total recovered', 'Total deaths', 'New confirmed', 'New recovered', 'New deaths', 'Total confirmed per 100.000', 'Total recovered per 100.000', 'Total deaths per 100.000', 'New confirmed per 100.000', 'New recovered per 100.000', 'New deaths per 100.000'];
      const colors = ['white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336'];

      btnList.style.background = colors[indicate];
      btnList.textContent = arr[indicate];

      if (indicate === 0) {
         arrWithFlags.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.case.all');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 1) {
         arrWithFlags.sort((prev, next) => next.TotalRecovered - prev.TotalRecovered);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.recovered.all');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 2) {
         arrWithFlags.sort((prev, next) => next.TotalDeaths - prev.TotalDeaths);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.deaths.all');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 3) {
         arrWithFlags.sort((prev, next) => next.NewConfirmed - prev.NewConfirmed);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.case.new');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 4) {
         arrWithFlags.sort((prev, next) => next.NewRecovered - prev.NewRecovered);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.recovered.new');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 5) {
         arrWithFlags.sort((prev, next) => next.NewDeaths - prev.NewDeaths);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.deaths.new');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 6) {
         arrWithFlags.sort((prev, next) => next.TotalConfirmed_100 - prev.TotalConfirmed_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.case.total-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 7) {
         arrWithFlags.sort((prev, next) => next.TotalRecovered_100 - prev.TotalRecovered_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.recovered.total-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 8) {
         arrWithFlags.sort((prev, next) => next.TotalDeaths_100 - prev.TotalDeaths_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.deaths.total-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 9) {
         arrWithFlags.sort((prev, next) => next.NewConfirmed_100 - prev.NewConfirmed_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.case.new-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 10) {
         arrWithFlags.sort((prev, next) => next.NewRecovered_100 - prev.NewRecovered_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.recovered.new-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      if (indicate === 11) {
         arrWithFlags.sort((prev, next) => next.NewDeaths_100 - prev.NewDeaths_100);
         fillCountryList(arr[indicate]);
         const activeItems = document.querySelectorAll('.active-left');
         activeItems.forEach((item) => item.classList.remove('active-left'));
         const caseAllItems = document.querySelectorAll('.deaths.new-100');
         caseAllItems.forEach((item) => item.classList.add('active-left'));
      }
      indicate += 1;
      clearInputAndGetBackCountryList();
   };


   // Fill in the list with content
   function fillCountryList(itemSort) {
      countryList.innerHTML = '';
      //Sort array  
      if (!itemSort) {
         arrWithFlags.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed);
      }

      // console.log(arrWithFlags);
      const fragment = document.createDocumentFragment();
      arrWithFlags.forEach((item) => {
         const country = document.createElement('div');
         country.classList.add('country-item');
         country.dataset.countryCode = `${item.CountryCode}`;
         country.dataset.country = `${item.Country.split('').filter(e => e !== e.match(/\s',/)).join('')}`;
         country.innerHTML = `
         <p class="country-cases all case active-left" data-country="${item.Country}">${item.TotalConfirmed}</p>
         <p class="country-cases all recovered" data-country="${item.Country}">${item.TotalRecovered}</p>
         <p class="country-cases all deaths" data-country="${item.Country}">${item.TotalDeaths}</p>
         
         <p class="country-cases new case" data-country="${item.Country}">${item.NewConfirmed}</p>
         <p class="country-cases new recovered" data-country="${item.Country}">${item.NewRecovered}</p>
         <p class="country-cases new deaths" data-country="${item.Country}">${item.NewDeaths}</p>
         
         <p class="country-cases total-100 case" data-country="${item.Country}">${item.TotalConfirmed_100}</p>
         <p class="country-cases total-100 recovered" data-country="${item.Country}">${item.TotalRecovered_100}</p>            
         <p class="country-cases total-100 deaths" data-country="${item.Country}">${item.TotalDeaths_100}</p>
         
         <p class="country-cases new-100 case" data-country="${item.Country}">${item.NewConfirmed_100}</p>
         <p class="country-cases new-100 recovered" data-country="${item.Country}">${item.NewRecovered_100}</p>
         <p class="country-cases new-100 deaths" data-country="${item.Country}">${item.NewDeaths_100}</p>
         
         <p class="country-name" data-country="${item.Country}">${item.Country}</p>

         <img class="flag" data-country="${item.Country}" src="${item.flag}" alt="flag">
         `
         fragment.appendChild(country);
      });
      countryList.appendChild(fragment);
   };
   fillCountryList();

   const input = document.getElementById('search-input');

   // Choose country and change information
   // const asideLeft = document.querySelector('.aside-left');
   // const countriesFromList = document.querySelectorAll('.country-item');
   function addListenerToCountryList() {
      const asideLeft = document.querySelector('.aside-left');
      const countriesFromList = document.querySelectorAll('.country-item');
      countriesFromList.forEach((item) => {
         item.addEventListener('click', (e) => {
            // if asideLeft opened full screen
            if (asideLeft.classList.contains('open')) {
               const openBlockElement = document.querySelector('.open-block');
               openBlockElement.click()
            };
            const countryClicked = e.target.dataset.country;
            const country = arrWithFlags.find((c) => c.Country === countryClicked);
            fillDataAsideRight(country);
            updateCart(country);
            changeDataAsideRight('start');
            clearInputAndGetBackCountryList();

         });
      });
   };
   addListenerToCountryList();


   // Search countries after enter text into the input
   input.addEventListener("input", enterText);

   function enterText(e) {
      e.preventDefault();
      let value = input.value.toUpperCase();
      const countriesFromList = document.querySelectorAll('.country-item');
      countriesFromList.forEach(country => {
         const appropriateCountry = country.dataset.country.toUpperCase().startsWith(value);
         if (appropriateCountry) {
            document.querySelector(`[data-country="${country.dataset.country}"]`).classList.remove('hide');
         } else {
            document.querySelector(`[data-country="${country.dataset.country}"]`).classList.add('hide');
         }
      });
   };

   // Clear input after finding country
   function clearInputAndGetBackCountryList() {
      input.value = '';
      const hiddenCountries = document.querySelectorAll('.hide');
      hiddenCountries.forEach((country) => country.classList.remove('hide'));
   };

   // Open every block on the full screen
   const openBlockElements = document.querySelectorAll('.open-block');
   openBlockElements.forEach((element) => {
      element.addEventListener('click', (e) => {
         openBlockElements.forEach((block) => block.parentElement.classList.toggle('hide'))
         e.target.parentElement.classList.remove('hide');
         e.target.parentElement.classList.toggle('open');
      })
   });

}
createCountryList();