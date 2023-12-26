//Récupération des projets de l'architecte depuis l'API
const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

//Déclaration des variables globales
const divGallery = document.querySelector(".gallery");
const btnCategories = document.querySelectorAll(".btn");
let loggedId = window.localStorage.getItem("logId");

function genererTravaux(projects) {
    for (let i = 0; i< projects.length; i++) {
        const projetElement = document.createElement("figure");
        projetElement.dataset.category = projects[i].category.id;
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.textContent = projects[i].title;
        divGallery.appendChild(projetElement);
        projetElement.appendChild(imgElement);
        projetElement.appendChild(titleElement);
    };
};
//<a href="#"><i class="fa-regular fa-pen-to-square"></i>modifier</a>
//Am i loggedIn?
if (loggedId != null) {
    const logIn = document.querySelector('nav a[href="./assets/login.html"]');
    logIn.innerHTML = `<a href=#>logout</a>`;
    const linkModifs = document.createElement("a");
    const iconModifs = document.createElement("i");
    iconModifs.className = "fa-regular fa-pen-to-square";
    iconModifs.innerText = "modifier";
    linkModifs.appendChild(iconModifs);
    linkModifs.href = "#";
    const mesProjets = document.querySelector("#portfolio h2")
    mesProjets.appendChild(linkModifs);
    logIn.addEventListener("click", ()=> {
        window.localStorage.removeItem("logId", "token");
        location.reload();
    });
};

genererTravaux(projects);

//Boutons filtres
const listProjet = document.querySelectorAll(".gallery figure")
for(let i = 1; i < btnCategories.length; i++) {
    btnCategories[i].dataset.id = categories[i - 1].id;
    btnCategories[i].addEventListener("click", (event) => {
        listProjet.forEach(projet => {
            projet.style.display = "block";
            if(event.target.dataset.id != projet.dataset.category) {
                projet.style.display = "none";
            };
        });
    });
};

const btnAll = document.querySelector(".filtres .btn:first-child");
btnAll.addEventListener("click", () =>{
    listProjet.forEach(projet => {
        projet.style.display = "block";
    });
});