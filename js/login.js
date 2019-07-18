(function() {
  var ui = new firebaseui.auth.AuthUI(auth);
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // {
      //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      //   customParameters: {
      //     // Forces account selection even when one account
      //     // is available.
      //     prompt: 'select_account'
      //   }
      // },
      // {
      //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      //   customParameters: {
      //     // Forces password re-entry.
      //     auth_type: 'reauthenticate'
      //   }
      // }

      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start('#firebaseui-auth-container', uiConfig);
  auth.onAuthStateChanged(user => {
    // console.log(user.uid);
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .onSnapshot(
          snapshot => {
            console.log(snapshot.data());
            // renderDashboard(snapshot.data());
            loginUI(user);
          },
          err => {
            console.log(err.message);
          }
        );
    } else {
      loginUI();
      // renderDashboard([]);
    }
  });
})();
