//Récupération des projets de l'architecte depuis l'API
const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

//Déclaration des variables globales
const divGallery = document.querySelector(".gallery");
const btnCategories = document.querySelectorAll(".btn");
let loggedId = window.localStorage.getItem("logId");

//fonctions
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

if (loggedId != null) {
    //affichage de logout quand on est connecté
    const logIn = document.querySelector('nav a[href="./assets/login.html"]');
    logIn.innerHTML = `<a href=#>logout</a>`;
    logIn.addEventListener("click", ()=> {
        window.localStorage.removeItem("logId", "token");
        location.reload();
    });
    //affichage de link "modifier"
    const linkModifs = document.createElement("a");
    linkModifs.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    linkModifs.href = "#";
    linkModifs.classList.add("btnOpenModal")
    const mesProjets = document.querySelector("#portfolio")
    mesProjets.appendChild(linkModifs);
    linkModifs.addEventListener ("click", () => {
    })

    //suppression des boutons filtres
    btnCategories.forEach(button => {
        button.style.display = "none";
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

const popupBackground = document.querySelector(".popupBackground");
const btnOpenModal = document.querySelector(".btnOpenModal");
const iconCloseModal = document.querySelector(".close_modal");

btnOpenModal.addEventListener("click", () => {
    popupBackground.style.display = "block";
});

iconCloseModal.addEventListener("click", () => {
    popupBackground.style.display = "none";
});
