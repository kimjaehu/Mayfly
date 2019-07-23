const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.addUserData = functions.https.onCall

exports.lifeExpectancy = functions.firestore
  .document('/users/{userId}')
  .onCreate((snapshot, context) => {
    const uid = context.params.userId;

    console.log(snapshot.data());
    const data = snapshot.data();
    // const aboutData = snapshot.data();
    // const estimate = lifeCalculation(aboutData);

    const lifeExpVal = lifeCalculation(data);
    const bmi = bmiCalculation(data);

    return snapshot.ref.update({
      bmi: bmi,
      life_expectancy: lifeExpVal
    });
  });

const lifeCalculation = data => {
  console.log(data);
  return 8;
};

const bmiCalculation = data => {};
