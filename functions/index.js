const functions = require('firebase-functions');
// const admin = require('firebase-admin')
// admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.addUserData = functions.https.onCall

exports.lifeExpectancy = functions.database
  .ref('/users/{uid}')
  .onCreate((snapshot, context) => {
    const uid = context.auth.uid;

    console.log(`new entry ${uid}`);
    console.log(snapshot.val());

    const aboutData = snapshot.val();
    const estimate = lifeCalculation(aboutData);

    const ref = snapshot.ref.set({ life_extectancy: lifeExpectancy });
  });

const lifeCalculation = () => {};
