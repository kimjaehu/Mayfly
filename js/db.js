// data persistence
db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    // probably multiple tabs open at once
    console.log('failed: persistence');
  } else if (err.code == 'unimplemented') {
    // no browser support
    console.log('persistence unavailable');
  }
});

//real time listener
// db.collection('users')
//   .doc(user.uid)
//   .onSnapshot(snapshot => {
//     snapshot.docChanges().forEach(change => {
//       // console.log(change, change.doc.data(), change.doc.id);
//       if (change.type === 'added') {
//         // add data to web page
//         renderRecipe(change.doc.data(), change.doc.id);
//       }
//       if (change.type === 'removed') {
//         //remove data from web page
//         removeRecipe(change.doc.id);
//       }
//     });
//   });

// add new recipe
const form = document.getElementById('form');
form.addEventListener('click', e => {
  e.preventDefault();
  console.log(e);
  const about = {
    gender: form.gender.value,
    date_of_birth: form.date_of_birth.value,
    height: form.height.value,
    weight: form.weight.value,
    smoking: form.smoking.value,
    alcohol: form.alcohol.value,
    physical_activity: form.physical_activity.value,
    diet: form.diet.value,
    stress: form.stress.value
  };
  console.log(about);
  // db.collection('recipes')
  //   .add(recipe)
  //   .catch(err => console.log(err));

  // form.title.value = '';
  // form.ingredients.value = '';
});

// remove recipe
const recipeContainer = document.querySelector('.about');
recipeContainer.addEventListener('click', e => {
  console.log(e);
  // if (e.target.tagName === 'I') {
  //   const id = e.target.getAttribute('data-id');
  //   db.collection('recipes')
  //     .doc(id)
  //     .delete();
  // }
});
