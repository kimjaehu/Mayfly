// let currUser = firebase.auth().currentUser.uid;

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

// get country code
$.ajax({
  url: 'https://geoip-db.com/jsonp',
  jsonpCallback: 'callback',
  dataType: 'jsonp',
  success: location => {
    console.log(location);
    country_code = location.country_code;
    country_name = location.country_name;
    state = location.state;
    city = location.city;
    lat = location.latitude;
    lon = location.longitude;
    ipv4 = location.IPv4;
  },
  error: () => {
    country_code = 'ZZ';
    country_name = 'No country';
    state = 'No state';
    city = 'No city';
    lat = 0;
    lon = 0;
    ipv4 = '0.0.0.0';
  }
});

//real time listener
// db.collection('users')
//   .doc(currUser)
//   .onSnapshot(snapshot => {
//     console.log('snapshot', snapshot.docChanges());
//     // snapshot.docChanges().forEach(change => {
//     //   // console.log(change, change.doc.data(), change.doc.id);
//     //   if (change.type === 'added') {
//     //     // add data to web page
//     //     renderRecipe(change.doc.data(), change.doc.id);
//     //   }
//     //   if (change.type === 'removed') {
//     //     //remove data from web page
//     //     removeRecipe(change.doc.id);
//     //   }
//     // });
//   });

// add new about
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
      stress: form.stress.value,
      country_code: country_code,
      country_name: country_name,
      state: state,
      city: city,
      lat: lat,
      lon: lon
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
      stress: form.stress.value,
      country_code: country_code,
      country_name: country_name,
      state: state,
      city: city,
      lat: lat,
      lon: lon
    };
  }

  db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(about)
    .then(() => {
      db.collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(doc => {
          console.log(doc.data());
          renderDashboard(doc.data());
        });
      closeModal();
    })
    .catch(err => console.log(err));
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

// create document
// const createDoc = uid => {
//   const about = {
//     gender: '',
//     date_of_birth: '',
//     height: '',
//     weight: '',
//     smoking: '',
//     alcohol: '',
//     physical_activity: '',
//     diet: '',
//     stress: ''
//   };

//   db.collection('users')
//     .doc(uid)
//     .set(about)
//     .catch(err => console.log(err));
// };

// pre-fill about
const renderAbout = data => {
  if (data.gender === 'Male') {
    document.getElementById('male').checked = true;
    document.getElementById('female').checked = false;
  } else if (data.gender === 'Female') {
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = true;
  }

  if (data.date_of_birth) {
    var elm = document.getElementById('date_of_birth');
    var instance = M.Datepicker.init(elm, {
      defaultDate: new Date(data.date_of_birth),
      setDefaultDate: true,
      autoClose: true
    });
  }

  if (data.height) {
    let feet = parseInt((data.height * 0.3937) / 12);
    document.getElementById('metric-height').value = parseInt(data.height);
    document.getElementById('imperial-height-ft').value = feet;
    document.getElementById('imperial-height-in').value = Math.round(
      ((data.height * 0.3937) / 12 - feet) * 12
    );
  }

  if (data.weight) {
    document.getElementById('metric-weight').value = parseInt(data.weight);
    document.getElementById('imperial-weight').value = parseInt(
      data.weight * 2.20462
    );
  }

  if (data.smoking) {
    let smoking = document.querySelector('#smoking');
    let smoking_options = smoking.querySelectorAll('option');
    var elm = document.getElementById('smoking');

    smoking_options.forEach(option => {
      option.selected = false;

      switch (option.value) {
        case data.smoking:
          option.selected = true;
          break;
      }
    });
    var instance = M.FormSelect.init(elm, { input: data.smoking });
  }

  if (data.alcohol) {
    let alcohol = document.querySelector('#alcohol');
    let alcohol_options = alcohol.querySelectorAll('option');
    var elm = document.getElementById('alcohol');

    alcohol_options.forEach(option => {
      option.selected = false;

      switch (option.value) {
        case data.alcohol:
          option.selected = true;
          break;
      }
    });
    var instance = M.FormSelect.init(elm, { input: data.alcohol });
  }

  if (data.physical_activity) {
    let physical_activity = document.querySelector('#physical_activity');
    let physical_activity_options = physical_activity.querySelectorAll(
      'option'
    );
    var elm = document.getElementById('physical_activity');

    physical_activity_options.forEach(option => {
      option.selected = false;

      switch (option.value) {
        case data.physical_activity:
          option.selected = true;
          break;
      }
    });
    var instance = M.FormSelect.init(elm, { input: data.physical_activity });
  }

  if (data.diet) {
    let diet = document.querySelector('#diet');
    let diet_options = diet.querySelectorAll('option');
    var elm = document.getElementById('diet');

    diet_options.forEach(option => {
      option.selected = false;

      switch (option.value) {
        case data.diet:
          option.selected = true;
          break;
      }
    });
    var instance = M.FormSelect.init(elm, { input: data.diet });
  }

  if (data.stress) {
    let stress = document.querySelector('#stress');
    let stress_options = stress.querySelectorAll('option');
    var elm = document.getElementById('stress');

    stress_options.forEach(option => {
      option.selected = false;

      switch (option.value) {
        case data.stress:
          option.selected = true;
          break;
      }
    });
    var instance = M.FormSelect.init(elm, { input: data.stress });
  }
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
