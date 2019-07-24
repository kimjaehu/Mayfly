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

exports.lifeExpectancy = functions.firestore
  .document('/users/{userId}')
  .onCreate((snapshot, context) => {
    const uid = context.params.userId;
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
  const lifeVal = db
    .collection('assets')
    .doc(data.country_name)
    .get()
    .then(doc => {
      return doc.data().life_expectancy_f.value;
    })
    .catch(err => console.log(err));
  return parseFloat(lifeVal);
};

const bmiCalculation = data => {
  let bmiVal = data.weight / Math.pow(data.height / 100, 2);
  return bmiVal.toFixed(1);
};
