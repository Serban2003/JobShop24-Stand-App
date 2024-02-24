function login() {
    var email = document.getElementById("company-id").value + "@jobshop.cj";
    var password = document.getElementById("password").value;

    console.log(email);
    console.log(password);

    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const company = userCredential.user;
            var database_ref = database.ref();
            
            document.getElementById("close-modal").click();
        
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            var error_message = document.getElementById("error-message");
            error_message.innerHTML = "Incorrect ID or password!";
            error_message.style.display = "block";

        });
}