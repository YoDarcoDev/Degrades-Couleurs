
const inputsCouleur = document.querySelectorAll('.inp-couleur');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const span = document.querySelector('span');
const btnRandom = document.querySelector('.random');


// DEMARRAGE INITIALISATION 

let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;

// Remplir Input
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];

// Fond Input
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

// Fond body
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})`;



// INCLINAISON 

inputRange.addEventListener('input', (e) => {
    inclinaison = e.target.value * 3.6;             // Range va jusque 100(°) et ici on veut 360°

    // fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})`; Au départ 2 valeurs.
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

})



// RAJOUTER COULEUR

btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve)
})


function rajouteEnleve(e) {
    
    span.innerText = "";
    const allInputs = document.querySelectorAll('.inp-couleur');                  // Prendre tous les inputs (pas seulement les 2 du début)   
    const randomColor = Math.floor(Math.random()*16777215).toString(16);          // Voir Note
    // console.log(randomColor);

    if (e.target.className === "plus") {
       
        if (allInputs.length >= 8) {
            return;
        }

        const nvlCouleur = document.createElement('input');
        nvlCouleur.setAttribute('class', 'inp-couleur');
        nvlCouleur.setAttribute('data-index', index);
        nvlCouleur.setAttribute('maxlength', 7);
        nvlCouleur.value = `#${randomColor.toUpperCase()}`;
        nvlCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvlCouleur);

        
        // Mise à jour du fond

        valCouleurs.push(`#${randomColor.toUpperCase()}`);
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}`;
        index ++;
        console.log(fond.style.background)
    }


// SUPPRIMER COULEUR

    else if (e.target.className === "moins") {
        
        console.log("la")

        if (valCouleurs.length === 2) {
            span.innerText = "Il faut au moins 2 couleurs !";
        }
        else {
            valCouleurs.pop();                                          // Supprime le dernier élément du tableau
            allInputs[allInputs.length -1].remove()                     // Tableau de tous les inputs (NodeList) : Maj du DOM
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}`;
            index --;
        }
    }


// MISE A JOUR COULEURS À LA VOLÉE (DEMARRAGE)

    allInputs.forEach(input => {
        input.addEventListener('input', MAJCOLORS )
    })

}



// MISE A JOUR COULEURS À LA VOLÉE (DEMARRAGE)

inputsCouleur.forEach(input => {
    input.addEventListener('input', MAJCOLORS )
})


function MAJCOLORS(e) {
    
    let indexEnCours = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}`; 
}



// COULEURS ALEATOIRES (Tous les inputs)

btnRandom.addEventListener('click', (e) => {
    
    const inputs = document.querySelectorAll('.inp-couleur');
    
    for (i = 0; i < valCouleurs.length; i++) {
        
        valCouleurs[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        inputs[i].value = valCouleurs[i].toUpperCase();                                                 // Value input
        inputs[i].style.background = valCouleurs[i].toUpperCase();                                      // Fond input
        // console.log(valCouleurs[i]);
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}`;

    }
})




/* 
    NOTES :
    
    data-index : nous permet de bien séparer les éléments et de pouvoir les comparer ensuite 

    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}` = fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})`; Similaire car quand on retourne dans une expression JS un tableau, celui-ci va se retourner sous forme de chaine de caractères séparés par des virgules. Utlile pour le background.

    Hexadecimal = Tableau qui va de 0 à 16  (0=0 - 9=9 - A=10 - F=15)  16 elements

    On multiplie et on applique la méthode toString(16) : qui va convertir en Hexadécimal (0 à F)
*/