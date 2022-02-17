/* 
URL DU SITE http://localhost:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926
QUERY PARAM ID DE l'URL = 107fb5b75607497b96722bda5b504926
 SUPOSE DE LA ROUTE API POUR 1 PRODUIT http://localhost:3000/api/products/${article.Id}

http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926

*/

async function main() {
  const articleId =  getArticleId();
  
  const article = await getArticle(articleId); //await attend resultat d'une promesse
  hydrateArticle(article);

  //selection id du formulaire
  //Selection des couleurs du canapé et changement de l'image
  let optionColorChange = document.querySelector("#colors");
  console.log(optionColorChange)
  //mettre le choix de l'utilisateur dans une variable
 
  //const choixFormColor = optionColorChange.value;
  //for (i = 0; i < optionColorChange.length; i++ ){
   //structure3=`
   //<select name="color-select" id="colors">
                      //<option value="">--SVP, choisissez une couleur --</option>
                          //<option value="Blue">${colors}</option>
                        //<option value="blanc">${colors}</option> 
                    //</select>
   // let structure3=[];
 
  
  
    
   
  
  //const choixColors = optionColorChange;
  //console.log(choixColors);
  //optionColorChange.addEventListener("click",(event)=>{
  //if (optionColorChange.appendChild == Blue){
   // Blue
  //}
  //else {
    //blanc
//}})
//console.log(optionColorChange)
  //recuperation du bouton
  let bouton = document.getElementById("addToCart");
  bouton.addEventListener("click", (event) => {
    addToCart(article)
  event.preventDefault();  
  //selection id du formulaire
  //Selection des couleurs du canapé et changement de l'image
  
  })};
 
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


    // -------------------l'AFFICHAGE DES PRODUITS DU PANIER-----------//
    //SELECTION DE LA ID OU JE VAIS INJECTER LE CODE HTML
    //-------------LA GESTION DU PANIER-----------//
  //selection de l'id du formulaire//
    
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
  cloneElt.getElementById("imgitem").src = article.imageUrl;
  cloneElt.getElementById("title").textContent = article.name;
  cloneElt.getElementById("price").textContent = article.price;
  cloneElt.getElementById("description").textContent = article.description;
  cloneElt.getElementById("colors").innerHTML = optionColor;

  document.getElementById("item").appendChild(cloneElt);
}

// ajouter produit dans le panier cart//
//récupération des données et envoi au panier

//prix
//description couleur nombre //
main();
