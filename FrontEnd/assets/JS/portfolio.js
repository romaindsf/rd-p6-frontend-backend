import {
    generrateportfolio,
    filterButton,
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
    displayPopUp,
    generateGridPopUp,
    removeProject,
} from "./functions.js";


const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

let logs = window.localStorage.getItem("logs");
const divGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const btnCategories = document.querySelectorAll(".btn");
const btnAll = document.querySelector(".filtres .btn:first-child");
const logIn = document.querySelector('nav a[href="./login.html"]');

generrateportfolio(projects, divGallery);

if (logs != null) {
    displayLogout(logIn);
    displayEditBanner();
    displayModifs(portfolio);
    hideFilterButtons(btnCategories);
    displayPopUp();
    generateGridPopUp(projects);
    removeProject(projects,logs);
} else {
    filterButton(categories, btnCategories, btnAll);
};

/*
function removeProject(projects) {
    const listProjet = document.querySelectorAll(".gallery figure");
    const listThumbnail = document.querySelectorAll(".grid_thumbnail div");
    const allTrashIcons = document.querySelectorAll(".grid_thumbnail i");

    for (let i = 0; i< listProjet.length; i++) {
        listProjet[i].dataset.id = projects[i].id;
        listThumbnail[i].dataset.id = projects[i].id;
        allTrashIcons[i].dataset.id = projects[i].id;
        allTrashIcons[i].addEventListener("click", (event) => {
            listThumbnail.forEach(thumbnail => {
                if (event.target.dataset.id === thumbnail.dataset.id) {
                    thumbnail.style.filter = "brightness(50%)";
                };
            })
            listProjet.forEach(projet => {
                if (event.target.dataset.id === projet.dataset.id) {
                    projet.style.display = "none";
                };
            });
        });
    };
};


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
            const logs = await attemptLogIn.json();
            window.localStorage.setItem("logs", logs.token);
            window.location.href = "index.html";  // rediriger vers la page d'acceuil
        } else {
            console.log("Erreur dans l’identifiant ou le mot de passe")
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
*/