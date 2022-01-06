//RECUPERATION DES OBJETS SELECTIONNER PAR L'UTILISATEUR DANS objPanier
/**
 * [getItem description]
 *
 * @param   {[type]}  kanapPanier  [kanapPanier description]
 *
 * @return  {[Array]}               [return LocalStorage]
 */
let localPanier = localStorage.getItem("kanapPanier");
let contactStorage = localStorage.getItem('contact');
let objPanier = JSON.parse(localPanier);
/**
 * [querySelector description]
 *
 * @param   {[type]}  #cart__items  [#cart__items description]
 *
 * @return  {[type]}                [return const]
 */
const recapPanier = document.querySelector("#cart__items")
const changeQuantite = document.getElementsByClassName("itemQuantity")

// AJOUT DES CARD ARTICLE AU RECAPITULATIF PANIER

for(let i = 0; i < objPanier.length; i += 1){
    
    recapPanier.innerHTML += 
    `<article class="cart__item" id=${objPanier[i].id} data-color=${objPanier[i].couleur}>
        <div class="cart__item__img">
        <img src=${objPanier[i].image} alt=${objPanier[i].imageAlt}>
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${objPanier[i].name}</h2>
            <p>${objPanier[i].couleur}</p>
            <p class="total">${objPanier[i].prix * objPanier[i].nombre} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" oninput="updateQty(this)" value=${objPanier[i].nombre}>
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
    </article>`
};
// onchange="updateQty(this)"
// AJOUTER/SUPPRIMER DES ARTICLES DEPUIS LE PANIER 
const SUPPR = document.getElementsByClassName("deleteItem");
let selectColor = document.querySelectorAll('article.cart__item')


// Evenement au clic suppression de produit du localStorage par ID
for(let i = 0; i < SUPPR.length; i++){
    SUPPR[i].addEventListener("click", (event) =>{

        // let idSuppr = SUPPR[i].parentNode.parentNode.parentNode.parentNode.id && SUPPR[i].parentNode.parentNode.parentNode.parentNode.id;
        const articleSuppr = SUPPR[i].closest('article');
        const artColor = articleSuppr.dataset.color
        const idColor = articleSuppr.id + '_' + artColor
        console.log(idColor);
        objPanier = objPanier.filter(el => el.id_color != idColor)
        console.log(objPanier);
        localStorage.setItem("kanapPanier", JSON.stringify(objPanier));
        document.location.reload()    
    })
}

const totalQty = document.getElementById("totalQuantity")
const totalPrice = document.getElementById("totalPrice")


/**
 * [updateQty description]
 *
 * @param   {HTMLInputElement}  input  [input description]
 *
 * @return  {[type]}         [return modifie le prix en fonction de la quantité supprime si = 0]
 */
 function updateQty(input){

    const article  = input.closest('article');
//  RECUPERATION DE L'INDEX AVEC L'ID et LE DATA-COLOR
    let index = objPanier.findIndex(
        (e) => e.id === article.id && e.couleur === article.dataset.color);

    objPanier[index].nombre = input.value;
    objPanier = objPanier.filter(el => el.nombre != 0)
    localStorage.setItem("kanapPanier", JSON.stringify(objPanier));
    

    let modifPrix = document.getElementsByClassName("total");
 
    // MODIFICATION DYNAMIQUE DES PRIX
        if(objPanier[index].nombre == 0){
            document.location.reload()
        }else{
        modifPrix[index].innerHTML = objPanier[index].prix * objPanier[index].nombre + " €"
        }
    // CALCUL DU PRIX TOTAL et QUANTITE methode reduce()
// APPEL DE LA FONCTION POUR MISE A JOUR
    calculTotal()
}
// DECLARATION DE REDUCE + FONCTION CALCUL TOTAL PRIX / QUANTITE
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    function calculTotal (){  
    tabPrice = [];
    tabQty = [];

    objPanier.forEach(el => {
        prixTotal = el.prix * el.nombre
        tabPrice.push(prixTotal)
    });
    const prixPanier = tabPrice.reduce(reducer);

        objPanier.forEach(el => {
            qtyTotal = el.nombre
            tabQty.push(parseInt(qtyTotal))
    });
    const qtyPanier = tabQty.reduce(reducer)
    // AJOUT AU HTML QTY & PRIX
    totalPrice.innerHTML = `${prixPanier}`;
    totalQty.innerHTML = `${qtyPanier}`;
    }
    calculTotal()

// ******************************* FORMULAIRE *******************************

let form = document.getElementsByClassName("cart__order__form");
let formFirst = document.getElementById("firstName");
let formLast = document.getElementById("lastName");
let formAdress = document.getElementById("address");
let formCity = document.getElementById("city");
let formMail = document.getElementById("email");
let formValid = document.getElementById("order");

// CREATION EXPRESSION REGULIAIRE EMAIL
formMail.addEventListener('change', function() {
    validMail(this)
});
const validMail =  function (inputMail){
    let emailRegExp = new RegExp ('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let testMail = emailRegExp.test(inputMail.value)
    if(testMail){
        formMail.style.boxShadow ='0px 0px 10px green'
        formMail.style.boxSizing = 'border-box'
        document.getElementById("emailErrorMsg").innerHTML = "Email Valide !"
        document.getElementById("emailErrorMsg").style.color ='#B0F59A'

    }else{
        formMail.style.boxShadow ='0px 0px 10px red'
        formMail.style.boxSizing = 'border-box'    
        document.getElementById("emailErrorMsg").innerHTML = `"${inputMail.value} n'est pas valide !"`
    }    
};

// CREATION EXPRESSION REGULIAIRE VILLE
formCity.addEventListener('change', function() {
    validCity(this)
});
const validCity =  function (inputCity){
    let villeRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]*$', 'g');
    let testVille = villeRegExp.test(inputCity.value)
    if(testVille){
        formCity.style.boxShadow ='0px 0px 10px green'
        formCity.style.boxSizing = 'border-box'
        document.getElementById("cityErrorMsg").innerHTML = "Ville Valide !"
        document.getElementById("cityErrorMsg").style.color ='#B0F59A'

    }else{
        formCity.style.boxShadow ='0px 0px 10px red'
        formCity.style.boxSizing = 'border-box'
        document.getElementById("cityErrorMsg").innerHTML = `"${inputCity.value} n'est pas valide !"`
    }    
};

// CREATION EXPRESSION REGULIAIRE ADRESSE
formAdress.addEventListener('change', function() {
    validAdress(this)
});
const validAdress =  function (inputAdress){
    let AdressRegExp = new RegExp ('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testAdress = AdressRegExp.test(inputAdress.value)
    if(testAdress){
        formAdress.style.boxShadow ='0px 0px 10px green'
        formAdress.style.boxSizing = 'border-box'
        document.getElementById("addressErrorMsg").innerHTML = "Adresse Valide !"
        document.getElementById("addressErrorMsg").style.color ='#B0F59A'
    }else{
        formAdress.style.boxShadow ='0px 0px 10px red'
        formAdress.style.boxSizing = 'border-box'
        document.getElementById("addressErrorMsg").innerHTML = `"${inputAdress.value} n'est pas valide !"`
    }    
};

// CREATION EXPRESSION REGULIAIRE LASTNAME
formLast.addEventListener('change', function() {
    validLast(this)
});
const validLast =  function (inputLast){
    let LastRegExp = new RegExp ('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testLast = LastRegExp.test(inputLast.value)
    if(testLast){
        formLast.style.boxShadow ='0px 0px 10px green'
        formLast.style.boxSizing = 'border-box'
        document.getElementById("lastNameErrorMsg").innerHTML = "Nom Valide !"
        document.getElementById("lastNameErrorMsg").style.color ='#B0F59A'

    }else{
        formLast.style.boxShadow ='0px 0px 10px red'
        formLast.style.boxSizing = 'border-box'
        document.getElementById("lastNameErrorMsg").innerHTML = `"${inputLast.value} n'est pas valide !"`
    }    
};

// CREATION EXPRESSION REGULIAIRE FIRSTNAME
formFirst.addEventListener('change', function() {
    validFirst(this)
});
const validFirst =  function (inputFirst){
    let FirstRegExp = new RegExp ('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');
    let testFirst = FirstRegExp.test(inputFirst.value)
    if(testFirst){
        formFirst.style.boxShadow ='0px 0px 10px green'
        formFirst.style.boxSizing = 'border-box'
        document.getElementById("firstNameErrorMsg").innerHTML = "Prénom Valide !"
        document.getElementById("firstNameErrorMsg").style.color ='#B0F59A'
    }else{
        formFirst.style.boxShadow ='0px 0px 10px red'
        formFirst.style.boxSizing = 'border-box'
        document.getElementById("firstNameErrorMsg").innerHTML = `"${inputFirst.value} n'est pas valide !"`
    }    
};

// ENVOI DU FORMULAIRE AVEC FETCH
formValid.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(
        !formFirst.value ||
        !formLast.value ||
        !formAdress.value ||
        !formCity.value ||
        !formMail.value
        
    ) {
        const cmd = document.getElementById('order')
        cmd.setAttribute('value', 'Veuillez remplir tous les champs et cliquer')
        return evt.preventDefault();
    }else{

    
const contact = {
      firstName: `${formFirst.value}`,
      lastName: `${formLast.value}`,
      address: `${formAdress.value}`,
      city: `${formCity.value}`,
      email: `${formMail.value}`
    }
    // let order = JSON.stringify(contact)
    localStorage.setItem("contact", JSON.stringify(contact));
// RECUPERATION DES ID POUR ENVOI FETCH
    let products = []
    for(i = 0; i < objPanier.length; i++){
        products.push(objPanier[i].id)
    }

    let envoiProducts = {contact, products}
    console.log(envoiProducts);

    fetch("http://localhost:3000/api/products/order"  , {
        method: "POST",
        body: JSON.stringify(envoiProducts),
        headers: {
            "content-type" : "application/json",
        }   
    })
// POUR AVOIR LE RETOUR SERVEUR    
    .then(res => {
        return res.json();
    }).then((data) => {
        let orderId = data.orderId
       window.location.href= `./confirmation.html?id=${orderId}` ; 
    console.log(orderId);
    }).catch((error) =>{
        console.log(error);
    })
}
}
);
