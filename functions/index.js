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
    console.log(bmi);

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
    console.log('data:', data);
    const life = db
      .collection('assets')
      .doc(data.country_name)
      .get()
      .then(doc => {
        console.log(doc.data().life_expectancy_f);
        return Number(doc.data().life_expectancy_f);
      })
      .catch(err => console.log(err));
    resolve(life);
  });
};

const bmiCalculation = data => {
  return Number((data.weight / Math.pow(data.height / 100, 2)).toFixed(1));
};
