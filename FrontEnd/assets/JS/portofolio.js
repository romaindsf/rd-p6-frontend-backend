//Récupération des projets de l'architecte depuis l'API
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const projects = await responseWorks.json();
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();

//déclaration des varaibles globales
// Récupération de l'élément du DOM qui accueillera les fiches
const divGallery = document.querySelector(".gallery");
//Afficher les travaux depuis le back-end

function genererTravaux(projects) {
    for (let i = 0; i< projects.length; i++) {
        
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement("figure");
        projetElement.dataset.category = projects[i].category.id;
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
        const listProjet = document.querySelectorAll("figure")
        console.log(listProjet)
        //si le data-id du bouton pressé a une id différente des id des projets
        listProjet.forEach(projet => {
            if(event.target.dataset.id != projet.dataset.category) {
                console.log("hide!");
                projet.style.display = "none";
            }
        });
    })
};

/*
projects.forEach(Element => {
            if(event.target.dataset.id != Element.category.id) {
                console.log(event.target.dataset.id)
                console.log(projet[1].category.id)
                //le projet est alors caché
                projet.style.display = "none";
            }
        });
for(let i = 0; i < projects.length; i++) {
    console.log(projects[i].category.id);
}

prohcaine idée :
rajouter une classe dans boucle génére à chaque figure correspondant à sa catégorie
et utiliser cette nouvelle classe comme comparatif dans event.listener => if
display non sur la <figure> en question
*/
