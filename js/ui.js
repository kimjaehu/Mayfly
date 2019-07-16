const about = document.querySelector('.about');
const loginDiv = document.querySelector('.login');

const loginUI = user => {
  if (user) {
    loginDiv.style.display = 'none';
  } else {
    loginDiv.style.display = 'block';
  }
};

const renderDashboard = data => {
  // const aboutYourself = data[0].data();
  console.log(data);
  let html = `
  <h6 class="center">About yourself</h6>
  <div> ${data.test1} </div>`;
  about.innerHTML = html;
};

const doNotRenderDashboard = () => {};

document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});

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
