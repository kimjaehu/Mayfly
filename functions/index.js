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

    return await snapshot.ref.update(data);

    // return {
    //   bmi: bmi,
    //   life_expectancy: lifeExpVal
    // }.then(data => {
    //   return snapshot.ref.update(data);
    // });
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

const lifeCalculation = async data => {
  return (data.life_expectancy = await db
    .collection('assets')
    .doc(data.country_name)
    .get()
    .then(doc => {
      console.log('lifecalculation', data);
      return doc.data().life_expectancy_f.value;
    })
    .catch(err => console.log(err)));
};

const bmiCalculation = data => {
  console.log('bmicalculation', data);
  return (data.bmi = (data.weight / Math.pow(data.height / 100, 2)).toFixed(1));
};
