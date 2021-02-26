import createMap from './map.js';

// Create a sidebar with a table
export async function createTable() {
   const countryTitle = document.querySelector('.name');
   const asideWithData = document.querySelector('.data');
   const btnChart = document.querySelector('.btn-chart');

   try {
      const fullData = await createMap();
      const {
         data,
         globalData,
         arrWithFlags
      } = fullData;

      const mainDate = (data.Date).slice(0, 10);
      const time = (data.Date).slice(11, 19);
      document.querySelector('.date').textContent = `Date: ${mainDate} ${time}`;

      // Change data in the table
      let ind = 1;

      function changeDataAsideRight(start) {
         if (start === 'start') ind = 0;
         if (ind === 4) ind = 0;

         const arr = ['Total data', 'Last day data', 'Total data per 100.000', 'Last day data per 100.000'];

         // Show necessary items and hide others
         if (ind === 0) {
            const activeItems = document.querySelectorAll('.active');
            activeItems.forEach((item) => item.classList.remove('active'));
            const allNecessaryItems = document.querySelectorAll('.value');
            allNecessaryItems.forEach((item) => item.classList.add('active'));
         }
         if (ind === 1) {
            const activeItems = document.querySelectorAll('.active');
            activeItems.forEach((item) => item.classList.remove('active'));
            const allNecessaryItems = document.querySelectorAll('.new-value');
            allNecessaryItems.forEach((item) => item.classList.add('active'));
         }
         if (ind === 2) {
            const activeItems = document.querySelectorAll('.active');
            activeItems.forEach((item) => item.classList.remove('active'));
            const allNecessaryItems = document.querySelectorAll('.value100');
            allNecessaryItems.forEach((item) => item.classList.add('active'));
         }
         if (ind === 3) {
            const activeItems = document.querySelectorAll('.active');
            activeItems.forEach((item) => item.classList.remove('active'));
            const allNecessaryItems = document.querySelectorAll('.new-value100');
            allNecessaryItems.forEach((item) => item.classList.add('active'));
         }
         ind += 1;
      }

      // Fill in the table with content
      function fillDataAsideRight(country = globalData) {
         countryTitle.textContent = `${country.Country || 'Global data'}`;
         asideWithData.innerHTML = `
      <div class="total-cases">
         <div class="title">Cases</div>
         <div class="value active">${country.TotalConfirmed}</div>
         <div class="value100 ">${country.TotalConfirmed_100}</div>
         <div class="new-value">+${country.NewConfirmed}</div>
         <div class="new-value100">+${country.NewConfirmed_100}</div>
      </div>
      <div class="recovered">
         <div class="title">Recovered</div>
         <div class="value active">${country.TotalRecovered}</div>
         <div class="value100 ">${country.TotalRecovered_100}</div>
         <div class="new-value">+${country.NewRecovered}</div>
         <div class="new-value100">+${country.NewRecovered_100}</div>
      </div>
      <div class="deaths">
         <div class="title">Deaths</div>
         <div class="value active">${country.TotalDeaths}</div>
         <div class="value100 ">${country.TotalDeaths_100}</div>
         <div class="new-value">+${country.NewDeaths}</div>
         <div class="new-value100">+${country.NewDeaths_100}</div>
      </div>
               `
      };
      fillDataAsideRight();

      // Create chart
      let worldDates = [];
      let worldConfirmedCases = [];
      let worldNewConfirmedCases = [];
      let worldRecoveredCases = [];
      let worldNewRecoveredCases = [];
      let worldDeathCases = [];
      let worldNewDeathCases = [];
      let dates = [];
      let updatedDates = [];
      let confirmedCases = [];
      let newConfirmedCases = [];
      let recoveredCases = [];
      let newRecoveredCases = [];
      let deathCases = [];
      let newDeathCases = [];

      // Get dates (pease, forgive me for magic code below)
      let tempDates = [];
      const resDateFromCountry = await fetch(`https://api.covid19api.com/total/country/belarus/status/confirmed`);
      const countyDates = await resDateFromCountry.json();
      countyDates.forEach((c) => {
         const date = c.Date;
         tempDates.push(date.slice(0, 10));
      });
      tempDates.push(mainDate);

      // Get world cases
      const resWorld = await fetch(`https://api.covid19api.com/world`);
      const historyWorld = await resWorld.json();
      tempDates.splice(0, tempDates.length - historyWorld.length);

      historyWorld.forEach((c, i) => {
         worldConfirmedCases.push(c.TotalConfirmed);
         worldNewConfirmedCases.push(c.NewConfirmed);
         worldRecoveredCases.push(c.TotalRecovered);
         worldNewRecoveredCases.push(c.NewRecovered);
         worldDeathCases.push(c.TotalDeaths);
         worldNewDeathCases.push(c.NewDeaths);
         worldDates.push(tempDates[i]);
      });

      worldConfirmedCases.sort((prev, next) => prev - next)
      worldRecoveredCases.sort((prev, next) => prev - next)
      worldDeathCases.sort((prev, next) => prev - next)
      // Magic code finished


      // Update chart
      let additionListener = true;

      async function updateCart(country) {
         dates = [];
         updatedDates = [];
         confirmedCases = [];
         newConfirmedCases = [];
         recoveredCases = [];
         newRecoveredCases = [];
         deathCases = [];
         newDeathCases = [];

         // Get confirmed cases
         const resConfirmedCases = await fetch(`https://api.covid19api.com/total/country/${country.Country}/status/confirmed`);
         const historyConfirmed = await resConfirmedCases.json();
         historyConfirmed.forEach((c) => {
            confirmedCases.push(c.Cases);
            dates.push(c.Date);
         });
         // correct date because API returns incorrect date of last day
         dates.push(mainDate);
         dates.shift();

         // Get recovered cases
         const resRecoveredCases = await fetch(`https://api.covid19api.com/total/country/${country.Country}/status/recovered`);
         const historyRecovered = await resRecoveredCases.json();
         historyRecovered.forEach((c) => {
            recoveredCases.push(c.Cases);
         });

         // Get death
         const resDeath = await fetch(`https://api.covid19api.com/total/country/${country.Country}/status/deaths`);
         const historyDeath = await resDeath.json();
         historyDeath.forEach((c) => {
            deathCases.push(c.Cases);
         });

         // Get new confirmed cases
         confirmedCases.forEach((countCases, i) => {
            if (i === 0) newConfirmedCases.push(0);
            if (confirmedCases[i] - confirmedCases[i - 1] < 0) {
               newConfirmedCases.push(0)
            } else {
               newConfirmedCases.push(confirmedCases[i] - confirmedCases[i - 1])
            }
         });

         // Get new recovered cases
         recoveredCases.forEach((countCases, i) => {
            if (i === 0) newRecoveredCases.push(0);
            if (recoveredCases[i] - recoveredCases[i - 1] < 0) {
               newRecoveredCases.push(0)
            } else {
               newRecoveredCases.push(recoveredCases[i] - recoveredCases[i - 1])
            }
         });

         // Get new death
         deathCases.forEach((countCases, i) => {
            if (i === 0) newDeathCases.push(0);
            if (deathCases[i] - deathCases[i - 1] < 0) {
               newDeathCases.push(0)
            } else {
               newDeathCases.push(deathCases[i] - deathCases[i - 1])
            }
         });


         // transform format of date
         dates.forEach((date) => updatedDates.push(date.slice(0, 10)));


         if (additionListener) btnChart.addEventListener('click', changeDataAndChart);
         changeChartData('start', country.pop);
         axesLinearChart(confirmedCases, recoveredCases, deathCases);

         function changeDataAndChart() {
            changeChartData('notStart', country.pop);
            changeDataAsideRight();
         };
         additionListener = false;
      };

      btnChart.addEventListener('click', () => {
         if (confirmedCases.length === 0) {
            changeChartWorldData();
            changeDataAsideRight();
         }
      });

      let indForChartWorld = 1;

      function changeChartWorldData() {
         if (confirmedCases.length === 0) {
            if (indForChartWorld === 4) indForChartWorld = 0;

            const arr = ['Total data', 'Last day data', 'Total data per 100.000', 'Last day data per 100.000'];

            btnChart.textContent = arr[indForChartWorld];

            if (indForChartWorld === 0) axesLinearChart(worldConfirmedCases, worldRecoveredCases, worldDeathCases);
            if (indForChartWorld === 1) axesLinearChart(worldNewConfirmedCases, worldNewRecoveredCases, worldNewDeathCases);
            if (indForChartWorld === 2) axesLinearChart(countCasesPer100(worldConfirmedCases), countCasesPer100(worldRecoveredCases), countCasesPer100(worldDeathCases));
            if (indForChartWorld === 3) axesLinearChart(countCasesPer100(worldNewConfirmedCases), countCasesPer100(worldNewRecoveredCases), countCasesPer100(worldNewDeathCases));

            function countCasesPer100(arr) {
               const newArr = arr.map(item => item = (item * 100000 / 7827000000).toFixed(2));
               return newArr;
            };

            indForChartWorld += 1;
         }
      };

      let indForChart = 1;

      function changeChartData(start, population) {
         if (start === 'start') indForChart = 0;
         if (indForChart === 4) indForChart = 0;

         const arr = ['Total data', 'Last day data', 'Total data per 100.000', 'Last day data per 100.000'];

         btnChart.textContent = arr[indForChart];

         if (indForChart === 0) axesLinearChart(confirmedCases, recoveredCases, deathCases);
         if (indForChart === 1) axesLinearChart(newConfirmedCases, newRecoveredCases, newDeathCases);
         if (indForChart === 2) axesLinearChart(countCasesPer100(confirmedCases), countCasesPer100(recoveredCases), countCasesPer100(deathCases));
         if (indForChart === 3) axesLinearChart(countCasesPer100(newConfirmedCases), countCasesPer100(newRecoveredCases), countCasesPer100(newDeathCases));

         function countCasesPer100(arr) {
            const newArr = arr.map(item => item = item * 100000 / population);
            return newArr;
         };

         indForChart += 1;
      };

      const ctx = document.getElementById("line-chart").getContext("2d");
      let chart;

      function axesLinearChart(confirmedCases, recoveredCases, deathCases) {
         if (chart) {
            chart.destroy()
         }

         chart = new Chart(ctx, {
            type: "line",
            data: {
               datasets: [{
                     label: "Cases",
                     data: confirmedCases.length === 0 ? worldConfirmedCases : confirmedCases,
                     fill: false,
                     borderColor: "#FFF",
                     backgroundColor: "#FFF",
                     borderWidth: 0,
                  },
                  {
                     label: "Recovered",
                     data: recoveredCases.length === 0 ? worldRecoveredCases : recoveredCases,
                     fill: false,
                     borderColor: "#009688",
                     backgroundColor: "#009688",
                     borderWidth: 0,
                  },
                  {
                     label: "Deaths",
                     data: deathCases.length === 0 ? worldDeathCases : deathCases,
                     fill: false,
                     borderColor: "#f44336",
                     backgroundColor: "#f44336",
                     borderWidth: 0,
                  },
               ],
               labels: updatedDates.length === 0 ? worldDates : updatedDates,
            },
            options: {
               responsive: true,
               maintainAspectRatio: false,
            },
         });
      };

      axesLinearChart(confirmedCases, recoveredCases, newDeathCases);


      return {
         fillDataAsideRight: fillDataAsideRight,
         changeDataAsideRight: changeDataAsideRight,
         arrWithFlags: arrWithFlags,
         updateCart: updateCart
      };
   } catch (error) {
      console.log(error);

   }

}