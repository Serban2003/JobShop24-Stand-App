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


var companyID = '';
var companyName = '';
var companyStand = 0;
var nrStands = 4;
var standKeys = '';
var standInfo = '';

firebase.auth().onAuthStateChanged(function (company) {

  if (company) {
    console.log(company.email);
    document.getElementById("log-in-button").style.display = "none";
    document.getElementById("log-out-button").style.display = "block";
    document.getElementById("log-in-message").style.display = "block";

    companyID = company.email.substring(0, company.email.indexOf('@'));

    /* Retrieve company details */
    var companyDetails = database.ref('company/' + companyID);

    companyDetails.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        companyName = data.name;
        companyStand = data.stand;
      }
    }).then(function () {
      document.getElementById("companyName").innerHTML = companyName;

      /* Retrieve stand info */
      var stands = database.ref('stands/');

      stands.once('value', (snapshot) => {
        const data = snapshot.val();

        standInfo = Object.values(data);
        standKeys = Object.keys(data);
      }).then(
        function () {
          console.log(standInfo);
          console.log(standKeys);
          updateStands();
        }
      );
    });


  } else {
    console.log("No company connected");
    document.getElementById("log-out-button").style.display = "none";
    document.getElementById("log-in-button").style.display = "block";
    document.getElementById("log-in-message").style.display = "none";

    /* Retrieve stand info */
    var stands = database.ref('stands/');

    stands.once('value', (snapshot) => {
      const data = snapshot.val();

      standInfo = Object.values(data);
      standKeys = Object.keys(data);
    });
  }
});
