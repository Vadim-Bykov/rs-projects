import {
   geoData,
   flags
} from './data.js';

// Crate a map
export default async function createMap() {
   try {
      //  Connect to mapbox
      const map_token = 'pk.eyJ1IjoiYnZudGFldjE5ODEiLCJhIjoiY2tpZnpqc25xMWcxNjJxbzVrOWMzbm0yaCJ9.zDjD9YJCuBVdNztRYdZTUA';
      mapboxgl.accessToken = map_token;

      const map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/light-v10',
         zoom: 1.5,
         center: [0, 20]
      });

      // Create a request
      const response = await fetch('https://api.covid19api.com/summary');
      const data = await response.json();
      const countries = data.Countries;
      const globalData = data.Global;

      // Add additional items
      globalData.pop = 7827000000;
      globalData.TotalConfirmed_100 = (globalData.TotalConfirmed * 100000 / globalData.pop).toFixed(2);
      globalData.TotalRecovered_100 = (globalData.TotalRecovered * 100000 / globalData.pop).toFixed(2);
      globalData.TotalDeaths_100 = (globalData.TotalDeaths * 100000 / globalData.pop).toFixed(2);
      globalData.NewConfirmed_100 = (globalData.NewConfirmed * 100000 / globalData.pop).toFixed(2);
      globalData.NewRecovered_100 = (globalData.NewRecovered * 100000 / globalData.pop).toFixed(2);
      globalData.NewDeaths_100 = (globalData.NewDeaths * 100000 / globalData.pop).toFixed(2);


      const arr = [];
      // Add additional items into the array 
      function addAdditionalItems() {
         countries.forEach((country) => {
            const accordantCountry = geoData.find(el => el.country === country.CountryCode);
            if (accordantCountry) {
               // add coordinates and additional items
               country.longitude = accordantCountry.longitude;
               country.latitude = accordantCountry.latitude;
               country.pop = accordantCountry.pop;
               country.TotalConfirmed_100 = (country.TotalConfirmed * 100000 / country.pop).toFixed(2);
               country.TotalRecovered_100 = (country.TotalRecovered * 100000 / country.pop).toFixed(2);
               country.TotalDeaths_100 = (country.TotalDeaths * 100000 / country.pop).toFixed(2);
               country.NewConfirmed_100 = (country.NewConfirmed * 100000 / country.pop).toFixed(2);
               country.NewRecovered_100 = (country.NewRecovered * 100000 / country.pop).toFixed(2);
               country.NewDeaths_100 = (country.NewDeaths * 100000 / country.pop).toFixed(2);
               arr.push(country);
            }
         });
      };
      addAdditionalItems();

      // add Flags
      const arrWithFlags = [];
      arr.map((element) => {
         const flag = flags.find(country => country.name == element.Country);
         if (flag) {
            element.flag = flag.flag;
            arrWithFlags.push(element);
         }
      });

      // add markers to the map legend
      const btnMap = document.querySelector('.btn-map');
      const legendItem_1 = document.querySelector('.item-1');
      const legendItem_2 = document.querySelector('.item-2');
      const legendItem_3 = document.querySelector('.item-3');
      const legendItem_4 = document.querySelector('.item-4');
      const btnList = document.querySelector('.btn-list');

      btnMap.addEventListener('click', () => {
         setMarkers();
         // sync data and markers in the list of the country 
         if (btnList.classList.contains('inactive')) {
            btnList.classList.remove('inactive');
         } else {
            btnMap.classList.add('inactive');
            btnList.click();
         }
      });

      let indicatorMark = 0;

      function setMarkers() {
         if (indicatorMark === 12) indicatorMark = 0;

         const arrTextContent = ['Total confirmed', 'Total recovered', 'Total deaths', 'New confirmed', 'New recovered', 'New deaths', 'Total confirmed per 100.000', 'Total recovered per 100.000', 'Total deaths per 100.000', 'New confirmed per 100.000', 'New recovered per 100.000', 'New deaths per 100.000'];
         const colors = ['white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336', 'white', ' #009688', ' #f44336'];

         // Change button's color and text
         btnMap.textContent = arrTextContent[indicatorMark];
         btnMap.style.background = colors[indicatorMark];

         // Set different colors to markers
         if (indicatorMark === 0 || indicatorMark === 6) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 0 ? country.TotalConfirmed : country.TotalConfirmed_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.TotalConfirmed, 1, 'black')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               // Change data on the page after click a country on the map
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }
         if (indicatorMark === 1 || indicatorMark === 7) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 1 ? country.TotalRecovered : country.TotalRecovered_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.TotalRecovered, 0.7, 'green')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               setLegendColor(0.7);
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }
         if (indicatorMark === 2 || indicatorMark === 8) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 2 ? country.TotalDeaths : country.TotalDeaths_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.TotalDeaths, 0.05, 'red')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               setLegendColor(0.05);
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }
         if (indicatorMark === 3 || indicatorMark === 9) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 3 ? country.NewConfirmed : country.NewConfirmed_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.NewConfirmed, 0.05, 'black')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               setLegendColor(0.05);
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }
         if (indicatorMark === 4 || indicatorMark === 10) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 4 ? country.NewRecovered : country.NewRecovered_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.NewRecovered, 0.03, 'green')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               setLegendColor(0.03);
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }
         if (indicatorMark === 5 || indicatorMark === 11) {
            arrWithFlags.forEach((country) => {
               const popup = new mapboxgl.Popup({
                     offset: 25
                  })
                  .setText(`${country.Country}: ${indicatorMark === 5 ? country.NewDeaths : country.NewDeaths_100}`);
               let marker = new mapboxgl.Marker({
                  color: getColorFromCount(country.NewDeaths, 0.002, 'red')
               }).setLngLat([country.longitude, country.latitude]);
               // get the marker element;
               const element = marker.getElement();
               element.id = 'marker';
               // hover event listener
               element.addEventListener('mouseenter', () => popup.addTo(map));
               element.addEventListener('mouseleave', () => popup.remove());
               // add popup to marker
               marker.setPopup(popup);
               // add marker to map
               marker.addTo(map);
               setLegendColor(1);
               setLegendColor(0.002);
               element.addEventListener('click', () => {
                  const chooseCountry = document.querySelector(`[data-country-code="${country.CountryCode}"]`);
                     chooseCountry.click()
               });
            });
         }

         indicatorMark += 1;
      };
      setMarkers();

      function setLegendColor(ratio) {
         if (indicatorMark === 12) indicatorMark = 0;

         const rate_1 = 1000000 * ratio;
         const rate_2 = 100000 * ratio;
         const rate_3 = 10000 * ratio;
         const rate_4 = 10000 * ratio;

         const colorsBlack = ['black', 'rgb(44, 42, 42)', 'rgb(99, 95, 95)', 'rgb(192, 189, 189)'];
         const colorsGreen = ['green', 'rgb(54, 179, 54)', 'rgb(109, 189, 109)', 'rgb(174, 214, 174)'];
         const colorsRed = ['red', 'rgb(243, 77, 77)', 'rgb(248, 133, 133)', 'rgb(247, 217, 217)'];

         if (indicatorMark === 0 || indicatorMark === 3 || indicatorMark === 6 || indicatorMark === 9) {
            legendItem_1.textContent = `≥ ${rate_1}`;
            legendItem_2.textContent = `≥ ${rate_2}`;
            legendItem_3.textContent = `≥ ${rate_3}`;
            legendItem_4.textContent = `< ${rate_4}`;
            legendItem_1.style.background = colorsBlack[0];
            legendItem_2.style.background = colorsBlack[1];
            legendItem_3.style.background = colorsBlack[2];
            legendItem_4.style.background = colorsBlack[3];
         }

         if (indicatorMark === 1 || indicatorMark === 4 || indicatorMark === 7 || indicatorMark === 10) {
            legendItem_1.textContent = `≥ ${rate_1}`;
            legendItem_2.textContent = `≥ ${rate_2}`;
            legendItem_3.textContent = `≥ ${rate_3}`;
            legendItem_4.textContent = `< ${rate_4}`;
            legendItem_1.style.background = colorsGreen[0];
            legendItem_2.style.background = colorsGreen[1];
            legendItem_3.style.background = colorsGreen[2];
            legendItem_4.style.background = colorsGreen[3];
         }

         if (indicatorMark === 2 || indicatorMark === 5 || indicatorMark === 8 || indicatorMark === 11) {
            legendItem_1.textContent = `≥ ${rate_1}`;
            legendItem_2.textContent = `≥ ${rate_2}`;
            legendItem_3.textContent = `≥ ${rate_3}`;
            legendItem_4.textContent = `< ${rate_4}`;
            legendItem_1.style.background = colorsRed[0];
            legendItem_2.style.background = colorsRed[1];
            legendItem_3.style.background = colorsRed[2];
            legendItem_4.style.background = colorsRed[3];
         }

      }

      // Change color of markers
      function getColorFromCount(amount, ratio, typeColor) {
         const rate = amount / ratio;
         if (rate >= 1000000) {
            if (typeColor === 'black') return "black";
            if (typeColor === 'green') return "green";
            if (typeColor === 'red') return "red";
         }
         if (rate >= 100000) {
            if (typeColor === 'black') return "rgb(44, 42, 42)";
            if (typeColor === 'green') return "rgb(54, 179, 54)";
            if (typeColor === 'red') return "rgb(243, 77, 77)";
         }
         if (rate >= 10000) {
            if (typeColor === 'black') return "rgb(99, 95, 95)";
            if (typeColor === 'green') return "rgb(109, 189, 109)";
            if (typeColor === 'red') return "rgb(248, 133, 133)";
         }
         if (rate < 10000) {
            if (typeColor === 'black') return "rgb(192, 189, 189)";
            if (typeColor === 'green') return "rgb(174, 214, 174)";
            if (typeColor === 'red') return "rgb(247, 217, 217)";
         }
      };

      return {
         data: data,
         globalData: globalData,
         arrWithFlags: arrWithFlags
      };
   } catch (error) {
      alert('"Caching in progress". Please, try later.');
      console.log('"Caching in progress". Please, try later.');
   }

};