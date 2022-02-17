
cart = JSON.parse(localStorage.getItem("cart"));



actualCartString = JSON.parse(localStorage.getItem("cart"));
console.log(cart)
let cartaImplementer = document.querySelector("#cart__items");


console.log(cartaImplementer);
//si le panier est vide : afficher le panier est vide
if(actualCartString === null ||actualCartString == 0 ){
    let panierVide = `
    <article class="cart__item" data-id="{product-ID}">
    <div class="container-panier-vide">
        <div> Le panier est vide </div>
    </div>    
    `;
    cartaImplementer.innerHTML = panierVide;
    
    console.log("je suis vide");
    
}
else {
    //si le panier n'est pas vide afficher le produit dans le local storage
   let structureProduitPanier =  [];
  for(k = 0;k < actualCartString.length; k++){
    structureProduitPanier = structureProduitPanier + `
    <section id="cart__items">
        <article class="cart__item" data-id="${actualCartString[k]._id}">
                <div class="cart__item__img">
                  <img src=${actualCartString[k].imageUrl}>  ${actualCartString[k].altTxt}
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${actualCartString[k].name}</h2>
                    <p>${actualCartString[k].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <button class="deleteItem">Supprimer</button>
                    </div>
                  </div>
                </div>
              </article> 
    </section>
    `;
    //affichage_image.insertAdjacentHTML5()
  }
    if(k === actualCartString.length) { 
    cartaImplementer.innerHTML = structureProduitPanier;

    }
  }
      console.log("nombre de produit ajouté " + actualCartString.length);

    console.log("je ne suis pas vide");

//----------------GESTION DU BOUTON SUPPRIMER L'ARTICLE-------------------//
  // sélection des références de tous les boutons btn-supprimer
  const deleteItem = Array.from(document.querySelectorAll(".deleteItem"));
  console.log(deleteItem);

  let tab = [];
  // Dans LocalStorage : suppression de l'article sélectionné //
  for (let i = 0; i < deleteItem.length; i++) {

    deleteItem[i].addEventListener('click', () => {

        deleteItem[i].parentElement.style.display ="none";
        
        
        tab = cart;
        tab.splice([i], 1);
        
       cart = localStorage.setItem('cart', JSON.stringify(tab));

        window.location.href ="cart.html";

    });

};
        
   



// délaration de la variable pour pouvoir mettre des prix qui sont dans le panier
let prixTotalCalcul = [];
//chercher les prix dans le panier
for (let p = 0;p < actualCartString.length ; p++ ) {
  let prixProduitDansLePanier = actualCartString[p].price;
  prixTotalCalcul.push(prixProduitDansLePanier) // en général quand c'est un tableau on push
  console.log(prixTotalCalcul);
  //mettre les prix du panier dans la variable "prixTotalCalcul"
}
//Aditionner les prix qu'il y a dans le tableau de la variable prix total avec la méthode reduce
const reducer = (accumulator,currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);
console.log("total prix " + prixTotal)

//le code html du prix total à afficher

let insertionPrix = document.querySelector(".cart__price");
console.log(insertionPrix);
let structure2 =[];
for(z = 0;z < actualCartString.length; z++){
  structure2 = `
 
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
</div>`;
}
if(z === actualCartString.length ) {
  insertionPrix.innerHTML = structure2;
}
