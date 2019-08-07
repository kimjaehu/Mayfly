const dashboard = document.querySelector('.dashboard');
const aboutDiv = document.querySelector('.about');
const loginDiv = document.querySelector('.login');

const loginUI = user => {
  if (user) {
    loginDiv.style.display = 'none';
    // loginDiv.style.hidden = true;
    // aboutDiv.style.display = 'block';
    dashboard.style.display = 'block';
    // dashboard.style.hidden = false;
  } else {
    loginDiv.style.display = 'block';
    // loginDiv.style.hidden = false;
    // aboutDiv.style.display = 'none';
    dashboard.style.display = 'none';
    // dashboard.style.hidden = true;
  }
};

const aboutUI = user => {};

const unitSwitch = document.getElementById('unit-switch');
const metric = document.getElementById('metric');
const imperial = document.getElementById('imperial');
const imperialHeightFt = document.getElementById('imperial-height-ft');
const imperialHeightIn = document.getElementById('imperial-height-in');
const imperialWeight = document.getElementById('imperial-weight');
const metricHeight = document.getElementById('metric-height');
const metricWeight = document.getElementById('metric-weight');

unitSwitch.addEventListener('click', e => {
  if (e.target.checked) {
    metric.style.display = 'block';
    imperial.style.display = 'none';
    metricHeight.required = true;
    metricWeight.required = true;
    imperialHeightFt.required = false;
    imperialHeightIn.required = false;
    imperialWeight.required = false;
  } else {
    metric.style.display = 'none';
    imperial.style.display = 'block';
    metricHeight.required = false;
    metricWeight.required = false;
    imperialHeightFt.required = true;
    imperialHeightIn.required = true;
    imperialWeight.required = true;
  }
});

const showDaysLived = time => {
  let birthday = moment(time);
  let today = moment();
  let livedYears = today.diff(birthday, 'years');
  birthday.add(livedYears, 'years');
  let livedMonths = today.diff(birthday, 'months');
  birthday.add(livedMonths, 'months');
  let livedWeeks = today.diff(birthday, 'weeks');
  birthday.add(livedWeeks, 'weeks');
  let livedDays = today.diff(birthday, 'days');
  birthday.add(livedDays, 'days');
  let daysLived = document.getElementById('days-lived');
  daysLived.innerHTML = `${livedYears}yr ${livedMonths}mo ${livedWeeks}wk ${livedDays}day`;
};

const showDaysWillLive = (time, birthday) => {
  let today = moment();
  let expectedDays = moment.duration(time, 'years').asDays();
  let expected = moment(birthday).add(expectedDays, 'days');
  let livedYears = expected.diff(today, 'years');
  today.add(livedYears, 'years');
  let livedMonths = expected.diff(today, 'months');
  today.add(livedMonths, 'months');
  let livedWeeks = expected.diff(today, 'weeks');
  today.add(livedWeeks, 'weeks');
  let livedDays = expected.diff(today, 'days');
  today.add(livedDays, 'days');
  let daysWillLive = document.getElementById('days-will-live');
  daysWillLive.innerHTML = `${livedYears}yr ${livedMonths}mo ${livedWeeks}wk ${livedDays}day`;
};



const renderDashboard = data => {
  console.log('renderdashboard', data);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Life expectancy',
          data: [25, data.life_expectancy - 25],
          backgroundColor: [
            '#ff9800',
            '#fff',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: ['#ff9800', '#ff9800', '#ff9800', '#ff9800', '#ff9800'],
          borderWidth: 2
        }
      ]
    },
    options: {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      responsive: true,
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Life expected'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },

      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor((currentValue / total) * 100 + 0.5);
            return percentage + '%';
          }
        }
      }
    }
  });

  //Plugin for center text
  Chart.pluginService.register({
    beforeDraw: function(chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;
      ctx.restore();
      var fontSize = (height / 70).toFixed(2);
      ctx.font = fontSize + 'em Courier';
      ctx.textBaseline = 'top';
      var text = Math.floor((25 / data.life_expectancy) * 100 + 0.5) + '%',
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.4;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  });

  showDaysLived(data.date_of_birth);
  showDaysWillLive(data.life_expectancy, data.date_of_birth);
};
const createAbout = () => {
  console.log('create about');
  var elem = document.getElementById('modal1');
  var instance = M.Modal.init(elem, { dismissible: false });
  console.log('modal open');
  instance.open();
};

const closeModal = () => {
  var elem = document.getElementById('modal1');
  var instance = M.Modal.init(elem, { dismissible: false });
  instance.close();
};

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    autoClose: true,
    disableDayFn: day => {
      return day.valueOf() > new Date().valueOf();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.querySelectorAll('.tabs');
  var instance = M.Tabs.init(elem, { swipeable: true });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function() {
  var elem = document.getElementById('swipeable-tab');
  var instance = M.Tabs.init(elem, { swipeable: true });
});

// document.addEventListener('DOMContentLoaded', function() {
//   var elem = document.getElementById('country');
//   var instance = M.Autocomplete.init(elem, { data });
// });

// render recipe
const renderRecipe = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/recipe.png" alt="recipe thumb" />
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients"
          >${data.ingredients}</div
        >
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  recipes.innerHTML += html;
};

// remove recipe from DOM
const removeRecipe = id => {
  const recipe = document.querySelector(`.recipe[data-id = ${id}]`);
  recipe.remove();
};
