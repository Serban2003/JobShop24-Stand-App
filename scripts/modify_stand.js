function selectStand(number) {
    if (companyID == ''){
        appendAlert("You are not connected!", "You must be connected in order to select a stand!", "danger");
        return;
    }
    if (companyStand != 0){
        appendAlert("You have already chosen a stand!", "If you want to choose another one, delete your curent stand and then try again.", "danger");
        return;
    }

    firebase.database().ref('stands/' + number).set({
        company: companyName,
    }).then(retrieveStandInfo);

    firebase.database().ref('company/' + companyID).set({
        name: companyName,
        stand: number 
    }).then(retrieveStandInfo);
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
    ].join('')

    alertPlaceholder.append(wrapper)
}