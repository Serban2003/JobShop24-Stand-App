var nrStands = '';
var standKeys = '';
var standInfo = '';

function retrieveStandInfo(){
    var stands = database.ref('stands/');

    stands.once('value', (snapshot) => {
      const data = snapshot.val();
      
      standInfo = Object.values(data);
      standKeys = Object.keys(data);
      nrStands = standKeys.length;
  }).then(
    function(){
        console.log(standInfo);
        updateStands();
    }
    );
}

function updateStands(){
    console.log(standInfo);
    for(var i = 0; i < nrStands; ++i){
        var idStand = "stand-"+ standKeys[i];
        
        var stand = document.getElementById(idStand);
        stand.innerHTML = standInfo[i].company;
        stand.classList.add("ocuppied-stand");
    }
}