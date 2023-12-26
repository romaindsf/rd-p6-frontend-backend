export function SucessfulLogin () {
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
        linkModifs.innerHTML += `<a><i class="fa-regular fa-pen-to-square"></i>modifier</a>`;
        linkModifs.href = "#";
        const mesProjets = document.querySelector("#portfolio")
        mesProjets.appendChild(linkModifs);
        linkModifs.addEventListener ("click", () => {
            afficherPopup()
        })
    
        //suppression des boutons filtres
        btnCategories.forEach(button => {
            button.style.display = "none";
        });
    };
    
};