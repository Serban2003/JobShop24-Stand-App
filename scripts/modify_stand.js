function selectStand(number) {
    if (companyID == '') {
        appendAlert("You are not connected!", "You must be connected in order to select a stand!", "danger");
        return;
    }
    if (companyStand != 0) {
        if (companyStand == number) {
            $('#deleteModal').modal('show');
            return;
        } else {
            appendAlert("You have already chosen a stand!", "If you want to choose another one, delete your curent stand and then try again.", "danger");
            return;
        }
    }

    //Update databse company data
    firebase.database().ref('company/' + companyID).set({
        name: companyName,
        stand: number
    }).then(function () {
        //Update database stand info
        firebase.database().ref('stands/' + number).set({
            company: companyName,
        }).then(function () {
            var companyDetails = database.ref('company/' + companyID);
            companyDetails.once('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    companyName = data.name;
                    companyStand = data.stand;
                }
            }).then(function () {
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
        });
    });
}

function updateStands() {
    console.log(standInfo);
    for (var i = 1; i <= nrStands; ++i) {
        var stand = document.getElementById("stand-" + i);

        if (standKeys.includes(String(i))) {
            if (i == companyStand) {
                stand.classList.remove("occupied-stand");
                stand.classList.add("selected-stand");
                console.log(i);
            } else {
                stand.classList.add("ocuppied-stand");
                stand.classList.remove("selected-stand");
            }
            stand.innerHTML = standInfo[standKeys.indexOf(String(i))].company;
        } else {
            stand.classList.remove("occupied-stand");
            stand.classList.remove("selected-stand");
            stand.innerHTML = "Stand " + i;
        }
    }
}


const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, description, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible m-3" role="alert">`,

        `<h4 class="alert-heading">Warning!</h4>`,
        `   <p>${message}</p>`,
        `<hr>`,
        `<p class="mb-0">${description}</p>`,
        `<button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>`,
        `</div>`
    ].join('');

    alertPlaceholder.append(wrapper)
}

function unselectStand() {
    firebase.database().ref('stands/').child(companyStand).remove().then(function () {
        //Update database company data
        firebase.database().ref('company/' + companyID).set({
            name: companyName,
            stand: 0
        }).then(function () {
            /* Retrieve company details */
            var companyDetails = database.ref('company/' + companyID);
            companyDetails.once('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    companyName = data.name;
                    companyStand = data.stand;
                }
            }).then(function () {
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
                        $('#deleteModal').modal('hide');
                    }
                );

            });
        });
    });
}