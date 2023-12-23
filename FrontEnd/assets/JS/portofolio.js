//Récupération des projets de l'architecte depuis l'API
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const projects = await responseWorks.json();
    console.log(projects);
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();
    console.log(categories);

//Afficher les travaux depuis le back-end

function genererTravaux(projects) {
    for (let i = 0; i< projects.length; i++) {
        const figure = projects[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
            //projetElement.dataset.id = projects[i].id
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
};


genererTravaux(projects);

//bouton filtres pour afficher par catégories

//ajoute class data-id 1, 2, 3 aux boutons filtres
const btnCategories = document.querySelectorAll(".filter")
for( let i = 0; i < btnCategories.length; i++) {
    btnCategories[i].dataset.id = i + 1;
}

//ajout event listenner
