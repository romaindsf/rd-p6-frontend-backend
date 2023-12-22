//Récupération des projets de l'architecte depuis l'API
let response = await fetch("http://localhost:5678/api/works");
let projects = await response.json();


//Afficher les travaux depuis le back-end

function genererTravaux(projects) {
    for (let i = 0; i< projects.length; i++) {
        const figure = projects[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
        projetElement.dataset.id = projects[i].id
        //remplis <figure> du contenu dédié (img & figcaption)
        const imgElement = document.createElement("img");
        imgElement.src = figure.imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.textContent = figure.title;
        //Rattachement des balises crée à l'élément parent
        divGallery.appendChild(projetElement);
        projetElement.appendChild(imgElement);
        projetElement.appendChild(titleElement);
    }
}


//fonction pour enlever la class .btnActivated

function removeStyleBtnAct() {
    const listBtnFilter = document.querySelectorAll(".btnFilter");
    listBtnFilter.forEach( (btn) =>{
        btn.classList.remove("btnActivated");
    })
};


genererTravaux(projects);


//button "Tous" is active at load

let ActiveBtn = document.querySelector(".btnFilter:first-child").classList.add("btnActivated");



//La possibilité de filtrer la galerie par catégorie de projet.


//catégorie Objets

const btnFiltrerObjet = document.querySelector(".filterObjets");
btnFiltrerObjet.addEventListener("click", () => {
    const categorieObjet = projects.filter(projet => projet.category.name == "Objets");
    //ajout du style seulement pour le bouton actif
    removeStyleBtnAct();
    btnFiltrerObjet.classList.add("btnActivated");
    //mise à jour du DOM
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(categorieObjet);
});


//catégorie Appartements

const btnFiltrerAppartements = document.querySelector(".filterAppartements");
btnFiltrerAppartements.addEventListener("click", () => {
    const categorieAppartements = projects.filter(projet => projet.category.name == "Appartements");
    removeStyleBtnAct();
    btnFiltrerAppartements.classList.add("btnActivated");
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(categorieAppartements);
});


//catégorie Hôtels & Restaurant

const btnFiltrerHotelRestaurant = document.querySelector(".filterHotelRestaurant");
btnFiltrerHotelRestaurant.addEventListener("click", () => {
    const categorieHotelRestaurant = projects.filter(projet => projet.category.name == "Hotels & restaurants");
    removeStyleBtnAct();
    btnFiltrerHotelRestaurant.classList.add("btnActivated");
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(categorieHotelRestaurant);
});


// catégorie Tous

const btnResetFilter = document.querySelector(".filterAll");
btnResetFilter.addEventListener("click", () => {
    removeStyleBtnAct();
    btnResetFilter.classList.add("btnActivated");
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(projects);
});