const firebaseConfig = {
    apiKey: "AIzaSyBluoOT6jdcY3TiIioEPCj67Ot3Bj4YPCo",
    authDomain: "jobshop-stand-app.firebaseapp.com",
    projectId: "jobshop-stand-app",
    storageBucket: "jobshop-stand-app.appspot.com",
    messagingSenderId: "125142518927",
    appId: "1:125142518927:web:7dac2c7cb74a6d3301b4fa",
    measurementId: "G-48VB3QDNKW",
    databaseURL: "https://jobshop-stand-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    document.getElementById("log-in-button").style.display = "none";
    document.getElementById("log-out-button").style.display = "block";
    document.getElementById("log-in-message").style.display = "block";
  } else {
    console.log("No user connected");
    document.getElementById("log-out-button").style.display = "none";
    document.getElementById("log-in-button").style.display = "block";
    document.getElementById("log-in-message").style.display = "none";
  }
});

 


