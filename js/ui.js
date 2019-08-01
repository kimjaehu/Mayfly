const dashboard = document.querySelector('.dashboard');
const aboutDiv = document.querySelector('.about');
const loginDiv = document.querySelector('.login');
var Chart = require('chart.js');

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

metric.addEventListener('onChange', e => {
  console.log(e.target.value);
});

const renderDashboard = data => {
  //Dashboard needs:
  //L left
  //BMI
  //INFO
  // // const aboutYourself = data[0].data();
  // console.log(data);
  // let html = `
  // <h6 class="center">About yourself</h6>
  // <div> ${data.test1} </div>`;
  // about.innerHTML = html;
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
