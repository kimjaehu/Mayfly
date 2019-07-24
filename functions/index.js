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

    const lifeExpVal = await promiseLife(data);
    const bmi = await promiseBmi(data);
    console.log('lifeExpVal and bmi', lifeExpVal, bmi);

    return {
      bmi: bmi,
      life_expectancy: lifeExpVal
    }.then(data => {
      console.log(data);
      return snapshot.ref.update(data);
    });
  });

const promiseLife = new Promise(resolve => {
  return resolve(lifeCalculation(data));
});

const promiseBmi = new Promise(resolve => {
  return resolve(bmiCalculation(data));
});

const lifeCalculation = data => {
  console.log(data);
  data.life_expectancy = db
    .collection('assets')
    .doc(data.country_name)
    .get()
    .then(doc => {
      return doc.data().life_expectancy_f.value;
    })
    .catch(err => console.log(err));
  return data;
};

const bmiCalculation = data => {
  data.bmi = (data.weight / Math.pow(data.height / 100, 2)).toFixed(1);
  console.log(data);
  return data;
};
