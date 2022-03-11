
let actualCartString = localStorage.getItem("cart");
let cart = [];
if (actualCartString != null) {
  cart = JSON.parse(actualCartString);
}
console.log("cart:>", cart)
let cartaImplementer = document.querySelector("#cart__items");
console.log("cartaImplementer :>", cartaImplementer);

let htmlPannier = "";
//si le panier est vide : afficher le panier est vide
if (cart.length <= 0) {
  htmlPannier = `
    <article class="cart__item" data-id="{product-ID}">
    <div class="container-panier-vide">
        <div> Le panier est vide </div>
    </div>    
  `;
}
else {
    //si le panier n'est pas vide afficher le produit dans le local storage
  for(k = 0;k < cart.length; k++){
    htmlPannier = htmlPannier + `
    <section id="cart__items">
        <article class="cart__item" data-id="${cart[k]._id}">
                <div class="cart__item__img">
                  <img src=${cart[k].imageUrl}>  ${cart[k].altTxt}
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${cart[k].name}</h2>
                    <h2>${cart[k].selectedColor}</h2>
                    <p>${cart[k].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    
                      <p>Qté :${cart[k].quantite}</p>
                      <div>
                        
                      </div>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[k].quantite}">
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
}
cartaImplementer.innerHTML = htmlPannier;


//----------------GESTION DU BOUTON SUPPRIMER L'ARTICLE-------------------//
  // sélection des références de tous les boutons btn-supprimer
  const deleteItem = Array.from(document.querySelectorAll(".deleteItem"));
  console.log(deleteItem);

  let tab = [];
  // Dans LocalStorage : suppression de l'article sélectionné //
  for (let i = 0; i < deleteItem.length; i++) {

    deleteItem[i].addEventListener('click', (event) => {
     
        deleteItem[i].parentElement.style.display ="none";
        
        
        tab = cart;
        tab.splice([i], 1);
        
       cart = localStorage.setItem('cart', JSON.stringify(tab));

        window.location.href ="cart.html";
      event.preventDefault
      document.location.reload() 
    });

};
function updateQuantity () {
const updateArticle = input.closest('article');
//RECUPERATION DE L'INDEX AVEC L'ID et le DARA-COLOR


}



// délaration de la variable pour pouvoir mettre des prix qui sont dans le panier
let prixTotalCalcul = [];
//chercher les prix dans le panier
for (let p = 0;p < cart.length ; p++ ) {
  let prixProduitDansLePanier = cart[p].price * cart[p].quantite;
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
for(z = 0;z < cart.length; z++){
  structure2 = `
 
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${prixTotal}</span> €</p>
</div>`;
}
if(z === cart.length ) {
  insertionPrix.innerHTML = structure2;
}
//----------------FIN DU MONTANT TOTAL DU PANIER------------------//

//-----------------SUPPRIMER TOUT LE PANIER-----------------------//
const btntoutSupprimer =`<button class ="btn-tout-supprimer> Vider le panier </button>`;
insertionPrix.insertAdjacentHTML("beforeend",btntoutSupprimer);
//----------------FORMULAIRE DE COMMANDE--------------------//
console.log(insertionPrix)



const afficherFormulaireHtml = () => {
//SELECTION ELEMENT DU DOM pour le positionnement du formulaire
const positionElement4 = document.querySelector(".cart__order");
console.log(positionElement4)
  const structureFormulaire = `
  <div class="cart__order">
              <form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required>
                  <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required>
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required>
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required>
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order">
                </div>
              </form>
            </div>
  `;

  positionElement4.insertAdjacentHTML("afterend",structureFormulaire);
}
afficherFormulaireHtml();
//sélection du bouton commander
const btnCommanderEnvoyerLeFormulaire = document.querySelector("#order");
console.log(btnCommanderEnvoyerLeFormulaire)
//------------------------ADD EVEN LISTENER--------------------//
btnCommanderEnvoyerLeFormulaire.addEventListener("click", (e)=> {
  e.preventDefault();
const formulaireContact = {
prenom : document.querySelector("#firstName").value,
nom : document.querySelector("#lastName").value,
address : document.querySelector("#address").value,
city : document.querySelector("#city").value,
email : document.querySelector("#email").value,
}
console.log("formulaireContact");
console.log(formulaireContact);
console.log(document.querySelector("#firstName").value)//franklin
//Mettre l'objet "formulaireValues dans le local storage "
localStorage.setItem("formulaireContact",JSON.stringify(formulaireContact));
const aEnvoyer = {
  actualCartString,
  formulaireContact
}
//-------------------GESTION VALIDATION DU FORMULAIRE--------------------//

  function prenomControle(){
  //contrôle de la validité du prénom 
  const lePrenom = formulaireContact.prenom;
  if(/^[A-Za-z]{3,20}$/.test(lePrenom)){// [A-Z] pour contrôler toute les lettres qu'il y a entre a et z et {} quantificateur contrôlele nbr de caractere minimum de 3 caracere et max 20
    console.log("ok");
    return true
  } else {
    console.log("ko");
    alert ("Chiffre et symbole ne sont pas autorisé\ne pas autorisé plus de 20 caractères")
    return false
  };
  
  }
  console.log(lePrenom)
  if(prenomControle()) {
    //mettre l'objet dans le local storage
    localStorage.setItem("formulaireContact",JSON.stringify(formulaireContact)); 
   } else {
     alert ("Veuillez bien remplir le formulaire")
   }
})
// console.log(aEnvoyer);



