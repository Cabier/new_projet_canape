  async function main() {
  const articleId =  getArticleId();
  
  const article = await getArticle(articleId); //await attend resultat d'une promesse
  hydrateArticle(article);

  //selection id du formulaire
  //Selection des couleurs du canapé et changement de l'image
  let optionColorChange = document.querySelector("#colors");
  console.log(optionColorChange)

  let bouton = document.getElementById("addToCart");
  bouton.addEventListener("click", (event) => {
    addToCart(article)
  event.preventDefault();  
  //selection id du formulaire
  //Selection des couleurs du canapé et changement de l'image
  
  })
 const optionQuantite = document.querySelector("#quantity");
 console.log(optionQuantite)
  let structureProduitQuantité = [];
  for (let j =0; j < optionQuantite.length;j++ ) {
    structureProduitQuantité=
    structureProduitQuantité +
    `
    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${optionQuantite[j]}">
                    </div>

    `
  }
}
// quantite : choisir la quantitié de produit possible
const structureQuantité = 
  function addToCart(article) {
    // console.log("article ", article);
    // Soit on a déja un panier => on le récupere et ça devient cart
    actualCartString = localStorage.getItem("cart");

    //console.log("actualCartString", actualCartString);
     cart = [];
    if (actualCartString != null) {
       // convertir actualCartString en Object
       cart = JSON.parse(actualCartString)
       //la console.log()
       console.log(actualCartString)
    }
    else {
      console.log("vraiment naze")
    }
    
    console.log("ajout d'un nouvel article au  panier  : ", cart)
    // Soit on a pas encore de pannier on part de let cart = [];
    cart.push(article)
    // console.log("cart",cart)
     cartString = JSON.stringify(cart)
     
    // console.log("cartString", cartString);
    localStorage.setItem("cart", cartString);
    alert("votre produit à bien été ajouté")

    //déclaration de la variable enregistré dans le local storage//
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    let foundArticle = cart.find(a => a.id == article.id);
    if (foundArticle != undefined){
      foundArticle.quantity++;
    } else {
      article.quantity = 1;
      cart.push(article)

    }


 
    
}
  
  

  function getArticleId() {
  return new URL(document.location).searchParams.get("id");
}

  function getArticle(articleId) {
  let url = "http://localhost:3000/api/products/" + articleId;

  console.log("URL API /> 1 produit ", url); // ERREUR DE STRING
  return fetch(url)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

function hydrateArticle(article) {
  const templateElt = document.getElementById("templateArticle2"); //creation template//
  const cloneElt = document.importNode(templateElt.content, true);
  let optionColor = "";
  article.colors.forEach((el) => {
    optionColor = optionColor + `<option value="${el}">${el}</option>`;
  });
  //let optionQuantite = "";
  //input.quantity.forEach((elements) => {
    //optionQuantite = optionQuantite +`<input type="number" name="itemQuantity" min="1" max="100" value="${elements}" id="quantity">`  
  //});
  cloneElt.getElementById("imgitem").src = article.imageUrl;
  cloneElt.getElementById("title").textContent = article.name;
  cloneElt.getElementById("price").textContent = article.price;
  cloneElt.getElementById("description").textContent = article.description;
  cloneElt.getElementById("colors").innerHTML = optionColor;
  //cloneElt.getElementById("quantity").innerHTML = optionQuantite;
  document.getElementById("item").appendChild(cloneElt);
}

// ajouter produit dans le panier cart//
//récupération des données et envoi au panier

//prix
//description couleur nombre //
main();
