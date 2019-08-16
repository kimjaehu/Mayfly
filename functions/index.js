const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.addUserData = functions.https.onCall

// exports.lifeExpectancy = functions.firestore
//   .document('/users/{userId}')
//   .onCreate((snapshot, context) => {
//     const data = snapshot.data();
//     // const aboutData = snapshot.data();
//     // const estimate = lifeCalculation(aboutData);

//     const lifeExpVal = lifeCalculation(data);
//     const bmi = bmiCalculation(data);

//     return {
//       bmi: bmi,
//       life_expectancy: lifeExpVal
//     }.then(data => {
//       console.log(data);
//       return snapshot.ref.update(data);
//     });
//   });

exports.lifeExpectancy = functions.firestore
  .document('/users/{userId}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    // const aboutData = snapshot.data();
    // const estimate = lifeCalculation(aboutData);

    // const lifeExpVal = await promiseLife(data);
    // const bmi = await promiseBmi(data);
    // console.log('lifeExpVal and bmi', lifeExpVal, bmi);

    // return await snapshot.ref.update(data);
    let bmi = bmiCalculation(data);
    let life = await lifeCalculation(data);

    return snapshot.ref.update({
      bmi: bmi,
      life_expectancy: life
    });
  });

const promiseLife = data => {
  return new Promise(resolve => {
    return lifeCalculation(data);
  });
};

const promiseBmi = data => {
  return new Promise(resolve => {
    return bmiCalculation(data);
  });
};

const lifeCalculation = data => {
  return new Promise(resolve => {
    let bmiValue = Number(
      (data.weight / Math.pow(data.height / 100, 2)).toFixed(1)
    );
    let variance = 0;
    let smokingVar = 0;
    let alcoholVar = 0;
    let physicalVar = 0;
    let dietVar = 0;
    let stressVar = 0;
    let bmiVar = 0;
    let threat = 0;
    let extreme = 0;
    //bmi
    if (bmiValue >= 18.5 || bmiValue < 25) {
      bmiVar = 0;
    } else {
      bmiVar = 1;
    }

    // Smoking
    switch (data.smoking) {
      case 'heavy':
        smokingVar = -8.8;
        extreme++;
        break;
      case 'light':
        smokingVar = -4.4;
        break;
      case 'fomer':
        smokingVar = 0;
        break;
      case 'never':
        smokingVar = 2.7;
        break;
    }

    //Alcohol consumption
    switch (data.alcohol) {
      case 'binge':
        alcoholVar = -1.7;
        extreme++;
        break;
      case 'heavy':
        alcoholVar = -1.2;
        break;
      case 'moderate':
        alcoholVar = -0.6;
        break;
      case 'light':
        alcoholVar = 0;
        break;
      case 'occasional':
        alcoholVar = 1.5;
        break;
      case 'no_alcohol':
        alcoholVar = 3.1;
        break;
    }

    // Physical activity
    switch (data.physical_activity) {
      case 'inactive':
        physicalVar = -1.5;
        extreme++;
        break;
      case 'moderate':
        physicalVar = 0;
        break;
      case 'active':
        physicalVar = 3.1;
        break;
    }

    // Diet
    switch (data.diet) {
      case 'very_poor':
        dietVar = -4.0;
        extreme++;
        break;
      case 'poor':
        dietVar = -2.0;
        break;
      case 'fair':
        dietVar = 0;
        break;
      case 'adequate':
        dietVar = 3.2;
        break;
    }

    // Stress
    switch (data.stress) {
      case 'high':
        stressVar = -2.1;
        extreme++;
        break;
      case 'low':
        stressVar = 0.4;
        break;
    }

    switch (extreme) {
      case 2:
        threat = 5;
        break;
      case 3:
        threat = 7.5;
        break;
      case 4:
        threat = 10;
        break;
      case 5:
        threat = 12.5;
        break;
      case 6:
        threat = 15;
        break;
    }

    variance =
      (smokingVar < 0 ? smokingVar * (threat / 100 + 1) : smokingVar) +
      (alcoholVar < 0 ? alcoholVar * (threat / 100 + 1) : alcoholVar) +
      (physicalVar < 0 ? physicalVar * (threat / 100 + 1) : physicalVar) +
      (dietVar < 0 ? dietVar * (threat / 100 + 1) : dietVar) +
      (stressVar < 0 ? stressVar * (threat / 100 + 1) : stressVar) +
      (bmiVar < 0 ? bmiVar * (threat / 100 + 1) : bmiVar);

    console.log('variance',variance);

    let gender = '';
    if (data.gender === 'Male') {
      gender = 'life_expectancy_m';
    } else if (data.gender === 'Female') {
      gender = 'life_expectancy_f';
    } else {
      gender = 'life_expectancy_b';
    }

    const life = db
      .collection('assets')
      .doc(data.country_code)
      .get()
      .then(doc => {
        return Number(doc.data()[gender]) + variance;
      })
      .catch(err => console.log(err));
    resolve(life);
  });
};

const bmiCalculation = data => {
  return Number((data.weight / Math.pow(data.height / 100, 2)).toFixed(1));
};
