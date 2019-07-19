const about = document.querySelector('.about');
const loginDiv = document.querySelector('.login');

const loginUI = user => {
  if (user) {
    loginDiv.style.display = 'none';
    about.style.display = 'block';
  } else {
    loginDiv.style.display = 'block';
    about.style.display = 'none';
  }
};

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
  // // const aboutYourself = data[0].data();
  // console.log(data);
  // let html = `
  // <h6 class="center">About yourself</h6>
  // <div> ${data.test1} </div>`;
  // about.innerHTML = html;
};

const doNotRenderDashboard = () => {};

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    autoClose: true
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

// Prefill forms

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
