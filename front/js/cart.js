let actualCartString = localStorage.getItem("cart");
let cart = [];
if (actualCartString != null) {
  cart = JSON.parse(actualCartString);
}
console.log("cart:>", cart);
let cartaImplementer = document.querySelector("#cart__items");
//console.log("cartaImplementer :>", cartaImplementer);

let htmlPannier = "";
//si le panier est vide : afficher le panier est vide
if (cart.length <= 0) {
  htmlPannier = `
    <article class="cart__item" data-id="{product-ID}">
    <div class="container-panier-vide">
        <div> Le panier est vide </div>
    </div>    
  `;
} else {
  //si le panier n'est pas vide afficher le produit dans le local storage
  for (k = 0; k < cart.length; k++) {
    htmlPannier =
      htmlPannier +
      `
    <section id="cart__items">
        <article class="cart__item" data-id="${cart[k]._id}">
                <div class="cart__item__img">
                  <img src=${cart[k].imageUrl}>  ${cart[k].altTxt}
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${cart[k].name}</h2>
                    <h2>${cart[k].selectedColor}</h2>
                    <p id="${cart[k]._id + cart[k].selectedColor}price">${(// ajouter un autre id + la couleur
        cart[k].price * cart[k].quantite
      )
        .toString()
        .replace(/00/, "")} €
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    
                      <p>Qté :</p>
                      <div>
                        
                      </div>
                      <input type="number" class="itemQuantity" name="itemQuantity" data-id=${
                        cart[k]._id
                      } data-color=${
        cart[k].selectedColor
      } min="1" max="100" value="${cart[k].quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <button class="deleteItem" >Supprimer</button>
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
// console.log(deleteItem);

let tab = [];
// Dans LocalStorage : suppression de l'article sélectionné //
for (let i = 0; i < deleteItem.length; i++) {
  deleteItem[i].addEventListener("click", (event) => {
    deleteItem[i].parentElement.style.display = "none";

    tab = cart;
    console.log("tab", tab);
    tab.splice([i], 1);

    cart = localStorage.setItem("cart", JSON.stringify(tab));

    event.preventDefault();
    document.location.reload();
  });

  function updateQuantite() {
    const boutoninput = document.querySelectorAll(".itemQuantity");
    boutoninput.forEach((input) => {
      input.addEventListener("change", (event) => {
        event.preventDefault();
        for (i = 0; i < cart.length; i++) {
          if (
            cart[i]._id === input.dataset.id &&
            cart[i].selectedColor === input.dataset.color
          ) {
            cart[i].quantite = event.target.value;
            localStorage.setItem("cart", JSON.stringify(cart));
            let actualCartString = localStorage.getItem("cart");
            newCart = JSON.parse(actualCartString);
            changePrix(newCart);
            const prix = document.getElementById(
              `${newCart[i]._id + newCart[i].selectedColor}price`
            );
            prix.innerHTML = (newCart[i].price * newCart[i].quantite)
              .toString()
              .replace(/00/, "")+ " €";
          }
        }
      });
    });

    function changePrix(newCart) {
      // délaration de la variable pour pouvoir mettre des prix qui sont dans le panier
      let prixTotalCalcul = 0;
      //chercher les prix dans le panier
      for (let p = 0; p < newCart.length; p++) {
        let prixProduitDansLePanier = newCart[p].price * newCart[p].quantite;
        prixTotalCalcul = prixTotalCalcul + prixProduitDansLePanier; // en général quand c'est un tableau on push
        //console.log(prixTotalCalcul);
        //mettre les prix du panier dans la variable "prixTotalCalcul"
      }
      //Aditionner les prix qu'il y a dans le tableau de la variable prix total avec la méthode reduce
      //console.log("total prix " + prixTotal)

      //le code html du prix total à afficher
      let insertionPrix = document.querySelector(".cart__price");
      //console.log(insertionPrix);

      structure2 = `
<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${prixTotalCalcul}</span> €</p>
</div>`;

      insertionPrix.innerHTML = structure2;
    }
  }
  //----------------FIN DU MONTANT TOTAL DU PANIER------------------//

  //-----------------SUPPRIMER TOUT LE PANIER-----------------------//
}

updateQuantite();

//***************************************************************************************************************** */

const afficherFormulaireHtml = () => {
  //SELECTION ELEMENT DU DOM pour le positionnement du formulaire
  const positionElement4 = document.querySelector(".cart__order");
  //console.log(positionElement4)
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

  positionElement4.insertAdjacentHTML("afterend", structureFormulaire);
};
afficherFormulaireHtml();
// ******************************* FORMULAIRE *******************************
let contactStorage = localStorage.getItem("contact");
let form = document.getElementsByClassName("cart__order__form");
console.log("form", form);
let formFirstName = document.getElementById("firstName");
console.log("prénom", formFirstName);
let formLastName = document.getElementById("lastName");
console.log("nom", formLastName);
let formAdress = document.getElementById("address");
console.log("formAdress", formAdress);
let formCity = document.getElementById("city");
console.log("formCity", formCity);
let formMail = document.getElementById("email");
console.log("formMail", formMail);
let formValid = document.getElementById("order");
console.log("formValid", formValid);
// REGEX PRENOM //
formFirstName.addEventListener("change", function () {
  validFirstName(this);
});
const validFirstName = function (inputFirstName) {
  let FirstRegExp = new RegExp(
    "^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._s -]*$",
    "g"
  );
  let verifFirstName = FirstRegExp.test(inputFirstName.value);
  if (verifFirstName) {
    formFirstName.style.boxShadow = "0px 0px 10px green";
    formFirstName.style.boxSizing = "border-box";
    document.getElementById("firstNameErrorMsg").innerHTML = "Prénom Valide !";
    document.getElementById("firstNameErrorMsg").style.color = "#B0F59A";
  } else {
    formFirstName.style.boxShadow = "0px 0px 10px darkred";
    formFirstName.style.boxSizing = "border-box";
    document.getElementById(
      "firstNameErrorMsg"
    ).innerHTML = `"${inputFirstName.value} n'est pas valide !"`;
  }
};
formLastName.addEventListener("change", function () {
  validLastName(this);
});
const validLastName = function (inputLastName) {
  let NameRegExp = new RegExp(
    "^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._s -]*$",
    "g"
  );
  let verifLastName = NameRegExp.test(inputLastName.value);
  if (verifLastName) {
    formLastName.style.boxShadow = "0px 0px 10px green";
    formLastName.style.boxSizing = "border-box";
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom Valide !";
    document.getElementById("lastNameErrorMsg").style.color = "#B0F59A";
  } else {
    formLastName.style.boxShadow = "0px 0px 10px red";
    formLastName.style.boxSizing = "border-box";
    document.getElementById(
      "lastNameErrorMsg"
    ).innerHTML = `"${inputLastName.value} n'est pas valide !"`;
  }
};
// REGEX ADRESSE//
formAdress.addEventListener("change", function () {
  validAdress(this);
});
const validAdress = function (inputAdress) {
  let AdressRegExp = new RegExp(
    "^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._s -]*$",
    "g"
  );
  let testAdress = AdressRegExp.test(inputAdress.value);
  if (testAdress) {
    formAdress.style.boxShadow = "0px 0px 10px green";
    formAdress.style.boxSizing = "border-box";
    document.getElementById("addressErrorMsg").innerHTML = "Adresse Valide !";
    document.getElementById("addressErrorMsg").style.color = "#B0F59A";
  } else {
    formAdress.style.boxShadow = "0px 0px 10px red";
    formAdress.style.boxSizing = "border-box";
    document.getElementById(
      "addressErrorMsg"
    ).innerHTML = `"${inputAdress.value} Adresse invalide !"`;
  }
};
// REGEX VILLE
formCity.addEventListener("change", function () {
  validCity(this);
});
const validCity = function (inputCity) {
  let villeRegExp = new RegExp(
    "^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._s-]*$",
    "g"
  );
  let testVille = villeRegExp.test(inputCity.value);
  if (testVille) {
    formCity.style.boxShadow = "0px 0px 10px green";
    formCity.style.boxSizing = "border-box";
    document.getElementById("cityErrorMsg").innerHTML = "Ville Valide !";
    document.getElementById("cityErrorMsg").style.color = "#B0F59A";
  } else {
    formCity.style.boxShadow = "0px 0px 10px red";
    formCity.style.boxSizing = "border-box";
    document.getElementById(
      "cityErrorMsg"
    ).innerHTML = `"${inputCity.value} n'est pas valide !"`;
  }
};
// REGEX EMAIL//
formMail.addEventListener("change", function () {
  validMail(this);
});
const validMail = function (inputMail) {
  let emailRegExp = new RegExp(/^[\w\W]+[@]{1}[\w\W.-_]+[.]{1}[\w\W]{2,10}$/);
  let verifMail = emailRegExp.test(inputMail.value);
  if (verifMail) {
    formMail.style.boxShadow = "0px 0px 10px green";

    document.getElementById("emailErrorMsg").innerHTML = "Email valide !";
    document.getElementById("emailErrorMsg").style.color = "#B0F59A";
  } else {
    formMail.style.boxShadow = "0px 0px 10px red";
    formMail.style.boxSizing = "border-box";
    document.getElementById(
      "emailErrorMsg"
    ).innerHTML = `"${inputMail.value} Email invalide !"`;
  }
};
formValid.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (
    !formFirstName.value ||
    !formLastName.value ||
    !formAdress.value ||
    !formCity.value ||
    !formMail.value
  ) {
    const cmd = document.getElementById("order");
    cmd.setAttribute("value", "Veuillez remplir tous les champs et cliquer");
    return evt.preventDefault();
  } else {
    const contact = {
      firstName: `${formFirstName.value}`,
      lastName: `${formLastName.value}`,
      address: `${formAdress.value}`,
      city: `${formCity.value}`,
      email: `${formMail.value}`,
    };
    localStorage.setItem("contact", JSON.stringify(contact));
    let products = [];
    for (i = 0; i < cart.length; i++) {
      products.push(cart[i]._id);
    }
    let sendProducts = { contact, products };
    console.log("sendProducts", sendProducts);

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(sendProducts),
      headers: {
        "content-type": "application/json",
      },
    })
      // POUR AVOIR LE RETOUR SERVEUR
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let orderId = data.orderId;
        window.location.href = `./confirmation.html?id=${orderId}`;
        console.log(orderId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
// POUR AVOIR LE RETOUR SERVEUR
