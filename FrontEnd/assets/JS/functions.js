function generrateportfolio (projects, divGallery) {
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

function filterButton (categories, btnCategories, btnAll) {
    const listProjet = document.querySelectorAll(".gallery figure");
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
    btnAll.addEventListener("click", () =>{
        listProjet.forEach(projet => {
            projet.style.display = "block";
        });
    });
};

function displayLogout (logIn) {
    logIn.innerHTML = `<a href=#>logout</a>`;
    logIn.addEventListener("click", ()=> {
        window.localStorage.removeItem("logs");
        location.reload();
    });
};

function displayEditBanner () {
    const editionBanner = document.createElement("p");
    editionBanner.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>Mode edition`;
    editionBanner.classList.add("edit_banner");
    document.body.prepend(editionBanner);   //à la place de .appendChild, place l'élément enfant en premier
};

function displayModifs (portfolio) {
    const linkModifs = document.createElement("a");
    linkModifs.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    linkModifs.href = "#";
    linkModifs.classList.add("btnOpenModal");
    portfolio.appendChild(linkModifs);
};

function hideFilterButtons (btnCategories) {
    btnCategories.forEach(button => {
        button.style.display = "none";
    });
};

function displayPopUp () {
    const btnOpenModal = document.querySelector(".btnOpenModal");
    const popupBackground = document.querySelector(".popupBackground");
    const iconCloseModal = document.querySelector(".close_modal");
    btnOpenModal.addEventListener("click", () => {
        popupBackground.style.display = "block";
    });
    iconCloseModal.addEventListener("click", () => {
        popupBackground.style.display = "none";
    });
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            popupBackground.style.display = "none";
        };
    });
};

function generateGridPopUp (projects) {
    const gridThumbnail = document.querySelector(".grid_thumbnail");
    for (let i = 0; i< projects.length; i++) {
        const gridElement = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const trashCan = document.createElement("i");
        trashCan.classList.add("fa-solid", "fa-trash-can");
        gridThumbnail.appendChild(gridElement);
        gridElement.appendChild(imgElement);
        gridElement.appendChild(trashCan);
    };
};

/*
supprimer des projets depuis la modal en cliquant sur l'icone trashcan
    -seletionne l'icone trash
    -lier icône trash au projet respectif
        (chaque projet a deja un data-category)
        -verification admin est connecté
            (s'inspirer du log in, if logs != null)
        -requête delete a l'api du projet
            (regarder swagger)
        -enleve projet (display none) du portfolio
            (s'inspirer des btn categories)



*/

function removeProject(projects, logs) {
    const allTrashIcons = document.querySelectorAll(".grid_thumbnail i");
    for (let i = 0; i< projects.length; i++) {
        allTrashIcons[i].dataset.id = projects[i].id;
        allTrashIcons[i].addEventListener("click", async (event) => {
            if (logs != null) {
                const resquestRemoveProject = await fetch(`http://localhost:5678/api/works/${event.target.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "logs",
                        "Content-Type": "application/json"
                    },
                });
            };
        });
    };
};

export {
    generrateportfolio,
    filterButton,
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
    displayPopUp,
    generateGridPopUp,
    removeProject,
};

//http://localhost:5678/images/appartement-paris-v1651287270508.png