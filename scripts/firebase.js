var firebaseConfig = {
    apiKey: "AIzaSyCBzAcQe4Y9U_aIHREjvffV-JsQTpMyLT8",
    authDomain: "final-hci.firebaseapp.com",
    projectId: "final-hci",
    storageBucket: "final-hci.appspot.com",
    messagingSenderId: "390523385362",
    appId: "1:390523385362:web:5032c90d44e4368bd60acb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore(); 
  const usersRef = db.collection('users');