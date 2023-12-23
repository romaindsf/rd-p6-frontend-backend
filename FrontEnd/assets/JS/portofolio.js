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
        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
            //projetElement.dataset.id = projects[i].id
        //remplis <figure> du contenu dédié (img & figcaption)
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.textContent = projects[i].title;
        //Rattachement des balises crée à l'élément parent
        divGallery.appendChild(projetElement);
        projetElement.appendChild(imgElement);
        projetElement.appendChild(titleElement);
    }
};


genererTravaux(projects);

//boutons filtres pour afficher par catégories

const btnCategories = document.querySelectorAll(".btn")

//ajout de data-id unique aux 3 boutons filtres
//égaux à leurs catégories dédiées
for(let i = 1; i < btnCategories.length; i++) {
    btnCategories[i].dataset.id = categories[i - 1].id;
    //ajout event listener
    btnCategories[i].addEventListener("click", (event) => {
        //si le data-id du bouton pressé a id différente des id des projets
        projects.forEach(projet => {
            if(event.target.dataset.id != projet.category.id) {
                projet.style.display = "none";
            }
        });
    })
};