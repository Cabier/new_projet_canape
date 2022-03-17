// // RECUPERATION ID PRODUIT
let params = new URL(document.location).searchParams;
let id = params.get("id");

console.log(id);
// ELEMENTS A MODIFIER
const colors = document.querySelector('#colors');
const combien = document.querySelector('#quantity');
console.log(typeof combien)
const imgAtribute = document.querySelector('.item__img > img');
const productTitle = document.querySelector('#title');
const price = document.querySelector('#price');
const descript = document.querySelector('#description');
const addToCart = document.getElementById("addToCart");
const nbProductPanier = document.querySelector('nav ul')

const navBar = document.getElementsByClassName('limitedWidthBlock')
const navImg = document.getElementsByClassName('banniere')

// DECLARATION DE LA FONCTION AU CLICK
addToCart.addEventListener("click", addToCart)

// FETCH AVEC ID PRODUIT
fetch("http://localhost:3000/api/products/" + id)
.then( reponse => {
    return reponse.json();
})

// MODIFICATION DES ELEMENTS
.then((dataKanap) => {
    allKanap = dataKanap;
    imgAtribute.setAttribute("src", `${allKanap.imageUrl}`);
    imgAtribute.setAttribute("alt", `${allKanap.altTxt}`);
    productTitle.innerHTML = `${allKanap.name}`;
    price.innerHTML = `${allKanap.price}`;
    descript.innerHTML = `${allKanap.description}`;
    colors.innerHTML += makeColors(allKanap.colors)
      
})
.catch(function (err){
    console.log("Fetch Erreur")
    alert("Veuillez nous excusez les produits ne sont pas disponible pour le moment.")
}); 
/**
 * créer la liste de couleurs
 *
 * @param   {Array}  colors  les variantes de couleurs]
 *
 * @return  {String}         le html à ajouter dans le select
 */
 function makeColors(colors){
    let html = "";
    colors.forEach(couleur=>{
      html +=`<option value="${couleur}">${couleur}</option>`
    });
    return html;
  }

/**
 * [ajouteAuPanier description]
 *
 * @type  {Object} le contenu du local storage
 */
let localPanier = JSON.parse(localStorage.getItem("kanapPanier"));

function ajouteAuPanier(){

    let articles = {
        id : allKanap._id,
        id_color: `${allKanap._id}_${colors.value}`,
        image: allKanap.imageUrl,
        imageAlt: allKanap.altTxt,
        name: allKanap.name,
        prix: allKanap.price,
        couleur: colors.value,
        nombre: combien.value
    }

    // let localPanier = JSON.parse(localStorage.getItem("kanapPanier"))

//DECLARATION DES FONCTION
ajouteLocalStorage = () => {
    
    localPanier.push(articles)
        localStorage.setItem("kanapPanier", JSON.stringify(localPanier))
    }
    gererStock = () => {
        if(combien.value == 0) return alert("choisir quantité");
        if(colors.value == "") return alert("Choissez la couleur.");
        if(combien.value > 100) return alert("la quantité doit être inférieur à 100");
        ajouteLocalStorage();
    }

//SI PANIER VIDE LE CREER
    if(localPanier === null){
            localPanier = [];
            gererStock()
    }
// SI ARTICLE DEJA PRESENT TROUVE L'ARTICLE ET AJOUTE LA QUANTITE    
    else {
        let findArticle = localPanier.find(p => p.id_color == articles.id_color);
        console.log(localPanier);
        if(findArticle !== undefined){
            findArticle.nombre = parseInt(findArticle.nombre) + parseInt(combien.value)
            console.log(findArticle.nombre);
//SI PLUS DE 100 ARTICLES IDENTIQUES AU PANIER           
            if(findArticle.nombre > 100){
                alert("Stock indisponible");
            }
            else{
            localStorage.setItem("kanapPanier", JSON.stringify(localPanier))
            }
        }
// SINON AJOUTE LE NOMBRE SELECTIONNE PAR L'UTILISATEUR        
        else{               
            findArticle = combien.value
            gererStock()
        } 
    } 
    // CHIFFRE PANIER
    nbPanier.innerHTML = `${localPanier.length}`; 
}
// CREATION LI POUR NB ARTICLES AU PANIER
    const nbPanier = document.createElement('li');
    nbPanier.style.color = "red";
    nbPanier.style.marginLeft = "10px"
    nbProductPanier.appendChild(nbPanier);
