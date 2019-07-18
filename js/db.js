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
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  let metric = document.getElementById('metric').style.display;
  let about = {};
  if (metric === 'block') {
    about = {
      gender: form.gender.value,
      date_of_birth: form.date_of_birth.value,
      height: form['metric-height'].value,
      weight: form['metric-weight'].value,
      smoking: form.smoking.value,
      alcohol: form.alcohol.value,
      physical_activity: form.physical_activity.value,
      diet: form.diet.value,
      stress: form.stress.value
    };
    console.log('metric');
  } else {
    console.log('imperial');
    let convertedHeight = ftInToCmConversion(
      parseInt(form['imperial-height-ft'].value),
      parseInt(form['imperial-height-in'].value)
    );
    let convertedWeight = lbToKgConversion(
      parseFloat(form['imperial-weight'].value)
    );

    about = {
      gender: form.gender.value,
      date_of_birth: form.date_of_birth.value,
      height: convertedHeight,
      weight: convertedWeight,
      smoking: form.smoking.value,
      alcohol: form.alcohol.value,
      physical_activity: form.physical_activity.value,
      diet: form.diet.value,
      stress: form.stress.value
    };
  }
  console.log('about', about);
  // const about = {
  //   gender: form.gender.value,
  //   date_of_birth: form.date_of_birth.value,
  //   height: form.height.value,
  //   weight: form.weight.value,
  //   smoking: form.smoking.value,
  //   alcohol: form.alcohol.value,
  //   physical_activity: form.physical_activity.value,
  //   diet: form.diet.value,
  //   stress: form.stress.value
  // };

  // console.log('uid', firebase.auth().currentUser);
  // db.collection('users')
  //   .doc(firebase.auth().currentUser.uid)
  //   .update(about)
  //   .catch(err => console.log(err));
});

// unit conversion
// ft in to cm
const ftInToCmConversion = (ft, inch) => {
  if (!ft) {
    ft = 0;
  }
  if (!inch) {
    inch = 0;
  }
  totalFt = ft + inch / 12;
  console.log(totalFt);
  convertedHeight = totalFt * 30.48;
  return convertedHeight;
};

//lb to kg
const lbToKgConversion = lb => {
  convertedWeight = lb * 0.45359237;
  return convertedWeight;
};

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
