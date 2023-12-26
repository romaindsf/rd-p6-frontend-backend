//Déclarer Variable
const emailRegex = /\S+@\S+\.\S+/

//Fonction tentative de login
async function attemptLogIn(event) {    //async pour utiliser await fetch dans la fonction
    const logInfo = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
        };                              //récupération des données entrée
        const attemptLogIn = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: JSON.stringify(logInfo),
            headers: {"Content-Type": "application/json"},
        });                         //écriture de la requête, deux arguments (fetch,{method, body, headers})
        if(attemptLogIn.status === 200) {   //si la requête est un succès :
            const correctLogIn = await attemptLogIn.json();
            const storedId = JSON.stringify(correctLogIn.userId);
            window.localStorage.setItem("logId", storedId); //sauvergarde des bons identifiants
            const storedToken = JSON.stringify(correctLogIn.token);
            window.localStorage.setItem("token", storedToken);
            window.location.href = "/FrontEnd/index.html";  // rediriger vers la page d'acceuil
        } else {
            console.log("identifiant ou mot de passe incorrecte")
            document.querySelector("[name=email]")
            .classList.add("invalid")
            document.querySelector("[name=password]")
            .classList.add("invalid")       //indicateurs d'erreur (message à rajouter)
        }
}

//Formulaire
const loginForm = document.getElementById("logIn");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();     //stopper action par defaut du navigateur (empecher reload de la page)
    if (emailRegex.test(event.target.querySelector("[name=email]").value)) {
        attemptLogIn(event);        //si syntaxe email valide alors la fonction déclaré au dessus s'éxécute
    } else {
        document.querySelector("[name=email]")
            .classList.add("invalid")
        console.log("adresse email invalide.")  ////indicateurs d'erreeur (message à rajouter)
    };
})
