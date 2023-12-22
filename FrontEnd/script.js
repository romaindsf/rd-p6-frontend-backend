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
genererTravaux(projects)