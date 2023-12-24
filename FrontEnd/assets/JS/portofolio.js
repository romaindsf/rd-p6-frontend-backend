    //Récupération des projets de l'architecte depuis l'API
    const responseWorks = await fetch("http://localhost:5678/api/works");
    const projects = await responseWorks.json();
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await responseCategories.json();

//déclaration des varaibles globales
const divGallery = document.querySelector(".gallery");
const btnCategories = document.querySelectorAll(".btn")

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
    }
};

genererTravaux(projects);

//boutons filtres
const listProjet = document.querySelectorAll(".gallery figure")
for(let i = 1; i < btnCategories.length; i++) {
    btnCategories[i].dataset.id = categories[i - 1].id;
    btnCategories[i].addEventListener("click", (event) => {
        listProjet.forEach(projet => {
            projet.style.display = "block";
            if(event.target.dataset.id != projet.dataset.category) {
                projet.style.display = "none";
            }
        });
    })
};

const btnAll = document.querySelector(".filtres .btn:first-child")
btnAll.addEventListener("click", () =>{
    listProjet.forEach(projet => {
        projet.style.display = "block";
    });
})